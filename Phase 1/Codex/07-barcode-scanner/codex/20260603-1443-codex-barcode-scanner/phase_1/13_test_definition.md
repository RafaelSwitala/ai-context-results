# Test Definition

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001, BEH-007 | Unit | iOS, Android, RN | P0 | URL trigger and return-URL conversion must match before scanner UI migration. |
| BEH-002, BEH-013 | Unit/Component | iOS, Android, RN | P0 | Login guard controls whether scanner starts or redirects. |
| BEH-003, BEH-014 | Unit/Component | iOS, Android, RN | P1 | Barcode format divergence must be pinned by tests and mapping decision. |
| BEH-004, BEH-010, BEH-011 | Unit/Component | iOS, Android, RN | P0 | Successful scan must stop processing and return `&ScanResult=<code>`. |
| BEH-005, ERRPATH-003, ERRPATH-004 | Unit/Component | iOS, RN | P1 | iOS invalid scan recovery behavior needs parity or documented RN divergence. |
| BEH-008, ERRPATH-005, ERRPATH-006 | Unit/Component | Android, RN | P0 | Permission denial is user-visible and blocks scanner start. |
| BEH-009, BEH-006 | Component | iOS, Android, RN | P0 | Cancel must return without scan result. |
| STATE-001 through STATE-007 | Unit/Component | iOS, Android, RN | P1 | State transitions should be represented in RN hook/screen tests with mocked scanner. |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | interceptsBarcodeUrlAndOpensArticleScanner | A WebView navigation URL starts with `barcodescanner://host/path`. | Navigation policy is evaluated. | Navigation is cancelled and `ARTICLE_SCANNER` receives an HTTP/HTTPS return URL. | EP-001, BEH-001, NAV-001 |
| LT-002 | iOS | articleScannerRequiresValidLogin | ArticleScanner loads with login preference false. | `viewDidLoad` runs. | `BACK_TO_LOGIN` is performed and capture is not started. | EP-002, BEH-002, STOR-001, NAV-003 |
| LT-003 | iOS | articleScannerStartsGtinCapture | ArticleScanner loads with login preference true. | `viewDidLoad` runs. | Capture starts with EAN-8, EAN-13 and Code128 metadata types. | EP-002, EP-003, BEH-003, STATE-001 |
| LT-004 | iOS | successfulBarcodeReturnsScanResult | A supported metadata object has string value `12345678`. | `metadataOutput` is invoked. | Capture stops, `codeValue` is set and WebView URL gets `&ScanResult=12345678`. | BEH-004, STATE-002, NAV-002, SEC-003 |
| LT-005 | iOS | invalidBarcodeShowsErrorAndRestarts | Metadata is unsupported or lacks string value. | `metadataOutput` is invoked and OK is tapped. | Error alert is shown and capture restarts with GTIN types. | BEH-005, STATE-003, ERRPATH-003, ERRPATH-004, UI-003 |
| LT-006 | iOS | cancelReturnsWithoutScanResult | ArticleScanner has a redirect URL and no code value. | Cancel/back button is touched. | Capture stops and WebView receives original redirect URL only. | BEH-006, NAV-002 |
| LT-007 | Android | webviewStartsBarcodeScannerWithPermission | Finished WebView URL starts with `barcodescanner://server/path` and CAMERA permission is granted. | `onPageFinished` runs. | BarcodeScannerActivity starts with converted `App.URL`. | EP-004, BEH-007, NAV-004, SEC-002 |
| LT-008 | Android | webviewMissingPermissionShowsDialog | Scanner URL finishes and CAMERA permission is not granted. | `onPageFinished` runs and OK is tapped. | Un-cancelable dialog is shown and WebView loads the return URL. | BEH-008, ERRPATH-005, UI-004 |
| LT-009 | Android | cancelStopsProcessorAndReturns | BarcodeScannerActivity has a response URL. | Cancel is clicked. | Processor stops, WebviewActivity starts with original response URL and scanner finishes. | EP-005, BEH-009, NAV-005 |
| LT-010 | Android | scanResultDedupesAndReturns | `sendScannedCode("4006381333931")` is called twice. | Handler processes callbacks. | First call starts WebviewActivity with `&ScanResult=4006381333931`; second duplicate is ignored. | BEH-010, STATE-006, SEC-003 |
| LT-011 | Android | processorForwardsRawBarcodeValue | ML Kit returns a barcode with raw value. | `onSuccess` is invoked. | Raw value is forwarded through `ExchangeScannedData`. | BEH-011, EP-006 |
| LT-012 | Android | scannerInvalidLoginRedirects | Login preference is false. | BarcodeScannerActivity resumes. | LoginActivity starts and scanner finishes. | BEH-013, STOR-002, NAV-006 |
| LT-013 | Android | scannerBasePermissionGrantedBindsUseCases | Camera provider is ready and CAMERA permission is granted. | Permission check runs. | Preview and analysis use cases bind, and BarcodeScannerActivity writes login-valid true. | STATE-004, STOR-003, DEP-004 |
| LT-014 | RN | rnBarcodeUrlTransformAndAppend | RN receives scanner URL and scanned code. | URL utility transforms and appends result. | Return URL matches legacy protocol behavior and scan value is encoded before append. | BEH-001, BEH-007, SEC-003, SEC-004 |
| LT-015 | RN | rnBarcodeScannerPermissionStates | Camera permission is granted, denied and unavailable in separate cases. | Barcode scanner screen is rendered. | Granted starts scanner; denied shows blocking state; unavailable exits/returns consistently with contract. | ERRPATH-001, ERRPATH-005, ERRPATH-006, SEC-001, SEC-002 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-016 | Cross-platform | Scanner URL lacks `://`. | No scanner start; WebView behavior remains unchanged for Android, iOS conversion must be guarded in RN. | EP-001, EP-004 |
| LT-017 | Cross-platform | Scanned value contains spaces, `&`, `?` or `=`. | RN encodes the value before appending to `ScanResult`; legacy risk is documented. | SEC-003 |
| LT-018 | Android | ML Kit processor creation fails. | Toast/error state is shown and analysis binding stops. | ERRPATH-007 |
| LT-019 | Android | ML Kit frame processing throws. | Toast/error state is shown; scanner remains usable after subsequent frames if processor continues. | ERRPATH-008 |
| LT-020 | Android | Detection failure callback occurs. | Failure is logged or RN-equivalent telemetry is produced without false navigation. | ERRPATH-009 |
| LT-021 | Android | Hardware back button is pressed in scanner. | No navigation occurs. | BEH-012 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| URL trigger and return URL | EP-001, EP-004, BEH-001, BEH-007, SEC-004 | 100% branch coverage in utility tests | This is the core integration contract with the WebView server. |
| Successful scan result | BEH-004, BEH-010, BEH-011, STATE-002, STATE-006, SEC-003 | 100% behavior coverage with mocked scanner | Prevents duplicate navigation and malformed result URLs. |
| Permission/login guards | BEH-002, BEH-008, BEH-013, STOR-001, STOR-002, STOR-003, ERRPATH-005, ERRPATH-006 | All branches covered | Scanner must not access camera or continue session incorrectly. |
| UI states | UI-001 through UI-006 | Snapshot/component coverage for RN | Scanner title, preview, cancel and error states are user-visible. |
| Dependency integration | DEP-001 through DEP-006 | Mocked component tests plus one manual/device validation note | Camera frameworks require device-level validation beyond unit tests. |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001 | AVFoundation camera capture cannot run in pure unit scope. | Device/simulator manual validation with a generated barcode image in Phase 5. |
| DEP-003 | ML Kit barcode recognition requires native runtime/model behavior. | Mock scanner for RN tests and manual/device validation in Phase 5. |
| DEP-004 | CameraX preview/analyzer binding requires Android instrumentation or device. | Component tests for state plus manual/device validation. |
| SEC-001 | iOS camera permission prompt text is Info.plist-driven. | Static manifest/plist verification and manual permission prompt check. |
| SEC-002 | Android system permission dialog behavior is OS-controlled. | Static manifest verification and device validation. |
