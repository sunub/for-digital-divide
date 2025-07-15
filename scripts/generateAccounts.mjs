import fs from 'fs';
import path from 'path';

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
    account_type === 'CREDIT' ? -Math.floor(Math.random() * 100000000) : Math.floor(Math.random() * 5000000000);
  const created_at = new Date(Date.now() - Math.floor(Math.random() * 2 * 365 * 24 * 60 * 60 * 1000)).toISOString();
  return {
    account_number: generateAccountNumber(),
    user_id,
    account_type,
    balance,
    created_at,
  };
}

export async function generateAccountsCSV(user_id, count = 4) {
  const headers = ['account_number', 'user_id', 'account_type', 'balance', 'created_at'];
  const accounts = Array.from({ length: count }, () => createAccount(user_id));
  const csvRows = [headers.join(',')];
  for (const acc of accounts) {
    csvRows.push(headers.map((h) => acc[h]).join(','));
  }
  const csvContent = csvRows.join('\n');
  const outputPath = path.join(process.cwd(), '/prisma/data/accounts.csv');

  // 기존 파일이 있으면 내용을 모두 덮어씀
  fs.writeFileSync(outputPath, '', 'utf8'); // 내용 비우기
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log('accounts.csv 파일이 새로 작성되었습니다:', outputPath);
}
