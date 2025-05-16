// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Check if the request is for an API route
  if (req.nextUrl.pathname.startsWith('/api/')) {
    // Set CORS headers
    response.headers.append('Access-Control-Allow-Credentials', 'true');
    response.headers.append(
      'Access-Control-Allow-Origin',
      'https://curait.vercel.app'
    );
    response.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization, Date, X-Api-Version'
    );
    response.headers.append(
        'Permissions-Policy',
        'encrypted-media=*'
      );
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
