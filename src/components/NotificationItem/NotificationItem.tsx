'use client';

import styled from 'styled-components';
import {
  ForwardRefComponent,
  HTMLMotionProps,
  animate,
  motion,
  stagger,
  useAnimate,
} from 'framer-motion';
import React from 'react';
import useToggle from '@/hooks/use-toggle';
import { NotificationContext } from '@/context/NotificationContext';
import Icon from '../icons';

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
  const listRef = React.useRef<HTMLLIElement>(null);
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

  React.useEffect(() => {
    console.log('load');
  }, [action]);

  return (
    <List id={id} ref={scope} {...delegated}>
      <Wrapper>
        <Svg
          initial={{ x: '100%', opacity: 0 }}
          style={{ stroke: 'var(--color-background)' }}
          ref={bellRef}
        >
          <use href="/sprite.svg#bell" />
        </Svg>
        <CloseBtn
          layout="position"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 60,
          }}
          onClick={() => {
            animate(scope.current, {
              y: ['0%', '100%'],
              opacity: [1, 0],
            }).then(() => {
              action.remove(id);
            });
          }}
        >
          <Svg
            ref={closeRef}
            style={{ stroke: 'var(--color-text)', strokeWidth: '2px' }}
          >
            <use href="/sprite.svg#xCircle" />
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

const CloseBtn = styled(motion.button)`
  display: inline-flex;
  justify-content: flex-end;
  width: fit-content;
  color: var(--color-background);
`;

const Svg = styled(motion.svg)`
  width: 24px;
  height: 24px;
  transform: scale(1.5);
  fill: var(--color-background);
`;

const Content = styled(motion.div)``;

export default NotificationItem;
