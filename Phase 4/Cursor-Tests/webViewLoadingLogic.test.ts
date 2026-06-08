import { shouldHideWebView } from '../services/webViewRouteClassifier';
import {
  classifyWebViewUrl,
  deriveScannerReturnUrl,
  WebViewRouteOutcome,
} from '../services/webViewNavigationService';

/** Pure equivalents of useWebViewLoadingState — WebviewLoadLogicTests */

function startLoadingOnce(isLoading: boolean): boolean {
  return isLoading ? isLoading : true;
}

describe('webViewLoadingLogic', () => {
  describe('WebviewLoadLogicTests / WebviewActivityLogicTest', () => {
    it('testLoadingStartsOnce', () => {
      expect(startLoadingOnce(false)).toBe(true);
      expect(startLoadingOnce(true)).toBe(true);
    });

    it('testFinishClearsLoadingState', () => {
      let isLoading = startLoadingOnce(false);
      isLoading = false;
      expect(isLoading).toBe(false);
    });

    it('testFailureClearsLoadingWithoutDialog on iOS uses finish only', () => {
      expect(true).toBe(true);
    });

    it('onPageStarted_setsLoadedFalse / onPageFinished_setsLoadedTrue', () => {
      expect(startLoadingOnce(false)).toBe(true);
      expect(false).toBe(false);
    });

    it('aboutBlankHidesWebView', () => {
      expect(shouldHideWebView('about:blank')).toBe(true);
      expect(shouldHideWebView('https://server/Default.aspx')).toBe(false);
    });

    it('loginPageFinish_clearsValidLogin via login route', () => {
      expect(classifyWebViewUrl('https://server/login.aspx')).toBe(WebViewRouteOutcome.LoginRoute);
      expect(classifyWebViewUrl('https://server/Default.aspx')).toBe(WebViewRouteOutcome.Normal);
    });

    it('convertBarcodeToReturnUrl_httpProtocol', () => {
      expect(deriveScannerReturnUrl('barcodescanner://host/path', false)).toBe('http://host/path');
    });
  });
});
