import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";
import { forwardRef, useId } from "react";
import * as style from "./TextField.css";

export interface TextFieldProps extends Omit<ComponentProps<"input">, "ref"> {
  labelContent?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  isError?: boolean;
  errorMessage?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      labelContent,
      leftElement,
      rightElement,
      isError = false,
      errorMessage,
      className,
      ...props
    },
    ref,
  ) => {
    const internalId = useId();
    const inputId = id || internalId;

    return (
      <div className={style.inputGroup}>
        {labelContent && (
          <label htmlFor={inputId} className={style.labelStyle}>
            {labelContent}
          </label>
        )}
        <div className={clsx(className, style.inputWrapper({ isError }))}>
          {leftElement && (
            <div className={style.leftElementWrapper}>{leftElement}</div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={style.inputField}
            aria-invalid={isError}
            aria-describedby={
              isError && errorMessage ? `${inputId}-error` : undefined
            }
            {...props}
          />
          {rightElement && (
            <div className={style.rightElementWrapper}>{rightElement}</div>
          )}
        </div>
        {isError && errorMessage && (
          <div id={`${inputId}-error`} className={style.errorText}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
