'use client';

import React from 'react';
import Input from './Input';
import { KeypadInfo } from '@/utils/keypad';
import * as v from 'valibot';
import { reorderKeypad } from '@/utils/pin/register';
import PinSuccess from './PinSuccess';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNumpadStore, useSubmitNumpadStroe } from '@/context/NumpadContext';

interface PinInputProps {
  children: React.ReactNode;
  uses: 'register' | 'confirm';
  padInfo: KeypadInfo;
  action: (
    decodedPinNumbers: string[],
    padInfo: KeypadInfo,
  ) => Promise<{
    status: string;
    id: string;
    msg: string;
  }>;
}

interface ErrorStatus {
  hasError: boolean;
  errorId: string;
  msg: string | null;
}

const validNumpadLength = 4;
const PinNumberSchema = v.array(v.string(), [
  v.minLength(validNumpadLength, '핀번호는 4자여야 합니다.'),
  v.maxLength(validNumpadLength, '핀번호는 4자여야 합니다.'),
]);

function ErrorList({ id, errors }: { id?: string; errors?: string | null }) {
  return errors?.length ? (
    <ul id={id} className="flex flex-col gap-1">
      <li className="text-lg text-rose-500">{errors}</li>
    </ul>
  ) : null;
}

function useHydrated() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => setHydrated(true), []);
  return hydrated;
}

function PinInput({ uses, children, padInfo, action }: PinInputProps) {
  const [isOpen, setOpen] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const [pinErrorStatus, setPinErrorStatus] = React.useState<ErrorStatus>({
    hasError: false,
    errorId: '',
    msg: null,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLFormElement>(null);
  const isHydrated = useHydrated();
  const { updateStatus } =
    uses === 'register'
      ? useNumpadStore((state) => state)
      : useSubmitNumpadStroe((state) => state);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setPinErrorStatus({
          hasError: false,
          errorId: '',
          msg: null,
        });
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <form
      ref={containerRef}
      className="flex flex-col gap-2 items-center relative mt-4 w-fit"
      id={`pin-pattern-form-${uses}`}
      noValidate={isHydrated}
      aria-invalid={pinErrorStatus.hasError || undefined}
      aria-describedby={pinErrorStatus.errorId}
      tabIndex={-1}
      onClick={() => {
        setOpen(true);
      }}
      action={async (formData: FormData) => {
        updateStatus('pending');
        const isReorder = formData.get('reorder') === 'on';

        if (isReorder) {
          reorderKeypad(isReorder);
          return;
        }

        let formPinNumber = formData.get('pinNumbers') as string;
        const result = v.safeParse(PinNumberSchema, formPinNumber.split(','));

        if (!result.success) {
          updateStatus('idle');
          setPinErrorStatus({
            hasError: true,
            errorId: 'pin-pattern-input',
            msg: result.issues[0].message,
          });
          return;
        }

        const pinNumber = result.output as string[];
        const actionResult = await action(pinNumber, padInfo);
        if (actionResult.status === 'error') {
          updateStatus('idle');
          setPinErrorStatus({
            hasError: true,
            errorId: actionResult.id,
            msg: actionResult.msg,
          });
          return;
        }

        setOpen(true);
        setSuccess(true);
        updateStatus('idle');
      }}
    >
      {isSuccess ? (
        <PinSuccess />
      ) : (
        <React.Fragment>
          <div className="shadow-card_lower pb-4 pt-4 pl-8 pr-8 rounded-lg flex flex-col items-center gap-2 bg-white">
            <Input htmlFor={`pin-pattern-input-${uses}`}>
              <Input.TextField
                ref={inputRef}
                id={`pin-pattern-input-${uses}`}
                uses={uses}
                autoComplete={'new-password'}
                setter={setOpen}
                aria-invalid={pinErrorStatus.hasError || undefined}
                aria-describedby={pinErrorStatus.errorId}
              />
            </Input>
            {isOpen && (
              <React.Fragment>
                {pinErrorStatus.hasError && (
                  <ErrorList
                    id={pinErrorStatus.errorId}
                    errors={pinErrorStatus.msg}
                  />
                )}
              </React.Fragment>
            )}
          </div>
          <div className="px-4 min-h-[32px] pb-3 pt-1 text-center">
            {isOpen && <div>{children}</div>}
          </div>
        </React.Fragment>
      )}
    </form>
  );
}

const NumpadWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  transition: all 200ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transform-origin: top center;
  will-change: transform;
  animation: ${({ $isOpen }) => ($isOpen ? 'numpad-open' : 'numpad-close')}
    200ms ease forwards;

  @keyframes numpad-open {
    20%,
    from {
      opacity: 0;
      transform: translateY(0%) scaleY(0) scaleX(1);
    }

    to {
      transform: translateY(0%) scaleY(1) scaleX(1);
      opacity: 1;
    }
  }

  @keyframes numpad-close {
    20%,
    from {
      opacity: 1;
      transform: translateY(0%) scaleY(1) scaleX(1);
    }

    to {
      transform: translateY(0%) scaleY(0) scaleX(1);
      opacity: 0;
    }
  }
`;

export default PinInput;
