'use server';

import { cookies } from 'next/headers';
import { Pool, QueryResult } from 'pg';
import * as v from 'valibot';

const PinSchema = v.object({
  username: v.string([
    v.minLength(1, '사용자 이름은 1자 이상이어야 합니다.'),
    v.maxLength(20, '사용자 이름은 20자 이하여야 합니다.'),
  ]),
  pinnumber: v.array(v.string(), [
    v.minLength(4, '핀번호는 4자 여야 합니다.'),
    v.maxLength(4, '핀번호는 4자 여야 합니다.'),
  ]),
  pinnumkeys: v.array(v.tuple([v.string(), v.number()])),
});

export default async function pinAction(
  decodedPinNumbers: string[],
  pinNumKeys: [string, number][],
) {
  const username = cookies().get('username');

  const result = v.safeParse(PinSchema, {
    username: username?.value,
    pinnumber: decodedPinNumbers,
    pinnumkeys: pinNumKeys,
  });

  if (!result.success && result.issues) {
    return {
      status: 'error',
      id: 'pin-pattern-input-error',
      msg: result.issues[0].message,
    };
  }

  if (username?.value === undefined) {
    return {
      status: 'error',
      id: 'pin-pattern-input-error',
      msg: '옳바르지 않은 사용자입니다.',
    };
  }

  const decodedUsername = Buffer.from(username.value, 'base64').toString(
    'utf-8',
  );

  const pool = new Pool({
    host: process.env.SUNUB_POSTGRES_HOST,
    user: process.env.SUNUB_POSTGRES_USER,
    connectionString: process.env.SUNUB_POSTGRES_URL + '?sslmode=require',
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
  });

  const client = await pool.connect();
  const selectQuery = `
    SELECT username
    FROM pin_number
    WHERE username = $1;
  `;

  const selectResult = await client.query<QueryResult<typeof PinSchema>>(
    selectQuery,
    [decodedUsername],
  );

  if (selectResult.rows.length > 0) {
    return {
      status: 'error',
      id: 'pin-pattern-input-error',
      msg: '이미 등록된 번호가 있습니다.',
    };
  }

  const insertQuery = `
    INSERT INTO pin_number (username, pin_number, pin_num_keys)
    VALUES ($1, $2, $3);
    `;

  await client.query<QueryResult<typeof PinSchema>>(insertQuery, [
    decodedUsername,
    decodedPinNumbers,
    JSON.stringify(pinNumKeys),
  ]);

  await client.release(true);

  return {
    status: 'success',
    id: 'pin-pattern-register-success',
    msg: '핀번호가 성공적으로 등록되었습니다.',
  };
  // revalidatePath(`${baseurl}/pin`);
  // redirect(`${baseurl}/pin`);
}
