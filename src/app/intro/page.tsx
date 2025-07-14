'use client';

import React from 'react';
import styled from 'styled-components';
import useToggle from '@/shared/hooks/use-toggle';
import { ArrowIcon } from '@/icons';
import { SmallPhone } from './ui/SmallPhone';
import { FlexCenterDiv } from '@/shared/style/component/div';

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <Container>
      {!isOpen && (
        <Title>
          <h1>핸드폰을 클릭해주세요!</h1>
          <ArrowIcon />
        </Title>
      )}
      <PhoneContainer>
        <SmallPhone isOpen={isOpen} toggleOpen={toggleOpen} />
      </PhoneContainer>
    </Container>
  );
}

const Container = styled(FlexCenterDiv)`
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;

  background-color: var(--color-background);
  z-index: 3;
`;

const PhoneContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  font-family: 'Gugi', sans-serif;

  & > h1 {
    font-weight: 700;
    font-size: 2rem;
  }

  & > svg {
    transform: scale(1.25) rotate(-90deg);
  }
`;
