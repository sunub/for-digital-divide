"use server";

import { cookies } from "next/headers";

export async function getFlashMessageCookie() {
  const cookieStore = await cookies();
  const flashMessage = cookieStore.get("flash_message")?.value || null;

  if (flashMessage) {
    cookieStore.delete("flash_message");
  }

  return flashMessage;
}
