import * as d3 from "d3";
import { CHART_MARGIN } from "../constants/chartLayout";
import type {
  ChartViewMode,
  DailyData,
  Scales,
  TimePeriod,
  Transaction,
} from "../types";
import { createHoverKey, getInteractionData } from "./interactionMath";
import { processData } from "./processData";

export type ProcessDataBenchmarkResult = {
  period: TimePeriod;
  inputCount: number;
  outputCount: number;
  reductionPct: number;
  averageMs: number;
  p95Ms: number;
  minMs: number;
  maxMs: number;
  dailyData: DailyData[];
};

export type InteractionBenchmarkResult = {
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

const PERIODS: TimePeriod[] = ["1month", "3months", "6months"];
const FRAME_BUDGET_MS = 1000 / 60;
const BENCHMARK_VIEW_MODE: ChartViewMode = "ALL";

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

export function generateTransactions(
  count: number,
  seed: number,
): Transaction[] {
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

export function benchmarkProcessData(
  transactions: Transaction[],
  iterations: number,
  currentBalance: number,
): ProcessDataBenchmarkResult[] {
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

export function benchmarkInteraction(
  dailyData: DailyData[],
  width: number,
  height: number,
  iterations: number,
  hoverSamples: number,
): InteractionBenchmarkResult {
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
