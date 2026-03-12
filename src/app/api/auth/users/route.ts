"use server";

import { NextResponse } from "next/server";
import { getAuthState } from "@/entities/auth/session.server";
import { UsersSchema } from "@/entities/users/users.model";
import { userService } from "@/entities/users/users.service";

export async function GET() {
  const { session } = await getAuthState();
  if (!session) {
    return NextResponse.json({ message: "not signed in" }, { status: 401 });
  }

  const userInfo = await userService.findByUserId(session.user_id);
  const parsedUserInfo = UsersSchema.safeParse(userInfo);
  if (!parsedUserInfo.success) {
    console.error("Invalid user info:", parsedUserInfo.error);
    return NextResponse.json({ message: "invalid user info" }, { status: 400 });
  }
  return NextResponse.json(parsedUserInfo.data, { status: 200 });
}
