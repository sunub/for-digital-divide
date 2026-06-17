"use client";

import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { GoRocket } from "react-icons/go";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";
import { Box } from "../../primitives";
import * as styles from "./Badge.css";

const ICON_PRESETS = {
  info: MdInfo,
  success: MdCheckCircle,
  warning: MdWarning,
  error: MdError,
  start: GoRocket,
} as const;

export type BadgeIconType = keyof typeof ICON_PRESETS;
type BadgeTone = "primary" | "success" | "destructive" | "neutral";

const TONE_MAP: Record<BadgeIconType, BadgeTone> = {
  info: "primary",
  success: "success",
  warning: "neutral",
  error: "destructive",
  start: "primary",
};

export interface BadgeProps extends ComponentPropsWithoutRef<typeof Box> {
  icon?: BadgeIconType | ReactNode;
  tone?: BadgeTone;
}

export function Badge({
  icon,
  tone,
  className,
  children,
  ref,
  ...props
}: BadgeProps & { ref?: Ref<HTMLSpanElement> }) {
  const isPreset = typeof icon === "string" && icon in ICON_PRESETS;
  const inferredTone =
    tone || (isPreset ? TONE_MAP[icon as BadgeIconType] : "primary");

  const renderIcon = () => {
    if (!icon) return null;

    if (isPreset) {
      const IconComponent = ICON_PRESETS[icon as BadgeIconType];
      return <IconComponent className={styles.badgeIcon} aria-hidden="true" />;
    }

    return <span className={styles.badgeIconWrapper}>{icon}</span>;
  };

  return (
    <Box
      ref={ref}
      as="span"
      className={clsx(styles.badge({ tone: inferredTone }), className)}
      {...props}
    >
      {renderIcon()}
      <span className={styles.badgeText}>{children}</span>
    </Box>
  );
}
