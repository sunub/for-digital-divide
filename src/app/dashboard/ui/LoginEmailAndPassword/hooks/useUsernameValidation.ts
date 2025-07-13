'use client';

import { z } from 'zod';
import { useState } from 'react';

const USERNAME_ERROR_MESSAGE = '사용자 이름은 2자 이상 20자 이하의 한글 또는 영문 대소문자만 사용할 수 있습니다.';

const UsernameSchema = z
  .string({
    errorMap: () => ({
      message: USERNAME_ERROR_MESSAGE,
    }),
  })
  .min(2)
  .max(20)
  .regex(/^[a-zA-Z가-힣]+$/, {
    message: USERNAME_ERROR_MESSAGE,
  });

function useUsernameValidation(): [string | null, (value: unknown) => boolean] {
  const [error, setError] = useState<string | null>(null);

  const validateUsername = (value: unknown) => {
    if (typeof value !== 'string') {
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
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      } else {
        setError(USERNAME_ERROR_MESSAGE);
      }
      return false;
    }
  };

  return [error, validateUsername] as const;
}

export { UsernameSchema, useUsernameValidation };
