import { z } from 'zod';

const serial = z.number().int().positive().optional();

export const UsersIdSchema = serial;

export const UsersSchema = z.object({
  user_id: serial,
  name: z.string().min(1).max(100),
  created_at: z.string().datetime(),
});

export type Users = z.infer<typeof UsersSchema>;

export type UsersId = z.infer<typeof UsersIdSchema>;
