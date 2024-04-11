'use server';

import { KeypadInfo } from '@/utils/keypad';
import { Base64 } from 'js-base64';
import { cookies } from 'next/headers';
import { Pool } from 'pg';
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

async function confirmAction(decodedPinNumbers: string[], padInfo: KeypadInfo) {
  const cookieUsername = cookies().get('username');
  if (cookieUsername === undefined) {
    return {
      status: 'error',
      id: 'pin-pattern-confirm-error',
      msg: '등록되지 않은 사용자입니다.',
    };
  }
  const decodedUsername = Base64.decode(cookieUsername.value);

  const result = v.safeParse(PinSchema, {
    username: decodedUsername,
    pinnumber: decodedPinNumbers,
    pinnumkeys: padInfo.hashes,
  });

  if (!result.success) {
    return {
      status: 'error',
      id: 'pin-pattern-confirm-error',
      msg: '잘못된 핀번호 형식입니다.',
    };
  }

  const pool = new Pool({
    host: process.env.SUNUB_POSTGRES_HOST,
    user: process.env.SUNUB_POSTGRES_USER,
    connectionString: process.env.SUNUB_POSTGRES_URL + '?sslmode=require',
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000,
  });

  const client = await pool.connect();

  const registeredUser = await client.query(
    'SELECT * FROM pin_number WHERE username = $1',
    [decodedUsername],
  );

  if (registeredUser.rowCount === 0) {
    return {
      status: 'error',
      id: 'pin-pattern-confirm-error',
      msg: '등록되지 않은 사용자입니다.',
    };
  }

  const { pin_number, pin_num_keys } = registeredUser.rows[0];
  const registeredPinnumKey = new Map(pin_num_keys);
  const currPinNumberKey = new Map(padInfo.hashes);

  for (let i = 0; i < pin_number.length; i++) {
    const currPinNumber = currPinNumberKey.get(decodedPinNumbers[i]);
    const registerdPinNum = registeredPinnumKey.get(pin_number[i]);

    if (currPinNumber !== registerdPinNum) {
      return {
        status: 'error',
        id: 'pin-pattern-confirm-error',
        msg: '등록된 핀번호와 일치하지 않습니다.',
      };
    }
  }

  return {
    status: 'success',
    id: 'pin-pattern-confirm-success',
    msg: '로그인에 성공했습니다.',
  };
}

export default confirmAction;
