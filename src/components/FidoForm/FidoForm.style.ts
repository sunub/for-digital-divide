"use client";

import styled from "styled-components";

export const Form = styled.form`
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;

  display: flex;
  flex-direction: column;
  width: 100cqw;
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
  display: grid;
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
}>`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.$isUpper &&
    "border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%); border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%);"}
  ${(props) =>
    props.$isLower
      ? "border-bottom: 1px solid oklch(16.73% 0.005 83 / 20%);"
      : "border-top: 1px solid oklch(16.73% 0.005 83 / 20%);"}
  border-left: 1px solid oklch(16.73% 0.005 83 / 20%);
  border-right: 1px solid oklch(16.73% 0.005 83 / 20%);

  ${(props) =>
    props.$isUpper &&
    "border-top-left-radius: 8px;border-top-right-radius: 8px;"}
  ${(props) =>
    props.$isLower &&
    "border-bottom-left-radius: 8px;border-bottom-right-radius: 8px;"}

  padding: 4px 16px 4px 16px;
  gap: 4px;
`;

export const Input = styled.input`
  border: none;
  padding: 16px 0 16px 0;
  font-weight: 700;
  background: none;
  font-size: var(--text-size);

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
    content: "";
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
  position: absolute;
  top: 16.5px;
  left: 65px;
  pointer-events: none;
  user-select: none;
  will-change: transform, background, color; // Inform the browser that these properties are likely to change
  background: ${(props) =>
    props.$isFocus ? "oklch(96.33% 0.017 294.49)" : "transparent"};
  color: ${(props) =>
    props.$isFocus
      ? "oklch(65.57% 0.19552898037793698 288.17775174927874)"
      : "oklch(16.73% 0.005 83 / 20%)"};

  transform: ${(props) =>
    props.$isFocus ? "translateY(-110%) scale(0.8)" : ""};
  transition:
    transform 200ms ease-in-out,
    background 200ms ease-in-out,
    color 200ms ease-in-out; // Specify transitions for each property
`;
