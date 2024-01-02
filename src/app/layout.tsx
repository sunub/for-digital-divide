import React from "react";
import "./globals.css";
import Header from "@compo/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kor">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face {
            font-family: 'NanumSquareNeo';
            src: url('/fonts/NanumSquareNeo-Variable.woff2') format('woff2'),
            font-style: normal;
            font-display: fallback;
            unicode-range: U+AC00-D7AF;
          }
          @font-face {
            font-family: 'Wotfard';
            src: url('/fonts/wotfard-regular-webfont.woff2') format('woff2'),
            font-weight: 900;
            font-style: normal;
            font-display: fallback;
            uniconde-range: U+0020-007E;
          }
        `,
          }}
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
        <div id="_next">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
