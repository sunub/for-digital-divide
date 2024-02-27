import User from "@/lib/fido/user";
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { decode } from "js-base64";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const options = await generateAuthenticationOptions({
      rpID:
        process.env.NODE_ENV === "production"
          ? process.env.HOSTNAME
          : "https://localhost:3000",
      allowCredentials: [],
    });

    const session = req.cookies.get("session")?.value;
    const decodedSession = decode(session as string);
    const parsedSession = JSON.parse(decodedSession);
    const userId = parsedSession.id;

    User.updateChallenge(options.challenge, userId);

    return NextResponse.json({ options });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
