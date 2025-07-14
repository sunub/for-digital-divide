'use client';
import styled, { keyframes } from 'styled-components';
import { memo, useEffect, useRef } from 'react';

const CardContent = memo(() => {
  return (
    <Wrapper>
      <LinkWrapper id={`login-selection-pin-number`} className="card" tabIndex={0}></LinkWrapper>
    </Wrapper>
  );
});

export function CardSkeleton({ skeletonRef }: { skeletonRef: React.RefObject<HTMLDivElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const smallCard = el.querySelector<HTMLDivElement>('.small-card');
    if (!smallCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      smallCard.style.setProperty('--mx', `${x}px`);
      smallCard.style.setProperty('--my', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <RootContainer ref={containerRef}>
      <PendingIndicator ref={skeletonRef} />
      <CardContent />
      <SmallCard />
    </RootContainer>
  );
}

const RootContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Wrapper = styled.div<{ $hasDeviceId?: boolean }>`
  position: relative;
  width: 100px;
  height: 116px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  z-index: 2;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  padding: 2px;
  background: rgba(255, 255, 255, 0.15);
  transition: box-shadow 300ms ease, transform 100ms ease;

  &:hover {
    box-shadow: var(--long-shadow);
    outline: 4px solid color-mix(in oklch, oklch(63.93% 0.206 288.34) 15%, transparent);
  }
  &:active {
    transform: scale(0.9);
  }
  @media screen and (max-width: 320px) {
    width: 120px;
  }
`;

const LinkWrapper = styled.div`
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%);
  height: 100%;
  padding: 1rem;
  transition: background 350ms ease;
  touch-action: manipulation;
`;

const SmallCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 116px;
  border-radius: 1rem;
  z-index: 1;

  background-image: radial-gradient(
    300px circle at var(--mx, 0px) var(--my, 0px),
    var(--color-background),
    color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%)
  );

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const radialPending = keyframes`
  from {
    border-radius: 1rem;
    background-size: 0% 0%;
    opacity: 0.5;
  }
  to {
    background-size: 200% 200%;
    opacity: 0;
  }
`;

const PendingIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 116px;
  border-radius: 1rem;
  background: radial-gradient(closest-side, oklch(63.93% 0.206 288.34 / 90%), transparent) no-repeat center;
  animation: ${radialPending} 1.5s ease-out infinite;
  z-index: 3;
`;
