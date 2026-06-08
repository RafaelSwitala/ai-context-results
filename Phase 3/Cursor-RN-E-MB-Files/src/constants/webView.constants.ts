/** MAP-011, MAP-018 — BEH-016, BEH-017, API-001, API-003, SEC-005 */

export const WEBVIEW_NO_CACHE_HEADERS = {
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
} as const;

export const WEBVIEW_IOS_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X)';

export const WEBVIEW_INJECTED_LOGIN_FORM_CHECK = `
(function() {
  var form = document.getElementsByTagName('form')[0];
  if (form && form.action && form.action.toLowerCase().indexOf('login.aspx') >= 0) {
    window.ReactNativeWebView.postMessage('LOGIN_FORM');
  }
})();
true;
`;
