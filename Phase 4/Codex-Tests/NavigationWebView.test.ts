import { describe, expect, it } from '@jest/globals';

import { ROUTE_NAMES, ROUTE_PARAM_KEYS, WEBVIEW_NAVIGATION } from '../navigation/navigation.constants';
import { classifyWebViewFormAction, classifyWebViewUrl } from '../services/webViewNavigationService';
import {
  buildScanResultUrl,
  deriveScannerReturnUrl,
  normalizeQrPayload,
} from '../services/scannerNavigationService';
import { HttpProtocol } from '../types/storageConfig';
import { mapServerError } from '../utils/serverErrorMapper';

describe('RT-NAV-WEBVIEW navigation and WebView route parity', () => {
  it('RT-NAV-001 [LT-022, LT-025] preserves route and WebView token constants', () => {
    expect(ROUTE_NAMES).toMatchObject({
      login: 'login',
      settings: 'settings',
      pin: 'pin',
      webview: 'webview',
      barcodeScanner: 'barcodeScanner',
      license: 'license',
    });
    expect(ROUTE_PARAM_KEYS).toMatchObject({ url: 'url', returnUrl: 'returnUrl', scanResult: 'scanResult' });
    expect(WEBVIEW_NAVIGATION).toMatchObject({
      barcodeScanner: 'barcodescanner',
      login: 'login.aspx',
      error: 'error=-',
      aboutBlank: 'about:blank',
      scanResult: '&ScanResult=',
    });
  });

  it('RT-NAV-002 [LT-007, LT-018, LT-019, LT-025] classifies barcode, login, error, empty and normal URLs', () => {
    expect(classifyWebViewUrl('barcodescanner://host/path/page', HttpProtocol.Https)).toEqual({
      action: 'open-barcode-scanner',
      returnUrl: 'https://host/path/page',
    });
    expect(classifyWebViewUrl('barcodescanner://host/path/page', HttpProtocol.Http)).toEqual({
      action: 'open-barcode-scanner',
      returnUrl: 'http://host/path/page',
    });
    expect(classifyWebViewUrl('https://server/Login.aspx', HttpProtocol.Https)).toEqual({
      action: 'return-to-login',
      reason: 'login-url',
    });
    expect(classifyWebViewUrl('https://server/Login.aspx?Error=-6', HttpProtocol.Https)).toEqual({
      action: 'return-to-login',
      reason: 'error-url',
    });
    expect(classifyWebViewUrl('', HttpProtocol.Https)).toEqual({ action: 'empty-url' });
    expect(classifyWebViewUrl('https://server/Default.aspx', HttpProtocol.Https)).toEqual({
      action: 'load',
      url: 'https://server/Default.aspx',
    });
  });

  it('RT-NAV-003 [LT-023, LT-026] keeps malformed barcode URLs unconverted', () => {
    expect(deriveScannerReturnUrl('barcodescanner-host/path', HttpProtocol.Https)).toBe('barcodescanner-host/path');
    expect(classifyWebViewUrl('barcodescanner-host/path', HttpProtocol.Https)).toEqual({
      action: 'load',
      url: 'barcodescanner-host/path',
    });
  });

  it('RT-NAV-004 [LT-008, LT-018] detects login form action as session-expired route', () => {
    expect(classifyWebViewFormAction('https://server/login.aspx?x=1')).toEqual({
      action: 'return-to-login',
      reason: 'login-form',
    });
    expect(classifyWebViewFormAction('https://server/home.aspx')).toBeNull();
    expect(classifyWebViewFormAction('')).toBeNull();
  });

  it('RT-NAV-005 [LT-008, LT-009, LT-016] normalizes QR scanner payloads', () => {
    const queryOnly = 'p=MB&v=1&server=test.example.com&mandant=108&https=1';
    expect(normalizeQrPayload(queryOnly)).toBe(`http://localhost?${queryOnly}`);
    expect(normalizeQrPayload(`https://example.test?${queryOnly}`)).toBe(`https://example.test?${queryOnly}`);
    expect(normalizeQrPayload('')).toBe('');
  });

  it('RT-NAV-006 [LT-010, LT-020, LT-024] appends ScanResult only when a scan code exists', () => {
    expect(buildScanResultUrl('https://host/page', '1234567890')).toBe('https://host/page&ScanResult=1234567890');
    expect(buildScanResultUrl('https://host/page', 'code with spaces')).toBe('https://host/page&ScanResult=code%20with%20spaces');
    expect(buildScanResultUrl('https://host/page', '')).toBe('https://host/page');
    expect(buildScanResultUrl('https://host/page', null)).toBe('https://host/page');
  });

  it('RT-WEBVIEW-001 [LT-017, LT-020, LT-027] maps WebView/server errors deterministically', () => {
    expect(mapServerError('-6')).toBe('Server error -6');
    expect(mapServerError(500)).toBe('500');
    expect(mapServerError('')).toBe('Login failed.');
    expect(mapServerError(null)).toBe('Login failed.');
  });
});
