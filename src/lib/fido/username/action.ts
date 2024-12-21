'use server';

import User from '@lib/fido/user';
import validateFormDataField from '../validator';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { encode } from 'js-base64';

export async function fidoUsernameActon(formData: FormData) {
  const cookieStore = await cookies();
  const isAlreadySignedIn = cookieStore.has('session');
  if (isAlreadySignedIn) return;

  const username = validateFormDataField(formData)?.username as string;
  let user = await User.findByUsername(username);

  if (!user) {
    console.log('사용자가 존재하지 않습니다.');
    const newUserInfo = {
      username,
      id: isoBase64URL.fromBuffer(new Uint8Array(crypto.randomBytes(32))),
      credentials: [],
    };

    await User.update(newUserInfo);
  }
  const encodedSignatureId = Buffer.from(user.id).toString('base64');
  const sessionValue = {
    id: encodedSignatureId,
    signedIn: true,
  };

  await User.insertSession(encodedSignatureId, username);

  cookieStore.set('session', encode(JSON.stringify(sessionValue)), {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
}
