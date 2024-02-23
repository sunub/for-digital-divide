"use server";

import { Pool } from "pg";
import User from "@lib/fido/user";
import validateFormDataField from "../validator";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import crypto from "crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { decode, encode } from "js-base64";
import { registerCredential } from "@/lib/client";

export async function fidoUsernameActon(formData: FormData) {
  const username = validateFormDataField(formData)?.username as string;
  let user = await User.findByUsername(username);

  if (!user) {
    console.log("사용자가 존재하지 않습니다.");
    const newUserInfo = {
      username,
      id: isoBase64URL.fromBuffer(crypto.randomBytes(32)),
      credentials: [],
    };

    await User.update(newUserInfo);
  }

  const encodedSignature = Buffer.from(user.id).toString("base64");
  const sessionValue = {
    id: encodedSignature,
    signedIn: true,
  };

  cookies().set(
    "session",
    JSON.stringify(encode(JSON.stringify(sessionValue))),
    {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  );
}
