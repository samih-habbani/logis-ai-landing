import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const auth = req.cookies.get('dashboard_auth')?.value
    const PASS = process.env.DASHBOARD_PASSWORD ?? 'LogeeSkoul2026!'
    if (auth !== PASS) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('next', req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
