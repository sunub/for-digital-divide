import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import * as d3 from "d3";
import { CHART_MARGIN } from "../src/components/TransactionChart/constants/chartLayout";
import type {
  ChartViewMode,
  DailyData,
  Scales,
  TimePeriod,
  Transaction,
} from "../src/components/TransactionChart/types";
import {
  createHoverKey,
  getInteractionData,
} from "../src/components/TransactionChart/utils/interactionMath";
import { processData } from "../src/components/TransactionChart/utils/processData";

type BenchmarkSummary = {
  dataset: {
    seed: number;
    transactionCount: number;
    chartWidth: number;
    chartHeight: number;
  };
  processData: Array<{
    period: TimePeriod;
    inputCount: number;
    outputCount: number;
    reductionPct: number;
    averageMs: number;
    p95Ms: number;
    minMs: number;
    maxMs: number;
  }>;
  interaction: {
    sampleCount: number;
    averageMs: number;
    p95Ms: number;
    minMs: number;
    maxMs: number;
    lookupsPerSecond: number;
    frameBudgetSharePct: number;
    rawSamples: number;
    uniqueHoverUpdates: number;
    preventedWrites: number;
    preventedWritesPct: number;
  };
};

type CliOptions = {
  transactionCount: number;
  iterations: number;
  hoverSamples: number;
  width: number;
  height: number;
  seed: number;
  outPath: string | null;
};

const DEFAULT_OPTIONS: CliOptions = {
  transactionCount: 5000,
  iterations: 150,
  hoverSamples: 12000,
  width: 960,
  height: 326,
  seed: 42,
  outPath: null,
};

const PERIODS: TimePeriod[] = ["1month", "3months", "6months"];
const FRAME_BUDGET_MS = 1000 / 60;
const BENCHMARK_VIEW_MODE: ChartViewMode = "ALL";

function parseArgs(argv: string[]): CliOptions {
  const options = { ...DEFAULT_OPTIONS };

  for (const arg of argv) {
    const [rawKey, rawValue] = arg.split("=");
    const key = rawKey.replace(/^--/, "");
    const value = rawValue ?? "";

    if (key === "transactions" && value)
      options.transactionCount = Number(value);
    if (key === "iterations" && value) options.iterations = Number(value);
    if (key === "hover-samples" && value) options.hoverSamples = Number(value);
    if (key === "width" && value) options.width = Number(value);
    if (key === "height" && value) options.height = Number(value);
    if (key === "seed" && value) options.seed = Number(value);
    if (key === "out" && value) options.outPath = value;
  }

  return options;
}

