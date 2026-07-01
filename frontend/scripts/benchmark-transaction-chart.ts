import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { TimePeriod } from "../src/components/TransactionChart/types";
import {
  benchmarkInteraction,
  benchmarkProcessData,
  generateTransactions,
} from "../src/components/TransactionChart/utils/interactionBenchmark";

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
