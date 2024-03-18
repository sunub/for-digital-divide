import { NextRequest, NextResponse } from 'next/server';
import { decode, encode } from 'js-base64';
import { Pool } from 'pg';
import User from '@/lib/fido/user';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { cookies } from 'next/headers';

const RP_NAME = 'WebAuthn Codelab';
const TIMEOUT = 30 * 1000 * 60;

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')?.value;
  const decodedSession = decode(session as string);
  const parsedSession = JSON.parse(decodedSession);
  const userId = parsedSession.id;

  const user = (await User.findUserSession(userId)).rows[0];
  if (!user) {
    return NextResponse.json(
      { error: '사용자를 찾을 수 없습니다.' },
      { status: 400 },
    );
  }

  const excludeCredentials: any[] = [];
  if (user.credential.length > 0) {
    for (let cred of user.credential) {
      excludeCredentials.push({
        id: isoBase64URL.toBuffer(cred.credId),
        type: 'public-key',
        transports: ['internal'],
      });
    }
  }

  const pubKeyCredParams = [];
  const params = [-7, -257];
  for (let param of params) {
    pubKeyCredParams.push({ type: 'public-key', alg: param });
  }

  const res = await req.json();
  const { opts } = res;

  const as: any = {};
  const aa = opts.authenticatorSelection.authenticatorAttachment;
  const rr = opts.authenticatorSelection.requireResidentKey;
  const uv = opts.authenticatorSelection.userVerification;
  const cp = opts.attestation;
  let asFlag = false;
  let authenticatorSelection;
  let attestation: AttestationConveyancePreference = 'none';

  if (aa && (aa == 'platform' || aa == 'cross-platform')) {
    asFlag = true;
    as.authenticatorAttachment = aa;
  }
  if (rr && typeof rr == 'boolean') {
    asFlag = true;
    as.requireResidentKey = rr;
  }
  if (uv && (uv == 'required' || uv == 'preferred' || uv == 'discouraged')) {
    asFlag = true;
    as.userVerification = uv;
  }
  if (asFlag) {
    authenticatorSelection = as;
  }
  if (cp && (cp == 'none' || cp == 'indirect' || cp == 'direct')) {
    attestation = cp;
  }

  const rpId =
    process.env.NODE_ENV === 'production' ? process.env.HOSTNAME : 'localhost';

  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: rpId as string,
    userID: user.id,
    userName: user.username,
    timeout: TIMEOUT,
    attestationType: attestation,
    excludeCredentials,
    authenticatorSelection,
  });

  await User.updateChallenge(options.challenge, userId);

  return NextResponse.json({ options });
}
