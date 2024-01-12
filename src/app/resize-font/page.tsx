"use client";

import React from "react";
import styled from "styled-components";
import Device from "@/components/Device";
import LoginForm from "@/components/LoginForm";
import AccountCard from "@/components/AccountCard";
import useToggle from "@/hooks/use-toggle";
import Slider from "@/components/Slider";
import Button from "@/components/Button";

const RootWrapper = styled.div`
  display: grid;
  grid-template-rows:
    [title] 30cqh
    [resize-start] 2cqh
    [resize-font] 12cqh
    [resize-font-end] 2cqh
    [resize-font-slider] 5cqh;

  grid-template-columns:
    [fullbleed-start] 2cqw
    [main-start] auto
    [main-end] 1cqw
    [fullbleed-end];

  align-items: center;
  justify-items: center;
`;

const Title = styled.div`
  grid-area: title / fullbleed;
  text-align: center;
  & > h1 {
    font-size: 36px;
    line-height: 66px;
  }
`;

const ResizeWrapper = styled.div`
  grid-area: resize-font / main;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;

  width: 100%;
  height: fit-content;
  text-align: end;
  border-bottom: 3px solid var(--color-transparent);
  /* padding-top: 24px;
  padding-bottom: 24px; */
`;

function StartPage() {
  const [fonstSize, setFontSize] = React.useState(24);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-size", `${fonstSize}px`);
  }, [fonstSize]);

  return (
    <>
      <RootWrapper>
        <Title>
          <h1>시작하기 전 글씨 크기를 조절 해주세요</h1>
        </Title>
        <ResizeWrapper>
          이 글씨가 잘 보이게끔 크기를 조절 해주세요.
        </ResizeWrapper>
        <div></div>
        <div
          style={{
            gridArea: "resize-font-slider / main",
          }}
        >
          <Slider fontSize={fonstSize} setFontSize={setFontSize} />
        </div>
      </RootWrapper>
      <Button />
    </>
  );
}

export default StartPage;
