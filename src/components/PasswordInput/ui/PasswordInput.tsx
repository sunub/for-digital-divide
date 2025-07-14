'use client';

import styled from 'styled-components';
import { KeySquare } from 'lucide-react';
import { useRef, useState } from 'react';
import { EyeIcon, EyeClosedIcon } from 'lucide-react';
import VisuallyHidden from '@/components/VisuallyHidden';
import { InputRootContainer, InputContainer, InputWrapper, IconWrapper, Placeholder, Input } from '../style';

interface PasswordInputProps extends React.HTMLAttributes<HTMLDivElement> {
  validateAction?: (value: unknown) => boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState('password');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (props.validateAction) {
      const validateResult = props.validateAction(value);
      setIsValid(validateResult);
    }
  };

  return (
    <InputRootContainer key={'register-password-container'} id={'register-password-container'}>
      <InputContainer onFocus={handleFocus} onBlur={handleBlur}>
        <InputWrapper $isFocused={isFocused} $isValid={isValid} style={props.style}>
          <VisuallyHidden>비밀번호 입력 란</VisuallyHidden>
          <IconWrapper $isTyping={value.length > 0}>
            <KeySquare size={16} />
          </IconWrapper>
          <Input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            autoComplete={'new-password'}
            id={'sign-up_new-password'}
            type={passwordVisibility}
            name={'password'}
            style={{
              fontFamily: 'icomoon',
            }}
          />
          {value.length > 0 ? null : (
            <Placeholder $isFocus={isFocused}>
              <span>비밀번호를 입력해주세요</span>
            </Placeholder>
          )}
          <Button
            $isFocused={true}
            type="button"
            onClick={() => setPasswordVisibility(prev => (prev === 'password' ? 'text' : 'password'))}
          >
            {passwordVisibility === 'password' ? <EyeClosedIcon size={'16px'} /> : <EyeIcon size={'16px'} />}
          </Button>
        </InputWrapper>
      </InputContainer>
    </InputRootContainer>
  );
}

const Button = styled.button<{ $isFocused: boolean }>`
  position: absolute;
  right: 1rem;
  visibility: ${props => (props.$isFocused ? 'visible' : 'hidden')};
  opacity: ${props => (props.$isFocused ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;
