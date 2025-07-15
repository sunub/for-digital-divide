import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const isProduction = process.env.NODE_ENV === 'production';
const OUTPUT_DIR = os.tmpdir();
const NUM_TRANSACTIONS = 5000;
const TRANSACTIONS_FILE = 'transactions.csv';
const ACCOUNTS_FILE = 'accounts.csv';

// --- Helper Functions ---
const COUNTERPARTY_ACCOUNTS = [330111222333, 550987654321, 770123456789, 660555444333];
const TRANSACTION_INFO = {
  DEPOSIT: ['월급 입금', '보너스 입금', '자금 이체', '부업 수입', '배당금 입금'],
  WITHDRAWAL: ['ATM 출금', '생활비 출금', '경조사비', '의료비 출금', '교육비 출금'],
  TRANSFER: ['친구에게 송금', '월세 이체', '대출이자 납부', '가족 송금', '적금 이체'],
  PAYMENT: ['온라인 쇼핑', '카드대금 결제', '통신요금 납부', '보험료 납부', '공과금 납부', '식비 결제', '교통비 결제'],
};
const ALLOWED_TRANSACTIONS = {
  CHECKING: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'],
  SAVINGS: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'],
  CREDIT: ['PAYMENT', 'WITHDRAWAL'],
  LOAN: ['DEPOSIT'],
};
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
const getMonthlyMultiplier = (month) =>
  ({ 0: 1.3, 1: 1.0, 2: 1.1, 3: 1.1, 4: 1.2, 5: 1.0, 6: 1.1, 7: 1.2, 8: 1.1, 9: 1.0, 10: 1.3, 11: 1.4 })[month] || 1.0;
const getDayOfWeekMultiplier = (dayOfWeek) =>
  ({ 0: 0.7, 1: 1.0, 2: 1.0, 3: 1.1, 4: 1.2, 5: 1.3, 6: 1.1 })[dayOfWeek] || 1.0;
const getAmountRange = (transactionType) => {
  switch (transactionType) {
    case 'DEPOSIT':
      return { min: 50000, max: 3000000 };
    case 'WITHDRAWAL':
      return { min: 10000, max: 500000 };
    case 'TRANSFER':
      return { min: 20000, max: 1000000 };
    case 'PAYMENT':
      return { min: 5000, max: 300000 };
    default:
      return { min: 10000, max: 100000 };
  }
};
const getRandomTransactionType = (accountType) => {
  const allowedTypes = ALLOWED_TRANSACTIONS[accountType] || [];
  return allowedTypes.length > 0 ? getRandomItem(allowedTypes) : 'DEPOSIT';
};

/**
 * 계좌 정보를 파일에서 비동기적으로 읽어옵니다.
 * @returns {Promise<Array<Object>>} 계좌 정보 배열
 */
