import { z } from "zod/v4";
import { TRNASACTION_CODES } from "@/entities/transaction_types/transaction_types.model";

function coerceNumberLike(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "bigint") return Number(value);
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue === "" ? value : Number(trimmedValue);
  }
  if (
    typeof value === "object" &&
    value !== null &&
    "toString" in value &&
    typeof value.toString === "function"
  ) {
    const stringifiedValue = value.toString();
    return stringifiedValue === "" ? value : Number(stringifiedValue);
  }
  return value;
}

function coerceDateLike(value: unknown) {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    return new Date(value);
  }
  return value;
}

export const TransactionIdSchema = z.number().int().safe();
export const AccountNumberSchema = z.number().int().safe();
export const AmountSchema = z.number().finite().min(0);

export const TransactionSchema = z.object({
  transaction_id: TransactionIdSchema,
  account_number: AccountNumberSchema,
  amount: AmountSchema,
  transaction_type: z.enum(TRNASACTION_CODES),
  counterparty_account_number: AccountNumberSchema.optional().nullable(),
  description: z.string().max(255).optional(),
  occurred_at: z.date(),
});

export const TransactionSourceSchema = z.object({
  transaction_id: z.preprocess(coerceNumberLike, TransactionIdSchema),
  account_number: z.preprocess(coerceNumberLike, AccountNumberSchema),
  amount: z.preprocess(coerceNumberLike, AmountSchema),
  transaction_type: z.enum(TRNASACTION_CODES),
  counterparty_account_number: z.preprocess(
    coerceNumberLike,
    AccountNumberSchema.optional().nullable(),
  ),
  description: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.string().max(255).optional(),
  ),
  occurred_at: z.preprocess(coerceDateLike, z.date()),
});

export type RawTransaction = z.input<typeof TransactionSourceSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionList = Transaction[];

export function parseTransaction(input: unknown) {
  return TransactionSourceSchema.safeParse(input);
}
