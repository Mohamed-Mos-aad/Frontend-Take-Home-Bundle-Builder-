import { NextResponse } from 'next/server';
import { bundleData } from '@/context/bundleData';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(bundleData);
}
