'use client';

import styled from 'styled-components';
import { motion } from 'motion/react';

export const AnimatePresenceRootContainer = styled(motion.div)`
  grid-area: dashboard-content / 1;
  width: 100%;
  height: calc(100cqh - 68px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
