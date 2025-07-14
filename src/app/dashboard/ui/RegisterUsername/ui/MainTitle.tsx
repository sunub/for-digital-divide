'use client';

import { motion, useSpring } from 'motion/react';
import { memo, useEffect } from 'react';
import { Gugi } from 'next/font/google';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export const MainTitle = memo(() => {
  const width = useSpring('1px');

  useEffect(() => {
    width.set('100px');
  }, []);

  return (
    <div className="text-2xl" style={{ fontFamily: gugi.style.fontFamily }}>
      <div className="flex w-full justify-center items-center">
        <span>디지털</span>
        <motion.svg key={'divide-line'} style={{ width }} height={'10px'} viewBox={`0 0 100 10`}>
          <motion.rect style={{ width }} height={'2px'} />
        </motion.svg>
        <span>격차</span>
      </div>
      <span>좁히기</span>
    </div>
  );
});
