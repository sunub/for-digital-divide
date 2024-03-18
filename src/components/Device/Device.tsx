'use client';

import React from 'react';
import * as Styled from './Device.style';
import VisuallyHidden from '../VisuallyHidden';

interface DeviceProps {
  headerContent?: React.ReactNode;
  mainContent: React.ReactNode;
  footerContent?: React.ReactNode;
}

function Device({ headerContent, mainContent, footerContent }: DeviceProps) {
  const [time, setTime] = React.useState(new Date());
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
    hourCycle: 'h12',
  };

  React.useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = Intl.DateTimeFormat('ko-KR', options).format(time);
  const timeWithoutPeriod = formattedTime.replace('오후 ', '');

  return (
    <PhoneFrame>
      <Styled.DeviceFrame>
        <Styled.SystemStatusBar>
          <time>{timeWithoutPeriod}</time>
        </Styled.SystemStatusBar>

        <Styled.DeviceMainWrapper>
          <Styled.ContentWrapper>
            <Styled.HeaderContent id="device-content__header">
              {headerContent}
            </Styled.HeaderContent>
            <Styled.MainContent id="device-content__main">
              {mainContent}
            </Styled.MainContent>
            <Styled.FooterContent id="device-content__footer">
              {footerContent}
            </Styled.FooterContent>
          </Styled.ContentWrapper>
        </Styled.DeviceMainWrapper>

        <Styled.SystemGestureArea>
          <Styled.Center>
            <RecentlyAppBtn />
          </Styled.Center>
          <Styled.Center>
            <HomeBtn />
          </Styled.Center>
          <Styled.Center>
            <BackBtn />
          </Styled.Center>
        </Styled.SystemGestureArea>
      </Styled.DeviceFrame>
    </PhoneFrame>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <Styled.RootWrapper
      id="device-root-wrapper"
      suppressHydrationWarning={false}
    >
      <Styled.OuterShadow id="device-outter-shadow">
        <Styled.InnerWindow id="device-inner-window">
          {children}
        </Styled.InnerWindow>
      </Styled.OuterShadow>
    </Styled.RootWrapper>
  );
}

function HomeBtn() {
  return (
    <Styled.GestureButton>
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Styled.GestureCircle
          cx="34"
          cy="34"
          r="30"
          fill="none"
          stroke="none"
        />
        <rect
          x="24.5"
          y="24.5"
          width="19"
          height="19"
          rx="3.5"
          stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
          strokeWidth={'2'}
        />
      </svg>
      <VisuallyHidden>홈 버튼</VisuallyHidden>
    </Styled.GestureButton>
  );
}

function BackBtn() {
  return (
    <Styled.GestureButton>
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Styled.GestureCircle
          cx="34"
          cy="34"
          r="30"
          fill="none"
          stroke="none"
        />
        <path
          d="M34 24L26.1213 31.8787C24.9497 33.0503 24.9497 34.9497 26.1213 36.1213L34 44"
          stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
          strokeWidth={'2'}
          strokeLinecap="round"
        />
      </svg>
      <VisuallyHidden>뒤로가기 버튼</VisuallyHidden>
    </Styled.GestureButton>
  );
}

function RecentlyAppBtn() {
  return (
    <div>
      <VisuallyHidden>빈 버튼</VisuallyHidden>
    </div>
  );
}

export default Device;
