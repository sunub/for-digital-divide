'use server';

import { transactionsService } from '@/entities/transactions/transaction.service';
import { TransactionSchema } from '@/entities/transactions/transaction.model';
import { fx } from '@/utils/iterable/fx';

export type TransactionGen = Awaited<ReturnType<typeof getTransactions>>;

function validateTransaction(transaction: unknown) {
  const parsedTransaction = TransactionSchema.safeParse(transaction);
  if (!parsedTransaction.success) {
    console.error('Invalid transaction data:', parsedTransaction.error);
    return false;
  }
  return true;
}

export async function getTransactions(accountNumber: number) {
  const chunkedTransactions = fx(await transactionsService.findByAccountNumber(accountNumber))
    .map((transaction) => ({
      ...transaction,
      account_number: Number(transaction.account_number.toString()),
      transaction_id: Number(transaction.transaction_id.toString()),
      amount: Number(transaction.amount.toString()),
      counterparty_account_number: transaction.counterparty_account_number
        ? Number(transaction.counterparty_account_number.toString())
        : undefined,
    }))
    .filter(validateTransaction)
    .chunk(100);

  return chunkedTransactions.toIterator();
}
