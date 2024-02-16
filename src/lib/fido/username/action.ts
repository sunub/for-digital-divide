"use server";

import { Pool } from "pg";
import User from "@lib/fido/user";
import validateFormDataField from "../validator";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import crypto from "crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { decode, encode } from "js-base64";

export async function fidoUsernameActon(formData: FormData) {
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();
  const username = validateFormDataField(formData)?.username as string;
  let user = await User.findByUsername(username, client);

  if (!user) {
    console.log("사용자가 존재하지 않습니다.");
    user = {
      username,
      id: isoBase64URL.fromBuffer(crypto.randomBytes(32)),
      credentials: [],
    };

    await User.update(user, client);
  }

  const encodedSignature = Buffer.from(user.id).toString("base64");
  const sessionValue = {
    username: encodedSignature,
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

  client.release();

  revalidatePath("/login/password");
}
