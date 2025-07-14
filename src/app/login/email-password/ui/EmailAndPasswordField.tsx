'use client';

import styled from 'styled-components';
import { EmailInput } from './EmailInput';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { PasswordInput } from '@/components/PasswordInput/ui/PasswordInput';
import { FlexCenterDiv } from '@/shared/style/component/div';

export function EmailAndPasswordField() {
  const [emailError, validateEmail] = useEmailValidation();
  const [passwordError, validatePassword] = usePasswordValidation();

  return (
    <Container>
      <EmailInput
        key={'register-email__input-field'}
        style={{ borderRadius: '10px 10px 0px 0px' }}
        validateAction={validateEmail}
      />
      <PasswordInput
        id="login-password__input-field"
        autoCompletes={'current-password'}
        key={'login-password__input-field'}
        style={{ borderRadius: '0px 0px 10px 10px', borderTop: '0px' }}
        validateAction={validatePassword}
      />
      <ErrorTextContainer>
        <ErrorText $isVisible={!!emailError}>{emailError || '\u00A0'}</ErrorText>
        <ErrorText $isVisible={!!passwordError}>{passwordError || '\u00A0'}</ErrorText>
      </ErrorTextContainer>
    </Container>
  );
}

const Container = styled(FlexCenterDiv)`
  flex-direction: column;
`;

const ErrorTextContainer = styled(FlexCenterDiv)`
  flex-direction: column;
  padding-top: 0.35rem;
`;

const ErrorText = styled.span<{ $isVisible: boolean }>`
  color: red;
  font-size: 0.65rem;
  padding-bottom: 0.25rem;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
