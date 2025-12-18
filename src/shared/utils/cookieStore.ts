"use server";

import { cookies } from "next/headers";

export async function cookieStore() {
  const cookieStore = await cookies();
  return cookieStore;
}
