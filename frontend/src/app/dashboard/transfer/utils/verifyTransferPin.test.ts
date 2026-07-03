import { describe, expect, it } from "vitest";
import type { KeypadDetail } from "@/entities/keypad/keypad.model";
import { verifyPinFromKeypad } from "./verifyTransferPin";

const keypad: KeypadDetail = {
  functionKeys: [],
  size: {
    row: 2,
    columns: 2,
  },
  svgGrid: [
    [
      { x: 10, y: 10, num: "1" },
      { x: 20, y: 10, num: "2" },
    ],
    [
      { x: 10, y: 20, num: "3" },
      { x: 20, y: 20, num: "4" },
    ],
  ],
};

describe("verifyPinFromKeypad", () => {
  it("accepts keypad coordinates that resolve to the registered PIN", () => {
    const result = verifyPinFromKeypad({
      keypad,
      registeredPin: "1234",
      pinnumbers: ["10,10", "20,10", "10,20", "20,20"],
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects keypad coordinates that do not match the registered PIN", () => {
    const result = verifyPinFromKeypad({
      keypad,
      registeredPin: "1234",
      pinnumbers: ["20,20", "10,20", "20,10", "10,10"],
    });

    expect(result).toEqual({
      success: false,
      message: "등록된 핀번호와 입력한 핀번호가 일치하지 않습니다.",
    });
  });
});
