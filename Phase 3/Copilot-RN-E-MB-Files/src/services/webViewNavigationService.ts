/**
 * WebView Navigation Service
 * 
 * Pure functions for classifying WebView URLs and deriving navigation outcomes.
 * 
 * Corresponds to Phase 1 mapping: MAP-009
 * Source IDs: BEH-008, BEH-009, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005, ERRPATH-006
 * 
 * @file services/webViewNavigationService.ts
 */

import { WEB_VIEW_SCHEMES, ROUTE_PARAMS } from '../navigation/navigation.constants';

/**
 * WebView URL Classification Result
 * 
 * Categorizes incoming URLs to determine navigation action.
 * Corresponds to iOS WebsiteViewController.decidePolicyFor and Android WebviewActivity.onPageFinished
 * 
 * Source: [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor]
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:213 symbol=onPageFinished]
 */
export type WebViewUrlClassification =
  | { type: 'NORMAL_LOAD'; url: string }
  | { type: 'BARCODE_SCANNER'; returnUrl: string }
  | { type: 'LOGIN_PAGE'; isClearSession: boolean }
  | { type: 'ERROR'; message: string; url: string }
  | { type: 'EMPTY'; reason: string }
  | { type: 'UNKNOWN'; url: string };

/**
 * Classifies a WebView URL to determine navigation behavior
 * 
 * Route logic:
 * 1. Empty URL ? Returns to Login with error context
 * 2. Barcode scheme ? Routes to BarcodeScannerScreen with return URL
 * 3. Login page detected ? Clears session and returns to Login
 * 4. Error prefix ? Shows error dialog and returns to Login
 * 5. Normal URL ? Loads in WebView
 * 
 * Corresponds to:
 * - iOS: BEH-008 (barcode), BEH-009 (login form/URL), BEH-007 (foreground check)
 * - Android: BEH-020 (empty URL), BEH-021 (barcode with permission), BEH-022 (login/error)
 * 
 * @param url - The URL to classify
 * @returns Classification result with type and relevant parameters
 * 
 * Source IDs: BEH-008, BEH-009, BEH-020, BEH-021, BEH-022
 */
export function classifyWebViewUrl(url: string | null | undefined): WebViewUrlClassification {
  // ERRPATH-004: Empty URL returns to Login
  if (!url || url.trim() === '') {
    return {
      type: 'EMPTY',
      reason: 'No URL provided for WebView load',
    };
  }

  const normalizedUrl = url.trim();

  // BEH-008, BEH-021: Barcode scheme detected
  // Route to BarcodeScannerScreen with return URL
  if (normalizedUrl.includes(WEB_VIEW_SCHEMES.BARCODE_SCANNER)) {
    const returnUrl = extractReturnUrlFromBarcodeScheme(normalizedUrl);
    return {
      type: 'BARCODE_SCANNER',
      returnUrl,
    };
  }

  // BEH-009, BEH-022: Login page detected
  // Clears session (hasValidLogin = false) and returns to Login
  if (
    normalizedUrl.includes(WEB_VIEW_SCHEMES.LOGIN_PAGE) ||
    normalizedUrl.includes('login') ||
    normalizedUrl.includes('Login')
  ) {
    return {
      type: 'LOGIN_PAGE',
      isClearSession: true,
    };
  }

  // ERRPATH-005: HTTP/resource error indicator
  // Error prefix in URL signals error condition
  if (normalizedUrl.includes(WEB_VIEW_SCHEMES.ERROR_PREFIX)) {
    const errorMatch = normalizedUrl.match(/error=([^&]*)/);
    const errorCode = errorMatch ? errorMatch[1] : 'Unknown';
    return {
      type: 'ERROR',
      message: `HTTP Error: ${errorCode}`,
      url: normalizedUrl,
    };
  }

  // Default: Normal page load
  return {
    type: 'NORMAL_LOAD',
    url: normalizedUrl,
  };
}

/**
 * Extracts the return URL from a barcode scheme URL
 * 
 * iOS format: barcodescanner://redirect?url=<return_url>
 * Android format: barcodescanner://<return_url_encoded>
 * 
 * @param barcodeSchemeUrl - The barcode scheme URL
 * @returns The extracted return URL or a fallback error URL
 * 
 * Source: [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor]
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished]
 */
