export const ROUTE_NAMES = {
  login: 'login',
  settings: 'settings',
  qrScanner: 'qrScanner',
  pin: 'pin',
  webview: 'webview',
  barcodeScanner: 'barcodeScanner',
  license: 'license',
} as const;

export const ROUTE_PARAM_KEYS = {
  url: 'url',
  returnUrl: 'returnUrl',
  scanResult: 'scanResult',
} as const;

export const WEBVIEW_NAVIGATION = {
  barcodeScanner: 'barcodescanner',
  login: 'login.aspx',
  error: 'error=-',
  aboutBlank: 'about:blank',
  scanResult: '&ScanResult=',
} as const;
