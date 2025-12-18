"use client";

import { memo } from "react";
import { hoveringText } from "./HoveringTextField.css";

export const HoveringTextField = memo(
  ({
    isHovering,
    hasDeviceId = true,
  }: {
    isHovering: boolean;
    hasDeviceId?: boolean;
  }) => {
    return <div className={hoveringText({ isHovering, hasDeviceId })} />;
  },
);
