/**
 * @file: generateTransactions.ts
 * @description: 주어진 계좌 세트에 대한 일련의 거래를 타입스크립트로 생성합니다. (수정 완료)
 */
import type { Transaction } from "@/entities/transactions/transaction.model";
import type { Account } from "./generateAccounts";

const isProduction: boolean = process.env.NODE_ENV === "production";

type TransactionCode = "DEPOSIT" | "WITHDRAWAL" | "PAYMENT";

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

interface GenerationResult {
  transactions: Transaction[];
  updatedAccounts: Account[];
}

export async function generateTransactions(
  accounts: Account[],
): Promise<GenerationResult> {
  console.log(`\n▶️  실행 환경: ${isProduction ? "Production" : "Development"}`);
  console.log(
    `Transactions generation started for ${accounts.length} accounts using cyclical model`
  );

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
  startDate.setHours(0, 0, 0, 0);

  let transactionId = 1;

  // 6개월 동안의 총 일수 계산
  const totalDays = Math.ceil(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // 시간대 다양화를 위한 헬퍼 함수
  const getRandomTime = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(
      Math.floor(Math.random() * 12) + 8, // 08시 ~ 20시 사이
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60),
    );
    return newDate;
  };

  // 6개월의 날짜를 하루씩 지나며 거래를 생성
  for (let d = 0; d <= totalDays; d++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + d);

    const dayOfMonth = currentDate.getDate();
    const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일

    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      const { account_number, account_type } = account;
      const currentBalance = accountBalances.get(account_number) || 0;

      if (account_type === "CHECKING") {
        // 1. 월급 입금 (매월 25일)
        if (dayOfMonth === 25) {
          const amount = Math.floor(getRandomNumber(2800000, 3800000));
          const occurred_at = getRandomTime(currentDate);
          transactions.push({
            transaction_id: transactionId++,
            account_number,
            amount,
            transaction_type: "DEPOSIT",
            description: "월급 입금",
            occurred_at,
            counterparty_account_number: null,
          });
          accountBalances.set(account_number, currentBalance + amount);
        }

        // 2. 카드대금/공과금 지출 (매월 10일)
        if (dayOfMonth === 10) {
          const amount = Math.floor(getRandomNumber(800000, 1600000));
          const occurred_at = getRandomTime(currentDate);
          const balanceAfter = accountBalances.get(account_number) || 0;
          if (balanceAfter > amount) {
            transactions.push({
              transaction_id: transactionId++,
              account_number,
              amount,
              transaction_type: "PAYMENT",
              description: getRandomItem([
                "카드대금 결제",
                "공과금 납부",
                "보험료 납부",
              ]),
              occurred_at,
              counterparty_account_number: null,
            });
            accountBalances.set(account_number, balanceAfter - amount);
          }
        }

        // 3. 일상 소액 지출 (매일 65% 확률로 1~2건 발생)
        if (Math.random() < 0.65) {
          const numTxs = Math.random() < 0.3 ? 2 : 1;
          for (let k = 0; k < numTxs; k++) {
            const tempBalance = accountBalances.get(account_number) || 0;
            const isWeekend =
              dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
            const minAmt = 5000;
            const maxAmt = isWeekend ? 130000 : 45000;
            let amount = getRandomNumber(minAmt, maxAmt);

            // 월별 및 요일별 변동 계수 가중치 적용
            amount =
              amount *
              getMonthlyMultiplier(currentDate.getMonth()) *
              getDayOfWeekMultiplier(dayOfWeek);

            const finalAmount = Math.floor(amount);

            if (tempBalance > finalAmount + 5000) {
              const occurred_at = getRandomTime(currentDate);
              const txType = Math.random() < 0.15 ? "WITHDRAWAL" : "PAYMENT";
              transactions.push({
                transaction_id: transactionId++,
                account_number,
                amount: finalAmount,
                transaction_type: txType,
                description: getRandomItem(TRANSACTION_INFO[txType]),
                occurred_at,
                counterparty_account_number: null,
              });
              accountBalances.set(account_number, tempBalance - finalAmount);
            }
          }
        }

        // 4. 소소한 부수입 (매달 약 1~2회 랜덤 발생)
        if (Math.random() < 0.05) {
          const tempBalance = accountBalances.get(account_number) || 0;
          const amount = Math.floor(getRandomNumber(20000, 150000));
          const occurred_at = getRandomTime(currentDate);
          transactions.push({
            transaction_id: transactionId++,
            account_number,
            amount,
            transaction_type: "DEPOSIT",
            description: getRandomItem([
              "부업 수입",
              "배당금 입금",
              "자금 이체",
            ]),
            occurred_at,
            counterparty_account_number: null,
          });
          accountBalances.set(account_number, tempBalance + amount);
        }
      } else if (account_type === "SAVINGS") {
        // 저축 계좌: 매월 25일에 자동 이체 입금
        if (dayOfMonth === 25) {
          const amount = Math.floor(getRandomNumber(400000, 1000000));
          const occurred_at = getRandomTime(currentDate);
          transactions.push({
            transaction_id: transactionId++,
            account_number,
            amount,
            transaction_type: "DEPOSIT",
            description: "정기 적금 입금",
            occurred_at,
            counterparty_account_number: null,
          });
          accountBalances.set(account_number, currentBalance + amount);
        }

        // 비정기 소액 출금 (6개월 중 약 2~3회 랜덤 발생)
        if (Math.random() < 0.01) {
          const amount = Math.floor(getRandomNumber(100000, 400000));
          const tempBalance = accountBalances.get(account_number) || 0;
          if (tempBalance > amount + 10000) {
            const occurred_at = getRandomTime(currentDate);
            transactions.push({
              transaction_id: transactionId++,
              account_number,
              amount,
              transaction_type: "WITHDRAWAL",
              description: "생활비 출금",
              occurred_at,
              counterparty_account_number: null,
            });
            accountBalances.set(account_number, tempBalance - amount);
          }
        }
      } else if (account_type === "CREDIT") {
        // 신용카드 계좌: 잔액이 마이너스로 누적되는 구조
        // 카드 사용 (PAYMENT/WITHDRAWAL): 매일 55% 확률로 발생
        if (Math.random() < 0.55) {
          const amount = Math.floor(
            getRandomNumber(10000, 130000) *
              getMonthlyMultiplier(currentDate.getMonth()) *
              getDayOfWeekMultiplier(dayOfWeek),
          );
          const occurred_at = getRandomTime(currentDate);
          const txType = Math.random() < 0.08 ? "WITHDRAWAL" : "PAYMENT";
          transactions.push({
            transaction_id: transactionId++,
            account_number,
            amount,
            transaction_type: txType,
            description: getRandomItem(TRANSACTION_INFO[txType]),
            occurred_at,
            counterparty_account_number: null,
          });
          accountBalances.set(account_number, currentBalance - amount);
        }

        // 카드 대금 결제 (DEPOSIT): 매월 10일에 누적 사용액(마이너스 분)을 0으로 메꿈
        if (dayOfMonth === 10) {
          const tempBalance = accountBalances.get(account_number) || 0;
          if (tempBalance < 0) {
            const amount = Math.abs(tempBalance);
            const occurred_at = getRandomTime(currentDate);
            transactions.push({
              transaction_id: transactionId++,
              account_number,
              amount,
              transaction_type: "DEPOSIT",
              description: "카드대금 납부",
              occurred_at,
              counterparty_account_number: null,
            });
            accountBalances.set(account_number, 0);
          }
        }
      } else if (account_type === "LOAN") {
        // 대출 계좌: 매월 25일에 대출금 상환 입금 발생 (LOAN은 DEPOSIT만 허용)
        if (dayOfMonth === 25) {
          const amount = Math.floor(getRandomNumber(200000, 450000));
          const occurred_at = getRandomTime(currentDate);
          transactions.push({
            transaction_id: transactionId++,
            account_number,
            amount,
            transaction_type: "DEPOSIT",
            description: "대출 원리금 상환",
            occurred_at,
            counterparty_account_number: null,
          });
          accountBalances.set(account_number, currentBalance + amount);
        }
      }
    }
  }

  // 거래 데이터를 시간순으로 정렬
  transactions.sort(
    (a, b) => a.occurred_at.getTime() - b.occurred_at.getTime(),
  );

  const updatedAccounts: Account[] = accounts.map((acc) => ({
    ...acc,
    balance: Math.floor(accountBalances.get(acc.account_number) || 0),
  }));

  console.log(`\n✅ ${transactions.length}건의 거래 내역 생성 완료`);
  console.log(`\n✅ ${updatedAccounts.length}개 계좌 잔액 업데이트 완료`);

  return { transactions, updatedAccounts };
}
