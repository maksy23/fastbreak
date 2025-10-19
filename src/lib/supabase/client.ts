import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

export function createClient() {
  const { supabase } = env
  return createBrowserClient(supabase.url, supabase.anonKey)
}
