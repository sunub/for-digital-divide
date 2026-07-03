import z from "zod";

const USERNAME_ERROR_MESSAGE = "사용자 이름이 올바르지 않습니다.";
export const EMAIL_ERROR_MESSAGE = "이메일 형식이 올바르지 않습니다.";
const PASSWORD_ERROR_MESSAGE = "비밀번호 형식이 올바르지 않습니다.";
const PASSWORD_REGEXES = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];
const DEFAULT_REGISTER_REDIRECT_PATH = "/onboarding";
export const ALLOWED_REGISTER_REDIRECT_PATHS = new Set([
  DEFAULT_REGISTER_REDIRECT_PATH,
  "/onboarding/login-selection?method=email&step=login",
]);

export type FormSchemaType = z.infer<typeof formSchema>;

export const formSchema = z.object({
  username: z.string().refine(
    (val) => {
      if (val.length < 2 || val.length > 20) return false;
      if (!/^[a-zA-Z가-힣]+$/.test(val)) return false;
      return true;
    },
    { error: USERNAME_ERROR_MESSAGE },
  ),
  email: z.string().email({ message: USERNAME_ERROR_MESSAGE }).trim(),
  password: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (
          val.length < 8 ||
          !PASSWORD_REGEXES.every((regex) => regex.test(val))
        ) {
          return false;
        }
        return true;
      },
      { error: PASSWORD_ERROR_MESSAGE },
    ),
});

export type FormInput = {
  username: string;
  email: string;
  password: string;
};
