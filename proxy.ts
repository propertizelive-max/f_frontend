import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_AUTH_ROUTES = ['/login', '/register', '/forgot-password']

const PROTECTED = ['/account', '/orders', '/wishlist', '/checkout', '/addresses', '/profile']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('accessToken')?.value

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const isPublicAuth = PUBLIC_AUTH_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  if (isPublicAuth && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/account/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/checkout/:path*',
    '/addresses/:path*',
    '/profile/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
}
