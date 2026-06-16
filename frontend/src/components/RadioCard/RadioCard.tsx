import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import * as styles from "./RadioCard.css";

interface RadioCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  children: ReactNode;
  cardClassName?: string;
}

export const RadioCard = ({
  children,
  className,
  cardClassName,
  id,
  disabled = false,
  ...props
}: RadioCardProps) => {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        styles.labelContainer,
        disabled && styles.labelDisabled,
        className,
      )}
    >
      <input
        id={inputId}
        type="radio"
        className={styles.visuallyHidden}
        disabled={disabled}
        {...props}
      />
      <div className={clsx(styles.card, cardClassName)}>
        <span className={styles.text}>{children}</span>
        <span className={styles.indicator} aria-hidden="true" />
      </div>
    </label>
  );
};
