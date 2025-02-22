'use client';

import { memo, useEffect } from 'react';
import Username from '@/components/LoginForm/LoginInput/Username';
import Button from '@/components/Button';
import usernameAction from '@/utils/action/username';
import { useActionState } from 'react';
import { useToastMsg } from '@/hooks/use-toast-msg';
import { DeviceContent, DeviceFrame } from '@/components/ui/device';
import { motion, useSpring } from 'motion/react';

export default function Home() {
  const [actionState, formAction, isPending] = useActionState(
    usernameAction,
    null,
  );
  const showToastMsg = useToastMsg();
  const width = useSpring('1px');

  useEffect(() => {
    showToastMsg({
      id: 'username',
      message: '사용자 이름을 입력해주세요',
      type: 'default',
    });

    width.set('100px');
  }, []);

  useEffect(() => {
    if (actionState?.status === 'error') {
      showToastMsg({
        id: 'username-error',
        message: '이름을 입력한 후 확인 버튼을 눌러주세요!',
        type: 'error',
      });
    }
  }, [actionState]);

  return (
    <DeviceFrame>
      <DeviceContent>
        <div className="text-2xl">
          <div className="flex w-full justify-center items-center">
            <span>디지털</span>
            <motion.svg
              key={'divide-line'}
              style={{ width }}
              height={'10px'}
              viewBox={`0 0 100 10`}
            >
              <motion.rect style={{ width }} height={'2px'} />
            </motion.svg>
            <span>격차</span>
          </div>
          <span>좁히기</span>
        </div>
        <div className="h-[96px] w-[1px]" />
        <form
          id={'init-username-form'}
          className="flex flex-col place-content-center gap-3"
          noValidate
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="init-username">
              <ArrowIcon />
            </label>
          </div>
          <div className="ml-auto mr-auto">
            <Username
              id="init-username"
              type="text"
              name={'username'}
              autoComplete="username"
              minLength={1}
              maxLength={40}
              inputContent="사용자 이름을 입력해주세요"
              labelContent="사용자 이름"
            />
          </div>
          <div className="flex place-content-center align-middle pt-4">
            <Button
              type="submit"
              formAction={formAction}
              status={isPending ? 'pending' : 'idle'}
              disabled={isPending}
            >
              확인
            </Button>
          </div>
        </form>
      </DeviceContent>
    </DeviceFrame>
  );
}

const ArrowIcon = memo(() => {
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
});
