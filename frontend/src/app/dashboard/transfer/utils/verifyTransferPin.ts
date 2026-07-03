import type { KeypadDetail } from "@/entities/keypad/keypad.model";

export interface VerifyPinFromKeypadParams {
  keypad: KeypadDetail;
  registeredPin: string;
  pinnumbers: string[];
}

export type VerifyPinFromKeypadResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export function verifyPinFromKeypad({
  keypad,
  registeredPin,
  pinnumbers,
}: VerifyPinFromKeypadParams): VerifyPinFromKeypadResult {
  const flattenedKeypad = keypad.svgGrid.flat();
  const inputPin = pinnumbers
    .map((position) => {
      const [x, y] = position.split(",").map(Number);
      const key = flattenedKeypad.find((item) => item.x === x && item.y === y);
      return key?.num ?? "";
    })
    .join("");

  if (inputPin.length !== registeredPin.length) {
    return {
      success: false,
      message: "핀번호 입력 값이 유효하지 않습니다.",
    };
  }

  if (inputPin !== registeredPin) {
    return {
      success: false,
      message: "등록된 핀번호와 입력한 핀번호가 일치하지 않습니다.",
    };
  }

  return { success: true };
}
