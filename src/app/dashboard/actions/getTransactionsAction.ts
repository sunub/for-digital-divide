"use server";

import type { TransactionList } from "../ui/Dashboard/types";
import { getTransactions } from "../ui/Dashboard/utils/getTransactions";

export async function getTransactionsAction(accountNumber: number) {
  const allTransactions = await getTransactions(accountNumber);
  return allTransactions as TransactionList;
}
