import "./globals.css";
import localFont from "next/font/local";
import type React from "react";
import { FlashToastListener } from "@/provider/toast/ui/FlashToastListener";
import { ToastContainer } from "@/provider/toast/ui/ToastContainer";
import { QueryProvider } from "./providers/QueryProvider";

const nanumFont = localFont({
  src: "../../public/font/NanumSquareNeo-Variable.woff2",
  style: "normal",
  variable: "--nanum-square-neo",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={nanumFont.className}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="u-ea-compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <QueryProvider>
          <div id="_next">
            <div id="devsite-content">{children}</div>
          </div>
          <ToastContainer />
          <FlashToastListener />
        </QueryProvider>
        <div id="alertDialog-wrapper" />
      </body>
    </html>
  );
}
