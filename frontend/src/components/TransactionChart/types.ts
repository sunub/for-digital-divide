import type { TransactionTypeCode } from "@/entities/transaction_types/transaction_types.model";
import type { Transaction as EntityTransaction } from "@/entities/transactions/transaction.model";

export type TransactionType = TransactionTypeCode;

export type Transaction = Omit<EntityTransaction, "occurred_at"> & {
  occurred_at: Date | string;
};

export type ChartViewMode = "ALL" | "EXPENSE" | "INCOME" | "BALANCE";
export type TimePeriod = "1month" | "3months" | "6months";
export type Scales = {
  x: d3.ScaleTime<number, number>;
  yMain: d3.ScaleLinear<number, number>;
  ySecondary?: d3.ScaleLinear<number, number>;
};

export type D3Objects = {
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  xScale: d3.ScaleTime<number, number>;
};

export interface DailyData {
  date: Date;
  expense: number;
  income: number;
  balance: number;
}

export interface ChartSummary {
  totalExpense: number;
  totalIncome: number;
  currentBalance: number;
  expenseChange: number;
  incomeChange: number;
  balanceChange: number;
}

export type DisplayInfo = {
  label: string;
  amount: number;
  change: number;
  color: string;
  trendLabel: string;
};

export type Position = {
  x: number;
  y: number;
};
