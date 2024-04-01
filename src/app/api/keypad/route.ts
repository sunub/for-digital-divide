import { NextResponse } from 'next/server';
import { getSVGGrid } from '@/utils/keypad';

export function GET() {
  const svgGrid = getSVGGrid();
  return NextResponse.json(svgGrid);
}
