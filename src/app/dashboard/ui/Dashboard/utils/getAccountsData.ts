'use server';

import { fx } from '@/utils/iterable/fx';
import { AccountsSchema } from '@/entities/accounts/accounts.model';
import { accountsService } from '@/entities/accounts/accounts.service';
import { getSessionCookieStorage } from '@/utils/cookies/sessionCookieStorage';

export type AccountData = Awaited<ReturnType<typeof getAccountsData>>;

export async function getAccountsData() {
  const sessionCookie = await getSessionCookieStorage('en_session');
  if (!sessionCookie) {
    throw new Error('Session cookie not found');
  }
  const { user_id } = sessionCookie;
  try {
    const accounts = fx(await accountsService.findByUserId(user_id))
      .toAsync()
      .map(account =>
        AccountsSchema.parse({
          ...account,
          balance: Number(account.balance),
          account_number: Number(account.account_number),
        })
      );
    return await accounts.toArray();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw new Error('Failed to fetch accounts');
  }
}
