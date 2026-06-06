"use client";

import { DeviceProvider } from "./DeviceContext";
import { DeviceFrameInner } from "./DeviceFrameInner";

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DeviceFrame({
  children,
  className,
  ...props
}: DeviceFrameProps) {
  return (
    <DeviceProvider>
      <DeviceFrameInner className={className} {...props}>
        {children}
      </DeviceFrameInner>
    </DeviceProvider>
  );
}
