/**
 * useWebViewRouteParams Hook
 * MAP-014: Extract and validate URL from route parameters
 * Phase 1 Source IDs: STATE-001, STATE-002, STATE-006, STATE-007, STOR-005
 *
 * Extracts WebView URL from navigation route params
 * Falls back to Login context URL if route param is missing
 * Returns empty → triggers Login navigation in WebViewScreen
 *
 * Behaviors:
 * - STATE-001: Login success → WEBVIEW route param with URL
 * - STATE-002: WebsiteWrapper creates WebsiteViewController with URL
 * - STATE-006: WebView initialized from route param or prefs fallback
 * - STATE-007: WebView loads resolved URL
 * - STOR-005: Route payload passed through; not persistent storage
 * - SEC-001: URL may contain credentials; treat as sensitive
 */

import { useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { WebViewRouteParams } from '../types/webview.types';

/**
 * Mock LoginContext - assumes login/auth feature provides this
 * In real implementation, would import from login feature
 */
interface LoginContextType {
  login?: {
    server?: string;
    client?: string;
    protocol?: number;
  };
  buildLoginUrl?: () => string;
}

// Placeholder for actual LoginContext import
const LoginContext = null as any; // Would be: import { LoginContext } from '../contexts/LoginContext'

/**
 * Extracts WebView URL from route parameters
 *
 * @returns WebView URL resolved from route params or login context fallback
 *
 * Traceability: STATE-001 through STATE-007, SEC-001
 *
 * Fallback chain:
 * 1. Route params url (passed from Login after successful authentication)
 * 2. LoginContext buildLoginUrl() (rebuild from stored settings if available)
 * 3. Empty string (will trigger fallback to Login in WebViewScreen)
 */
export function useWebViewRouteParams(): WebViewRouteParams {
  const route = useRoute();
  
  // Extract params with proper typing
  const params = route.params as Partial<WebViewRouteParams> | undefined;
  
  // Use LoginContext for fallback (mock implementation)
  // In real app, import and use actual LoginContext
  const loginContext = LoginContext ? useContext(LoginContext) : undefined;

  // Primary source: route params (most recent)
  if (params?.url) {
    return {
      url: params.url,
      returnUrl: params.returnUrl,
    };
  }

  // Fallback: rebuild from login context if available
  // This handles the case where WebView is navigated directly
  // without going through Login flow
  if (loginContext?.buildLoginUrl) {
    try {
      const fallbackUrl = loginContext.buildLoginUrl();
      if (fallbackUrl) {
        return {
          url: fallbackUrl,
          returnUrl: undefined,
        };
      }
    } catch (e) {
      console.warn('[WebView] Failed to build fallback URL from login context:', e);
    }
  }

  // No URL available; WebViewScreen will handle empty URL
  // (typically by navigating back to Login)
  return {
    url: '',
    returnUrl: undefined,
  };
}

/**
 * Validates WebView route parameters
 *
 * @param params - Route params to validate
 * @returns true if params are valid
 *
 * Validation rules:
 * - url should be non-empty string
 * - url should be http(s), barcode://, or about:blank
 * - returnUrl should be valid URL if provided
 */
export function validateWebViewRouteParams(params: Partial<WebViewRouteParams>): boolean {
  if (!params.url || typeof params.url !== 'string') {
    return false;
  }

  const url = params.url.toLowerCase();

  // Valid URL schemes for WebView
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('barcode://') ||
    url === 'about:blank'
  ) {
    // Valid URL
  } else if (url.length === 0) {
    // Empty URL is allowed (handled by fallback)
    return true;
  } else {
    // Invalid scheme
    return false;
  }

  // Validate returnUrl if provided
  if (params.returnUrl) {
    const returnUrl = params.returnUrl.toLowerCase();
    if (
      !returnUrl.startsWith('http://') &&
      !returnUrl.startsWith('https://') &&
      returnUrl !== 'about:blank'
    ) {
      return false;
    }
  }

  return true;
}
