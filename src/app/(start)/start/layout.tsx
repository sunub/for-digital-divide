import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <div id="devsite-content__site-main">{children}</div>;
}

export default Layout;
