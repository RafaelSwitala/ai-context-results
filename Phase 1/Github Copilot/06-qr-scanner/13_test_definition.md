# Test Definition

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/qr-code-scanner/claude/20260602-006/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T22:20:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit | iOS/Android | HIGH | Initialize camera capture |
| BEH-002 | Unit | iOS | HIGH | Detect QR metadata from camera |
| BEH-003 | Integration | iOS/Android | HIGH | Parse and validate QR code URL |
| BEH-004 | Unit | iOS/Android | HIGH | Handle missing query separator |
| BEH-005 | Unit | iOS | MEDIUM | Haptic feedback on success |
| BEH-006 | Unit | iOS | MEDIUM | Stop camera in background thread |
| BEH-007 | Unit | iOS/Android | HIGH | Display error message on invalid QR |
| BEH-008 | Integration | iOS | HIGH | Return to settings after scan |
| BEH-009 | Unit | Android | HIGH | Initialize ML Kit barcode scanner |
| BEH-010 | Unit | Android | HIGH | Handle barcode detection callback |
| BEH-011 | Integration | Android | HIGH | Parse QR URL and validate |
| BEH-012 | Unit | Android | HIGH | Detect duplicate rapid scans |
| BEH-013 | Unit | Android | MEDIUM | Display error dialog |
| BEH-014 | Unit | Android | HIGH | Return result to caller |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Initialize scanner on viewDidLoad | QrCodeScannerViewController displayed | viewDidLoad() executes | startCapture(supportedCodeTypesQR) called; preview visible | EP-001, BEH-001 |
| LT-002 | iOS | Detect QR code metadata | Scanner active; QR in frame | metadataOutput delegate fires | AVMetadataObject extracted; stringValue obtained | BEH-002, STATE-003 |
| LT-003 | iOS | Parse valid QR code URL | QR metadata received | QRCodeParser.parse(url).isValid() called | Parser returns true; haptic success feedback | BEH-003, BEH-005 |
| LT-004 | iOS | Handle QR without query separator | QR string without "?" | URL construction | "http://localhost?" prepended | BEH-004 |
| LT-005 | iOS | Parse invalid QR code | QR metadata invalid format | QRCodeParser.parse() fails | showErrorMessage("Wrong Code") called | BEH-007, ERRPATH-003 |
| LT-006 | iOS | Handle no QR content | metadataObj.stringValue is nil | QR detection | showErrorMessage("No Content") called; return | ERRPATH-004 |
| LT-007 | iOS | Stop camera in background | QR valid + openSettings() | DispatchQueue background async | captureSession.stopRunning() called on background | BEH-006, STATE-004 |
| LT-008 | iOS | Navigate back to settings | QR scanned + valid | openSettings() executes | performSegue(BACK_TO_SETTINGS) triggered | BEH-008, NAV-002 |
| LT-009 | iOS | Restart capture after error | Error dialog OK button | Alert dismiss | restartCapture(supportedCodeTypesQR) called | STATE-005, BEH-001 |
| LT-010 | iOS | Back button stops camera | Back button tapped | backButtonTouched() fires | stopRunning() in background; dismiss(animated: false) | EP-003, BEH-006, STATE-007 |
| LT-011 | Android | Initialize ML Kit scanner | QRCodeScannerActivity created | onCreate() + initialize() | BarcodeScannerOptions.FORMAT_QR_CODE set | EP-004, BEH-009, STATE-008 |
| LT-012 | Android | Receive barcode detection | ML Kit detects barcode | sendScannedCode(code) callback | Handler posts to main thread; handleCode() called | EP-005, BEH-010, STATE-010 |
| LT-013 | Android | Deduplicate rapid scans | scannedCode already set | sendScannedCode(same code) called | Early return; skip processing | BEH-012, STATE-011 |
| LT-014 | Android | Parse valid QR URL | QR code string received | isUrlValid(url) + Uri.parse() + getQueryParameter("p") | Returns true if p=="MB" | BEH-011, STATE-012 |
| LT-015 | Android | Handle QR without query separator | QR string without "?" | URL construction | "http://localhost?" prepended | BEH-004, BEH-012 |
| LT-016 | Android | Parse invalid QR URL | QR code format invalid | isUrlValid(url) check | Returns false; showErrorDialog() | BEH-013, ERRPATH-007 |
| LT-017 | Android | Handle exception during parsing | Uri.parse() throws | Exception in isUrlValid() | Caught in try-catch; return false | ERRPATH-009 |
| LT-018 | Android | Return success result to caller | QR valid + setResult | finish() called | RESULT_OK + Intent data passed to SettingsActivity | BEH-014, NAV-005 |
| LT-019 | Android | Return cancel result to caller | Cancel button or back | finish() called | RESULT_CANCELED set; activity closed | EP-006 implicit, NAV-006 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS | QR code too small or far | No metadata objects detected | metadataObjects.count == 0; continue waiting | ERRPATH-001 |
| EC-002 | iOS | Unsupported QR format (1D barcode) | Wrong format detected | Haptic error feedback; showErrorMessage() | ERRPATH-002 |
| EC-003 | iOS | Rapid segue/dismiss cycles | Second segue while first pending | Navigation handled gracefully; no crash | BEH-008 |
| EC-004 | iOS | Camera permission denied | AVCaptureSession not available | App should handle gracefully; show settings prompt | (permission framework level) |
| EC-005 | Android | ML Kit not available on device | isOperational() returns false | Toast warning; log error; graceful degradation | (ML Kit availability check) |
| EC-006 | Android | Rapid dialog dismiss/show | showErrorDialog called while previous showing | Dialog uniqueness check; prevent duplicates | ERRPATH-010 |
| EC-007 | Android | Handler overflow (rapid barcodes) | Handler queue backs up | Handler posts processed; handler.post ordering respected | (threading model) |
| EC-008 | iOS/Android | QR with special characters or encoding | URL with %20, &, #, etc. | Parsed correctly; special chars preserved | BEH-003, BEH-011 |
| EC-009 | iOS/Android | QR expires or changes mid-scan | Same code location, different content | Dedupe check may miss; acceptable (rare) | BEH-012 (Android only) |
| EC-010 | iOS/Android | Network unavailable during validation | Server check later (Settings screen) | QR parsing isolated from network; no blocking | (network isolation) |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| QR Detection & Parsing | BEH-002, BEH-003, BEH-011 | 100% | Core feature; all QR paths must work |
| Validation Logic | BEH-003, BEH-011, ERRPATH-003, ERRPATH-007 | 100% | Security-critical format check |
| Error Handling | BEH-007, BEH-013, ERRPATH-* | 95%+ | User must see clear errors |
| Navigation | NAV-*, BEH-008, BEH-014 | 100% | Results must pass back correctly |
| Camera Management | BEH-001, BEH-006 | 90%+ | Resource cleanup important |
| URL Formatting | BEH-004, BEH-012 | 100% | URL must be well-formed |
| Haptic Feedback | BEH-005 | 70%+ | Optional; nice-to-have |
| Deduplication | BEH-012 | 80%+ | Prevents spam; Android-specific |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| BEH-001 (camera initialization) | Requires actual camera hardware or mock | Mock AVCaptureSession; verify startCapture called |
| BEH-002 (metadata output) | Requires camera frames and AVFoundation | Mock metadataOutput; inject test metadata |
| BEH-005 (haptic feedback) | Requires device haptics | Verify feedbackGenerator method called |
| BEH-006 (background thread) | Requires thread verification | Mock DispatchQueue; verify async called |
| EP-004, BEH-010 (ML Kit callback) | Requires ML Kit barcode detection | Mock detector; inject test barcode |
| BEH-013 (rapid duplicate detection) | Timing-dependent; requires concurrent test | Simulate rapid sendScannedCode calls |
| Navigation (segue/Intent) | Requires UI framework | Mock navigation; verify performSegue/startActivity called |
| Camera permissions | Requires system permission handling | Mock AVCaptureDevice.authorizationStatus |

---
