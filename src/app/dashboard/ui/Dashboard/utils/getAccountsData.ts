"use server";

import { unstable_cache } from "next/cache";
import { AccountsSchema } from "@/entities/accounts/accounts.model";
import { accountsService } from "@/entities/accounts/accounts.service";
import { requireAuthSession } from "@/entities/auth/session.server";
import { fx } from "@/utils/iterable/fx";

export type AccountData = Awaited<ReturnType<typeof getAccountsData>>;

const getCachedAccounts = unstable_cache(
  async (user_id: number) => {
    const data = await accountsService.findByUserId(user_id);
    return data.map((account) => ({
      ...account,
      balance: account.balance.toString(),
      account_number: account.account_number.toString(),
      created_at: account.created_at.toISOString(),
    }));
  },
  ["dashboard-accounts"],
  { tags: ["accounts"] },
);

export async function getAccountsData() {
  const { user_id } = await requireAuthSession();
  try {
    const accounts = fx(await getCachedAccounts(user_id))
      .toAsync()
      .map((account) =>
        AccountsSchema.parse({
          ...account,
          balance: Number(account.balance),
          account_number: Number(account.account_number),
          created_at: new Date(account.created_at),
        }),
      );
    return await accounts.toArray();
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
}
