"use client";

import { useState } from "react";
import { PasswordSchema } from "@/components/PasswordInput/types";

const PASSWORD_ERROR_MESSAGE =
  "비밀번호는 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.";

export function usePasswordValidation() {
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (value: unknown) => {
    if (typeof value !== "string") {
      setError(PASSWORD_ERROR_MESSAGE);
      return false;
    }
    if (value.length === 0) {
      setError(null);
      return true;
    }
    const validateResult = PasswordSchema.safeParse(value);
    if (!validateResult.success) {
      setError(PASSWORD_ERROR_MESSAGE);
    }
    return validateResult.success;
  };

  return [error, validatePassword] as const;
}
