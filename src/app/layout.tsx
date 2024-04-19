import React from 'react';
import './globals.css';
import Header from '@compo/Header';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { NotificationProvider } from '@/context/NotificationContext';
import localFont from 'next/font/local';
import NotificationList from '@/components/NotificationList';

const nanumFont = localFont({
  src: '../../public/font/NanumSquareNeo.woff2',
  display: 'swap',
  variable: '--nanum-square-neo',
  preload: true,
});

// const wotfard = localFont({
//   src: '../fonts/Wotfard.woff2',
//   display: 'swap',
//   variable: '--wotfard',
//   preload: true,
// });

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kor" className={cx(nanumFont.variable)}>
      <head>
        <style>
          {`
            body {
              container: root / inline-size;
              font-size: var(--text-size);
            }
          `}
        </style>
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
          <NotificationProvider>
            <div id="_next">
              <section id="devsite-wrapper">
                <div id="devsite-header">
                  <Header />
                </div>
                <div id="devsite-content">
                  <div id="devsite-content__site-main">{children}</div>
                </div>
              </section>
            </div>
            <NotificationList />
          </NotificationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
