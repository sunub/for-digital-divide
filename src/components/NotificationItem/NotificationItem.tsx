'use client';

import styled from 'styled-components';
import { motion, stagger, useAnimate } from 'framer-motion';
import React from 'react';
import { useNotificationStore } from '@/context/NotificationContext';

interface NotificationProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  message: string;
  type: 'default' | 'error' | 'success';
}

function NotificationItem({
  id,
  type = 'default',
  message,
  ...delegated
}: NotificationProps) {
  const bellRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const listRef = React.useRef<HTMLLIElement>(null);
  const contentRef = React.useRef(null);
  const [scope, animate] = useAnimate();
  const { remove } = useNotificationStore((state) => state);

  const svglink = {
    success: '/sprite.svg#bell',
    default: '/sprite.svg#bell',
    error: '/sprite.svg#bell',
  };

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
    <List id={id} ref={scope} $type={type} {...delegated}>
      <Wrapper>
        <Svg
          $type={type}
          initial={{ x: '100%', opacity: 0 }}
          style={{ stroke: 'var(--color-background)' }}
          ref={bellRef}
        >
          <use href={svglink[type]} />
        </Svg>
        <CloseBtn
          layout="position"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 60,
          }}
          onClick={() => remove(id)}
        >
          <Svg $type={type} ref={closeRef} style={{ strokeWidth: '2px' }}>
            <use href="/sprite.svg#xCircle" />
          </Svg>
        </CloseBtn>
      </Wrapper>
      <Content
        initial={{ y: '100%', opacity: 0 }}
        id="notification-content"
        ref={contentRef}
      >
        {message
          ? message.split('\n').map((msg) => <p key={msg}>{msg}</p>)
          : null}
      </Content>
    </List>
  );
}

const getNotificationColor = (type: 'error' | 'default' | 'success') => {
  let bg = '';
  switch (type) {
    case 'error':
      bg = 'oklch(59.12% 0.224 18)';
      break;
    case 'success':
      bg = 'oklch(61.18% 0.174 149.29)';

      break;
    default:
      bg = 'oklch(31.57% 0.024 288.17775174927874)';
      break;
  }
  return bg;
};

const List = styled.li<{ $type: 'error' | 'default' | 'success' }>`
  background-color: ${({ $type }) => getNotificationColor($type)};
  color: var(--color-background);
  font-size: 0.75rem;

  border-radius: 8px;
  padding: 1rem;

  width: fit-content;
  animation: slideUp 0.3s ease forwards;

  margin-left: auto;
  margin-right: auto;

  @keyframes slideUp {
    from {
      transform: translateY(-100%);
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
  justify-content: center;
  width: fit-content;
  color: var(--color-background);
`;

const Svg = styled(motion.svg)<{ $type: 'error' | 'default' | 'success' }>`
  width: 24px;
  height: 24px;
  transform: scale(1.5);
  fill: var(--color-background);
  stroke: ${({ $type }) => getNotificationColor($type)};
`;

const Content = styled(motion.div)``;

export default NotificationItem;
