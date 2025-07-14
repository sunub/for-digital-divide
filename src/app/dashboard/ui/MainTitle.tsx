'use client';

import styled from 'styled-components';
import { motion, useSpring } from 'motion/react';
import { memo, useEffect } from 'react';
import { Gugi } from 'next/font/google';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { fullSize } from '@/shared/style/css/size';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export const MainTitle = memo(() => {
  const width = useSpring('1px');

  useEffect(() => {
    width.set('100px');
  }, []);

  return (
    <RootContainer style={{ fontFamily: gugi.style.fontFamily }}>
      <TitleContainer>
        <span>디지털</span>
        <Svg key={'divide-line'} style={{ width }} height={'10px'} viewBox={`0 0 100 10`}>
          <Rect style={{ width }} height={'2px'} />
        </Svg>
        <span>격차</span>
      </TitleContainer>
      <span>좁히기</span>
    </RootContainer>
  );
});

const RootContainer = styled(FlexCenterDiv)`
  width: 100%;
  flex-direction: column;
  color: var(--color-accent);
  font-size: 2rem;
  font-weight: 600;

  padding-top: 2.5rem;
  padding-bottom: 2rem;
`;

const TitleContainer = styled(FlexCenterDiv)`
  ${fullSize}
`;

const Svg = styled(motion.svg)`
  color: currentColor;
  stroke: currentColor;
  fill: currentColor;
`;

const Rect = styled(motion.rect)``;
