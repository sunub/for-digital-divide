'use client';

import styled from 'styled-components';
import Device from './device';
import React from 'react';
import useToggle from '@/hooks/use-toggle';

export default function UserPage() {
  const [padnumber, setPadnumber] = React.useState(
    Array.from({ length: 4 }, () => 0),
  );
  const [pinnumber, setPinnumber] = React.useState(
    Array.from({ length: 4 }, () => 0),
  );

  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    setPadnumber((prev) => {
      const newPadnumber = [...prev];
      for (let i = 0; i < newPadnumber.length; i++) {
        if (newPadnumber[i] === 0) {
          newPadnumber[i] = Number(e.target.value);
          break;
        }
      }
      return newPadnumber;
    });
  }

  return (
    <form>
      <Container id="device-root">
        <DeivceFrame id="device-wrapper" className="border-[6px] h-full">
          <label
            htmlFor="device-content"
            className="w-full h-full bg-device rounded-[50px] p-4"
          >
            <Input
              type="radio"
              id="device-content"
              name="device"
              value={'content'}
            />
          </label>
          <Drawer id="drawer-container">
            <Label htmlFor="drawer" id="drawer-label">
              <Input type="radio" id="drawer" name="device" value={'drawer'} />
            </Label>
            <div id="drawer-content" className="flex flex-col gap-[36px]"></div>
          </Drawer>
        </DeivceFrame>
      </Container>
    </form>
  );
}

const Container = styled.div`
  @container devsite-content (height < 750px) {
    #device-wrapper {
      grid-template-columns: [content-device] var(--content-height) [drawer-device] var(
          --drawer-height
        );
      grid-template-rows: 1fr;
      align-items: center;
      width: 70cqw;
      height: 80cqh;
    }

    #drawer-container {
      height: var(--drawer-container-size);
      width: 100%;
      align-items: center;

      &:has(input:checked) {
        border-top-left-radius: 16px;
        border-top-right-radius: 36px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 36px;

        grid-template-columns: [opener] var(--drawer-opener) [drawer-content] var(
            --drawer-content
          );
        grid-template-rows: 1fr;
      }

      &:has(input:checked) > label#drawer-label {
        height: 100cqh;
        width: 100%;
      }
    }

    #drawer-label::before {
      top: calc(50% - 27px);
      left: calc(50% - 3px);
      height: 54px;
      width: 6px;
    }
  }
`;

const DeivceFrame = styled.div`
  --content-height: 20fr;
  --drawer-height: 1fr;
  --drawer-animation: null;
  --drawer-container-size: 90%;

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
  padding: 6px;
  transition: all 500ms cubic-bezier(0.17, 1.48, 0.24, 1);

  width: 40cqw;
  height: 70cqh;
  display: grid;
  grid-template-rows: [content-device] var(--content-height) [drawer-device] var(
      --drawer-height
    );
  justify-items: center;

  &:has(label[for='device-content'] > input:checked) {
    --content-height: 20fr;
    --drawer-height: 1fr;
  }

  &:has(label[for='drawer'] > input:checked) {
    --content-height: 2fr;
    --drawer-height: 3fr;
    --drawer-animation: bounce-drawer-box;
    --drawer-container-size: 100%;
  }

  & > div#drawer-container {
    width: var(--drawer-container-size);
  }
`;

const Label = styled.label`
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

const Button = styled.button`
  --default: oklch(90.62% 0.047607294786081576 286.71848160022387);
  --default-foreground: oklch(28.06% 0.024 291.84);

  --active: oklch(76.64% 0.13 292.01 / 20%);
  --active-foreground: oklch(28.06% 0.024 291.84);

  --confirm: oklch(84.32% 0.114 146.91);
  --confirm-foreground: oklch(46.84% 0.099 111.15);

  --destructive: oklch(74.12% 0.157 25.26);
  --destructive-foreground: oklch(28.06% 0.024 291.84);

  --box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.25);

  height: 50px;
  width: 100px;

  background-color: var(--default);
  color: var(--default-foreground);
  border-radius: 16px;
  font-weight: 100;
  box-shadow: var(--box-shadow);
  transition: all 150ms ease-in;

  &:hover {
    background-color: var(--active);
    color: var(--active-foreground);
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.55);
  }

  &:active {
    background-color: var(--default);
    color: var(--default-foreground);
    --box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.25);
    transition: all 100ms ease-in;
  }
`;

const Input = styled.input`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 1px;
  height: 1px;
  visibility: hidden;
`;

const Drawer = styled.div`
  --drawer-content: 1px;
  --drawer-opener: 1fr;
  --translateY-val: 50%;
  --drawer-btm-radius: 16px;

  display: grid;
  grid-template-rows: [opener] var(--drawer-opener) [drawer-content] var(
      --drawer-content
    );
  width: 100%;
  align-items: center;
  place-content: center;
  overflow: hidden;
  position: relative;

  background-color: oklch(86.46% 0.073 293.45);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: var(--drawer-btm-radius);
  border-bottom-right-radius: var(--drawer-btm-radius);

  &:has(input:checked) {
    --drawer-content: 1fr;
    --drawer-opener: 20px;
    --translateY-val: 0%;
    --drawer-btm-radius: 36px;
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

function Content() {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-[2px]">
        <ol className="text-device-text flex flex-row w-[273px] gap-[2px]">
          <li className="bg-device text-[36px] rounded-tl-[16px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">1</button>
          </li>
          <li className="bg-device text-[36px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">2</button>
          </li>
          <li className="bg-device text-[36px] rounded-tr-[16px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">3</button>
          </li>
        </ol>
        <ol className="text-device-text flex flex-row w-[273px] gap-[2px]">
          <li className="bg-device text-[36px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">4</button>
          </li>
          <li className="bg-device text-[36px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">5</button>
          </li>
          <li className="bg-device text-[36px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">6</button>
          </li>
        </ol>
        <ol className="text-device-text flex flex-row w-[273px] gap-[2px]">
          <li className="bg-device text-[36px] rounded-bl-[16px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">7</button>
          </li>
          <li className="bg-device text-[36px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">8</button>
          </li>
          <li className="bg-device text-[36px] rounded-br-[16px] w-[100px] h-[91px] place-content-center text-center">
            <button className="w-full h-full">9</button>
          </li>
        </ol>
      </div>

      <div className="flex flex-row justify-end gap-1">
        <Button>확인</Button>
        <Button>확인</Button>
      </div>
    </React.Fragment>
  );
}
