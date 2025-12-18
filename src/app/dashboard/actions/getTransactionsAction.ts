"use server";

import type { TransactionList } from "../ui/Dashboard/types";
import { getTransactions } from "../ui/Dashboard/utils/getTransactions";

export async function getTransactionsAction(accountNumber: number) {
  const transactionGen = await getTransactions(accountNumber);
  const allTransactions: TransactionList = [];

  while (true) {
    const { done, value } = await transactionGen.next();
    if (done) break;
    if (value) {
      allTransactions.push(...(value as TransactionList));
    }
  }

  return allTransactions;
}
