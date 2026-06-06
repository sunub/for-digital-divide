"use server";

import { EncryptJWT, jwtDecrypt } from "jose";
import { cookies } from "next/headers";

interface CreateSessionCookieStorageOptions {
  name: string;
  secret?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
}

export async function getPermanentCookieStorage(cookieName: string) {
  const cookie = await cookies();
  const token = cookie.get(cookieName);
  if (!token) {
    return null;
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("Session secret is required");
  }

  const buf = Buffer.from(secretKey, "base64");
  if (buf.length !== 32) {
    throw new Error("Invalid session secret");
  }

  try {
    const { payload } = await jwtDecrypt(token.value, buf);
    return payload;
  } catch (error) {
    console.error("Failed to decrypt permanent cookie:", error);
    return null;
  }
}

export async function deletePermanentCookieStorage(cookieName: string) {
  const cookie = await cookies();
  cookie.delete(cookieName);
}

export async function createPermanentCookieStorage<T>(
  data: Record<string, T>,
  opts?: CreateSessionCookieStorageOptions,
) {
  const cookie = await cookies();
  if (!opts?.name) {
    throw new Error("쿠키의 이름 설정은 필수입니다.");
  }

  if (cookie.has(opts?.name || "en_session")) {
    await deletePermanentCookieStorage(opts?.name || "en_session");
  }

  const {
    name,
    secret,
    path = "/",
    domain,
    secure = true,
    sameSite = "lax",
    maxAge = 60 * 60 * 24 * 365, // 1 year
  } = opts || {};
  const secretKey = process.env.JWT_SECRET || secret;
  if (!secretKey) {
    throw new Error("Session secret is required");
  }

  const buf = Buffer.from(secretKey, "base64");
  if (buf.length !== 32) {
    throw new Error("Invalid session secret");
  }

  const token = await new EncryptJWT(data)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .encrypt(buf);

  cookie.set(name, token, {
    path,
    domain,
    secure,
    sameSite,
    maxAge,
    httpOnly: true,
  });
}
