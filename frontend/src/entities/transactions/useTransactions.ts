import { useQuery } from "@tanstack/react-query";
import { getTransactionsQueryOptions } from "./transaction.query";

export function useTransactions(accountNumber: number) {
  return useQuery({
    ...getTransactionsQueryOptions(accountNumber),
    enabled: typeof accountNumber === "number",
  });
}
