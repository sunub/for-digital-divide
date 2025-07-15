function generateAccountNumber() {
  const first = Math.floor(Math.random() * 9) + 1;
  let rest = '';
  for (let i = 0; i < 11; i++) {
    rest += Math.floor(Math.random() * 10);
  }
  return String(first) + rest;
}

const ACCOUNT_TYPES = ['CHECKING', 'SAVINGS', 'CREDIT', 'LOAN'];

function createAccount(user_id) {
  const account_type = ACCOUNT_TYPES[Math.floor(Math.random() * ACCOUNT_TYPES.length)];
  const balance =
    account_type === 'CREDIT' ? -Math.floor(Math.random() * 1000000) : Math.floor(Math.random() * 10000000); // 최대 1천만원으로 제한
  const created_at = new Date(Date.now() - Math.floor(Math.random() * 2 * 365 * 24 * 60 * 60 * 1000)).toISOString();
  return {
    account_number: generateAccountNumber(),
    user_id,
    account_type,
    balance,
    created_at,
  };
}

export function generateAccounts(user_id, count = 4) {
  const accounts = Array.from({ length: count }, () => createAccount(user_id));
  console.log(`${count}개의 계좌 데이터가 생성되었습니다.`);
  return accounts;
}
