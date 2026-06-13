import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import { readCmsData, writeCmsData } from '@/lib/cms';
import { verifyToken } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
type LogoField = 'logo1' | 'logo2' | 'footerLogo';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const logoField = formData.get('field') as LogoField | null;

  if (!file || !logoField) {
    return NextResponse.json({ success: false, error: 'file and field are required' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ success: false, error: 'Invalid file type. Use JPEG, PNG, WebP, GIF, or SVG.' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ success: false, error: 'File too large. Maximum 5 MB.' }, { status: 400 });
  }

  const ext = path.extname(file.name) || '.png';
  const filename = `${logoField}-${Date.now()}${ext}`;
  const dest = path.join(process.cwd(), 'public', 'assets', 'images', filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(dest, buffer);

  const publicPath = `/assets/images/${filename}`;

  const cms = await readCmsData();
  if (logoField === 'logo1') cms.header.logo1 = publicPath;
  else if (logoField === 'logo2') cms.header.logo2 = publicPath;
  else if (logoField === 'footerLogo') cms.footer.logo = publicPath;

  await writeCmsData(cms);
  revalidatePath('/', 'layout');

  return NextResponse.json({ success: true, data: { path: publicPath } });
}
