# Execution Contract

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/barcode-scanner/copilot/20260602-007/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | GitHub Copilot (Claude Haiku 4.5) |
| Last updated | 2026-06-02T23:30:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Android Test Suite | JUnit suite with 17 test cases covering permission checks, camera initialization, ML Kit setup, frame processing, error handling, lifecycle | LT-001 through LT-017 |
| iOS Test Suite | XCTest suite with legacy reference only; note: iOS implementation ~50% commented; focus on Android (primary) | LT-015 (legacy reference) |
| Mock ContextCompat | Mock camera permission checks (PERMISSION_GRANTED / PERMISSION_DENIED) | BEH-001, LT-001 |
| Mock CameraXViewModel | Mock ProcessCameraProvider LiveData; simulate provider success/failure | BEH-002, LT-003 |
| Mock BarcodeScannerOptions | Mock barcode format configuration (EAN-8, EAN-13, Code128) | BEH-003, LT-005 |
| Mock ProcessCameraProvider | Mock camera binding; simulate Preview + ImageAnalysis use cases | BEH-004, LT-004 |
| Mock ML Kit BarcodeScanner | Mock barcode detection; inject test barcodes with various formats | BEH-005, BEH-006, LT-006, LT-007 |
| Mock ExchangeScannedData | Mock callback interface; verify sendScannedCode() called with correct barcode | BEH-006, EP-005, LT-008 |
| Mock Handler | Mock main thread posting; verify handler.post() behavior | BEH-008, LT-008 |
| Permission AlertDialog tests | AlertDialog behavior when permission denied | BEH-010, LT-002 |
| Lifecycle tests | Activity pause/resume/destroy behavior; imageProcessor.stop() calls | BEH-009, BEH-011, LT-011, LT-012, LT-013 |
| Coverage Target | ≥85% code coverage for barcode scanner base classes + processor | All BEH-*, EP-* |
| Edge Cases | 10 edge cases from test definition (EC-001 through EC-010) | EC-001 through EC-010 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| BarcodeScannerScreen.tsx | Main barcode scanner screen component; camera integration, detection loop, permission handling | MAP-001, EP-001, EP-007 |
| useBarcodeScannerSetup hook | Initialize camera provider + permissions check + bind use cases; manage cameraReady state | MAP-002, BEH-001, BEH-002, BEH-004 |
| useBarcodeDetection hook | Configure ML Kit barcode detection (EAN-8, EAN-13, Code128 only; exclude QR) | MAP-003, BEH-003 |
| barcodeDetectionService.ts | detectBarcodeInFrame(frame) wrapper; extract barcode raw value; handle null/empty | MAP-004, BEH-006, BEH-007 |
| PermissionDialog component | Error UI when camera permission denied | MAP-005, BEH-010 |
| BarcodeCameraPreview component | Camera feed overlay with detection indicators | MAP-006, UI-001, UI-002 |
| barcodeService.ts | ML Kit Vision wrapper; processFrame() + onBarcodeDetected() callback | MAP-100, MAP-102 |
| threadingService.ts | Handler pattern abstraction; postToMainThread() | MAP-101, BEH-008 |
| cameraLifecycleService.ts | startCamera() / stopCamera() / restartCamera() lifecycle management | MAP-103, BEH-009, BEH-011 |
| Camera permissions | Request + handle denial gracefully; use react-native-permissions | (permission framework) |
| Loading UI | Activity indicator during camera initialization | UI-001 |
| Back/Cancel navigation | Back button behavior; close scanner | NAV-003, EP-006 (implied) |
| Barcode format configuration | Configure detection to EAN-8, EAN-13, Code128 (exclude QR) | BEH-003, MAP-DEP-002 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Tests | Create __tests__/barcodeScanner.test.ts covering 17 test cases | LT-001 through LT-017 |
| Mock react-native-vision-camera | Mock camera initialization and frame processing | MAP-002, BEH-004 |
| Mock ML Kit barcode detection | Mock detector callback with test barcodes (EAN-8, EAN-13, Code128) | MAP-100, BEH-005, BEH-006 |
| Mock react-native-permissions | Mock permission request and denial flows | MAP-003, BEH-001, BEH-010 |
| Barcode detection tests | Test barcode extraction and callback behavior | BEH-006, LT-007 |
| Error handling tests | Test error dialogs and retry flows | BEH-007, BEH-010, LT-002, LT-009 |
| State management tests | Test useState transitions (permissionGranted, cameraReady, detectedBarcode, detectionError) | MAP-400 through MAP-404 |
| Camera lifecycle tests | Test pause/resume/destroy lifecycle and cleanup | BEH-009, BEH-011, LT-011, LT-012, LT-013 |
| Permission flow tests | Test full permission request and denial scenarios | BEH-001, BEH-010, LT-001 |
| Format configuration tests | Test barcode format filtering (EAN-8, EAN-13, Code128; no QR) | BEH-003, LT-014 |
| Threading tests | Test main thread posting and callback ordering | BEH-008, LT-008 |
| Snapshot tests | Snapshot BarcodeScannerScreen rendering | MAP-001 |
| Integration tests | Full flow: request permission → initialize camera → detect barcode → return result | STATE-* |
| Coverage | ≥90% code coverage for scanner components + services | All BEH-*, NAV-* |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN barcode scanner = iOS BarcodeCaptureActivity (legacy) + Android ScannerBaseActivity | BEH-001 through BEH-014 |
| Barcode Detection | Camera initialized; barcodes detected and classified (EAN-8, EAN-13, Code128) | BEH-004, BEH-005 |
| Format Filtering | Only EAN-8, EAN-13, Code128 detected; QR codes excluded | BEH-003, DIV-002 |
| Barcode Extraction | Barcode raw value extracted correctly and passed to caller | BEH-006, EP-005 |
| Error Handling | Invalid barcode or detection failure shows error dialog; user can retry | BEH-007, BEH-010, ERRPATH-* |
| Navigation | After scan, return to caller (Settings or other) with barcode result | EP-005, NAV-002 |
| Result Passing | Caller receives barcode data via route.params or callback | BEH-006, NAV-002 |
| Camera Permissions | App requests camera permission; handles denial gracefully | BEH-001, BEH-010 |
| Camera Lifecycle | Camera properly cleaned up on pause/destroy; no resource leaks | BEH-009, BEH-011 |
| ML Kit Configuration | ML Kit configured for barcode-only detection (not QR) | BEH-003, MAP-003 |
| Cross-Platform | Barcode detection and validation behavior identical on iOS/Android RN | All MAP-* |
| Test Coverage | ≥90% code coverage; all critical paths tested | All critical paths |
| Multiple Formats | System can detect and distinguish EAN-8, EAN-13, Code128 in same session | BEH-005, BEH-006 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest barcode scanner tests | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator with barcode scanner | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator with barcode scanner | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit for barcode scanner tests | HIGH |
| (all) | Camera Permission System | Request/grant camera access | MEDIUM |
| (all) | Test Barcode Generator | Generate test barcodes (EAN-8, EAN-13, Code128) | MEDIUM |
| (all) | ML Kit Barcode Detection | Test barcode format detection accuracy | MEDIUM |

---
