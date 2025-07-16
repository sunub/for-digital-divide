import Link from 'next/link';
import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface CardLayoutProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: ReactNode;
  hasDeviceId?: boolean;
}

function CardLayout({ children, href, hasDeviceId = true, ...props }: CardLayoutProps) {
  const linkContainerRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hasDeviceId ? linkContainerRef.current : containerRef.current;
    if (!el) return;

    const smallCard = el.querySelector<HTMLDivElement>('.small-card');
    if (!smallCard) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { left, top } = el.getBoundingClientRect();
      const x = mouseEvent.clientX - left;
      const y = mouseEvent.clientY - top;
      smallCard.style.setProperty('--mx', `${x}px`);
      smallCard.style.setProperty('--my', `${y}px`);
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!hasDeviceId) {
    return (
      <RootContainer ref={containerRef} className="card-link-wrapper" tabIndex={0}>
        {children}
      </RootContainer>
    );
  }

  return (
    <LinkRootContainer
      {...props}
      ref={linkContainerRef}
      href={href}
      prefetch={true}
      className="card-link-wrapper"
      tabIndex={0}
    >
      {children}
    </LinkRootContainer>
  );
}

const LinkRootContainer = styled(Link)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const RootContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export { CardLayout };
