import './globals.css';
import React from 'react';
import { Gugi } from 'next/font/google';
import { ReloadButton } from '@/components/ReloadButton';
import { Stepper } from '@/components/Stepper/ui/Stepper';
import { JotaiProvider } from '@/provider/JotaiProvider';
import { ToastContainer } from '@/provider/toast/ui/ToastContainer';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kor" className={gugi.className}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet preload" as="style" />
        <meta charSet="utf-8" />
        <meta httpEquiv="u-ea-compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body id="root">
        <StyledComponentsRegistry>
          <JotaiProvider>
            <div id="_next">
              <div id="devsite-content">
                <Stepper />
                {children}
              </div>
              <ReloadButton />
            </div>
            <ToastContainer />
          </JotaiProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
