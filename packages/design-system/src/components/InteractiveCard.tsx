"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import * as styles from "./InteractiveCard.css";

export interface InteractiveCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  contentClassName?: string;
  hoverHint?: string;
}

export function InteractiveCard({
  children,
  className,
  contentClassName,
  hoverHint,
  ...props
}: InteractiveCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return;
    }

    let rafId: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        const { left, top } = element.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        element.style.setProperty("--interactive-card-x", `${x}px`);
        element.style.setProperty("--interactive-card-y", `${y}px`);
        rafId = null;
      });
    };

    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div ref={rootRef} className={clsx(styles.root, className)} {...props}>
      <div className={styles.shell}>
        <div className={clsx(styles.content, contentClassName)}>{children}</div>
      </div>
      <div aria-hidden="true" className={styles.spotlight} />
      {hoverHint ? <p className={styles.hint}>{hoverHint}</p> : null}
    </div>
  );
}
