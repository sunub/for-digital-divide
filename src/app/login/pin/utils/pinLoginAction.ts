'use server';

import { z } from 'zod/v4';
import { revalidateTag } from 'next/cache';
import { createSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';
import { authMethodsService } from '@/entities/auth_methods/auth_methods.service';
import { getPermanentCookieStorage } from '@/utils/cookies/permanentCookieStorage';
import { DeviceIdSchema } from '@/shared/types/cookie';
import { AuthMethodSchema } from '@/entities/auth_methods/auth_methods.model';

interface ActionResult {
  status: 'success' | 'error';
  payload: string[];
}

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

export async function pinLoginAction(formData: FormData): Promise<ActionResult> {
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
      status: 'error',
      payload: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const device = await getPermanentCookieStorage('en_device');
  const parsedDeviceId = DeviceIdSchema.safeParse(device);
  if (!parsedDeviceId.success) {
    return {
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
      status: 'error',
      payload: ['등록된 핀번호 정보가 없습니다.'],
    };
  }

  const { user_id, credential: regsiterdPinNumber } = parsedRegisterdPinInfo.data;
  if (regsiterdPinNumber !== parsedFormData.data.pinnumbers.join('')) {
    return {
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
      status: 'error',
      payload: ['세션 쿠키를 생성하는 중 오류가 발생했습니다.'],
    };
  }

  return {
    status: 'success',
    payload: ['핀번호가 성공적으로 인증되었습니다.'],
  };

  // const parsedSessionCookie = CookieSchema.safeParse(decryptedCookie.payload);
  // if (!parsedSessionCookie.success) {
  //   return {
  //     status: 'error',
  //     payload: ['세션 쿠키가 올바르지 않습니다.'],
  //   };
  // }
  // const { user_id, session_id } = parsedSessionCookie.data;
  // const savedUser = await userService.findByUserId(user_id);
  // if (!savedUser) {
  //   return {
  //     status: 'error',
  //     payload: ['사용자를 찾을 수 없습니다.'],
  //   };
  // }
  // if (savedUser.session_id !== session_id) {
  //   return {
  //     status: 'error',
  //     payload: ['세션이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.'],
  //   };
  // }

  // const authInfo = await authMethodsService.findAuthMethodByUserId(user_id, 'PIN');
  // const registeredPinNumbers = authInfo[0].credential || '';
  // const enteredPinNumbers = parsedFormData.data.pinnumbers.join('');
  // if (registeredPinNumbers !== enteredPinNumbers) {
  //   return {
  //     status: 'error',
  //     payload: ['이미 등록된 핀번호와 다릅니다.'],
  //   };
  // }

  return {
    status: 'success',
    payload: ['핀번호가 성공적으로 등록되었습니다.'],
  };
}
