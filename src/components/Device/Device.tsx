"use client";

import React from "react";
import * as Styled from "./Device.style";

function Device({ children }: { children: React.ReactNode }) {
  const [time, setTime] = React.useState(new Date());
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
    hourCycle: "h12",
  };

  React.useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const formattedTime = Intl.DateTimeFormat("ko-KR", options).format(time);
  const timeWithoutPeriod = formattedTime.replace("오후 ", "");

  return (
    <PhoneFrame>
      <Styled.DeviceFrame>
        <Styled.SystemStatusBar>
          <time>{timeWithoutPeriod}</time>
        </Styled.SystemStatusBar>

        {children}

        <Styled.SystemGestureArea>
          <RecentlyAppBtn />
          <HomeBtn />
          <BackBtn />
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
      <Styled.GestureButtonIcon
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="14.5"
          y="14.5"
          width="19"
          height="19"
          rx="3.5"
          stroke="white"
          strokeWidth={"2"}
        />
      </Styled.GestureButtonIcon>
    </Styled.GestureButton>
  );
}

function BackBtn() {
  return (
    <Styled.GestureButton>
      <Styled.GestureButtonIcon
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 14L14.1213 21.8787C12.9497 23.0503 12.9497 24.9497 14.1213 26.1213L22 34"
          stroke="white"
          strokeWidth={"2"}
          strokeLinecap="round"
        />
      </Styled.GestureButtonIcon>
    </Styled.GestureButton>
  );
}

function RecentlyAppBtn() {
  return (
    <Styled.GestureButton>
      <Styled.GestureButtonIcon
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 14L24 33.6"
          stroke="white"
          strokeWidth={"2"}
          strokeLinecap="round"
        />
        <path
          d="M14 14L14 33.6"
          stroke="white"
          strokeWidth={"2"}
          strokeLinecap="round"
        />
        <path
          d="M34 14L34 33.6"
          stroke="white"
          strokeWidth={"2"}
          strokeLinecap="round"
        />
      </Styled.GestureButtonIcon>
    </Styled.GestureButton>
  );
}

export default Device;
