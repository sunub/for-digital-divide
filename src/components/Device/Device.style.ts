'use client';

import styled from 'styled-components';

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
  padding: 18px;
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

export const GestureCircle = styled.circle`
  fill: none;
  stroke: none;
  transition: all 500ms ease;

  &:hover {
  }
`;

export const GestureButton = styled.button`
  display: grid;
  place-items: center;
  width: fit-content;

  &:hover ${GestureCircle} {
    fill: color-mix(in oklch, oklch(71.22% 0 0 / 0.3), transparent);
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
  overflow-y: scroll;
  scrollbar-width: none;
  padding-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: [main-header] 300px [main-content] 1fr [main-footer] 170px;
  grid-template-columns: [main-column] 1fr;

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
