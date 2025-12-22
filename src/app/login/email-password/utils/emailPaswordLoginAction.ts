"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import z from "zod/v4";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { UsersSchema } from "@/entities/users/users.model";
import { userService } from "@/entities/users/users.service";
import { createSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";
import type { ActionState } from "../../types";

const EMAIL_ERROR_MESSAGE = "이메일 형식이 올바르지 않습니다.";
const PASSWORD_ERROR_MESSAGE = "비밀번호 형식이 올바르지 않습니다.";
const PASSWORD_REGEXES = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/];

const formSchema = z.object({
  email: z
    .email({
      error: () => ({
        message: EMAIL_ERROR_MESSAGE,
      }),
    })
    .trim(),
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

type FormInput = {
  email: string;
  password: string;
};

export async function emailPasswordLoginAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  const input: FormInput = {
    email: typeof rawEmail === "string" ? rawEmail : "",
    password: typeof rawPassword === "string" ? rawPassword : "",
  };

  const parsedFormData = formSchema.safeParse(input);
  if (!parsedFormData.success) {
    return {
      ...prevState,
      status: "error",
      payload: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const userInfo = await userService.findByEmail(parsedFormData.data.email);
  const parsedUserInfo = UsersSchema.safeParse(userInfo);
  if (!parsedUserInfo.success) {
    return {
      ...prevState,
      status: "error",
      payload: ["사용자를 찾을 수 없습니다."],
    };
  }

  const { user_id } = parsedUserInfo.data;

  const usersAuthMethods = await authMethodsService.findByUserId(user_id);
  const passwordAuthMethod = usersAuthMethods.find(
    (method) => method.method === "PASSWORD",
  );
  if (!passwordAuthMethod) {
    return {
      ...prevState,
      status: "error",
      payload: ["비밀번호 인증 방법이 설정되어 있지 않습니다."],
    };
  }
  const isValidPassword = bcrypt.compareSync(
    parsedFormData.data.password,
    passwordAuthMethod.credential,
  );
  if (!isValidPassword) {
    return {
      ...prevState,
      status: "error",
      payload: ["비밀번호가 일치하지 않습니다."],
    };
  }

  const session_id = crypto.randomBytes(16).toString("hex");
  await createSessionCookieStorage({
    user_id,
    session_id,
  });

  return {
    ...prevState,
    user_id,
    status: "continue",
    payload: ["로그인에 성공했습니다."],
    nextStep: "seeding",
  };
}
