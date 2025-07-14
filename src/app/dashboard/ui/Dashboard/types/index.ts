export type TransactionList = {
  account_number: number;
  transaction_id: number;
  amount: number;
  transaction_type: string;
  counterparty_account_number: number | null;
  description: string | null;
  occurred_at: Date;
}[];

export type AccountType = {
  account_number: number;
  user_id: number;
  account_type: 'CHECKING' | 'SAVINGS' | 'CREDIT' | 'LOAN';
  balance: number;
  created_at: Date;
};
