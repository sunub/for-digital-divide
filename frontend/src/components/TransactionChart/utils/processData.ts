import type {
  ChartSummary,
  DailyData,
  TimePeriod,
  Transaction,
} from "../types";
import { chartMetrics } from "./transactionChartMetrics";

export function processData(
  transactions: Transaction[],
  period: TimePeriod,
  currentBalance: number,
): { dailyData: DailyData[]; summary: ChartSummary } {
  const startAt =
    typeof performance === "undefined" ? Date.now() : performance.now();

  const now = new Date();
  const startDate = new Date();

  if (period === "1month") startDate.setMonth(now.getMonth() - 1);
  else if (period === "3months") startDate.setMonth(now.getMonth() - 3);
  else if (period === "6months") startDate.setMonth(now.getMonth() - 6);

  startDate.setHours(0, 0, 0, 0);
  now.setHours(23, 59, 59, 999);

  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime(),
  );

  const dailyStats = new Map<string, { income: number; expense: number }>();
  const getDateKey = (date: Date) => date.toISOString().split("T")[0];

  sortedTransactions.forEach((t) => {
    const d = new Date(t.occurred_at);
    const key = getDateKey(d);

    if (!dailyStats.has(key)) {
      dailyStats.set(key, { income: 0, expense: 0 });
    }

    const stats = dailyStats.get(key) ?? { income: 0, expense: 0 };
    if (t.transaction_type === "DEPOSIT") {
      stats.income += t.amount;
    } else {
      stats.expense += t.amount;
    }
    dailyStats.set(key, stats);
  });

  const processedData: DailyData[] = [];
  let runningBalance = currentBalance;

  const dayIterator = new Date(now);
  dayIterator.setHours(0, 0, 0, 0);

  const loopEnd = new Date(startDate);
  loopEnd.setDate(loopEnd.getDate() - 1);

  while (dayIterator >= loopEnd) {
    const key = getDateKey(dayIterator);
    const stats = dailyStats.get(key) || { income: 0, expense: 0 };

    processedData.push({
      date: new Date(dayIterator),
      income: stats.income,
      expense: stats.expense,
      balance: runningBalance,
    });

    runningBalance = runningBalance - stats.income + stats.expense;
    dayIterator.setDate(dayIterator.getDate() - 1);
  }

  const dailyData = processedData.reverse().filter((d) => d.date >= startDate);

  // Summary Calculation
  const totalExpense = dailyData.reduce((sum, d) => sum + d.expense, 0);
  const totalIncome = dailyData.reduce((sum, d) => sum + d.income, 0);
  const lastBalance =
    dailyData.length > 0
      ? dailyData[dailyData.length - 1].balance
      : currentBalance;

  const calculateChange = (type: "EXPENSE" | "INCOME" | "BALANCE") => {
    const todayTime = Date.now();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const last30Start = todayTime - thirtyDaysMs;
    const prev30Start = todayTime - thirtyDaysMs * 2;

    if (type === "BALANCE") {
      if (dailyData.length < 2) return 0;
      const current = dailyData[dailyData.length - 1].balance;
      const pastIndex = dailyData.length - 30;
      const past =
        pastIndex >= 0 ? dailyData[pastIndex].balance : dailyData[0].balance;
      return past === 0 ? 0 : ((current - past) / past) * 100;
    }

    const calcSum = (
      startMs: number,
      endMs: number,
      field: "income" | "expense",
    ) => {
      return dailyData
        .filter((d) => d.date.getTime() >= startMs && d.date.getTime() < endMs)
        .reduce((sum, d) => sum + d[field], 0);
    };

    const field = type === "EXPENSE" ? "expense" : "income";
    const currentSum = calcSum(last30Start, todayTime, field);
    const prevSum = calcSum(prev30Start, last30Start, field);

    return prevSum === 0 ? 0 : ((currentSum - prevSum) / prevSum) * 100;
  };

  const metricPayload = {
    period,
    inputCount: transactions.length,
    outputCount: dailyData.length,
    hasData: dailyData.length > 0,
    currentBalance,
  };

  chartMetrics.record(
    "processData",
    {
      ...metricPayload,
      timestamp: Date.now(),
    },
    (typeof performance === "undefined" ? Date.now() : performance.now()) -
      startAt,
  );

  chartMetrics.collectMemorySnapshot("processData");

  return {
    dailyData,
    summary: {
      totalExpense,
      totalIncome,
      currentBalance: lastBalance,
      expenseChange: calculateChange("EXPENSE"),
      incomeChange: calculateChange("INCOME"),
      balanceChange: calculateChange("BALANCE"),
    },
  };
}
