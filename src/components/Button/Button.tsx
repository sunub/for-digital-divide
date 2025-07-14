import { motion, useAnimate } from 'motion/react';
import React from 'react';
import styled from 'styled-components';
import useToggle from '@/shared/hooks/use-toggle';
import { Status } from '@/store/pinnumber-store';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'confirm' | 'destructive';
  status?: Status;
}

const ButtonRefComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ status = 'idle', children, onClick, ...props }, ref) => {
    const [isClick, toggleClick] = useToggle(false);
    const [scope, animate] = useAnimate();
    const [textScope, textAnimate] = useAnimate();

    React.useEffect(() => {
      if (isClick) {
        const timer = setTimeout(() => toggleClick(), 100);
        return () => clearTimeout(timer);
      }
    }, [isClick, toggleClick]);

    React.useEffect(() => {
      if (status === 'pending') {
        const ballAnimation = animate(
          [
            [
              'span#upper-dot-pending',
              { y: -57, scale: 1.25 },
              {
                type: 'spring',
                duration: 2,
                damping: 10,
                stiffness: 100,
                at: 0.25,
              },
            ],
            [
              'span#lower-dot-pending',
              { y: -27, scale: 0.75 },
              {
                type: 'spring',
                duration: 2,
                damping: 10,
                stiffness: 100,
                at: 0.25,
              },
            ],
          ],
          {
            repeat: Infinity,
            repeatType: 'loop',
          },
        );
        textAnimate(textScope.current, {
          opacity: 0,
          scale: 0.4,
        });

        ballAnimation.play();
        return () => {
          ballAnimation.cancel();
          if (!textScope.current) return;
          textAnimate(textScope.current, {
            opacity: 1,
            scale: 1,
          });
        };
      }
    }, [status]);

    // 3) 클릭 시 토글 & onClick 처리
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        toggleClick();
        if (isClick) return;
        onClick?.(e);
      },
      [onClick, isClick, toggleClick],
    );

    return (
      <ButtonWrapper ref={ref} $isClick={isClick} $isPending={status === 'pending'} onClick={handleClick} {...props}>
        <div>
          <Edge $isClick={isClick} />
          <Shadow />
          <Front $isClick={isClick} ref={scope}>
            <Dot
              id="upper-dot-pending"
              $isPending={status === 'pending'}
              initial={{ y: 0, scale: 1 }}
              className="w-1 h-1 block bg-text rounded-50 aspect-[1/1] absolute"
            />
            <Dot
              id="lower-dot-pending"
              $isPending={status === 'pending'}
              initial={{ y: 0, scale: 1 }}
              className="w-1 h-1 block bg-slate-700 rounded-50 aspect-[1/1] absolute mix-blend-exclusion blur-2"
            />
            <motion.div ref={textScope}>{children}</motion.div>
          </Front>
        </div>
      </ButtonWrapper>
    );
  },
);

const Button = React.memo(ButtonRefComponent);
export default Button;

const Dot = styled(motion.span)<{ $isPending: boolean }>`
  visibility: ${(props) => (props.$isPending ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isPending ? 1 : 0)};

  transform-origin: center 2rem;
  transition: transform 100ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;

const Front = styled(motion.div)<{ $isClick: boolean }>`
  position: relative;
  display: inline-flex;
  padding: 0 1rem;
  height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 700;

  border-radius: 1rem;
  background-color: var(--input-default);
  border: 5px solid oklch(65.57% 0.19 288.17);

  user-select: none;
  will-change: transform;
  transform: translateY(-6px);
  transition: all 200ms cubic-bezier(0.3, 0.7, 0.4, 1);
  line-height: calc(16px + 24px);

  & > a {
    text-decoration: none;
  }
  & > svg {
    filter: brightness(110%);
    transform: scale(2);
  }
`;

export const Shadow = styled.span`
  pointer-events: none;
  user-select: none;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 3px;
  border: none;
  border-radius: 1rem;
  background-color: oklch(0% 0 14.09 / 25%);
  transition: transform 400ms cubic-bezier(0.3, 0.7, 0.4, 1);
  filter: blur(2px);
  transform: translateY(6px);
`;

export const Edge = styled.span<{ $isClick: boolean }>`
  pointer-events: none;
  user-select: none;
  display: block;
  position: absolute;
  left: 0;
  top: 3px;
  width: 100%;
  height: 100%;
  border: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background-image: var(--default-shadow);
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ButtonWrapper = styled.button.attrs((props: any) => ({
  'aria-pressed': props.$isClick ?? false,
}))<{ $isClick: boolean; $isPending: boolean }>`
  --default-shadow: linear-gradient(
    to left,
    oklch(65.57% 0.19 288.17) 0%,
    oklch(75.57% 0.19 288.17) 9%,
    oklch(75.57% 0.19 288.17) 91%,
    oklch(35.57% 0.19 288.17) 100%
  );
  --confirm-shadow: linear-gradient(
    to left,
    oklch(60.96% 0.114 146.9) 0%,
    oklch(73.59% 0.114 146.9) 9%,
    oklch(73.59% 0.114 146.9) 91%,
    oklch(60.96% 0.114 146.9) 100%
  );
  --destructive-shadow: linear-gradient(
    to left,
    oklch(68.88% 0.231 26.47) 0%,
    oklch(65.88% 0.231 26.47) 9%,
    oklch(65.88% 0.231 26.47) 91%,
    oklch(68.88% 0.231 26.47) 0%
  );

  --input-default: oklch(99.71% 0 66);
  --input-confirm: oklch(84.51% 0.162 147.29);
  --input-destructive: oklch(68.88% 0.231 26.47);

  cursor: pointer;
  background-color: transparent;
  border-radius: 0.75rem;
  border: none;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  outline-offset: 4px;
  pointer-events: ${(props) => (props.$isPending ? 'none' : 'auto')};
  height: fit-content;
  font-size: 1.5rem;
  transition: width 100ms cubic-bezier(0.3, 0.7, 0.4, 1);

  :focus:not(:focus-visible) {
    outline: none;
  }

  &:hover ${Front} {
    filter: brightness(110%);
    transform: translateY(-12px);
    transition: transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  &[aria-pressed='true'] ${Front} {
    transform: translateY(${(props) => (props.$isClick ? '-2px' : '-8px')});
    animation: backwards;
    transition: transform 100ms;
  }

  &[aria-pressed='true'] ${Shadow} {
    transform: translateY(2px);
    transition: transform 340ms;
  }

  :hover:not(:focus) ${Shadow} {
    transform: translateY(6px);
    transition: transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
`;
