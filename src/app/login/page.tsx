'use client';

import React from 'react';
import { fidoUsernameActon } from '@lib/fido/username/action';
import FidoForm from '@/components/FidoForm';
import { redirect } from 'next/navigation';
import { decode } from 'js-base64';
import { createCredentials } from '@/lib/credentials';
import Username from '@/components/LoginForm/LoginInput/Username';
import Button from '@/components/Button/Button';

function Page() {
  return (
    <FidoForm
      key={'fido-login_username'}
      type="username"
      redirect={() => redirect('/login/password')}
      action={async (formData) => {
        await fidoUsernameActon(formData);
      }}
      register={async () => {
        await createCredentials();
      }}
    >
      <Username
        id="username"
        type="text"
        name="username webauthn"
        autoComplete={'email'}
        aria-label="아이디 입력"
        aria-labelledby="아이디 입력"
        minLength={1}
        maxLength={40}
        labelContent="아이디"
        inputContent="아이디를 입력해주세요"
      />
    </FidoForm>
  );
}

export default Page;
