'use client';

import { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface CardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardLayout({ children, ...props }: CardLayoutProps) {
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
    <RootContainer {...props} ref={containerRef}>
      {children}
    </RootContainer>
  );
}

export const HoveringTextField = memo(({ isHovering }: { isHovering: boolean }) => {
  return <HoveringText $isHovering={isHovering}>{''}</HoveringText>;
});

export function Card({ children }: { children: React.ReactNode }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <CardLayout>
      <CardContentContainer onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <CardContent>{children}</CardContent>
      </CardContentContainer>
      <SmallCard className="small-card" />
      <HoveringTextField isHovering={isHover} />
    </CardLayout>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CardContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

  z-index: 2;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(10px);
  padding: 2px;
  background: rgba(255, 255, 255, 0.15);
  transition:
    box-shadow 300ms ease,
    transform 100ms ease;

  &:hover {
    box-shadow: var(--long-shadow);
    outline: 4px solid color-mix(in oklch, oklch(63.93% 0.206 288.34) 15%, transparent);
  }

  @media screen and (max-width: 320px) {
    width: 120px;
  }
`;

const CardContent = styled.div`
  pointer-events: auto;
  display: grid;
  align-items: center;
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%);
  width: 100%;
  height: 100%;
  padding: 1rem;
  transition: background 350ms ease;
  touch-action: manipulation;
  animation: ${fadeIn} 500ms ease-in-out;
`;

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const SmallCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  z-index: 1;

  background-image: radial-gradient(
    300px circle at var(--mx, 0px) var(--my, 0px),
    var(--color-background),
    color-mix(in oklch, oklch(63.93% 0.206 288.34) 28%, transparent 30%)
  );

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const HoveringText = styled.p<{ $isHovering: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
  transition: opacity 300ms ease;

  background: linear-gradient(to bottom, color-mix(in oklch, oklch(63.93% 0.206 288.34), transparent 15%), transparent);

  color: #333;
  text-shadow: 0 0 5px white;

  padding: 0.25rem 1rem;
  margin-top: 0.35rem;
  border-radius: 1rem;
  width: max-content;
  font-size: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
`;
