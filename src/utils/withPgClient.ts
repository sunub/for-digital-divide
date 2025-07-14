'use server';

import { PoolClient, QueryResult } from 'pg';
import pool from '@/lib/pool';

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

async function withPgClient(asyncCallbackFn: (client: PoolClient) => Promise<QueryResult<User> | User[]>) {
  const client = await pool.connect();
  try {
    return await asyncCallbackFn(client);
  } catch (error) {
    console.error('원본 에러:', error);
    if (error instanceof Error) {
      throw new Error(`Postgres 연결 중 에러 발생: ${error.message}`);
    } else {
      throw new Error('Postgres 연결 중 알 수 없는 에러 발생');
    }
  } finally {
    client.release();
  }
}

export default withPgClient;
