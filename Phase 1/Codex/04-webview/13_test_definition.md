# Test Definition

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T18:24:31+02:00 |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001, BEH-002, BEH-014, BEH-015 | Unit/navigation | iOS/Android/RN | P0 | Initial WebView URL handoff and empty URL fallback. |
| BEH-003, BEH-004, BEH-016, BEH-017 | Component/unit | iOS/Android/RN | P0 | WebView props/settings/load headers. |
| BEH-005, BEH-006, BEH-007, BEH-018, BEH-027, BEH-029 | State/UI unit | iOS/Android/RN | P1 | Loading indicators and visibility state. |
| BEH-008, BEH-009, BEH-010, BEH-020, BEH-022, BEH-023, BEH-024, BEH-025, BEH-026 | Pure URL classifier/unit | iOS/Android/RN | P0 | URL-triggered scanner/login/error/session behavior. |
| BEH-011, BEH-028, BEH-030 | UI/navigation unit | iOS/Android/RN | P1 | Toolbar actions and Android back behavior. |
| BEH-013, BEH-031 | Service/unit | iOS/Android/RN | P0 | ScanResult return URL construction. |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | WEBVIEW segue passes URL to wrapper | Stored login preferences can build a URL. | LoginViewController prepares WEBVIEW segue. | WebsiteWrapperViewController.url is set to built URL. | EP-001, BEH-001, STATE-001, STOR-002, STOR-005, NAV-001, SEC-001 |
| LT-002 | iOS | Wrapper embeds WebView child | WebsiteWrapperViewController has URL. | viewDidLoad or scanner unwind runs. | WebsiteViewController is created by `WebView` identifier and receives URL. | EP-002, BEH-002, STATE-002, NAV-002 |
| LT-003 | iOS | WebView initial and foreground load | WebsiteViewController has non-empty URL and valid-login true. | viewDidLoad and foreground event run. | WKWebView loads URLRequest with reloadIgnoringLocalCacheData. | EP-003, BEH-003, BEH-004, API-001, UI-001 |
| LT-004 | iOS | Empty URL does not load | WebsiteViewController url is empty. | setTitleAndUrl is invoked by viewDidLoad. | Completion is not called with URL and no load starts. | BEH-004, ERRPATH-001 |
| LT-005 | iOS | Loading state toggles on start and finish/fail | WebView starts then finishes or fails. | Delegate callbacks run. | Loading HUD appears once and hides; isLoading returns false. | EP-004, BEH-005, BEH-006, BEH-007, STATE-003, STATE-004, UI-002 |
| LT-006 | iOS | Barcode URL opens scanner with converted return URL | Navigation action URL begins with `barcodescanner://host/path`. | decidePolicyFor runs. | Policy is cancel and ARTICLE_SCANNER receives HTTP/HTTPS return URL. | EP-004, EP-005, BEH-008, NAV-003, SEC-001 |
| LT-007 | iOS | Login URL/form returns away from WebView | Navigation URL or evaluated form action contains `login.aspx`. | decidePolicyFor or didFinish runs. | URL action is cancelled/dismissed or valid-login false and BACK_TO_LOGIN occurs. | BEH-009, BEH-010, ERRPATH-003, STATE-005, NAV-004, SEC-002 |
| LT-008 | iOS | Toolbar logout returns to Login | User chooses WebView logout. | barButtonTouched logout action runs. | Valid-login false and BACK_TO_LOGIN after delete callback. | EP-005, BEH-011, STATE-005, NAV-004, STOR-001 |
| LT-009 | iOS | View disappear cleans WebView | WebView is loading. | viewWillDisappear runs. | stopLoading is called, delegate set nil and network indicator false. | EP-003, BEH-012, SEC-002 |
| LT-010 | iOS | Article scanner return URL includes scan result | ArticleScanner has redirectUrl and optional code. | BACK_TO_WEBVIEW prepare runs. | Wrapper URL is redirectUrl plus ScanResult when code exists, otherwise redirectUrl. | EP-006, BEH-013, NAV-005, SEC-001 |
| LT-011 | Android | Login passes URL extra to WebviewActivity | Login flow has built URL. | login click starts WebviewActivity. | Intent extra `App.URL` contains URL. | EP-007, BEH-014, NAV-006, STOR-005, SEC-001 |
| LT-012 | Android | WebviewActivity URL source and empty fallback | Intent URL present, absent with stored URL, and absent with empty stored URL. | onCreate runs. | Present/stored URL initializes WebView; empty URL starts LoginActivity. | EP-008, BEH-015, STATE-006, ERRPATH-004, NAV-007 |
| LT-013 | Android | WebView settings and initial load | WebviewActivity has current URL. | showWebView runs. | JavaScript/DOM/no-cache/zoom/multiple-window/user-agent settings and no-cache loadUrl headers are applied. | BEH-016, BEH-017, API-003, SEC-005, UI-004 |
| LT-014 | Android | Page start and finish update loading state | WebViewClient receives page start and finish. | Callbacks run. | `loaded=false` then `loaded=true`; progress hides at finish. | EP-009, BEH-018, BEH-027, STATE-008, STATE-009, UI-005 |
| LT-015 | Android | SSL error branch respects protocol | Login preferences are HTTPS-without-validation or normal HTTPS. | onReceivedSslError runs. | Handler proceeds only for HTTPS-without-validation. | BEH-019, ERRPATH-009, SEC-003 |
| LT-016 | Android | URL override suppresses barcode/login | shouldOverrideUrlLoading receives barcode, login and normal URLs. | Callback runs. | Barcode/login return true; normal returns false and shows progress. | BEH-020, NAV-008, UI-005 |
| LT-017 | Android | WebView HTTP/resource errors return to Login | HTTP error or first resource error occurs. | Error callbacks run and OK is tapped. | WebView content clears, mapped dialog appears, LoginActivity starts. | BEH-021, ERRPATH-005, ERRPATH-006, NAV-007, UI-006 |
| LT-018 | Android | Page finish login form returns to Login | Page JavaScript returns form action containing `login.aspx`. | onPageFinished runs. | Valid-login false, LoginActivity starts and WebviewActivity finishes. | BEH-022, STATE-010, API-004, SEC-002 |
| LT-019 | Android | Page finish barcode permission branches | Finished URL starts with `barcodescanner://`; camera permission granted or denied. | onPageFinished runs. | Granted starts BarcodeScannerActivity with return URL; denied dialog OK loads return URL. | BEH-023, BEH-024, ERRPATH-008, NAV-008, SEC-004 |
| LT-020 | Android | Page finish server error maps dialog | Finished URL contains `error=-6`. | onPageFinished runs. | WebView clears and mapped error dialog starts Login after OK. | BEH-025, ERRPATH-007, NAV-007 |
| LT-021 | Android | Page finish login/about visibility rules | Finished URL contains login, about:blank, barcode or normal URL. | onPageFinished end runs. | WebView hides for barcode/login/about blank and shows for normal URL. | BEH-026, BEH-027, UI-005 |
| LT-022 | Android | Toolbar logout and close | Toolbar logout or close item selected. | initToolbars listener runs. | Logout calls App.logout and finish; close calls finishAffinity. | EP-010, BEH-028, NAV-010, UI-006, SEC-002 |
| LT-023 | Android | Lifecycle and back cleanup | onPause, onResume invalid login, onBackPressed and onDestroy run. | Lifecycle/back callbacks run. | Progress hides, invalid login finishes, back no-ops, webView reference clears. | BEH-029, BEH-030, STATE-010, SEC-002 |
| LT-024 | Android | Barcode scanner returns WebView URL | Scanner cancel or scanned code occurs. | BarcodeScannerActivity handlers run. | WebviewActivity receives original URL or URL plus ScanResult. | EP-011, BEH-031, NAV-009, SEC-001 |
| LT-025 | Cross | WebView route constants classify URLs | Inputs contain barcode, login, error, about blank and normal URLs. | RN classifier is called. | Classifier returns scanner, login, error, hidden and normal outcomes matching platform facts. | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-020, BEH-025, BEH-027 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-026 | iOS | Barcode URL starts with `barcodescanner` but lacks `://`. | Current iOS code indexes split part; RN should guard and document behavior. | BEH-008, ERRPATH-002 |
| LT-027 | Android | Duplicate resource errors after first failure. | Only first resource error dialog is shown. | BEH-021, ERRPATH-006 |
| LT-028 | Android | Timeout LongOperation reaches 20 seconds. | No timeout dialog occurs because timeout body is inactive. | BEH-018 |
| LT-029 | Android | WebView current URL is `about:blank`. | WebView hidden on page finish. | BEH-027 |
| LT-030 | Cross | URL route param contains password query. | Tests assert no logging and route param is treated as sensitive. | SEC-001 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Initial load and settings | BEH-001, BEH-004, BEH-015, BEH-016, BEH-017, API-001, API-003 | Cover URL source, empty URL, settings and headers. | WebView parity starts with a correct load. |
| URL/event classification | BEH-008, BEH-009, BEH-010, BEH-020, BEH-022, BEH-023, BEH-025, BEH-026, ERRPATH-003, ERRPATH-007 | Cover barcode, login, error and hidden WebView outcomes. | These callbacks are the main behavioral surface. |
| Errors and security | BEH-007, BEH-019, BEH-021, ERRPATH-005, ERRPATH-006, ERRPATH-008, ERRPATH-009, SEC-001, SEC-003, SEC-004 | Cover failure UX, SSL branch and permission branch. | Prevents unsafe or silent regressions. |
| Lifecycle/UI | BEH-005, BEH-006, BEH-027, BEH-028, BEH-029, BEH-030, UI-001, UI-006 | Cover loading indicators, toolbar, visibility, pause/resume/back/destroy. | Prevents stuck loaders and stale screens. |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001, DEP-004 | Real native WebView rendering requires simulator/device or RN runtime. | Unit-test props/callback handlers and run device smoke tests later. |
| DEP-002 | MBProgressHUD visual rendering is native UI library behavior. | Assert loading state calls and RN ActivityIndicator visibility. |
| DEP-006 | Camera permission and scanner runtime require platform permission APIs/hardware. | Mock permission and scanner route results. |
| API-005 | No direct WebView-owned REST client exists. | Test mocked login/settings URL providers and WebView route consumption. |
