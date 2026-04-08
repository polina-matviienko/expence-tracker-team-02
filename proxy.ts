import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSessionServer } from './lib/api/serverApi';

const privateRoutes = ['/history', '/transactions'];
const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublic = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

  if ((accessToken || refreshToken) && isPublic) {
    try {
      const response = await checkSessionServer();
      if (response.status === 200) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Session validation failed:', error);
      const res = NextResponse.next();
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      return res;
    }
  }

  if (!accessToken && refreshToken) {
    try {
      const response = await checkSessionServer();
      const setCookie = response.headers['set-cookie'];

      if (setCookie) {
        const res = isPublic
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const match = cookieStr.match(/^([^=]+)=([^;]*)/);
          if (!match) continue;

          const [, name, value] = match;
          const parsed = parse(cookieStr);

          const options = {
            path: parsed.Path || '/',
            maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          };

          if (name === 'accessToken' && value) {
            res.cookies.set('accessToken', value, options);
          }
          if (name === 'refreshToken' && value) {
            res.cookies.set('refreshToken', value, options);
          }
        }
        return res;
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
      const res = NextResponse.redirect(new URL('/login', request.url));
      res.cookies.delete('accessToken');
      res.cookies.delete('refreshToken');
      return res;
    }
  }

  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/history/:path*', '/transactions/:path*', '/login', '/register'],
};
