/**
 * WebView Feature Types
 * Corresponds to Phase 1 artifacts: 14_migration_mapping.md
 * Implementation Mappings: MAP-010, MAP-014, MAP-015, MAP-016
 * Source IDs: STOR-005, STATE-001 through STATE-010, BEH-008 through BEH-030
 */

/**
 * WebView Route Parameters
 * MAP-010: Route payload for WebView screen
 * Source: STOR-005, SEC-001
 *
 * - url: Initial WebView URL (can contain credentials; treat as sensitive)
 * - returnUrl: Return URL after barcode scan or other flow completion
 *
 * Security: URL params passed through route; never persist or log full URLs
 */
export interface WebViewRouteParams {
  url: string;
  returnUrl?: string;
}

/**
 * URL Classification Result
 * MAP-004: classifyWebViewUrl() output
 * Source IDs: BEH-008, BEH-009, BEH-020, BEH-025, BEH-026, BEH-027
 *
 * Classification determines:
 * - 'barcode': URL scheme is 'barcode://'; route to scanner and convert scheme
 * - 'login': URL contains 'login.aspx'; indicates session expiry; clear valid-login and return to Login
 * - 'error': URL contains server error marker (e.g. 'error=-'); show error dialog and return to Login
 * - 'aboutBlank': URL is 'about:blank'; hide WebView (loading state or navigation reset)
 * - 'normal': Standard web content; show WebView and load content
 */
export type WebViewUrlClassification =
  | 'barcode'
  | 'login'
  | 'error'
  | 'aboutBlank'
  | 'normal';

/**
 * Barcode Return URL Builder Result
 * MAP-005: buildScanResultUrl() / toBarcodeReturnUrl() output
 * Source IDs: BEH-008, BEH-013, BEH-023, BEH-024, BEH-031
 *
 * Converts 'barcode://' scheme to HTTP/HTTPS return URL
 * Appends ScanResult param when barcode was scanned
 */
export interface BarcodeReturnUrl {
  returnUrl: string; // HTTP/HTTPS URL (protocol chosen from login settings)
  hadBarcode: boolean; // Whether original URL was barcode:// scheme
}

/**
 * WebView Session State
 * MAP-016: useWebViewSessionGuard() state
 * Source IDs: STATE-005, STATE-010, SEC-002, BEH-010, BEH-011, BEH-022, BEH-028, BEH-029
 *
 * Tracks login validity and triggers exit from WebView when needed
 */
export interface WebViewSessionState {
  hasValidLogin: boolean; // Read from login/auth storage
  isLoading: boolean; // Loading indicator state
  shouldExit: boolean; // True → navigate to Login and exit WebView
}

/**
 * WebView Loading State
 * MAP-015: useWebViewLoadingState() state
 * Source IDs: STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027
 */
export interface WebViewLoadingState {
  isLoading: boolean; // true during page load (onLoadStart → onLoadEnd)
  canGoBack: boolean; // Used for Android back-button logic (future enhancement)
  error: string | null; // Error message if load failed
}

/**
 * Server Error Information
 * MAP-007: mapServerError() result
 * Source IDs: BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007
 *
 * Parsed from server error markers (e.g., 'error=-401')
 */
export interface ServerError {
  code: string; // Error code (e.g., '401', 'timeout')
  message: string; // User-friendly message (localized or fallback)
}

/**
 * WebView Lifecycle Events (for potential native bridge communication)
 * Future use for injected JavaScript communication
 * Source IDs: API-002, API-004, BEH-010, BEH-022
 */
export interface WebViewJSMessage {
  type: 'formAction' | 'sessionExpiry' | 'scanResult' | 'error';
  payload: any;
}

/**
 * WebView Screen Props
 * Used by WebViewScreen component
 * Source IDs: MAP-001, EP-002 through EP-010, BEH-002 through BEH-030
 */
export interface WebViewScreenProps {
  route: {
    params: WebViewRouteParams;
  };
  navigation: any; // React Navigation navigation prop
}

/**
 * Platform-Specific WebView Configuration
 * MAP-018: WebView settings configuration
 * Source IDs: BEH-016, SEC-005
 *
 * Ensures Android and iOS WebView behavior parity
 */
export interface WebViewConfig {
  javaScriptEnabled: boolean; // Enable JS (default: true per BEH-016)
  domStorageEnabled: boolean; // Enable DOM storage (default: true per BEH-016)
  cacheMode: 'LOAD_NO_CACHE' | 'LOAD_CACHE_ELSE_NETWORK'; // No-cache headers per API-001
  mixedContentMode: 'never' | 'always' | 'compatibility'; // Handle mixed HTTP/HTTPS
  scalesPageToFit: boolean; // Fit content to screen width
}

/**
 * Barcode Scanner Permission State
 * MAP-020: Permission check before barcode routing
 * Source IDs: BEH-023, BEH-024, ERRPATH-008, SEC-004
 */
export interface BarcodeScannerPermissionState {
  status: 'granted' | 'denied' | 'undetermined';
  requestNeeded: boolean; // true if 'undetermined'
}
