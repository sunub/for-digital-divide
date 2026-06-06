import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { TransactionList } from "./transaction.model";

export const transactionKeys = {
  all: () => ["transactions"] as const,
  byAccount: (accountNumber: number) =>
    [...transactionKeys.all(), "account", accountNumber] as const,
};

export async function fetchTransactions(
  accountNumber: number,
  signal?: AbortSignal,
): Promise<TransactionList> {
  const url = `/api/accounts/${accountNumber}/transactions`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.status} ${url}`);
  }
  return response.json();
}

export function getTransactionsQueryOptions(accountNumber: number) {
  return queryOptions({
    queryKey: transactionKeys.byAccount(accountNumber),
    queryFn: ({ signal }) => fetchTransactions(accountNumber, signal),
    placeholderData: keepPreviousData,
  });
}