function createRng(seed: number) {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickExpenseType(rand: () => number): Transaction["transaction_type"] {
  const expenseTypes: Transaction["transaction_type"][] = [
    "PAYMENT",
    "TRANSFER",
    "WITHDRAWAL",
    "FEE",
  ];

  return expenseTypes[Math.floor(rand() * expenseTypes.length)] ?? "PAYMENT";
}

function generateTransactions(count: number, seed: number): Transaction[] {
  const rand = createRng(seed);
  const transactions: Transaction[] = [];
  const now = Date.now();
  const sixMonthsMs = 183 * 24 * 60 * 60 * 1000;

  for (let index = 0; index < count; index += 1) {
    const occurredAt = new Date(now - rand() * sixMonthsMs);
    const isDeposit = rand() > 0.57;
    const amount = Math.round(5_000 + rand() * 495_000);

    transactions.push({
      transaction_id: index + 1,
      account_number: 100200300,
      amount,
      transaction_type: isDeposit ? "DEPOSIT" : pickExpenseType(rand),
      counterparty_account_number: 200300400,
      description: isDeposit ? "입금" : "지출",
      occurred_at: occurredAt,
    });
  }

  return transactions;
}

function measureDurations(iterations: number, task: () => void) {
  const samples: number[] = [];

  for (let index = 0; index < 10; index += 1) {
    task();
  }

  for (let index = 0; index < iterations; index += 1) {
    const startedAt = performance.now();
    task();
    samples.push(performance.now() - startedAt);
  }

  return samples;
}

function toFixedNumber(value: number, digits = 3) {
  return Number(value.toFixed(digits));
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function percentile(values: number[], targetPercentile: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(
    sorted.length - 1,
    Math.ceil((targetPercentile / 100) * sorted.length) - 1,
  );
  return sorted[index] ?? 0;
}

function summarizeDurations(samples: number[]) {
  return {
    averageMs: toFixedNumber(average(samples)),
    p95Ms: toFixedNumber(percentile(samples, 95)),
    minMs: toFixedNumber(Math.min(...samples)),
    maxMs: toFixedNumber(Math.max(...samples)),
  };
}

function buildScales(
  data: DailyData[],
  viewMode: ChartViewMode,
  width: number,
  height: number,
): Scales {
  const innerWidth = width - CHART_MARGIN.left - CHART_MARGIN.right;
  const innerHeight = height - CHART_MARGIN.top - CHART_MARGIN.bottom;
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (datum) => datum.date) as [Date, Date])
    .range([0, innerWidth]);

  if (viewMode === "ALL") {
    const balanceExtent = d3.extent(data, (datum) => datum.balance) as [
      number,
      number,
    ];
    const balancePadding = (balanceExtent[1] - balanceExtent[0]) * 0.05;
    const yMain = d3
      .scaleLinear()
      .domain([
        balanceExtent[0] - balancePadding,
        balanceExtent[1] + balancePadding,
      ])
      .range([innerHeight, 0]);
    const maxFlow =
      Math.max(
        d3.max(data, (datum) => datum.income) || 0,
        d3.max(data, (datum) => datum.expense) || 0,
      ) || 10000;
    const ySecondary = d3
      .scaleLinear()
      .domain([0, maxFlow * 1.2])
      .range([innerHeight, 0]);

    return { x: xScale, yMain, ySecondary };
  }

  const accessor =
    viewMode === "EXPENSE"
      ? (datum: DailyData) => datum.expense
      : viewMode === "INCOME"
        ? (datum: DailyData) => datum.income
        : (datum: DailyData) => datum.balance;

  const domain =
    viewMode === "BALANCE"
      ? (() => {
          const extent = d3.extent(data, accessor) as [number, number];
          const padding = (extent[1] - extent[0]) * 0.1;
          return [extent[0] - padding, extent[1] + padding] as [number, number];
        })()
      : [0, (d3.max(data, accessor) || 10000) * 1.1];

  return {
    x: xScale,
    yMain: d3.scaleLinear().domain(domain).range([innerHeight, 0]),
  };
}

function buildMouseSamples(width: number, sampleCount: number) {
  const sweepWidth = width - CHART_MARGIN.left - CHART_MARGIN.right;

  return Array.from({ length: sampleCount }, (_, index) => {
    const cyclePosition = index % sweepWidth;
    const jitter = (index % 7) * 0.13;
    return CHART_MARGIN.left + cyclePosition + jitter;
  });
}

function benchmarkProcessData(
  transactions: Transaction[],
  iterations: number,
  currentBalance: number,
) {
  return PERIODS.map((period) => {
    let lastDailyData: DailyData[] = [];
    const samples = measureDurations(iterations, () => {
      const result = processData(transactions, period, currentBalance);
      lastDailyData = result.dailyData;
    });

    return {
      period,
      inputCount: transactions.length,
      outputCount: lastDailyData.length,
      reductionPct: toFixedNumber(
        ((transactions.length - lastDailyData.length) / transactions.length) *
          100,
      ),
      ...summarizeDurations(samples),
      dailyData: lastDailyData,
    };
  });
}

