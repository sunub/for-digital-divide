import { Slot } from "@radix-ui/react-slot";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import type { BaseStyle } from "@/style/sprinkles.css";
import { buttonRecipe } from "./Button.css";

type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;

export type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  keyof NonNullable<ButtonRecipeVariants>
> &
  ButtonRecipeVariants & {
    asChild?: boolean;
  } & Omit<BaseStyle, "size">;

export function Button({
  asChild,
  className,
  variant = "default",
  size = "default",
  font = "default",
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={clsx(buttonRecipe({ variant, size, font }), className)}
      {...props}
    />
  );
}
