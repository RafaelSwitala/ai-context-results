# Traceability Matrix

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS wrapper starts webview | WebsiteWrapperViewController.showWebview | LT-001 | MAP-001, MAP-005 | WebViewScreen | READY_FOR_REVIEW |
| EP-002 | Entry Point | Android webview activity start | WebviewActivity.onCreate | LT-001, LT-013 | MAP-001, MAP-005 | WebViewScreen | READY_FOR_REVIEW |
| EP-003 | Entry Point | iOS foreground handler | applicationWillEnterForeground | LT-012 | MAP-014 | useWebViewSessionState | READY_FOR_REVIEW |
| EP-004 | Entry Point | Android onResume guard | WebviewActivity.onResume | LT-012 | MAP-014, MAP-010 | useWebViewSessionState | READY_FOR_REVIEW |
| BEH-001 | Behavior | initial URL load | load/loadUrl | LT-001 | MAP-001, MAP-005, MAP-011 | webviewLoadService | READY_FOR_REVIEW |
| BEH-002 | Behavior | loading indicators | didStart/onPageStarted | LT-002 | MAP-001, MAP-013 | useWebViewLoadState | READY_FOR_REVIEW |
| BEH-003 | Behavior | iOS barcode intercept | decidePolicyFor | LT-003 | MAP-002, MAP-016 | urlInterceptHandler | READY_FOR_REVIEW |
| BEH-004 | Behavior | Android barcode on finished | onPageFinished | LT-004, LT-014 | MAP-002, MAP-016 | urlInterceptHandler | READY_FOR_REVIEW |
| BEH-005 | Behavior | JS session expiry | evaluateJavascript | LT-005 | MAP-003, MAP-014 | sessionProbe | READY_FOR_REVIEW |
| BEH-006 | Behavior | iOS login URL dismiss | decidePolicyFor login | LT-006 | MAP-002, MAP-017 | urlInterceptHandler | READY_FOR_REVIEW |
| BEH-007 | Behavior | Android login URL redirect | onPageFinished login | LT-007 | MAP-002, MAP-017 | urlInterceptHandler | READY_FOR_REVIEW |
| BEH-008 | Behavior | toolbar logout | barButton/menu logout | LT-008, LT-009 | MAP-004, MAP-006 | WebViewToolbar | READY_FOR_REVIEW |
| BEH-009 | Behavior | Android webview errors | onReceivedError/HttpError | LT-010, LT-016 | MAP-001, MAP-018 | WebViewScreen | READY_FOR_REVIEW |
| BEH-010 | Behavior | Android SSL proceed | onReceivedSslError | LT-011 | MAP-007, MAP-020 | webviewTlsPolicy | READY_FOR_REVIEW |
| BEH-011 | Behavior | iOS foreground login guard | willEnterForeground | LT-012 | MAP-014 | useWebViewSessionState | READY_FOR_REVIEW |
| BEH-012 | Behavior | Android webview settings | WebSettings config | LT-012 | MAP-008, MAP-019 | webviewConfig | READY_FOR_REVIEW |
| STATE-001 | State | loading started | isLoading true | LT-002 | MAP-013 | useWebViewLoadState | READY_FOR_REVIEW |
| STATE-002 | State | loading finished | indicator hidden | LT-002 | MAP-013 | useWebViewLoadState | READY_FOR_REVIEW |
| STATE-003 | State | session invalidated | hasValidLogin false | LT-005, LT-008 | MAP-010, MAP-014 | auth state | READY_FOR_REVIEW |
| STATE-004 | State | webview visibility toggle | setVisibility GONE | LT-017 | MAP-015 | useWebViewVisibility | READY_FOR_REVIEW |
| STOR-001 | Storage | iOS url property | WebsiteViewController.url | LT-001 | MAP-009 | route param | READY_FOR_REVIEW |
| STOR-002 | Storage | Android intent URL | App.URL extra | LT-001 | MAP-009 | route param | READY_FOR_REVIEW |
| STOR-003 | Storage | hasValidLogin flag | PreferencesUtils | LT-005, LT-012 | MAP-010, MAP-023 | auth state | READY_FOR_REVIEW |
| STOR-004 | Storage | Android currentUrl field | WebviewActivity field | LT-001 | MAP-009 | in-memory state | READY_FOR_REVIEW |
| API-001 | API | implicit page GET | WebView load | LT-001 | MAP-011 | react-native-webview | READY_FOR_REVIEW |
| API-002 | API | iOS logout API | PeApiHelper.doDeleteUser | LT-008 | MAP-012, MAP-006 | sessionService | READY_FOR_REVIEW |
| API-003 | API | Android logout API | App.logout | LT-009 | MAP-012, MAP-006 | sessionService | READY_FOR_REVIEW |
| NAV-001 | Navigation | iOS to scanner | ARTICLE_SCANNER segue | LT-003 | MAP-002 | navigation feature | READY_FOR_REVIEW |
| NAV-002 | Navigation | iOS to login unwind | BACK_TO_LOGIN | LT-005, LT-008, LT-012 | MAP-022 | navigation feature | READY_FOR_REVIEW |
| NAV-003 | Navigation | Android to scanner | startActivity scanner | LT-004 | MAP-002 | navigation feature | READY_FOR_REVIEW |
| NAV-004 | Navigation | Android to login | multiple paths | LT-007, LT-010, LT-013 | MAP-022, MAP-017 | navigation feature | READY_FOR_REVIEW |
| NAV-005 | Navigation | iOS dismiss on login URL | dismiss | LT-006 | MAP-017 | navigation feature | READY_FOR_REVIEW |
| ERRPATH-001 | Error Path | iOS load fail silent | didFail | LT-015 | MAP-018 | WebViewScreen | READY_FOR_REVIEW |
| ERRPATH-002 | Error Path | Android load error dialog | onReceivedError | LT-010 | MAP-018 | WebViewScreen | READY_FOR_REVIEW |
| ERRPATH-003 | Error Path | Android ERROR URL | onPageFinished error branch | LT-016 | MAP-002 | urlInterceptHandler | READY_FOR_REVIEW |
| ERRPATH-004 | Error Path | camera permission denied | onPageFinished | LT-014 | MAP-002 | urlInterceptHandler | READY_FOR_REVIEW |
| ERRPATH-005 | Error Path | empty URL at start | onCreate | LT-013 | MAP-005 | webviewLoadService | READY_FOR_REVIEW |
| DEP-001 | Dependency | WKWebView | WebKit | LT-001 | MAP-021 | react-native-webview | READY_FOR_REVIEW |
| DEP-002 | Dependency | MBProgressHUD | loading overlay | LT-002 | MAP-001 | WebViewScreen | READY_FOR_REVIEW |
| DEP-003 | Dependency | Android WebView client | WebViewClient | LT-004 | MAP-021 | react-native-webview | READY_FOR_REVIEW |
| DEP-004 | Dependency | URL constants | AppSettings/App | LT-003, LT-007 | MAP-002 | urlInterceptHandler | READY_FOR_REVIEW |
| DEP-005 | Dependency | PeApiHelper | logout cleanup | LT-008 | MAP-006 | sessionService | READY_FOR_REVIEW |
| UI-001 | UI | iOS action sheet logout | barButtonTouched | LT-008 | MAP-004 | WebViewToolbar | READY_FOR_REVIEW |
| UI-002 | UI | Android toolbar menu | menu_toolbar | LT-009 | MAP-004 | WebViewToolbar | READY_FOR_REVIEW |
| UI-003 | UI | Android progress bar | progressBar1 | LT-002 | MAP-001 | WebViewScreen | READY_FOR_REVIEW |
| UI-004 | UI | webview visibility | setVisibility | LT-017 | MAP-015 | useWebViewVisibility | READY_FOR_REVIEW |
| SEC-001 | Security | credential URL in load | initial URL | LT-001 | MAP-009 | webviewLoadService | READY_FOR_REVIEW |
| SEC-002 | Security | SSL bypass policy | onReceivedSslError | LT-011 | MAP-007, MAP-020 | webviewTlsPolicy | READY_FOR_REVIEW |
| SEC-003 | Security | JS enabled for app + probe | setJavaScriptEnabled | LT-005 | MAP-003, MAP-008 | webviewConfig | READY_FOR_REVIEW |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| N/A | Keine offenen Traceability-Lücken in P1-A12 | N/A | N/A |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
