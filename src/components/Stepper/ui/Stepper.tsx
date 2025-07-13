'use client';

import { useAtom } from 'jotai';
import styled from 'styled-components';
import { stepperAtom } from '../store/atom';
import { CheckIcon, PickaxeIcon } from 'lucide-react';

export const CONFIRM_COLOR = 'oklch(0.404 0.2121 288.17775174927874)';

export function Stepper() {
  const [stepper, _] = useAtom(stepperAtom);

  return (
    <Container className="flex flex-col gap-2">
      {stepper.steps.map(step => {
        if (step.index === 3) {
          return (
            <ChildIndicator key={step.id} $done={step.done} $isProgress={true}>
              {stepper.currentStep === step.index ? (
                <PickaxeIcon size={16} color="var(--color-button)" style={{ marginRight: '4px' }} />
              ) : (
                <>
                  <Circle $done={step.done} />
                  {step.done && (
                    <CheckIconContainer>
                      <CheckIcon size={10} color={CONFIRM_COLOR} strokeWidth={4} />
                    </CheckIconContainer>
                  )}
                </>
              )}
              <span>{step.label}</span>
            </ChildIndicator>
          );
        }

        if (stepper.currentStep === step.index) {
          return (
            <Indicator key={step.id} $done={step.done} $isProgress={true}>
              <PickaxeIcon size={16} color="var(--color-button)" style={{ marginRight: '4px' }} />
              <span>{step.label}</span>
            </Indicator>
          );
        }

        return (
          <Indicator key={step.id} $done={step.done} $isProgress={false}>
            <IconContainer>
              <Circle $done={step.done} />
              {step.done && (
                <CheckIconContainer>
                  <CheckIcon size={10} color={CONFIRM_COLOR} strokeWidth={4} />
                </CheckIconContainer>
              )}
            </IconContainer>
            <span>{step.label}</span>
          </Indicator>
        );
      })}
    </Container>
  );
}

const Container = styled.ol`
  position: fixed;
  top: 50%;
  left: 1rem;

  display: flex;
  width: 20cqw;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  font-size: 0.75rem;
  user-select: none;
  transform: translateY(-50%);
`;

const Indicator = styled.li<{ $done: boolean; $isProgress: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${({ $done, $isProgress }) => {
    if ($done) return CONFIRM_COLOR;
    if ($isProgress) return 'var(--color-button)';
    return 'color-mix(in oklch, var(--color-button) 30%, transparent )';
  }};
`;

const ChildIndicator = styled.li<{ $done: boolean; $isProgress: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  color: ${({ $done, $isProgress }) => {
    if ($done) return CONFIRM_COLOR;
    if ($isProgress) return 'var(--color-button)';
    return 'color-mix(in oklch, var(--color-button) 30%, transparent )';
  }};
  transform: translateX(1rem);
`;

const Circle = styled.div<{ $done: boolean }>`
  width: ${({ $done }) => ($done ? '0.75rem' : '0.5rem')};
  height: ${({ $done }) => ($done ? '0.75rem' : '0.5rem')};
  background-color: ${({ $done }) =>
    $done ? CONFIRM_COLOR : 'color-mix(in oklch, var(--color-button) 30%, transparent )'};
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  transition: background-color 0.3s ease-in-out;
`;

const CheckIconContainer = styled.div`
  position: absolute;
  top: -4px;
  left: 4px;

  & > svg {
    position: absolute;
    top: 1px;
    left: 4px;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    aspect-ratio: 1;
    background-color: var(--color-background);
    z-index: 1;
  }
`;

const IconContainer = styled.div`
  position: relative;
`;
