import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import { AdminUser } from '@/models/AdminUser';
import { verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.email) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Current and new passwords are required' }, { status: 400 });
    }

    // Find the current admin
    const admin = await AdminUser.findOne({ email: payload.email });
    
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 404 });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Incorrect current password' }, { status: 401 });
    }

    // Hash and save new password
    const newHash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = newHash;
    await admin.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
