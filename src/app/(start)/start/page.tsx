'use client';

import React from 'react';
import InitFrame from '@compo/InitFrame';
import InitPage from '@compo/InitPage';
import { PreloadResources } from '@/app/preload';
import SmallPhone from '@/components/SmallPhone';
import styled from 'styled-components';
import Device from '@/components/Device';
import { NotificationContext } from '@/context/NotificationContext';
import Button from '@/components/Button/Button';
import NotificationItem from '@/components/NotificationItem';

export default function Home() {
  const { action } = React.useContext(NotificationContext);

  return (
    <React.Fragment>
      {/* <div id="devsite-content__site-progression">
        <InitPage />
      </div> */}
      <div id="devsite-content__site-main">
        <SmallPhone />
        <Button
          onClick={() =>
            action.add({
              id: crypto.randomUUID(),
              message: `${crypto.randomUUID()}`,
              type: 'default',
            })
          }
        >
          추가하기
        </Button>
      </div>
    </React.Fragment>
  );
}
