import { z } from "zod";

export const OTP_CODE_LENGTH = 6;
export const OTP_TIME_LIMIT_SECONDS = 180;

export const OTP_FIELD_IDS = {
  input: "verify-otp-code-input",
  timer: "verify-otp-timer",
  error: "verify-otp-error",
} as const;

export const OTP_ERROR_MESSAGES = {
  required: "인증번호를 입력해 주세요.",
  invalid: "인증번호는 6자리 숫자여야 합니다.",
  expired: "인증번호의 유효기간이 지나서 잘못되었습니다. 다시 요청해주세요.",
  mismatch: "인증번호가 일치하지 않습니다. 다시 확인해 주세요.",
} as const;

export const otpSchema = z.object({
  otpCode: z
    .string()
    .min(1, { message: OTP_ERROR_MESSAGES.required })
    .regex(/^\d{6}$/, { message: OTP_ERROR_MESSAGES.invalid }),
});

export type OtpFormData = z.infer<typeof otpSchema>;

export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function normalizeOtpInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, OTP_CODE_LENGTH);
}

export function formatOtpTimer(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatOtpAccessibleTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
}
