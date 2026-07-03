"use client";

import { useState } from "react";
import { z } from "zod";

export const USERNAME_ERROR_MESSAGE =
  "사용자 이름은 2자 이상 20자 이하의 한글 또는 영문 대소문자만 사용할 수 있습니다.";

const UsernameSchema = z
  .string({
    error() {
      return USERNAME_ERROR_MESSAGE;
    },
  })
  .min(2)
  .max(20)
  .regex(/^[a-zA-Z가-힣]+$/, {
    message: USERNAME_ERROR_MESSAGE,
  });

export function validateUsername(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }
  if (value.length === 0) {
    return true;
  }

  try {
    UsernameSchema.parse(value);
    return true;
  } catch (_e) {
    return false;
  }
}

export function useUsernameValidation(): [
  string | null,
  (value: unknown) => boolean,
] {
  const [error, setError] = useState<string | null>(null);

  const validateUsername = (value: unknown) => {
    if (typeof value !== "string") {
      setError(USERNAME_ERROR_MESSAGE);
      return false;
    }
    if (value.length === 0) {
      setError(null);
      return true;
    }

    try {
      UsernameSchema.parse(value);
      setError(null);
      return true;
    } catch (_e) {
      setError(USERNAME_ERROR_MESSAGE);
      return false;
    }
  };

  return [error, validateUsername] as const;
}
