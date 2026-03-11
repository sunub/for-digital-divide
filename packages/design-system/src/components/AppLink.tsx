import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { vars } from "../tokens/theme.css";
import * as styles from "./AppLink.css";

type AppLinkVariant = keyof typeof styles.linkVariant;

export interface AppLinkProps
  extends Omit<ComponentPropsWithoutRef<typeof NextLink>, "children"> {
  children: ReactNode;
  className?: string;
  hoverColor?: string;
  standoutColor?: string;
  standoutUnderlineColor?: string;
  variant?: AppLinkVariant;
}

export function AppLink({
  children,
  className,
  hoverColor = vars.color.button,
  standoutColor = vars.color.standOut,
  standoutUnderlineColor = vars.color.standOut,
  style,
  variant = "inline",
  ...props
}: AppLinkProps) {
  const isStandout = variant === "standout";
  const standoutVars = isStandout
    ? assignInlineVars({
        [styles.standoutHoverColorVar]: hoverColor,
        [styles.standoutTextColorVar]: standoutColor,
        [styles.standoutUnderlineColorVar]: standoutUnderlineColor,
      })
    : undefined;

  return (
    <NextLink
      className={clsx(
        styles.linkBase,
        styles.linkVariant[variant],
        isStandout && styles.standoutInteraction,
        className,
      )}
      style={standoutVars ? { ...standoutVars, ...style } : style}
      {...props}
    >
      <span
        className={clsx(styles.linkLabel, isStandout && styles.standoutLabel)}
      >
        {children}
      </span>
    </NextLink>
  );
}
