import { useEffect, useRef } from 'react';
import styled from 'styled-components';

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

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export { CardLayout };
