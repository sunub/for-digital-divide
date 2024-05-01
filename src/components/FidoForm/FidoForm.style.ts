'use client';

import styled from 'styled-components';

export const Form = styled.form`
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;

  display: flex;
  flex-direction: column;
  width: 100cqw;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10cqh;

  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  grid-area: primary-header / fullbleed;
`;

export const MainWrapper = styled.div`
  grid-area: main / main-start / footer / main-end;
  width: 75cqw;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: red;
  padding: 12px 0 24px 0;
`;

export const FooterWrapper = styled.div`
  grid-area: footer / fullbleed;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-items: center;
  width: 75cqw;
`;

export const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 28px 24px 28px 24px;
  background-color: oklch(65.57% 0.19552898037793698 288.17775174927874);
  border-radius: 1.5cqh;
  font-weight: 700;
  font-size: var(--text-size);
  color: white;
`;

export const InputGroup = styled.div`
  box-shadow:
    0px 0.6px 5.2px rgba(0, 0, 0, 0.011),
    0px 1.5px 12.6px rgba(0, 0, 0, 0.016),
    0px 2.9px 23.7px rgba(0, 0, 0, 0.02),
    0px 5.1px 42.2px rgba(0, 0, 0, 0.024),
    0px 9.6px 79px rgba(0, 0, 0, 0.029),
    0px 23px 189px rgba(0, 0, 0, 0.04);
`;

export const InputWrapper = styled.div<{
  $isUpper: boolean;
  $isLower: boolean;
  $borderRadius?: number;
}>`
  position: relative;

  display: grid;
  grid: [username-input] 1fr / [username-input] 1fr;
  place-content: center;
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  ${(props) =>
    props.$isUpper &&
    'border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%); border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%);'}
  ${(props) =>
    props.$isLower
      ? 'border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%);'
      : 'border-top: 1px solid oklch(16.73% 0.005 83 / 20%);'}
  border-left: 1px solid oklch(16.73% 0.005 83 / 20%);
  border-right: 1px solid oklch(16.73% 0.005 83 / 20%);

  ${(props) =>
    props.$isUpper &&
    'border-top-left-radius: 8px;border-top-right-radius: 8px;'}
  ${(props) =>
    props.$isLower &&
    'border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;'}
  ${(props) =>
    props.$borderRadius && `border-radius: ${props.$borderRadius}px;`}

  padding: 4px 16px 4px 16px;
  gap: 4px;
`;

export const Input = styled.input`
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

export const Label = styled.label`
  grid-area: username-input;
`;

export const VisbilityButton = styled.button`
  display: grid;
  place-items: center;
`;

export const HelpWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const HelperList = styled.li<{ $left: number }>`
  position: relative;
  list-style: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 10px;
    left: ${(props) => props.$left}px;
    width: 1px;
    height: 12px;
    border-radius: 0.5px;
    background-color: #dadada;
  }
`;

export const Placeholder = styled.div<{ $isFocus: boolean }>`
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
