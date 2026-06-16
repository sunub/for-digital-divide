"use server";

import { redirect } from "next/navigation";
import { getAuthState } from "@/entities/auth/session.server";
import { userService } from "@/entities/users/users.service";
import { deleteSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";

export async function logoutAction() {
  const { session } = await getAuthState();
  if (session) {
    await userService.updateSessionIdByUserId(session.user_id, null);
  }
  await deleteSessionCookieStorage("en_session");
  redirect("/onboarding");
}
