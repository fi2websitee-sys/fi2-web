import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Get environment variables with fallbacks for build-time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  // If environment variables are missing during build, return a mock client
  // This prevents build failures while still failing at runtime if actually used
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build/prerender, return a minimal mock
    if (typeof window === 'undefined') {
      return null as any; // Build-time only, won't be used
    }
    // At runtime in browser, this should never happen if env vars are set correctly
    throw new Error('Supabase environment variables are not configured');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
