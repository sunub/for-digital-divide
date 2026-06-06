import { z } from "zod/v4";

export interface KeypadInfo {
  uid: string;
  hashes: [string, number][];
  keypad: KeypadDetail;
}

export interface SvgGrid {
  x: number;
  y: number;
  num: string;
}

export interface KeypadDetail {
  functionKeys: {
    symbol: string;
    rowIndex: number;
    columnIndex: number;
  }[];
  size: {
    row: number;
    columns: number;
  };
  svgGrid: SvgGrid[][];
}

export const SvgGridSchema = z.object({
  x: z.number(),
  y: z.number(),
  num: z.string(),
});

export const KeypadDetailSchema = z.object({
  functionKeys: z.array(
    z.object({
      symbol: z.string(),
      rowIndex: z.number(),
      columnIndex: z.number(),
    }),
  ),
  size: z.object({
    row: z.number(),
    columns: z.number(),
  }),
  svgGrid: z.array(z.array(SvgGridSchema)),
});

export const KeypadInfoSchema = z.object({
  uid: z.string(),
  hashes: z.array(z.tuple([z.string(), z.number()])),
  keypad: KeypadDetailSchema,
});

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

export const PinNumberFormSchema = z.object({
  pinnumbers: PinNumberSchema,
  pointer: z.any(),
  device: z.any(),
});
