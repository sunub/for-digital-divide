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
      <Username />
    </FidoForm>
  );
}

export default Page;
