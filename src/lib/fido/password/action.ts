"use server";

import { Pool } from "pg";
import User from "../user";
import validateFormDataField from "../validator";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

export async function fidoPasswordAction(formData: FormData) {
  const pool = new Pool({
    connectionString: process.env.SUNUB_POSTGRES_URL + "?sslmode=require",
  });
  const client = await pool.connect();
  const password = validateFormDataField(formData)?.password as string;

  const hash = crypto.createHash("sha256").update(password).digest();
  const encodedSignature = Buffer.from(hash).toString("base64");

  let user = await User.findByPassword(encodedSignature, client);
  if (!user) {
    console.log("비밀번호가 일치하지 않습니다.");
    return;
  }

  client.release();
  await pool.end();

  revalidatePath("/dashboard");
}

// (async () => {
//   const options = await generateAuthenticationOptions({
//     rpID:
//       process.env.NODE_ENV === "development"
//         ? "localhost"
//         : process.env.HOSTNAME,
//     allowCredentials: [],
//   });

// })();
