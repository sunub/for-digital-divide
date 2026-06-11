import { Flex } from "@internal/design-system/primitives";
import clsx from "clsx";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useId, useState } from "react";
import { passwordVisibilityIconButton } from "../PasswordInput/ui/PasswordInput.css";
import * as style from "./TextField.css";

interface TextFieldProps extends Omit<ComponentProps<"input">, "ref"> {
  labelContent: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  isError?: boolean;
  errorMessageId?: string;
  ref?: React.Ref<HTMLInputElement>;
  passwordVisibility?: boolean;
}

export function TextField({
  id,
  labelContent,
  leftIcon,
  rightElement,
  isError = false,
  errorMessageId,
  onFocus,
  onBlur,
  className,
  passwordVisibility = false,
  ref,
  ...props
}: TextFieldProps) {
  const internalId = useId();
  const inputId = id || internalId;
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisibilityState, setPasswordVisibility] = useState("password");

  return (
    <Flex direction={"column"} placeItems={"center"} gap={"1rem"}>
      <div className={style.inputContainer}>
        <div className={style.inputWrapper({ isError })}>
          <label
            htmlFor={inputId}
            className={style.placeholder({
              isFocused: isFocused ? true : props.value !== "",
            })}
          >
            {labelContent}
          </label>
          {leftIcon && (
            <div className={style.iconWrapper({ isTyping: isFocused })}>
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(style.input, className)}
            type={passwordVisibility ? passwordVisibilityState : props.type}
            aria-invalid={isError}
            aria-describedby={
              isError && errorMessageId ? errorMessageId : undefined
            }
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {rightElement && <>{rightElement}</>}
          {passwordVisibility && (
            <button
              type="button"
              onFocus={() => setIsFocused(true)}
              onClick={() =>
                setPasswordVisibility((prev) =>
                  prev === "password" ? "text" : "password",
                )
              }
              className={clsx(
                style.suffixIconWrapper,
                passwordVisibilityIconButton({ isFocused: true }),
              )}
            >
              {passwordVisibilityState === "password" ? (
                <EyeClosedIcon size={"16px"} />
              ) : (
                <EyeIcon size={"16px"} />
              )}
            </button>
          )}
        </div>
      </div>
    </Flex>
  );
}
