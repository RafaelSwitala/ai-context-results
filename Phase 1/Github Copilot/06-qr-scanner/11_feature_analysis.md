# Feature Analysis

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/qr-code-scanner/claude/20260602-006/phase_1/11_feature_analysis.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T22:10:00Z |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | qr-code-scanner | phase_1_context_build.md |
| User feature name | qr-code-scanner | prompt |
| In scope | QR code scanning from camera, parsing QR code URL format (p=MB&v=1&t=&server=&mandant=&https=&token=), validation, result passing back to settings/webview, error handling, haptic feedback, camera permissions, supported code types (QR format only) | iOS + Android code inspection |
| Out of scope | Camera hardware calibration, advanced barcode formats (1D codes), image processing optimization, ML Kit model updates, Google Play Services integration details | Not required for Phase 2-5 |
| Open blockers | NONE - both iOS/Android implementations discoverable; flow clear; no undefined scope | Discovery complete |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | QRCode, Scanner, QrCode, barcode, camera, AVCapture, AVFoundation | 4 | 2 relevant | QrCodeScannerViewController.swift (primary); ScannerViewController.swift (base) |
| Android | QRCode, Scanner, barcode, Barcode, camera, MLKit, BarcodeDetector | 4 | 1-2 relevant | QRCodeScannerActivity.java (primary); BarcodeCaptureActivity.java (legacy, ~50% commented) |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | Source/QrCodeScannerViewController.swift | QrCodeScannerViewController : ScannerViewController | Main QR scanner controller; viewDidLoad, metadataOutput delegate, error handling, openSettings() | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift] |
| IOS-FILE-002 | iOS | Source/ScannerViewController.swift | ScannerViewController | Base scanner class; startCapture, restartCapture, supportedCodeTypesQR, captureSession | [ios: (inferred from QrCodeScannerViewController parent)] |
| AND-FILE-001 | Android | app/src/main/java/.../QRCodeScannerActivity.java | QRCodeScannerActivity : ScannerBaseActivity | Main QR scanner activity; onCreate, handleCode, QRCodeParser.parse, isUrlValid, sendScannedCode | [android: mobilebrowser4android/QRCodeScannerActivity.java] |
| AND-FILE-002 | Android | app/src/main/java/.../BarcodeCaptureActivity.java | BarcodeCaptureActivity : BaseActivity | Legacy barcode activity (~50% commented out); onCreate, camera permissions, barcode detection (deprecated) | [android: mobilebrowser4android/BarcodeCaptureActivity.java] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | QR code capture via camera | IN | Core feature; required for settings/login flow | iOS/Android code |
| BOUND-002 | URL parsing from QR code string | IN | Required for validation and passing to settings | QRCodeParser.parse() |
| BOUND-003 | Validation of QR code format (p=MB marker) | IN | Security; must match expected format | isUrlValid() method |
| BOUND-004 | Error handling (invalid QR, no content) | IN | User feedback; showErrorMessage() | iOS/Android code |
| BOUND-005 | Camera permissions (iOS/Android) | IN | Functional requirement; requestCameraPermission() | iOS/Android code |
| BOUND-006 | Haptic feedback on success/error | IN | User experience; UINotificationFeedbackGenerator | iOS code only |
| BOUND-007 | Supported code types (QR only) | IN | Feature scope; not generic barcode scanner | supportedCodeTypesQR |
| BOUND-008 | Return to settings via segue/result | IN | Navigation after scan; unwind/onActivityResult | iOS/Android code |
| BOUND-009 | Back button / cancel behavior | IN | Navigation; dismiss/finish | iOS/Android code |
| BOUND-010 | Image capture UI overlay | OUT | Platform-specific rendering; not documented | UI framework details |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| QR Code Format | URL with query parameters (p=MB&v=1&t=&server=&mandant=&https=&token=) | Same URL format expected | SAME | RN: Both must parse identical format |
| Scanner Library | AVCaptureSession + AVMetadataOutput (native framework) | ML Kit Vision (Google) | DIFFERENT | RN: Use react-native-qrcode-scanner or expo-barcode-scanner |
| Permissions | AVCaptureDevice.authorizationStatus for camera | Manifest.permission.CAMERA + runtime request | DIFFERENT | RN: Use react-native-permissions or Expo permissions |
| Validation Logic | QRCodeParser.parse(url).isValid() | Uri.parse(qrcode) + getQueryParameter("p") == "MB" | SAME concept, different impl | RN: Create unified QRCodeValidator service |
| Error UI | UIAlertController with title + message | AlertDialog.Builder with buttons | DIFFERENT APIs | RN: Use Alert or react-native-dialog |
| Success Action | openSettings() + performSegue(BACK_TO_SETTINGS) | setResult(RESULT_OK) + finish() | DIFFERENT nav patterns | RN: navigation.navigate('Settings') or route.params callback |
| Haptic Feedback | UINotificationFeedbackGenerator (success/error) | N/A in current code | DIFFERENT | RN: Add react-native-haptic-feedback for both |
| Back/Cancel | dismiss(animated: false) | finish() | DIFFERENT nav patterns | RN: goBack() or setResult(RESULT_CANCELED) |

## Analysis Notes

### iOS Implementation
- **Entry**: QrCodeScannerViewController.viewDidLoad() → startCapture(supportedCodeTypesQR)
- **Capture**: metadataOutput delegate receives AVMetadataObject
- **Validation**: QRCodeParser.parse(url).isValid() → if valid, call openSettings()
- **Error**: Show UIAlertController; restartCapture() on dismiss
- **Exit**: performSegue(BACK_TO_SETTINGS) to unwind
- **Special**: Haptic feedback (success/error), DispatchQueue background thread for stopRunning()
- **Complexity**: Moderate; delegate-based callbacks

### Android Implementation
- **Entry**: QRCodeScannerActivity.onCreate() → initialize() with ML Kit options
- **Capture**: sendScannedCode(code) callback from parent ScannerBaseActivity
- **Validation**: isUrlValid(qrcode) → Uri.parse + getQueryParameter check
- **Error**: AlertDialog.Builder; restartImageProcessor() on dismiss
- **Exit**: setResult(RESULT_OK, data) + finish()
- **Special**: OnBackPressedCallback intercepts back; scanned code deduplication
- **Complexity**: Moderate; callback-based with handler post

### Key Similarities
1. Both parse QR code URL and validate format
2. Both show error dialogs on invalid input
3. Both support restart after error
4. Both return to settings via segue/result

### Key Divergences
1. Scanner library: AVCaptureSession (iOS) vs ML Kit Vision (Android)
2. Permissions model: iOS authorization status vs Android runtime request
3. Haptic feedback: iOS has explicit support; Android absent
4. Navigation: segue/unwind (iOS) vs Intent result (Android)

## Risks And Dependencies

| Risk | Mitigation | Dependency |
|---|---|---|
| Camera access denied | Show settings instructions | iOS/Android permissions framework |
| QR code not in expected format | Clear error message; allow retry | QRCodeParser validation logic |
| ML Kit not operational (Android) | Show toast + log warning | Google Play Services, ML Kit Vision library |
| Duplicate rapid scans (Android) | scannedCode deduplication | Handler post ordering |
| Haptic feedback not available (older Android) | Graceful no-op | react-native-haptic-feedback (optional) |

---
