import { z } from 'zod';
import { AccountCodeSchema } from '@/entities/account_types/account_types.model';

const serial = z.number().int().positive().optional();

export type AccountType = z.infer<typeof AccountsSchema>;

export const AccountsSchema = z.object({
  account_number: z.number().int(),
  user_id: z.number().int(),
  account_type: AccountCodeSchema,
  balance: z.number().int(),
  created_at: z.string().datetime(),
});
