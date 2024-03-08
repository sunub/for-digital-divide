import useToggle from '@/hooks/use-toggle';
import styled from 'styled-components';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, children, ...props }, ref) => {
    const [isClick, toggleClick] = useToggle(false);
    const Compo = asChild ? Slot : Btn;

    return (
      <Btn $isClick={isClick} ref={ref} onClick={toggleClick} {...props}>
        <div>
          <Edge $isClick={isClick} />
          <Shadow />
          <Front $isClick={isClick}>{children}</Front>
        </div>
      </Btn>
    );
  },
);

export const Front = styled.div<{ $isClick: boolean }>`
  display: inline-flex;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-weight: 700;

  border-radius: 1rem;
  background-color: ${(props) =>
    props.$isClick ? 'var(--color-confirm)' : 'var(--color-background)'};
  border: 5px solid
    ${(props) =>
      props.$isClick ? 'var(--color-confirm)' : 'var(--color-text)'};
  color: ${(props) =>
    props.$isClick ? 'oklch(45.88% 0.184 142.89)' : 'var(--color-text)'};

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
  background-color: oklch(0% 0 14.09 / 35%);
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
  background-image: ${(props) =>
    props.$isClick ? 'var(--confirm-shadow)' : 'var(--default-shadow)'};
`;

export const Btn = styled.button.attrs((props: any) => ({
  'aria-pressed': props.$isClick ?? false,
}))<{ $isClick: boolean }>`
  --default-shadow: linear-gradient(
    to left,
    oklch(21.25% 0.005 17.53) 0%,
    oklch(50.2% 0.013 17.59) 9%,
    oklch(50.2% 0.013 17.59) 91%,
    oklch(21.25% 0.005 17.53) 100%
  );
  --confirm-shadow: linear-gradient(
    to left,
    oklch(60.96% 0.114 146.9) 0%,
    oklch(73.59% 0.114 146.9) 9%,
    oklch(73.59% 0.114 146.9) 91%,
    oklch(60.96% 0.114 146.9) 100%
  );

  background-color: transparent;
  border-radius: 0.75rem;
  border: none;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  outline-offset: 4px;
  width: fit-content;
  height: fit-content;
  font-size: 2rem;

  :focus:not(:focus-visible) {
    outline: none;
  }

  &:hover ${Front} {
    filter: brightness(110%);
    transform: translateY(-18px);
    transition: transform 200ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  &[aria-pressed='true'] ${Front} {
    transform: translateY(
      ${(props: any) => (props.$isClick ? '-2px' : '-8px')}
    );
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

export default Button;
