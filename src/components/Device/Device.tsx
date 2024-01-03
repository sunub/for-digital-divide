"use client";

import React from "react";
import styled from "styled-components";

const RootWrapper = styled.div`
  position: relative;
  width: 426px;
  height: 829px;
  border: 4px solid oklch(69.45% 0 0);
  outline: 4px solid oklch(88.53% 0 0);
  border-radius: 50px;
`;

const OuterShadow = styled.div`
  width: 100%;
  height: 100%;
  border: 13px solid oklch(0% 0 0);
  outline: 4px solid oklch(74.41% 0 0);
  background: oklch(97.65% 0 0);
  border-radius: 50px;
  padding: 3px;
`;

const InnerWindow = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: oklch(97.65% 0 0);
`;

const AppWrapper = styled.div`
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

const DeviceFrame = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows:
    [system-status] 3.5rem
    [primary-nav] 3rem
    [primary-header] 4rem
    [main] auto
    [footer] 4rem
    [system-gesture] 2rem;

  grid-template-columns:
    [fullbleed-start] 1rem
    [main-start] auto
    [main-end] 1rem
    [fullbleed-end];

  & > *,
  & > ${AppWrapper} {
    display: grid;
    grid: subgrid / subgrid;
  }
`;

const SystemStatusBar = styled.div`
  grid-area: system-status / fullbleed;
  display: grid;
  align-items: center;

  & > time {
    grid-area: system-status / main;
    margin-inline: 2rem;
  }

  &::after {
    content: "";
    grid-area: system-status / main;
    justify-self: center;
    background: black;
    block-size: 50%;
    inline-size: 25%;
    border-radius: 1e5px;
  }
`;

const Header = styled.div`
  grid-area: primary-header / fullbleed;
  grid-template-rows: auto auto;
`;

const Footer = styled.div`
  grid-area: footer / fullbleed;
`;

const Main = styled.div`
  grid-area: main / fullbleed;
  overflow: auto;
`;

function Device({
  header,
  main,
  footer,
}: {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}) {
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
      <DeviceFrame>
        <SystemStatusBar>
          <time>{timeWithoutPeriod}</time>
        </SystemStatusBar>

        <AppWrapper>
          <Header>{header}</Header>
          <Main>{main}</Main>
          <Footer>{footer}</Footer>
        </AppWrapper>
      </DeviceFrame>
    </PhoneFrame>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <RootWrapper>
      <OuterShadow>
        <InnerWindow>{children}</InnerWindow>
      </OuterShadow>
    </RootWrapper>
  );
}

export default Device;
