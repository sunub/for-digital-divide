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
  svgGrid: z.array(
    z.array(
      z.object({
        x: z.number(),
        y: z.number(),
        num: z.string(),
      }),
    ),
  ),
});

export const KeypadInfoSchema = z.object({
  uid: z.string(),
  hashes: z.array(z.tuple([z.string(), z.number()])),
  keypad: KeypadDetailSchema,
});

export const SvgGridSchema = z.object({
  x: z.number(),
  y: z.number(),
  num: z.string(),
});
