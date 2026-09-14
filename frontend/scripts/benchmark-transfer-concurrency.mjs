/**
 * 동시 송금 요청에서의 잔액 정합성 검증 스크립트.
 *
 * transfer.service.ts 가 선택한 두 가지 결정의 효과를 각각 측정합니다.
 *   1. 잠금 획득 순서 정규화 (계좌번호 오름차순) -> 순환 대기(데드락) 제거
 *   2. SELECT ... FOR UPDATE 비관적 락 -> 조회와 갱신 사이의 Lost Update 제거
 *
 * 서비스 코드와 동일한 잠금 전략을 raw SQL 로 재현해, Prisma 클라이언트 생성 없이
 * PostgreSQL 만으로 반복 측정할 수 있도록 했습니다.
 *
 * pg 는 @prisma/adapter-pg 를 통해 이미 설치되어 있고 .npmrc 의 shamefully-hoist 설정으로
 * 그대로 import 할 수 있으므로, 이 스크립트를 위해 의존성을 추가하지 않습니다.
 *
 * 사용법 (운영 DB가 아닌 임시 DB를 지정할 것 — 스키마를 매번 새로 만듭니다):
 *   BENCHMARK_DATABASE_URL=postgres://user:pass@localhost:5432/benchdb \
 *     pnpm benchmark:transfer-concurrency
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import pg from "pg";

const DEFAULT_OPTIONS = {
  /** 계좌쌍 개수 */
  pairs: 50,
  /** 각 계좌쌍에서 양방향으로 반복할 횟수 */
  rounds: 20,
  /** 1회 송금액 */
  amount: 100,
  /** 계좌 초기 잔액 */
  initialBalance: 100_000,
  /** Lost Update 재현에 사용할 동시 출금 요청 수 */
  lostUpdateRequests: 200,
  outPath: null,
};

function parseArgs(argv) {
  const options = { ...DEFAULT_OPTIONS };

  for (const arg of argv) {
    const [rawKey, rawValue] = arg.split("=");
    const key = rawKey.replace(/^--/, "");
    const value = rawValue ?? "";

    if (key === "pairs" && value) options.pairs = Number(value);
    if (key === "rounds" && value) options.rounds = Number(value);
    if (key === "amount" && value) options.amount = Number(value);
    if (key === "initial-balance" && value)
      options.initialBalance = Number(value);
    if (key === "lost-update-requests" && value)
      options.lostUpdateRequests = Number(value);
    if (key === "out" && value) options.outPath = value;
  }

  return options;
}

const connectionString =
  process.env.BENCHMARK_DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  console.error(
    "BENCHMARK_DATABASE_URL(또는 DATABASE_URL)이 필요합니다. 운영 DB가 아닌 임시 DB를 지정하세요.",
  );
  process.exit(1);
}

const options = parseArgs(process.argv.slice(2));
const pool = new pg.Pool({ connectionString, max: 40 });

async function resetSchema(initialBalance, accountCount) {
  await pool.query("DROP TABLE IF EXISTS transactions");
  await pool.query("DROP TABLE IF EXISTS accounts");
  await pool.query(`CREATE TABLE accounts (
      account_number bigint PRIMARY KEY,
      balance numeric NOT NULL,
      CONSTRAINT balance_not_negative CHECK (balance >= 0))`);
  await pool.query(`CREATE TABLE transactions (
      transaction_id bigserial PRIMARY KEY,
      account_number bigint NOT NULL REFERENCES accounts(account_number),
      counterparty_account_number bigint NOT NULL,
      amount numeric NOT NULL,
      transaction_type text NOT NULL)`);

  const rows = Array.from(
    { length: accountCount },
    (_, index) => `(${1000 + index}, ${initialBalance})`,
  );
  await pool.query(
    `INSERT INTO accounts (account_number, balance) VALUES ${rows.join(",")}`,
  );
}

/**
 * @param {"ordered" | "naive"} lockOrder
 *   ordered: 계좌번호 오름차순으로 잠금 (transfer.service.ts 의 현재 구현)
 *   naive:   송금 방향(출금 계좌 -> 입금 계좌) 순서대로 잠금 (정규화 이전)
 */
async function executeTransfer(fromAccount, toAccount, amount, lockOrder) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const lockTargets =
      lockOrder === "ordered"
        ? [fromAccount, toAccount].sort((a, b) => (a < b ? -1 : 1))
        : [fromAccount, toAccount];

    for (const accountNumber of lockTargets) {
      await client.query(
        "SELECT 1 FROM accounts WHERE account_number = $1 FOR UPDATE",
        [accountNumber],
      );
    }

    const { rows } = await client.query(
      "SELECT account_number, balance FROM accounts WHERE account_number IN ($1, $2)",
      [fromAccount, toAccount],
    );
    const sender = rows.find(
      (row) => String(row.account_number) === String(fromAccount),
    );

    if (!sender || Number(sender.balance) < amount) {
      throw new Error("INSUFFICIENT_FUNDS");
    }

    await client.query(
      "UPDATE accounts SET balance = balance - $1 WHERE account_number = $2",
      [amount, fromAccount],
    );
    await client.query(
      "UPDATE accounts SET balance = balance + $1 WHERE account_number = $2",
      [amount, toAccount],
    );
    await client.query(
      `INSERT INTO transactions
         (account_number, counterparty_account_number, amount, transaction_type)
       VALUES ($1, $2, $3, 'TRANSFER_OUT'), ($2, $1, $4, 'TRANSFER_IN')`,
      [fromAccount, toAccount, -amount, amount],
    );

    await client.query("COMMIT");
    return { ok: true };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    return { ok: false, code: error.code, message: error.message };
  } finally {
    client.release();
  }
}

