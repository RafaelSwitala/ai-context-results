/**
 * Navigation Constants
 * 
 * Defines route names, URL scheme constants and deep link configuration.
 * 
 * Corresponds to Phase 1 mapping: MAP-008
 * Source IDs: IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002
 * 
 * @file navigation/navigation.constants.ts
 */

/**
 * Root Stack Route Names
 * 
 * Corresponds to:
 * - iOS: Storyboard scene identifiers (WEBVIEW, PINCODE, SETTINGS, etc.)
 * - Android: Activity classes (LoginActivity, WebviewActivity, etc.)
 */
export const ROUTE_NAMES = {
  LOGIN: 'Login',
  SETTINGS: 'Settings',
  PIN: 'PIN',
  WEB_VIEW: 'WebView',
  QR_CODE_SCANNER: 'QRCodeScanner',
  BARCODE_SCANNER: 'BarcodeScannerScreen',
  LICENSE: 'License',
} as const;

/**
 * WebView URL Schemes and Special URLs
 * 
 * Corresponds to:
 * - iOS: AppSettings route constants (barcodescanner, login.aspx)
 * - Android: App.URL scheme and WebView URL detection
 * 
 * Source: [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:21 symbol=AppSettings]
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:31 symbol=URL]
 */
export const WEB_VIEW_SCHEMES = {
  BARCODE_SCANNER: 'barcodescanner',
  LOGIN_PAGE: 'login.aspx',
  ERROR_PREFIX: 'error=-',
} as const;

/**
 * Route Parameters and Query Keys
 * 
 * Corresponds to:
 * - iOS: Segue property assignments and unwind return values
 * - Android: Intent extra keys and result codes
 * 
 * Source: [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor]
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished]
 */
export const ROUTE_PARAMS = {
  URL: 'url',
  RETURN_URL: 'returnUrl',
  SCAN_RESULT: 'ScanResult',
  RETURN_TO: 'returnTo',
  QR_RESULT: 'qrResult',
  QR_CALLBACK: 'onQrResult',
} as const;

/**
 * Deep Link URI Schemes
 * 
 * For future deep link integration:
 * - Scheme: app://login, app://webview
 * - Supported in both iOS (URL scheme) and Android (Intent filter)
 */
export const DEEP_LINK_SCHEMES = {
  APP_SCHEME: 'app://',
  LOGIN: 'app://login',
  WEBVIEW: 'app://webview',
} as const;

/**
 * Result Codes for Scanner Activities
 * 
 * Corresponds to Android onActivityResult pattern:
 * - RESULT_OK: Valid scan or settings save
 * - RESULT_CANCELED: User cancellation
 */
export const RESULT_CODES = {
  OK: 'RESULT_OK',
  CANCELED: 'RESULT_CANCELED',
} as const;

/**
 * Navigation Stack Names
 * 
 * For future implementation of nested stacks (modal, settings flow, etc.)
 */
export const STACK_NAMES = {
  ROOT: 'Root',
  AUTH: 'Auth',
  APP: 'App',
} as const;

export type RouteNameType = typeof ROUTE_NAMES[keyof typeof ROUTE_NAMES];
