"use server";

import type { TransactionList } from "@/entities/transactions/transaction.model";
import { parseTransaction } from "@/entities/transactions/transaction.model";
import { transactionsService } from "@/entities/transactions/transaction.service";

export async function getTransactions(accountNumber: number) {
  const transactions =
    await transactionsService.findByAccountNumber(accountNumber);

  const validTransactions: TransactionList = [];
  for (const tx of transactions) {
    const parsedTransaction = parseTransaction(tx);
    if (parsedTransaction.success) {
      validTransactions.push(parsedTransaction.data);
    }
  }

  return validTransactions;
}
