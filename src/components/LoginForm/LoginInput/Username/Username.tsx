import React, { HTMLAttributes, useRef, useState } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@/components/VisuallyHidden';

interface UsernameProps extends HTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  inputContent: string;
  labelContent: string;
  borderRadius?: number;
}

function Username(props: UsernameProps) {
  const { inputContent, labelContent, ...rest } = props;
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <InputWrapper $isFocused={isFocused}>
      <VisuallyHidden>{labelContent}</VisuallyHidden>
      <Input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...rest}
      />
      {value.length > 0 ? null : (
        <Placeholder $isFocus={isFocused}>
          <span>{inputContent}</span>
        </Placeholder>
      )}
    </InputWrapper>
  );
}

export default Username;

const InputWrapper = styled.div<{ $isFocused: boolean }>`
  position: relative;
  display: grid;
  grid: [username-input] 1fr / [username-input] 1fr;
  align-items: center;
  place-content: center;
  border: 2px solid;
  border-color: ${({ $isFocused }) =>
    $isFocused ? 'var(--color-button)' : 'oklch(16.73% 0.005 83 / 20%)'};
  border-radius: 1.25rem;
  padding: 8px 16px;
  gap: 4px;
`;

const Input = styled.input`
  grid-area: username-input;
  border: none;
  font-weight: 700;
  background: none;
  font-size: var(--text-size);
  text-align: center;
  padding: 16px 16px;
  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

const Placeholder = styled.div<{ $isFocus: boolean }>`
  grid-area: username-input;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;
  will-change: transform, background, color;
  background: ${(props) =>
    props.$isFocus ? 'oklch(96.33% 0.017 294.49)' : 'transparent'};
  color: ${(props) =>
    props.$isFocus ? 'var(--color-button)' : 'var(--color-text)'};
  transform: ${(props) =>
    props.$isFocus ? 'translateY(-80%) translateX(2%) scale(0.8)' : 'none'};
  transition:
    transform 200ms ease-in-out,
    background 200ms ease-in-out,
    color 200ms ease-in-out;
`;
