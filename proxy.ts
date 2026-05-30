import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// /checkout and /cart are intentionally excluded — auth is enforced client-side via modal popup.
const PROTECTED = ['/profile', '/orders', '/wishlist']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  if (isProtected) {
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/orders/:path*', '/wishlist/:path*'],
}
