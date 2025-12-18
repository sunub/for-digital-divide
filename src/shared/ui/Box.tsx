import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { splitProps } from "@/style/sprinkels.utils";
import type { BaseStyle } from "@/style/sprinkles.css";
import { baseStyles } from "@/style/sprinkles.css";

type BoxNativeProps = Omit<ComponentPropsWithoutRef<"div">, keyof BaseStyle>;

interface BoxProps extends BaseStyle, BoxNativeProps {
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
