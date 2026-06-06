import { z } from "zod/v4";

export const hexIdentifierSchema = z.string().regex(/^[0-9a-f]{32}$/i, {
  message: "유효하지 않은 32자리 16진수 ID입니다.",
});

export type DeviceId = z.infer<typeof DeviceIdSchema>;

export const DeviceIdSchema = z.object({
  device_id: hexIdentifierSchema,
  iat: z.number(),
  exp: z.number(),
});

export type SessionCookie = z.infer<typeof SessionCookieSchema>;

export const SessionCookieSchema = z.object({
  user_id: z.number().int().nonnegative(),
  session_id: hexIdentifierSchema,
  iat: z.number().int().nonnegative(),
  exp: z.number().int().nonnegative(),
});
