import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/utils/env'

export async function createClient() {
  const { supabase } = env
  const cookieStore = await cookies()

  const supabaseUrl = supabase.url
  const supabaseAnonKey = supabase.anonKey

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // TODO: Handle error in Server Component
        }
      },
    },
  })
}
