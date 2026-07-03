"use client";

import { DeviceProvider, type DeviceView } from "./DeviceContext";
import { DeviceFrameInner } from "./DeviceFrameInner";

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultView?: DeviceView;
}

export function DeviceFrame({
  children,
  className,
  defaultView,
  ...props
}: DeviceFrameProps) {
  return (
    <DeviceProvider defaultView={defaultView}>
      <DeviceFrameInner className={className} {...props}>
        {children}
      </DeviceFrameInner>
    </DeviceProvider>
  );
}
