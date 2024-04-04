import { NextRequest, NextResponse } from 'next/server';

export function POST(req: NextRequest) {
  console.log('Request body:', req.body);
  return NextResponse.json({ message: 'Hello, World!' });
}
