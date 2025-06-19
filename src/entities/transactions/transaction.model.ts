import { z } from "zod";
import { TRNASACTION_CODES } from "@/entities/transaction_types/transaction_types.model";

export type Transaction = z.infer<typeof TransactionSchema>; 

export const TransactionIdSchema = z.number().int();
export const AccountNumberSchema = z.number().int();

export const TransactionSchema = z.object({
  transaction_id: z.number().int(),
  account_number: z.number().int(),
  amount: z.number().min(0),
  transaction_type: z.enum(TRNASACTION_CODES),
  counterparty_account_number: z.number().int().optional(),
  description: z.string().max(255).optional(),
  occurred_at: z.string().datetime(),
});
