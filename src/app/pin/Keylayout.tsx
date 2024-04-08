'use client';

import React from 'react';
import Input from './Input';
import Keypad from './Keypad';
import { KeypadInfo } from '@/utils/keypad';
import { baseurl } from '@/constants/constants';
import pinAction from './submit';

interface KeyLayoutProps {
  uses: 'register' | 'confirm';
  padInfo: KeypadInfo;
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
  const [isOpen, setOpen] = React.useState(false);
  const [pinErrorStatus, setPinErrorStatus] = React.useState<ErrorStatus>({
    hasError: false,
    errorId: '',
    msg: null,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLFormElement>(null);

  const { padInfo, uses } = props;
  const keypadProps = {
    padInfo,
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
        if (!pinNumbers) return;

        const decodedPinNumbers = (pinNumbers as string).split(',');
        const actionData = await pinAction(decodedPinNumbers, padInfo.hashes);

        console.log(actionData);
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
          autoComplete={'new-password'}
          setter={setOpen}
          aria-invalid={pinErrorStatus.hasError || undefined}
          aria-describedby={pinErrorStatus.errorId}
        />
        <div>
          <ErrorList id={pinErrorStatus.errorId} errors={pinErrorStatus.msg} />
        </div>
      </Input>
      <div>{isOpen && <Keypad props={keypadProps} />}</div>
    </form>
  );
}

export default KeyLayout;
