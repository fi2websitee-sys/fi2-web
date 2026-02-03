/**
 * Security Headers Middleware
 * Implements OWASP security headers recommendations
 */

import { NextResponse } from 'next/server';

export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  // In production, remove 'unsafe-eval' and 'unsafe-inline' for scripts
  const isProduction = process.env.NODE_ENV === 'production';
  const scriptSrc = isProduction
    ? "script-src 'self'" // Production: strict CSP
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'"; // Dev: Next.js requires these

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'", // CSS-in-JS requires unsafe-inline
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'", // Prevent plugins
    "upgrade-insecure-requests", // Force HTTPS
  ].join('; ');

  // Set security headers
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  return response;
}
