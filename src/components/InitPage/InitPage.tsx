'use client';

import React from 'react';
import styled from 'styled-components';
import Spacer from '../Spacer';
import { motion } from 'framer-motion';

const TitleWrapper = styled(motion.div)`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 6rem;
`;

const Digital = styled(motion.span)`
  font-weight: 900;
  font-size: 24px;
`;

const Distance = styled(motion.span)`
  font-weight: 900;
  font-size: 24px;
`;

const NarrowingDown = styled(motion.span)`
  font-weight: 900;
  font-size: 24px;
`;

function InitPage() {
  return (
    <TitleWrapper id="devsite__init-page-title">
      <Digital>디지털</Digital>
      <Distance>격차</Distance>
      <NarrowingDown>좁히기</NarrowingDown>
    </TitleWrapper>
  );
}

export default InitPage;
