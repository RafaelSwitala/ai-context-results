import { WEBVIEW_NAVIGATION } from '../navigation/navigation.constants';
import { HttpProtocol, protocolToScheme } from '../types/storageConfig';

export function normalizeQrPayload(value: string | null | undefined): string {
  const payload = (value ?? '').trim();
  if (!payload) {
    return '';
  }

  return payload.includes('?') ? payload : `http://localhost?${payload}`;
}

export function deriveScannerReturnUrl(scannerUrl: string, protocol: HttpProtocol): string {
  const separator = '://';
  const index = scannerUrl.indexOf(separator);
  if (index < 0) {
    return scannerUrl;
  }

  return `${protocolToScheme(protocol)}://${scannerUrl.slice(index + separator.length)}`;
}

export function buildScanResultUrl(returnUrl: string, scanResult: string | null | undefined): string {
  const code = (scanResult ?? '').trim();
  if (!code) {
    return returnUrl;
  }

  return `${returnUrl}${WEBVIEW_NAVIGATION.scanResult}${encodeURIComponent(code)}`;
}
