'use server';

import { z } from 'zod/v4';
import { revalidateTag } from 'next/cache';
import { KeypadInfo } from '@/utils/keypad';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';
import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';
import { UsersSchema } from '@/entities/users/users.model';

interface ActionResult {
  status: 'success' | 'error';
  message: string[];
}

const validNumpadLength = 4;
const PinNumberSchema = z
  .array(z.string())
  .nonempty()
  .refine(v => v.length === validNumpadLength, {
    message: '핀번호는 4자리여야 합니다.',
  });

const FormDataSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});

const UserIdSchema = UsersSchema.shape.user_id.nonoptional();
const SessionIdSchema = UsersSchema.shape.session_id.nonoptional();

export async function reorderKeypad(isReorder: boolean) {
  if (isReorder) {
    revalidateTag('keypad');
    return;
  }
  return;
}

export async function pinRegisterAction(formData: FormData, padInfo: KeypadInfo): Promise<ActionResult> {
  const data = {
    pinnumbers: formData.getAll('pinnumbers') as string[],
    pointer: formData.get('pointer'),
    device: formData.get('device'),
  };

  const parsedFormData = FormDataSchema.safeParse(data, {
    error: iss => {
      if (iss.code === 'invalid_type' || (iss.expected === 'array' && iss.received === 'string')) {
        return { message: '핀번호는 4자리여야 합니다.' };
      }
      return { message: '입력된 데이터가 유효하지 않습니다.' };
    },
  });
  if (!parsedFormData.success) {
    return {
      status: 'error',
      message: parsedFormData.error.issues.map(issue => issue.message),
    };
  }

  const sessionCookie = await getSessionCookieStorage('en_session');
  if (!sessionCookie) {
    return {
      status: 'error',
      message: ['세션이 존재하지 않습니다. 다시 로그인해주세요.'],
    };
  }

  const pinnumbers = parsedFormData.data.pinnumbers;

  const parsedUserId = UserIdSchema.safeParse(sessionCookie.user_id);
  const parsedSessionId = SessionIdSchema.safeParse(sessionCookie.session_id);
  if (!parsedUserId.success) {
    return {
      status: 'error',
      message: ['유효하지 않은 사용자 ID입니다.'],
    };
  }
  if (!parsedSessionId.success) {
    return {
      status: 'error',
      message: ['유효하지 않은 세션 ID입니다.'],
    };
  }

  await authMethodsService.upsertDataByUserId({
    user_id: parsedUserId.data,
    method: 'PIN',
    credential: pinnumbers.join(''),
    provider: 'local',
    provider_uid: parsedSessionId.data,
  });
  return {
    status: 'success',
    message: ['핀번호가 성공적으로 등록되었습니다.'],
  };
}
