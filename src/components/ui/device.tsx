'use client';

import styled from 'styled-components';
import { cn } from '@/utils/misc';
import { BackBtn, HomeBtn } from '../Icon';

interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DeviceContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

interface DeviceFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DeviceFrame({ children, ...props }: DeviceFrameProps) {
  return (
    <Container id="device-root">
      <Frame id="device-wrapper" {...props}>
        {children}
        <DeviceFooter />
      </Frame>
    </Container>
  );
}

export function DeviceContent({ children, ref, ...props }: DeviceContentProps) {
  return (
    <div className="relative w-full h-full">
      <ContentOpener htmlFor="device-content">
        <Input
          type="radio"
          id="device-content"
          name="device"
          value="content"
          defaultChecked
          readOnly
        />
      </ContentOpener>
      <div
        {...props}
        ref={ref}
        className={cn(
          'flex flex-col justify-center items-center w-full h-full',
          props.className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Drawer({ children }: { children: React.ReactNode }) {
  return (
    <DrawerContainer id="drawer-container">
      <DrawerOpener htmlFor="drawer" id="drawer-label">
        <Input type="radio" id="drawer" name="device" value="drawer" readOnly />
      </DrawerOpener>
      <DrawerContent id="drawer-content">{children}</DrawerContent>
    </DrawerContainer>
  );
}

export function DeviceFooter({ ...props }: DeviceFooterProps) {
  return (
    <DeviceFooterContainer {...props}>
      <PlaceCenter $type="home">
        <HomeBtn />
      </PlaceCenter>
      <PlaceCenter $type="back">
        <BackBtn />
      </PlaceCenter>
    </DeviceFooterContainer>
  );
}

const PlaceCenter = styled.div<{ $type: 'home' | 'back' }>`
  display: grid;
  place-items: center;
  grid-area: ${({ $type }) => ($type === 'home' ? 'home' : 'back')};
`;

const DeviceFooterContainer = styled.div`
  display: grid;
  width: 100%;
  height: fit-content;
  grid-template-columns: [empty] 1fr [home] 1fr [back] 1fr;
  grid-template-rows: 1fr;
`;

const ContentOpener = styled.label`
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

const Container = styled.div`
  container: device / size;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45cqw;
  height: 75cqh;
`;

const Frame = styled.div`
  --content-height: 20fr;
  --drawer-height: 1fr;
  --drawer-animation: null;
  --drawer-container-size: 90%;
  --drawer-content-display: flex;

  display: grid;
  grid-template-rows:
    [content-device] var(--content-height)
    [drawer-device] var(--drawer-height);
  justify-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  padding: 6px;
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
    background: oklch(88.25% 0.0276 297.27);
    border-radius: 1e5px;
    z-index: 1000;
  }
`;

const DrawerContent = styled.div`
  display: var(--drawer-content-display);
  flex-direction: column;
  gap: 36px;
  align-items: center;
  z-index: var(--drawer-content-z);
`;

const Input = styled.input`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 1px;
  height: 1px;
  visibility: hidden;
`;

const DrawerContainer = styled.div`
  --drawer-content: 1px;
  --drawer-opener: 1fr;
  --translateY-val: 50%;
  --drawer-btm-radius: 16px;
  --drawer-content-z: -1;

  display: grid;
  grid-template-rows: [opener] var(--drawer-opener) [drawer-content] var(
      --drawer-content
    );
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

const DrawerOpener = styled.label`
  position: relative;
  width: 100cqw;
  height: 100%;
  transition: transform 100ms cubic-bezier(0.39, 0.575, 0.565, 1);
  outline-offset: 4px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 27px);

    width: 54px;
    height: 6px;
    border-radius: 4px;
    background-color: oklch(96.88% 0.015 294.47 / 80%);
  }
`;
