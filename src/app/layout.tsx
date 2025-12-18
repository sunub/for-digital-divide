import "./globals.css";
import { Gugi } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import { ReloadButton } from "@/components/ReloadButton";
import { Stepper } from "@/components/Stepper/ui/Stepper";
import { JotaiProvider } from "@/provider/JotaiProvider";
import { FlashToastListener } from "@/provider/toast/ui/FlashToastListener";
import { ToastContainer } from "@/provider/toast/ui/ToastContainer";

const gugi = Gugi({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-gugi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={gugi.className}>
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
        <JotaiProvider>
          <div id="_next">
            <div id="devsite-content">
              <Suspense fallback={<div>Loading...</div>}>
                <Stepper />
              </Suspense>
              {children}
            </div>
            <ReloadButton />
          </div>
          <ToastContainer />
          <FlashToastListener />
        </JotaiProvider>
        <div id="alertDialog-wrapper" />
      </body>
    </html>
  );
}
