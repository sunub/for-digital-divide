'use client';

import { useAtom } from 'jotai';
import styled, { css } from 'styled-components';
import { stepperAtom } from '../store/atom';
import { CheckIcon } from 'lucide-react';
import { Loading } from '@/components/Loading';
import { usePathname } from 'next/navigation';
import { useStepper } from '../hooks/useStepper';

export const CONFIRM_COLOR = 'oklch(0.404 0.2121 288.17775174927874)';

function StepIcon({ done }: { done: boolean }) {
  return (
    <IconContainer>
      <Circle $done={done} />
      {done && (
        <CheckIconContainer>
          <CheckIcon size={10} color={CONFIRM_COLOR} strokeWidth={4} />
        </CheckIconContainer>
      )}
    </IconContainer>
  );
}

function StepItem({
  step,
  isCurrent,
  isChild,
}: {
  step: { id: string; index: number; label: string; done: boolean };
  isCurrent: boolean;
  isChild: boolean;
}) {
  return (
    <StepListItem $done={step.done} $isProgress={isCurrent} $isChild={isChild}>
      {isCurrent ? (
        <>
          <span>{step.label}</span>
          <LoadingContainer>
            <Loading size={3} radius="2rem" />
          </LoadingContainer>
        </>
      ) : (
        <>
          <StepIcon done={step.done} />
          <span>{step.label}</span>
        </>
      )}
    </StepListItem>
  );
}

export function Stepper() {
  const pathname = usePathname();
  const [stepper] = useAtom(stepperAtom);

  useStepper();

  if (pathname === '/dashboard') {
    return (
      <Container>
        <StepListItem $done={true} $isProgress={false} $isChild={false}>
          <StepIcon done={true} />
          <span>대쉬보드</span>
        </StepListItem>
      </Container>
    );
  }

  return (
    <Container>
      {stepper.steps.map((step) => {
        const isCurrent = stepper.currentStep === step.index;
        const isChild = step.index === 3 || step.index === 4;
        return <StepItem key={step.id} step={step} isCurrent={isCurrent} isChild={isChild} />;
      })}
    </Container>
  );
}

const Container = styled.ol`
  position: fixed;
  top: 50%;
  left: 1rem;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 20cqw;
  padding: 16px;

  background-color: var(--color-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  font-size: 0.75rem;
  user-select: none;
  transform: translateY(-50%);
`;

const StepListItem = styled.li<{ $done: boolean; $isProgress: boolean; $isChild: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ $done, $isProgress }) => {
    if ($done) return CONFIRM_COLOR;
    if ($isProgress) return 'var(--color-button)';
    return 'color-mix(in oklch, var(--color-button) 30%, transparent )';
  }};

  ${({ $isChild }) =>
    $isChild &&
    css`
      transform: translateX(1rem);
    `}
`;

const Circle = styled.div<{ $done: boolean }>`
  width: ${({ $done }) => ($done ? '0.75rem' : '0.5rem')};
  height: ${({ $done }) => ($done ? '0.75rem' : '0.5rem')};
  background-color: ${({ $done }) =>
    $done ? CONFIRM_COLOR : 'color-mix(in oklch, var(--color-button) 30%, transparent )'};
  border-radius: 50%;
  flex-shrink: 0;
  transition: background-color 0.3s ease-in-out;
`;

const CheckIconContainer = styled.div`
  position: absolute;
  top: -4px;
  left: -2px;

  & > svg {
    position: absolute;
    top: 1px;
    left: 10px;
    z-index: 2;
  }

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 8px;
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

const LoadingContainer = styled.div`
  position: relative;
  top: -2px;
  max-width: 50px;
  margin-left: -4px;
`;
