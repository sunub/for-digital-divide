'use client';

import Button from '@/components/Button/Default';
import { TypeButton } from '@/components/TypeButton';
import Spacer from '@/constants/Spacer';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

function InitPage() {
  return (
    <React.Fragment>
      <DevsiteContentSiteContent>
        <ContentWrapper>
          <AlignCenter style={{ paddingTop: '32px' }}>
            <h1>안녕하세요!</h1>
          </AlignCenter>
          <TextContainer>
            <p>
              이 홈페이지는 단순한 <b>데모(가짜)</b> 페이지 입니다.
            </p>
            <p>
              시작하시려면 아래의 <b>시작하기</b>를 눌러주세요!
            </p>
          </TextContainer>
          <Spacer size={32} axis="vertical" />
          <Link href={'/intro'}>
            <Button>시작하기</Button>
          </Link>
          <Spacer size={32} axis="vertical" />
        </ContentWrapper>
      </DevsiteContentSiteContent>
      <BackDrop />
    </React.Fragment>
  );
}

const AlignCenter = styled.div`
  display: grid;
  place-items: center;
`;

const DevsiteContentSiteContent = styled.div`
  display: grid;
  place-items: center;
  max-width: 800px;
  height: 100cqh;
  padding: 5cqh 6cqh;
`;

const TextContainer = styled.div`
  display: grid;
  place-items: center;
  overflow-y: scroll;
  padding: 1rem 1rem;
`;

const ContentWrapper = styled.div`
  background: oklch(96.88% 0.015 294.47);
  text-align: start;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 36px;
`;

const BackDrop = styled.div`
  position: absolute;
  background: oklch(3.53% 0 73 / 50%);
  backdrop-filter: blur(20px);
  z-index: -1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export default InitPage;
