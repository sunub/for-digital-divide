"use client";

import { Box } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { MdCheckCircle, MdError, MdInfo, MdWarning } from "react-icons/md";
import * as styles from "./InfoBox.css";

const ICON_PRESETS = {
  info: MdInfo,
  success: MdCheckCircle,
  warning: MdWarning,
  error: MdError,
} as const;

export type InfoBoxIconType = keyof typeof ICON_PRESETS;
type InfoBoxTone = "primary" | "success" | "destructive" | "neutral";

const TONE_MAP: Record<InfoBoxIconType, InfoBoxTone> = {
  info: "primary",
  success: "success",
  warning: "neutral",
  error: "destructive",
};

export interface InfoBoxProps extends ComponentPropsWithoutRef<typeof Box> {
  title: string;
  icon?: InfoBoxIconType | ReactNode;
  tone?: InfoBoxTone;
}

export function InfoBox({
  title,
  icon,
  tone,
  className,
  children,
  ref,
  ...props
}: InfoBoxProps & { ref?: Ref<HTMLDivElement> }) {
  const isPreset = typeof icon === "string" && icon in ICON_PRESETS;
  const inferredTone =
    tone || (isPreset ? TONE_MAP[icon as InfoBoxIconType] : "primary");

  const renderIcon = () => {
    if (!icon) return null;

    if (isPreset) {
      const IconComponent = ICON_PRESETS[icon as InfoBoxIconType];
      return (
        <IconComponent
          className={styles.infoIcon({ tone: inferredTone })}
          aria-hidden="true"
        />
      );
    }

    return <span className={styles.infoIconWrapper}>{icon}</span>;
  };

  return (
    <Box
      ref={ref}
      className={clsx(styles.infoBox({ tone: inferredTone }), className)}
      {...props}
    >
      {renderIcon()}
      <div className={styles.infoContent}>
        <h4 className={styles.infoTitle}>{title}</h4>
        {children && <div className={styles.infoText}>{children}</div>}
      </div>
    </Box>
  );
}
