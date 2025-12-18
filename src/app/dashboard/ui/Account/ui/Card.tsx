"use client";

import { memo, useEffect, useRef } from "react";
import * as style from "./Card.css";

interface CardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function CardLayout({ children, ...props }: CardLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const smallCard = el.querySelector<HTMLDivElement>(".small-card");
    if (!smallCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      smallCard.style.setProperty("--mx", `${x}px`);
      smallCard.style.setProperty("--my", `${y}px`);
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={style.rootContainer} {...props} ref={containerRef}>
      {children}
    </div>
  );
}

export const HoveringTextField = memo(function HoveringTextField() {
  return <p className={style.hoveringText}>{""}</p>;
});

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <CardLayout>
      <div className={style.cardContentContainer}>
        <div className={style.cardContent}>{children}</div>
      </div>
      <div className={style.smallCard} />
      <HoveringTextField />
    </CardLayout>
  );
}
