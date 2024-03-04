'use server';

import User from '@/lib/fido/user';
import { NextRequest, NextResponse } from 'next/server';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';

const getOrigin = (userAgent: string): any => {
  let origin = process.env.ORIGIN;

  const appRe = /^[a-zA-z0-9_.]+/;
  const match = userAgent.match(appRe);
  if (match) {
    // Check if UserAgent comes from a supported Android app.
    if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
      const package_names = process.env.ANDROID_PACKAGENAME.split(',').map(
        (name) => name.trim(),
      );
      const hashes = process.env.ANDROID_SHA256HASH.split(',').map((hash) =>
        hash.trim(),
      );
      const appName = match[0];
      for (let i = 0; i < package_names.length; i++) {
        if (appName === package_names[i]) {
          // We recognize this app, so use the corresponding hash.
          const octArray = hashes[i].split(':').map((h) => parseInt(h, 16));
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
  const res = await req.json();
  const credential = res.credential;

  const session = await User.getSession(req);

  const expectedChallenge = session.challenge;
  const expectedOrigin = getOrigin(req.headers.get('User-Agent') as string);
  const expectedRPID =
    process.env.NODE_ENV === 'production' ? process.env.HOSTNAME : 'localhost';

  try {
    const cred = session.credential;
    if (!cred) {
      throw new Error(
        '서버에 등록된 credential이 없습니다. 다시 로그인 해주세요',
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
      expectedRPID: expectedRPID || '',
      authenticator,
      requireUserVerification: false,
    });

    const { verified } = verification;
    if (!verified) {
      throw new Error('인증에 실패했습니다');
    }

    cred.last_used = new Date().getTime();
    await User.updateCredential(session.credential, session.id);

    await User.deleteChallenge(session.id);

    return NextResponse.json({ message: '인증에 성공했습니다' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
