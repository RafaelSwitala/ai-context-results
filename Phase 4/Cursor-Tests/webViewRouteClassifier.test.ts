/** RT-001..RT-012 — LT-025, LT-016, LT-018, LT-020, LT-021, LT-026, LT-029 */

import {
  classifyWebViewUrl,
  extractErrorCodeFromUrl,
  isLoginFormAction,
  shouldHideWebView,
  shouldOverrideWebViewUrl,
  WebViewRouteOutcome,
} from '../services/webViewRouteClassifier';

describe('webViewRouteClassifier', () => {
  /** RT-001 / LT-025 */
  it('classifies barcode URL as scanner route', () => {
    expect(classifyWebViewUrl('barcodescanner://host/path')).toBe(WebViewRouteOutcome.Scanner);
  });

  /** RT-002 / LT-025 */
  it('classifies login.aspx as login route', () => {
    expect(classifyWebViewUrl('https://server/Login.aspx')).toBe(WebViewRouteOutcome.LoginRoute);
  });

  /** RT-003 / LT-025, LT-020 */
  it('classifies error query as error route', () => {
    expect(classifyWebViewUrl('https://server/Login.aspx?Error=-6')).toBe(WebViewRouteOutcome.Error);
  });

  /** RT-004 / LT-025, LT-029 */
  it('classifies about:blank as hidden', () => {
    expect(classifyWebViewUrl('about:blank')).toBe(WebViewRouteOutcome.Hidden);
  });

  /** RT-005 / LT-025 */
  it('classifies normal page as normal route', () => {
    expect(classifyWebViewUrl('https://server/Default.aspx')).toBe(WebViewRouteOutcome.Normal);
  });

  /** RT-006 / LT-016 */
  it('shouldOverrideUrlLoading suppresses barcode and login URLs', () => {
    expect(shouldOverrideWebViewUrl('barcodescanner://host')).toBe(true);
    expect(shouldOverrideWebViewUrl('https://server/login.aspx')).toBe(true);
    expect(shouldOverrideWebViewUrl('https://server/Default.aspx')).toBe(false);
  });

  /** RT-007 / LT-020 */
  it('extractErrorCodeFromUrl returns suffix after last dash', () => {
    expect(extractErrorCodeFromUrl('https://server/Login.aspx?Error=-6')).toBe('-6');
  });

  /** RT-008 / LT-021 */
  it('shouldHideWebView hides barcode, login and about:blank', () => {
    expect(shouldHideWebView('barcodescanner://host')).toBe(true);
    expect(shouldHideWebView('https://server/login.aspx')).toBe(true);
    expect(shouldHideWebView('about:blank')).toBe(true);
    expect(shouldHideWebView('https://server/Default.aspx')).toBe(false);
  });

  /** RT-009 / LT-018 */
  it('isLoginFormAction detects login.aspx in form action', () => {
    expect(isLoginFormAction('https://server/login.aspx')).toBe(true);
    expect(isLoginFormAction('https://server/home.aspx')).toBe(false);
  });
});
