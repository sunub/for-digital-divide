"use server";

import { cookies } from "next/headers";

export async function getFlashToastCookie() {
  const cookieStore = await cookies();
  const message = cookieStore.get("flash_message");
  if (message) {
    cookieStore.delete("flash_message");
    return message.value;
  }
  return null;
}
