"use client";

import React from "react";
import styled from "styled-components";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import { moveToLoginPage } from "@/lib/revalidate";

function StartPage() {
  const [fonstSize, setFontSize] = React.useState(16);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-size", `${fonstSize}px`);
  }, [fonstSize]);

  return (
    <section>
      <RootWrapper>
        <Title>
          <h1>시작하기 전 글씨 크기를 조절 해주세요</h1>
        </Title>
        <ResizeFontDisplay>{`${fonstSize}px`}</ResizeFontDisplay>
        <ResizeWrapper>
          이 글씨가 잘 보이게끔 크기를 조절 해주세요.
        </ResizeWrapper>
        <div
          style={{
            gridArea: "resize-font-slider / main",
          }}
        >
          <Slider fontSize={fonstSize} setFontSize={setFontSize} />
        </div>
      </RootWrapper>
      <ConfirmWrapper>
        <span>글씨 크기 조절이 끝날 경우 아래의 확인을 눌러주세요!</span>
        <svg
          width={56}
          height={56}
          role="img"
          aria-label="arrow icon"
          style={{ transform: "rotate(-90deg)" }}
        >
          <use href="/sprite.svg#arrow" />
        </svg>
        <Button text="확인" onClick={moveToLoginPage} />
      </ConfirmWrapper>
    </section>
  );
}

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

const ResizeFontDisplay = styled.span`
  display: inline-block;
  width: 100cqw;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 48px;
`;

const ConfirmWrapper = styled.div`
  width: 100cqw;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  & > span {
    font-size: 32px;
    line-height: 24px;
  }
`;

export default StartPage;
