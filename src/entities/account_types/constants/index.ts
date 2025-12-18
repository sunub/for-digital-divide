export const ACCOUNT_CODES = ["CHECKING", "SAVINGS", "CREDIT", "LOAN"] as const;

export const ACCOUNT_NAMES = [
  "보통예금계좌",
  "저축예금계좌",
  "신용카드 계좌",
  "대출계좌",
] as const;

export const ACCOUNT_NAMES_MAP = {
  CHECKING: "보통예금계좌",
  SAVINGS: "저축예금계좌",
  CREDIT: "신용카드 계좌",
  LOAN: "대출계좌",
} as const;
