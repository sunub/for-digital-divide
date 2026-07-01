import { describe, expect, it } from "vitest";
import {
  benchmarkInteraction,
  benchmarkProcessData,
  generateTransactions,
  type ProcessDataBenchmarkResult,
} from "@/components/TransactionChart/utils/interactionBenchmark";

function getSixMonthResult(): ProcessDataBenchmarkResult {
  const transactions = generateTransactions(5000, 42);
  const currentBalance = 12_500_000;
  const processResults = benchmarkProcessData(
    transactions,
    150,
    currentBalance,
  );
  const sixMonthResult = processResults.find(
    (entry) => entry.period === "6months",
  );

  expect(sixMonthResult).toBeDefined();

  if (!sixMonthResult) {
    throw new Error("Expected a six-month benchmark result.");
  }

  return sixMonthResult;
}

describe("transaction chart interaction performance", () => {
  it("collapses repeated hover samples into unique hover updates", () => {
    const sixMonthResult = getSixMonthResult();

    const interaction = benchmarkInteraction(
      sixMonthResult.dailyData,
      960,
      326,
      150,
      12000,
    );

    expect(interaction.uniqueHoverUpdates).toBe(sixMonthResult.outputCount);
    expect(interaction.preventedWrites).toBe(
      interaction.sampleCount - interaction.uniqueHoverUpdates,
    );
    expect(interaction.preventedWritesPct).toBeGreaterThan(98);
  });

  it("keeps hover lookup work far below the 60fps frame budget", () => {
    const sixMonthResult = getSixMonthResult();

    const interaction = benchmarkInteraction(
      sixMonthResult.dailyData,
      960,
      326,
      150,
      12000,
    );

    expect(interaction.p95Ms).toBeLessThan(0.05);
    expect(interaction.frameBudgetSharePct).toBeLessThan(1);
    expect(interaction.lookupsPerSecond).toBeGreaterThan(10000);
  });
});
