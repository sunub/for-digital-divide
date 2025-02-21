import React from 'react';
import './globals.css';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import NotificationList from '@/components/NotificationList';
import { ReloadButton } from '@/components/ReloadButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kor">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload"
          as="style"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="u-ea-compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body id="root">
        <StyledComponentsRegistry>
          <div id="_next">
            <div id="devsite-content">{children}</div>
            <ReloadButton />
          </div>
          <NotificationList />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
