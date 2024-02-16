"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const moveToLoginPage = () => {
  revalidatePath("/login");
  redirect("/login");
};

export const moveToPasswordPage = () => {
  revalidatePath("/login/password");
  redirect("/login/password");
};
