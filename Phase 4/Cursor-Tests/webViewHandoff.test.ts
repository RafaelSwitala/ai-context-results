/** RT-016..RT-018 — LT-010, LT-024, LT-011, LT-019 */

import { ROUTE_PARAM_URL, SCAN_RESULT_QUERY } from '../navigation/navigation.constants';
import { requiresAuthGuard } from '../services/navigationAuthGuard';
import { buildScanResultUrl } from '../services/scannerNavigationService';
import { toBarcodeReturnUrl } from '../services/webViewReturnUrlService';

describe('webView handoff services', () => {
  /** RT-016 / LT-024, LT-010 */
  it('buildScanResultUrl appends ScanResult query param', () => {
    expect(buildScanResultUrl('https://host/page', '1234567890')).toBe(
      `https://host/page${SCAN_RESULT_QUERY}1234567890`,
    );
  });

  /** RT-017 / LT-024 */
  it('buildScanResultUrl cancel returns original URL', () => {
    const returnUrl = 'https://host/page';
    expect(buildScanResultUrl(returnUrl, null)).toBe(returnUrl);
  });

  /** RT-018 / LT-011, STOR-005 */
  it('route param URL key matches legacy App.URL', () => {
    expect(ROUTE_PARAM_URL).toBe('URL');
  });

  /** RT-019 / LT-019 */
  it('toBarcodeReturnUrl delegates to https conversion', () => {
    expect(toBarcodeReturnUrl('barcodescanner://host/path', true)).toBe('https://host/path');
  });

  /** RT-020 / LT-030, SEC-001 */
  it('requiresAuthGuard when valid login is false', () => {
    expect(requiresAuthGuard(false)).toBe(true);
    expect(requiresAuthGuard(true)).toBe(false);
  });
});
