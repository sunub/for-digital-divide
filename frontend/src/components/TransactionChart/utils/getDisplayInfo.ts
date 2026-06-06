import { COLORS } from "../constants/colors";
import type { ChartSummary, ChartViewMode } from "../types";

export function getDisplayInfo(viewMode: ChartViewMode, summary: ChartSummary) {
  switch (viewMode) {
    case "ALL":
      return {
        label: "현재 자산 현황",
        amount: summary.currentBalance,
        change: summary.balanceChange,
        color: COLORS.balance,
        trendLabel: "종합 흐름",
      };
    case "EXPENSE":
      return {
        label: "기간 내 총 지출",
        amount: summary.totalExpense,
        change: summary.expenseChange,
        color: COLORS.expense,
        trendLabel: "지난 30일 지출 대비",
      };
    case "INCOME":
      return {
        label: "기간 내 총 수입",
        amount: summary.totalIncome,
        change: summary.incomeChange,
        color: COLORS.income,
        trendLabel: "지난 30일 수입 대비",
      };
    case "BALANCE":
      return {
        label: "현재 잔액",
        amount: summary.currentBalance,
        change: summary.balanceChange,
        color: COLORS.balance,
        trendLabel: "30일 전 잔액 대비",
      };
  }
}
