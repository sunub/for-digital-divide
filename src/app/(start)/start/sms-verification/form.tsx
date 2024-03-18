'use client';

import React from 'react';
import Button from '@/components/Button/Button';
import { askPermission } from './lib/permission';
import { NotificationContext } from '@/context/NotificationContext';
import Modal from '@/components/Modal';
import useToggle from '@/hooks/use-toggle';
import { getVAPIDKey } from './lib/action';

function Form() {
  const [phoneNum, setPhoneNum] = React.useState('');
  const [permission, setPermission] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const permission = await askPermission();
      setPermission(permission);
    })();
  }, []);

  React.useEffect(() => {
    if (phoneNum.length === 4 && phoneNum.includes('-')) {
      setPhoneNum((prev) => prev.slice(0, 3));
    } else if (!phoneNum.includes('-') && phoneNum.length === 4) {
      setPhoneNum((prev) => prev.slice(0, 3) + '-' + prev.slice(3, 4));
    }

    if (phoneNum.length === 9) {
      setPhoneNum((prev) => prev.slice(0, 8) + '-' + prev.slice(8, 9));
    }
    if (phoneNum.length === 10 && phoneNum[phoneNum.length - 1] === '-') {
      setPhoneNum((prev) => prev.slice(0, 8));
    }

    if (phoneNum.length === 11 && !phoneNum.includes('-')) {
      setPhoneNum(
        (prev) =>
          prev.slice(0, 3) + '-' + prev.slice(3, 7) + '-' + prev.slice(7, 11),
      );
    }
  }, [phoneNum]);

  return (
    <form
      action={async (formData: FormData) => {
        const vapidKey = await getVAPIDKey(formData);
        console.log(vapidKey);
      }}
      className="flex flex-col gap-3"
    >
      <div>
        <label htmlFor={'name-registration'}>이름을 입력해주세요</label>
        <input
          id="name-registration"
          className="p-2 pl-5 bg-slate-100 border-slate-200 border-2 border-solid rounded"
          autoComplete="name"
          name="name"
          type={'text'}
          aria-label="사용자 확인을 위한 이름 입력"
          aria-describedby="name-registration"
          aria-labelledby="name-registration"
        />
      </div>

      <label htmlFor={'phone-registration'}>휴대전화 번호를 입력해주세요</label>
      <div className="flex flex-row bg-slate-300 border-2 rounded-md">
        <select id="phone-registration-agency" className="bg-transparent p-2">
          <option value="skt">SKT</option>
          <option value="kt">KT</option>
          <option value="lg">LG</option>
        </select>
        <input
          id="phone-registration"
          className="bg-transparent w-full p-2 pl-5"
          type="tel"
          name="phone"
          autoComplete={'tel-national'}
          aria-describedby="phone-registration-agency"
          aria-labelledby="phone-registration-agency"
          aria-label="핸드폰 번호 입력"
          maxLength={13}
          value={phoneNum}
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setPhoneNum(value);
              return;
            }
            if (Number.isInteger(parseInt(value, 10))) {
              setPhoneNum(value);
            }
          }}
        />
      </div>
      <div className="pt-5">
        <Button type="submit">확인</Button>
      </div>
    </form>
  );
}

export default Form;
