/** RT-010..RT-015 — LT-012, LT-019, LT-023, LT-026 */

import {
  deriveScannerReturnUrl,
  resolveWebViewUrl,
  shouldNavigateOnWebViewBack,
  shouldRouteToLoginOnEmptyUrl,
} from '../services/webViewNavigationService';

describe('webViewNavigationService', () => {
  /** RT-010 / LT-012, LT-004 */
  it('resolveWebViewUrl empty routes to login', () => {
    expect(shouldRouteToLoginOnEmptyUrl(resolveWebViewUrl(null, ''))).toBe(true);
  });

  /** RT-011 / LT-012 */
  it('resolveWebViewUrl prefers intent URL over stored URL', () => {
    expect(resolveWebViewUrl('https://intent', 'https://stored')).toBe('https://intent');
  });

  /** RT-012 / LT-012 */
  it('resolveWebViewUrl falls back to stored URL', () => {
    expect(resolveWebViewUrl(null, 'https://stored')).toBe('https://stored');
  });

  /** RT-013 / LT-019, LT-026 */
  it('deriveScannerReturnUrl converts barcode scheme with https', () => {
    expect(deriveScannerReturnUrl('barcodescanner://host/path', true)).toBe('https://host/path');
  });

  /** RT-014 / LT-026 */
  it('deriveScannerReturnUrl returns null without scheme separator', () => {
    expect(deriveScannerReturnUrl('barcodescannerhost', true)).toBeNull();
  });

  /** RT-015 / LT-023, BEH-030 */
  it('shouldNavigateOnWebViewBack is no-op when logged in', () => {
    expect(shouldNavigateOnWebViewBack(true)).toBe(false);
    expect(shouldNavigateOnWebViewBack(false)).toBe(true);
  });
});
