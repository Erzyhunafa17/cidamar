import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Jika mencoba mengakses halaman dasbor (tapi bukan halaman login)
  if (pathname.startsWith('/admin/dashboard')) {
    // Cek apakah ada cookie token
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Tidak ada token, arahkan ke halaman login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Jika mencoba mengakses halaman login tapi sudah punya token
  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Hanya jalankan middleware ini pada rute yang berawalan /admin
export const config = {
  matcher: ['/admin/:path*'],
};
