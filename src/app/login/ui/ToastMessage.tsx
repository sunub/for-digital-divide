'use client';

import { useEffect } from 'react';
import { useToast } from '@/provider/toast/hooks/useToast';
import { REDIRECT_REASONS } from '@/shared/constants';

export function ToastMessage({ reason }: { reason: string }) {
  const messages: { [key: string]: string } = {
    [REDIRECT_REASONS.ALREADY_REGISTERED]: '이미 회원가입을 하셨습니다. 로그인해주세요.',
    [REDIRECT_REASONS.EMAIL_NOT_VERIFIED]: '이메일 인증이 필요합니다. 이메일을 확인해주세요.',
    [REDIRECT_REASONS.PIN_NOT_VERIFIED]: '핀 번호 인증이 필요합니다. 핀 번호를 확인해주세요.',
  };
  const showToast = useToast();

  useEffect(() => {
    if (!reason || !messages[reason]) {
      showToast('error', '알 수 없는 이유로 로그인할 수 없습니다.', 5000);
      return;
    }
    showToast('info', messages[reason] || '알 수 없는 이유로 로그인할 수 없습니다.', 5000);
  }, [reason]);

  return <></>;
}
