import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { contactFormSchema } from '@/lib/validation/schemas';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/security/rate-limit';
import { addSecurityHeaders } from '@/lib/security/headers';
import { validateRequestSize, getMaxSizeForContentType } from '@/lib/security/request-limits';
import { logger } from '@/lib/utils/logger';

/**
 * POST /api/contact
 * Secure contact form submission endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Request size validation
    const contentType = request.headers.get('content-type');
    const contentLength = request.headers.get('content-length');
    const maxSize = getMaxSizeForContentType(contentType);
    const sizeCheck = validateRequestSize(contentLength, maxSize);

    if (!sizeCheck.valid) {
      logger.warn('Request body too large', {
        contentLength,
        maxSize,
        endpoint: '/api/contact',
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
      `contact:${clientId}`,
      RATE_LIMITS.CONTACT_FORM.maxRequests,
      RATE_LIMITS.CONTACT_FORM.windowMs
    );

    if (!limitResult.allowed) {
      logger.warn('Rate limit exceeded', {
        endpoint: '/api/contact',
        clientId: clientId.substring(0, 8) + '...', // Partial ID only
      });
      const response = NextResponse.json(
        {
          error: 'Too many requests',
          message: 'Please wait before submitting another message.',
          retryAfter: Math.ceil((limitResult.resetAt - Date.now()) / 1000),
        },
        { status: 429 }
      );
      response.headers.set('Retry-After', String(Math.ceil((limitResult.resetAt - Date.now()) / 1000)));
      return addSecurityHeaders(response);
    }

    // Parse and validate input
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

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

    const { name, email, subject, message } = validationResult.data;

    // Save to database
    const supabase = createClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject,
        message,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      logger.error('Database error in contact form', {
        error: error.message,
        code: error.code,
        // Don't log full error object
      });
      const response = NextResponse.json(
        {
          error: 'Failed to submit message',
          message: 'Please try again later.',
        },
        { status: 500 }
      );
      return addSecurityHeaders(response);
    }

    // Success response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon.',
        id: data.id,
      },
      { status: 201 }
    );

    return addSecurityHeaders(response);
  } catch (error) {
    logger.error('Contact form error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      // Don't log full error stack in production
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

/**
 * OPTIONS /api/contact
 * Handle CORS preflight
 */
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addSecurityHeaders(response);
}
