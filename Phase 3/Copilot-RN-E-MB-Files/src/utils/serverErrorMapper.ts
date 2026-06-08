/**
 * Server Error Mapper Utility
 * MAP-007: Map server error codes to user-friendly messages
 * Phase 1 Source IDs: BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007
 *
 * Maps HTTP error codes and server error markers to localized user messages
 * Shared utility used by WebView, Login, and other features
 *
 * Behaviors:
 * - BEH-021: HTTP errors mapped and displayed in dialog
 * - BEH-025: Server error URLs extracted and mapped
 * - ERRPATH-005-007: Various error paths produce mapped messages
 */

import { ServerError } from '../types/webview.types';

/**
 * Standard HTTP error mappings
 */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized - Please login again',
  403: 'Forbidden - Access denied',
  404: 'Not Found - Page not found',
  408: 'Request Timeout - Connection timed out',
  429: 'Too Many Requests - Please try again later',
  500: 'Server Error - Internal server error',
  502: 'Bad Gateway - Service unavailable',
  503: 'Service Unavailable - Please try again later',
  504: 'Gateway Timeout - Connection timed out',
};

/**
 * Server error code mappings (from server URLs with error=- markers)
 * These are custom error codes defined by the server application
 */
const SERVER_ERROR_MESSAGES: Record<string, string> = {
  '401': 'Session expired - Please login again',
  '403': 'Access denied - You do not have permission',
  '404': 'Resource not found - Page may have been deleted',
  '500': 'Internal server error - Please try again later',
  'timeout': 'Connection timeout - Please check your internet and try again',
  'network': 'Network error - Please check your connection',
  'ssl': 'SSL certificate error - Connection not secure',
};

/**
 * Maps HTTP error code to user-friendly message
 *
 * @param statusCode - HTTP status code (e.g., 401, 500)
 * @returns ServerError with code and message
 *
 * Traceability: BEH-021, ERRPATH-005, ERRPATH-006
 */
export function mapHttpError(statusCode: number): ServerError {
  const message = HTTP_ERROR_MESSAGES[statusCode] || `HTTP Error ${statusCode}`;
  return {
    code: String(statusCode),
    message,
  };
}

/**
 * Maps server error code to user-friendly message
 *
 * @param errorCode - Server error code (from URL error=- marker or fallback)
 * @returns ServerError with code and message
 *
 * Traceability: BEH-025, ERRPATH-007
 * Server error codes are extracted from URLs like:
 * - error=-401
 * - error=-timeout
 * - error=-ssl
 */
export function mapServerError(errorCode: string): ServerError {
  const message = SERVER_ERROR_MESSAGES[errorCode] || `Server error: ${errorCode}`;
  return {
    code: errorCode,
    message,
  };
}

/**
 * Maps WebView error to user message
 *
 * @param error - WebViewError or error object
 * @returns ServerError with code and message
 *
 * Handles various error types:
 * - Network errors
 * - SSL errors
 * - Server errors
 * - Timeout errors
 */
export function mapWebViewError(error: any): ServerError {
  // Handle different error types
  if (typeof error === 'string') {
    // Plain string error message
    return {
      code: 'unknown',
      message: error,
    };
  }

  if (error?.code) {
    // Error object with code property
    return mapServerError(error.code);
  }

  if (error?.statusCode) {
    // HTTP error response
    return mapHttpError(error.statusCode);
  }

  // Default unknown error
  return {
    code: 'unknown',
    message: 'An error occurred - Please try again later',
  };
}

/**
 * Checks if error is recoverable (user can retry)
 *
 * @param errorCode - Error code to check
 * @returns true if error allows user to retry
 *
 * Non-recoverable errors (permanent):
 * - 403 Forbidden
 * - 404 Not Found
 * - 401 Unauthorized (session expired)
 *
 * Recoverable errors (temporary):
 * - 500, 502, 503, 504 (server errors)
 * - timeout
 * - network
 */
export function isRecoverableError(errorCode: string): boolean {
  const nonRecoverable = ['403', '404', '401'];
  return !nonRecoverable.includes(errorCode);
}

/**
 * Formats error message for user display
 *
 * @param error - ServerError object
 * @param includeCode - Whether to include error code in message
 * @returns Formatted message for UI display
 */
export function formatErrorMessage(error: ServerError, includeCode: boolean = false): string {
  if (includeCode) {
    return `${error.message} (Error ${error.code})`;
  }
  return error.message;
}
