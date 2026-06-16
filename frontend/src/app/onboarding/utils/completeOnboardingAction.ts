"use server";

import crypto from "node:crypto";
import { userService } from "@/entities/users/users.service";
import {
  createCookieStorage,
  getCookieStorage,
} from "@/utils/cookies/createCookieStorage";

export async function completeOnboardingAction(data: { name: string }) {
  try {
    // 1. Check if there's already an rg_token
    const existingToken = await getCookieStorage("rg_token");
    if (existingToken && typeof existingToken.user_id === "number") {
      return {
        status: "success" as const,
        payload: ["기존 가입 정보가 유효합니다."],
      };
    }

    // 2. Create a new demo user in DB
    const demoUser = await userService.create({
      name: data.name,
      email: `demo_${crypto.randomBytes(4).toString("hex")}@example.com`,
      session_id: null,
    });

    if (!demoUser || typeof demoUser.user_id !== "number") {
      return {
        status: "error" as const,
        payload: ["사용자 생성에 실패했습니다."],
      };
    }

    // 3. Issue a new rg_token cookie containing user_id
    const provider_uid = crypto.randomBytes(16).toString("hex");
    await createCookieStorage(
      { user_id: demoUser.user_id, provider_uid },
      { name: "rg_token" },
    );

    return {
      status: "success" as const,
      payload: ["온보딩 처리가 완료되었습니다."],
    };
  } catch (error) {
    console.error("Complete onboarding error:", error);
    return {
      status: "error" as const,
      payload: ["온보딩 완료 처리 중 오류가 발생했습니다."],
    };
  }
}
