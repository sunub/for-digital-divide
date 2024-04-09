'use client';

import React from 'react';
import Input from './Input';
import Keypad from './Keypad';
import { KeypadInfo } from '@/utils/keypad';
import { useNumpadStore, useSubmitNumpadStroe } from './KeypadProvider';

interface KeyLayoutProps {
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

function ErrorList({ id, errors }: { id?: string; errors?: string | null }) {
  return errors?.length ? (
    <ul id={id} className="flex flex-col gap-1">
      <li className="text-lg text-rose-500">{errors}</li>
    </ul>
  ) : null;
}

function KeyLayout(props: KeyLayoutProps) {
  const { padInfo, uses, action } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [pinErrorStatus, setPinErrorStatus] = React.useState<ErrorStatus>({
    hasError: false,
    errorId: '',
    msg: null,
  });
  const [isIdle, setIsIdle] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLFormElement>(null);
  const validNumpadLength = 4;

  const keypadProps = {
    padInfo,
    uses,
    isIdle,
  };

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
      id={`pin-pattern-form-${uses}`}
      className="flex flex-col items-center"
      action={async (formData: FormData) => {
        let pinNumbers = formData.get('pinNumbers');
        if (!pinNumbers)
          return setPinErrorStatus({
            hasError: true,
            errorId: 'pin-pattern-input',
            msg: '핀번호를 입력해주세요.',
          });

        const decodedPinNumbers = (pinNumbers as string).split(',');
        const actionData = await action(decodedPinNumbers, padInfo);

        if (decodedPinNumbers.length !== validNumpadLength) {
          setPinErrorStatus({
            hasError: true,
            errorId: 'pin-pattern-input',
            msg: '핀번호는 4자여야 합니다.',
          });
        }

        if (actionData.status === 'error' && actionData.msg) {
          setPinErrorStatus({
            hasError: true,
            errorId: 'pin-pattern-input',
            msg: actionData.msg,
          });
        }
      }}
    >
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
        <div>
          {isOpen ? (
            <div>
              {pinErrorStatus.hasError ? (
                <ErrorList
                  id={pinErrorStatus.errorId}
                  errors={pinErrorStatus.msg}
                />
              ) : (
                <React.Fragment>
                  <p>보안 키를 입력해주세요</p>
                  <p>4자리로 입력해주세요</p>
                </React.Fragment>
              )}
            </div>
          ) : null}
        </div>
      </Input>
      <div>{isOpen && <Keypad props={keypadProps} />}</div>
    </form>
  );
}

export default KeyLayout;
