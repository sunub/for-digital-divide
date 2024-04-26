'use client';

import React from 'react';
import { useNotificationStore } from '@/context/NotificationContext';
import Username from '@/components/LoginForm/LoginInput/Username';
import Button from '@/components/Button';
import usernameAction from '@/utils/action/username';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod, getZodConstraint } from '@conform-to/zod';
import { z } from 'zod';

const usernameSchema = z.object({
  username: z
    .string()
    .min(1, '1글자 이상 입력해주세요.')
    .max(40, '40글자 이하로 입력해주세요.'),
});

export default function Home() {
  const [result, action] = useFormState(usernameAction, null);

  const [form, fields] = useForm({
    id: 'init-username-form',
    lastResult: result,
    constraint: getZodConstraint(usernameSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: usernameSchema });
    },
    defaultValue: {
      username: '',
    },
  });
  const { add, remove } = useNotificationStore((state) => state);

  React.useEffect(() => {
    add({
      id: 'username',
      message: '사용자 이름을 입력해주세요',
      type: 'default',
    });
  }, []);
  console.log(status);

  return (
    <form
      id={form.id}
      action={action}
      className="w-[100cqw] h-[100cqh] flex flex-col place-content-center gap-3"
      noValidate
    >
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="init-username">
          <h1 className="text-xl">
            아래를 클릭 후 <b className="font-black">키보드로</b> 입력해주세요!
          </h1>
        </label>
        {result && result.status === 'error' && (
          <div className="text-red-500 text-center">
            <p className="text-s">이름이 입력되지 않았습니다!</p>
            <p className="text-s">
              아래의 칸에 이름을 입력한 후{' '}
              <strong className="text-l font-black">확인</strong>을 눌러주세요!
            </p>
          </div>
        )}
        <ArrowIcon />
      </div>
      <div className="ml-auto mr-auto">
        <Username
          id="init-username"
          type="text"
          name={fields.username.name}
          autoComplete="username"
          minLength={1}
          maxLength={40}
          inputContent="사용자 이름을 입력해주세요"
          labelContent="사용자 이름"
        />
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return (
    <div className="flex place-content-center align-middle pt-4">
      <Button
        type="submit"
        status={status.pending ? 'pending' : 'idle'}
        disabled={status.pending}
      >
        확인
      </Button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`-rotate-90 z-10`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.583343 10.8835C-0.194445 11.664 -0.194448 12.9266 0.583335 13.7071L11.0424 24.2025C11.9395 25.1027 13.4632 24.3184 13.2518 23.0652C12.9161 21.0748 12.6742 19.0726 12.5259 17.0653C12.5305 17.0636 12.5351 17.0618 12.5396 17.06L25.3624 14.5892L25.3655 14.5892C25.8704 14.5892 26.2798 13.6361 26.2798 12.4604C26.2798 11.2847 25.8704 10.3316 25.3655 10.3316L25.3655 10.331L12.5383 7.85928C12.5266 7.85471 12.5148 7.85032 12.5031 7.84612C12.6487 5.73131 12.8983 3.62187 13.2518 1.5255C13.4632 0.272239 11.9396 -0.512027 11.0424 0.388229L0.583343 10.8835Z"
        fill="currentColor"
      />
    </svg>
  );
}
