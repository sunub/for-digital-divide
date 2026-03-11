import clsx from "clsx";
import type { DetailedHTMLProps, FormHTMLAttributes, Ref } from "react";
import { splitProps } from "../styles/sprinkels.utils";
import { type BaseStyle, baseStyles } from "../styles/sprinkles.css";

type OriginFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface FormProps
  extends Omit<OriginFormProps, keyof BaseStyle | "action">,
    BaseStyle {
  ref?: Ref<HTMLFormElement>;
  action?: (payload: FormData) => void;
}

export function BaseForm({ ref, className, ...props }: FormProps) {
  const { atomProps, nativeProps } = splitProps(props);

  return (
    <form
      ref={ref}
      className={clsx(className, baseStyles(atomProps))}
      {...nativeProps}
    />
  );
}
