# Code Facts

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/qr-code-scanner/claude/20260602-006/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T22:15:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | QrCodeScannerViewController.swift | viewDidLoad() | Screen loads; scanner initialized | [ios: Source/QrCodeScannerViewController.swift:override func viewDidLoad] |
| EP-002 | iOS | QrCodeScannerViewController.swift | openSettings() | QR code scanned successfully; segue triggered | [ios: Source/QrCodeScannerViewController.swift:@objc internal final func openSettings] |
| EP-003 | iOS | QrCodeScannerViewController.swift | backButtonTouched() | Back button pressed; camera stopped | [ios: Source/QrCodeScannerViewController.swift:@IBAction func backButtonTouched] |
| EP-004 | Android | QRCodeScannerActivity.java | onCreate() | Activity created; scanner initialized | [android: QRCodeScannerActivity.java:protected void onCreate] |
| EP-005 | Android | QRCodeScannerActivity.java | sendScannedCode() | QR code detected by ML Kit; callback fired | [android: QRCodeScannerActivity.java:public void sendScannedCode] |
| EP-006 | Android | QRCodeScannerActivity.java | handleCode() | sendScannedCode posts to main thread | [android: QRCodeScannerActivity.java:private void handleCode] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Initialize camera capture for QR codes | supportedCodeTypesQR | AVCaptureSession running; preview visible | [ios: Source/QrCodeScannerViewController.swift:self.startCapture(supportedCodeTypesQR:)] |
| BEH-002 | iOS | Detect QR metadata from camera | AVCaptureMetadataOutput callback | metadataObj.stringValue extracted | [ios: Source/QrCodeScannerViewController.swift:func metadataOutput(_ output:, didOutput metadataObjects:] |
| BEH-003 | iOS | Parse QR code URL and validate | codeValue URL string | QRCodeParser.parse().isValid() returns true/false | [ios: Source/QrCodeScannerViewController.swift:guard QRCodeParser.parse(url: codeValue).isValid()] |
| BEH-004 | iOS | Handle missing query separator in URL | codeValue without "?" | Prepend "http://localhost?" to codeValue | [ios: Source/QrCodeScannerViewController.swift:if !codeValue.contains("?") { codeValue = "http://localhost?" + codeValue }] |
| BEH-005 | iOS | Provide haptic feedback on success | QR valid | UINotificationFeedbackGenerator.notificationOccurred(.success) | [ios: Source/QrCodeScannerViewController.swift:feedbackGenerator.notificationOccurred(.success)] |
| BEH-006 | iOS | Stop camera capture in background | captureSession running | DispatchQueue background: captureSession.stopRunning() | [ios: Source/QrCodeScannerViewController.swift:DispatchQueue.global(qos: .background).async] |
| BEH-007 | iOS | Display error message on invalid QR | Invalid QR code | UIAlertController shown; restartCapture() on dismiss | [ios: Source/QrCodeScannerViewController.swift:func showErrorMessage(codeValue:] |
| BEH-008 | iOS | Return to settings after successful scan | QR valid + openSettings() | performSegue(BACK_TO_SETTINGS) triggered | [ios: Source/QrCodeScannerViewController.swift:self.performSegue(withIdentifier: "BACK_TO_SETTINGS")] |
| BEH-009 | Android | Initialize ML Kit barcode scanner | BarcodeScannerOptions.FORMAT_QR_CODE | BarcodeDetector configured for QR only | [android: QRCodeScannerActivity.java:protected void initialize() / BarcodeScannerOptions.Builder.setBarcodeFormats] |
| BEH-010 | Android | Handle barcode detection callback | Barcode detected | sendScannedCode(code) called on background thread | [android: QRCodeScannerActivity.java:public void sendScannedCode(String code)] |
| BEH-011 | Android | Parse QR code URL and validate format | code string | Uri.parse() + getQueryParameter("p") == "MB" | [android: QRCodeScannerActivity.java:private boolean isUrlValid(String qrcode)] |
| BEH-012 | Android | Handle missing query separator in URL | code without "?" | Prepend "http://localhost?" to code | [android: QRCodeScannerActivity.java:if (!url.contains("?")) { url = "http://localhost?" + url; }] |
| BEH-013 | Android | Detect duplicate rapid scans | scannedCode equals current code | Return early; skip processing | [android: QRCodeScannerActivity.java:if (scannedCode.equals(code)) { return; }] |
| BEH-014 | Android | Display error dialog on invalid QR | Invalid QR code format | AlertDialog.Builder shown; restartImageProcessor() on dismiss | [android: QRCodeScannerActivity.java:private void showErrorDialog()] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | App launch → Settings | User taps QR scanner button | QrCodeScannerViewController displayed; viewDidLoad called | [ios: Source/QrCodeScannerViewController.swift:override func viewDidLoad] |
| STATE-002 | iOS | Camera initializing | startCapture() executes | Preview visible; captureSession.startRunning() | [ios: Source/QrCodeScannerViewController.swift:self.startCapture(supportedCodeTypesQR:)] |
| STATE-003 | iOS | Waiting for QR | metadataOutput fires | Metadata received; stringValue extracted | [ios: Source/QrCodeScannerViewController.swift:func metadataOutput(_ output:, didOutput metadataObjects:] |
| STATE-004 | iOS | QR detected → validation | QRCodeParser.parse().isValid() | If true: haptic + stopRunning() + openSettings(); if false: showErrorMessage() | [ios: Source/QrCodeScannerViewController.swift:guard QRCodeParser.parse(url: codeValue).isValid()] |
| STATE-005 | iOS | Error shown | Alert action OK tapped | restartCapture() called; return to waiting state | [ios: Source/QrCodeScannerViewController.swift:self.restartCapture(supportedCodeTypesQR:)] |
| STATE-006 | iOS | Scan successful | openSettings() executes → performSegue | Navigate back to SettingsViewController (unwind segue) | [ios: Source/QrCodeScannerViewController.swift:self.performSegue(withIdentifier: "BACK_TO_SETTINGS")] |
| STATE-007 | iOS | Back button pressed | backButtonTouched() fires | stopRunning() in background; dismiss(animated: false) | [ios: Source/QrCodeScannerViewController.swift:@IBAction func backButtonTouched] |
| STATE-008 | Android | App launch → Settings | User taps QR code button | QRCodeScannerActivity created; onCreate called | [android: QRCodeScannerActivity.java:protected void onCreate] |
| STATE-009 | Android | Camera initializing | initialize() + imageProcessor setup | Barcode detector ready; listening for frames | [android: QRCodeScannerActivity.java:protected void initialize()] |
| STATE-010 | Android | Waiting for QR | Frame processing loop | Barcode detected; sendScannedCode(code) posted to handler | [android: QRCodeScannerActivity.java:public void sendScannedCode] |
| STATE-011 | Android | Deduplication check | scannedCode equals current code | Skip; early return | [android: QRCodeScannerActivity.java:if (scannedCode.equals(code)) { return; }] |
| STATE-012 | Android | QR detected → validation | isUrlValid(url) check | If true: setResult(RESULT_OK) + finish(); if false: showErrorDialog() | [android: QRCodeScannerActivity.java:if (isUrlValid(url))] |
| STATE-013 | Android | Error shown | Alert OK button tapped | restartImageProcessor() called; return to waiting state | [android: QRCodeScannerActivity.java:restartImageProcessor()] |
| STATE-014 | Android | Scan successful | finish() called | Activity destroyed; result passed to caller | [android: QRCodeScannerActivity.java:setResult(Activity.RESULT_OK, data); finish();] |
| STATE-015 | Android | Cancel button or back | finish() called | Activity destroyed; RESULT_CANCELED set | [android: QRCodeScannerActivity.java:setResult(Activity.RESULT_CANCELED); finish();] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | self.codeValue (instance var) | Write | String (QR URL) | [ios: Source/QrCodeScannerViewController.swift:self.codeValue = codeValue] |
| STOR-002 | Android | scannedCode (instance var) | Write | String (QR URL) | [android: QRCodeScannerActivity.java:private String scannedCode = ""] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|
| API-001 | iOS | QRCodeParser.parse(url) | QR Parser utility | URL string (p=MB&v=1&...) | Parsed QRCodeSettings object or nil | [ios: Source/QrCodeScannerViewController.swift:QRCodeParser.parse(url: codeValue).isValid()] |
| API-002 | Android | Uri.parse() + getQueryParameter() | Android Uri utilities | URL string (p=MB&v=1&...) | Query parameter value or null | [android: QRCodeScannerActivity.java:Uri uri = Uri.parse(qrcode); uri.getQueryParameter("p")] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | SettingsViewController | QrCodeScannerViewController | User taps "Scan QR Code" button | [ios: (via segue; inferred from codeValue passing)] |
| NAV-002 | iOS | QrCodeScannerViewController | SettingsViewController | QR scanned + valid + openSettings() | [ios: Source/QrCodeScannerViewController.swift:performSegue(withIdentifier: "BACK_TO_SETTINGS")] |
| NAV-003 | iOS | QrCodeScannerViewController | SettingsViewController | Back button pressed | [ios: Source/QrCodeScannerViewController.swift:dismiss(animated: false)] |
| NAV-004 | Android | SettingsActivity | QRCodeScannerActivity | User taps QR code button | [android: (via startActivityForResult; inferred from SettingsActivity)] |
| NAV-005 | Android | QRCodeScannerActivity | SettingsActivity | QR scanned + valid; setResult(RESULT_OK) | [android: QRCodeScannerActivity.java:setResult(Activity.RESULT_OK, data); finish();] |
| NAV-006 | Android | QRCodeScannerActivity | SettingsActivity | Cancel button or back; setResult(RESULT_CANCELED) | [android: QRCodeScannerActivity.java:setResult(Activity.RESULT_CANCELED); finish();] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | QR code not detected | metadataObjects.count == 0; early return | No action; continue waiting | [ios: Source/QrCodeScannerViewController.swift:if metadataObjects.count == 0 { return }] |
| ERRPATH-002 | iOS | QR format invalid (not supported) | supportedCodeTypesQR check fails; error feedback | hapticGenerator.notificationOccurred(.error); showErrorMessage() | [ios: Source/QrCodeScannerViewController.swift:feedbackGenerator.notificationOccurred(.error)] |
| ERRPATH-003 | iOS | QRCodeParser validation fails | QRCodeParser.parse().isValid() returns false | showErrorMessage("Wrong Code"); restartCapture() | [ios: Source/QrCodeScannerViewController.swift:guard QRCodeParser.parse(url:).isValid() else] |
| ERRPATH-004 | iOS | codeValue nil/empty | guard var codeValue else | showErrorMessage("No Content"); return | [ios: Source/QrCodeScannerViewController.swift:guard var codeValue = metadataObj.stringValue else] |
| ERRPATH-005 | iOS | AVCaptureSession already running | captureSession.isRunning check | Skip stopRunning(); no crash | [ios: Source/QrCodeScannerViewController.swift:if self.captureSession.isRunning] |
| ERRPATH-006 | Android | Barcode format not QR | Format check in detector | Skip; continue listening | [android: QRCodeScannerActivity.java (implicit in ML Kit filtering)] |
| ERRPATH-007 | Android | isUrlValid() validation fails | Uri.parse() or getQueryParameter() returns null | showErrorDialog(); restartImageProcessor() | [android: QRCodeScannerActivity.java:if (isUrlValid(url)) { ... } else { showErrorDialog() }] |
| ERRPATH-008 | Android | scannedCode is null or empty | StringUtils.IsNullOrEmpty(code) check | Skip; return early | [android: QRCodeScannerActivity.java:if (!StringUtils.IsNullOrEmpty(code))] |
| ERRPATH-009 | Android | Exception during Uri.parse() | try-catch in isUrlValid() | Return false; showErrorDialog() | [android: QRCodeScannerActivity.java:try { ... } catch (Exception ex) { return false; }] |
| ERRPATH-010 | Android | Dialog already showing | dialog != null && dialog.isShowing() check | Skip creating new; no duplicate | [android: QRCodeScannerActivity.java:if (dialog == null \|\| !dialog.isShowing())] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | AVFoundation | AVCaptureSession, AVMetadataOutput, camera access | react-native-camera or expo-barcode-scanner | [ios: Source/QrCodeScannerViewController.swift:import AVFoundation] |
| DEP-002 | iOS | UIKit | UIViewController, UIAlertController, haptic feedback setup | React Native, Alert API | [ios: Source/QrCodeScannerViewController.swift:import UIKit] |
| DEP-003 | iOS | ScannerViewController (base class) | startCapture(), restartCapture(), supportedCodeTypesQR | Base scanner logic (RN custom) | [ios: Source/QrCodeScannerViewController.swift:class QrCodeScannerViewController : ScannerViewController] |
| DEP-004 | iOS | QRCodeParser utility | QR code URL parsing and validation | Custom RN service or library | [ios: Source/QrCodeScannerViewController.swift:QRCodeParser.parse(url:)] |
| DEP-005 | Android | com.google.mlkit.vision (ML Kit) | BarcodeDetector, BarcodeScannerOptions, QR detection | react-native-qrcode-scanner, expo-barcode-scanner, or flutter-qr-reader | [android: QRCodeScannerActivity.java:import com.google.mlkit.vision.barcode.*] |
| DEP-006 | Android | ScannerBaseActivity (base class) | initialize(), sendScannedCode(), restartImageProcessor() | Base scanner logic (RN custom) | [android: QRCodeScannerActivity.java:class QRCodeScannerActivity extends ScannerBaseActivity] |
| DEP-007 | Android | android.app.Handler | Post callback to main thread | React Native handler or async/await | [android: QRCodeScannerActivity.java:private final Handler handler = new Handler(Looper.getMainLooper())] |
| DEP-008 | Android | android.net.Uri + StringUtils | URL parsing, null checks | RN string utilities or custom helpers | [android: QRCodeScannerActivity.java:Uri.parse(), StringUtils.IsNullOrEmpty()] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Camera preview overlay | Display camera feed with capture area | [ios: Source/QrCodeScannerViewController.swift:implicit in AVCaptureSession setup] |
| UI-002 | iOS | Description label | Display "QR code scanner explanation" text | [ios: Source/QrCodeScannerViewController.swift:self.lblDescription.text = Messages.qrcodeScannerExplanation] |
| UI-003 | iOS | UIAlertController | Error dialog with title + message + OK button | [ios: Source/QrCodeScannerViewController.swift:UIAlertController(title:, message:, preferredStyle:)] |
| UI-004 | iOS | Back button | Navigation bar back button for dismiss | [ios: Source/QrCodeScannerViewController.swift:@IBAction func backButtonTouched] |
| UI-005 | Android | Camera preview surface | Display camera feed with ML Kit detection overlay | [android: QRCodeScannerActivity.java:CameraSourcePreview, GraphicOverlay (inferred from base)] |
| UI-006 | Android | Explanation text | Display "qrcode_scanner_title" message | [android: QRCodeScannerActivity.java:explanation.setText(getResources().getString(R.string.qrcode_scanner_title))] |
| UI-007 | Android | Cancel button | Button to dismiss scanner | [android: QRCodeScannerActivity.java:findViewById(R.id.cancel).setOnClickListener] |
| UI-008 | Android | AlertDialog | Error dialog with title + message + OK button | [android: QRCodeScannerActivity.java:AlertDialog.Builder(...).setTitle(...).setMessage(...)] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Camera access permission | User grants permission via system prompt; AVCaptureDevice.authorizationStatus | RN: Request camera permission; handle denial gracefully | [ios: Source/QrCodeScannerViewController.swift:implicit in AVCaptureSession] |
| SEC-002 | Android | Camera access permission | User grants permission via manifest + runtime request | RN: Request camera permission; handle denial gracefully | [android: QRCodeScannerActivity.java:Manifest.permission.CAMERA] |
| SEC-003 | iOS/Android | QR code content (URL) | URL may contain credentials; passed via Intent/segue | RN: Validate QR format; sanitize URL before passing to settings | [ios/android: codeValue / Intent.putExtra(QRCodeObject, url)] |
| SEC-004 | iOS/Android | QR validation marker (p=MB) | Required to validate authentic QR codes; prevents arbitrary URL scanning | RN: Enforce p=MB check; reject other QR types | [ios/android: QRCodeParser.isValid() / Uri.getQueryParameter("p")] |

---