export function extractReturnUrlFromBarcodeScheme(barcodeSchemeUrl: string): string {
  try {
    // Try to parse as query parameter first (iOS format)
    if (barcodeSchemeUrl.includes('?')) {
      const url = new URL(barcodeSchemeUrl.replace('barcodescanner://', 'https://'));
      const returnUrl = url.searchParams.get('url');
      if (returnUrl) {
        return decodeURIComponent(returnUrl);
      }
    }

    // Try to extract direct URL (Android format)
    const schemeIndex = barcodeSchemeUrl.indexOf('barcodescanner://');
    if (schemeIndex !== -1) {
      const urlPart = barcodeSchemeUrl.substring(schemeIndex + 'barcodescanner://'.length);
      if (urlPart) {
        return decodeURIComponent(urlPart.split('?')[0]);
      }
    }
  } catch (error) {
    console.warn('Failed to extract return URL from barcode scheme:', error);
  }

  // Fallback: return a generic error URL
  return 'about:blank';
}

/**
 * Derives the scanner return URL with optional scan result
 * 
 * When barcode/QR scanner returns with a result, appends ScanResult query parameter
 * to the return URL.
 * 
 * iOS: ArticleScannerViewController.prepare passes `ScanResult` to segue
 * Android: BarcodeScannerActivity.handleCode sets `App.URL` with ScanResult parameter
 * 
 * @param baseReturnUrl - The original WebView URL
 * @param scanResult - The scanned code value (optional)
 * @returns The URL with optional ScanResult parameter
 * 
 * Source IDs: BEH-011, BEH-025, ERRPATH-002
 */
export function deriveScannerReturnUrl(
  baseReturnUrl: string,
  scanResult?: string,
): string {
  if (!scanResult) {
    return baseReturnUrl;
  }

  try {
    const url = new URL(baseReturnUrl);
    url.searchParams.set(ROUTE_PARAMS.SCAN_RESULT, scanResult);
    return url.toString();
  } catch (error) {
    // If URL parsing fails, append as query string manually
    const separator = baseReturnUrl.includes('?') ? '&' : '?';
    return `${baseReturnUrl}${separator}${ROUTE_PARAMS.SCAN_RESULT}=${encodeURIComponent(scanResult)}`;
  }
}

/**
 * Checks if a URL requires authentication validation
 * 
 * Used by foreground resume logic to determine if WebView should reload or return to Login.
 * 
 * Corresponds to:
 * - iOS: BEH-007 (applicationWillEnterForeground checks valid-login)
 * - Android: BEH-024 (onResume with invalid-login finishes activity)
 * 
 * @param url - The current WebView URL
 * @returns true if URL requires active authentication state
 * 
 * Source IDs: BEH-007, BEH-024, STATE-004, STATE-010
 */
export function requiresAuthenticationValidation(url: string | null): boolean {
  if (!url) {
    return false;
  }

  // Login pages never require further authentication validation
  if (url.includes(WEB_VIEW_SCHEMES.LOGIN_PAGE)) {
    return false;
  }

  // Error pages handled separately
  if (url.includes(WEB_VIEW_SCHEMES.ERROR_PREFIX)) {
    return false;
  }

  // Normal application URLs require valid login state
  return true;
}

/**
 * Determines if navigation should reset to Login based on URL and auth state
 * 
 * Combines URL classification with auth state to decide final navigation action.
 * 
 * @param url - The current WebView URL
 * @param isValidLogin - Current valid-login flag
 * @returns true if navigation should reset to Login
 * 
 * Source IDs: BEH-006, BEH-007, BEH-022, BEH-024, BEH-026, SEC-001
 */
export function shouldResetToLogin(url: string | null, isValidLogin: boolean): boolean {
  if (!isValidLogin) {
    return true;
  }

  const classification = classifyWebViewUrl(url);
  return (
    classification.type === 'LOGIN_PAGE' ||
    classification.type === 'EMPTY' ||
    classification.type === 'ERROR'
  );
}