function benchmarkInteraction(
  dailyData: DailyData[],
  width: number,
  height: number,
  iterations: number,
  hoverSamples: number,
) {
  const scales = buildScales(dailyData, BENCHMARK_VIEW_MODE, width, height);
  const mouseSamples = buildMouseSamples(width, hoverSamples);
  const durationSamples = measureDurations(iterations, () => {
    for (const mouseX of mouseSamples) {
      getInteractionData({
        data: dailyData,
        scales,
        mouseX,
        viewMode: BENCHMARK_VIEW_MODE,
        marginLeft: CHART_MARGIN.left,
        marginTop: CHART_MARGIN.top,
      });
    }
  });

  const uniqueHoverKeys = new Set<string>();

  for (const mouseX of mouseSamples) {
    const interaction = getInteractionData({
      data: dailyData,
      scales,
      mouseX,
      viewMode: BENCHMARK_VIEW_MODE,
      marginLeft: CHART_MARGIN.left,
      marginTop: CHART_MARGIN.top,
    });

    if (interaction) {
      uniqueHoverKeys.add(createHoverKey(interaction, BENCHMARK_VIEW_MODE));
    }
  }

  const durationSummary = summarizeDurations(durationSamples);
  const averagePerLookupMs = average(durationSamples) / hoverSamples;
  const p95PerLookupMs = percentile(durationSamples, 95) / hoverSamples;
  const uniqueHoverUpdates = uniqueHoverKeys.size;
  const preventedWrites = hoverSamples - uniqueHoverUpdates;

  return {
    sampleCount: hoverSamples,
    averageMs: toFixedNumber(averagePerLookupMs, 4),
    p95Ms: toFixedNumber(p95PerLookupMs, 4),
    minMs: toFixedNumber(durationSummary.minMs / hoverSamples, 4),
    maxMs: toFixedNumber(durationSummary.maxMs / hoverSamples, 4),
    lookupsPerSecond: Math.round(1000 / Math.max(averagePerLookupMs, 0.0001)),
    frameBudgetSharePct: toFixedNumber(
      (p95PerLookupMs / FRAME_BUDGET_MS) * 100,
    ),
    rawSamples: hoverSamples,
    uniqueHoverUpdates,
    preventedWrites,
    preventedWritesPct: toFixedNumber((preventedWrites / hoverSamples) * 100),
  };
}

function formatPeriodLabel(period: TimePeriod) {
  if (period === "1month") return "1month";
  if (period === "3months") return "3months";
  return "6months";
}

function printSummary(summary: BenchmarkSummary) {
  console.log("");
  console.log("TRANSACTION CHART BENCHMARK");
  console.log("Measures repo-owned CPU work, not browser paint FPS.");
  console.log("");
  console.table(
    summary.processData.map((entry) => ({
      period: formatPeriodLabel(entry.period),
      input: entry.inputCount,
      output: entry.outputCount,
      reduction_pct: entry.reductionPct,
      avg_ms: entry.averageMs,
      p95_ms: entry.p95Ms,
      min_ms: entry.minMs,
      max_ms: entry.maxMs,
    })),
  );
  console.log("HOVER LOOKUP");
  console.table([
    {
      samples: summary.interaction.sampleCount,
      avg_lookup_ms: summary.interaction.averageMs,
      p95_lookup_ms: summary.interaction.p95Ms,
      lookups_per_second: summary.interaction.lookupsPerSecond,
      p95_frame_budget_pct: summary.interaction.frameBudgetSharePct,
      unique_hover_updates: summary.interaction.uniqueHoverUpdates,
      prevented_writes: summary.interaction.preventedWrites,
      prevented_writes_pct: summary.interaction.preventedWritesPct,
    },
  ]);
}

function maybeWriteOutput(summary: BenchmarkSummary, outPath: string | null) {
  if (!outPath) return;

  const absoluteOutPath = resolve(process.cwd(), outPath);
  mkdirSync(dirname(absoluteOutPath), { recursive: true });
  writeFileSync(`${absoluteOutPath}`, JSON.stringify(summary, null, 2));
  console.log(`Saved JSON report to ${absoluteOutPath}`);
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const transactions = generateTransactions(
    options.transactionCount,
    options.seed,
  );
  const currentBalance = 12_500_000;
  const processDataResults = benchmarkProcessData(
    transactions,
    options.iterations,
    currentBalance,
  );
  const sixMonthResult = processDataResults.find(
    (entry) => entry.period === "6months",
  );

  if (!sixMonthResult) {
    throw new Error("6months benchmark result is required.");
  }

  const interaction = benchmarkInteraction(
    sixMonthResult.dailyData,
    options.width,
    options.height,
    options.iterations,
    options.hoverSamples,
  );

  const summary: BenchmarkSummary = {
    dataset: {
      seed: options.seed,
      transactionCount: options.transactionCount,
      chartWidth: options.width,
      chartHeight: options.height,
    },
    processData: processDataResults.map(
      ({ dailyData: _dailyData, ...entry }) => ({
        ...entry,
      }),
    ),
    interaction,
  };

  printSummary(summary);
  maybeWriteOutput(summary, options.outPath);
}

main();
