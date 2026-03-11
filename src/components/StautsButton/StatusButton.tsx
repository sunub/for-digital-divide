import * as React from "react";
import { Button } from "@for-digital-divide/design-system";
import type { ButtonStatus, NativeButtonProps } from "@for-digital-divide/design-system";

interface StatusButtonProps extends Omit<NativeButtonProps, "status"> {
  status: ButtonStatus;
}

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  StatusButtonProps
>((props, ref) => {
  const { status, children, ...rest } = props;
  return (
    <Button ref={ref} status={status} {...rest}>
      {children}
    </Button>
  );
});

StatusButton.displayName = "StatusButton";
