import { z } from "zod/v4";

const serial = z.number().int().positive().optional();
const serialId = z.number().int().positive();

export const UsersIdSchema = serialId;

export const UsersSchema = z.object({
  user_id: serial,
  name: z.string().min(1).max(100),
  session_id: z.string().min(1).max(100).nullable(),
  email: z.email(),
  created_at: z.date().optional(),
});

export type Users = z.infer<typeof UsersSchema>;

export type UsersId = z.infer<typeof UsersIdSchema>;
