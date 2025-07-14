import { z } from 'zod/v4';

const AUTH_METHODS_CODE = ['PIN', 'OAUTH', 'PASSWORD'] as const;

const hexIdentifierSchema = z.string().regex(/^[0-9a-f]{32}$/i, {
  message: '유효하지 않은 32자리 16진수 ID입니다.',
});

export type AuthMethodCode = z.infer<typeof AuthMethodCodeSchema>;

export const AuthMethodCodeSchema = z.enum(AUTH_METHODS_CODE);

const serial = z.number().int().positive().optional();

export const AuthMethodSchema = z.object({
  auth_method_id: serial,
  user_id: z.number().int(),
  method: AuthMethodCodeSchema,
  credential: z.string(),
  provider: z.string(),
  provider_uid: hexIdentifierSchema,
  createdAt: z.string().datetime().optional(),
});

export type AuthMethod = z.infer<typeof AuthMethodSchema>;
