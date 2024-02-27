"use server";

import User from "@/lib/fido/user";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { decode } from "js-base64";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const decodedSession = decode(session as string);
  const parsedSession = JSON.parse(decodedSession);
  const userId = parsedSession.id;
  const user = (await User.findUserSession(userId)).rows[0];

  const body = await req.json();
  const credential = body.credential;
  console.log(credential);
  const expectedChallenge = user.challenge;
  const expectedOrigin = `https://localhost:3000`;
  const expectedRPID =
    process.env.NODE_ENV === "production" ? process.env.HOSTNAME : "localhost";
  const credId = isoBase64URL.fromBuffer(Buffer.from(credential.id, "base64"));
  const type = credential.type;

  try {
    const vertification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
    });

    const { verified, registrationInfo } = vertification;
    if (!verified || !registrationInfo) {
      throw new Error("User verification failed.");
    }
    const { credentialPublicKey, credentialID, counter } = registrationInfo;
    const base64PublicKey = isoBase64URL.fromBuffer(credentialPublicKey);
    const base64CredentialID = isoBase64URL.fromBuffer(credentialID);

    const existingCredential = user.credential.find(
      (cred: any) => cred.credId === base64CredentialID,
    );

    if (!existingCredential) {
      user.credential.push({
        publicKey: base64PublicKey,
        credId: base64CredentialID,
        prevCounter: counter,
      });
    }
    console.log(user.credential);
    await User.updateCredential(user.credential, user.id);
    await User.deleteChallenge(user.id);

    return NextResponse.json({ user });
  } catch (e) {
    console.error(e);
  }

  return NextResponse.json({ message: "Hello, world!" });
}
