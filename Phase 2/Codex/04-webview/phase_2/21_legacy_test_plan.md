# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T18:08:54+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Stored login preferences can build a URL | Login prepares `WEBVIEW` segue | WebsiteWrapper receives built URL | P1-A13 LT-001; EP-001; BEH-001; STATE-001; STOR-002; STOR-005; NAV-001; SEC-001 | P0 |
| LT-002 | iOS | Wrapper has a URL | Wrapper load/unwind seam runs | WebsiteViewController child receives URL | P1-A13 LT-002; EP-002; BEH-002; STATE-002; NAV-002 | P0 |
| LT-003 | iOS | WebView has non-empty URL and valid-login true | viewDidLoad/foreground seam runs | WKWebView loads reloadIgnoringLocalCacheData request | P1-A13 LT-003; EP-003; BEH-003; BEH-004; API-001; UI-001 | P0 |
| LT-004 | iOS | WebView URL is empty | setTitleAndUrl seam runs | No load starts | P1-A13 LT-004; BEH-004; ERRPATH-001 | P0 |
| LT-005 | iOS | WebView starts then finishes/fails | Delegate callbacks run | Loading HUD toggles and loading false | P1-A13 LT-005; EP-004; BEH-005; BEH-006; BEH-007; STATE-003; STATE-004; UI-002 | P1 |
| LT-006 | iOS | URL starts `barcodescanner://` | decidePolicyFor seam runs | Policy cancel and ArticleScanner receives converted return URL | P1-A13 LT-006; EP-004; EP-005; BEH-008; NAV-003; SEC-001 | P0 |
| LT-007 | iOS | URL/form action contains `login.aspx` | decidePolicyFor or didFinish seam runs | Dismiss/back-to-login and valid-login false where applicable | P1-A13 LT-007; BEH-009; BEH-010; ERRPATH-003; STATE-005; NAV-004; SEC-002 | P0 |
| LT-008 | iOS | User chooses WebView logout | Toolbar logout seam runs | valid-login false and `BACK_TO_LOGIN` after delete callback | P1-A13 LT-008; EP-005; BEH-011; STATE-005; NAV-004; STOR-001 | P1 |
| LT-009 | iOS | WebView is loading | viewWillDisappear runs | stopLoading, delegate nil, network indicator false | P1-A13 LT-009; EP-003; BEH-012; SEC-002 | P1 |
| LT-010 | iOS | ArticleScanner has redirect URL with or without code | `BACK_TO_WEBVIEW` prepare runs | URL includes `ScanResult` only when code exists | P1-A13 LT-010; EP-006; BEH-013; NAV-005; SEC-001 | P0 |
| LT-011 | Android | Login flow has built URL | Login click runs | WebviewActivity intent extra `App.URL` contains URL | P1-A13 LT-011; EP-007; BEH-014; NAV-006; STOR-005; SEC-001 | P0 |
| LT-012 | Android | Intent URL present, absent with stored URL, absent with empty stored URL | WebviewActivity onCreate runs | Present/stored URL loads WebView; empty starts LoginActivity | P1-A13 LT-012; EP-008; BEH-015; STATE-006; ERRPATH-004; NAV-007 | P0 |
| LT-013 | Android | WebviewActivity has current URL | showWebView setup runs | WebView settings, user agent and no-cache headers are applied | P1-A13 LT-013; BEH-016; BEH-017; API-003; SEC-005; UI-004 | P0 |
| LT-014 | Android | WebViewClient receives page start/finish | Callbacks run | `loaded=false`, then `loaded=true`, progress hidden | P1-A13 LT-014; EP-009; BEH-018; BEH-027; STATE-008; STATE-009; UI-005 | P1 |
| LT-015 | Android | SSL error with normal/bypass protocol | onReceivedSslError runs | Proceed only for HTTPS-without-validation | P1-A13 LT-015; BEH-019; ERRPATH-009; SEC-003 | P1 |
| LT-016 | Android | URL is barcode, login, or normal | shouldOverrideUrlLoading runs | barcode/login suppressed; normal allowed and progress shown | P1-A13 LT-016; BEH-020; NAV-008; UI-005 | P0 |
| LT-017 | Android | HTTP/resource error occurs | Error callbacks and OK run | WebView clears, dialog appears, Login starts | P1-A13 LT-017; BEH-021; ERRPATH-005; ERRPATH-006; NAV-007; UI-006 | P0 |
| LT-018 | Android | Page form action/login URL contains `login.aspx` | onPageFinished runs | valid-login false, Login starts, Webview finishes | P1-A13 LT-018; BEH-022; STATE-010; API-004; SEC-002 | P0 |
| LT-019 | Android | Finished URL starts `barcodescanner://` | onPageFinished permission branch runs | Granted starts BarcodeScanner; denied reloads return URL after dialog | P1-A13 LT-019; BEH-023; BEH-024; ERRPATH-008; NAV-008; SEC-004 | P0 |
| LT-020 | Android | Finished URL contains `error=-6` | onPageFinished runs | WebView clears and error dialog starts Login after OK | P1-A13 LT-020; BEH-025; ERRPATH-007; NAV-007 | P0 |
| LT-021 | Android | Finished URL is login/about/barcode/normal | onPageFinished completes | WebView hidden for barcode/login/about and visible for normal | P1-A13 LT-021; BEH-026; BEH-027; UI-005 | P1 |
| LT-022 | Android | Toolbar logout or close selected | Toolbar listener runs | Logout clears auth and finishes; close calls finishAffinity | P1-A13 LT-022; EP-010; BEH-028; NAV-010; UI-006; SEC-002 | P1 |
| LT-023 | Android | onPause, invalid-login resume, back, destroy | Lifecycle/back callbacks run | Progress hides, invalid login finishes, back no-ops, WebView ref clears | P1-A13 LT-023; BEH-029; BEH-030; STATE-010; SEC-002 | P1 |
| LT-024 | Android | Barcode scanner cancel/scan occurs | Scanner handlers run | WebviewActivity receives original URL or URL plus `ScanResult` | P1-A13 LT-024; EP-011; BEH-031; NAV-009; SEC-001 | P1 |
| LT-025 | Cross | Route constants classify barcode/login/error/about/normal | Constants/classifier seam is called | Outcomes match platform facts | P1-A13 LT-025; IOS-FILE-006; AND-FILE-005; BEH-008; BEH-020; BEH-025; BEH-027 | P0 |
| LT-026 | iOS | Barcode URL lacks `://` | Barcode route seam runs | Existing risky split behavior is documented; RN should guard | P1-A13 LT-026; BEH-008; ERRPATH-002 | P1 |
| LT-027 | Android | Duplicate resource errors arrive | Resource error callback runs repeatedly | Only first dialog should show | P1-A13 LT-027; BEH-021; ERRPATH-006 | P1 |
| LT-028 | Android | Timeout LongOperation reaches 20s | Timeout completes | No timeout dialog occurs because body is inactive | P1-A13 LT-028; BEH-018 | P1 |
| LT-029 | Android | Current URL is `about:blank` | onPageFinished runs | WebView hidden | P1-A13 LT-029; BEH-027 | P1 |
| LT-030 | Cross | Route param contains password query | Logging/route seam is inspected | Sensitive URL is not logged and remains route-param-only | P1-A13 LT-030; SEC-001 | P1 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14.1 | SharedPreferences injection, App singleton setup, ShadowWebView and Activity shadows | Existing Unit-Test setup with Android resources included is used. |
| iOS | XCTest seam files | Direct `prepare(for:)` and route constant assertions | Files are written, but local execution is `N/A`: Windows has no `xcodebuild` or `swift`, and the Xcode project has no XCTest target. |
| Native WebView/scanner runtime | Unit seams or documented skip | Synthetic URLs and callbacks | Full WKWebView/Android WebView renderer, SSL handler, permission and CameraX scanner branches need simulator/device or extracted services. |
