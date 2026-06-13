import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json() as { email: string };

    const user = await AdminUser.findOne({ email });
    if (!user) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json({ success: true, message: 'If that email exists, a reset link has been generated.' });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;
    
    // In a real app, send an email here using Resend, Nodemailer, etc.
    // For now, we log it to the console so the user can test the flow.
    console.log('\n======================================================');
    console.log('PASSWORD RESET LINK GENERATED:');
    console.log(resetUrl);
    console.log('======================================================\n');

    return NextResponse.json({ success: true, message: 'Reset link generated. Check server console.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
