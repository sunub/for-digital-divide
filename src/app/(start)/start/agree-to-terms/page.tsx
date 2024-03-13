'use client';

import React from 'react';
import styled from 'styled-components';
import {
  IdcardIcon,
  BankaccountIcon,
  SmartphoneIcon,
} from '@/components/icons';
import Button from '@/components/Button/Default';
import Device from '@/components/Device';

function Page() {
  return (
    <Device
      headerContent={
        <React.Fragment>
          <h1>금융 인증서 발급</h1>
          <div>
            <p>
              금융 인증서를 발급하기 위해서는 아래의 3 가지를 필요로 합니다.
            </p>
          </div>
        </React.Fragment>
      }
      mainContent={
        <CardWrapper>
          <Card $order={'1'}>
            <CardTitle>
              <IdcardIcon />
              <h3>신분증</h3>
            </CardTitle>
            <p>사용자 본인의 신분증을 필요로 합니다.</p>
          </Card>
          <Card $order={'2'}>
            <CardTitle>
              <BankaccountIcon />
              <h3>계좌</h3>
            </CardTitle>
            <p>본인 확인을 위해서 사용자의 명의의 계좌가 필요로 합니다.</p>
          </Card>
          <Card $order={'3'}>
            <CardTitle>
              <SmartphoneIcon />
              <h3>스마트폰</h3>
            </CardTitle>
            <p>본인 확인을 위해서 사용자의 명의의 핸드폰을 필요로 합니다.</p>
          </Card>
        </CardWrapper>
      }
      footerContent={
        <React.Fragment>
          <Button>추가</Button>
          <Button>다음</Button>
        </React.Fragment>
      }
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: [main-header] 300px [main-content] 1fr [main-footer] 170px;
  grid-template-columns: [main-column] 1fr;

  padding-left: 32px;
  padding-right: 32px;
  height: 100%;
`;

const Header = styled.div`
  grid-area: main-header / main-column;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

const Main = styled.div`
  grid-area: main-content / main-column;
`;

const Footer = styled.div`
  grid-area: main-footer / main-column;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  gap: 24px;
  margin-right: 2rem;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 1.25rem;
  flex-wrap: wrap;
`;

const Card = styled.div<{ $order: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 1rem;
  word-break: keep-all;
  text-align: center;
  flex: 300px 1;

  max-height: 200px;
  padding: 48px 24px;
  border-radius: 24px;

  background: color-mix(
    in oklch,
    oklch(88.8% 0.0495 294.47 / 30%),
    oklch(97.31% 0 0)
  );
  box-shadow:
    0px 2.2px 2.6px rgba(0, 0, 0, 0.02),
    0px 5.3px 6.3px rgba(0, 0, 0, 0.028),
    0px 9.9px 11.8px rgba(0, 0, 0, 0.035),
    0px 17.6px 21px rgba(0, 0, 0, 0.042),
    0px 33px 39.3px rgba(0, 0, 0, 0.05),
    0px 79px 94px rgba(0, 0, 0, 0.07);

  & > p {
    line-height: calc(1em + 0.4em);
    padding: 1rem;
    text-align: left;
  }

  &::before {
    content: '${({ $order }) => $order}';
    width: 40px;
    height: 40px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    background-color: var(--color-text);
    color: var(--color-primary);
    mix-blend-mode: multiply;
    position: absolute;
    top: -10px;
    right: 5%;
  }
`;

const CardTitle = styled.div`
  display: grid;
  place-items: center;
  gap: 8px;
  font-weight: 600;
  padding: 1rem;

  & > svg {
    transform: scale(2.25);
  }
`;

export default Page;
