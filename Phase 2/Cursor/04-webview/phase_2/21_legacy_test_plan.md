# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:30:00+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Stored login prefs bauen URL | LoginViewController prepare WEBVIEW | WebsiteWrapper.url = built URL | EP-001, BEH-001, STATE-001, STOR-002, NAV-001 | P0 |
| LT-002 | iOS | WebsiteWrapper hat URL | viewDidLoad / scanner unwind | WebsiteViewController mit URL als Child | EP-002, BEH-002, STATE-002, NAV-002 | P0 |
| LT-003 | iOS | Non-empty URL, valid-login true | viewDidLoad + Foreground | WKWebView lädt mit reloadIgnoringLocalCacheData | EP-003, BEH-003, BEH-004, API-001 | P0 |
| LT-004 | iOS | WebsiteViewController url leer | setTitleAndUrl | Kein Load-URL, kein Start | BEH-004, ERRPATH-001 | P0 |
| LT-005 | iOS | WebView start/finish/fail | Delegate callbacks | Loading HUD einmal; isLoading false | EP-004, BEH-005, BEH-006, BEH-007, STATE-003, STATE-004 | P1 |
| LT-006 | iOS | URL beginnt mit barcodescanner:// | decidePolicyFor | Cancel; ARTICLE_SCANNER mit Return-URL | EP-004, BEH-008, NAV-003, SEC-001 | P0 |
| LT-007 | iOS | URL/Form enthält login.aspx | decidePolicyFor / didFinish | Cancel/dismiss oder BACK_TO_LOGIN | BEH-009, BEH-010, ERRPATH-003, STATE-005, NAV-004 | P0 |
| LT-008 | iOS | User wählt Logout | barButtonTouched | valid-login false; BACK_TO_LOGIN | EP-005, BEH-011, STATE-005, STOR-001 | P0 |
| LT-009 | iOS | WebView lädt | viewWillDisappear | stopLoading, delegate nil | EP-003, BEH-012, SEC-002 | P1 |
| LT-010 | iOS | ArticleScanner redirectUrl + optional code | BACK_TO_WEBVIEW prepare | URL mit/ohne ScanResult | EP-006, BEH-013, NAV-005 | P0 |
| LT-011 | Android | Login baut URL | login click | WebviewActivity Intent App.URL | EP-007, BEH-014, NAV-006, STOR-005 | P0 |
| LT-012 | Android | Intent-URL present/absent/empty | WebviewActivity onCreate | WebView load oder LoginActivity | EP-008, BEH-015, STATE-006, ERRPATH-004, NAV-007 | P0 |
| LT-013 | Android | WebviewActivity hat URL | showWebView | JS/DOM/no-cache/zoom/UA + no-cache headers | BEH-016, BEH-017, API-003, SEC-005 | P0 |
| LT-014 | Android | Page start/finish | WebViewClient callbacks | loaded false→true; progress hidden | EP-009, BEH-018, BEH-027, STATE-008, STATE-009 | P1 |
| LT-015 | Android | HTTPS-with/without validation | onReceivedSslError | proceed nur bei protocol 2 | BEH-019, ERRPATH-009, SEC-003 | P0 |
| LT-016 | Android | Barcode/login/normal URL | shouldOverrideUrlLoading | Barcode/login true; normal false | BEH-020, NAV-008 | P0 |
| LT-017 | Android | HTTP/resource error | Error callbacks + OK | Blank WebView, Dialog, Login | BEH-021, ERRPATH-005, ERRPATH-006, NAV-007 | P0 |
| LT-018 | Android | Form action login.aspx | onPageFinished JS | valid-login false; LoginActivity + finish | BEH-022, STATE-010, API-004, SEC-002 | P0 |
| LT-019 | Android | Barcode URL; Kamera granted/denied | onPageFinished | Scanner startet bzw. Dialog + Return-URL | BEH-023, BEH-024, ERRPATH-008, NAV-008, SEC-004 | P0 |
| LT-020 | Android | URL enthält error=- | onPageFinished | WebView clear + Error-Dialog → Login | BEH-025, ERRPATH-007, NAV-007 | P0 |
| LT-021 | Android | Barcode/login/about/normal URL | onPageFinished visibility | WebView hidden/visible | BEH-026, BEH-027, UI-005 | P0 |
| LT-022 | Android | Toolbar logout/close | initToolbars | App.logout+finish; finishAffinity | EP-010, BEH-028, NAV-010, SEC-002 | P1 |
| LT-023 | Android | onPause/onResume/back/destroy | Lifecycle callbacks | Progress hide; invalid finish; back no-op | BEH-029, BEH-030, STATE-010 | P1 |
| LT-024 | Android | Barcode cancel/scan | BarcodeScannerActivity | WebviewActivity mit URL ± ScanResult | EP-011, BEH-031, NAV-009 | P0 |
| LT-025 | Cross | Barcode/login/error/about/normal URLs | Classifier | Korrekte Outcomes | BEH-008, BEH-020, BEH-025, BEH-027 | P0 |
| LT-026 | iOS | Barcode ohne :// | decidePolicyFor-Logik | Keine sichere Return-URL | BEH-008, ERRPATH-002 | P1 |
| LT-027 | Android | Mehrfache Resource-Errors | onReceivedError | Nur erster Dialog | BEH-021, ERRPATH-006 | P1 |
| LT-028 | Android | 20s Timeout LongOperation | onPostExecute | Kein Timeout-Dialog (inaktiv) | BEH-018 | P2 |
| LT-029 | Android | about:blank URL | onPageFinished | WebView hidden | BEH-027 | P1 |
| LT-030 | Cross | URL mit password query | Logging/Sanitizer | Kein Klartext-Log | SEC-001 | P1 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14 | `StorageConfigTestSupport` | Bestehendes Test-Setup wiederverwendet |
| iOS | XCTest (Quellen erstellt) | Keine WKWebView-Mocks für Pure-Logic | ERR-P2-01: Kein XCTest-Target; macOS/Xcode nötig |
