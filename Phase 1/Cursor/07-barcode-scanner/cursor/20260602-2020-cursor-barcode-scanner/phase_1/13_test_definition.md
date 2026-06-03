# Test Definition

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001, BEH-002 | Unit | Cross | P0 | URL-Intercept + Rewrite |
| BEH-003 | Unit | Cross | P0 | Login gate |
| BEH-004, BEH-005 | Unit | Cross | P0 | Format policy |
| BEH-006 | Unit | Cross | P0 | ScanResult URL builder |
| BEH-007, BEH-008 | Unit | Cross | P0 | Error handling divergence |
| BEH-009, BEH-010 | Unit | Cross | P1 | Cancel + dedup |
| BEH-012 | Unit | Android | P1 | Login flag workaround |
| STOR-001 | Unit | Android | P1 | Side effect dokumentieren |
| ERRPATH-001..003 | Unit | Cross | P0 | Error paths |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | Cross | buildReturnUrl from barcodescanner scheme | `barcodescanner://host/path` + https preference | rewrite helper | `https://host/path` | BEH-002, IOS-FILE-005, AND-FILE-004 |
| LT-002 | Cross | append ScanResult to response URL | responseUrl `https://x/y`, code `4012345678901` | format URL | `https://x/y&ScanResult=4012345678901` | BEH-006, IOS-FILE-005 |
| LT-003 | Cross | login gate blocks scanner start | hasValidLogin=false | scanner entry | navigation to Login, no capture | BEH-003, NAV-003, NAV-006 |
| LT-004 | iOS | accepts ean13 metadata type | type in supportedCodeTypesGTIN | metadata handler branch | success path | BEH-004 |
| LT-005 | iOS | rejects qr metadata type | type QR not in GTIN list | metadata handler | showErrorMessage / scanError | BEH-007, ERRPATH-002 |
| LT-006 | Android | default options accepts any barcode string | mock ML kit returns QR string | handleCode | WebView URL with ScanResult (no type filter) | BEH-005, BEH-008 |
| LT-007 | Cross | cancel returns base responseUrl only | responseUrl set, cancel | navigation URL | no `ScanResult` segment | BEH-009, NAV-002, NAV-005 |
| LT-008 | Android | duplicate scan ignored | same code twice | handleCode | second call no navigation | BEH-010, STATE-002 |
| LT-009 | Android | no camera before scanner shows dialog path | permission denied | Webview onPageFinished | load returnUrl, no BarcodeScannerActivity | ERRPATH-003, BEH-011 |
| LT-010 | Android | saveValidLogin on camera grant for barcode | BarcodeScannerActivity + permission ok | requestCameraPermission | saveValidLoginPreference(true) | BEH-012, STOR-001 |
| LT-011 | iOS | prepare segue sets wrapper url with scan | redirectUrl + codeValue | prepare BACK_TO_WEBVIEW | wrapper.url contains SCAN_RESULT + code | BEH-006, NAV-002 |
| LT-012 | iOS | empty metadata stringValue | GTIN type but nil string | metadataOutput | showErrorMessage No Content | ERRPATH-001 |
| LT-013 | Cross | barcodescanner constant matches | AppSettings / App | compare | same string `barcodescanner` | IOS-FILE-005, AND-FILE-004 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-014 | Cross | responseUrl already has query params | URL with existing `?foo=1` | Legacy uses `&ScanResult=` always — document concatenation behavior | BEH-006 |
| LT-015 | Android | onResume restarts processor when logged in | valid login | onResume | restartImageProcessor | [android: BarcodeScannerActivity.java:73 symbol=onResume] |
| LT-016 | iOS | fromBarcodescanner never true | loadView | flag stays false | dead code path in viewDidAppear | WebsiteViewController.swift:114 |
| LT-017 | Cross | code128 barcode | valid Code128 string | success URL | BEH-004 |
| LT-018 | Android | back press disabled | back gesture | no finish | BEH-015 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| URL rewrite + ScanResult | BEH-001, BEH-002, BEH-006 | 100% branch coverage unit tests | Kernvertrag zur Web-App |
| Login gate | BEH-003, NAV-003, NAV-006 | Both platforms | Security-relevant |
| Format policy | BEH-004, BEH-005, BEH-007, BEH-008 | Divergence tests | RN-Entscheidung |
| Cancel/dedup | BEH-009, BEH-010 | Android + iOS | UX stability |
| Camera pipeline | DEP-001, DEP-002 | E2E/manual | Not unit scope |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001, DEP-002, DEP-003 | Live camera + ML Kit frames | E2E auf Gerät; RN integration tests mit mock barcode provider |
| BEH-013 | Haptic feedback | Manual / RN haptics mock |
| UI-005 | WebView visibility toggle | WebView feature E2E |
| EP-001 vs EP-002 timing | iOS navigation vs Android onPageFinished | WebView integration test in Phase 4/5 |
