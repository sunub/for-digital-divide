import * as Styled from '@compo/FidoForm/FidoForm.style';
import VisuallyHidden from '@/components/VisuallyHidden';
import useToggle from '@/hooks/use-toggle';
import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

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

  const [value, setValue] = React.useState('');
  const [isFocused, toggleIsFocused] = useToggle(false);

  return (
    <React.Fragment>
      <InputWrapper key={'id-wrapper'}>
        <VisuallyHidden>{labelContent}</VisuallyHidden>
        <Input
          onFocus={toggleIsFocused}
          onBlur={toggleIsFocused}
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(() => currValue);
          }}
          {...rest}
        />
        {value.length > 0 ? null : (
          <Placeholder $isFocus={isFocused}>
            <span>{inputContent}</span>
          </Placeholder>
        )}
      </InputWrapper>
    </React.Fragment>
  );
}

export default Username;

const Input = styled.input`
  grid-area: username-input;
  border: none;
  padding: 16px 0 16px 0;
  font-weight: 700;
  background: none;
  font-size: var(--text-size);
  text-align: center;

  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  height: 70px;
  padding: 0 16px;

  &:focus {
    outline: none;
    appearance: none;
  }
`;

const Label = styled.label`
  grid-area: username-input;
`;

const Placeholder = styled.div<{ $isFocus: boolean }>`
  grid-area: username-input;
  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;
  user-select: none;
  will-change: transform, background, color; // will-change를 이용하여 브라우저에 미리 어떤 값이 변경될지를 알려줌으로 성능 향상을 이루고자 한다.
  background: ${(props) =>
    props.$isFocus ? 'oklch(96.33% 0.017 294.49)' : 'transparent'};
  color: ${(props) =>
    props.$isFocus
      ? 'oklch(65.57% 0.19552898037793698 288.17775174927874)'
      : 'var(--color-text)'};

  transform: ${(props) =>
    props.$isFocus ? 'translateY(-50%) scale(0.8)' : ''};
  transition:
    transform 200ms ease-in-out,
    background 200ms ease-in-out,
    color 200ms ease-in-out; // 각각의 속성에 대하여 다른 transition을 적용하여 각각의 컴포넌트 애니메이션의 속도를 조절한다.
`;

const InputWrapper = styled.div`
  position: relative;

  display: grid;
  grid: [username-input] 1fr / [username-input] 1fr;
  place-content: center;

  border: 2px solid;
  border-color: oklch(16.73% 0.005 83 / 20%);
  border-radius: 2.25rem;
  padding: 4px 16px 4px 16px;
  gap: 4px;
`;
