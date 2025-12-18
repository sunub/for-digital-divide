"use server";

import { cookies } from "next/headers";

export async function setFlashMessageCookie(message: string) {
  const cookieStore = await cookies();
  cookieStore.set("flash_message", message, {
    path: "/",
    maxAge: 10,
  });
}
