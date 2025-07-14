import { styled } from 'styled-components';
import { motion } from 'motion/react';

export const GestureCircle = styled.circle`
  fill: none;
  stroke: none;
  transition: all 500ms ease;
`;

export const Gesture = styled(motion.button)`
  display: grid;
  place-items: center;
  width: fit-content;
`;
