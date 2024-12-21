'use client';

import React from 'react';
import SmallPhone from '@/components/SmallPhone';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowIcon } from '@/icons';
import useToggle from '@/hooks/use-toggle';
import Loading from '@/app/login/loading';

export default function Home() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <React.Fragment>
      {!isOpen && (
        <Title>
          <h1>핸드폰을 클릭해주세요!</h1>
          <ArrowIcon />
        </Title>
      )}
      <SmallPhone isOpen={isOpen} toggleOpen={toggleOpen} />
    </React.Fragment>
  );
}

const Title = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 25cqh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  & > h1 {
    font-weight: 700;
    font-size: 2rem;
  }

  & > svg {
    transform: scale(2) rotate(-90deg);
  }
`;
