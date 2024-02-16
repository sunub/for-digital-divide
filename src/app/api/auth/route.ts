"use server";

import { NextRequest, NextResponse } from "next/server";
import { decode, encode } from "js-base64";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { cookies } from "next/headers";

export const csrfCheck = (req: NextRequest) => {
  if (req.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return NextResponse.json({ error: "Invalid access" }, { status: 400 });
  }
  return NextResponse.next();
};

export const sessionCheck = (decodedSession: string) => {
  const session = JSON.parse(decodedSession);
  if (!session || !session.includes("signed-in")) {
    return { message: "not signed in", status: 401 };
  }
  return NextResponse.json({ message: "success", status: 200 });
};

export async function POST(req: NextRequest) {
  // sessionCheck
  if (req.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return NextResponse.json({ error: "Invalid access" }, { status: 400 });
  }

  // //sessionCheck
  const session = req.cookies.get("session")?.value as string;
  const decodedSession = JSON.parse(decode(session));
  if (!decodedSession || !decodedSession.signedIn) {
    return NextResponse.json({ message: "not signed in" }, { status: 401 });
  }

  const options = await generateAuthenticationOptions({
    rpID:
      process.env.NODE_ENV === "development"
        ? "localhost"
        : process.env.HOSTNAME,
    allowCredentials: [],
  });

  const sessionValue = {
    ...decodedSession,
    challenge: options.challenge,
  };

  cookies().set("session", encode(JSON.stringify(sessionValue)), {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return NextResponse.json({ options });
}
