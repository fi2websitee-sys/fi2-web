/**
 * Secure Logging Utility
 * Sanitizes sensitive data before logging
 * Prevents information disclosure vulnerabilities
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

/**
 * Sanitize sensitive fields from log data
 */
function sanitizeData(data: unknown): unknown {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'key',
    'authorization',
    'cookie',
    'session',
    'email', // Partially sanitize
    'creditCard',
    'ssn',
    'apiKey',
    'accessToken',
    'refreshToken',
  ];

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();

    if (sensitiveFields.some((field) => lowerKey.includes(field))) {
      // Redact sensitive fields
      if (typeof value === 'string' && value.length > 0) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = '[REDACTED]';
      }
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeData(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Secure logger that sanitizes sensitive data
 */
export const logger = {
  error(message: string, context?: LogContext) {
    const sanitizedContext = context ? sanitizeData(context) : undefined;
    
    // In production, send to logging service
    // For now, log to console with sanitized data
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to structured logging service (Winston/Pino)
      console.error(`[ERROR] ${message}`, sanitizedContext);
    } else {
      console.error(`[ERROR] ${message}`, sanitizedContext);
    }
  },

  warn(message: string, context?: LogContext) {
    const sanitizedContext = context ? sanitizeData(context) : undefined;
    console.warn(`[WARN] ${message}`, sanitizedContext);
  },

  info(message: string, context?: LogContext) {
    const sanitizedContext = context ? sanitizeData(context) : undefined;
    console.log(`[INFO] ${message}`, sanitizedContext);
  },

  debug(message: string, context?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      const sanitizedContext = context ? sanitizeData(context) : undefined;
      console.log(`[DEBUG] ${message}`, sanitizedContext);
    }
  },
};
