import { Slot } from "@radix-ui/react-slot";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import clsx from "clsx";
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import {
  buttonContentClass,
  buttonRecipe,
  pendingBlockVariants,
  pendingBottomClass,
  pendingOverlayClass,
} from "./Button.css";

type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;
type ButtonVariantKeys = keyof NonNullable<ButtonRecipeVariants>;
const pendingBlocks = [
  { key: "first", className: pendingBlockVariants.first },
  { key: "second", className: pendingBlockVariants.second },
  { key: "third", className: pendingBlockVariants.third },
  { key: "fourth", className: pendingBlockVariants.fourth },
  { key: "fifth", className: pendingBlockVariants.fifth },
] as const;

export type ButtonStatus = "idle" | "pending";

type ButtonOwnProps = ButtonRecipeVariants & {
  className?: string;
};

export type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariantKeys | "className"
> &
  ButtonOwnProps & {
    asChild?: false;
    status?: ButtonStatus;
    ref?: Ref<HTMLButtonElement>;
  };

export type SlottableButtonProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className"
> &
  ButtonOwnProps & {
    asChild: true;
    children: ReactElement;
    status?: never;
    ref?: Ref<HTMLElement>;
  };

export type ButtonProps = NativeButtonProps | SlottableButtonProps;

export function Button(props: ButtonProps) {
  const status = props.asChild ? "idle" : (props.status ?? "idle");
  const isPending = status === "pending";
  const className = clsx(
    buttonRecipe({
      variant: props.variant ?? "default",
      size: props.size ?? "default",
      font: props.font ?? "default",
      status,
    }),
    props.className,
  );

  if (props.asChild) {
    const {
      asChild: _asChild,
      children,
      className: _className,
      font: _font,
      ref,
      size: _size,
      status: _status,
      variant: _variant,
      ...slotProps
    } = props;

    return (
      <Slot ref={ref} className={className} {...slotProps}>
        {children}
      </Slot>
    );
  }

  const {
    asChild: _asChild,
    className: _className,
    children,
    disabled,
    font: _font,
    ref,
    size: _size,
    status: _status,
    type = "button",
    variant: _variant,
    ...buttonProps
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      disabled={disabled || isPending}
      aria-busy={isPending || undefined}
      {...buttonProps}
    >
      {!isPending ? (
        <span className={buttonContentClass}>{children}</span>
      ) : null}
      {isPending ? (
        <>
          <span aria-hidden="true" className={pendingOverlayClass}>
            {pendingBlocks.map(({ key, className }) => (
              <span key={key} className={className} />
            ))}
          </span>
          <span aria-hidden="true" className={pendingBottomClass} />
        </>
      ) : null}
    </button>
  );
}
