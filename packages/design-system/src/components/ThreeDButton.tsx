"use client";

import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { memo, useEffect, useMemo, useState } from "react";
import * as styles from "./ThreeDButton.css";

export type ThreeDButtonStatus = "idle" | "pending" | "resolved" | "rejected";

interface ThreeDButtonOwnProps<E extends ElementType = "button"> {
  variant?: "default" | "confirm" | "destructive";
  status?: ThreeDButtonStatus;
  as?: E;
}

export type ThreeDButtonProps<E extends ElementType = "button"> =
  ThreeDButtonOwnProps<E> &
    Omit<ComponentPropsWithoutRef<E>, keyof ThreeDButtonOwnProps> &
    MotionProps;

function ThreeDButtonInner<T extends ElementType = "button">({
  variant = "default",
  status = "idle",
  onClick,
  children,
  as,
  ref,
  disabled,
  ...props
}: ThreeDButtonProps<T>) {
  const [isPressed, setIsPressed] = useState(false);
  const Component = as || "button";
  const MotionComponent = useMemo(() => motion.create(Component), [Component]);
  const isPending = status === "pending";

  useEffect(() => {
    if (!isPressed) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsPressed(false);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [isPressed]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isPending) {
      event.preventDefault();
      return;
    }

    setIsPressed(true);
    onClick?.(event);
  };

  return (
    <MotionComponent
      ref={ref}
      transition={{ duration: 0.1 }}
      type={Component === "button" ? "button" : undefined}
      disabled={Component === "button" ? disabled || isPending : undefined}
      aria-busy={isPending || undefined}
      className={styles.buttonRecipe({
        variant,
        status: isPending ? "pending" : "idle",
      })}
      data-pressed={isPressed ? "true" : undefined}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.shellClass}>
        <span className={styles.edgeClass} />
        <span className={styles.shadowClass} />

        <motion.div className={styles.frontClass}>
          <motion.span
            initial={{ y: 0, scale: 1 }}
            animate={{
              y: isPending ? [0, -10, 0] : 0,
              scale: isPending ? [1, 1.4, 1] : 1,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.2,
              delay: 0.1,
              ease: "circInOut",
            }}
            className={styles.dotClass({
              status: isPending ? "pending" : "idle",
              type: "upper",
            })}
          />
          <motion.span
            className={styles.dotClass({
              status: isPending ? "pending" : "idle",
              type: "lower",
            })}
          />
          <motion.div
            animate={
              isPending ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }
            }
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </MotionComponent>
  );
}

ThreeDButtonInner.displayName = "ThreeDButton";
export const ThreeDButton = memo(ThreeDButtonInner) as typeof ThreeDButtonInner;
ThreeDButton.displayName = "ThreeDButton";
