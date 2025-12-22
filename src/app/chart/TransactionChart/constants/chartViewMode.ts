export const CHART_VIEW_MODES = [
  "ALL",
  "EXPENSE",
  "INCOME",
  "BALANCE",
] as const;
export const CHART_VIEW_MODES_MAP: Record<
  (typeof CHART_VIEW_MODES)[number],
  string
> = {
  ALL: "통합",
  EXPENSE: "지출",
  INCOME: "수입",
  BALANCE: "잔액",
} as const;
