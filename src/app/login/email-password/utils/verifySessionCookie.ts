"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifySessionCookie() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("en_session");
  if (!sessionCookie) {
    return;
  }

  cookieStore.set("flash_message", "이미 로그인된 상태입니다.", {
    path: "/",
    maxAge: 10,
  });
  redirect("/dashboard");
}
