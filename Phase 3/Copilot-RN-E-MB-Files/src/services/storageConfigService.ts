/**
 * Storage Config Service
 * Handles check-access API calls and settings validation
 * Corresponds to Phase 1 mappings: MAP-004, MAP-014
 * Source IDs: API-001, API-002, API-003, API-004, BEH-003, BEH-012, ERRPATH-002, ERRPATH-003, ERRPATH-006
 */

import { CheckAccessResult, Protocol } from '../types';
import { buildCheckAccessUrl } from './loginUrlService';

/**
 * Type for HTTP client (injected for testing)
 * Allows mocking in tests without network calls
 */
export type HttpClient = (url: string, options?: { method?: string; headers?: Record<string, string> }) => Promise<{ status: number; statusText?: string }>;

/**
 * Check if server/settings are accessible
 * Source: API-001, API-003, ERRPATH-002, ERRPATH-003, ERRPATH-006
 * 
 * iOS behavior: GET request with Cache-Control: no-cache header; accepts 200
 * Android behavior: GET request with HTTP status OK check
 * RN: Send GET with cache-control header; check for 2xx status
 * 
 * Web Dev Mode: Skip check on CORS errors (allows testing without backend CORS config)
 * 
 * @param server - Server hostname
 * @param client - Mandant/client identifier
 * @param protocol - Protocol enum value
 * @param httpClient - HTTP client function (for mocking/dependency injection)
 * @returns CheckAccessResult with status and success flag
 */
export async function checkAccess(
  server: string,
  client: string,
  protocol: Protocol,
  httpClient: HttpClient
): Promise<CheckAccessResult> {
  const timestamp = Date.now();

  try {
    const url = buildCheckAccessUrl(server, client, protocol);

    if (!url) {
      return {
        success: false,
        error: 'Failed to build check-access URL',
        timestamp,
      };
    }

    // Make GET request with no-cache header (matching iOS behavior)
    const response = await httpClient(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    // Accept any 2xx status code as success
    const isSuccess = response.status >= 200 && response.status < 300;

    return {
      success: isSuccess,
      statusCode: response.status,
      timestamp,
    };
  } catch (error) {
    // In web development, if it's a CORS error, treat as success
    // This allows testing without backend CORS configuration
    const isCorsError = error instanceof TypeError && 
      error.message.toLowerCase().includes('cors');
    
    if (isCorsError && typeof __DEV__ !== 'undefined' && __DEV__) {
      // Development mode: bypass CORS validation
      return {
        success: true,
        statusCode: 200,
        timestamp,
        // Mark as bypassed for diagnostics
        bypassedValidation: 'CORS_WEB_DEV',
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp,
    };
  }
}

/**
 * Check if HTTP status is OK
 * Utility for evaluating check-access responses
 * Source: API-001, API-003
 * 
 * Accepts 2xx status codes (200-299)
 * 
 * @param statusCode - HTTP status code
 * @returns true if status is in 2xx range
 */
export function isOkHttpStatus(statusCode: number): boolean {
  return statusCode >= 200 && statusCode < 300;
}

/**
 * Get human-readable error message for HTTP status code
 * 
 * @param statusCode - HTTP status code
 * @returns Error message
 */
export function getHttpStatusMessage(statusCode: number): string {
  if (statusCode >= 200 && statusCode < 300) {
    return 'Success';
  }
  if (statusCode >= 300 && statusCode < 400) {
    return 'Redirect';
  }
  if (statusCode >= 400 && statusCode < 500) {
    return 'Client error';
  }
  if (statusCode >= 500) {
    return 'Server error';
  }
  return 'Unknown status';
}

/**
 * Validate settings completeness before attempting check-access
 * Source: BEH-003, BEH-012
 * 
 * Requirements:
 * - server must be non-empty
 * - client must be non-empty (though can be optional on some systems)
 * 
 * @param server - Server value
 * @param client - Client value
 * @returns true if minimum requirements are met
 */
export function areSettingsCompleteForCheck(server: string | undefined, client: string | undefined): boolean {
  return !!(server && server.trim() !== '') && !!(client && client.trim() !== '');
}

/**
 * Create a default fetch-based HTTP client for production
 * Source: DEP-002, DEP-006
 * 
 * Uses React Native's built-in fetch API
 * Mocks with test double for unit tests
 * 
 * @returns HttpClient function
 */
export function createFetchHttpClient(): HttpClient {
  return async (url: string, options?: { method?: string; headers?: Record<string, string> }) => {
    try {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: options?.headers || {},
      });

      return {
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      // Network errors throw
      throw error;
    }
  };
}

/**
 * Extract useful error info for logging
 * Sanitize URL to avoid leaking credentials in logs
 * 
 * @param url - URL that failed
 * @returns Sanitized URL string
 */
export function sanitizeUrlForLogging(url: string): string {
  try {
    const parsed = new URL(url);
    // Keep only scheme and hostname
    return `${parsed.protocol}//${parsed.hostname}...`;
  } catch {
    return '[invalid URL]';
  }
}
