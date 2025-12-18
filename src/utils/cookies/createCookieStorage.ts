"use server";

import { EncryptJWT, jwtDecrypt } from "jose";
import { cookies } from "next/headers";

interface CreateCookieStorageOptions {
  name: string;
  secret?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
}

export async function getCookieStorage(cookieName: string) {
  const cookie = await cookies();
  const token = cookie.get(cookieName);
  if (!token) return null;

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("cookie secret is required");
  }

  const buf = Buffer.from(secretKey, "base64");
  if (buf.length !== 32) {
    throw new Error("Invalid cookie secret");
  }

  try {
    const { payload } = await jwtDecrypt(token.value, buf);
    return payload;
  } catch (error) {
    console.error("Failed to decrypt cookie:", error);
    return null;
  }
}

export async function deleteCookieStorage(cookieName: string) {
  const cookie = await cookies();
  cookie.delete(cookieName);
}

export async function createCookieStorage(
  data: Record<string, unknown>,
  opts?: CreateCookieStorageOptions,
) {
  const cookie = await cookies();
  if (!opts || !opts.name) {
    throw new Error("Cookie name is required");
  }

  if (cookie.has(opts.name)) {
    await deleteCookieStorage(opts.name);
  }

  const {
    name,
    secret,
    path = "/",
    domain,
    secure = process.env.PRODUCTION === "true",
    sameSite = "lax",
    maxAge = 60 * 10, // 10 분
  } = opts || {};
  const secretKey = process.env.JWT_SECRET || secret;
  if (!secretKey) {
    throw new Error("cookie secret is required");
  }

  const buf = Buffer.from(secretKey, "base64");
  if (buf.length !== 32) {
    throw new Error("Invalid cookie secret");
  }

  const token = await new EncryptJWT(data)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("24h")
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
