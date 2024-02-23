"use server";

import User from "../user";
import validateFormDataField from "../validator";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function fidoPasswordAction(formData: FormData) {
  const password = validateFormDataField(formData)?.password as string;

  const hash = crypto.createHash("sha256").update(password).digest();
  const encodedSignature = Buffer.from(hash).toString("base64");

  let user = await User.findByPassword(encodedSignature);
  if (!user) {
    console.log("비밀번호가 일치하지 않습니다.");
    return;
  }

  revalidatePath("/dashboard");
}
