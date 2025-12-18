import { z } from "zod/v4";
import { PinNumberSchema } from "./keypad";

export const PinNumberFormSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});
