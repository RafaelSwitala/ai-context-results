# Migration Mapping

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/barcode-scanner/copilot/20260602-007/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | GitHub Copilot (Claude Haiku 4.5) |
| Last updated | 2026-06-02T23:25:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-007 | screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Replace ScannerBaseActivity + subclass + BarcodeCaptureActivity | Single unified screen for both platforms |
| MAP-002 | BEH-001, BEH-002, BEH-004 | hooks/useBarcodeScannerSetup.ts | useBarcodeScannerSetup() | Initialize camera provider + permissions check + bind use cases | Unified camera initialization |
| MAP-003 | BEH-003 | hooks/useBarcodeDetection.ts | useBarcodeDetection() | Configure barcode format detection (EAN-8, EAN-13, Code128) | Reusable detection hook |
| MAP-004 | BEH-006, BEH-007 | services/barcodeDetectionService.ts | detectBarcodeInFrame() | Extract barcode raw value; handle null/empty | Shared detection logic |
| MAP-005 | BEH-010 | components/PermissionDialog.tsx | PermissionDialog | Camera permission denied UI | Unified permission error handling |
| MAP-006 | UI-001, UI-002 | components/BarcodeCameraPreview.tsx | BarcodeCameraPreview | Camera feed + detection overlay | Reusable preview component |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-005, API-004 | barcodeService.ts | processFrame(frame) | ML Kit or react-native-mlkit-barcode wrapper | Unified frame processing |
| MAP-101 | BEH-008 | threadingService.ts | postToMainThread(callback) | Handler pattern → RN async/await or event emitter | Threading abstraction |
| MAP-102 | EP-005, BEH-006 | barcodeService.ts | onBarcodeDetected(barcode) | Callback interface; send result back to SettingsActivity | Unified callback pattern |
| MAP-103 | BEH-009, BEH-011 | cameraLifecycleService.ts | startCamera() / stopCamera() / restartCamera() | Camera lifecycle management | Unify pause/resume/restart |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Notes |
|---|---|---|---|---|
| MAP-200 | STOR-001, STOR-002, STOR-003, STOR-004, STOR-005 | Component state (hooks) | camera, preview, analysis, processor, detectedBarcode | All transient; passed via route.params |
| MAP-201 | STOR-006 | Component state | cameraDirection (back/front facing) | Configurable camera direction |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-002, API-003, API-004, API-005 | barcodeService.ts | ML Kit Vision API wrapper | Unify Android ML Kit + iOS barcode scanner |
| MAP-301 | API-006 | barcodeService.ts (legacy only) | GMS Vision (iOS, archived) | Not used in RN; modern ML Kit instead |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | BEH-001, BEH-010 | useState(permissionGranted) | false/unknown | Request permission → true/false (denied) |
| MAP-401 | BEH-002, BEH-004 | useState(cameraReady) | false | Initialize provider → true (ready to detect) |
| MAP-402 | BEH-005, BEH-006 | useState(detectedBarcode) | null | Barcode detected → string value |
| MAP-403 | BEH-007, ERRPATH-005 | useState(detectionError) | null | Error occurs → error message string |
| MAP-404 | BEH-009, BEH-011 | useState(isActive) | false | onFocus → true; onBlur → false |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-002, BEH-004 | AVCaptureSession (legacy, deprecated) | CameraX + ProcessCameraProvider (modern) | RN: Use react-native-vision-camera (modern, cross-platform abstraction) | Android is primary; iOS legacy is archived |
| DIV-002 | BEH-005, API-004 | GMS Vision (legacy, deprecated) | ML Kit Vision (modern, active) | RN: Use react-native-mlkit-barcode or expo-barcode-scanner | Android is primary source |
| DIV-003 | BEH-001, BEH-010 | AVCaptureDevice.authorizationStatus | ContextCompat.checkSelfPermission + AlertDialog | RN: Use react-native-permissions (unified API) | Unified permission handling |
| DIV-004 | BEH-003 | Barcode format: GMS Vision (limited) | ML Kit: EAN-8, EAN-13, Code128, QR (configurable) | RN: Configure detection to exclude QR (barcode-only) | Android supports more formats |
| DIV-005 | EP-002, BEH-002 | N/A (single processor) | ViewModel + LiveData (complex async) | RN: Use custom hooks + React context for state | Different architecture patterns |
| DIV-006 | BEH-008 | N/A | Handler.post() to main thread | RN: Native threading handled by library | RN async model differs |
| DIV-007 | EP-003 | N/A | bindAllCameraUseCases() explicit binding | RN: Library handles binding internally | Abstraction level difference |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | react-native-vision-camera | ADD | Replace AVCaptureSession (iOS) + CameraX (Android); unified camera API | BEH-001, BEH-002, BEH-004, BEH-005 |
| MAP-DEP-002 | react-native-mlkit-barcode or expo-barcode-scanner | ADD | Replace GMS Vision (iOS legacy) + ML Kit (Android); unified barcode detection | BEH-003, BEH-005, BEH-006, API-004 |
| MAP-DEP-003 | react-native-permissions | ADD (optional) | Unified camera permission request (replace ContextCompat + AlertDialog) | BEH-001, BEH-010 |
| MAP-DEP-004 | @react-navigation/native | REUSE | Route params + result passing (replace Intent + setResult) | EP-005, BEH-006, NAV-002 |
| MAP-DEP-005 | react-native-haptic-feedback | ADD (optional) | Optional haptic feedback on barcode detection (Android feature parity with future iOS) | (future enhancement) |
| MAP-DEP-006 | react-native-reanimated (optional) | ADD (optional) | Camera animation / overlay effects (UI enhancement) | UI-001, UI-002 |

---
