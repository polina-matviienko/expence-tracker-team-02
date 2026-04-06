import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRIVATE_ROUTES = ['/transactions'];
const AUTH_ROUTES = ['/login', '/register'];
const API_URL =
  process.env.API_URL || 'https://expense-tracker-v2.b.goit.study';

type ParsedCookie = {
  name: string;
  value: string;
  path?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
};

function getSetCookieValues(headers: Headers): string[] {
  const arrayApi = (headers as unknown as { getSetCookie?: () => string[] })
    .getSetCookie?.();
  if (Array.isArray(arrayApi)) return arrayApi;

  const list: string[] = [];
  headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') list.push(value);
  });
  return list;
}

function parseSetCookieHeader(headers: Headers): ParsedCookie[] {
  const cookieStrings = getSetCookieValues(headers);
  if (!cookieStrings.length) return [];

  return cookieStrings
    .map((cookieStr) => {
      const parts = cookieStr.split(';').map((p) => p.trim());
      const [nameValue, ...attrParts] = parts;
      if (!nameValue) return null;

      const eqIndex = nameValue.indexOf('=');
      if (eqIndex === -1) return null;

      const name = nameValue.slice(0, eqIndex).trim();
      const value = nameValue.slice(eqIndex + 1);

      const parsed: ParsedCookie = { name, value };

      for (const attr of attrParts) {
        const [rawKey, rawVal] = attr.split('=');
        const key = rawKey?.toLowerCase();
        const val = rawVal?.trim();
        if (!key) continue;

        switch (key) {
          case 'path':
            parsed.path = val;
            break;
          case 'max-age': {
            const num = Number(val);
            if (!Number.isNaN(num)) parsed.maxAge = num;
            break;
          }
          case 'expires':
            if (val) {
              const dt = new Date(val);
              if (!Number.isNaN(dt.getTime())) parsed.expires = dt;
            }
            break;
          case 'httponly':
            parsed.httpOnly = true;
            break;
          case 'secure':
            parsed.secure = true;
            break;
          case 'samesite': {
            const lowered = val?.toLowerCase();
            if (lowered === 'lax' || lowered === 'strict' || lowered === 'none')
              parsed.sameSite = lowered as ParsedCookie['sameSite'];
            break;
          }
        }
      }

      return parsed;
    })
    .filter((c): c is ParsedCookie => Boolean(c));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  let nextAccessToken = accessToken;
  let nextRefreshToken = refreshToken;

  const response = NextResponse.next();


  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await fetch(`${API_URL}/auth/session`, {
        method: 'GET',
        headers: { Cookie: `refreshToken=${refreshToken}` },
        cache: 'no-store',
      });

      const parsedCookies = parseSetCookieHeader(sessionResponse.headers);

      if (parsedCookies.length) {
        for (const cookie of parsedCookies) {
          response.cookies.set(cookie.name, cookie.value, {
            httpOnly: cookie.httpOnly ?? true,
            secure:
              cookie.secure ?? (process.env.NODE_ENV || '').startsWith('prod'),
            sameSite: cookie.sameSite ?? 'lax',
            path: cookie.path || '/',
            maxAge: cookie.maxAge,
            expires: cookie.expires,
          });

          if (cookie.name === 'accessToken') nextAccessToken = cookie.value;
          if (cookie.name === 'refreshToken') nextRefreshToken = cookie.value;
        }
      } else if (!sessionResponse.ok) {
        nextAccessToken = undefined;
        nextRefreshToken = undefined;
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
      }
    } catch {
      nextAccessToken = undefined;
      nextRefreshToken = undefined;
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
    }
  }

  const isAuthenticated = Boolean(nextAccessToken || nextRefreshToken);

/*
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
*/


  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/transactions/expenses', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/transactions/:path*', '/login', '/register'],
};
