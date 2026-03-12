"use server";

import crypto from "node:crypto";
import type { ActionState } from "@/app/login/types";
import { getAuthState } from "@/entities/auth/session.server";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { PinNumberFormSchema } from "@/entities/keypad/keypad.model";
import { UsersSchema } from "@/entities/users/users.model";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import { createPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { setFlashMessageCookie } from "@/utils/cookies/setFlashMessageCookie";

const UserIdSchema = UsersSchema.shape.user_id.nonoptional();

export async function pinRegisterAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const data = {
    pinnumbers: formData.getAll("pinnumbers") as string[],
    pointer: formData.get("pointer"),
    device: formData.get("device"),
  };

  const parsedFormData = PinNumberFormSchema.safeParse(data, {
    error: (iss) => {
      if (
        iss.code === "invalid_type" ||
        (iss.expected === "array" && iss.received === "string")
      ) {
        return { message: "핀번호는 4자리여야 합니다." };
      }
      return { message: "입력된 데이터가 유효하지 않습니다." };
    },
  });
  if (!parsedFormData.success) {
    console.error("Pin Register Parse Error:", parsedFormData.error);
    return {
      ...prevState,
      status: "error",
      payload: ["입력된 데이터가 유효하지 않습니다."],
    };
  }

  const { session } = await getAuthState();
  if (!session) {
    return {
      ...prevState,
      status: "error",
      payload: ["세션이 존재하지 않습니다. 다시 로그인해주세요."],
    };
  }

  const deviceUId = crypto.randomBytes(16).toString("hex");
  const pinnumbers = parsedFormData.data.pinnumbers;

  let inputOriginPinNumber: string[];
  try {
    const { keypad } = await getKeypadData();
    const registerdShuffledKeypad = keypad.svgGrid;
    const flattenedKeypad = registerdShuffledKeypad.flat();

    inputOriginPinNumber = pinnumbers.map((pos) => {
      const [x, y] = pos.split(",").map(Number);
      const foundKey = flattenedKeypad.find(
        (key) => key.x === x && key.y === y,
      );
      if (!foundKey) {
        return "";
      }
      return foundKey.num;
    });
  } catch (error) {
    console.error("Pin Register Keypad Error:", error);
    return {
      ...prevState,
      status: "error",
      payload: ["핀번호 입력 데이터가 유효하지 않습니다."],
    };
  }

  if (inputOriginPinNumber.some((value) => value === "")) {
    return {
      ...prevState,
      status: "error",
      payload: ["핀번호 입력 값이 유효하지 않습니다."],
    };
  }

  const parsedUserId = UserIdSchema.safeParse(session.user_id);
  if (!parsedUserId.success) {
    return {
      ...prevState,
      status: "error",
      payload: ["유효하지 않은 사용자 ID입니다."],
    };
  }

  try {
    await authMethodsService.upsertDataByUserId({
      user_id: parsedUserId.data,
      method: "PIN",
      credential: inputOriginPinNumber.join(""),
      provider: "local",
      provider_uid: deviceUId,
    });

    await createPermanentCookieStorage(
      {
        device_id: deviceUId,
      },
      {
        name: "en_device",
      },
    );

    await setFlashMessageCookie("핀번호가 성공적으로 등록되었습니다.");
    return {
      ...prevState,
      status: "success",
      payload: ["핀번호가 성공적으로 등록되었습니다."],
    };
  } catch (error) {
    console.error("Pin register persist error:", error);
    return {
      ...prevState,
      status: "error",
      payload: ["핀번호 등록 중 오류가 발생했습니다."],
    };
  }
}
