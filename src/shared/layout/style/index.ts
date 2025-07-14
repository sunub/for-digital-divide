'use client';

import { GridCenter } from '@/shared/style/css/grid';
import { motion } from 'motion/react';
import styled from 'styled-components';

export const PlaceCenter = styled.div<{ $type: 'home' | 'back' }>`
  display: grid;
  place-items: center;
  grid-area: ${({ $type }) => ($type === 'home' ? 'home' : 'back')};
`;

export const DeviceFooterContainer = styled.div`
  grid-area: device-main-footer/ 1;

  display: grid;
  width: 100%;
  height: 68px;
  grid-template-columns: [empty] 1fr [home] 1fr [back] 1fr;
  grid-template-rows: 1fr;
`;

export const ContentRootWrapper = styled.div`
  grid-area: device-main-content / 1;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Openr = styled.label`
  --hide-scale: 1;

  &:has(input#device-content:checked) {
    --hide-scale: 0;
  }

  &::before {
    content: 'x';
    display: inline-flex;
    place-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 1.25rem;
    height: 1.25rem;
    background: oklch(86.46% 0.073 293.45);
    color: oklch(52.06% 0.041 294.47);
    font-weight: 900;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    cursor: pointer;
    transform: scale(var(--hide-scale));
    transition: transform 300ms cubic-bezier(0.17, 1.48, 0.24, 1);
  }
`;

export const ContentContainer = styled(motion.div)`
  container: device-content / size;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45cqw;
  height: 75cqh;
  border-radius: 50px;
  overflow: hidden;
`;

export const Frame = styled.div`
  container: device / size;

  display: grid;
  grid-template-rows:
    [device-main-content] 1fr
    [device-main-footer] 68px;
  /* grid-template-rows:
    [content-device] var(--content-height)
    [drawer-device] var(--drawer-height); */
  justify-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  background-color: oklch(96.88% 0.015 294.47);
  border: 6px solid oklch(63.93% 0.206 288.34 / 60%);
  border-radius: 50px;
  box-shadow:
    0px 0.1px 1.3px rgba(0, 0, 0, 0.024),
    0.1px 0.2px 2.9px rgba(0, 0, 0, 0.035),
    0.2px 0.4px 5px rgba(0, 0, 0, 0.043),
    0.3px 0.6px 8px rgba(0, 0, 0, 0.05),
    0.4px 1px 12.4px rgba(0, 0, 0, 0.057),
    0.6px 1.5px 19.3px rgba(0, 0, 0, 0.065),
    1px 2.5px 32px rgba(0, 0, 0, 0.076),
    2px 5px 64px rgba(0, 0, 0, 0.1);
  transition: grid 500ms cubic-bezier(0.17, 1.48, 0.24, 1);

  &:has(label[for='device-content'] > input:checked) {
    --drawer-content-display: none;
    --content-height: 20fr;
    --drawer-height: 1fr;
  }

  &:has(label[for='drawer'] > input:checked) {
    --content-height: 3fr;
    --drawer-height: 4fr;
    --drawer-animation: bounce-drawer-box;
    --drawer-container-size: 100%;
  }

  & > div#drawer-container {
    width: var(--drawer-container-size);
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: calc(50% - 50px);

    width: 100px;
    height: 20px;
    justify-self: center;
    background: color-mix(in oklch, oklch(88.25% 0.0276 297.27), transparent);
    backdrop-filter: blur(2px);
    border-radius: 1e5px;
    z-index: 10;
  }
`;

export const DrawerContent = styled.div`
  display: var(--drawer-content-display);
  flex-direction: column;
  gap: 36px;
  align-items: center;
  z-index: var(--drawer-content-z);
`;

export const Input = styled.input`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 1px;
  height: 1px;
  visibility: hidden;
`;

export const DrawerContainer = styled.div`
  --drawer-content: 1px;
  --drawer-opener: 1fr;
  --translateY-val: 50%;
  --drawer-btm-radius: 16px;
  --drawer-content-z: -1;

  grid-area: drawer-device / 1;
  display: grid;
  grid-template-rows: [opener] var(--drawer-opener) [drawer-content] var(--drawer-content);
  width: 100cqw;
  align-items: center;
  place-content: center;
  overflow: hidden;

  position: relative;
  margin-left: auto;
  margin-right: auto;

  background-color: oklch(86.46% 0.073 293.45);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: var(--drawer-btm-radius);
  border-bottom-right-radius: var(--drawer-btm-radius);

  &:has(input:checked) {
    --drawer-content: 10fr;
    --drawer-opener: 1fr;
    --translateY-val: 0%;
    --drawer-btm-radius: 36px;
    --drawer-content-z: 0;
  }

  &:has(input:not(:checked)) {
    ::before {
      animation: emphasis 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    }
  }

  & > div#drawer-content {
    transform: translateY(var(--translateY-val));
  }
