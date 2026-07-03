import { z } from "zod";

export const EMAIL_ERROR_MESSAGE = "이메일 형식이 올바르지 않습니다.";
export const PASSWORD_ERROR_MESSAGE = "비밀번호 형식이 올바르지 않습니다.";

const PASSWORD_REGEXES: RegExp[] = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];

export const emailPasswordLoginFormSchema = z.object({
  email: z.string().trim().email({ message: EMAIL_ERROR_MESSAGE }),
  password: z
    .string()
    .trim()
    .refine(
      (value: string): boolean =>
        value.length >= 8 &&
        PASSWORD_REGEXES.every((regex: RegExp): boolean => regex.test(value)),
      { message: PASSWORD_ERROR_MESSAGE },
    ),
});

export type EmailPasswordLoginFormInput = z.infer<
  typeof emailPasswordLoginFormSchema
>;
