'use client';

import { FlexCenterDiv } from '@/shared/style/component/div';
import styled from 'styled-components';

export const IconWrapper = styled.div<{ $isTyping?: boolean }>`
  position: absolute;
  left: 1rem;
  transition: opacity 300ms ease-in-out;
  opacity: ${props => (props.$isTyping ? 1 : 0)};
`;

export const InputWrapper = styled.div<{ $isFocused: boolean; $isValid: boolean }>`
  position: relative;
  display: grid;
  grid: [username-input] 1fr / [username-input] 1fr;
  align-items: center;
  place-content: center;
  border: 2px solid ${props => (props.$isValid ? 'var(--color-button)' : 'var(--input-invalid)')};
  color: ${props => (props.$isValid ? 'var(--color-text)' : 'var(--input-invalid)')};
  opacity: 0.4;
  border-radius: 0.75rem;
  padding: 2px 4px;
  gap: 4px;

  transition: opacity 300ms ease-in-out;
  will-change: opacity;
  &:hover {
    opacity: 1;
  }
  &:focus-within {
    opacity: 1;
  }
`;

export const Input = styled.input`
  grid-area: username-input;
  border: none;
  font-weight: 700;
  background: none;
  font-size: var(--text-size);
  text-align: center;
  padding: 16px 50px;
  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;

export const Placeholder = styled(FlexCenterDiv)<{ $isFocus: boolean }>`
  grid-area: username-input;
  pointer-events: none;
  user-select: none;
  will-change: transform, background, color;
  background: ${props => (props.$isFocus ? 'oklch(96.33% 0.017 294.49)' : 'transparent')};
  color: ${props => (props.$isFocus ? 'var(--color-button)' : 'var(--color-text)')};
  transform: ${props => (props.$isFocus ? 'translateY(-80%) translateX(2%) scale(0.8)' : 'none')};
  transition: transform 200ms ease-in-out, background 200ms ease-in-out, color 200ms ease-in-out;
`;

export const InputContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const InputRootContainer = styled(FlexCenterDiv)`
  flex-direction: column;
  gap: 1rem;
`;
