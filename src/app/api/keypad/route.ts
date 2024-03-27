import { NextResponse } from 'next/server';
import { SVG_HTMLS } from '@/constants/keypad';
import { shuffleArray, getSVGGrid } from '@/utils/keypad';

export function GET() {
  const shuffledArray = shuffleArray(SVG_HTMLS);
  const svgGrid = getSVGGrid(shuffledArray);
  return NextResponse.json(svgGrid);
}
