"use client";

import { TextField } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import { AtSignIcon, EyeClosedIcon, EyeIcon, KeySquare } from "lucide-react";
import { useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

const PASSWORD_HELPER_TEXT =
  "비밀번호는 최소 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.";

interface EmailAndPasswordFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  hasEmailError?: boolean;
  hasPasswordError?: boolean;
}

export function EmailAndPasswordField<TFieldValues extends FieldValues>({
  control,
  hasEmailError = false,
  hasPasswordError = false,
}: EmailAndPasswordFieldProps<TFieldValues>) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Flex direction={"column"}>
      <Flex direction="column" gap="1rem">
        <Controller
          control={control}
          name={"email" as Path<TFieldValues>}
          render={({ field, fieldState }) => (
            <TextField
              id="register-email__input-field"
              labelContent="이메일을 입력해주세요"
              autoComplete="email"
              isError={hasEmailError || Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
              leftElement={<AtSignIcon size={16} />}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name={"password" as Path<TFieldValues>}
          render={({ field, fieldState }) => (
            <TextField
              id="register-password__input-field"
              type={passwordVisible ? "text" : "password"}
              labelContent="비밀번호를 입력해주세요"
              autoComplete="new-password"
              isError={hasPasswordError || Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message ?? PASSWORD_HELPER_TEXT}
              leftElement={<KeySquare size={16} />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "inherit",
                  }}
                >
                  {passwordVisible ? (
                    <EyeIcon size={16} />
                  ) : (
                    <EyeClosedIcon size={16} />
                  )}
                </button>
              }
              {...field}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
