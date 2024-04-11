'use client';

import React from 'react';
import Input from './Input';
import { KeypadInfo } from '@/utils/keypad';
import * as v from 'valibot';
import { reorderKeypad } from '@/utils/pin/register';
import PinSuccess from './PinSuccess';

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
      className="flex flex-col gap-2 items-center"
      id="pin-pattern-form"
      noValidate={isHydrated}
      aria-invalid={pinErrorStatus.hasError || undefined}
      aria-describedby={pinErrorStatus.errorId}
      tabIndex={-1}
      action={async (formData: FormData) => {
        const isReorder = formData.get('reorder') === 'on';

        if (isReorder) {
          reorderKeypad(isReorder);
          return;
        }

        let formPinNumber = formData.get('pinNumbers') as string;
        const result = v.safeParse(PinNumberSchema, formPinNumber.split(','));

        if (!result.success) {
          setPinErrorStatus({
            hasError: true,
            errorId: 'pin-pattern-input',
            msg: result.issues[0].message,
          });
        }

        const pinNumber = result.output as string[];
        const actionResult = await action(pinNumber, padInfo);
        console.log(actionResult);
        if (actionResult.status === 'error') {
          setPinErrorStatus({
            hasError: true,
            errorId: actionResult.id,
            msg: actionResult.msg,
          });
          return;
        }

        setOpen(true);
        setSuccess(true);
      }}
    >
      {isSuccess ? (
        <PinSuccess />
      ) : (
        <React.Fragment>
          <div className="shadow-card_lower pb-4 pt-4 pl-8 pr-8 rounded-lg flex flex-col items-center gap-2 bg-white">
            <Input
              htmlFor={`pin-pattern-input-${uses}`}
              onClick={() => setOpen(true)}
            >
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
            {isOpen && <React.Fragment>{children}</React.Fragment>}
          </div>
        </React.Fragment>
      )}
    </form>
  );
}

export default PinInput;
