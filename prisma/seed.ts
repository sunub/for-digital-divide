'use server';

import os from 'os';
import path from 'path';
import chalk from 'chalk';
import Papa from 'papaparse';
import ora from 'ora';
import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';

import { accountsService } from '@/entities/accounts/accounts.service';
import { AccountsSchema, AccountType } from '@/entities/accounts/accounts.model';
import { transactionsService } from '@/entities/transactions/transaction.service';
import { TransactionSchema, type Transaction } from '@/entities/transactions/transaction.model';
import { map } from '@/utils/iterable/map';
import { chunk } from '@/utils/iterable/chunk';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';
import { generateAndWriteCsv } from '../scripts/generateTransactions.mjs';

const isProduction = process.env.NODE_ENV === 'production';
const dataFilePath = os.tmpdir();

function logMemoryUsage(label: string) {
  const memoryUsage = process.memoryUsage();
  const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
  console.log(chalk.yellow(`[Memory Usage: ${label}] Heap used: ${heapUsedMb} MB`));
}

const accountsOra = ora('💳 Seeding Accounts Start');
const transactionsOra = ora('💸 Seeding Transactions Start');

async function readAccounts(): Promise<AccountType[]> {
  const readAccountsOra = ora('📖 Reading Accounts Data').start();
  const filePath = path.join(dataFilePath, 'accounts.csv');
  try {
    const fileContent = (await readFile(filePath, 'utf-8')).trim();
    const parsedData = Papa.parse(fileContent, { header: true });
    readAccountsOra.succeed(`🎉 Accounts data read successfully from ${filePath}`);
    return parsedData.data as AccountType[];
  } catch (error) {
    readAccountsOra.fail(`❌ Failed to read accounts data from ${filePath}`);
    console.error(error);
    return [];
  }
}

async function generateAccounts() {
  accountsOra.start();
  const accounts = await readAccounts();
  if (accounts.length === 0) {
    accountsOra.fail('No account data found to seed.');
    return;
  }

  const updateAccountsOra = ora('🔄 Validating and updating accounts data').start();
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
      return;
    }

    const existingAccount = await accountsService.findByAccountNumber(parsedAccount.data.account_number);
    if (existingAccount) {
      continue;
    }
    await accountsService.create(parsedAccount.data);
  }
  updateAccountsOra.succeed('✅ Accounts data validated and updated successfully');
  accountsOra.succeed('🎉 Accounts seeded successfully');
}

async function* readTransactions(): AsyncGenerator<Transaction> {
  const filePath = path.join(dataFilePath, 'transactions.csv');
  const fileStream = createReadStream(filePath);
  const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
    header: true,
    dynamicTyping: true,
  });

  fileStream.on('error', (err) => {
    transactionsOra.fail(`❌ Failed to read transactions file: ${filePath}`);
    console.error(err);
  });

  const stream = fileStream.pipe(parseStream);
  for await (const row of stream) {
    yield row as Transaction;
  }
}

async function validateTransaction(transaction: Transaction) {
  const parsedTransaction = TransactionSchema.safeParse({
    transaction_id: Number(transaction.transaction_id),
    account_number: Number(transaction.account_number),
    amount: Number(transaction.amount),
    transaction_type: transaction.transaction_type,
    counterparty_account_number: Number(transaction.counterparty_account_number) || null,
    description: transaction.description,
    occurred_at: transaction.occurred_at,
  });
  if (!parsedTransaction.success) {
    console.error(parsedTransaction.error);
    return null;
  }
  return parsedTransaction.data;
}

async function validateAndFilterChunk(transactionChunk: Transaction[]): Promise<Transaction[]> {
  const validationPromises = transactionChunk.map(validateTransaction);
  const validatedResults = await Promise.all(validationPromises);
  return validatedResults.filter((t): t is Transaction => t !== null);
}

async function generateTransactions() {
  transactionsOra.start();
  const transactionStream = readTransactions();
  const processOra = ora('📖 Reading and processing transaction data...').start();

  const chunkedAndValidatedStream = map(validateAndFilterChunk, chunk(1000, transactionStream));

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

  const accounts = await accountsService.findByUserId(sessionCookie.user_id);
  if (accounts.length === 0) {
    console.log(chalk.blue.bold('--- Database Seeding Start ---'));
    console.log(`▶️  Running in ${isProduction ? 'Production' : 'Development'} mode.`);
    console.log(`📂 Using data path: ${dataFilePath}`);

    logMemoryUsage('Initial State');

    console.time(chalk.cyan('Account Seeding Duration'));
    await generateAccounts();
    console.timeEnd(chalk.cyan('Account Seeding Duration'));
    logMemoryUsage('After Account Seeding');
  }

  console.log();

  const accountNumber = accounts[0].account_number;
  const transactions = await transactionsService.findByAccountNumber(Number(accountNumber.toString()));

  if (transactions.length > 0) {
    console.log(chalk.blue.bold('--- Transactions Already Seeded ---'));
    return;
  }

  await generateAndWriteCsv();

  console.time(chalk.cyan('Transaction Seeding Duration'));
  await generateTransactions();
  console.timeEnd(chalk.cyan('Transaction Seeding Duration'));
  logMemoryUsage('After Transaction Seeding');

  console.log(chalk.green.bold('\n--- Database seeding completed successfully! ---'));
}
