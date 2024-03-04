"use client";

import Button from "@/components/Button";
import Spacer from "@/constants/Spacer";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

function InitPage() {
  return (
    <React.Fragment>
      <DevsiteContentSiteContent>
        <ContentWrapper>
          <h1>안녕하세요!</h1>
          <Spacer size={32} axis="vertical" />
          <p>
            이 홈페이지는 단순한 <b>데모(가짜)</b> 페이지 입니다.
          </p>
          <Spacer size={8} axis="vertical" />
          <p>모바일 은행 어플 사용에 어려움이 있는 분들을</p>
          <p>돕기 위한 목적으로 제작된 페이지 입니다.</p>
          <Spacer size={8} axis="vertical" />
          <p>홈페이지에서 작성하는 어떠한 데이터도</p>
          <p>저장되지 않으니 걱정하지 않으셔도 됩니다!</p>
          <p>
            시작하시려면 아래의 <b>시작하기</b>를 눌러주세요!
          </p>
          <Spacer size={32} axis="vertical" />
          <Link href={"/start"}>
            <Button text="시작하기" />
          </Link>
        </ContentWrapper>
      </DevsiteContentSiteContent>
      <BackDrop />
    </React.Fragment>
  );
}

const DevsiteContentSiteContent = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const ContentWrapper = styled.div`
  background: oklch(96.88% 0.015 294.47);
  padding: 5cqh 6cqh;
  text-align: start;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 36px;

  & > h1 {
    font-size: 2rem;
  }
`;

const BackDrop = styled.div`
  position: absolute;
  background: oklch(3.53% 0 73 / 50%);
  backdrop-filter: blur(20px);
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100cqw;
  height: 100cqh;
`;

export default InitPage;
