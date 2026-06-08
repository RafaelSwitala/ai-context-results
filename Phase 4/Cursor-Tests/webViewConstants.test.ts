/** RT-021..RT-023 — LT-013, LT-015 */

import {
  WEBVIEW_IOS_USER_AGENT,
  WEBVIEW_NO_CACHE_HEADERS,
} from '../constants/webView.constants';
import { ABOUT_BLANK, ERROR_QUERY_TOKEN } from '../navigation/navigation.constants';
import { HttpProtocol } from '../types/storageConfig';
import { protocolAllowsSslBypass } from '../utils/storageConfigValidation';

describe('webView constants and SSL policy', () => {
  /** RT-021 / LT-013, BEH-017 */
  it('WEBVIEW_NO_CACHE_HEADERS contains Pragma and Cache-Control', () => {
    expect(WEBVIEW_NO_CACHE_HEADERS.Pragma).toBe('no-cache');
    expect(WEBVIEW_NO_CACHE_HEADERS['Cache-Control']).toBe('no-cache');
  });

  /** RT-022 / LT-013, BEH-016 */
  it('WEBVIEW_IOS_USER_AGENT matches legacy iPhone token', () => {
    expect(WEBVIEW_IOS_USER_AGENT).toContain('iPhone');
  });

  /** RT-023 / LT-025 route tokens */
  it('navigation constants include about:blank and error=- tokens', () => {
    expect(ABOUT_BLANK).toBe('about:blank');
    expect(ERROR_QUERY_TOKEN).toBe('error=-');
  });

  /** RT-024 / LT-015, BEH-019 */
  it('protocolAllowsSslBypass only for HTTPS without validation', () => {
    expect(protocolAllowsSslBypass(HttpProtocol.HttpsWithoutValidation)).toBe(true);
    expect(protocolAllowsSslBypass(HttpProtocol.Https)).toBe(false);
    expect(protocolAllowsSslBypass(HttpProtocol.Http)).toBe(false);
  });
});
