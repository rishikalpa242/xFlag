import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { readCmsData, writeCmsData } from '@/lib/cms';
import { verifyToken } from '@/lib/auth';
import type { CmsData } from '@/lib/types';

export async function GET() {
  const cms = await readCmsData();
  return NextResponse.json({ success: true, data: cms.header });
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const headerData = await request.json() as CmsData['header'];
  const cms = await readCmsData();
  cms.header = headerData;
  await writeCmsData(cms);
  revalidatePath('/', 'layout');

  return NextResponse.json({ success: true });
}
