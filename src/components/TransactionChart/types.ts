export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "PAYMENT";

export interface Transaction {
  transaction_id: number;
  amount: number;
  transaction_type: TransactionType;
  occurred_at: Date | string;
  description?: string;
}

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

export interface Transaction {
  transaction_id: number;
  amount: number;
  transaction_type: TransactionType;
  occurred_at: Date | string;
  description?: string;
  counterparty_account_number?: number;
}

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
