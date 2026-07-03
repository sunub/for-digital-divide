"use server";

import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { UsersSchema } from "@/entities/users/users.model";
import { userService } from "@/entities/users/users.service";
import { createSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";
import type { ActionState } from "../../types";
import {
  type EmailPasswordLoginFormInput,
  emailPasswordLoginFormSchema,
} from "../schema";

const UserIdSchema = UsersSchema.shape.user_id.nonoptional();

export async function emailPasswordLoginAction(
  prevState: ActionState,
  input: EmailPasswordLoginFormInput,
): Promise<ActionState> {
  const parsedFormData = emailPasswordLoginFormSchema.safeParse(input);
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

  const parsedUserId = UserIdSchema.safeParse(parsedUserInfo.data.user_id);
  if (!parsedUserId.success) {
    return {
      ...prevState,
      status: "error",
      payload: ["사용자 식별 정보가 올바르지 않습니다."],
    };
  }

  const user_id = parsedUserId.data;

  const passwordAuthMethod =
    await authMethodsService.findPasswordMethod(user_id);
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
  await userService.updateSessionIdByUserId(user_id, session_id);

  try {
    await createSessionCookieStorage({
      user_id,
      session_id,
    });
  } catch (error) {
    await userService.updateSessionIdByUserId(user_id, null);
    console.error("세션 쿠키 생성 중 오류 발생:", error);
    return {
      ...prevState,
      status: "error",
      payload: ["세션을 생성하는 중 오류가 발생했습니다."],
    };
  }

  return {
    ...prevState,
    user_id,
    status: "continue",
    payload: ["로그인에 성공했습니다."],
    nextStep: "seeding",
  };
}