/** 서로 반대 방향의 송금을 동시에 실행해 순환 대기가 발생하는지 측정합니다. */
async function measureCrossTransfers(lockOrder) {
  const { pairs, rounds, amount, initialBalance } = options;
  const accountCount = pairs * 2;
  await resetSchema(initialBalance, accountCount);

  const jobs = [];
  for (let pair = 0; pair < pairs; pair += 1) {
    const accountA = 1000 + pair * 2;
    const accountB = 1001 + pair * 2;

    for (let round = 0; round < rounds; round += 1) {
      jobs.push(executeTransfer(accountA, accountB, amount, lockOrder));
      jobs.push(executeTransfer(accountB, accountA, amount, lockOrder));
    }
  }

  const startedAt = Date.now();
  const results = await Promise.all(jobs);
  const elapsedMs = Date.now() - startedAt;

  const succeeded = results.filter((result) => result.ok).length;
  // 40P01 = PostgreSQL deadlock_detected
  const deadlocks = results.filter((result) => result.code === "40P01").length;

  const {
    rows: [balances],
  } = await pool.query("SELECT SUM(balance) AS total FROM accounts");
  const {
    rows: [transactionRows],
  } = await pool.query("SELECT COUNT(*) AS count FROM transactions");

  const expectedSum = initialBalance * accountCount;
  const actualRows = Number(transactionRows.count);

  return {
    lockOrder,
    requests: jobs.length,
    succeeded,
    failed: jobs.length - succeeded,
    deadlocks,
    failureRatePct: Number(
      (((jobs.length - succeeded) / jobs.length) * 100).toFixed(2),
    ),
    elapsedMs,
    balanceSum: Number(balances.total),
    expectedBalanceSum: expectedSum,
    balanceSumPreserved: Number(balances.total) === expectedSum,
    transactionRows: actualRows,
    // 성공한 송금 1건마다 출금 · 입금 2행이 남아야 합니다.
    orphanTransactionRows: actualRows - succeeded * 2,
  };
}

/**
 * 조회한 잔액을 애플리케이션에서 계산해 덮어쓰는 경로를 재현합니다.
 * withLock=false 는 FOR UPDATE 없이 실행해 Lost Update 를 드러냅니다.
 */
async function measureLostUpdate(withLock) {
  const { amount, initialBalance, lostUpdateRequests } = options;
  await resetSchema(initialBalance, 2);

  const withdraw = async () => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const { rows } = await client.query(
        withLock
          ? "SELECT balance FROM accounts WHERE account_number = 1000 FOR UPDATE"
          : "SELECT balance FROM accounts WHERE account_number = 1000",
      );
      const nextBalance = Number(rows[0].balance) - amount;
      await client.query(
        "UPDATE accounts SET balance = $1 WHERE account_number = 1000",
        [nextBalance],
      );
      await client.query("COMMIT");
      return true;
    } catch {
      await client.query("ROLLBACK").catch(() => {});
      return false;
    } finally {
      client.release();
    }
  };

  const results = await Promise.all(
    Array.from({ length: lostUpdateRequests }, withdraw),
  );
  const committed = results.filter(Boolean).length;

  const {
    rows: [account],
  } = await pool.query(
    "SELECT balance FROM accounts WHERE account_number = 1000",
  );
  const expectedBalance = initialBalance - committed * amount;
  const lostAmount = Number(account.balance) - expectedBalance;

  return {
    withLock,
    requests: lostUpdateRequests,
    committed,
    expectedBalance,
    actualBalance: Number(account.balance),
    lostAmount,
    lostUpdates: lostAmount / amount,
  };
}

/** 잔액 부족으로 중단된 트랜잭션이 부분 반영을 남기지 않는지 확인합니다. */
async function measureRollback() {
  const { initialBalance } = options;
  await resetSchema(initialBalance, 2);

  const result = await executeTransfer(
    1000,
    1001,
    initialBalance * 2,
    "ordered",
  );
  const {
    rows: [account],
  } = await pool.query(
    "SELECT balance FROM accounts WHERE account_number = 1000",
  );
  const {
    rows: [transactionRows],
  } = await pool.query("SELECT COUNT(*) AS count FROM transactions");

  return {
    rejected: !result.ok,
    reason: result.message ?? null,
    balanceUnchanged: Number(account.balance) === initialBalance,
    leftoverTransactionRows: Number(transactionRows.count),
  };
}

async function main() {
  const naive = await measureCrossTransfers("naive");
  const ordered = await measureCrossTransfers("ordered");
  const lostUpdateWithoutLock = await measureLostUpdate(false);
  const lostUpdateWithLock = await measureLostUpdate(true);
  const rollback = await measureRollback();

  const {
    rows: [{ version }],
  } = await pool.query("SELECT version()");

  const summary = {
    environment: {
      postgres: version,
      pairs: options.pairs,
      rounds: options.rounds,
      amount: options.amount,
      initialBalance: options.initialBalance,
    },
    crossTransfers: { naive, ordered },
    lostUpdate: {
      withoutLock: lostUpdateWithoutLock,
      withPessimisticLock: lostUpdateWithLock,
    },
    rollback,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (options.outPath) {
    const target = resolve(process.cwd(), options.outPath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
    console.log(`\nSaved to ${target}`);
  }
}

try {
  await main();
} finally {
  await pool.end();
}
