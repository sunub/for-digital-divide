'use client';

import styled from 'styled-components';
import { Gugi } from 'next/font/google';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FlexCenterDiv } from '@/shared/style/component/div';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export const LoginContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

export const LoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  font-family: ${gugi.style.fontFamily};
  color: oklch(63.93% 0.206 288.34);
`;

export const Description = styled.p`
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%);
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

export const SignupContainer = styled(FlexCenterDiv)`
  flex-direction: column;
  gap: 0.5rem;
`;

export const SignupInformation = styled.div`
  font-size: 0.8rem;
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%);
  max-width: 300px;
`;

export const SignupLink = styled(Link)`
  position: relative;
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%);
  & > span {
    transform: translate3d(0, -4px, 0);
    display: inline-block;
    transition: transform 0.2s 0.05s cubic-bezier(0.2, 0.57, 0.67, 1.53);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    background: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 50%);
    top: 100%;
    height: 1px;
    left: 0;
    pointer-events: none;

    height: 5px;
    border-radius: 20px;
    transform: scale3d(1, 1, 1);
    transition:
      transform 0.2s,
      opacity 0.2s cubic-bezier(0.2, 0.57, 0.67, 1.53);
  }

  &:hover::before {
    transform: scale3d(1.2, 0.1, 1);
    transition: transform 0.4s cubic-bezier(0.8, 0, 0.1, 1);
    opacity: 1;
  }

  &:hover {
    span {
      transform: translate3d(0, 0, 0);
      transition: transform 400ms cubic-bezier(0.8, 0, 0.1, 1);
      transition-delay: 0s;
    }
  }
`;
