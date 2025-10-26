import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = requestUrl.searchParams.get('next') ?? '/'

  // For backwards compatibility with code-based flow
  const code = requestUrl.searchParams.get('code')

  const supabase = await createClient()

  // Handle token_hash (email confirmation, password reset)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }

    return NextResponse.redirect(new URL('/login?error=auth_error', request.url))
  }

  // Handle code (OAuth, magic links with PKCE)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }

    return NextResponse.redirect(new URL('/login?error=auth_error', request.url))
  }

  // No valid parameters
  return NextResponse.redirect(new URL('/login?error=auth_error', request.url))
}
