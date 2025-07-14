'use client';

import { Form } from './ui/Form';
import styled from 'styled-components';
import { Gugi } from 'next/font/google';
import { UsernameInput } from './ui/UsernameInput';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { EmailAndPasswordField } from './ui/EmailAndPasswordField';
import { DeviceContent, DeviceFrame } from '@/shared/layout';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export default function RegisterUserNamePage() {
  return (
    <DeviceFrame>
      <DeviceContent>
        <Container>
          <Title>회원 가입</Title>
          <Form>
            <UsernameInput />
            <EmailAndPasswordField />
          </Form>
        </Container>
      </DeviceContent>
    </DeviceFrame>
  );
}

const Container = styled(FlexCenterDiv)`
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  font-family: ${gugi.style.fontFamily};
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%);
`;
