import fs from 'fs';
import path from 'path';

const NUM_TRANSACTIONS = 5000;
const OUTPUT_DIR = path.join(process.cwd(), 'prisma/data');
const TRANSACTIONS_FILE = 'transactions.csv';
const ACCOUNTS_FILE = 'accounts.csv';

// 계좌 정보를 파일에서 읽어오기
function readAccountsFromCSV() {
  try {
    const accountsPath = path.join(OUTPUT_DIR, ACCOUNTS_FILE);
    const csvContent = fs.readFileSync(accountsPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    const header = lines[0].split(',');

    const accounts = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const account = {};
      header.forEach((key, index) => {
        let value = values[index];
        // 따옴표 제거
        if (value && value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        account[key] = value;
      });

      // 숫자 타입 변환
      account.account_number = parseInt(account.account_number);
      account.user_id = parseInt(account.user_id);
      account.balance = parseInt(account.balance);

      accounts.push(account);
    }

    console.log(`계좌 정보 로드 완료: ${accounts.length}개 계좌`);
    accounts.forEach((acc) => {
      console.log(`  계좌: ${acc.account_number} (${acc.account_type}) - 잔액: ${acc.balance.toLocaleString()}원`);
    });

    return accounts;
  } catch (error) {
    console.error('계좌 파일을 읽는 중 오류 발생:', error);
    return [];
  }
}

// 업데이트된 계좌 정보를 CSV에 저장
function writeAccountsToCSV(accounts) {
  try {
    const accountsPath = path.join(OUTPUT_DIR, ACCOUNTS_FILE);
    const header = 'account_number,user_id,account_type,balance,created_at';
    const rows = accounts.map(
      (acc) => `${acc.account_number},${acc.user_id},${acc.account_type},${acc.balance},"${acc.created_at}"`,
    );
    const csvContent = `${header}\n${rows.join('\n')}`;

    fs.writeFileSync(accountsPath, csvContent, 'utf-8');
    console.log('\n계좌 잔액 업데이트 완료:');
    accounts.forEach((acc) => {
      console.log(`  계좌: ${acc.account_number} (${acc.account_type}) - 최종 잔액: ${acc.balance.toLocaleString()}원`);
    });
  } catch (error) {
    console.error('계좌 파일을 쓰는 중 오류 발생:', error);
  }
}

const COUNTERPARTY_ACCOUNTS = [330111222333, 550987654321, 770123456789, 660555444333];

// 스키마에서 허용하는 거래 타입만 사용
const TRANSACTION_INFO = {
  DEPOSIT: ['월급 입금', '보너스 입금', '자금 이체', '부업 수입', '배당금 입금'],
  WITHDRAWAL: ['ATM 출금', '생활비 출금', '경조사비', '의료비 출금', '교육비 출금'],
  TRANSFER: ['친구에게 송금', '월세 이체', '대출이자 납부', '가족 송금', '적금 이체'],
  PAYMENT: ['온라인 쇼핑', '카드대금 결제', '통신요금 납부', '보험료 납부', '공과금 납부', '식비 결제', '교통비 결제'],
};

// 계좌 타입별로 허용되는 거래 타입 정의
const ALLOWED_TRANSACTIONS = {
  CHECKING: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'],
  SAVINGS: ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER'],
  CREDIT: ['PAYMENT', 'WITHDRAWAL'],
  LOAN: ['DEPOSIT'],
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

// 월별 소비 패턴
const getMonthlyMultiplier = (month) => {
  const multipliers = {
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
  };
  return multipliers[month] || 1.0;
};

// 요일별 거래 패턴
const getDayOfWeekMultiplier = (dayOfWeek) => {
  const multipliers = {
    0: 0.7,
    1: 1.0,
    2: 1.0,
    3: 1.1,
    4: 1.2,
    5: 1.3,
    6: 1.1,
  };
  return multipliers[dayOfWeek] || 1.0;
};

// 거래 타입별 금액 범위
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

// 계좌 타입에 따른 거래 타입 선택
function getRandomTransactionType(accountType) {
  const allowedTypes = ALLOWED_TRANSACTIONS[accountType] || [];
  if (allowedTypes.length === 0) return 'DEPOSIT';
  return getRandomItem(allowedTypes);
}

function generateAndWriteCsv() {
  console.log('거래 데이터 생성을 시작합니다...');

  // 계좌 정보 로드
  const accounts = readAccountsFromCSV();
  if (accounts.length === 0) {
    console.error('계좌 정보를 찾을 수 없습니다. accounts.csv 파일을 확인해주세요.');
    return;
  }

  // 계좌별 잔액 추적을 위한 맵 생성
  const accountBalances = new Map();
  accounts.forEach((account) => {
    accountBalances.set(account.account_number, account.balance);
  });

  const transactions = [];
  const now = new Date();

  // 최근 8개월간의 데이터 생성
  const startDate = new Date(now);
  startDate.setMonth(startDate.getMonth() - 8);

  for (let i = 1; i <= NUM_TRANSACTIONS; i++) {
    // 랜덤 계좌 선택
    const selectedAccount = getRandomItem(accounts);
    const accountNumber = selectedAccount.account_number;
    const accountType = selectedAccount.account_type;

    // 계좌 타입에 맞는 거래 타입 선택
    const transactionType = getRandomTransactionType(accountType);
    const description = getRandomItem(TRANSACTION_INFO[transactionType]);

    // 랜덤 날짜 생성
    const randomDaysFromStart = Math.floor(getRandomNumber(0, 240));
    const occurredAt = new Date(startDate);
    occurredAt.setDate(occurredAt.getDate() + randomDaysFromStart);

    // 요일과 월별 패턴 적용
    const monthMultiplier = getMonthlyMultiplier(occurredAt.getMonth());
    const dayMultiplier = getDayOfWeekMultiplier(occurredAt.getDay());

    // 시간대별 패턴
    const isBusinessHour = Math.random() < 0.6;
    const hour = isBusinessHour ? Math.floor(getRandomNumber(9, 18)) : Math.floor(getRandomNumber(18, 23));

    occurredAt.setHours(hour);
    occurredAt.setMinutes(Math.floor(getRandomNumber(0, 60)));
    occurredAt.setSeconds(Math.floor(getRandomNumber(0, 60)));

    // 거래 타입별 금액 범위 적용
    const amountRange = getAmountRange(transactionType);
    let baseAmount = getRandomNumber(amountRange.min, amountRange.max);

    // 현재 잔액 확인
    const currentBalance = accountBalances.get(accountNumber);

    // 출금이나 결제의 경우 잔액을 초과하지 않도록 조정
    if (transactionType === 'WITHDRAWAL' || transactionType === 'PAYMENT') {
      const maxWithdrawal = Math.max(currentBalance * 0.8, 0);
      if (baseAmount > maxWithdrawal) {
        baseAmount = Math.max(maxWithdrawal, amountRange.min);
      }
    }

    // 월별, 요일별 패턴을 금액에 반영
    baseAmount *= monthMultiplier * dayMultiplier;

    // 주말 패턴
    if (occurredAt.getDay() === 0 || occurredAt.getDay() === 6) {
      if (transactionType === 'PAYMENT') {
        baseAmount *= 0.7;
      }
    }

    const amount = Math.floor(baseAmount);

    // 잔액 업데이트
    let newBalance = currentBalance;
    if (transactionType === 'DEPOSIT') {
      newBalance += amount;
    } else if (transactionType === 'WITHDRAWAL' || transactionType === 'PAYMENT') {
      newBalance -= amount;
      if (accountType !== 'CREDIT' && newBalance < 0) {
        const adjustedAmount = currentBalance - 1000;
        if (adjustedAmount > 0) {
          newBalance = 1000;
        } else {
          continue;
        }
      }
    } else if (transactionType === 'TRANSFER') {
      newBalance -= amount;
      if (accountType !== 'CREDIT' && newBalance < 0) {
        const adjustedAmount = currentBalance - 1000;
        if (adjustedAmount > 0) {
          newBalance = 1000;
        } else {
          continue;
        }
      }
    }

    accountBalances.set(accountNumber, newBalance);

    // 상대방 계좌 설정 (TRANSFER만)
    const counterpartyAccount = transactionType === 'TRANSFER' ? getRandomItem(COUNTERPARTY_ACCOUNTS) : null;

    transactions.push({
      transaction_id: i,
      account_number: accountNumber,
      amount: amount,
      transaction_type: transactionType,
      description: description,
      occurred_at: occurredAt.toISOString(),
      counterparty_account_number: counterpartyAccount,
    });
  }

  // 시간순으로 정렬
  transactions.sort((a, b) => new Date(a.occurred_at) - new Date(b.occurred_at));

  // transaction_id 재할당
  transactions.forEach((transaction, index) => {
    transaction.transaction_id = index + 1;
  });

  console.log(`\n데이터 생성 완료:`);
  console.log(`- 기간: ${startDate.toLocaleDateString()} ~ ${now.toLocaleDateString()}`);
  console.log(`- 총 거래 건수: ${transactions.length}개`);

  // 월별 거래 건수 분석
  const monthlyCount = {};
  transactions.forEach((t) => {
    const month = new Date(t.occurred_at).toISOString().slice(0, 7);
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  });

  console.log(`\n월별 거래 분포:`);
  Object.entries(monthlyCount)
    .sort()
    .forEach(([month, count]) => {
      console.log(`  ${month}: ${count}건`);
    });

  // CSV 저장 - 스키마 호환성을 위해 수정
  const header =
    'transaction_id,account_number,amount,transaction_type,description,occurred_at,counterparty_account_number';
  const rows = transactions.map((tr) => {
    // counterparty_account_number가 null인 경우 빈 문자열로 저장
    const counterparty = tr.counterparty_account_number || '';
    return `${tr.transaction_id},${tr.account_number},${tr.amount},${tr.transaction_type},"${tr.description}","${tr.occurred_at}",${counterparty}`;
  });
  const csvContent = `${header}\n${rows.join('\n')}`;

  try {
    fs.writeFileSync(path.join(OUTPUT_DIR, TRANSACTIONS_FILE), csvContent, 'utf-8');
    console.log(`\n거래 내역 저장 완료: ${TRANSACTIONS_FILE}`);
  } catch (error) {
    console.error('거래 파일을 쓰는 도중 오류가 발생했습니다:', error);
    return;
  }

  // 계좌 잔액 업데이트
  accounts.forEach((account) => {
    account.balance = accountBalances.get(account.account_number);
  });

  writeAccountsToCSV(accounts);
}

// 스크립트 실행
generateAndWriteCsv();
