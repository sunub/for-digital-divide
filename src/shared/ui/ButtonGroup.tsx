import clsx from "clsx";
import type { ComponentProps } from "react";
import { Box } from "./Box";
import * as style from "./ButtonGroup.css";

interface ButtonGroupProps extends ComponentProps<typeof Box> {
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  className,
  orientation = "horizontal",
  as = "fieldset",
  ...props
}: ButtonGroupProps) {
  return (
    <Box
      as={as}
      data-slot="button-group"
      data-orientation={orientation}
      className={clsx(style.buttonGroup({ orientation }), className)}
      {...props}
    />
  );
}
