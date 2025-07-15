'use server';

import { z } from 'zod/v4';
import { revalidateTag } from 'next/cache';
import { createSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';
import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';
import { getPermanentCookieStorage } from '@/utils/cookies/permanentCookieStorage';
import { DeviceIdSchema } from '@/shared/types/cookie';
import { AuthMethodSchema } from '@/entities/auth_methods/auth_methods.model';
import { ActionState } from '../../types';

const validNumpadLength = 4;
const PinNumberSchema = z
  .array(z.string())
  .nonempty()
  .refine((v) => v.length === validNumpadLength, {
    message: '핀번호는 4자리여야 합니다.',
  });

const FormDataSchema = z.object({
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

export async function pinLoginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = {
    pinnumbers: formData.getAll('pinnumbers') as string[],
    pointer: formData.get('pointer'),
    device: formData.get('device'),
  };

  const parsedFormData = FormDataSchema.safeParse(data, {
    error: (iss) => {
      if (iss.code === 'invalid_type' || (iss.expected === 'array' && iss.received === 'string')) {
        return { message: '핀번호는 4자리여야 합니다.' };
      }
      return { message: '입력된 데이터가 유효하지 않습니다.' };
    },
  });
  if (!parsedFormData.success) {
    return {
      ...prevState,
      status: 'error',
      payload: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const device = await getPermanentCookieStorage('en_device');
  const parsedDeviceId = DeviceIdSchema.safeParse(device);
  if (!parsedDeviceId.success) {
    return {
      ...prevState,
      status: 'error',
      payload: ['등록된 기기 정보가 없습니다.'],
    };
  }
  const { device_id } = parsedDeviceId.data;
  const registerdAuthInfo = await authMethodsService.findByDeviceId(device_id);
  const registerdPinInfo = registerdAuthInfo.find((auth) => auth.method === 'PIN');

  const parsedRegisterdPinInfo = AuthMethodSchema.safeParse(registerdPinInfo);
  if (!parsedRegisterdPinInfo.success) {
    return {
      ...prevState,
      status: 'error',
      payload: ['등록된 핀번호 정보가 없습니다.'],
    };
  }

  const { user_id, credential: regsiterdPinNumber } = parsedRegisterdPinInfo.data;
  if (regsiterdPinNumber !== parsedFormData.data.pinnumbers.join('')) {
    return {
      ...prevState,
      status: 'error',
      payload: ['등록된 핀번호와 입력한 핀번호가 일치하지 않습니다.'],
    };
  }

  try {
    await createSessionCookieStorage({
      user_id,
      session_id: device_id,
    });
  } catch (error) {
    console.error('세션 쿠키 생성 중 오류 발생:', error);
    return {
      ...prevState,
      status: 'error',
      payload: ['세션 쿠키를 생성하는 중 오류가 발생했습니다.'],
    };
  }

  return {
    ...prevState,
    status: 'success',
    payload: ['핀번호가 성공적으로 인증되었습니다.'],
  };
}
