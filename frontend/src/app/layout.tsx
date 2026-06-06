import "./globals.css";
import type React from "react";
import { ReloadButton } from "@/components/ReloadButton";
import { FlashToastListener } from "@/provider/toast/ui/FlashToastListener";
import { ToastContainer } from "@/provider/toast/ui/ToastContainer";
import { QueryProvider } from "./providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gugi&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet preload"
          as="style"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="u-ea-compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <QueryProvider>
          <div id="_next">
            <div id="devsite-content">
              {/* <Suspense fallback={<div>Loading...</div>}> */}
              {/*   <Stepper /> */}
              {/* </Suspense> */}
              {children}
            </div>
            <ReloadButton />
          </div>
          <ToastContainer />
          <FlashToastListener />
        </QueryProvider>
        <div id="alertDialog-wrapper" />
      </body>
    </html>
  );
}
