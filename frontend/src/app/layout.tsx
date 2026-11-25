import "./globals.css";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "디지털 격차 좁히기 · 금융 교육",
    template: "%s · 디지털 격차 좁히기",
  },
  description:
    "모바일 금융이 낯선 사용자가 본인인증부터 송금까지 단계별로 연습하는 웹 교육 서비스",
};

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
