'use client';

import styled from 'styled-components';
import { UserIcon } from 'lucide-react';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { LeadingIconInput } from '@/components/LeadingIconInput';
import { useUsernameValidation } from '../hooks/useUsernameValidation';

export function UsernameInput() {
  const [usernameError, validateUsername] = useUsernameValidation();

  return (
    <FlexCenterDiv className="flex-col">
      <LeadingIconInput
        id="register-username"
        name="username"
        inputContent="사용자 이름을 입력해주세요"
        labelContent="사용자 이름"
        autoComplete="username"
        validateAction={validateUsername}
      >
        <UserIcon size={16} />
      </LeadingIconInput>
      <ErrorText $isVisible={usernameError}>
        {usernameError || '2자 이상 20자 이하의 한글 또는 영문 대소문자만 사용할 수 있습니다.'}
      </ErrorText>
    </FlexCenterDiv>
  );
}

const ErrorText = styled.span<{ $isVisible: string | null }>`
  color: ${({ $isVisible }) => ($isVisible ? 'red' : 'var(--color-text)')};
  font-size: 0.65rem;
  padding-bottom: 0.25rem;
  font-weight: 700;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0.3)};
  transition: opacity 0.3s ease-in-out;
`;
