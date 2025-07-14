'use client';

import styled from 'styled-components';
import { motion, useSpring } from 'motion/react';
import { memo, useEffect, useState } from 'react';
import { Gugi } from 'next/font/google';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export const MainTitle = memo(() => {
  const [translateY, setTranslateY] = useState([useSpring('1.1rem'), useSpring('-1.2rem'), useSpring('-2.3rem')]);
  const [translateX, setTranslateX] = useState([useSpring('-2rem'), useSpring('0rem'), useSpring('2rem')]);
  const opacity = useSpring(1);

  useEffect(() => {
    setTranslateY((prev) => {
      prev.forEach((spring) => spring.set('0rem'));
      return prev;
    });
    setTranslateX((prev) => {
      prev.forEach((spring) => spring.set('0rem'));
      return prev;
    });
    opacity.set(1);
  }, []);

  return (
    <Container>
      <Title style={{ opacity }}>
        {'로그인'.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: 'inline-block',
              translateY: translateY[index],
              translateX: translateX[index],
            }}
          >
            {char}
          </motion.span>
        ))}
      </Title>
      <Description>이메일과 비밀번호를 사용해 로그인 해주세요</Description>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${gugi.style.fontFamily};
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
  color: oklch(63.93% 0.206 288.34);
`;

const Description = styled.p`
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%);
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: 400;
`;
