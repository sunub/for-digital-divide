import { http } from 'msw';
import { SVG_HTMLS } from '@/constants/keypad';
import { shuffleArray, getSVGGrid } from '@/utils/keypad';
import { NextResponse } from 'next/server';
import * as v from 'valibot';

const gridItem = v.array(v.string(), [v.minLength(3), v.maxLength(3)]);

const SVGGridScheme = v.object({
  uid: v.string(),
  keypad: v.object({
    functionKeys: v.object({
      symbol: v.string(),
      rowIndex: v.string(),
      columnIndex: v.string(),
    }),
    size: v.object({
      row: v.string(),
      columns: v.string(),
    }),
    svgGrid: v.object({
      0: gridItem,
      1: gridItem,
      2: gridItem,
      3: gridItem,
    }),
  }),
});

export const handlers = [
  http.get('/api/keypad', () => {
    const shuffledArray = shuffleArray(SVG_HTMLS);
    const svgGrid = getSVGGrid(shuffledArray);
    const check = SVGGridScheme._parse(svgGrid);

    if (check.output === null) {
      return NextResponse.error();
    }

    return NextResponse.json(svgGrid);
  }),
];
