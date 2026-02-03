/**
 * Request Size Limits
 * Prevents DoS attacks via large request bodies
 */

export const REQUEST_LIMITS = {
  // Maximum request body size (in bytes)
  MAX_BODY_SIZE: 1024 * 1024, // 1MB
  
  // Maximum JSON payload size
  MAX_JSON_SIZE: 500 * 1024, // 500KB
  
  // Maximum form data size
  MAX_FORM_SIZE: 10 * 1024 * 1024, // 10MB (for file uploads)
  
  // Maximum URL length
  MAX_URL_LENGTH: 2048,
  
  // Maximum headers size
  MAX_HEADERS_SIZE: 8 * 1024, // 8KB
} as const;

/**
 * Check if request body size exceeds limit
 */
export function validateRequestSize(
  contentLength: string | null,
  maxSize: number = REQUEST_LIMITS.MAX_BODY_SIZE
): { valid: boolean; size?: number } {
  if (!contentLength) {
    return { valid: true };
  }

  const size = parseInt(contentLength, 10);
  
  if (isNaN(size)) {
    return { valid: false };
  }

  if (size > maxSize) {
    return { valid: false, size };
  }

  return { valid: true, size };
}

/**
 * Get appropriate max size based on content type
 */
export function getMaxSizeForContentType(contentType: string | null): number {
  if (!contentType) {
    return REQUEST_LIMITS.MAX_BODY_SIZE;
  }

  if (contentType.includes('application/json')) {
    return REQUEST_LIMITS.MAX_JSON_SIZE;
  }

  if (contentType.includes('multipart/form-data')) {
    return REQUEST_LIMITS.MAX_FORM_SIZE;
  }

  return REQUEST_LIMITS.MAX_BODY_SIZE;
}
