function getEnvVar(key: string): string {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}

export const env = {
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL'),
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
} as const
