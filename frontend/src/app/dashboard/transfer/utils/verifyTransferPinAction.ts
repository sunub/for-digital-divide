"use server";

import type { ActionState } from "@/app/onboarding/types";
import { AuthMethodSchema } from "@/entities/auth_methods/auth_methods.model";
import { authMethodsService } from "@/entities/auth_methods/auth_methods.service";
import { DeviceIdSchema } from "@/entities/cookies/cookies.model";
import { PinNumberFormSchema } from "@/entities/keypad/keypad.model";
import { getKeypadData } from "@/shared/utils/getKeypadData";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { verifyPinFromKeypad } from "./verifyTransferPin";

export async function verifyTransferPinAction(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const data = {
    pinnumbers: formData.getAll("pinnumbers") as string[],
    pointer: formData.get("pointer"),
    device: formData.get("device"),
  };

  const parsedFormData = PinNumberFormSchema.safeParse(data, {
    error: (issue) => {
      if (
        issue.code === "invalid_type" ||
        (issue.expected === "array" && issue.received === "string")
      ) {
        return { message: "핀번호는 4자리여야 합니다." };
      }
      return { message: "입력된 데이터가 유효하지 않습니다." };
    },
  });

  if (!parsedFormData.success) {
    return {
      ...prevState,
      status: "error",
      payload: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const device = await getPermanentCookieStorage("en_device");
  const parsedDeviceId = DeviceIdSchema.safeParse(device);
  if (!parsedDeviceId.success) {
    return {
      ...prevState,
      status: "error",
      payload: ["등록된 기기 정보가 없습니다."],
    };
  }

  const registeredPinInfo = await authMethodsService.findByProviderUidAndMethod(
    parsedDeviceId.data.device_id,
    "PIN",
  );
  const parsedRegisteredPinInfo = AuthMethodSchema.safeParse(registeredPinInfo);

  if (!parsedRegisteredPinInfo.success) {
    return {
      ...prevState,
      status: "error",
      payload: ["등록된 핀번호 정보가 없습니다."],
    };
  }

  const { keypad } = await getKeypadData();
  const pinResult = verifyPinFromKeypad({
    keypad,
    registeredPin: parsedRegisteredPinInfo.data.credential,
    pinnumbers: parsedFormData.data.pinnumbers,
  });

  if (!pinResult.success) {
    return {
      ...prevState,
      status: "error",
      payload: [pinResult.message],
    };
  }

  return {
    ...prevState,
    status: "success",
    payload: ["핀번호가 성공적으로 인증되었습니다."],
  };
}
