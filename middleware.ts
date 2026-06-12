import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

function getSecret(): Uint8Array {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'change-this-to-a-secure-random-string-in-production'
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password'
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, getSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
