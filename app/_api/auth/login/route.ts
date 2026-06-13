import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await request.json() as { email: string; password: string };

    // Auto-seed an admin if none exists (for convenience)
    const adminCount = await AdminUser.countDocuments();
    if (adminCount === 0) {
      const defaultHash = await bcrypt.hash('Admin@123!XFF', 10);
      await AdminUser.create({ email: 'admin@xflagfootball.com', passwordHash: defaultHash });
    }

    const user = await AdminUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await createToken(email);

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
