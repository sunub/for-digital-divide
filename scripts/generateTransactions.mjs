const isProduction = process.env.NODE_ENV === 'production';
const NUM_TRANSACTIONS = 1000; // 5000개에서 1000개로 감소

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
      return { min: 50000, max: 500000 };
    case 'WITHDRAWAL':
      return { min: 10000, max: 200000 };
    case 'TRANSFER':
      return { min: 20000, max: 300000 };
    case 'PAYMENT':
      return { min: 5000, max: 100000 };
    default:
      return { min: 10000, max: 50000 };
  }
};
const getRandomTransactionType = (accountType) => {
  const allowedTypes = ALLOWED_TRANSACTIONS[accountType] || [];
  if (allowedTypes.length === 0) return 'DEPOSIT';

  // 계좌 타입별 거래 확률 가중치 (현실적인 패턴 반영)
  const weights = {
    CHECKING: { DEPOSIT: 0.15, WITHDRAWAL: 0.35, TRANSFER: 0.25, PAYMENT: 0.25 },
    SAVINGS: { DEPOSIT: 0.3, WITHDRAWAL: 0.4, TRANSFER: 0.3 },
    CREDIT: { PAYMENT: 0.7, WITHDRAWAL: 0.3 },
    LOAN: { DEPOSIT: 1.0 },
  };

  const accountWeights = weights[accountType];
  if (!accountWeights) return getRandomItem(allowedTypes);

  const random = Math.random();
  let cumulativeWeight = 0;

  for (const [type, weight] of Object.entries(accountWeights)) {
    cumulativeWeight += weight;
    if (random <= cumulativeWeight && allowedTypes.includes(type)) {
      return type;
    }
  }

  return getRandomItem(allowedTypes);
};

/**
 * 거래 내역을 생성하는 메인 함수
 * @param {Array<Object>} accounts - 계좌 정보 배열
 * @returns {Promise<{transactions: Array<Object>, updatedAccounts: Array<Object>}>} 생성된 거래 내역과 업데이트된 계좌 정보
 */
export async function generateTransactions(accounts) {
  console.log(`\n▶️  실행 환경: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`� 거래 내역 생성 시작: ${accounts.length}개 계좌`);

  if (accounts.length === 0) {
    console.error('거래 생성을 중단합니다. 계좌 정보를 먼저 제공해주세요.');
    return { transactions: [], updatedAccounts: [] };
  }

  const accountBalances = new Map(accounts.map((acc) => [acc.account_number, acc.balance]));
  const transactions = [];
  const now = new Date();
  // 6개월 이내로만 거래 생성
  const startDate = new Date(now);
  startDate.setMonth(now.getMonth() - 6);

  // 계좌별 거래 분배를 위한 설정
  const transactionsPerAccount = Math.floor(NUM_TRANSACTIONS / accounts.length);
  const extraTransactions = NUM_TRANSACTIONS % accounts.length;
  const accountTransactionCounts = accounts.map(
    (_, index) => transactionsPerAccount + (index < extraTransactions ? 1 : 0),
  );

  console.log(`📊 계좌별 거래 분배: ${accountTransactionCounts.join(', ')}건`);

  let transactionId = 1;

  // 각 계좌별로 거래 생성
  for (let accountIndex = 0; accountIndex < accounts.length; accountIndex++) {
    const account = accounts[accountIndex];
    const { account_number, account_type } = account;
    const transactionCount = accountTransactionCounts[accountIndex];

    console.log(`💳 계좌 ${account_number} (${account_type}): ${transactionCount}건 거래 생성`);

    for (let i = 0; i < transactionCount; i++) {
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
        transaction_id: transactionId++,
        account_number,
        amount: Math.floor(amount),
        transaction_type,
        description: getRandomItem(TRANSACTION_INFO[transaction_type]),
        occurred_at: occurredAt.toISOString(),
        ...(counterparty_account_number !== undefined ? { counterparty_account_number } : {}),
      });
    }
  }

  transactions.sort((a, b) => new Date(a.occurred_at) - new Date(b.occurred_at));

  // 거래 타입별 통계 출력
  const transactionStats = transactions.reduce((stats, tx) => {
    stats[tx.transaction_type] = (stats[tx.transaction_type] || 0) + 1;
    return stats;
  }, {});

  console.log('\n📈 거래 타입별 분배:');
  Object.entries(transactionStats).forEach(([type, count]) => {
    const percentage = ((count / transactions.length) * 100).toFixed(1);
    console.log(`   ${type}: ${count}건 (${percentage}%)`);
  });

  // 최종 잔액을 원본 계좌 정보에 반영
  const updatedAccounts = accounts.map((acc) => ({
    ...acc,
    balance: accountBalances.get(acc.account_number),
  }));

  console.log(`\n✅ 거래 내역 생성 완료: ${transactions.length}건`);
  console.log(`✅ 계좌 잔액 업데이트 완료: ${updatedAccounts.length}개 계좌`);

  return { transactions, updatedAccounts };
}
