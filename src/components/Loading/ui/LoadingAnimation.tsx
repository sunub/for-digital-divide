'use client';

import { motion } from 'motion/react';
import styled from 'styled-components';

function LoginAnimation() {
  const circles = [
    {
      cx: 70,
      cy: '50%',
      r: '1rem',
      fill: '#8F76FF',
    },
    {
      cx: 170,
      cy: '50%',
      r: '1rem',
      fill: '#FF7E76',
    },
    { cx: 270, cy: '50%', r: '1rem', fill: '#8F76FF' },
    {
      cx: 370,
      cy: '50%',
      r: '1rem',
      fill: '#98DF9F',
    },
    {
      cx: 470,
      cy: '50%',
      r: '1rem',
      fill: '#8F76FF',
    },
  ];

  return (
    <SVG width="556" height="120" viewBox="0 0 556 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {circles.map((circle, index) => {
        const startY = 10 - 7.5;
        const endY = 7.5 + 13;

        return (
          <motion.circle
            key={index}
            cx={`calc(${circle.cx}px + (${circle.r} / 2))`}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill}
            initial={{ transform: `translateY(${startY}px)` }}
            animate={{ transform: `translateY(${endY}px)` }}
            transition={{
              delay: 200 * Math.sin(0.001 * index),
              duration: 10,
              type: 'spring',
              damping: 9,
              stiffness: 120,
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 0.001,
            }}
          />
        );
      })}
    </SVG>
  );
}

const SVG = styled(motion.svg)`
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
`;

export default LoginAnimation;
