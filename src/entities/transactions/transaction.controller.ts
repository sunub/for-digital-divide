import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { Transaction } from './transaction.model';
import { AccountNumberSchema, TransactionIdSchema, TransactionSchema } from './transaction.model';
import { transactionsService } from './transaction.service';

export async function getTransactionsByIdController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get('transaction_id');
  const parsedTransactionId = TransactionIdSchema.safeParse(Number(transactionId));
  if (!parsedTransactionId.success) {
    return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
  }

  try {
    const transaction = await transactionsService.findById(parsedTransactionId.data);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const parsedTransaction = TransactionSchema.safeParse(transaction);
    if (!parsedTransaction.success) {
      return NextResponse.json({ error: 'Invalid transaction data' }, { status: 500 });
    }

    return NextResponse.json(parsedTransaction.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function createTransactionController(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedTransaction = TransactionSchema.safeParse(body);

    if (!parsedTransaction.success) {
      return NextResponse.json({ error: 'Invalid transaction data' }, { status: 400 });
    }

    const newTransaction: Omit<Transaction, 'transaction_id'> = parsedTransaction.data;
    const createdTransaction = await transactionsService.create(newTransaction);

    return NextResponse.json(createdTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function deleteTransactionController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionId = searchParams.get('transaction_id');
  const parsedTransactionId = TransactionIdSchema.safeParse(Number(transactionId));

  if (!parsedTransactionId.success) {
    return NextResponse.json({ error: 'Invalid transaction ID' }, { status: 400 });
  }

  try {
    const deletedTransaction = await transactionsService.delete(parsedTransactionId.data);
    return NextResponse.json(deletedTransaction, { status: 200 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function getAllTransactionsController() {
  try {
    const transactions = await transactionsService.findAll();
    const parsedTransactions = transactions.map((transaction: unknown) => TransactionSchema.safeParse(transaction));

    const errors = parsedTransactions.filter(
      (result: ReturnType<typeof TransactionSchema.safeParse>) => !result.success,
    );
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Invalid transaction data' }, { status: 500 });
    }

    return NextResponse.json(
      parsedTransactions.map((result: ReturnType<typeof TransactionSchema.safeParse>) => result.data),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching all transactions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function getTransactionsByAccountNumberController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accountNumber = searchParams.get('account_number');
  const parsedAccountNumber = AccountNumberSchema.safeParse(Number(accountNumber));

  if (!parsedAccountNumber.success) {
    return NextResponse.json({ error: 'Invalid account number' }, { status: 400 });
  }

  try {
    const transactions = await transactionsService.findByAccountNumber(parsedAccountNumber.data);
    const parsedTransactions = transactions.map((transaction: unknown) => TransactionSchema.safeParse(transaction));

    const errors = parsedTransactions.filter(
      (result: ReturnType<typeof TransactionSchema.safeParse>) => !result.success,
    );
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Invalid transaction data' }, { status: 500 });
    }

    return NextResponse.json(
      parsedTransactions.map((result: ReturnType<typeof TransactionSchema.safeParse>) => result.data),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching transactions by account number:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
