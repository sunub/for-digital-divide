'use client';

import React from 'react';
import SmallPhone from '@/components/SmallPhone';
import { NotificationContext } from '@/context/NotificationContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowIcon } from '@/icons';

export default function Home() {
  const { action } = React.useContext(NotificationContext);

  React.useEffect(() => {
    const id = crypto.randomUUID();
    action.add({
      id,
      message:
        '안녕하세요. 저는 안내 메세지에요. 설명이 필요한 내용은 여기에 표시됩니다 :)',
      type: 'default',
    });
  }, []);

  return (
    <React.Fragment>
      <Title>
        <h1>핸드폰을 클릭해주세요!</h1>
        <ArrowIcon />
      </Title>

      <SmallPhone />
    </React.Fragment>
  );
}

const Title = styled(motion.div)`
  position: absolute;
  top: 25cqh;
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
