'use client';

import React from 'react';
import styled from 'styled-components';
import {
  IdcardIcon,
  BankaccountIcon,
  SmartphoneIcon,
} from '@/components/icons';
import { TypeButton } from '@/components/TypeButton';
import Button from '@/components/Button/Default';

function Page() {
  return (
    <React.Fragment>
      <Header>
        <h1>금융 인증서 발급</h1>
      </Header>
      <Main>
        <p>금융 인증서를 발급하기 위해서는 아래의 3 가지를 필요로 합니다.</p>
        <CardWrapper>
          <Card>
            <CardTitle>
              <IdcardIcon />
              <b>신분증</b>
            </CardTitle>
            <p>본인 확인을 위해서 사용자 본인의 신분증을 필요로 합니다.</p>
          </Card>
          <Card>
            <CardTitle>
              <BankaccountIcon />
              <b>계좌</b>
            </CardTitle>
            <p>본인 확인을 위해서 사용자의 명의의 계좌가 필요로 합니다.</p>
          </Card>
          <Card>
            <CardTitle>
              <SmartphoneIcon />
              <b>스마트폰</b>
            </CardTitle>
            <p>본인 확인을 위해서 사용자의 명의의 핸드폰을 필요로 합니다.</p>
          </Card>
        </CardWrapper>
      </Main>
      <Footer>
        <Button>다음</Button>
      </Footer>
    </React.Fragment>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 30cqw;
  background: color-mix(
    in oklch,
    oklch(88.8% 0.0495 294.47 / 30%),
    oklch(97.31% 0 0)
  );
  padding: 48px 24px;
  border-radius: 24px;
  box-shadow:
    0px 2.2px 2.6px rgba(0, 0, 0, 0.02),
    0px 5.3px 6.3px rgba(0, 0, 0, 0.028),
    0px 9.9px 11.8px rgba(0, 0, 0, 0.035),
    0px 17.6px 21px rgba(0, 0, 0, 0.042),
    0px 33px 39.3px rgba(0, 0, 0, 0.05),
    0px 79px 94px rgba(0, 0, 0, 0.07);
  & > p {
    line-height: calc(1em + 0.4em);
  }
`;

const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 600;

  & > svg {
    transform: scale(2);
  }
`;

const Header = styled.div`
  grid-area: primary-header / main-start / primary-nav / main-end;
`;

const Main = styled.div`
  grid-area: main / main-start / footer / main-end;
  font-size: 16px;
`;

const Footer = styled.div`
  grid-area: footer / main-start / footer / main-end;
`;

export default Page;
