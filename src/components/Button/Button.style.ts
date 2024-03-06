import styled from 'styled-components';

export const RootContainer = styled.div`
  position: relative;
`;

export const Front = styled.div<{ $isClick: boolean }>`
  display: inline-flex;
  height: 70px;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  text-align: center;
  font-size: 24px;
  font-weight: 700;

  border-radius: 25px;
  background-color: ${(props) =>
    props.$isClick ? 'var(--color-confirm)' : 'var(--color-background)'};
  border: 5px solid
    ${(props) =>
      props.$isClick ? 'var(--color-confirm)' : 'var(--color-text)'};

  user-select: none;
  will-change: transform;
  transform: translateY(-6px);
  transition: all 200ms cubic-bezier(0.3, 0.7, 0.4, 1);
  line-height: calc(16px + 24px);

  & > a {
    padding: 10px 25px;
    text-decoration: none;
  }

  & > svg {
    filter: brightness(110%);
    transform: scale(2);
  }
`;

export const ConfirmFont = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-confirm);
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
  border-radius: 20px;
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
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
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
  border-radius: 20px;
  border: none;
  outline-offset: 4px;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  :focus:not(:focus-visible) {
    outline: none;
  }

  &:hover ${Front} {
    filter: brightness(110%);
    transform: translateY(-18px);
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
