import React from "react";
import "./globals.css";
import Header from "@compo/Header";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";

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
              --text-size: 24px;
            }

            body {
              container: root / inline-size;
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
      <body>
        <StyledComponentsRegistry>
          <div id="_next">
            <section id="devsite-wrapper">
              <div id="devsite-header">
                <Header />
              </div>
              <div id="devsite-content">{children}</div>
            </section>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
