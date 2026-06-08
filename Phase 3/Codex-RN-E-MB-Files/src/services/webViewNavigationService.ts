import { WEBVIEW_NAVIGATION } from '../navigation/navigation.constants';
import { HttpProtocol } from '../types/storageConfig';
import { deriveScannerReturnUrl } from './scannerNavigationService';

export type WebViewNavigationDecision =
  | { action: 'load'; url: string }
  | { action: 'empty-url' }
  | { action: 'open-barcode-scanner'; returnUrl: string }
  | { action: 'return-to-login'; reason: 'login-url' | 'login-form' | 'error-url' | 'webview-error' };

export function classifyWebViewUrl(url: string | null | undefined, protocol: HttpProtocol): WebViewNavigationDecision {
  const rawUrl = (url ?? '').trim();
  if (!rawUrl) {
    return { action: 'empty-url' };
  }

  const lower = rawUrl.toLowerCase();
  if (lower.startsWith(WEBVIEW_NAVIGATION.barcodeScanner) && lower.includes('://')) {
    return {
      action: 'open-barcode-scanner',
      returnUrl: deriveScannerReturnUrl(rawUrl, protocol),
    };
  }

  if (lower.includes(WEBVIEW_NAVIGATION.error)) {
    return { action: 'return-to-login', reason: 'error-url' };
  }

  if (lower.includes(WEBVIEW_NAVIGATION.login)) {
    return { action: 'return-to-login', reason: 'login-url' };
  }

  return { action: 'load', url: rawUrl };
}

export function classifyWebViewFormAction(actionUrl: string | null | undefined): WebViewNavigationDecision | null {
  const rawUrl = (actionUrl ?? '').trim().toLowerCase();
  if (!rawUrl) {
    return null;
  }

  return rawUrl.includes(WEBVIEW_NAVIGATION.login)
    ? { action: 'return-to-login', reason: 'login-form' }
    : null;
}
