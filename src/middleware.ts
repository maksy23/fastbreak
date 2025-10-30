import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/lib/utils/env'

const { siteUrl, bypassAuth } = env

// Multi-layer safety check
const isDevelopment = process.env.NODE_ENV === 'development'
const isLocalhost = siteUrl?.includes('localhost') || siteUrl?.includes('127.0.0.1')
const bypassEnabled = bypassAuth === 'true'

// Only bypass if ALL conditions are met
const LOCAL_DEV_BYPASS_AUTH = isDevelopment && isLocalhost && bypassEnabled

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/signup', '/password-reset', '/auth/callback', '/update-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bypass auth for local development
  if (LOCAL_DEV_BYPASS_AUTH) {
    return NextResponse.next()
  }

  // Check if the current route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route))

  // Create Supabase client and update session
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // Get user session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user

  // If user is NOT authenticated and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user IS authenticated and trying to access auth pages (login/signup)
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
