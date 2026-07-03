"use server";

import { userService } from "@entities/users/users.service";
import bcrypt from "bcryptjs";
// @ts-expect-error: Next.js internal export
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ActionState } from "@/app/onboarding/types";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { createCookieStorage } from "@/utils/cookies/createCookieStorage";
import { setFlashMessageCookie } from "@/utils/cookies/setFlashMessageCookie";
import { FormInput, formSchema } from "../types";

import { ALLOWED_REGISTER_REDIRECT_PATHS } from "../types";

const DEFAULT_REGISTER_REDIRECT_PATH = "/onboarding";

function getRegisterRedirectPath(value?: string | null): string {
  if (!value) {
    return DEFAULT_REGISTER_REDIRECT_PATH;
  }

  return ALLOWED_REGISTER_REDIRECT_PATHS.has(value)
    ? value
    : DEFAULT_REGISTER_REDIRECT_PATH;
}

export async function registerUser(
  data: FormInput,
  redirectTo?: string
): Promise<{ success: boolean; error?: string }> {
  const parsedFormData = formSchema.safeParse(data);

  if (!parsedFormData.success) {
    return {
      success: false,
      error: parsedFormData.error.issues[0]?.message || "입력값이 올바르지 않습니다.",
    };
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("en_session");
  const redirectPath = getRegisterRedirectPath(redirectTo);

  if (sessionCookie) {
    setFlashMessageCookie("기존의 세션이 존재합니다.");
    redirect(redirectPath);
  }

  try {
    const { username, email, password } = parsedFormData.data;
    const provider_uid = bcrypt.hashSync(`${Date.now()}-${Math.random()}`, 10);

    const user = await userService.upsertSessionByUsernameAndEmail(
      username,
      email,
    );
    await authMethodsService.upsertDataByUserId({
      user_id: user.user_id,
      method: "PASSWORD",
      credential: bcrypt.hashSync(password, 10),
      provider: "local",
      provider_uid,
    });

    await createCookieStorage(
      { user_id: user.user_id, provider_uid },
      { name: "rg_token" },
    );

    setFlashMessageCookie("사용자 이름이 성공적으로 등록되었습니다.");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      error: "서버 처리 중 오류가 발생했습니다.",
    };
  }

  redirect(redirectPath);
}
