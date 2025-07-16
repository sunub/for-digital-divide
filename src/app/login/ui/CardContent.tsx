'use client';

import { memo, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { useToast } from '@/provider/toast/hooks/useToast';
import { useHistory } from '@/shared/hooks/useHistory';

const CardContent = memo(
  ({
    hasDeviceId = true,
    setIsHovering,
    header,
    footer,
  }: {
    hasDeviceId?: boolean;
    setIsHovering: (isHovering: boolean) => void;
    header: ReactNode;
    footer: ReactNode;
  }) => {
    const { add } = useHistory();
    const showToast = useToast();

    return (
      <Wrapper
        id={`login-selection-pin-number`}
        className="card"
        tabIndex={0}
        $hasDeviceId={hasDeviceId}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (!hasDeviceId) {
            showToast('info', '적어도 한 번 로그인을 수행 후 핀번호를 등록 해야 핀번호를 사용할 수 있습니다.');
          } else {
            add(new URL('/login', window.location.href).toString());
          }
        }}
      >
        <LinkWrapper className="card" tabIndex={0} $hasDeviceId={hasDeviceId}>
          <Header>{header}</Header>
          <Footer>{footer}</Footer>
        </LinkWrapper>
      </Wrapper>
    );
  },
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  transition:
    box-shadow 300ms ease,
    transform 100ms ease;

  cursor: ${(props) => (props.$hasDeviceId ? 'pointer' : 'not-allowed')};

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

const Header = styled.h3`
  grid-area: card-header;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--size4);
  text-align: left;
  word-break: break-all;
  font-weight: 700;

  & > h3 {
    font-size: 1.375rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Footer = styled.span`
  grid-area: card-footer;
  font-size: 0.85rem;
  font-weight: 500;
  word-break: break-all;
  user-select: none;
  justify-self: center;
`;

const LinkWrapper = styled.div<{ $hasDeviceId?: boolean }>`
  pointer-events: ${(props) => (props.$hasDeviceId ? 'auto' : 'none')};
  display: grid;
  align-items: center;
  grid:
    [card-icon] 0.2fr
    [card-header] minmax(1ch, 1fr)
    [card-footer] 15px / 1fr;
  color: color-mix(
    in oklch,
    ${(props) => (props.$hasDeviceId ? 'oklch(63.93% 0.206 288.34)' : 'var(--foreground-destructive)')} 90%,
    oklch(0.7 0.1825 239.69) 20%
  );
  height: 100%;
  padding: 1rem;
  transition: background 350ms ease;
  cursor: pointer;
  touch-action: manipulation;
  animation: ${fadeIn} 500ms ease-in-out;
`;

export { CardContent };