async function readAccountsFromCSV() {
  const accountsPath = path.join(OUTPUT_DIR, ACCOUNTS_FILE);
  try {
    const csvContent = await fs.readFile(accountsPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const header = lines.shift().split(',');
    const accounts = lines.map((line) => {
      const values = line.split(',');
      const account = header.reduce((obj, key, index) => {
        let value = values[index];
        if (value?.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        obj[key] = value;
        return obj;
      }, {});
      account.account_number = parseInt(account.account_number, 10);
      account.user_id = parseInt(account.user_id, 10);
      account.balance = parseInt(account.balance, 10);
      return account;
    });
    console.log(`✅ 계좌 정보 로드 완료: ${accounts.length}개 계좌`);
    return accounts;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ 오류: 계좌 파일(${accountsPath})을 찾을 수 없습니다.`);
    } else {
      console.error(`❌ 계좌 파일을 읽는 중 오류 발생:`, error);
    }
    return [];
  }
}

/**
 * 업데이트된 계좌 정보를 CSV에 비동기적으로 저장합니다.
 * @param {Array<Object>} accounts - 저장할 계좌 정보
 */
async function writeAccountsToCSV(accounts) {
  const accountsPath = path.join(OUTPUT_DIR, ACCOUNTS_FILE);
  try {
    const header = 'account_number,user_id,account_type,balance,created_at';
    const rows = accounts.map(
      (acc) => `${acc.account_number},${acc.user_id},${acc.account_type},${acc.balance},"${acc.created_at}"`,
    );
    await fs.writeFile(accountsPath, `${header}\n${rows.join('\n')}`, 'utf-8');
    console.log(`\n✅ 계좌 잔액 업데이트 완료: ${accountsPath}`);
  } catch (error) {
    console.error(`❌ 계좌 파일을 쓰는 중 오류 발생:`, error);
  }
}

/**
 * 거래 내역을 생성하고 CSV 파일로 저장하는 메인 함수
 */
export async function generateAndWriteCsv() {
  console.log(`\n▶️  실행 환경: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`📂 파일 저장 경로: ${OUTPUT_DIR}`);

  // 로컬 환경일 경우에만 디렉토리 생성
  if (!isProduction) {
    try {
      await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch (error) {
      console.error(`❌ 로컬 디렉토리(${OUTPUT_DIR}) 생성에 실패했습니다.`, error);
      return;
    }
  }

  const accounts = await readAccountsFromCSV();
  if (accounts.length === 0) {
    console.error('거래 생성을 중단합니다. 계좌 정보를 먼저 생성해주세요.');
    return;
  }

  const accountBalances = new Map(accounts.map((acc) => [acc.account_number, acc.balance]));
  const transactions = [];
  const now = new Date();
  // 6개월 이내로만 거래 생성
  const startDate = new Date(now);
  startDate.setMonth(now.getMonth() - 6);

  for (let i = 0; i < NUM_TRANSACTIONS; i++) {
    const selectedAccount = getRandomItem(accounts);
    const { account_number, account_type } = selectedAccount;
    const transaction_type = getRandomTransactionType(account_type);

    let currentBalance = accountBalances.get(account_number);
    let amount = 0;

    // 출금/이체 시 잔액 부족으로 인한 무한 루프 방지 및 조정
    if (['WITHDRAWAL', 'PAYMENT', 'TRANSFER'].includes(transaction_type)) {
      if (account_type !== 'CREDIT' && currentBalance <= 1000) continue; // 최소 잔액 없으면 거래 건너뛰기
      const maxWithdrawal = Math.max(currentBalance * 0.8, 0);
      const { min, max } = getAmountRange(transaction_type);
      amount = getRandomNumber(min, Math.min(max, maxWithdrawal));
    } else {
      const { min, max } = getAmountRange(transaction_type);
      amount = getRandomNumber(min, max);
    }

    // 최종 금액 계산
    // 6개월 이내 랜덤 날짜
    const occurredAt = new Date(startDate.getTime() + Math.random() * (now.getTime() - startDate.getTime()));
    const monthMultiplier = getMonthlyMultiplier(occurredAt.getMonth());
    const dayMultiplier = getDayOfWeekMultiplier(occurredAt.getDay());
    amount = Math.floor(amount * monthMultiplier * dayMultiplier);

    if (amount <= 0) continue;

    // 잔액 업데이트
    const newBalance = transaction_type === 'DEPOSIT' ? currentBalance + amount : currentBalance - amount;
    accountBalances.set(account_number, newBalance);

    // Zod 스키마에 맞게 counterparty_account_number는 undefined 또는 number만 허용
    let counterparty_account_number = undefined;
    if (transaction_type === 'TRANSFER') {
      counterparty_account_number = getRandomItem(COUNTERPARTY_ACCOUNTS);
    }

    transactions.push({
      account_number,
      amount: Math.floor(amount),
      transaction_type,
      description: getRandomItem(TRANSACTION_INFO[transaction_type]),
      occurred_at: occurredAt.toISOString(),
      ...(counterparty_account_number !== undefined ? { counterparty_account_number } : {}),
    });
  }

  transactions.sort((a, b) => new Date(a.occurred_at) - new Date(b.occurred_at));

  const header =
    'transaction_id,account_number,amount,transaction_type,description,occurred_at,counterparty_account_number';
  const rows = transactions.map((tr, index) =>
    [
      index + 1,
      tr.account_number,
      tr.amount,
      tr.transaction_type,
      `"${tr.description}"`,
      `"${tr.occurred_at}"`,
      tr.counterparty_account_number || '',
    ].join(','),
  );

  const transactionsPath = path.join(OUTPUT_DIR, TRANSACTIONS_FILE);
  try {
    await fs.writeFile(transactionsPath, `${header}\n${rows.join('\n')}`, 'utf-8');
    console.log(`\n✅ 거래 내역 저장 완료: ${transactionsPath} (${transactions.length}건)`);
  } catch (error) {
    console.error('❌ 거래 파일을 쓰는 도중 오류가 발생했습니다:', error);
    return;
  }

  // 최종 잔액을 원본 계좌 정보에 반영
  const updatedAccounts = accounts.map((acc) => ({
    ...acc,
    balance: accountBalances.get(acc.account_number),
  }));

  await writeAccountsToCSV(updatedAccounts);
}
