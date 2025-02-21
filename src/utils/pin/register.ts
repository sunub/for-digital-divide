'use server';

import { KeypadInfo } from '@/utils/keypad';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';
import { goToUsername } from '../revalidate';
import { prisma } from '@root/prisma/prisma';

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

const PinHashSchema = z.tuple([z.string(), z.number()]);

const PinSchema = z.object({
  session_id: z.string(),
  pinnumbers: PinNumberSchema,
  pinnumkeys: z.array(PinHashSchema),
});

export async function reorderKeypad(isReorder: boolean) {
  if (isReorder) {
    revalidateTag('keypad');
    return;
  }
  return;
}

async function getUserInfo(session_id: string) {
  try {
    const username = await prisma.userInfo.findUnique({
      where: { sessionId: session_id },
    });
    return username;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function registerAction(formData: FormData, padInfo: KeypadInfo) {
  const cookieStore = await cookies();
  const session_id = cookieStore.get('session_id');

  if (session_id?.value === undefined) {
    return {
      status: 'error',
      id: 'username-not-found',
      msg: '사용자의 이름이 등록되어 있지 않습니다.',
    };
  }

  const pinNumKeys = padInfo.hashes;
  const submission = parseWithZod(formData, {
    schema: FormSchema,
  });

  if (submission.status !== 'success') {
    return {
      status: 'error',
      id: 'pin-pattern-input-error',
      msg: '핀번호가 잘못되었습니다.\n핀 번호는 4자리여야 합니다.',
    };
  }

  const pinnumbers = submission.value.pinnumbers;
  const result = PinSchema.safeParse({
    session_id: session_id.value,
    pinnumbers,
    pinnumkeys: pinNumKeys,
  });

  if (!result.success) {
    return {
      status: 'error',
      id: 'pin-pattern-input-error',
      msg: result.error.errors[0].message ?? '',
    };
  }

  const username = await getUserInfo(session_id.value);
  if (username?.username === null || username == null) {
    return {
      status: 'error',
      id: 'username-not-found',
      msg: '세션 아이디에 해당하는 사용자를 찾을 수 없습니다.',
    };
  }

  try {
    await prisma.pinNumbers.upsert({
      where: { username: username.username },
      update: { numbers: pinnumbers },
      create: { username: username.username, numbers: pinnumbers },
    });

    await prisma.pinHash.upsert({
      where: { username: username.username },
      update: { hash: pinNumKeys },
      create: { username: username.username, hash: pinNumKeys },
    });

    return {
      status: 'success',
      id: 'pin-pattern-register-success',
      msg: '핀번호가 성공적으로 등록되었습니다.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      id: 'pin-pattern-register-error',
      msg: '핀번호 등록 중 오류가 발생했습니다.',
    };
  }
}
