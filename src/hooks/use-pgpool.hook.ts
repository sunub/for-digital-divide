"use server";

import { assert } from "console";
import { Pool, PoolClient, QueryResult } from "pg";

interface Credential {
  credId: string;
  type: string;
  transports: string[];
}

interface User {
  id: string;
  username: string;
  credentials: Credential[];
  password: string;
  createdAt: Date;
}

async function usePgPool(
  asyncCallbackFn: (client: PoolClient) => Promise<QueryResult<User>>,
) {
  const pool = new Pool({
    host: process.env.SUNUB_POSTGRES_HOST,
    user: process.env.SUNUB_POSTGRES_USER,
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
  });
  pool.on("error", (error, client) => {
    console.error("Unexpected error on idle client", error);
    process.exit(-1);
  });
  const client = await pool.connect();

  const result = await asyncCallbackFn(client);
  console.assert(pool.idleCount === 0);
  console.assert(pool.totalCount === 1);

  console.log("calling end");
  await client.release(true);
  console.log("연결되어 있는 풀이 종료되었는지 확인");
  console.assert(pool.idleCount === 0);
  console.assert(pool.totalCount === 0);

  return result;
}

export default usePgPool;
