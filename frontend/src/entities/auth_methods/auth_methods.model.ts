import { z } from "zod/v4";
import { hexIdentifierSchema } from "@/entities/cookies/cookies.model";

const AUTH_METHODS_CODE = ["PIN", "OAUTH", "PASSWORD"] as const;

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
