"use server";

import pg from "pg";
import * as v from "valibot";
import bcrypt from "bcrypt";

const AccountNumberSchema = v.string("계좌번호", [
  v.minLength(11, "11자리의 계좌번호를 입력해주세요."),
  v.maxLength(14, "14자리의 계좌번호를 입력해주세요."),
]);

async function seedTransactionHistory() {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();

  try {
    const createDetailTable = `
      CREATE TABLE IF NOT EXISTS transaction_type_details (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) NOT NULL UNIQUE,
        description VARCHAR(255) NOT NULL
      );
    `;

    await client.query(createDetailTable);
    console.log("가상 은행 계좌에 대한 거래 내역 상세 테이블 추가");

    const createTable = `
      CREATE TABLE IF NOT EXISTS transaction_history (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(username), -- 사용자 아이디
        counter_party VARCHAR(14) NOT NULL, -- 거래 상대방 이름
        account_number VARCHAR(14) NOT NULL UNIQUE CHECK(LENGTH(account_number) BETWEEN 11 AND 14 AND account_number ~ '^[0-9]+$'), -- 거래 계좌 번호
        transaction_type VARCHAR(2) NOT NULL CHECK (transaction_type IN ('입금', '출금')), -- 거래의 종류
        transaction_type_detail_id INT NOT NULL REFERENCES transaction_type_details(id), -- 거래의 상세 종류
        transaction_amount INT NOT NULL, -- 거래 금액
        transaction_time TIMESTAMP NOT NULL -- 거래 시간
      );
    `;

    await client.query(createTable);
    console.log("가상 은행 계좌에 대한 거래 내역 테이블 추가");
  } catch (error) {
    console.error(
      "가상 은행 계좌에 대한 거래 내역 테이블 추가 중 에러 발생",
      error
    );
  }

  client.release();
}

seedTransactionHistory();
