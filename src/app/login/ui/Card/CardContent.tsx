"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useHistory } from "@/shared/hooks/useHistory";
import * as style from "./style/CardContent.css";

export const CardContent = memo(
  ({
    hasDeviceId = true,
    setIsHovering,
    header,
    footer,
  }: {
    hasDeviceId?: boolean;
    setIsHovering: (isHovering: boolean) => void;
    header: ReactNode;
    footer: ReactNode;
  }) => {
    const { add } = useHistory();
    const showToast = useToast();

    return (
      <button
        type="button"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          if (!hasDeviceId) {
            showToast(
              "info",
              "적어도 한 번 로그인을 수행 후 핀번호를 등록 해야 핀번호를 사용할 수 있습니다.",
            );
          } else {
            add(new URL("/login", window.location.href).toString());
          }
        }}
        className={style.cardContentWrapper({ hasDeviceId })}
      >
        <main className={style.cardContentLinkWrapper({ hasDeviceId })}>
          <h3 className={style.headerStyle}>{header}</h3>
          <footer className={style.footerStyle}>{footer}</footer>
        </main>
      </button>
    );
  },
);
