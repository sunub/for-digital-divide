const TRNASACTION_CODES = ["DEPOSIT", "WITHDRAWAL", "PAYMENT"] as const;

export type TransactionList = {
  account_number: number;
  transaction_id: number;
  amount: number;
  transaction_type: typeof TRNASACTION_CODES[number];
  counterparty_account_number: number | undefined;
  description: string | undefined;
  occurred_at: Date;
}[];


export type AccountType = {
  account_number: number;
  user_id: number;
  account_type: "CHECKING" | "SAVINGS" | "CREDIT" | "LOAN";
  balance: number;
  created_at: Date;
};
