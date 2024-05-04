'use server';

import { KeypadInfo } from '@/utils/keypad';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { Pool, QueryResult } from 'pg';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { goToUsername } from '../revalidate';

const validNumpadLength = 4;
const noneEmptyString = z.string().min(1);
const PinNumberSchema = z
  .array(noneEmptyString)
  .refine((v) => v.length === validNumpadLength, {
    message: '핀번호는 4자리여야 합니다.',
  });

const FormSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});

export async function reorderKeypad(isReorder: boolean) {
  if (isReorder) {
    revalidateTag('keypad');
    return;
  }
  return;
}

export async function registerAction(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: FormSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  return null;
}

// export async function registerAction(formData: FormData, padInfo: KeypadInfo) {
//   const username = cookies().get('username');
//   if (username?.value === undefined) {
//     return {
//       status: 'error',
//       id: 'username-not-found',
//       msg: '사용자의 이름이 등록되어 있지 않습니다.',
//     };
//   }

//   const pinNumKeys = padInfo.hashes;
//   console.log(typeof formData.get('pinNumbers'));
//   const submission = parseWithZod(formData, {
//     schema: FormSchema,
//   });

//   if (submission.status !== 'success') {
//     return {
//       status: 'error',
//       id: 'pin-pattern-input-error',
//       msg: '핀번호가 옳바르지 않습니다.',
//     };
//   }

//   const formDataResult = submission.value;
//   const result = PinSchema.safeParse({
//     username: username.value,
//     pinnumber: formDataResult.pinNumbers.split(','),
//     pinnumkeys: pinNumKeys,
//   });
//   if (!result.success) {
//     return {
//       status: 'error',
//       id: 'pin-pattern-input-error',
//       msg: result.error.errors[0].message ?? '',
//     };
//   }

//   if (username?.value === undefined) {
//     return {
//       status: 'error',
//       id: 'pin-pattern-input-error',
//       msg: '옳바르지 않은 사용자입니다.',
//     };
//   }

//   const decodedUsername = Buffer.from(username.value, 'base64').toString(
//     'utf-8',
//   );

//   const pool = new Pool({
//     host: process.env.SUNUB_POSTGRES_HOST,
//     user: process.env.SUNUB_POSTGRES_USER,
//     connectionString: process.env.SUNUB_POSTGRES_URL + '?sslmode=require',
//     connectionTimeoutMillis: 2000,
//     idleTimeoutMillis: 30000,
//   });

//   const client = await pool.connect();
//   const selectQuery = `
//     SELECT username
//     FROM pin_number
//     WHERE username = $1;
//   `;

//   const selectResult = await client.query<QueryResult<typeof PinSchema>>(
//     selectQuery,
//     [decodedUsername],
//   );

//   if (selectResult.rows.length > 0) {
//     return {
//       status: 'success',
//       id: 'pin-pattern-input-success',
//       msg: '이미 등록된 번호가 있습니다.',
//     };
//   }

//   const insertQuery = `
//     INSERT INTO pin_number (username, pin_number, pin_num_keys)
//     VALUES ($1, $2, $3);
//     `;

//   await client.query<QueryResult<typeof PinSchema>>(insertQuery, [
//     decodedUsername,
//     result.data.pinnumber,
//     JSON.stringify(result.data.pinnumkeys),
//   ]);

//   await client.release(true);

//   return {
//     status: 'success',
//     id: 'pin-pattern-register-success',
//     msg: '핀번호가 성공적으로 등록되었습니다.',
//   };
// }
