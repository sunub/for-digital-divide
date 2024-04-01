import React from 'react';
import './globals.css';
import Header from '@compo/Header';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import NotificationContextProvider from '@/context/NotificationContext';
import Notifications from '@/components/Notifications/Notifiactions';
import localFont from 'next/font/local';
// import { MSWComponent } from '@/mocks/MSWComponent';

const nanumFont = localFont({
  src: '../../public/fonts/NanumSquareNeo-Variable.woff2',
  display: 'swap',
  variable: '--nanum-square-neo',
  preload: true,
});

const wotfard = localFont({
  src: '../../public/fonts/wotfard-regular-webfont.woff2',
  display: 'swap',
  variable: '--wotfard',
  preload: true,
});

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kor" className={cx(nanumFont.variable, wotfard.variable)}>
      <head>
        <style>
          {`
            html {
              --color-background: oklch(96.88% 0.015 294.47);
              --color-text: oklch(42.44% 0.011 17.58);
              --color-transparent: oklch(42.44% 0.011 17.58 / 20%);
              --color-primary:oklch(96.86% 0.009 288.17775174927874);
              --color-button: oklch(65.57% 0.19552898037793698 288.17775174927874);
              --color-highlight: oklch(73.96% 0.1963 25.278467161119735);
              --color-confirm: oklch(84.51% 0.162 147.29);
            }

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
          <NotificationContextProvider>
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
            <Notifications />
          </NotificationContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
