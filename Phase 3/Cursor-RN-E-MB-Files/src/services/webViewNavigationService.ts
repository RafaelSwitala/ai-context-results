import {
  ABOUT_BLANK,
  BARCODE_SCANNER_SCHEME,
  ERROR_QUERY_TOKEN,
  LOGIN_PAGE_TOKEN,
} from '../navigation/navigation.constants';

/** MAP-009 — BEH-008, BEH-020, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005 */

export enum WebViewRouteOutcome {
  Scanner = 'SCANNER',
  LoginRoute = 'LOGIN_ROUTE',
  Error = 'ERROR',
  Hidden = 'HIDDEN',
  Normal = 'NORMAL',
}

export function classifyWebViewUrl(url: string): WebViewRouteOutcome {
  const lower = url.toLowerCase();
  if (lower.startsWith(BARCODE_SCANNER_SCHEME) && lower.includes('://')) {
    return WebViewRouteOutcome.Scanner;
  }
  if (lower.includes(ERROR_QUERY_TOKEN)) {
    return WebViewRouteOutcome.Error;
  }
  if (lower.includes(LOGIN_PAGE_TOKEN)) {
    return WebViewRouteOutcome.LoginRoute;
  }
  if (lower.includes(ABOUT_BLANK)) {
    return WebViewRouteOutcome.Hidden;
  }
  return WebViewRouteOutcome.Normal;
}

export function shouldOverrideWebViewUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return lower.startsWith(BARCODE_SCANNER_SCHEME) || lower.includes(LOGIN_PAGE_TOKEN);
}

export function deriveScannerReturnUrl(url: string, isHttps: boolean): string | null {
  const lower = url.toLowerCase();
  if (!lower.startsWith(BARCODE_SCANNER_SCHEME) || !lower.includes('://')) {
    return null;
  }
  const protocol = isHttps ? 'https://' : 'http://';
  return `${protocol}${url.split('://')[1]}`;
}

export function shouldHideWebView(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.startsWith(BARCODE_SCANNER_SCHEME) ||
    lower.includes(LOGIN_PAGE_TOKEN) ||
    lower.includes(ABOUT_BLANK)
  );
}

export function extractErrorCodeFromUrl(url: string): string {
  const pos = url.lastIndexOf('-');
  if (pos > 0) {
    return url.substring(pos);
  }
  return '';
}

export function isLoginFormAction(action: string): boolean {
  return action.toLowerCase().includes(LOGIN_PAGE_TOKEN);
}

export function resolveWebViewUrl(intentUrl: string | null | undefined, storedUrl: string): string {
  const current = intentUrl ?? storedUrl;
  return current ?? '';
}

export function shouldRouteToLoginOnEmptyUrl(url: string): boolean {
  return url.length === 0;
}

export function shouldNavigateOnWebViewBack(hasValidLogin: boolean): boolean {
  return !hasValidLogin;
}
