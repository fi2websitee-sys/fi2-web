/**
 * Rate Limiting Utility
 * Prevents brute force attacks and spam
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// Cleanup interval to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let cleanupTimer: NodeJS.Timeout | null = null;

/**
 * Clean up expired rate limit entries
 * Prevents memory leaks in long-running processes
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  let cleaned = 0;

  for (const key in store) {
    if (store[key].resetAt < now) {
      delete store[key];
      cleaned++;
    }
  }

  // Cleanup happens silently - no logging needed
  // In production, consider metrics instead
}

/**
 * Start cleanup timer if not already running
 */
function startCleanupTimer() {
  if (!cleanupTimer) {
    cleanupTimer = setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL);
    
    // Clean up on process exit
    if (typeof process !== 'undefined') {
      process.on('SIGTERM', () => {
        if (cleanupTimer) {
          clearInterval(cleanupTimer);
          cleanupTimer = null;
        }
      });
    }
  }
}

/**
 * Simple in-memory rate limiter
 * For production, use Redis or Upstash
 */
export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  // Start cleanup timer on first use
  startCleanupTimer();

  const now = Date.now();
  const key = identifier;

  // Clean up expired entries
  if (store[key] && store[key].resetAt < now) {
    delete store[key];
  }

  // Initialize or get existing entry
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetAt: now + windowMs,
    };
  }

  const entry = store[key];

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count++;

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  return ip;
}

/**
 * Rate limit configuration presets
 */
export const RATE_LIMITS = {
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  CONTACT_FORM: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  FILE_UPLOAD: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  API_GENERAL: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
} as const;
