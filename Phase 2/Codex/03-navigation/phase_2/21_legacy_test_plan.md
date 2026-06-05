# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:50:19+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Settings invalid, once with PIN and once without | Login settings guard runs | `PINCODE` segue with PIN; `SETTINGS` segue without PIN | P1-A13 LT-001; EP-001; BEH-001; STATE-001; NAV-001; NAV-002; STOR-001 | P0 |
| LT-002 | iOS | PIN controller reports guessed PIN | Login unwind handler runs | `SETTINGS` segue is performed | P1-A13 LT-002; EP-002; BEH-002; STATE-002; NAV-001; NAV-002 | P0 |
| LT-003 | iOS | Stored preferences can rebuild WebView URL | `WEBVIEW` prepare runs | WebsiteWrapper receives rebuilt URL | P1-A13 LT-003; EP-002; BEH-003; STATE-003; STOR-003; NAV-003 | P0 |
| LT-004 | iOS | WebsiteWrapper has a URL and scanner returns | Wrapper load/unwind seam runs | Child WebView receives wrapper URL | P1-A13 LT-004; EP-005; BEH-004; NAV-003 | P0 |
| LT-005 | iOS | WebView has URL, then valid-login becomes false | WebView load and foreground seam run | URL load is prepared; invalid auth returns to Login | P1-A13 LT-005; EP-006; BEH-005; BEH-007; STATE-004; API-001; NAV-006; SEC-001 | P0 |
| LT-006 | iOS | User selects WebView logout | Logout handler seam runs | valid-login false and Login unwind after delete callback | P1-A13 LT-006; EP-006; BEH-006; STATE-004; NAV-006; STOR-001; SEC-001 | P0 |
| LT-007 | iOS | WebView sees `barcodescanner://` URL | Navigation policy seam runs | Navigation cancelled and ArticleScanner route receives return URL | P1-A13 LT-007; EP-006; BEH-008; STATE-005; NAV-007; SEC-002 | P0 |
| LT-008 | iOS | WebView loaded page exposes login form | `didFinish` seam runs | valid-login false and Login route | P1-A13 LT-008; EP-006; BEH-009; ERRPATH-003; NAV-006; SEC-001 | P0 |
| LT-009 | iOS | QR scanner receives valid or invalid QR | QR metadata seam runs | Valid QR returns Settings; invalid QR shows error and restarts | P1-A13 LT-009; EP-003; EP-004; BEH-010; ERRPATH-001; NAV-004; NAV-005 | P1 |
| LT-010 | iOS | Article scanner has redirect URL, with or without code | Scanner prepare runs | Return URL includes `ScanResult` only when code exists | P1-A13 LT-010; EP-007; BEH-011; ERRPATH-002; NAV-008 | P1 |
| LT-011 | Android | Settings invalid, once with PIN and once without | LoginActivity starts or settings icon is tapped | PinActivity starts with PIN; SettingsActivity starts without PIN | P1-A13 LT-011; EP-008; BEH-012; BEH-013; STATE-006; NAV-009; STOR-002 | P0 |
| LT-012 | Android | Valid settings and login input | Login button handler runs | WebviewActivity starts with `App.URL` extra | P1-A13 LT-012; EP-008; BEH-014; STATE-008; STOR-003; NAV-013; SEC-002 | P0 |
| LT-013 | Android | License icon is tapped | Popup menu item is selected | LicenseActivity starts | P1-A13 LT-013; EP-008; BEH-015; NAV-014; UI-004 | P1 |
| LT-014 | Android | LoginActivity is visible | Hardware back handler runs | Activity does not navigate or finish; legacy intent is task backgrounding | P1-A13 LT-014; EP-008; BEH-016; UI-004 | P1 |
| LT-015 | Android | Settings is visible and QR result arrives | QR icon and result handler run | QR scanner starts; valid QR fills controls | P1-A13 LT-015; EP-009; EP-010; BEH-017; BEH-018; BEH-019; NAV-011; NAV-012 | P1 |
| LT-016 | Android | QR scanner cancel, valid QR, invalid QR, back | Scanner handlers run | Result or retry behavior follows scanner state | P1-A13 LT-016; EP-010; BEH-019; ERRPATH-007; NAV-012; UI-006 | P1 |
| LT-017 | Android | WebView URL absent/empty and non-empty URL | WebviewActivity starts | Empty starts Login; non-empty loads WebView with no-cache headers | P1-A13 LT-017; EP-011; BEH-020; ERRPATH-004; API-002; NAV-015 | P0 |
| LT-018 | Android | WebView finishes barcode URL, permission granted or denied | WebViewClient route branch runs | Granted starts BarcodeScanner; denied shows fallback dialog and reloads return URL | P1-A13 LT-018; EP-011; BEH-021; ERRPATH-006; STATE-009; NAV-016; SEC-003 | P0 |
| LT-019 | Android | Login form, login URL, error, logout or invalid resume occurs | WebView handlers run | valid-login false where applicable and Login/finish path occurs | P1-A13 LT-019; EP-011; BEH-022; BEH-023; BEH-024; ERRPATH-005; STATE-010; NAV-015; NAV-018; SEC-001 | P0 |
| LT-020 | Android | Barcode scanner cancel, scan or invalid auth | Scanner handlers run | WebView return or Login route occurs | P1-A13 LT-020; EP-012; BEH-025; BEH-026; NAV-017; SEC-001; SEC-002 | P1 |
| LT-021 | Android | Correct PIN, exit, and back | PinActivity handlers run | Correct PIN starts Settings and finishes; exit/back finish | P1-A13 LT-021; EP-013; BEH-027; STATE-007; NAV-010 | P0 |
| LT-022 | Cross | Route constants are used | Constants are read | `URL`, `barcodescanner`, `login.aspx`, `error=-`, `ScanResult` stay stable | P1-A13 LT-022; IOS-FILE-009; AND-FILE-002; STOR-003; SEC-002 | P1 |
| LT-023 | iOS | Barcode URL lacks scheme separator | Barcode route classifier seam runs | No ArticleScanner return URL is built unless `://` exists | P1-A13 LT-023; BEH-008; NAV-007 | P1 |
| LT-024 | Android | Duplicate scanner code arrives | Scanner duplicate guard runs | Duplicate code is ignored | P1-A13 LT-024; EP-010; EP-012 | P1 |
| LT-025 | Android | Authenticated WebView receives back press | WebView back handler runs | No navigation occurs | P1-A13 LT-025; BEH-024 | P1 |
| LT-026 | Cross | valid-login becomes false while scanner is visible | Scanner auth guard runs | iOS ArticleScanner or Android BarcodeScanner returns to Login | P1-A13 LT-026; BEH-011; BEH-026; SEC-001 | P1 |
| LT-027 | Android | Camera permission denied for barcode route | Barcode WebView branch runs | Permission dialog appears; OK reloads return URL | P1-A13 LT-027; ERRPATH-006; SEC-003 | P1 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14.1 | Isolated SharedPreferences, App singleton setup, Robolectric Activity/WebView shadows | Existing `app/src/test/` structure is used. `includeAndroidResources=true` is required for activity resources; it was already present in the workspace from prior Phase-2 recovery and is documented here as test-environment dependency. |
| iOS | XCTest file seams | Manual recording subclasses for segue capture | Tests were written under `MobileBrowserV2Tests/`, but local execution is `N/A`: Windows has no `xcodebuild` or `swift`, and `project.pbxproj` exposes no XCTest target. |
| Scanner/WebView renderer paths | Unit seam or documented skip | Synthetic route inputs; no camera frames or real WKWebView rendering | Camera hardware, MLKit/AVFoundation frame recognition and full native WebView rendering remain outside local unit scope per P1 not-testable notes. |
