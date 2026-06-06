import { type NextRequest, NextResponse } from "next/server";
import {
  parseTransaction,
  type TransactionList,
} from "@/entities/transactions/transaction.model";
import { transactionsService } from "@/entities/transactions/transaction.service";

async function getTransactions(accountNumber: number) {
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

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/accounts/[accountNumber]/transactions">,
) {
  const { accountNumber } = await ctx.params;
  const transactions = await getTransactions(Number(accountNumber));

  return NextResponse.json(transactions);
}
