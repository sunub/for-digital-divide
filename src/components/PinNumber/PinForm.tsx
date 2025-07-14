'use client';

import React from 'react';
import { useNumpadStore, useSubmitNumpadStroe } from '@/context/NumpadContext';
import { KeypadInfo } from '@/utils/keypad';
import { goToUsername } from '@/utils/revalidate';
import Input from './Input';
import PinSuccess from './PinSuccess';

interface PinFormProps {
  children: React.ReactNode;
  uses: 'register' | 'confirm';
  padInfo: KeypadInfo;
  pinAction: (
    formData: FormData,
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

function PinForm({ uses, children, padInfo, pinAction }: PinFormProps) {
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
    uses === 'register' ? useNumpadStore((state) => state) : useSubmitNumpadStroe((state) => state);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
          return;
        }

        const actionResult = await pinAction(formData, padInfo);
        if (actionResult.status === 'error') {
          if (actionResult.id === 'username-not-found') {
            return goToUsername();
          }

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
        updateStatus('pending');
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
                {pinErrorStatus.hasError && <ErrorList id={pinErrorStatus.errorId} errors={pinErrorStatus.msg} />}
              </React.Fragment>
            )}
          </div>
          <div className="px-4 min-h-[32px] pb-3 pt-1 text-center">{children}</div>
        </React.Fragment>
      )}
    </form>
  );
}

export default PinForm;
