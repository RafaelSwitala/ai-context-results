# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_2/21_legacy_test_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | GitHub Copilot |
| Last updated | 2026-06-04 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Settings invalid; run once with stored PIN and once without. | Login viewDidLoad or settings icon fires. | PINCODE segue is performed with PIN; SETTINGS segue without PIN. | EP-001, BEH-001, STATE-001, NAV-001, NAV-002, STOR-001 | P0 |
| LT-002 | iOS | PinCodeViewController receives matching code. | `didFinishedEnterCode` fires and Login handles unwind. | Login performs SETTINGS segue. | EP-002, BEH-002, STATE-002, NAV-001, NAV-002 | P0 |
| LT-003 | iOS | Login succeeds and stored preferences can build URL. | WEBVIEW segue prepares. | WebsiteWrapper receives rebuilt URL. | EP-002, BEH-003, STATE-003, STOR-003, NAV-003 | P0 |
| LT-004 | iOS | WebsiteWrapper has URL and ArticleScanner unwinds. | Wrapper viewDidLoad or unwindToWebview runs. | WebsiteViewController is instantiated with URL. | EP-005, BEH-004, NAV-003 | P0 |
| LT-005 | iOS | WebView has URL, then foreground valid-login false. | viewDidLoad then foreground event run. | URL loads first; BACK_TO_LOGIN segue on invalid login. | EP-006, BEH-005, BEH-007, STATE-004, API-001, NAV-006, SEC-001 | P0 |
| LT-006 | iOS | User chooses logout action. | Action sheet logout handler runs. | Valid login false and BACK_TO_LOGIN after delete callback. | EP-006, BEH-006, STATE-004, NAV-006, STOR-001, SEC-001 | P0 |
| LT-007 | iOS | Navigation action URL starts with `barcodescanner://`. | decidePolicyFor runs. | Current navigation is cancelled and ARTICLE_SCANNER segue receives return URL. | EP-006, BEH-008, STATE-005, NAV-007, SEC-002 | P0 |
| LT-008 | iOS | Loaded page first form action contains `login.aspx`. | didFinish evaluates JavaScript. | Valid login false and BACK_TO_LOGIN segue. | EP-006, BEH-009, ERRPATH-003, NAV-006, SEC-001 | P0 |
| LT-009 | iOS | Scanner receives valid QR or invalid QR. | metadataOutput runs. | Valid QR unwinds to Settings; invalid QR shows error and restarts. | EP-003, EP-004, BEH-010, ERRPATH-001, NAV-004, NAV-005 | P1 |
| LT-010 | iOS | Article scanner has redirect URL with or without scanned code. | scan or backButtonTouched runs. | Back to WebView URL includes ScanResult only when code exists. | EP-007, BEH-011, ERRPATH-002, NAV-008 | P1 |
| LT-011 | Android | Settings invalid; run with stored PIN and without. | LoginActivity onCreate/settings icon runs. | PinActivity starts with PIN; SettingsActivity starts without PIN. | EP-008, BEH-012, BEH-013, STATE-006, NAV-009, STOR-002 | P0 |
| LT-012 | Android | Valid login input builds URL. | Login button handler runs. | WebviewActivity starts and receives `App.URL`. | EP-008, BEH-014, STATE-008, STOR-003, NAV-013, SEC-002 | P0 |
| LT-013 | Android | License icon is tapped and popup item selected. | showMenu listener runs. | LicenseActivity starts. | EP-008, BEH-015, NAV-014, UI-004 | P1 |
| LT-014 | Android | LoginActivity receives back press. | onBackPressed runs. | moveTaskToBack(true) is called. | EP-008, BEH-016, UI-004 | P1 |
| LT-015 | Android | Settings valid save, cancel, or QR scanner result occurs. | Respective handlers run. | Save starts Login; cancel dispatches back; QR result fills controls. | EP-009, EP-010, BEH-017, BEH-018, BEH-019, NAV-011, NAV-012 | P0 |
| LT-016 | Android | Scanner receives cancel, valid QR or hardware back. | onClick/handleCode/back callback run. | Cancel returns RESULT_CANCELED; valid QR returns RESULT_OK; back does nothing. | EP-010, BEH-019, ERRPATH-007, NAV-012, UI-006 | P1 |
| LT-017 | Android | Intent extra absent and stored URL empty, then non-empty. | WebviewActivity onCreate runs. | Empty starts Login; non-empty loads WebView with headers. | EP-011, BEH-020, ERRPATH-004, API-002, NAV-015 | P0 |
| LT-018 | Android | WebView finishes barcode URL with camera permission granted and denied. | onPageFinished runs. | Granted starts BarcodeScannerActivity; denied dialog OK loads return URL. | EP-011, BEH-021, ERRPATH-006, STATE-009, NAV-016, SEC-003 | P0 |
| LT-019 | Android | Login form, login URL, server error, logout menu or resume invalid state occurs. | WebView handlers run. | Valid-login false where applicable and LoginActivity/finish path occurs. | EP-011, BEH-022, BEH-023, BEH-024, ERRPATH-005, STATE-010, NAV-015, NAV-018, SEC-001 | P0 |
| LT-020 | Android | Barcode scanner receives cancel, scan code or resume invalid login. | Handlers run. | Cancel/scan starts WebviewActivity with URL; invalid login starts LoginActivity and finishes. | EP-012, BEH-025, BEH-026, NAV-017, SEC-001, SEC-002 | P0 |
| LT-021 | Android | Correct PIN, exit button or back press. | PinActivity handlers run. | Correct PIN starts Settings and finishes; exit/back finishes. | EP-013, BEH-027, STATE-007, NAV-010 | P0 |
| LT-022 | Cross | Barcode scheme, login URL token, URL extra and scan result key are used. | Route helpers are called. | RN route logic uses the same constants or documented normalized equivalents. | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 | P1 |
| LT-023 | iOS | WebView barcode URL lacks scheme separator. | No ArticleScanner return URL is built unless `://` exists in source logic. | Existing behavior is confirmed. | BEH-008, NAV-007 | P1 |
| LT-024 | Android | Duplicate QR/barcode scan code arrives. | Scanner ignores duplicate code. | Deduplication logic verified or noted as not present. | EP-010, EP-012 | P1 |
| LT-025 | Android | WebView back button pressed while authenticated. | No navigation occurs. | WebView stays in place; no segue/intent fired. | BEH-024 | P1 |
| LT-026 | Cross | Valid-login becomes false while scanner is visible. | iOS ArticleScanner returns Login on load; Android BarcodeScanner returns Login on resume. | Auth guard behavior tested. | BEH-011, BEH-026, SEC-001 | P0 |
| LT-027 | Android | Camera permission denied for barcode route. | WebView shows information dialog and reloads return URL after OK. | Permission denied path verified. | ERRPATH-006, SEC-003 | P0 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| iOS | XCTest | UserDefaults, UINavigationController, WKWebView delegates, CLLocationManager (optional for scanner) | No test target exists in legacy repo; minimal setup required |
| Android | JUnit + Mockito | SharedPreferences, Context, Intent, WebViewClient, Camera/Permission APIs | Standard Android test structure exists; compatible with Phase 2 |

## Mapping to Phase 1

All test IDs (LT-001 to LT-027) are derived from Phase 1 artifact `P1-A13` (13_test_definition.md). Each test references one or more source IDs from Phase 1 analysis (EP-*, BEH-*, STATE-*, NAV-*, STOR-*, ERRPATH-*, SEC-*).

## Excluded Tests

No tests excluded. All 27 LT-* definitions from Phase 1 are included in Phase 2 plan.
