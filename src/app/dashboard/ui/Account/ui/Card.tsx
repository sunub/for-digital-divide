"use client";

import { forwardRef, memo, useRef } from "react";
import * as style from "./Card.css";
import { useCardAnimation } from "./useCardAnimation";

interface CardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardLayout = forwardRef<HTMLDivElement, CardLayoutProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className={style.rootContainer} {...props}>
        {children}
      </div>
    );
  },
);
export const HoveringTextField = memo(function HoveringTextField() {
  return <p className={style.hoveringText}>{""}</p>;
});

export function Card({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useCardAnimation(ref);

  return (
    <CardLayout ref={ref}>
      <div className={style.cardContentContainer}>
        <div className={style.cardContent}>{children}</div>
      </div>
      <div className={style.smallCard} />
      <HoveringTextField />
    </CardLayout>
  );
}
