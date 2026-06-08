# Test Definition

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/barcode-scanner/copilot/20260602-007/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | GitHub Copilot (Claude Haiku 4.5) |
| Last updated | 2026-06-02T23:20:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit | Android | HIGH | Check camera permission status |
| BEH-002 | Unit | Android | HIGH | Initialize camera provider via ViewModelProvider |
| BEH-003 | Unit | Android | HIGH | Configure barcode scanner options (EAN-8, EAN-13, Code128) |
| BEH-004 | Integration | Android | HIGH | Bind camera use cases (Preview + ImageAnalysis) |
| BEH-005 | Unit | Android | HIGH | Process barcode frames via ML Kit |
| BEH-006 | Unit | Android | HIGH | Extract barcode raw value and display |
| BEH-007 | Unit | Android | MEDIUM | Handle barcode detection failure |
| BEH-008 | Unit | Android | MEDIUM | Post barcode result to main thread handler |
| BEH-009 | Unit | Android | HIGH | Stop image processor on pause/destroy |
| BEH-010 | Unit | Android | HIGH | Show permission denied dialog |
| BEH-011 | Unit | Android | MEDIUM | Restart image processor on activity resume |
| BEH-012 | Unit | iOS | LOW | Initialize barcode detector (legacy, ~50% commented) |
| BEH-013 | Unit | iOS | LOW | Capture barcode via camera callback (legacy) |
| BEH-014 | Unit | iOS | LOW | Return barcode result to caller (legacy) |

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
| EC-001 | Android | Barcode too small or far | Frame processed; barcode not detected | No result; continue waiting | BEH-005 |
| EC-002 | Android | Unsupported barcode format (QR or others) | Barcode not detected or skipped by format filter | No result; continue waiting | BEH-003, BEH-005 |
| EC-003 | Android | Rapid barcode presentation changes | Frame 1: barcode A detected; Frame 2: barcode B detected | Two results sent; possible duplicates | BEH-006 (timing dependent) |
| EC-004 | Android | Camera permission denied | Permission check fails | AlertDialog shown with error message; app finishes | BEH-010, ERRPATH-001 |
| EC-005 | Android | ML Kit not available (older Android or missing Play Services) | isOperational() check fails | Detection unavailable; show error or graceful fallback | ERRPATH-003 |
| EC-006 | Android | ProcessCameraProvider fails to initialize | CameraXViewModel exception | App doesn't start camera; log error | ERRPATH-002 |
| EC-007 | Android | Activity paused while frame processing | onPause() called during barcode detection | imageProcessor.stop() during active detection; clean shutdown | BEH-009, STATE-08 |
| EC-008 | Android | Rapid pause/resume cycles | onPause() then onRestart() called quickly | Cleanup + restart handled gracefully; no crash | BEH-009, BEH-011 |
| EC-009 | Android | Barcode with special characters or encoding | Barcode contains non-ASCII chars, embedded URLs, etc. | Raw value extracted as-is; passed to caller for parsing | BEH-006, SEC-003 |
| EC-010 | Android | Network unavailable during barcode scanning | No network connectivity | Barcode scanning isolated from network; continues normally | (no network dependency) |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Barcode Detection & Extraction | BEH-005, BEH-006, EP-005 | 100% | Core feature; all barcode paths must work |
| Camera Permission Handling | BEH-001, BEH-010, ERRPATH-001 | 95%+ | Security-critical; must handle denial gracefully |
| Camera Lifecycle (pause/resume) | BEH-009, BEH-011, STATE-008, STATE-010 | 90%+ | Resource cleanup important; prevent leaks |
| Error Handling | BEH-007, ERRPATH-* | 85%+ | User must see clear errors; detect failures |
| Barcode Format Configuration | BEH-003, API-002, LT-014 | 100% | Format filtering must work correctly |
| Threading/Handler Management | BEH-008, STATE-007 | 80%+ | Main thread safety important |
| ViewModel/LiveData Pattern | BEH-002, STATE-003, API-001 | 85%+ | Android architecture compliance |
| Frame Processing Pipeline | BEH-004, BEH-005, BEH-006 | 90%+ | End-to-end barcode flow |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| BEH-004 (bind camera use cases) | Requires actual camera hardware or mock ProcessCameraProvider | Mock CameraX components; verify bindToLifecycle() called |
| BEH-005 (ML Kit frame processing) | Requires ML Kit runtime or mock | Mock BarcodeScanner; inject test InputImage |
| BEH-006 (extract barcode) | Requires barcode detection result or mock | Mock Barcode object; verify sendScannedCode() called |
| BEH-002 (initialize ViewModel) | Requires ViewModelProvider + Application context | Mock ViewModel; verify getProcessCameraProvider() called |
| Camera permission system | Requires system permission handling | Mock ContextCompat.checkSelfPermission(); verify AlertDialog shown |
| ML Kit barcode format detection | Requires ML Kit runtime | Mock detector; inject test barcode with specific format |
| Navigation (startActivityForResult) | Requires Activity framework | Mock startActivity(); verify setResult() called |
| Lifecycle (onPause/onDestroy) | Requires Activity lifecycle simulation | Mock lifecycle events; verify stop() called |

---
