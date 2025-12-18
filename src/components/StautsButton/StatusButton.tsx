import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as React from "react";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";
import { buttonCursorVar, buttonPaddingVar } from "../Button/Button.css";
import * as style from "./StatusButton.css";

type Status = "pending" | "idle";

interface StatusButtonProps extends ButtonProps {
  status: Status;
}

const COLORS = [
  "oklch(92.86% 0.036 289.07)",
  "oklch(94.48% 0.028 290.23)",
  "oklch(92.86% 0.036 289.07)",
  "oklch(90.93% 0.045 288.25)",
  "oklch(87.45% 0.064 286.931)",
];

const COLOR_KEYS = [
  "color-pending-1",
  "color-pending-2",
  "color-pending-3",
  "color-pending-4",
  "color-pending-5",
];

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  StatusButtonProps
>((props, ref) => {
  const { status, children, className, ...rest } = props;
  const companionMap: Record<Status, React.ReactNode> = {
    pending: (
      <div className={style.pendingWrapper}>
        {COLORS.map((color, i) => (
          <span
            key={COLOR_KEYS[i]}
            className={style.pendingBlock}
            style={assignInlineVars({
              [style.pendingBlockBackgorund]: color,
              [style.pendingBlockDelay]: `${(i + 0.1) * 0.195}s`,
            })}
          />
        ))}
      </div>
    ),
    idle: null,
  };

  const companion = companionMap[status];
  return (
    <Button
      ref={ref}
      disabled={status === "pending"}
      className={className}
      style={assignInlineVars({
        [buttonPaddingVar]: status !== "pending" ? "0.5rem 1rem" : "0",
        [buttonCursorVar]: status === "pending" ? "progress" : "pointer",
      })}
      {...rest}
    >
      {status === "idle" ? children : null}
      {companion}
      {status !== "idle" ? <div className={style.pendingBtm} /> : null}
    </Button>
  );
});

StatusButton.displayName = "Button";
