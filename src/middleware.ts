import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { addSecurityHeaders } from '@/lib/security/headers'
import { logger } from '@/lib/utils/logger'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // If Supabase not configured, just add security headers and continue
    // Admin routes will be handled by page-level checks
    return addSecurityHeaders(response)
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        })
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        response.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect admin routes - check if user is authenticated AND is admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (!user) {
        const redirectResponse = NextResponse.redirect(new URL('/login', request.url))
        return addSecurityHeaders(redirectResponse)
      }

      // Verify user is actually an admin (not just authenticated)
      const { data: adminProfile, error } = await supabase
        .from('admin_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !adminProfile || !['admin', 'super_admin'].includes(adminProfile.role)) {
        const forbiddenResponse = NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
        return addSecurityHeaders(forbiddenResponse)
      }
    }

    // Redirect logged-in users away from login page
    if (request.nextUrl.pathname === '/login' && user) {
      const redirectResponse = NextResponse.redirect(new URL('/admin', request.url))
      return addSecurityHeaders(redirectResponse)
    }
  } catch (error) {
    // If there's an error (e.g., database connection), allow request through
    // Page-level checks will handle authentication
    logger.error('Middleware error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      pathname: request.nextUrl.pathname,
    });
  }

  // Add security headers to all responses
  return addSecurityHeaders(response)
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
