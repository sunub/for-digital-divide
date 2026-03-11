"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import * as style from "./style/CardContent.css";

export const CardContent = memo(
  ({
    hasDeviceId = true,
    header,
    footer,
  }: {
    hasDeviceId?: boolean;
    header: ReactNode;
    footer: ReactNode;
  }) => {
    return (
      <div className={style.cardContentWrapper({ hasDeviceId })}>
        <main className={style.cardContentLinkWrapper({ hasDeviceId })}>
          <h3 className={style.headerStyle}>{header}</h3>
          <footer className={style.footerStyle}>{footer}</footer>
        </main>
      </div>
    );
  },
);
