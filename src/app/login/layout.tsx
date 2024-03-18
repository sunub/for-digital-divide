import React from 'react';
import LoginFrame from './LoginFrame';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="devsite-content__site-main">
      <LoginFrame>{children}</LoginFrame>
    </div>
  );
}

export default Layout;
