/** RT-025..RT-027 — LT-017, LT-020, LT-027 */

import { classifyWebViewUrl, extractErrorCodeFromUrl, WebViewRouteOutcome } from '../services/webViewRouteClassifier';
import { shouldRouteToLoginOnEmptyUrl } from '../services/webViewNavigationService';
import { mapServerError } from '../utils/serverErrorMapper';
import { shouldShowWebViewErrorDialog } from '../utils/webViewErrorGuard';

describe('webView error handling', () => {
  /** RT-025 / LT-004, LT-012 */
  it('empty URL routes to login instead of WebView load', () => {
    expect(shouldRouteToLoginOnEmptyUrl('')).toBe(true);
  });

  /** RT-026 / LT-020 */
  it('server error URL is detected and code extracted', () => {
    const errorUrl = 'https://server/Login.aspx?Error=-6';
    expect(classifyWebViewUrl(errorUrl)).toBe(WebViewRouteOutcome.Error);
    expect(extractErrorCodeFromUrl(errorUrl)).toBe('-6');
  });

  /** RT-027 / LT-017, LT-027 */
  it('resource error shows dialog only once', () => {
    expect(shouldShowWebViewErrorDialog(false)).toBe(true);
    expect(shouldShowWebViewErrorDialog(true)).toBe(false);
  });

  /** RT-028 / LT-020, BEH-025 */
  it('mapServerError maps known error codes', () => {
    expect(mapServerError('-6')).toContain('bereits angemeldet');
    expect(mapServerError('-1')).toContain('Benutzer');
  });

  /** RT-029 / LT-007 partial — login page finish clears session path */
  it('login route classification triggers session exit path', () => {
    expect(classifyWebViewUrl('https://server/login.aspx')).toBe(WebViewRouteOutcome.LoginRoute);
  });
});
