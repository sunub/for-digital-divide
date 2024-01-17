"use client";

import styled from "styled-components";
import Link from "next/link";

export const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 16px 24px 16px 24px;
  background-color: oklch(65.57% 0.19552898037793698 288.17775174927874);
  border-radius: 24px;
  font-weight: 700;
  color: white;
`;

export const InputGroup = styled.div`
  box-shadow: 0px 0.6px 5.2px rgba(0, 0, 0, 0.011),
    0px 1.5px 12.6px rgba(0, 0, 0, 0.016), 0px 2.9px 23.7px rgba(0, 0, 0, 0.02),
    0px 5.1px 42.2px rgba(0, 0, 0, 0.024), 0px 9.6px 79px rgba(0, 0, 0, 0.029),
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
  gap: 8px;
`;

export const Input = styled.input`
  border: none;
  padding: 16px 0 16px 0;
  font-size: 16px;
  font-weight: 700;
  background: none;

  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  font-size: 16px;
  height: 52px;
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

export const Helper = styled(Link)`
  text-decoration: none;
  font-size: 14px;
  line-height: 17px;
  color: #8f8f8f;
`;

export const Placeholder = styled.div<{ $isFocus: boolean }>`
  position: absolute;
  font-size: 0.75rem;
  top: 13px;
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
  transition: transform 200ms ease-in-out, background 200ms ease-in-out,
    color 200ms ease-in-out; // Specify transitions for each property
`;

export const HeaderWrapper = styled.div`
  grid-area: primary-header / fullbleed;
  grid-template-rows: auto auto;
`;

export const MainWrapper = styled.div`
  grid-area: main / main-start / footer / main-end;
  grid-template-rows: auto auto;
`;

export const FooterWrapper = styled.div`
  grid-area: footer / main-start / system-gesture / main-end;
  grid-template-rows: auto auto;
`;
