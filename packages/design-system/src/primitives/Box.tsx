import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { splitProps } from "../styles/sprinkels.utils";
import type { BaseStyle } from "../styles/sprinkles.css";
import { baseStyles } from "../styles/sprinkles.css";

type BoxNativeProps = Omit<ComponentPropsWithoutRef<"div">, keyof BaseStyle>;

export interface BoxProps extends BaseStyle, BoxNativeProps {
  as?: ElementType;
  asChild?: boolean;
}

export function Box({
  as: Tag = "div",
  asChild,
  className,
  ref,
  ...props
}: BoxProps & { ref?: Ref<HTMLElement> }) {
  const Component = asChild ? Slot : Tag;
  const { atomProps, nativeProps } = splitProps(props);

  return (
    <Component
      ref={ref}
      className={clsx(baseStyles(atomProps), className)}
      {...nativeProps}
    />
  );
}
