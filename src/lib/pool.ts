import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
});

export default pool;
