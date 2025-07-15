'use server';

import chalk from 'chalk';
import ora from 'ora';

import { accountsService } from '@/entities/accounts/accounts.service';
import { AccountsSchema } from '@/entities/accounts/accounts.model';
import { transactionsService } from '@/entities/transactions/transaction.service';
import { TransactionSchema, type Transaction } from '@/entities/transactions/transaction.model';
import { map } from '@/utils/iterable/map';
import { chunk } from '@/utils/iterable/chunk';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';
import { generateTransactions } from '../scripts/generateTransactions.mjs';
import { generateAccounts } from '@root/scripts/generateAccounts.mjs';

import type { AccountType } from '@/entities/accounts/accounts.model';

const isProduction = process.env.NODE_ENV === 'production';

function logMemoryUsage(label: string) {
  const memoryUsage = process.memoryUsage();
  const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
  console.log(chalk.yellow(`[Memory Usage: ${label}] Heap used: ${heapUsedMb} MB`));
}

const accountsOra = ora('💳 Seeding Accounts Start');
const transactionsOra = ora('💸 Seeding Transactions Start');

async function seedAccounts(userId: number) {
  accountsOra.start();
  const accounts = generateAccounts(userId, 4);

  const updateAccountsOra = ora('🔄 Validating and updating accounts data').start();
  const createdAccounts = [];

  for (const account of accounts) {
    const parsedAccount = AccountsSchema.safeParse({
      account_number: Number(account.account_number),
      user_id: Number(account.user_id),
      account_type: account.account_type,
      balance: Number(account.balance),
      created_at: new Date(account.created_at),
    });
    if (!parsedAccount.success) {
      updateAccountsOra.fail('❌ Invalid account data');
      console.error(parsedAccount.error);
      accountsOra.fail();
      return [];
    }

    const existingAccount = await accountsService.findByAccountNumber(parsedAccount.data.account_number);
    if (existingAccount) {
      createdAccounts.push(existingAccount);
      continue;
    }

    const newAccount = await accountsService.create(parsedAccount.data);
    createdAccounts.push(newAccount);
  }
  updateAccountsOra.succeed('✅ Accounts data validated and updated successfully');
  accountsOra.succeed('🎉 Accounts seeded successfully');
  return createdAccounts;
}

interface GeneratedTransaction {
  transaction_id: number;
  account_number: number;
  amount: number;
  transaction_type: string;
  description: string;
  occurred_at: string;
  counterparty_account_number?: number;
}

async function validateTransaction(transaction: GeneratedTransaction) {
  const parsedTransaction = TransactionSchema.safeParse({
    transaction_id: Number(transaction.transaction_id),
    account_number: Number(transaction.account_number),
    amount: Number(transaction.amount),
    transaction_type: transaction.transaction_type,
    counterparty_account_number: Number(transaction.counterparty_account_number) || null,
    description: transaction.description,
    occurred_at: new Date(transaction.occurred_at),
  });
  if (!parsedTransaction.success) {
    console.error(parsedTransaction.error);
    return null;
  }
  return parsedTransaction.data;
}

async function validateAndFilterChunk(transactionChunk: GeneratedTransaction[]): Promise<Transaction[]> {
  const validationPromises = transactionChunk.map(validateTransaction);
  const validatedResults = await Promise.all(validationPromises);
  return validatedResults.filter((t): t is Transaction => t !== null);
}

async function seedTransactions(accounts: unknown[]) {
  transactionsOra.start();
  const processOra = ora('📊 Generating transaction data...').start();

  console.log(`🔢 Starting transaction generation for ${(accounts as unknown[]).length} accounts`);

  const { transactions, updatedAccounts } = await generateTransactions(accounts as object[]);

  console.log(`💰 Updating account balances for ${(updatedAccounts as unknown[]).length} accounts`);

  for (const account_info of updatedAccounts as AccountType[]) {
    const { account_number, balance, ...data } = account_info;
    const limitedBalance = Math.min(Math.max(balance, -99999999999), 99999999999);
    console.log(`📝 Updating account ${account_number} with balance: ${limitedBalance}`);
    await accountsService.updateByAccountNumber(account_number, { ...data, balance: limitedBalance });
  }

  processOra.text = '🔄 Processing and validating transactions...';
  console.log(`📋 Processing ${(transactions as unknown[]).length} transactions`);

  const chunkedAndValidatedStream = map(validateAndFilterChunk, chunk(500, transactions as GeneratedTransaction[]));

  let chunkCount = 0;
  const LOG_INTERVAL = 50;

  for await (const validTransactionChunk of chunkedAndValidatedStream) {
    if (validTransactionChunk.length > 0) {
      processOra.text = `🔄 Updating a chunk of ${validTransactionChunk.length} transactions...`;
      try {
        await transactionsService.createMany(validTransactionChunk);
      } catch (error) {
        processOra.fail('❌ Error creating transactions');
        console.error(error);
        transactionsOra.fail();
        return;
      }
    }
    chunkCount++;
    if (chunkCount % LOG_INTERVAL === 0) {
      logMemoryUsage(`Processing chunk #${chunkCount}`);
    }
  }

  processOra.succeed('✅ All transactions processed and updated');
  transactionsOra.succeed('🎉 Transactions seeded successfully');
}

export async function seedDemoAccountInfo() {
  const sessionCookie = await getSessionCookieStorage('en_session');
  if (!sessionCookie) {
    console.error('Session cookie not found. Cannot seed demo account info.');
    return;
  }

  const existingAccounts = await accountsService.findByUserId(sessionCookie.user_id);
  let accounts = existingAccounts;

  if (existingAccounts.length === 0) {
    console.log(chalk.blue.bold('--- Database Seeding Start ---'));
    console.log(`▶️  Running in ${isProduction ? 'Production' : 'Development'} mode.`);

    logMemoryUsage('Initial State');

    console.time(chalk.cyan('Account Seeding Duration'));
    accounts = await seedAccounts(sessionCookie.user_id);
    console.timeEnd(chalk.cyan('Account Seeding Duration'));
    logMemoryUsage('After Account Seeding');
  }

  console.log();

  const accountNumber = accounts[0].account_number;
  const transactions = await transactionsService.findByAccountNumber(Number(accountNumber.toString()));
  console.log('ExistingAccounts Transaction', transactions.length);

  if (transactions.length > 0) {
    console.log(chalk.blue.bold('--- Transactions Already Seeded ---'));
    return;
  }

  console.time(chalk.cyan('Transaction Seeding Duration'));
  await seedTransactions(accounts);
  console.timeEnd(chalk.cyan('Transaction Seeding Duration'));
  logMemoryUsage('After Transaction Seeding');

  console.log(chalk.green.bold('\n--- Database seeding completed successfully! ---'));
}
