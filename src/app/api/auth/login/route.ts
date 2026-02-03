import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/security/rate-limit';
import { addSecurityHeaders } from '@/lib/security/headers';
import { validateRequestSize, getMaxSizeForContentType } from '@/lib/security/request-limits';
import { logger } from '@/lib/utils/logger';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase().trim()),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/auth/login
 * Secure login endpoint with rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // Request size validation
    const contentType = request.headers.get('content-type');
    const contentLength = request.headers.get('content-length');
    const maxSize = getMaxSizeForContentType(contentType);
    const sizeCheck = validateRequestSize(contentLength, maxSize);

    if (!sizeCheck.valid) {
      logger.warn('Login request too large', {
        contentLength,
        maxSize,
        endpoint: '/api/auth/login',
      });
      const response = NextResponse.json(
        {
          error: 'Request too large',
          message: 'Request body exceeds maximum size limit.',
        },
        { status: 413 }
      );
      return addSecurityHeaders(response);
    }

    // Rate limiting
    const clientId = getClientIdentifier(request);
    const limitResult = rateLimit(
      `login:${clientId}`,
      RATE_LIMITS.LOGIN.maxRequests,
      RATE_LIMITS.LOGIN.windowMs
    );

    if (!limitResult.allowed) {
      logger.warn('Login rate limit exceeded', {
        endpoint: '/api/auth/login',
        clientId: clientId.substring(0, 8) + '...', // Partial ID only
      });
      const response = NextResponse.json(
        {
          error: 'Too many login attempts',
          message: 'Please wait before trying again.',
          retryAfter: Math.ceil((limitResult.resetAt - Date.now()) / 1000),
        },
        { status: 429 }
      );
      response.headers.set('Retry-After', String(Math.ceil((limitResult.resetAt - Date.now()) / 1000)));
      return addSecurityHeaders(response);
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      const response = NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
      return addSecurityHeaders(response);
    }

    const { email, password } = validationResult.data;

    // Authenticate with Supabase
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      // Don't reveal if email exists or not (security best practice)
      const response = NextResponse.json(
        {
          error: 'Invalid credentials',
          message: 'Email or password is incorrect.',
        },
        { status: 401 }
      );
      return addSecurityHeaders(response);
    }

    // Verify user is an admin
    const { data: adminProfile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    if (!adminProfile || !['admin', 'super_admin'].includes(adminProfile.role)) {
      // Sign out the user if they're not an admin
      await supabase.auth.signOut();
      const response = NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Admin access required.',
        },
        { status: 403 }
      );
      return addSecurityHeaders(response);
    }

    // Success - Supabase handles session cookies automatically
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          role: adminProfile.role,
        },
      },
      { status: 200 }
    );

    return addSecurityHeaders(response);
  } catch (error) {
    logger.error('Login error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      // Don't log credentials or full error stack
    });
    const response = NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An unexpected error occurred.',
      },
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
}
