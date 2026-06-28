"use server";

import { type Account, generateAccounts } from "@root/scripts/generateAccounts";
import { generateTransactions } from "@root/scripts/generateTransactions";
import { prisma } from "@root/prisma/prisma";
import chalk from "chalk";
import ora from "ora";
import {
  AccountsSchema,
  type AccountType,
} from "@/entities/accounts/accounts.model";
import { accountsService } from "@/entities/accounts/accounts.service";
import {
  type Transaction,
  TransactionSchema,
} from "@/entities/transactions/transaction.model";
import { transactionsService } from "@/entities/transactions/transaction.service";
import { getSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";
import { chunk } from "@/utils/iterable/chunk";
import { map } from "@/utils/iterable/map";

const isProduction = process.env.NODE_ENV === "production";

function logMemoryUsage(label: string) {
  const memoryUsage = process.memoryUsage();
  const heapUsedMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
  console.log(
    chalk.yellow(`[메모리 사용량: ${label}] 힙 사용량: ${heapUsedMb} MB`),
  );
}

const accountsOra = ora("💳 계정 시딩 시작");
const transactionsOra = ora("💸 거래내역 시딩 시작");

async function seedAccounts(userId: number) {
  accountsOra.start();
  const accounts = generateAccounts(userId, 4);

  const updateAccountsOra = ora("🔄 계정 데이터 검증 및 업데이트 중").start();
  const validatedAccounts: AccountType[] = [];

  for (const account of accounts) {
    const parsedAccount = AccountsSchema.safeParse({
      account_number: Number(account.account_number),
      user_id: Number(account.user_id),
      account_type: account.account_type,
      balance: Number(account.balance),
      created_at: new Date(account.created_at),
    });
    if (!parsedAccount.success) {
      updateAccountsOra.fail("❌ 잘못된 계정 데이터");
      console.error(parsedAccount.error);
      accountsOra.fail();
      return [];
    }

    validatedAccounts.push(parsedAccount.data);
  }

  const existingAccounts = await accountsService.findByUserId(userId);
  const existingAccountNumbers = new Set(
    existingAccounts.map((account) => Number(account.account_number)),
  );
  const newAccounts = validatedAccounts.filter(
    (account) => !existingAccountNumbers.has(account.account_number),
  );

  if (newAccounts.length > 0) {
    await accountsService.createMany(newAccounts);
  }

  updateAccountsOra.succeed("✅ 계정 데이터 검증 및 업데이트 성공");
  accountsOra.succeed("🎉 계정 시딩 성공");
  return accountsService.findByUserId(userId);
}

interface GeneratedTransaction {
  transaction_id: number;
  account_number: number;
  amount: number;
  transaction_type: string;
  description?: string;
  occurred_at: Date;
  counterparty_account_number?: number | null;
}

async function validateTransaction(transaction: GeneratedTransaction) {
  const parsedTransaction = TransactionSchema.safeParse({
    transaction_id: Number(transaction.transaction_id),
    account_number: Number(transaction.account_number),
    amount: Number(transaction.amount),
    transaction_type: transaction.transaction_type,
    counterparty_account_number:
      Number(transaction.counterparty_account_number) || null,
    description: transaction.description,
    occurred_at: new Date(transaction.occurred_at),
  });
  if (!parsedTransaction.success) {
    console.error(parsedTransaction.error);
    return null;
  }
  return parsedTransaction.data;
}

async function validateAndFilterChunk(
  transactionChunk: GeneratedTransaction[],
): Promise<Transaction[]> {
  const validationPromises = transactionChunk.map(validateTransaction);
  const validatedResults = await Promise.all(validationPromises);
  return validatedResults.filter((t): t is Transaction => t !== null);
}

async function seedTransactions(accounts: Account[]) {
  transactionsOra.start();
  const processOra = ora("📊 거래 데이터 생성 중...").start();

  console.log(`🔢 ${accounts.length}개 계정에 대한 거래 생성을 시작합니다`);

  const { transactions } =
    await generateTransactions(accounts);

  processOra.text = "🔄 거래 처리 및 검증 중...";
  console.log(`📋 ${transactions.length}개의 거래를 처리 중입니다`);

  const chunkedAndValidatedStream = map(
    validateAndFilterChunk,
    chunk(500, transactions as GeneratedTransaction[]),
  );

  let chunkCount = 0;
  const LOG_INTERVAL = 50;

  for await (const validTransactionChunk of chunkedAndValidatedStream) {
    if (validTransactionChunk.length > 0) {
      processOra.text = `🔄 ${validTransactionChunk.length}개 거래 청크 업데이트 중...`;
      try {
        const dataToInsert = validTransactionChunk.map(
          ({ transaction_id, ...rest }) => rest,
        );
        
        const netChanges: Record<number, number> = {};
        for (const tx of dataToInsert) {
           const amt = Number(tx.amount);
           if (tx.transaction_type === 'WITHDRAWAL' || tx.transaction_type === 'PAYMENT') {
              netChanges[tx.account_number] = (netChanges[tx.account_number] || 0) - amt;
           } else if (tx.transaction_type === 'DEPOSIT') {
              netChanges[tx.account_number] = (netChanges[tx.account_number] || 0) + amt;
           }
        }

        const operations = [
          prisma.transactions.createMany({ data: dataToInsert }),
          ...Object.entries(netChanges).map(([accNum, change]) => 
             prisma.accounts.update({
                where: { account_number: Number(accNum) },
                data: { balance: { increment: change } }
             })
          )
        ];

        await prisma.$transaction(operations);
      } catch (error) {
        processOra.fail("❌ 거래 생성 중 오류 발생");
        console.error(error);
        transactionsOra.fail();
        return;
      }
    }
    chunkCount++;
    if (chunkCount % LOG_INTERVAL === 0) {
      logMemoryUsage(`청크 처리 중 #${chunkCount}`);
    }
  }

  processOra.succeed("✅ 모든 거래 처리 및 업데이트 완료");
  transactionsOra.succeed("🎉 거래내역 시딩 성공");
}

export async function seedDemoAccountAndTransactionInfo() {
  const sessionCookie = await getSessionCookieStorage("en_session");
  if (!sessionCookie) {
    console.error(
      "세션 쿠키를 찾을 수 없습니다. 데모 계정 정보를 시딩할 수 없습니다.",
    );
    return;
  }

  const existingAccounts = await accountsService.findByUserId(
    sessionCookie.user_id,
  );
  let accounts = existingAccounts;

  if (existingAccounts.length === 0) {
    console.log(chalk.blue.bold("--- 데이터베이스 시딩 시작 ---"));
    console.log(
      `▶️  ${isProduction ? "프로덕션" : "개발"} 모드에서 실행 중입니다.`,
    );
    logMemoryUsage("초기 상태");

    console.time(chalk.cyan("계정 시딩 소요 시간"));
    accounts = await seedAccounts(sessionCookie.user_id);
    console.timeEnd(chalk.cyan("계정 시딩 소요 시간"));
    logMemoryUsage("계정 시딩 후");
  }

  if (accounts.length === 0) {
    console.log(
      chalk.red.bold("--- 거래내역을 시딩할 계정을 찾을 수 없습니다. ---"),
    );
    return;
  }

  const seededAccountNumbers = new Set(
    (
      await transactionsService.findSeededAccountNumbers(
        accounts.map((account) => Number(account.account_number)),
      )
    ).map((transaction) => Number(transaction.account_number)),
  );
  const allAccountsSeeded = accounts.every((account) =>
    seededAccountNumbers.has(Number(account.account_number)),
  );

  if (allAccountsSeeded) {
    console.log(
      chalk.blue.bold(
        "--- 모든 계정에 대한 거래내역이 이미 시딩되었습니다. ---",
      ),
    );
    return;
  }

  console.time(chalk.cyan("거래내역 시딩 소요 시간"));
  const transformedAccounts = accounts.map((account) => ({
    account_number: Number(account.account_number),
    user_id: account.user_id,
    account_type: account.account_type as
      | "CHECKING"
      | "SAVINGS"
      | "CREDIT"
      | "LOAN",
    balance: Number(account.balance),
    created_at: account.created_at,
  }));
  await seedTransactions(transformedAccounts);
  console.timeEnd(chalk.cyan("거래내역 시딩 소요 시간"));
  logMemoryUsage("거래내역 시딩 후");

  console.log(
    chalk.green.bold(
      "\n--- 데이터베이스 시딩이 성공적으로 완료되었습니다! ---",
    ),
  );
}
