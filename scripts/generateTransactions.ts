/**
 * @file: generateTransactions.ts
 * @description: 주어진 계좌 세트에 대한 일련의 거래를 타입스크립트로 생성합니다. (수정 완료)
 */
import type { Transaction } from "@/entities/transactions/transaction.model";
import type { Account } from "./generateAccounts";

const isProduction: boolean = process.env.NODE_ENV === "production";
const NUM_TRANSACTIONS = 150;

type TransactionCode = "DEPOSIT" | "WITHDRAWAL" | "PAYMENT";
type AccountCode = "CHECKING" | "SAVINGS" | "CREDIT" | "LOAN";

const TRANSACTION_INFO: Record<TransactionCode, string[]> = {
  DEPOSIT: [
    "월급 입금",
    "보너스 입금",
    "자금 이체",
    "부업 수입",
    "배당금 입금",
    "카드대금 납부",
  ],
  WITHDRAWAL: [
    "ATM 출금",
    "생활비 출금",
    "경조사비",
    "의료비 출금",
    "교육비 출금",
  ],
  PAYMENT: [
    "온라인 쇼핑",
    "카드대금 결제",
    "통신요금 납부",
    "보험료 납부",
    "공과금 납부",
    "식비 결제",
    "교통비 결제",
  ],
};

const ALLOWED_TRANSACTIONS: Record<AccountCode, TransactionCode[]> = {
  CHECKING: ["DEPOSIT", "WITHDRAWAL", "PAYMENT"],
  SAVINGS: ["DEPOSIT", "WITHDRAWAL"],
  // [수정됨] 신용 계좌에 'DEPOSIT' 거래 유형을 허용합니다.
  CREDIT: ["DEPOSIT", "PAYMENT", "WITHDRAWAL"],
  LOAN: ["DEPOSIT"],
};

const getRandomItem = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const getMonthlyMultiplier = (month: number): number =>
  ({
    0: 1.3,
    1: 1.0,
    2: 1.1,
    3: 1.1,
    4: 1.2,
    5: 1.0,
    6: 1.1,
    7: 1.2,
    8: 1.1,
    9: 1.0,
    10: 1.3,
    11: 1.4,
  })[month] || 1.0;

const getDayOfWeekMultiplier = (dayOfWeek: number): number =>
  ({ 0: 0.7, 1: 1.0, 2: 1.0, 3: 1.1, 4: 1.2, 5: 1.3, 6: 1.1 })[dayOfWeek] ||
  1.0;

const getAmountRange = (
  transactionType: TransactionCode,
): { min: number; max: number } => {
  switch (transactionType) {
    case "DEPOSIT":
      return { min: 50000, max: 500000 };
    case "WITHDRAWAL":
      return { min: 10000, max: 200000 };
    case "PAYMENT":
      return { min: 5000, max: 100000 };
    default:
      return { min: 10000, max: 50000 };
  }
};

const getRandomTransactionType = (
  accountType: AccountCode,
): TransactionCode => {
  const allowedTypes = ALLOWED_TRANSACTIONS[accountType] || [];
  if (allowedTypes.length === 0) return "DEPOSIT";

  const weights: Record<
    AccountCode,
    Partial<Record<TransactionCode, number>>
  > = {
    CHECKING: { DEPOSIT: 0.3, WITHDRAWAL: 0.4, PAYMENT: 0.3 },
    SAVINGS: { DEPOSIT: 0.5, WITHDRAWAL: 0.5 },
    // [수정됨] 신용 계좌에 입금(카드 대금 납부)이 발생할 확률을 추가합니다.
    CREDIT: { DEPOSIT: 0.2, PAYMENT: 0.5, WITHDRAWAL: 0.3 },
    LOAN: { DEPOSIT: 1.0 },
  };

  const accountWeights = weights[accountType];
  if (!accountWeights) return getRandomItem(allowedTypes);

  const random = Math.random();
  let cumulativeWeight = 0;

  for (const type in accountWeights) {
    const weight = accountWeights[type as TransactionCode] || 0;
    cumulativeWeight += weight;
    if (
      random <= cumulativeWeight &&
      allowedTypes.includes(type as TransactionCode)
    ) {
      return type as TransactionCode;
    }
  }
  return getRandomItem(allowedTypes);
};

interface GenerationResult {
  transactions: Transaction[];
  updatedAccounts: Account[];
}

export async function generateTransactions(
  accounts: Account[],
): Promise<GenerationResult> {
  console.log(`\n▶️  실행 환경: ${isProduction ? "Production" : "Development"}`);
  console.log(
    `Transactions generation started for ${accounts.length} accounts`,
  );

  const transactionsPerAccount = NUM_TRANSACTIONS;

  if (accounts.length === 0) {
    console.error("계좌 정보가 없습니다. 거래 생성을 중단합니다.");
    return { transactions: [], updatedAccounts: [] };
  }

  const accountBalances = new Map<number, number>(
    accounts.map((acc) => [acc.account_number, acc.balance]),
  );
  const transactions: Transaction[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setMonth(now.getMonth() - 6);

  let transactionId = 1;
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const { account_number, account_type } = account;

    for (let j = 0; j < transactionsPerAccount; j++) {
      const transaction_type = getRandomTransactionType(
        account_type as AccountCode,
      );
      const currentBalance = accountBalances.get(account_number) || 0;
      let amount = 0;
      const { min, max } = getAmountRange(transaction_type);

      if (transaction_type === "WITHDRAWAL" || transaction_type === "PAYMENT") {
        if (account_type !== "CREDIT" && currentBalance <= min) continue;
        const maxWithdrawal =
          account_type === "CREDIT"
            ? max
            : Math.min(max, currentBalance - 1000);
        if (maxWithdrawal < min) continue;
        amount = getRandomNumber(min, maxWithdrawal);
      } else {
        amount = getRandomNumber(min, max);
      }

      const occurred_at = new Date(
        startDate.getTime() +
          Math.random() * (now.getTime() - startDate.getTime()),
      );
      amount = Math.floor(
        amount *
          getMonthlyMultiplier(occurred_at.getMonth()) *
          getDayOfWeekMultiplier(occurred_at.getDay()),
      );

      if (amount <= 0) continue;

      const newBalance =
        transaction_type === "DEPOSIT"
          ? currentBalance + amount
          : currentBalance - amount;
      accountBalances.set(account_number, newBalance);

      const newTransaction: Transaction = {
        transaction_id: transactionId++,
        account_number,
        amount: Math.floor(amount),
        transaction_type,
        description: getRandomItem(TRANSACTION_INFO[transaction_type]),
        occurred_at,
        counterparty_account_number: null,
      };
      transactions.push(newTransaction);
    }
  }

  transactions.sort(
    (a, b) => a.occurred_at.getTime() - b.occurred_at.getTime(),
  );

  const updatedAccounts: Account[] = accounts.map((acc) => ({
    ...acc,
    balance: Math.floor(accountBalances.get(acc.account_number) || 0),
  }));

  console.log(`\n✅ ${transactions.length}건의 거래 내역 생성 완료`);
  console.log(`✅ ${updatedAccounts.length}개 계좌 잔액 업데이트 완료`);

  return { transactions, updatedAccounts };
}
