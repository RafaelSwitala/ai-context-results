# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_2/21_legacy_test_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | GitHub Copilot |
| Last updated | 2026-06-04 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Stored login preferences can build a URL. | LoginViewController prepares WEBVIEW segue. | WebsiteWrapperViewController.url is set to built URL. | EP-001, BEH-001, STATE-001, STOR-002, STOR-005, NAV-001, SEC-001 | P0 |
| LT-002 | iOS | WebsiteWrapperViewController has URL. | viewDidLoad or scanner unwind runs. | WebsiteViewController is created by `WebView` identifier and receives URL. | EP-002, BEH-002, STATE-002, NAV-002 | P0 |
| LT-003 | iOS | WebsiteViewController has non-empty URL and valid-login true. | viewDidLoad and foreground event run. | WKWebView loads URLRequest with reloadIgnoringLocalCacheData. | EP-003, BEH-003, BEH-004, API-001, UI-001 | P0 |
| LT-004 | iOS | WebsiteViewController url is empty. | setTitleAndUrl is invoked by viewDidLoad. | Completion is not called with URL and no load starts. | BEH-004, ERRPATH-001 | P1 |
| LT-005 | iOS | WebView starts then finishes or fails. | Delegate callbacks run. | Loading HUD appears once and hides; isLoading returns false. | EP-004, BEH-005, BEH-006, BEH-007, STATE-003, STATE-004, UI-002 | P1 |
| LT-006 | iOS | Navigation action URL begins with `barcodescanner://host/path`. | decidePolicyFor runs. | Policy is cancel and ARTICLE_SCANNER receives HTTP/HTTPS return URL. | EP-004, EP-005, BEH-008, NAV-003, SEC-001 | P0 |
| LT-007 | iOS | Navigation URL or evaluated form action contains `login.aspx`. | decidePolicyFor or didFinish runs. | URL action is cancelled/dismissed or valid-login false and BACK_TO_LOGIN occurs. | BEH-009, BEH-010, ERRPATH-003, STATE-005, NAV-004, SEC-002 | P0 |
| LT-008 | iOS | User chooses WebView logout. | barButtonTouched logout action runs. | Valid-login false and BACK_TO_LOGIN after delete callback. | EP-005, BEH-011, STATE-005, NAV-004, STOR-001 | P0 |
| LT-009 | iOS | WebView is loading. | viewWillDisappear runs. | stopLoading is called, delegate set nil and network indicator false. | EP-003, BEH-012, SEC-002 | P1 |
| LT-010 | iOS | ArticleScanner has redirectUrl and optional code. | BACK_TO_WEBVIEW prepare runs. | Wrapper URL is redirectUrl plus ScanResult when code exists, otherwise redirectUrl. | EP-006, BEH-013, NAV-005, SEC-001 | P1 |
| LT-011 | Android | Login flow has built URL. | login click starts WebviewActivity. | Intent extra `App.URL` contains URL. | EP-007, BEH-014, NAV-006, STOR-005, SEC-001 | P0 |
| LT-012 | Android | Intent URL present, absent with stored URL, and absent with empty stored URL. | onCreate runs. | Present/stored URL initializes WebView; empty URL starts LoginActivity. | EP-008, BEH-015, STATE-006, ERRPATH-004, NAV-007 | P0 |
| LT-013 | Android | WebviewActivity has current URL. | showWebView runs. | JavaScript/DOM/no-cache/zoom/multiple-window/user-agent settings and no-cache loadUrl headers are applied. | BEH-016, BEH-017, API-003, SEC-005, UI-004 | P1 |
| LT-014 | Android | WebViewClient receives page start and finish. | Callbacks run. | `loaded=false` then `loaded=true`; progress hides at finish. | EP-009, BEH-018, BEH-027, STATE-008, STATE-009, UI-005 | P1 |
| LT-015 | Android | Login preferences are HTTPS-without-validation or normal HTTPS. | onReceivedSslError runs. | Handler proceeds only for HTTPS-without-validation. | BEH-019, ERRPATH-009, SEC-003 | P1 |
| LT-016 | Android | shouldOverrideUrlLoading receives barcode, login and normal URLs. | Callback runs. | Barcode/login return true; normal returns false and shows progress. | BEH-020, NAV-008, UI-005 | P0 |
| LT-017 | Android | HTTP error or first resource error occurs. | Error callbacks run and OK is tapped. | WebView content clears, mapped dialog appears, LoginActivity starts. | BEH-021, ERRPATH-005, ERRPATH-006, NAV-007, UI-006 | P0 |
| LT-018 | Android | Page JavaScript returns form action containing `login.aspx`. | onPageFinished runs. | Valid-login false, LoginActivity starts and WebviewActivity finishes. | BEH-022, STATE-010, API-004, SEC-002 | P0 |
| LT-019 | Android | Finished URL starts with `barcodescanner://`; camera permission granted or denied. | onPageFinished runs. | Granted starts BarcodeScannerActivity with return URL; denied dialog OK loads return URL. | BEH-023, BEH-024, ERRPATH-008, NAV-008, SEC-004 | P0 |
| LT-020 | Android | Finished URL contains `error=-6`. | onPageFinished runs. | WebView clears and mapped error dialog starts Login after OK. | BEH-025, ERRPATH-007, NAV-007 | P0 |
| LT-021 | Android | Finished URL contains login, about:blank, barcode or normal URL. | onPageFinished end runs. | WebView hides for barcode/login/about blank and shows for normal URL. | BEH-026, BEH-027, UI-005 | P1 |
| LT-022 | Android | Toolbar logout or close item selected. | initToolbars listener runs. | Logout calls App.logout and finish; close calls finishAffinity. | EP-010, BEH-028, NAV-010, UI-006, SEC-002 | P1 |
| LT-023 | Android | onPause, onResume invalid login, onBackPressed and onDestroy run. | Lifecycle/back callbacks run. | Progress hides, invalid login finishes, back no-ops, webView reference clears. | BEH-029, BEH-030, STATE-010, SEC-002 | P1 |
| LT-024 | Android | Scanner cancel or scanned code occurs. | BarcodeScannerActivity handlers run. | WebviewActivity receives original URL or URL plus ScanResult. | EP-011, BEH-031, NAV-009, SEC-001 | P1 |
| LT-025 | Cross | Inputs contain barcode, login, error, about blank and normal URLs. | RN classifier is called. | Classifier returns scanner, login, error, hidden and normal outcomes matching platform facts. | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-020, BEH-025, BEH-027 | P0 |
| LT-026 | iOS | Barcode URL starts with `barcodescanner` but lacks `://`. | Current iOS code indexes split part. | Behavior consistent or documented. | BEH-008, ERRPATH-002 | P1 |
| LT-027 | Android | Duplicate resource errors after first failure. | Multiple errors occur. | Only first resource error dialog is shown. | BEH-021, ERRPATH-006 | P1 |
| LT-028 | Android | Timeout LongOperation reaches 20 seconds. | Network delay occurs. | No timeout dialog occurs because timeout body is inactive. | BEH-018 | P1 |
| LT-029 | Android | WebView current URL is `about:blank`. | Page loads. | WebView hidden on page finish. | BEH-027 | P1 |
| LT-030 | Cross | URL route param contains password query. | Route is used. | Tests assert no logging and route param is treated as sensitive. | SEC-001 | P0 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| iOS | XCTest | WKWebView delegates, UserDefaults, CLLocationManager (optional) | No test target exists in legacy repo; minimal setup required |
| Android | JUnit + Mockito | WebViewClient, Intent, SharedPreferences, Camera/Permission APIs, WebView callbacks | Standard Android test structure exists; compatible with Phase 2 |

## Mapping to Phase 1

All test IDs (LT-001 to LT-030) are derived from Phase 1 artifact `P1-A13` (13_test_definition.md). Each test references one or more source IDs from Phase 1 analysis (EP-*, BEH-*, STATE-*, NAV-*, STOR-*, ERRPATH-*, SEC-*, API-*).

## Excluded Tests

No tests excluded. All 30 LT-* definitions from Phase 1 are included in Phase 2 plan.
