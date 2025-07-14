import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { UsersIdSchema, UsersSchema } from './users.model';
import { userService } from './users.service';

export async function getUserByIdController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  const parsedUserId = UsersIdSchema.safeParse(Number(userId));

  if (!parsedUserId.success) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await userService.findByUserId(parsedUserId.data);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const parsedUser = UsersSchema.safeParse(user);
    if (!parsedUser.success) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 500 });
    }

    return NextResponse.json(parsedUser.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function createUserController(req: NextRequest) {
  try {
    const { username, email } = await req.json();
    const session_id = bcrypt.hashSync(`${Date.now()}-${Math.random()}`, 10);
    await userService.create({
      name: username,
      email,
      session_id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Internal Server Error');
  }
}

export async function deleteUserController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');
  const parsedUserId = UsersIdSchema.safeParse(Number(userId));

  if (!parsedUserId.success) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    await userService.delete(parsedUserId.data);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function getAllUsersController() {
  try {
    const users = await userService.findAll();
    const parsedUsers = users.map(user => UsersSchema.safeParse(user));

    if (parsedUsers.some(result => !result.success)) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 500 });
    }

    return NextResponse.json(
      parsedUsers.map(result => result.data),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching all users:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function getUserByNameController(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name query parameter is required' }, { status: 400 });
  }

  try {
    const users = await userService.findByName(name);
    const parsedUsers = users.map(user => UsersSchema.safeParse(user));

    if (parsedUsers.some(result => !result.success)) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 500 });
    }

    return NextResponse.json(
      parsedUsers.map(result => result.data),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users by name:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
