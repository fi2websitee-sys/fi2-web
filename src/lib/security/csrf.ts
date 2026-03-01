/**
 * CSRF Protection Utility
 * Generates and validates CSRF tokens for form submissions.
 *
 * NOTE: This utility is NOT wired up to any current API routes, and that is intentional.
 * All existing API endpoints (/api/auth/login, /api/contact, etc.) use JSON bodies,
 * which are inherently protected against CSRF attacks because:
 *   1. Browsers require a CORS preflight (OPTIONS) for cross-origin JSON POSTs, which
 *      our server does not permit for untrusted origins.
 *   2. Supabase auth cookies are set with SameSite protection at the library level.
 *
 * If a future endpoint accepts multipart/form-data or application/x-www-form-urlencoded,
 * wire up requireCSRF() in that route handler and send the token from getCSRFToken()
 * via the `x-csrf-token` request header.
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const CSRF_TOKEN_COOKIE = 'csrf-token';
const CSRF_TOKEN_HEADER = 'x-csrf-token';

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Get or create CSRF token for current session
 */
export async function getCSRFToken(): Promise<string> {
  const cookieStore = cookies();
  let token = cookieStore.get(CSRF_TOKEN_COOKIE)?.value;

  if (!token) {
    token = generateCSRFToken();
    cookieStore.set(CSRF_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
  }

  return token;
}

/**
 * Validate CSRF token from request
 */
export function validateCSRFToken(
  requestToken: string | null,
  cookieToken: string | null
): boolean {
  if (!requestToken || !cookieToken) {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(requestToken),
    Buffer.from(cookieToken)
  );
}

/**
 * Middleware to validate CSRF token for POST/PUT/DELETE requests
 */
export function requireCSRF(request: Request): { valid: boolean; error?: string } {
  // Only validate for state-changing methods
  const stateChangingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!stateChangingMethods.includes(request.method)) {
    return { valid: true };
  }

  const cookieStore = cookies();
  const cookieToken = cookieStore.get(CSRF_TOKEN_COOKIE)?.value || null;
  const requestToken = request.headers.get(CSRF_TOKEN_HEADER) || null;

  if (!validateCSRFToken(requestToken, cookieToken)) {
    return {
      valid: false,
      error: 'Invalid CSRF token',
    };
  }

  return { valid: true };
}
