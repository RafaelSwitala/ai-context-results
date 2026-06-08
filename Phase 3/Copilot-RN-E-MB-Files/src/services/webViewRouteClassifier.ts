/**
 * WebView Route Classifier Service
 * MAP-004: Pure classifier for URL outcomes
 * Phase 1 Source IDs: IOS-FILE-006, AND-FILE-005, BEH-008, BEH-009, BEH-020, BEH-025, BEH-026, BEH-027
 *
 * Determines how WebView should handle each URL:
 * - barcode://... → route to BarcodeScanner with return URL extraction
 * - ...login.aspx... → session expired; clear valid-login and return to Login
 * - ...error=-...  → server error; show error dialog and return to Login
 * - about:blank → hide WebView, reset loading state (navigation reset)
 * - otherwise → normal page load; show WebView
 */

import { WebViewUrlClassification } from '../types/webview.types';

/**
 * Classifies a WebView URL into a handling category
 *
 * @param url - The URL to classify (may contain credentials; treat as sensitive)
 * @returns Classification outcome: 'barcode' | 'login' | 'error' | 'aboutBlank' | 'normal'
 *
 * Traceability:
 * - barcode: BEH-008, BEH-020, BEH-023, BEH-024 → barcode scheme routing
 * - login: BEH-009, BEH-026 → session expiry marker
 * - error: BEH-025 → server error in URL
 * - aboutBlank: BEH-027 → hide WebView marker
 * - normal: default → load content
 *
 * Security: URLs may contain query params with credentials; classify without logging
 */
export function classifyWebViewUrl(url: string | undefined | null): WebViewUrlClassification {
  if (!url) {
    // Empty or null URL treated as 'normal' (will be handled by empty-URL fallback in WebViewScreen)
    return 'normal';
  }

  // Check for barcode:// scheme - highest priority (BEH-008, BEH-020)
  if (url.startsWith('barcode://')) {
    return 'barcode';
  }

  // Check for about:blank - indicates loading state reset or navigation prep (BEH-027)
  if (url === 'about:blank') {
    return 'aboutBlank';
  }

  // Check for login.aspx marker - session expiry (BEH-009, BEH-026)
  // iOS: URL ending with 'login.aspx' (form action read from page)
  // Android: URL containing 'login.aspx' detected on page finish
  if (url.includes('login.aspx')) {
    return 'login';
  }

  // Check for server error marker - error=-<code> format (BEH-025)
  // URL contains 'error=-' followed by numeric code
  // Examples: error=-401, error=-500, error=-timeout
  if (url.includes('error=-')) {
    return 'error';
  }

  // Default to normal page load
  return 'normal';
}

/**
 * Extracts server error code from URL
 *
 * @param url - URL containing error=-<code> marker
 * @returns Error code (e.g., '401', 'timeout') or null if not found
 *
 * Source: BEH-025, ERRPATH-007
 * Android implementation extracts substring from last '-' in 'error=-'
 */
export function extractServerErrorCode(url: string): string | null {
  const match = url.match(/error=-(.+?)(?:&|$)/);
  return match ? match[1] : null;
}

/**
 * Checks if URL should hide the WebView
 *
 * @param classification - URL classification
 * @returns true if WebView should be hidden
 *
 * Traceability: BEH-027 - barcode/login/about:blank URLs hide WebView
 * Normal and error URLs show WebView (error dialog overlays)
 */
export function shouldHideWebView(classification: WebViewUrlClassification): boolean {
  return classification === 'barcode' || classification === 'login' || classification === 'aboutBlank';
}

/**
 * Validates WebView URL safety
 *
 * @param url - URL to validate
 * @returns true if URL is safe to load in WebView
 *
 * Security checks (SEC-001, SEC-003):
 * - Disallow javascript: protocol (potential XSS vector)
 * - Disallow file: protocol (potential local file access)
 * - Disallow data: URIs with arbitrary content
 * - Warn on http: URLs (but allow for development)
 */
export function isWebViewUrlSafe(url: string): boolean {
  if (!url) return false;

  const lowerUrl = url.toLowerCase();

  // Block dangerous protocols
  if (lowerUrl.startsWith('javascript:')) {
    console.warn('[WebView] Blocked javascript: URL for security');
    return false;
  }
  if (lowerUrl.startsWith('file:')) {
    console.warn('[WebView] Blocked file: URL for security');
    return false;
  }
  if (lowerUrl.startsWith('data:') && !lowerUrl.includes('image')) {
    console.warn('[WebView] Blocked data: URL (non-image) for security');
    return false;
  }

  // Allow http/https, barcode://, about:blank
  if (
    lowerUrl.startsWith('http://') ||
    lowerUrl.startsWith('https://') ||
    lowerUrl.startsWith('barcode://') ||
    lowerUrl === 'about:blank'
  ) {
    return true;
  }

  // Default deny unknown protocols
  return false;
}