`;

export const DrawerOpener = styled.label`
  position: relative;
  width: 100cqw;
  height: 3cqh;
  transition: transform 100ms cubic-bezier(0.39, 0.575, 0.565, 1);
  outline-offset: 4px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateX(-50%);

    width: 6px;
    height: 6px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: oklch(96.88% 0.015 294.47 / 80%);
  }
`;

export const RootWrapper = styled.div.attrs({
  id: 'device-root-wrapper',
})`
  position: relative;
  width: 50cqw;
  height: 100%;

  max-width: 900px;
  max-height: 1564px;

  border: 6px solid oklch(69.45% 0 0);
  outline: 8px solid oklch(88.53% 0 0);
  border-radius: 4cqh;
`;

export const OuterShadow = styled.div.attrs({
  id: 'device-outter-shadow',
})`
  width: 100%;
  height: 100%;
  border: 18px solid oklch(0% 0 0);
  outline: 4px solid oklch(74.41% 0 0);
  background: oklch(97.65% 0 0);
  border-radius: 4cqh;
`;

export const InnerWindow = styled.div.attrs({
  id: 'device-inner-window',
})`
  width: 100%;
  height: 100%;
  border-radius: 4cqh;
  background: oklch(97.65% 0 0);
  container: device-frame / size;
`;

export const AppWrapper = styled.div`
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

export const SystemStatusBar = styled.div`
  grid-area: system-status / fullbleed-start / system-status / fullbleed-end;
  display: grid;
  align-items: center;
  user-select: none;

  & > time {
    grid-area: main;
    margin-inline: 1rem;
  }

  &::after {
    content: '';
    grid-area: system-status / main;
    justify-self: center;
    background: black;
    block-size: 40%;
    inline-size: 100px;
    border-radius: 1e5px;
  }
`;

export const Header = styled.div`
  grid-area: primary-header / fullbleed;
  grid-template-rows: auto auto;
`;

export const Footer = styled.div`
  grid-area: footer / fullbleed;
  grid-template-columns: repeat(3, 1fr);
`;

export const Main = styled.div`
  grid-area: main / fullbleed;
  overflow: auto;
`;

export const SystemGestureArea = styled.form`
  display: grid;
  grid-area: system-gesture / fullbleed;
  grid-template-columns: repeat(3, 1fr);
`;

export const Center = styled.div`
  display: grid;
  place-items: center;
`;

export const Gesture = styled(motion.button)`
  ${GridCenter};
  fill: none;
  stroke: none;
  transition: all 500ms ease;
`;

export const GestureCircle = styled.circle`
  fill: color-mix(in oklch, oklch(71.22% 0 0 / 0.3), transparent);
  opacity: 0;
  stroke: none;
  transition: all 300ms ease;
  transform: scale(0.3);
  transform-origin: center;
`;

export const GestureButton = styled.button`
  ${GridCenter};
  transition:
    opacity,
    transform,
    fill 300ms cubic-bezier(0.17, 1.48, 0.24, 1);

  &:hover {
    ${GestureCircle} {
      opacity: 1;
      transform: scale(1.1);
      fill: color-mix(in oklch, oklch(71.22% 0 0 / 0.5), transparent);
    }
  }

  &:active {
    ${GestureCircle} {
      opacity: 0.5;
      transform: scale(0.55);
    }
  }
`;

export const DeviceFrame = styled.div`
  display: grid;
  height: 100cqh;
  grid-template-rows:
    [system-status] 3.5rem
    [primary-nav] 3rem
    [primary-header] 4rem
    [main] auto
    [footer] 4rem
    [system-gesture] 3rem;

  grid-template-columns:
    [fullbleed-start] 1rem
    [main-start] auto
    [main-end] 1rem
    [fullbleed-end];

  & > ${SystemStatusBar} {
    display: grid;
    grid: subgrid / subgrid;
  }
`;

export const DeviceMainWrapper = styled.div`
  width: 100cqw;
  height: calc(100cqh - 156px);
  scrollbar-width: none;
  padding-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: [main-header] 100px [main-content] 1fr [main-footer] 170px;
  grid-template-columns: [main-column] 1fr;
  justify-items: center;

  padding-left: 32px;
  padding-right: 32px;
  height: 100%;
`;

export const HeaderContent = styled.div`
  grid-area: main-header / main-column;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainContent = styled.div`
  grid-area: main-content / main-column;
`;

export const FooterContent = styled.div`
  grid-area: main-footer / main-column;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  gap: 24px;
  margin-right: 2rem;
`;
