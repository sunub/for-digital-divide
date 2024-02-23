"use server";

import User from "@/lib/fido/user";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { decode } from "js-base64";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const getOrigin = (userAgent: string) => {
  let origin = process.env.ORIGIN;

  const appRe = /^[a-zA-z0-9_.]+/;
  const match = userAgent.match(appRe);
  if (match) {
    // Check if UserAgent comes from a supported Android app.
    if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
      const package_names = process.env.ANDROID_PACKAGENAME.split(",").map(
        (name) => name.trim(),
      );
      const hashes = process.env.ANDROID_SHA256HASH.split(",").map((hash) =>
        hash.trim(),
      );
      const appName = match[0];
      for (let i = 0; i < package_names.length; i++) {
        if (appName === package_names[i]) {
          // We recognize this app, so use the corresponding hash.
          const octArray = hashes[i].split(":").map((h) => parseInt(h, 16));
          const androidHash = isoBase64URL.fromBuffer(
            octArray as unknown as Uint8Array,
          );
          origin = `android:apk-key-hash:${androidHash}`;
          break;
        }
      }
    }
  }

  return origin;
};

export async function POST(req: NextRequest) {
  const session = cookies().get("session")?.value;
  const decodedSession = decode(session as string);
  const parsedSession = JSON.parse(decodedSession);
  const body = await req.json();

  const userId = decode(parsedSession.id);
  const expectedChallenge = parsedSession.challenge;
  const expectedOrigin = getOrigin(req.headers.get("User-Agent") as string);
  const expectedRpId =
    process.env.NODE_ENV === "production" ? process.env.HOSTNAME : "localhost";
  const credId = body.id;
  const type = body.type;

  try {
    const user = (await User.findByUserId(userId)).rows[0];
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({ message: "Hello, world!" });
}
