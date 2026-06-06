"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as style from "./Alert.css";
import { AlertDialogContext } from "./AlertDialog";

export function AlertDialogContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, contentId } = useContext(AlertDialogContext);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = document.getElementById("alertDialog-wrapper");
    if (rootElement) {
      setPortalRoot(rootElement);
    } else {
      console.warn(
        "AlertDialog portal root element (#alertDialog-wrapper) not found",
      );
    }
  }, []);

  useEffect(() => {
    if (!open || !portalRoot || !contentWrapperRef.current) {
      return;
    }

    const createFocusGuard = (position: string) => {
      const guard = document.createElement("span");
      guard.setAttribute("data-focus-guard", position);
      guard.setAttribute("data-aria-hidden", "true");
      guard.setAttribute("aria-hidden", "true");
      guard.style.cssText =
        "outline: none; opacity: 0; position: fixed; pointer-events: none;";
      return guard;
    };

    const firstFocusGuard = createFocusGuard("device-first-focus-guard");
    const lastFocusGuard = createFocusGuard("device-last-focus-guard");

    portalRoot.insertAdjacentElement("afterbegin", firstFocusGuard);
    portalRoot.insertAdjacentElement("beforeend", lastFocusGuard);

    const focusableElementsQuery =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

    const contentWrapper = contentWrapperRef.current;
    const getFocusableElements = () =>
      Array.from(contentWrapper.querySelectorAll(focusableElementsQuery));

    const handleFirstGuardFocus = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 1) {
        (focusable[focusable.length - 2] as HTMLElement).focus();
      }
    };

    const handleLastGuardFocus = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 1) {
        (focusable[1] as HTMLElement).focus();
      }
    };

    firstFocusGuard.addEventListener("focus", handleFirstGuardFocus);
    lastFocusGuard.addEventListener("focus", handleLastGuardFocus);

    const contentFocusable = Array.from(
      document
        .getElementById(contentId)
        ?.querySelectorAll(focusableElementsQuery) || [],
    );
    if (contentFocusable.length > 0) {
      (contentFocusable[0] as HTMLElement).focus();
    }

    return () => {
      firstFocusGuard.removeEventListener("focus", handleFirstGuardFocus);
      lastFocusGuard.removeEventListener("focus", handleLastGuardFocus);
      firstFocusGuard.remove();
      lastFocusGuard.remove();
    };
  }, [open, contentId, portalRoot]);

  if (!open || !portalRoot) {
    return null;
  }

  return createPortal(
    <>
      <div className={style.backdrop({ state: open ? "open" : "closed" })} />
      <div
        className={style.contentWrapper({ state: open ? "open" : "closed" })}
        ref={contentWrapperRef}
        role="alertdialog"
        id={contentId}
        aria-modal="true"
        tabIndex={-1}
      >
        {children}
      </div>
    </>,
    portalRoot,
  );
}
