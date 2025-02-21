import { styled } from 'styled-components';
import { motion } from 'motion/react';

export const GestureCircle = styled.circle`
  fill: none;
  stroke: none;
  transition: all 500ms ease;

  &:hover {
  }
`;

export const Gesture = styled(motion.button)`
  display: grid;
  place-items: center;
  width: fit-content;

  &:hover ${GestureCircle} {
    fill: color-mix(in oklch, oklch(71.22% 0 0 / 0.3), transparent);
  }
`;
