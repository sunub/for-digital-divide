import React from 'react';
import Form from './form';
import Device from '@/components/Device';
import Modal from '@/components/Modal';
import { cookies } from 'next/headers';
import PermissionRequest from './request';

async function Page() {
  const hasRequestedPermission = cookies().get('hasRequestedPermission')?.value;
  return (
    <React.Fragment>
      {hasRequestedPermission === 'true' ? (
        <React.Fragment>
          <Device
            headerContent={
              <h1 className="text-4xl font-bold">
                Service Worker and PushManager
              </h1>
            }
            mainContent={<Form />}
          />
        </React.Fragment>
      ) : (
        <Modal>
          <p>
            교육에 필요한 내용을 위해서 <b>왼쪽 상단</b>의 <b>알림 허용하기</b>
            를 눌러주세요!
          </p>
          <PermissionRequest />
        </Modal>
      )}
    </React.Fragment>
  );
}
export default Page;
