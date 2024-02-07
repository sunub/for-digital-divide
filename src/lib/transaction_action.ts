"use server";

import pg from "pg";
import * as v from "valibot";
import bcrypt from "bcrypt";

interface VirtualUserData {
  userId: string;
  username: string;
  counterParty: string;
  accountNumber: string;
  transactionType: string;
  transactionTypeDetailId: number;
  transactionAmount: number;
  transactionTime: string;
}

/**
 * @description 가상 은행 계좌에 대한 거래 내역 테이블을 생성합니다.
 * @returns
 */
async function seedTransactionHistory() {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();

  const isExistDetailTableQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'transaction_type_details'
    );
  `;
  const isExistDetailTable = await client.query(isExistDetailTableQuery);
  if (isExistDetailTable.rows[0].exists) {
    console.log(
      "가상 은행 계좌에 대한 거래 내역 상세 테이블이 이미 존재합니다",
    );
  } else {
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
    } catch (error) {
      console.error(
        "가상 은행 계좌에 대한 거래 내역 상세 테이블 추가 중 에러 발생",
        error,
      );
    }
  }

  const isExistHistoryTableQuery = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'transaction_history'
    );
  `;
  const isExistHistoryTable = await client.query(isExistHistoryTableQuery);
  if (isExistHistoryTable.rows[0].exists) {
    console.log("가상 은행 계좌에 대한 거래 내역 테이블이 이미 존재합니다");
    client.release();
    return;
  }

  try {
    const createTable = `
      CREATE TABLE IF NOT EXISTS transaction_history (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(username), -- 사용자 아이디
        username VARCHAR(255) NOT NULL, -- 사용자 이름
        counter_party VARCHAR(14) NOT NULL, -- 거래 상대방 이름
        account_number VARCHAR(14) NOT NULL UNIQUE CHECK(LENGTH(account_number) BETWEEN 11 AND 14 AND account_number ~ '^[0-9]+$'), -- 거래 계좌 번호
        transaction_type VARCHAR(2) NOT NULL CHECK (transaction_type IN ('입금', '출금')), -- 거래의 종류
        transaction_type_id INT NOT NULL, -- 거래 상세 종류
        transaction_amount INT NOT NULL, -- 거래 금액
        transaction_time TIMESTAMP NOT NULL -- 거래 시간
      );
    `;

    await client.query(createTable);
    console.log("가상 은행 계좌에 대한 거래 내역 테이블 추가");
  } catch (error) {
    console.error(
      "가상 은행 계좌에 대한 거래 내역 테이블 추가 중 에러 발생",
      error,
    );
  }

  client.release();
}

async function insertIntoTypeDetails(
  code: number,
  description: string,
  client: pg.PoolClient,
) {
  try {
    const insertTypeDetails = `
      INSERT INTO transaction_type_details (code, description)
      VALUES ($1, $2);
    `;
    await client.query(insertTypeDetails, [code, description]);
    console.log("가상 은행 거래 내역 상세 테이블 추가");
  } catch (error) {
    console.error("가상 은행 거래 내역 상세 테이블 추가 중 에러 발생", error);
  }
}

/**
 * @description 가상 은행 거래 내역 상세 테이블에 초기 데이터를 추가합니다.
 */
async function initVirtualTypeDetails() {
  const codes = [100, 101, 102, 103, 104];
  const descriptions = [
    "입금",
    "기일 출금",
    "체크 카드",
    "ATM 출금",
    "현금 인출",
  ];

  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();

  for (let i = 0; i < codes.length; i++) {
    await insertIntoTypeDetails(codes[i], descriptions[i], client);
  }

  client.release();
}

async function insertTransactionHistory(
  userdata: VirtualUserData,
  client: pg.PoolClient,
) {
  try {
    const {
      userId,
      username,
      accountNumber,
      counterParty,
      transactionType,
      transactionTypeDetailId,
      transactionAmount,
      transactionTime,
    } = userdata;
    const insertTransaction = `
      INSERT INTO transaction_history (user_id, username, counter_party, account_number, transaction_type, transaction_type_id, transaction_amount, transaction_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    await client.query(insertTransaction, [
      userId,
      username,
      counterParty,
      accountNumber,
      transactionType,
      transactionTypeDetailId,
      transactionAmount,
      transactionTime,
    ]);
    console.log("가상 은행 거래 내역 추가");
  } catch (error) {
    console.error("가상 은행 거래 내역 추가 중 에러 발생", error);
  }
}

/**
 *
 * @description 가상 은행 거래 내역 테이블에 초기 데이터를 추가합니다.
 * @description 테이블에 데이터를 삽입하기 위해서는 우선 users 테이블에 사용자 정보가 존재해야 합니다.
 */
async function insertToTransactionHistoryTable(userdata: VirtualUserData[]) {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();

  insertTransactionHistory(userdata[1], client);

  client.release();
}

const virtualUserData: VirtualUserData[] = [
  {
    userId: "bs123c5672@gmail.com",
    username: "김철수",
    counterParty: "김영희",
    accountNumber: "123456789012",
    transactionType: "입금",
    transactionTypeDetailId: 100,
    transactionAmount: 10000,
    transactionTime: "2024-02-06 10:00:00",
  },
  {
    userId: "bsc5672@gmail.com",
    username: "박지영",
    counterParty: "박영수",
    accountNumber: "123456780913",
    transactionType: "출금",
    transactionTypeDetailId: 103,
    transactionAmount: 20000,
    transactionTime: "2024-02-06 11:00:00",
  },
  {
    userId: "df21dxce@ggole.com",
    username: "이영희",
    counterParty: "이철수",
    accountNumber: "123456789014",
    transactionType: "입금",
    transactionTypeDetailId: 101,
    transactionAmount: 30000,
    transactionTime: "2024-02-06 12:00:00",
  },
  {
    userId: "fe21sad@ggole.com",
    username: "최민수",
    counterParty: "최영수",
    accountNumber: "123456789015",
    transactionType: "출금",
    transactionTypeDetailId: 104,
    transactionAmount: 40000,
    transactionTime: "2024-02-06 13:00:00",
  },
  {
    userId: "dg23sde@ggogle.com",
    username: "김지영",
    counterParty: "김철수",
    accountNumber: "123456789016",
    transactionType: "입금",
    transactionTypeDetailId: 102,
    transactionAmount: 50000,
    transactionTime: "2024-02-06 14:00:00",
  },
];
