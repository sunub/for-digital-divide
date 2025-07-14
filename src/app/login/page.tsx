import React from 'react';
import { EmailCard } from './ui/EmailCard';
import { PinNumberCard } from './ui/PinNumberCard';
import {
  LoginContentContainer,
  LoginTitleContainer,
  Title,
  Description,
  CardContainer,
  SignupInformation,
  SignupLink,
  SignupContainer,
} from './style';
import { MotionNodeAnimationOptions } from 'motion/react';
import { DeviceFrame } from '@/shared/layout';
import { DeviceContent } from '@/shared/layout';
import { ToastMessage } from './ui/ToastMessage';
import dynamic from 'next/dynamic';

function DefaultLoginSelection() {
  return (
    <>
      <LoginTitleContainer>
        <Title>로그인</Title>
        <Description>로그인 방식을 선택해주세요</Description>
      </LoginTitleContainer>
      <CardContainer>
        <EmailCard />
        <PinNumberCard />
      </CardContainer>
      <SignupContainer>
        <SignupLink href="/sign-up/register-user">
          <span>회원가입</span>
        </SignupLink>
        <SignupInformation>회원가입을 하지 않으셨다면 회원가입을 해주세요.</SignupInformation>
      </SignupContainer>
    </>
  );
}

const ComponentMap: { [key: string]: React.ComponentType<unknown> } = {
  email: dynamic(() => import('./email-password/page')),
  pin: dynamic(() => import('./pin')),
  default: DefaultLoginSelection,
};

export default async function Page({ searchParams }: { searchParams: Promise<{ method: string; reason?: string }> }) {
  const { method = 'default', reason } = (await searchParams) || {};
  const pageVariants: MotionNodeAnimationOptions['variants'] = {
    initial: { opacity: 0, x: '100%', z: -1 },
    in: { opacity: 1, x: 0, z: 0 },
    out: { opacity: 0, x: '-100%', z: -1 },
  };

  const pageTransition: MotionNodeAnimationOptions['transition'] = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };
  const CurrentPageComponent = ComponentMap[method] || ComponentMap.default;

  return (
    <DeviceFrame>
      <DeviceContent>
        {reason && <ToastMessage reason={reason} />}
        <LoginContentContainer
          key={method}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{ width: '100%', height: '100%' }}
        >
          <CurrentPageComponent />
        </LoginContentContainer>
      </DeviceContent>
    </DeviceFrame>
  );
}
