/** MAP-008 — IOS-FILE-009, AND-FILE-002, STOR-003 */

export const ROUTE_PARAM_URL = 'URL';
export const BARCODE_SCANNER_SCHEME = 'barcodescanner';
export const SCAN_RESULT_QUERY = '&ScanResult=';
export const LOGIN_PAGE_TOKEN = 'login.aspx';
export const ERROR_QUERY_TOKEN = 'error=-';
export const ABOUT_BLANK = 'about:blank';

export const ROUTE_NAMES = {
  Login: 'Login',
  Settings: 'Settings',
  Pin: 'Pin',
  WebView: 'WebView',
  QRCodeScanner: 'QRCodeScanner',
  BarcodeScanner: 'BarcodeScanner',
  License: 'License',
} as const;

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];
