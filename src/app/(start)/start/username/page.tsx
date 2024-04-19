'use client';

import React from 'react';
import { useNotificationStore } from '@/context/NotificationContext';
import { ArrowIcon } from '@/icons';
import Modal from '@/components/ui/modal';
import Username from '@/components/LoginForm/LoginInput/Username';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const { add } = useNotificationStore((state) => state);

  React.useEffect(() => {
    add({
      id: 'welcome',
      type: 'default',
      message: 'Welcome to the app!',
    });
  }, []);

  return (
    <div>
      <Modal isOpen={true}>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl">
            아래를 클릭 후 <b>키보드로</b> 입력해주세요!
          </h1>
          <ArrowIcon rotate={'rotate(-90deg)'} />
        </div>
        <Username
          type="text"
          name="username"
          autoComplete="username"
          minLength={1}
          maxLength={40}
          inputContent="사용자 이름을 입력해주세요"
          labelContent="사용자 이름"
          ariaLabel="사용자 이름 입력"
          ariaLabelledby="사용자 이름 입력"
          borderRadius={24}
        />
      </Modal>
    </div>
  );
}
