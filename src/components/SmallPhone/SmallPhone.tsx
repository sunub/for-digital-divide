'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/login/loading';

interface SmallPhoneProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

function layered_shadow(layer: number, gapX: number, gapY: number): string {
  let values = '';

  for (let i = 0; i < layer; i++) {
    let colorIndex = 83 - i * 1.45;
    const color = `oklch(${colorIndex}% 0.206 288.34 / 60%)`;
    let value = `${(i * gapX).toFixed(1)}rem ${(i * gapY).toFixed(
      1,
    )}rem ${color}`;
    values += `${value} ,`;
  }

  return values.slice(0, values.length - 1);
}

function SmallPhone(props: SmallPhoneProps) {
  const { isOpen, toggleOpen } = props;
  const router = useRouter();

  return (
    <Phone
      disabled={isOpen}
      $isOpen={isOpen}
      onClick={() => {
        toggleOpen();
        router.prefetch('/username');
      }}
      onAnimationComplete={() => router.push('/username')}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        closed: { rotateX: 66, rotateZ: 45, scale: 0.15 },
        open: { rotateX: 0, rotateZ: 0, scale: 1 },
      }}
    >
      <Icon
        viewBox="0 0 496 978"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        $isOpen={isOpen}
        $layerColors={isOpen ? '' : layered_shadow(13, 0.3, 0.3)}
      >
        <path
          d="M0 49C0 21.938 21.938 0 49 0H447C474.062 0 496 21.938 496 49V929C496 956.062 474.062 978 447 978H49C21.9381 978 0 956.062 0 929V49Z"
          fill="#B6A3FF"
        />
        <Screen
          d="M6 50C6 25.6995 25.6995 6 50 6H446C470.301 6 490 25.6995 490 50V928C490 952.301 470.301 972 446 972H50C25.6995 972 6 952.301 6 928V50Z"
          fill="#F5F3FE"
          $open={isOpen}
        />
        <rect x="198" y="21" width="100" height="20" rx="10" fill="#DDD4FF" />
      </Icon>
    </Phone>
  );
}

const Phone = styled(motion.button)<{ $isOpen: boolean }>`
  background: transparent;
  display: grid;
  cursor: ${(props) => (props.$isOpen ? 'default' : 'pointer')};
  outline-offset: 4px;
  :focus:not(:focus-visible) {
    outline: none;
  }

  &:hover::before {
    background-position: 100% 100%;
    transform: scale(1.08, 1.03);
  }

  @keyframes blink {
    0% {
      opacity: 0;
      transform: scale3d(0, 0, 0);
    }

    85% {
      opacity: 1;
      transform: scale3d(1, 1.2, 2);
    }

    100% {
      opacity: 0;
      transform: scale3d(0, 0, 0);
    }
  }
`;

const Icon = styled.svg<{ $layerColors: string; $isOpen: boolean }>`
  width: 45cqw;
  height: 75cqh;
  aspect-ratio: 1 / 2;

  border-radius: ${(props) => (props.$isOpen ? '0px' : '57px')};
  box-shadow:
    inset -0.5rem -0.3rem 0.1rem 0.2rem oklch(81.43% 0 0),
    inset -0.7rem -0.7rem 0.1rem 0.2rem oklch(81.43% 0 0),
    inset -1rem -1rem 0 0.4rem oklch(81.43% 0 0),
    ${(props) => props.$layerColors},
    6rem 7rem 6rem 10px oklch(32.3% 0.002 247.36),
    10rem 10rem 5rem 20px oklch(32.3% 0.002 247.36 / 0.2);
  transition: box-shadow 200ms ease-in-out;
`;

const Screen = styled.path<{ $open: boolean }>`
  filter: ${(props) => (props.$open ? 'none' : 'brightness(0.8)')};
  animation: ${(props) => (props.$open ? '' : 'screen_brighter')} 2s infinite
    ease;

  @keyframes screen_brighter {
    0% {
      fill: oklch(37.76% 0.012 264.08 / 0.4);
      filter: brightness(1.5);
    }

    85% {
      fill: oklch(95% 0 188);
      filter: brightness(1.05);
    }

    100% {
      fill: oklch(37.76% 0.012 264.08 / 0.4);
      filter: brightness(1.5);
    }
  }
`;

export default SmallPhone;
