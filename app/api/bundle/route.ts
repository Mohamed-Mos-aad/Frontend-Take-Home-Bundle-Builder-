import { NextResponse } from 'next/server';
import { bundleData } from '@/context/bundleData';

export async function GET() {
  return NextResponse.json(bundleData);
}
