/**
 * WebView Return URL Service
 * MAP-005: Barcode scheme → return URL conversion
 * Phase 1 Source IDs: BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008
 *
 * Converts barcode:// scheme URLs to HTTP/HTTPS for server consumption
 * Appends ScanResult parameter when barcode was successfully scanned
 *
 * Behaviors:
 * - BEH-008: barcode URL cancelled, converted to return URL per settings protocol
 * - BEH-013: Return URL receives &ScanResult=<code> when code exists
 * - BEH-023: Finished barcode URL with camera permission → scanner route
 * - BEH-024: Finished barcode URL without permission → show dialog, reload return URL
 * - BEH-031: Scanner returns with redirect URL or cancel
 */

import { BarcodeReturnUrl } from '../types/webview.types';

/**
 * Converts barcode:// scheme URL to HTTP/HTTPS return URL
 *
 * @param barcodeUrl - URL with barcode:// scheme (e.g., 'barcode://returnUrl')
 * @param protocol - Protocol enum from login settings (0=HTTP, 1=HTTPS, 2=HTTPS_without_validation)
 * @returns BarcodeReturnUrl with converted URL and hadBarcode flag
 *
 * Traceability: BEH-008, ERRPATH-008
 * Android: Barcode processing checks camera permission and chooses protocol
 * iOS: Barcode decision happens in policy handler; converts scheme
 */
export function toBarcodeReturnUrl(barcodeUrl: string, protocol: number): BarcodeReturnUrl {
  // Extract the return URL from barcode:// scheme
  // Format: barcode://http://server/path or barcode://https://server/path
  // If no scheme in the barcode URL part, prepend protocol-based scheme
  
  let returnUrl = barcodeUrl;

  // Remove barcode:// prefix if present
  if (returnUrl.startsWith('barcode://')) {
    returnUrl = returnUrl.substring('barcode://'.length);
  }

  // If the extracted URL doesn't have http/https scheme, prepend based on protocol
  if (!returnUrl.startsWith('http://') && !returnUrl.startsWith('https://')) {
    const scheme = getSchemeForProtocol(protocol);
    returnUrl = `${scheme}://${returnUrl}`;
  }

  // Protocol 2 (HTTPS_WITHOUT_VALIDATION) still uses https:// scheme
  // The actual SSL bypass is handled at the WebView level, not in URL construction

  return {
    returnUrl,
    hadBarcode: true,
  };
}

/**
 * Builds ScanResult query parameter
 *
 * @param returnUrl - Base return URL
 * @param scanCode - Scanned barcode content (optional)
 * @returns URL with ScanResult param appended (or unchanged if no scan code)
 *
 * Traceability: BEH-013, BEH-031
 * iOS: ArticleScanner prepare() adds &ScanResult=<code> to wrapper URL
 * Android: BarcodeScanner returns App.URL with scan result already appended
 * RN: Service appends &ScanResult param when scanner returns with code
 */
export function buildScanResultUrl(returnUrl: string, scanCode?: string): string {
  if (!scanCode) {
    // No scan code provided; return URL unchanged (cancel/dismiss case)
    return returnUrl;
  }

  // Append ScanResult param
  const separator = returnUrl.includes('?') ? '&' : '?';
  return `${returnUrl}${separator}ScanResult=${encodeURIComponent(scanCode)}`;
}

/**
 * Determines HTTP/HTTPS scheme based on protocol setting
 *
 * @param protocol - Protocol enum (0=HTTP, 1=HTTPS, 2=HTTPS_without_validation)
 * @returns 'http' or 'https'
 *
 * Traceability: BEH-008, STOR-004, SEC-003
 */
export function getSchemeForProtocol(protocol: number): string {
  // Protocol 0 = HTTP, 1 = HTTPS, 2 = HTTPS_without_validation
  // All HTTPS variants use https:// scheme (SSL bypass handled at WebView level)
  return protocol === 0 ? 'http' : 'https';
}

/**
 * Checks if a barcode URL can be converted to valid return URL
 *
 * @param barcodeUrl - URL to validate
 * @returns true if URL is valid barcode format
 *
 * Valid formats:
 * - barcode://http://server/path
 * - barcode://https://server/path
 * - barcode://server/path (will be scheme-prefixed)
 */
export function isValidBarcodeUrl(barcodeUrl: string): boolean {
  if (!barcodeUrl || !barcodeUrl.startsWith('barcode://')) {
    return false;
  }

  const urlPart = barcodeUrl.substring('barcode://'.length);
  
  // URL part should not be empty
  if (!urlPart) {
    return false;
  }

  // URL part should be http(s), or a valid domain-like string
  return !!(urlPart.match(/^https?:\/\/.+/) || urlPart.match(/^[a-zA-Z0-9.-]+/));
}

/**
 * Extracts ScanResult parameter from URL
 *
 * @param url - URL potentially containing ScanResult param
 * @returns Scan code if present, null otherwise
 *
 * Traceability: BEH-013, BEH-031
 */
export function extractScanResult(url: string): string | null {
  const match = url.match(/[?&]ScanResult=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
