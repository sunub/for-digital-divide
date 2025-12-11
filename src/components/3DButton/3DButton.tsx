import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { memo, useCallback, useMemo } from "react";
import type { Status } from "@/store/pinnumber-store";
import * as styles from "./3DButton.css";
import { useButtonClick } from "./hooks/useButtonClick";
import { usePendingAnimation } from "./hooks/usePendingAnimation";

interface ButtonOwnProps<E extends ElementType = "button"> {
  variant?: "default" | "confirm" | "destructive";
  status?: Status;
  as?: E;
}

type ButtonProps<E extends ElementType = "button"> = ButtonOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps> &
  MotionProps;

export function _3DButton<T extends ElementType = "button">({
  variant = "default",
  status = "idle",
  onClick,
  children,
  as,
  ...props
}: ButtonProps<T>) {
  const [isClick, toggleClick] = useButtonClick(false);
  const { textAnimationScope, ballAnimationScope } =
    usePendingAnimation(status);

  const Component = as || "button";
  const MotionComponent = useMemo(() => motion.create(Component), [Component]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (status === "pending") {
        return;
      }
      toggleClick();
      onClick?.(e);
    },
    [status, onClick, toggleClick],
  );

  const isPending = status === "pending";

  return (
    <MotionComponent
      transition={{ duration: 0.1 }}
      type={Component === "button" ? "button" : undefined}
      className={styles.buttonRecipe({
        variant,
        status: status === "pending" ? "pending" : "idle",
      })}
      aria-pressed={isClick}
      onClick={handleClick}
      {...props}
    >
      <div>
        <span className={styles.edgeClass} />
        <span className={styles.shadowClass} />

        <motion.div ref={ballAnimationScope} className={styles.frontClass}>
          <motion.span
            id="upper-dot-pending"
            initial={{ y: 0, scale: 1 }}
            className={styles.dotClass({
              status: isPending ? "pending" : "idle",
              type: "upper",
            })}
          />
          <motion.span
            id="lower-dot-pending"
            initial={{ y: 0, scale: 1 }}
            className={styles.dotClass({
              status: isPending ? "pending" : "idle",
              type: "lower",
            })}
          />
          <motion.div ref={textAnimationScope}>{children}</motion.div>
        </motion.div>
      </div>
    </MotionComponent>
  );
}

export default memo(_3DButton);
