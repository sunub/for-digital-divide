import { z } from "zod/v4";
import { ACCOUNT_CODES, ACCOUNT_NAMES } from "./constants";

export type AccountCode = (typeof ACCOUNT_CODES)[number];

export type AccountName = typeof ACCOUNT_NAMES;

export type AccountType = {
  code: AccountCode;
  name: AccountName[number];
  createdAt: string;
};

export const AccountCodeSchema = z.enum(ACCOUNT_CODES);

export const AccountNameSchema = z.enum(ACCOUNT_NAMES);

export const AccountTypeSchema = z.object({
  code: AccountCodeSchema,
  name: AccountNameSchema,
  createdAt: z.string().datetime(),
});
