'use client';

import { z } from 'zod';
import { useState } from 'react';

const EMAIL_ERROR_MESSAGE = '이메일 형식이 올바르지 않습니다.';
const EmailSchema = z
  .string({
    errorMap: () => ({
      message: EMAIL_ERROR_MESSAGE,
    }),
  })
  .trim()
  .email({
    message: EMAIL_ERROR_MESSAGE,
  });

function useEmailValidation(): [string | null, (value: unknown) => boolean] {
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (value: unknown) => {
    if (typeof value !== 'string') {
      setError(EMAIL_ERROR_MESSAGE);
      return false;
    }
    if (value.length === 0) {
      setError(null);
      return true;
    }

    try {
      EmailSchema.parse(value);
      setError(null);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      } else {
        setError(EMAIL_ERROR_MESSAGE);
      }
      return false;
    }
  };

  return [error, validateEmail] as const;
}

export { useEmailValidation, EmailSchema };
