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
| LT-001 | Android | Check camera permission on onCreate | Activity created | onCreate() executes | requestCameraPermission() called; ContextCompat.checkSelfPermission() evaluated | EP-001, BEH-001 |
| LT-002 | Android | Request camera permission if denied | Permission not granted | requestCameraPermission() fires | AlertDialog shown with R.string.important_information; app finishes on OK | EP-002, BEH-010 |
| LT-003 | Android | Get ProcessCameraProvider via ViewModel | Activity created | CameraXViewModel.getProcessCameraProvider().observe() called | ProcessCameraProvider LiveData received; bindAllCameraUseCases() triggered | EP-001, BEH-002, STATE-003 |
| LT-004 | Android | Bind camera use cases after permission granted | Permission granted | bindAllCameraUseCases() executes | Preview + ImageAnalysis bound to ProcessCameraProvider; Camera object configured | EP-003, BEH-004, STATE-004 |
| LT-005 | Android | Initialize BarcodeScannerProcessor with options | onCreate in subclass | initialize() calls BarcodeScannerOptions.Builder.setBarcodeFormats() | BarcodeScannerProcessor created with EAN-8, EAN-13, Code128 formats | EP-004, BEH-003 |
| LT-006 | Android | Detect barcode from camera frame | Camera frame available | BarcodeScannerProcessor.detectInImage(InputImage) | Task<List<Barcode>> returned; barcodes processed | EP-004, BEH-005, STATE-005 |
| LT-007 | Android | Extract barcode raw value on success | Barcode detected | onSuccess(barcodes, graphicOverlay) fires | For each barcode: graphicOverlay.add(BarcodeGraphic) + exchangeScannedData.sendScannedCode(barcode.getRawValue()) | EP-005, BEH-006 |
| LT-008 | Android | Post barcode to main thread | Barcode detected on background thread | handler.post(mainThreadTask) | Result callback fires on main thread | EP-005, BEH-008, STATE-007 |
| LT-009 | Android | Handle barcode detection failure | Exception during detection | onFailure(exception) called | Error logged; frame loop continues | BEH-007, ERRPATH-005 |
| LT-010 | Android | Skip null or empty barcode values | Barcode detected but getRawValue() null/empty | onSuccess() processes barcodes | Null/empty barcode skipped; no sendScannedCode() call | BEH-006, ERRPATH-004 |
| LT-011 | Android | Stop image processor on pause | Activity paused | onPause() fires | imageProcessor.stop() called; camera released | EP-003, BEH-009, STATE-008 |
| LT-012 | Android | Stop image processor on destroy | Activity destroyed | onDestroy() fires | imageProcessor.stop() called; all resources released | EP-003, BEH-009, STATE-009 |
| LT-013 | Android | Restart image processor on activity resume | Activity restarted | onRestart() fires | restartImageProcessor() called; camera restarted | EP-006, BEH-011, STATE-010 |
| LT-014 | Android | Configure ML Kit for specific barcode formats | BarcodeScannerProcessor initialized | BarcodeScannerOptions.Builder.setBarcodeFormats(Barcode.FORMAT_EAN_8, FORMAT_EAN_13, FORMAT_CODE_128) | Scanner configured to detect only these formats | BEH-003, API-002 |
| LT-015 | iOS | Initialize GMS BarcodeDetector (legacy) | BarcodeCaptureActivity.onCreate() (archived) | createCameraSource() calls BarcodeDetector.Builder | BarcodeDetector configured with supported barcode types | EP-007, BEH-012 (legacy) |
| LT-016 | Android | No barcode detected | Camera active; no barcode in frame | Frame processed but no barcodes | onSuccess() called with empty list; continue waiting | BEH-006 (edge case) |
| LT-017 | Android | Multiple barcodes detected in one frame | Camera frame contains multiple barcodes | onSuccess(barcodes, graphicOverlay) | For each barcode: processing occurs; multiple results possible | BEH-006 (edge case) |

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
