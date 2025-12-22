import clsx from "clsx";
import type { ComponentProps } from "react";
import * as style from "./ButtonGroup.css";

type Orientation = "horizontal" | "vertical";

interface ButtonGroupProps extends ComponentProps<"fieldset"> {
  orientation?: Orientation;
}

export function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <fieldset
      data-slot="button-group"
      data-orientation={orientation}
      className={clsx(style.buttonGroup({ orientation }), className)}
      {...props}
    />
  );
}
