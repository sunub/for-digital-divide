'use client';

import styled, { keyframes } from 'styled-components';
import { ArrowDownIcon } from 'lucide-react';

export function DrawerIndicator() {
  return (
    <Container id="login-pin__drawer-indicator">
      <p>클릭!!</p>
      <SvgContainer id="login-pin__drawer-indicator-icon">
        <ArrowDownIcon size={24} strokeWidth={2.5} />
      </SvgContainer>
    </Container>
  );
}

const upAndDown = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(0.5rem) rotate(0deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40cqh;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: oklch(63.93% 0.206 288.34);
  pointer-events: none;
  user-select: none;
`;

const SvgContainer = styled.div`
  animation: ${upAndDown} 1.5s ease-in-out infinite;
`;
