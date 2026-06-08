# Test Definition

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T17:57:20+02:00 |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001, BEH-012, BEH-013 | Navigation guard unit/component | iOS/Android/RN | P0 | PIN vs Settings branch is central to app entry. |
| BEH-003, BEH-004, BEH-014, BEH-020 | Navigation integration/unit | iOS/Android/RN | P0 | WebView handoff must preserve URL payload. |
| BEH-006, BEH-007, BEH-009, BEH-022, BEH-023, BEH-024 | Auth-return navigation unit | iOS/Android/RN | P0 | Prevent stale WebView access after logout/session expiry. |
| BEH-008, BEH-011, BEH-021, BEH-025, BEH-026 | WebView/scanner route unit | iOS/Android/RN | P0 | Barcode URL and scan-result return are observable route behavior. |
| BEH-010, BEH-018, BEH-019 | QR settings route unit | iOS/Android/RN | P1 | Tests route payload and invalid QR retry. |
| BEH-015, BEH-016, BEH-017, BEH-027 | Screen-specific UI/back behavior | Android/RN | P1 | Android BackHandler behavior must remain screen-specific. |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Login settings guard opens PIN or Settings | Settings invalid; run once with stored PIN and once without. | Login viewDidLoad or settings icon fires. | PINCODE segue is performed with PIN; SETTINGS segue without PIN. | EP-001, BEH-001, STATE-001, NAV-001, NAV-002, STOR-001 |
| LT-002 | iOS | PIN success opens Settings through unwind | PinCodeViewController receives matching code. | `didFinishedEnterCode` fires and Login handles unwind. | Login performs SETTINGS segue. | EP-002, BEH-002, STATE-002, NAV-001, NAV-002 |
| LT-003 | iOS | Login success hands URL to WebView wrapper | Login succeeds and stored preferences can build URL. | WEBVIEW segue prepares. | WebsiteWrapper receives rebuilt URL. | EP-002, BEH-003, STATE-003, STOR-003, NAV-003 |
| LT-004 | iOS | Wrapper embeds WebView and preserves scanner return | WebsiteWrapper has URL and ArticleScanner unwinds. | Wrapper viewDidLoad or unwindToWebview runs. | WebsiteViewController is instantiated with URL. | EP-005, BEH-004, NAV-003 |
| LT-005 | iOS | WebView loads URL and reacts to auth loss | WebView has URL, then foreground valid-login false. | viewDidLoad then foreground event run. | URL loads first; BACK_TO_LOGIN segue on invalid login. | EP-006, BEH-005, BEH-007, STATE-004, API-001, NAV-006, SEC-001 |
| LT-006 | iOS | WebView logout returns to Login | User chooses logout action. | Action sheet logout handler runs. | Valid login false and BACK_TO_LOGIN after delete callback. | EP-006, BEH-006, STATE-004, NAV-006, STOR-001, SEC-001 |
| LT-007 | iOS | WebView barcode URL opens ArticleScanner | Navigation action URL starts with `barcodescanner://`. | decidePolicyFor runs. | Current navigation is cancelled and ARTICLE_SCANNER segue receives return URL. | EP-006, BEH-008, STATE-005, NAV-007, SEC-002 |
| LT-008 | iOS | WebView login form returns to Login | Loaded page first form action contains `login.aspx`. | didFinish evaluates JavaScript. | Valid login false and BACK_TO_LOGIN segue. | EP-006, BEH-009, ERRPATH-003, NAV-006, SEC-001 |
| LT-009 | iOS | QR scanner valid and invalid paths | Scanner receives valid QR or invalid QR. | metadataOutput runs. | Valid QR unwinds to Settings; invalid QR shows error and restarts. | EP-003, EP-004, BEH-010, ERRPATH-001, NAV-004, NAV-005 |
| LT-010 | iOS | Article scanner scan/cancel returns to WebView | Article scanner has redirect URL with or without scanned code. | scan or backButtonTouched runs. | Back to WebView URL includes ScanResult only when code exists. | EP-007, BEH-011, ERRPATH-002, NAV-008 |
| LT-011 | Android | Login guard opens PinActivity or SettingsActivity | Settings invalid; run with stored PIN and without. | LoginActivity onCreate/settings icon runs. | PinActivity starts with PIN; SettingsActivity starts without PIN. | EP-008, BEH-012, BEH-013, STATE-006, NAV-009, STOR-002 |
| LT-012 | Android | Successful login starts WebviewActivity with URL extra | Valid login input builds URL. | Login button handler runs. | WebviewActivity starts and receives `App.URL`. | EP-008, BEH-014, STATE-008, STOR-003, NAV-013, SEC-002 |
| LT-013 | Android | Login license popup starts LicenseActivity | License icon is tapped and popup item selected. | showMenu listener runs. | LicenseActivity starts. | EP-008, BEH-015, NAV-014, UI-004 |
| LT-014 | Android | Login hardware back backgrounds task | LoginActivity receives back press. | onBackPressed runs. | moveTaskToBack(true) is called. | EP-008, BEH-016, UI-004 |
| LT-015 | Android | Settings save/cancel/QR result routes correctly | Settings valid save, cancel, or QR scanner result occurs. | Respective handlers run. | Save starts Login; cancel dispatches back; QR result fills controls. | EP-009, EP-010, BEH-017, BEH-018, BEH-019, NAV-011, NAV-012 |
| LT-016 | Android | QR scanner result and back behavior | Scanner receives cancel, valid QR or hardware back. | onClick/handleCode/back callback run. | Cancel returns RESULT_CANCELED; valid QR returns RESULT_OK; back does nothing. | EP-010, BEH-019, ERRPATH-007, NAV-012, UI-006 |
| LT-017 | Android | WebView empty URL and URL load | Intent extra absent and stored URL empty, then non-empty. | WebviewActivity onCreate runs. | Empty starts Login; non-empty loads WebView with headers. | EP-011, BEH-020, ERRPATH-004, API-002, NAV-015 |
| LT-018 | Android | WebView barcode permission branches | WebView finishes barcode URL with camera permission granted and denied. | onPageFinished runs. | Granted starts BarcodeScannerActivity; denied dialog OK loads return URL. | EP-011, BEH-021, ERRPATH-006, STATE-009, NAV-016, SEC-003 |
| LT-019 | Android | WebView login/error/logout returns to Login | Login form, login URL, server error, logout menu or resume invalid state occurs. | WebView handlers run. | Valid-login false where applicable and LoginActivity/finish path occurs. | EP-011, BEH-022, BEH-023, BEH-024, ERRPATH-005, STATE-010, NAV-015, NAV-018, SEC-001 |
| LT-020 | Android | Barcode scanner scan/cancel/auth loss routes | Barcode scanner receives cancel, scan code or resume invalid login. | Handlers run. | Cancel/scan starts WebviewActivity with URL; invalid login starts LoginActivity and finishes. | EP-012, BEH-025, BEH-026, NAV-017, SEC-001, SEC-002 |
| LT-021 | Android | PIN success and exit/back routes | Correct PIN, exit button or back press. | PinActivity handlers run. | Correct PIN starts Settings and finishes; exit/back finishes. | EP-013, BEH-027, STATE-007, NAV-010 |
| LT-022 | Cross | Route constants are consistent | Barcode scheme, login URL token, URL extra and scan result key are used. | Route helpers are called. | RN route logic uses the same constants or documented normalized equivalents. | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-023 | iOS | WebView barcode URL lacks scheme separator. | No ArticleScanner return URL is built unless `://` exists in source logic. | BEH-008, NAV-007 |
| LT-024 | Android | Duplicate QR/barcode scan code arrives. | Scanner ignores duplicate code. | EP-010, EP-012 |
| LT-025 | Android | WebView back button pressed while authenticated. | No navigation occurs. | BEH-024 |
| LT-026 | Cross | Valid-login becomes false while scanner is visible. | iOS ArticleScanner returns Login on load; Android BarcodeScanner returns Login on resume. | BEH-011, BEH-026, SEC-001 |
| LT-027 | Android | Camera permission denied for barcode route. | WebView shows information dialog and reloads return URL after OK. | ERRPATH-006, SEC-003 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Root navigation graph | NAV-001, NAV-002, NAV-003, NAV-009, NAV-010, NAV-013 | Cover all Login/PIN/Settings/WebView route edges. | Prevents dead-end app entry flows. |
| WebView route handling | BEH-005, BEH-008, BEH-009, BEH-020, BEH-021, BEH-022, API-001, API-002 | Cover load, barcode, login, error and empty URL branches. | WebView is the central runtime screen. |
| Scanner returns | BEH-010, BEH-011, BEH-018, BEH-019, BEH-025 | Cover valid, invalid, cancel and result payload branches. | Scanner routes carry data back to settings/webview. |
| Back/logout/session | BEH-006, BEH-007, BEH-016, BEH-023, BEH-024, BEH-026, BEH-027, SEC-001 | Cover menu logout, app close, invalid-login resume and hardware back decisions. | Prevents stale authenticated navigation and Android back regressions. |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001 | Storyboard modal presentation itself requires UIKit runtime. | Unit-test segue identifiers/prepare handlers and use simulator UI test if available. |
| DEP-002, DEP-005 | Real native WebView rendering requires device/simulator integration. | Unit-test URL decision handlers and run RN WebView smoke test in later phases. |
| DEP-003, DEP-006 | Camera frame recognition requires device/hardware or MLKit runtime. | Unit-test scan-result handlers with synthetic code strings. |
| API-003 | No standalone remote navigation API exists for this feature. | Test navigation after mocked login/settings success from related features. |
