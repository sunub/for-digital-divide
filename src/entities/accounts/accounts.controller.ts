import { NextRequest } from 'next/server';
import { AccountsSchema } from './accounts.model';
import { accountsService } from './accounts.service';

export async function getAccountByUserId(req: NextRequest) {
  const cookies = req.cookies;
  const userId = cookies.get('user_id')?.value;
  if (!userId) {
    return new Response('User ID not found in cookies', { status: 400 });
  }

  try {
    const accounts = await accountsService.findByUserId(Number(userId));
    const parsedAccounts = accounts.map((account: unknown) => AccountsSchema.parse(account));

    return new Response(JSON.stringify(parsedAccounts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function createAccount(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = AccountsSchema.parse(data);

    const newAccount = await accountsService.create(parsedData);
    return new Response(JSON.stringify(newAccount), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating account:', error);
    return new Response('Bad Request', { status: 400 });
  }
}

export async function deleteAccount(req: NextRequest) {
  const cookies = req.cookies;
  const accountNumber = cookies.get('account_number')?.value;
  if (!accountNumber) {
    return new Response('Account number is required', { status: 400 });
  }

  try {
    await accountsService.delete(Number(accountNumber));
    return new Response('Account deleted successfully', { status: 204 });
  } catch (error) {
    console.error('Error deleting account:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function getAccountByAccountNumber(req: NextRequest) {
  const cookies = req.cookies;
  const accountNumber = cookies.get('account_number')?.value;
  if (!accountNumber) {
    return new Response('Account number is required', { status: 400 });
  }

  try {
    const account = await accountsService.findByAccountNumber(Number(accountNumber));
    if (!account) {
      return new Response('Account not found', { status: 404 });
    }
    const parsedAccount = AccountsSchema.parse(account);
    return new Response(JSON.stringify(parsedAccount), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching account:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
