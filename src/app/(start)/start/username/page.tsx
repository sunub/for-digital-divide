'use client';

import React from 'react';
import { NotificationContext } from '@/context/NotificationContext';
import { ArrowIcon } from '@/icons';
import Modal from '@/components/ui/modal';
import Username from '@/components/LoginForm/LoginInput/Username';

export default function Home() {
  const { action } = React.useContext(NotificationContext);

  React.useEffect(() => {
    const id = crypto.randomUUID();
    action.add({
      id,
      message: `본인의 이름을 적어주셔도 되고 임의의 이름을 적어주셔도 되요! 이름을
        적고 확인을 눌러 주세요!`,
      type: 'default',
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
