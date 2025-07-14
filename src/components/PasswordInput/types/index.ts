import { z } from 'zod';

export type PasswordType = z.infer<typeof PasswordSchema>;

export const PasswordSchema = z
  .string()
  .trim()
  .min(8, { message: '비밀번호는 최소 8글자 이상이어야 합니다.' })
  .regex(/[A-Z]/, { message: '영어 대문자 최소 1글자를 포함해야 합니다.' })
  .regex(/[a-z]/, { message: '영어 소문자 최소 1글자를 포함해야 합니다.' })
  .regex(/[0-9]/, { message: '숫자 최소 1글자를 포함해야 합니다.' })
  .regex(/[^A-Za-z0-9]/, { message: '특수문자를 최소 1글자 포함해야 합니다.' });
