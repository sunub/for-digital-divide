'use client';

import styled from 'styled-components';
import { animate, motion, stagger, useAnimate } from 'framer-motion';
import React from 'react';
import useToggle from '@/hooks/use-toggle';
import { NotificationContext } from '@/context/NotificationContext';

interface NotificationProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  message: string;
  type: 'default' | 'error' | 'success';
}

function NotificationItem({
  id,
  type,
  message,
  ...delegated
}: NotificationProps) {
  const bellRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [scope, animate] = useAnimate();
  const { action } = React.useContext(NotificationContext);

  React.useEffect(() => {
    if (!bellRef.current || !closeRef.current || !contentRef.current) return;

    animate(
      bellRef.current,
      {
        rotate: [-40, 40, -40, 40, 0],
        scale: [2, 1.5],
        x: ['100%', '0%'],
        opacity: [0, 1],
      },
      { duration: 0.75, repeatType: 'reverse', delay: stagger(0.2) },
    );
    animate(
      'div#notification-content',
      {
        y: ['100%', '0%'],
        opacity: [0, 1],
      },
      { duration: 0.25, repeatType: 'reverse', delay: stagger(0.2) },
    );
  }, []);

  return (
    <List ref={scope} {...delegated}>
      <Wrapper id={id}>
        <Svg initial={{ x: '100%', opacity: 0 }} ref={bellRef}>
          <use href="sprite.svg#bell-icon" />
        </Svg>
        <CloseBtn onClick={() => action.remove(id)}>
          <Svg ref={closeRef}>
            <use href="sprite.svg#x-circle" />
          </Svg>
        </CloseBtn>
      </Wrapper>
      <Content
        initial={{ y: '100%', opacity: 0 }}
        id="notification-content"
        ref={contentRef}
      >
        <p>{message}</p>
      </Content>
    </List>
  );
}

const List = styled.li`
  background-color: oklch(31.57% 0.024 288.17775174927874);
  color: var(--color-background);

  border-radius: 8px;
  padding: 1rem;

  max-width: 400px;
  width: 100%;

  animation: slideUp 0.3s ease forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 0.5rem;
`;

const CloseBtn = styled.button`
  display: inline-flex;
  justify-content: flex-end;
  width: fit-content;
  color: var(--color-background);
`;

const Svg = styled(motion.svg)`
  width: 24px;
  height: 24px;
  transform: scale(1.5);
  fill: oklch(90.61% 0.17467881453440234 147.30473712852722);
`;

const Content = styled(motion.div)``;

export default NotificationItem;
