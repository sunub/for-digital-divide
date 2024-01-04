"use server";

import pg from "pg";
import {
  object,
  date,
  string,
  minLength,
  maxLength,
  minValue,
  maxValue,
  safeParse,
} from "valibot";

type AccountKey = "userId" | "accountNumber" | "createdDate";

export type Account = Record<AccountKey, string | Date>;

const AccountSchema = object({
  user_id: string("사용자 아이디", [
    maxLength(255, "255자리의 계좌번호를 입력해주세요."),
  ]),
  account_number: string("계좌번호", [
    minLength(14, "14자리의 계좌번호를 입력해주세요."),
    maxLength(14, "14자리의 계좌번호를 입력해주세요."),
  ]),
  created_date: date([
    minValue(
      new Date(2021, 0, 1),
      "2021년 1월 1일 이후의 날짜를 입력해주세요."
    ),
    maxValue(new Date(), "오늘 이전의 날짜를 입력해주세요."),
  ]),
});

export async function getBankAccount(): Promise<Account> {
  let accountData: Account = {
    userId: "",
    accountNumber: "",
    createdDate: new Date(),
  };

  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });

  try {
    const client = await pool.connect();
    const table = await client.query(`
      SELECT user_id, account_number, created_date FROM bank_account;
    `);
    const { rows } = table;
    const checkAccount = safeParse(AccountSchema, rows[0]);

    if (checkAccount.success) {
      Object.entries(checkAccount.output).forEach(([key, value]) => {
        let accountKey = key
          .split("_")
          .map((word, i) =>
            i === 1 ? word[0].toUpperCase() + word.slice(1) : word
          )
          .join("");
        accountData[accountKey as AccountKey] = value;
      });
    }

    await client.release();
  } catch (error) {
    console.error(error);
  }

  if (Object.keys(accountData).length === 0) {
    console.error("No bank account data found");
    return accountData;
  }

  return accountData;
}
