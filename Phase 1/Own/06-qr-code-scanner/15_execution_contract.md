# Execution Contract

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/qr-code-scanner/claude/20260602-006/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T22:30:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| iOS Test Suite | XCTest suite with 10 test cases covering initialization, metadata capture, validation, error handling, camera threading | LT-001 through LT-010 |
| Android Test Suite | JUnit suite with 9 test cases covering ML Kit initialization, barcode detection, deduplication, validation, error dialog | LT-011 through LT-019 |
| Mock AVCaptureSession | Mock camera session; inject test metadata objects | BEH-001, BEH-002 |
| Mock ML Kit Detector | Mock barcode detector; inject test barcodes | BEH-009, BEH-010 |
| Mock QRCodeParser | Mock parser validation; return isValid true/false | BEH-003, BEH-011 |
| URL validation tests | Test p=MB marker detection, URL formatting with query separator | BEH-003, BEH-004, BEH-011, BEH-012 |
| Error handling tests | Invalid QR, no content, parsing exceptions | ERRPATH-* |
| Navigation tests | Segue triggering, result passing | NAV-*, BEH-008, BEH-014 |
| Coverage Target | ≥85% code coverage for scanner-related code | All BEH-*, EP-* |
| Edge Cases | 10 edge cases from test definition (small QR, unsupported format, rapid cycles, permissions, etc.) | EC-001 through EC-010 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| QRCodeScannerScreen.tsx | Main scanner screen component; camera integration, detection loop | MAP-001, EP-001, EP-004 |
| useQRScanner hook | Initialize camera + ML Kit; manage cameraActive state | MAP-002, BEH-001, BEH-009 |
| qrCodeValidator.ts | Shared validation: URL parsing, p=MB check, URL formatting | MAP-003, BEH-003, BEH-011 |
| QRErrorDialog component | Error message UI with retry/cancel buttons | MAP-004, BEH-007, BEH-013 |
| QRCameraPreview component | Camera feed overlay; detection indicators | MAP-005, UI-001, UI-005 |
| qrCodeService.ts | detectQRCode(), parseQRCodeURL() wrappers | MAP-100, MAP-101 |
| navigationService.ts | returnQRResult(url) for back-to-settings flow | MAP-102, BEH-008, BEH-014 |
| hapticService.ts | triggerSuccess() / triggerError() with fallback | MAP-103, BEH-005 |
| Camera permissions | Request + handle denial gracefully | (permission framework) |
| Loading UI | Activity indicator during initialization | UI-001, UI-005 |
| Back/Cancel navigation | Back button behavior; close scanner | NAV-003, NAV-006 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Tests | Create __tests__/qrCodeScanner.test.ts covering 19 test cases | LT-001 through LT-019 |
| Mock react-native-vision-camera | Mock camera initialization and frame processing | MAP-002, BEH-001 |
| Mock barcode detection | Mock detector callback with test QR codes | MAP-100, BEH-010 |
| Mock navigation | Mock navigation.navigate('Settings') with route params | MAP-102, BEH-008, BEH-014 |
| Mock haptics | Mock haptic feedback; verify called on success/error | MAP-103, BEH-005 |
| URL validation tests | Test validateQRCode with various inputs (valid, invalid, no separator) | BEH-003, BEH-011, BEH-004, BEH-012 |
| Error handling | Test error dialog rendering and retry flow | MAP-004, BEH-007, BEH-013 |
| State management | Test useState transitions (cameraActive, detectedCode, errorMessage) | MAP-400 through MAP-403 |
| Snapshot tests | Snapshot QRCodeScannerScreen rendering | MAP-001 |
| Integration tests | Full flow: initialize → detect → validate → navigate | STATE-* |
| Coverage | ≥90% code coverage for scanner | All BEH-*, NAV-* |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN scanner = iOS QrCodeScannerViewController + Android QRCodeScannerActivity | BEH-001 through BEH-014 |
| QR Detection | Camera initialized; barcodes detected and classified as QR | BEH-001, BEH-002, BEH-009, BEH-010 |
| URL Validation | QR code URL parsed; p=MB marker checked; URL formatted correctly | BEH-003, BEH-004, BEH-011, BEH-012 |
| Error Handling | Invalid QR shows error dialog; user can retry or cancel | BEH-007, BEH-013, ERRPATH-* |
| Navigation | After scan, return to Settings with QR URL in route.params | BEH-008, BEH-014, NAV-002, NAV-005 |
| Result Passing | Settings receives QR code data and populates form fields | (Settings Phase 1) |
| Camera Permissions | App requests camera permission; handles denial gracefully | (permission framework) |
| Haptic Feedback | Success beep/buzz on valid QR; error buzz on invalid | BEH-005 (iOS), MAP-103 (optional Android) |
| Deduplication | Rapid duplicate QR scans rejected; only processed once | BEH-012 (Android-style) |
| Cross-Platform | QR detection and validation behavior identical on iOS/Android RN | All MAP-* |
| Test Coverage | ≥90% code coverage; all critical paths tested | All critical paths |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest QR scanner tests | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator with scanner | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator with scanner | HIGH |
| ios-mobilebrowser | xcodebuild test | Run XCTest for QR scanner | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit for QR scanner | HIGH |
| (all) | Camera Permission System | Request/grant camera access | MEDIUM |
| (all) | Test QR Code Generator | Generate test QR codes with p=MB format | MEDIUM |

---
