import {
  Button,
  type ButtonStatus,
  type NativeButtonProps,
} from "@internal/design-system/components";
import * as React from "react";

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
