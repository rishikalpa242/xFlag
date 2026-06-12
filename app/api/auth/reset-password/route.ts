import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token, password } = await request.json() as { token: string; password: string };

    if (!token || !password) {
      return NextResponse.json({ success: false, error: 'Token and new password are required' }, { status: 400 });
    }

    const user = await AdminUser.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Ensure token hasn't expired
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Hash new password and clear token
    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
