'use server';

import { NextRequest, NextResponse } from 'next/server';
import { AuthMethodCodeSchema, AuthMethodSchema } from './auth_methods.model';
import { authMethodsService } from './auth_methods.service';
import { UsersIdSchema } from '../users/users.model';

export async function getAuthMethodsByUserId(req: NextRequest) {
  const cookies = req.cookies;
  const userId = cookies.get('user_id')?.value;
  const parsedUserId = UsersIdSchema.safeParse(Number(userId));

  if (!parsedUserId.success) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const authMethods = await authMethodsService.findByUserId(parsedUserId.data);
    const parsedAuthMethods = authMethods.map((method) => AuthMethodSchema.safeParse(method));
    const invalidMethods = parsedAuthMethods.filter((result) => !result.success);

    if (invalidMethods.length > 0) {
      return NextResponse.json({ error: 'Invalid auth methods', details: invalidMethods }, { status: 400 });
    }
    return NextResponse.json(
      parsedAuthMethods.map((result) => result.data),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching auth methods by user ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function createAuthMethod(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedAuthMethod = AuthMethodSchema.safeParse(body);

    if (!parsedAuthMethod.success) {
      return NextResponse.json({ error: 'Invalid auth method data' }, { status: 400 });
    }

    const newAuthMethod: Omit<typeof parsedAuthMethod.data, 'auth_method_id'> = parsedAuthMethod.data;
    const createdAuthMethod = await authMethodsService.upsertDataByUserId(newAuthMethod);

    return NextResponse.json(createdAuthMethod, { status: 201 });
  } catch (error) {
    console.error('Error creating auth method:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function deleteAuthMethod(req: NextRequest) {
  const cookies = req.cookies;
  const authMethodId = cookies.get('auth_method_id')?.value;
  const parsedAuthMethodId = Number(authMethodId);

  if (isNaN(parsedAuthMethodId)) {
    return NextResponse.json({ error: 'Invalid auth method ID' }, { status: 400 });
  }

  try {
    await authMethodsService.delete(parsedAuthMethodId);
    return NextResponse.json({ message: 'Auth method deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting auth method:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function getAuthMethodByUserIdAndMethod(req: NextRequest) {
  const cookies = req.cookies;
  const userId = cookies.get('user_id')?.value;
  const authMethod = cookies.get('auth_method')?.value;

  const parsedUserId = UsersIdSchema.safeParse(Number(userId));
  const parsedAuthMethodCode = AuthMethodCodeSchema.safeParse(authMethod);
  if (!parsedUserId.success) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }
  if (!parsedAuthMethodCode.success) {
    return NextResponse.json({ error: 'Invalid auth method code' }, { status: 400 });
  }

  try {
    const authMethods = await authMethodsService.findAuthMethodByUserId(parsedUserId.data, parsedAuthMethodCode.data);
    if (authMethods.length === 0) {
      return NextResponse.json({ error: 'Auth method not found' }, { status: 404 });
    }

    const parsedAuthMethods = authMethods.map((method) => AuthMethodSchema.safeParse(method));
    const invalidMethods = parsedAuthMethods.filter((result) => !result.success);

    if (invalidMethods.length > 0) {
      return NextResponse.json({ error: 'Invalid auth methods', details: invalidMethods }, { status: 400 });
    }

    return NextResponse.json(
      parsedAuthMethods.map((result) => result.data),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching auth method by user ID and method:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
