import { z } from "zod/v4";

export const VALID_NUMPAD_LENGTH = 4;
export const AxisSchema = z.string().refine((val) => {
  const numbers = val.split(",").map(Number);
  return numbers.length === 2 && numbers.every((num) => !Number.isNaN(num));
});

export const PinNumberSchema = z
  .array(AxisSchema)
  .nonempty()
  .refine((v) => v.length === VALID_NUMPAD_LENGTH, {
    message: "핀번호는 4자리여야 합니다.",
  });
