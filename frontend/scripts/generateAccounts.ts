/**
 * @file: generateAccounts.ts
 * @description: 사용자를 위해 지정된 수의 은행 계좌를 타입스크립트로 생성합니다.
 */
import type { z } from "zod/v4";
import type { AccountsSchema } from "@/entities/accounts/accounts.model";

// Zod 스키마로부터 Account의 타입을 추론합니다.
export type Account = z.infer<typeof AccountsSchema>;

// 계좌 유형에 대한 타입을 정의하여 코드 안정성을 높입니다.
type AccountCode = "CHECKING" | "SAVINGS" | "CREDIT" | "LOAN";

const ACCOUNT_TYPES: AccountCode[] = ["CHECKING", "SAVINGS", "CREDIT", "LOAN"];

/**
 * 스키마에 맞게 12자리 계좌번호를 숫자로 생성합니다.
 * @returns {number} 생성된 계좌번호
 */
function generateAccountNumber(): number {
  const first = String(Math.floor(Math.random() * 9) + 1);
  const rest = Array.from({ length: 11 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");
  return Number(first + rest);
}

/**
 * 단일 계좌 데이터를 생성합니다.
 * @param {number} user_id - 계좌 소유자의 user_id
 * @returns {Account} 생성된 계좌 객체
 */
function createAccount(user_id: number): Account {
  const account_type: AccountCode =
    ACCOUNT_TYPES[Math.floor(Math.random() * ACCOUNT_TYPES.length)];
  const balance =
    account_type === "CREDIT"
      ? -Math.floor(Math.random() * 1000000)
      : Math.floor(Math.random() * 10000000) + 100000;

  return {
    account_number: generateAccountNumber(),
    user_id,
    account_type,
    balance,
    created_at: new Date(
      Date.now() - Math.floor(Math.random() * 2 * 365 * 24 * 60 * 60 * 1000),
    ),
  };
}

/**
 * 지정된 수의 계좌 데이터를 배열 형태로 생성합니다.
 * @param {number} user_id - 계좌 소유자의 user_id
 * @param {number} [count=4] - 생성할 계좌의 수
 * @returns {Account[]} 계좌 객체 배열
 */
export function generateAccounts(user_id: number, count = 4): Account[] {
  const accounts = Array.from({ length: count }, () => createAccount(user_id));
  console.log(`${count}개의 계좌 데이터가 생성되었습니다.`);
  return accounts;
}
