"use client";

import { memo } from "react";
import { hoveringText } from "./HoveringTextField.css";

export const HoveringTextField = memo(
  ({ hasDeviceId = true }: { hasDeviceId?: boolean }) => {
    return <div className={hoveringText({ hasDeviceId })} />;
  },
);
