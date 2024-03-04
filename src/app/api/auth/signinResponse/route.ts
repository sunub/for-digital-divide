import User from "@/lib/fido/user";
import { decode } from "js-base64";
import { NextRequest, NextResponse } from "next/server";
import { getOrigin } from "@lib/client";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const credential = res.credential;

  const session = await User.getSession(req);

  const expectedChallenge = session.challenge;
  const expectedOrigin = getOrigin(req.headers.get("user-agent")!);
  const expectedRPID =
    process.env.NODE_ENV === "production" ? process.env.HOSTNAME : "localhost";

  try {
    const cred = session.credential;
    if (!cred) {
      throw new Error(
        "서버에 등록된 credential이 없습니다. 다시 로그인 해주세요",
      );
    }

    const authenticator = {
      credentialPublicKey: isoBase64URL.toBuffer(cred.publicKey),
      credentialID: isoBase64URL.toBuffer(cred.id),
      transport: cred.transport,
      counter: 0,
    };

    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin,
      expectedRPID: expectedRPID || "",
      authenticator,
      requireUserVerification: false,
    });

    const { verified, authenticatorInfo } = verification;
    if (!verified) {
      throw new Error("인증에 실패했습니다");
    }

    cred.last_used = new Date().getTime();
    await User.updateCredential(session.credential, session.id);

    await User.deleteChallenge(session.id);

    return NextResponse.json({ message: "인증에 성공했습니다" });
  } catch (error) {
    await User.deleteChallenge(session.id);

    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
