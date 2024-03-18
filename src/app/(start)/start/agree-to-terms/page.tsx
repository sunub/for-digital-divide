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
import useToggle from '@/hooks/use-toggle';
import AgreeForm from '@/components/AgreeForm';

function Explanation() {
  return (
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
  );
}

function Page() {
  const [nextPage, toggleNextPage] = useToggle(false);

  return (
    <Device
      headerContent={
        <React.Fragment>
          <h1 className="text-4xl">
            {nextPage ? '약관 동의' : '금융 인증서 발급'}
          </h1>
          <div>
            <p>
              {nextPage
                ? '인정서 발급을 위한 약관 동의가 필요합니다.'
                : '금융 인증서를 발급하기 위해서는 아래의 3 가지를 필요로 합니다.'}
            </p>
          </div>
        </React.Fragment>
      }
      mainContent={nextPage ? <AgreeForm /> : <Explanation />}
      footerContent={
        !nextPage && (
          <Button
            onClick={() => {
              document
                .getElementById('device-content__header')
                ?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              toggleNextPage();
            }}
          >
            다음
          </Button>
        )
      }
    />
  );
}

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
