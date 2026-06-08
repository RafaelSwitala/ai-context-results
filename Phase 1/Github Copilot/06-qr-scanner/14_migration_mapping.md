# Migration Mapping

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/qr-code-scanner/claude/20260602-006/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T22:25:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-004 | screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Replace QrCodeScannerViewController + QRCodeScannerActivity | Single unified screen for both platforms |
| MAP-002 | BEH-001, BEH-009 | hooks/useQRScanner.ts | useQRScanner() | Initialize camera + ML Kit scanner options | Unified scanner initialization |
| MAP-003 | BEH-003, BEH-011 | utils/qrCodeValidator.ts | validateQRCode() | Parse URL, check for p=MB marker | Shared validation logic |
| MAP-004 | BEH-007, BEH-013 | components/QRErrorDialog.tsx | QRErrorDialog | Error message UI; retry button | Unified error handling |
| MAP-005 | UI-001, UI-005 | components/QRCameraPreview.tsx | QRCameraPreview | Camera feed overlay with detection UI | Reusable preview component |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-002, BEH-010 | qrCodeService.ts | detectQRCode(frame) | Wrapper for react-native-vision-camera or Expo barcode scanner | Unified detection |
| MAP-101 | BEH-003, BEH-011 | qrCodeService.ts | parseQRCodeURL(codeString) | Extract and validate QR format | Shared across platforms |
| MAP-102 | EP-002, BEH-008, BEH-014 | navigationService.ts | returnQRResult(url) | Navigate back to Settings with URL data | Unify segue/Intent result |
| MAP-103 | BEH-005 | hapticService.ts | triggerSuccess() / triggerError() | Haptic feedback wrapper | Optional; graceful fallback |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Notes |
|---|---|---|---|---|
| MAP-200 | STOR-001, STOR-002 | Component state | qrCodeData (temporary) | Transient; passed via route.params |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-002 | qrCodeValidator.ts | QRCodeParser service | URL parsing and validation logic |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | BEH-001, BEH-009 | useState(cameraActive) | false | true on mount; false on error/back |
| MAP-401 | BEH-002, BEH-010 | useState(detectedCode) | null | Set when barcode detected; clear on retry |
| MAP-402 | BEH-007, BEH-013 | useState(errorMessage) | null | Set on validation failure; cleared on retry |
| MAP-403 | BEH-004, BEH-012 | useMemo(normalizedURL) | "" | Ensure "?" present in URL |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-005 | UINotificationFeedbackGenerator (explicit) | N/A (absent) | RN: Use react-native-haptic-feedback (optional) | iOS feature; Android can benefit |
| DIV-002 | BEH-001 | AVCaptureSession + AVMetadataOutput | ML Kit Vision + BarcodeScannerOptions | RN: Use react-native-vision-camera or Expo barcode scanner | Different libraries; unified API needed |
| DIV-003 | BEH-006 | DispatchQueue.global(qos: .background) | Handler on main thread | RN: Use Platform.OS check or unified hook | Thread management differs |
| DIV-004 | BEH-008, BEH-014 | performSegue(BACK_TO_SETTINGS) unwind | setResult(RESULT_OK) + finish() | RN: navigation.navigate('Settings', {qrCode: url}) | Different nav patterns |
| DIV-005 | STATE-002 | captureSession.startRunning() on main | imageProcessor.start() async | RN: Camera/Barcode scanner library handles | Library abstraction |
| DIV-006 | STATE-006, STATE-014 | Unwind segue parameter passing | Intent.putExtra() data | RN: route.params object | Route param passing unified |
| DIV-007 | ERRPATH-005, BEH-012 | captureSession.isRunning check | scannedCode deduplication | RN: useRef + comparison for Android-style dedup | State management approach |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | react-native-vision-camera | ADD | Replace AVCaptureSession + ML Kit | BEH-001, BEH-002, BEH-009, BEH-010 |
| MAP-DEP-002 | react-native-qrcode-scanner or expo-barcode-scanner | ADD | QR detection for cross-platform | BEH-002, BEH-010 |
| MAP-DEP-003 | react-native-haptic-feedback | ADD (optional) | Haptic feedback; fallback gracefully | BEH-005 |
| MAP-DEP-004 | @react-navigation/native | REUSE | Route params + navigation callbacks | BEH-008, BEH-014, MAP-102 |
| MAP-DEP-005 | fetch or custom URL utilities | REUSE | URL parsing (avoid external libs if possible) | API-001, API-002 |
| MAP-DEP-006 | react-native-permissions | ADD (optional) | Camera permission requests | (permission management) |

---
