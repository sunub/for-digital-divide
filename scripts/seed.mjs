import pg from "pg";

/**
 *
 * @param {pg.PoolClient} client
 */
async function seedUser(client) {
  try {
    const createTable = `
      CREATE TABLE IF NOT EXISTS bank_user (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(80) NOT NULL, -- 가상 은행에서 사용되는 사용자 이름
        pin VARCHAR(4) NOT NULL CHECK (LENGTH(pin) = 4 AND pin ~ '[0-9]+$'), -- 은행에 로그인시 필요한 PIN 번호
        last_login_time TIMESTAMP NOT NULL,
        password TEXT NOT NULL -- 금융 인증서에서 사용될 비밀 번호
      );
    `;

    console.log("가상 은행의 유저 데이터 테이블 작성");

    await client.query(createTable);
  } catch (err) {
    console.error("사용자 테이블 작성 중 에러 발생", err);
  }
}

/**
 *
 * @param {pg.PoolClient} client
 */
async function seedAccount(client) {
  try {
    const createTable = `
      CREATE TABLE IF NOT EXISTS bank_account (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        account_number VARCHAR(14) NOT NULL CHECK(LENGTH(account_number) BETWEEN 11 AND 14 AND account_number ~ '^[0-9]+$'),
        created_date date NOT NULL
      );
    `;

    await client.query(createTable);
    await client.query(`
    ALTER TABLE bank_account
    ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES bank_user(id);
    `);

    console.log("가상 은행 계좌 데이터 테이블 작성");
  } catch (err) {
    console.error("계좌 관련 테이블 작성 중 에러 발생", err);
  }
}

/**
 *
 * @param {pg.PoolClient} client
 */
async function seedTransaction(client) {
  try {
    const createTable = `
      CREATE TABLE IF NOT EXISTS bank_transaction (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        from_account VARCHAR(14) NOT NULL CHECK(LENGTH(from_account) BETWEEN 11 AND 14 AND from_account ~ '^[0-9]+$'),
        to_account VARCHAR(14) NOT NULL CHECK(LENGTH(to_account) BETWEEN 11 AND 14 AND to_account ~ '^[0-9]+$'),
        amount INT NOT NULL,
        type VARCHAR(10) NOT NULL
      );
    `;

    await client.query(createTable);

    // 테이블 내의 type row에 데이터를 넣을 경우 타입 체크가 가능하게끔 제약조건을 넣는 쿼리
    // await client.query(`
    //     ALTER TABLE bank_transaction
    //     ADD CONSTRAINT type_check CHECK (type IN ('송금', '입금'));
    // `);

    console.log("가상 은행 계좌에 대한 거래 내역 테이블 추가");
  } catch (err) {
    console.error(
      "가상 은행 계좌에 대한 거래 내역 테이블 추가 중 에러 발생",
      err
    );
  }
}

async function main() {
  const { Pool } = pg;
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();

  await seedUser(client);
  await seedAccount(client);
  await seedTransaction(client);

  client.release();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
