"use client";

import React from "react";
import styled from "styled-components";
import Device from "@/components/Device";
import LoginForm from "@/components/LoginForm";
import AccountCard from "@/components/AccountCard";
import useToggle from "@/hooks/use-toggle";
import Slider from "@/components/Slider";

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
          <h1>시작하기 전</h1>
          <h1>글씨 크기를</h1>
          <h1>조절 해주세요</h1>
        </Title>
        <ResizeWrapper>잘 보이시나요?</ResizeWrapper>
        <Slider fontSize={fonstSize} setFontSize={setFontSize} />
      </RootWrapper>
    </>
  );
}

export default StartPage;
