# Code Facts

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | Source/WebsiteViewController.swift | webView(_:decidePolicyFor:decisionHandler:) | WebView navigation URL starts with `AppSettings.BARCODESCANNER`. | [ios: Source/WebsiteViewController.swift:208 symbol=webView(_:decidePolicyFor:decisionHandler:)]; [ios: Source/WebsiteViewController.swift:225 symbol=BARCODESCANNER_check] |
| EP-002 | iOS | Source/ArticleScannerViewController.swift | viewDidLoad | `ARTICLE_SCANNER` segue instantiates ArticleScanner and starts capture when login is valid. | [ios: Source/ArticleScannerViewController.swift:26 symbol=viewDidLoad] |
| EP-003 | iOS | Source/ScannerViewController.swift | startCapture(supportedCodeTypes:) | Subclass starts AVFoundation metadata capture with supplied code types. | [ios: Source/ScannerViewController.swift:75 symbol=startCapture] |
| EP-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | onPageFinished | WebView-finished URL starts with `App.BARCODESCANNER` and contains `://`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:213 symbol=onPageFinished]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=BARCODESCANNER_check] |
| EP-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java | onCreate | Activity receives return URL through `App.URL` intent extra. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:21 symbol=onCreate] |
| EP-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java | onCreate | Base scanner layout is loaded and CameraX provider is observed. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:75 symbol=onCreate] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Scanner URL navigation is cancelled and converted to a return URL using the configured HTTP/HTTPS preference. | WebView URL beginning `barcodescanner` and containing `://`. | `ARTICLE_SCANNER` segue sender is the converted return URL. | [ios: Source/WebsiteViewController.swift:225 symbol=BARCODESCANNER_check]; [ios: Source/WebsiteViewController.swift:229 symbol=responseUrl] |
| BEH-002 | iOS | Article scanner requires a valid login preference before starting capture. | `PreferencesUtils.hasValidLoginPreference()`. | Invalid login performs `BACK_TO_LOGIN`; valid login calls `startCapture` with GTIN types. | [ios: Source/ArticleScannerViewController.swift:31 symbol=viewDidLoad] |
| BEH-003 | iOS | Barcode capture is limited to EAN-8, EAN-13 and Code128. | AVFoundation metadata output. | `metadataObjectTypes` set to `supportedCodeTypesGTIN`. | [ios: Source/ScannerViewController.swift:30 symbol=supportedCodeTypesGTIN]; [ios: Source/ScannerViewController.swift:98 symbol=metadataObjectTypes] |
| BEH-004 | iOS | Valid barcode scan stops capture, stores the scanned string and returns to WebView. | First metadata object whose type is in `supportedCodeTypesGTIN` and has `stringValue`. | `codeValue` set, success haptic fired, `BACK_TO_WEBVIEW` segue performed. | [ios: Source/ArticleScannerViewController.swift:74 symbol=supported_type_check]; [ios: Source/ArticleScannerViewController.swift:81 symbol=stopRunning]; [ios: Source/ArticleScannerViewController.swift:95 symbol=codeValue] |
| BEH-005 | iOS | Missing scan content or unsupported metadata type shows scan-error dialog and restarts capture after OK. | Empty `stringValue` or unsupported metadata type. | Alert with `Messages.scanError`; OK calls `restartCapture`. | [ios: Source/ArticleScannerViewController.swift:88 symbol=stringValue_guard]; [ios: Source/ArticleScannerViewController.swift:101 symbol=invalid_code]; [ios: Source/ArticleScannerViewController.swift:109 symbol=showErrorMessage] |
| BEH-006 | iOS | Cancel button stops capture and returns to WebView without adding a scan result. | Back/cancel button tap. | `BACK_TO_WEBVIEW` segue with original redirect URL. | [ios: Source/ArticleScannerViewController.swift:126 symbol=backButtonTouched]; [ios: Source/ArticleScannerViewController.swift:147 symbol=prepare_BACK_TO_WEBVIEW] |
| BEH-007 | Android | Scanner URL is converted to return URL and opens scanner only when camera permission is granted. | Finished WebView URL beginning `barcodescanner` and current login protocol preference. | `BarcodeScannerActivity` receives `App.URL` return URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:235 symbol=permission_check] |
| BEH-008 | Android | Missing camera permission shows an un-cancelable information dialog and reloads the return URL after OK. | Camera permission not granted. | Dialog text `no_camera_permission`; OK dismisses and loads return URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:240 symbol=permission_missing]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:247 symbol=permission_dialog] |
| BEH-009 | Android | Cancel button disables itself, stops the image processor and returns to WebView without scan result. | Cancel view click. | WebViewActivity started with original `responseUrl`; scanner finishes. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:29 symbol=cancel_listener] |
| BEH-010 | Android | Non-empty scanned code is de-duplicated, stops image processing and returns to WebView with `&ScanResult=<code>`. | Callback code from processor. | WebViewActivity started with `responseUrl + App.SCAN_RESULT + code`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:52 symbol=sendScannedCode]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:77 symbol=handleCode] |
| BEH-011 | Android | Processor forwards every detected barcode raw value that is non-empty. | ML Kit `List<Barcode>` from detection. | `ExchangeScannedData.sendScannedCode(rawValue)` invoked. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:71 symbol=onSuccess] |
| BEH-012 | Android | Scanner blocks hardware back button. | Android back press. | Callback consumes event and performs no navigation. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:41 symbol=OnBackPressedCallback] |
| BEH-013 | Android | Scanner redirects to login when the login preference is invalid on resume. | `PreferencesUtils.hasValidLoginPreference() == false`. | LoginActivity starts and scanner finishes. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:65 symbol=onResume] |
| BEH-014 | Android | Active scanner uses default ML Kit barcode options, so no code-format filter is applied by BarcodeScannerActivity. | `initialize()` in BarcodeScannerActivity. | `new BarcodeScannerOptions.Builder().build()`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:47 symbol=initialize] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | Capture session not running | `viewWillAppear` or `startCapture` background block | Capture session running | [ios: Source/ScannerViewController.swift:46 symbol=viewWillAppear]; [ios: Source/ScannerViewController.swift:115 symbol=startRunning] |
| STATE-002 | iOS | Capture session running | Valid barcode accepted | Capture session stopped | [ios: Source/ArticleScannerViewController.swift:78 symbol=stop_scanner] |
| STATE-003 | iOS | Error dialog displayed | User taps OK | Capture restarts with GTIN types | [ios: Source/ArticleScannerViewController.swift:112 symbol=UIAlertController]; [ios: Source/ArticleScannerViewController.swift:116 symbol=restartCapture] |
| STATE-004 | Android | Camera provider observed | Permission already granted | Preview and analysis use cases bound | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:108 symbol=getProcessCameraProvider]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:146 symbol=requestCameraPermission] |
| STATE-005 | Android | Analyzer active | Activity paused or destroyed | Image processor stopped | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:131 symbol=onPause]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:137 symbol=onDestroy] |
| STATE-006 | Android | `scannedCode` empty or previous value | New non-empty different code | `scannedCode` updated and scanner result emitted | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:16 symbol=scannedCode]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:79 symbol=dedupe] |
| STATE-007 | Android | WebView visible | Scanner or login/about URL finished | WebView hidden | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:269 symbol=visibility_check] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | Login preference via PreferencesUtils | Read | Boolean login validity | [ios: Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] |
| STOR-002 | Android | Login preference via PreferencesUtils | Read | Boolean login validity | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] |
| STOR-003 | Android | Login preference via PreferencesUtils | Write | Boolean `true` when camera permission already granted for BarcodeScannerActivity | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:146 symbol=requestCameraPermission]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:148 symbol=isBarcodeScanner] |
| STOR-004 | Cross-platform | Scanned barcode value | N/A persisted storage | Transient string only, appended to return URL | [ios: Source/ArticleScannerViewController.swift:95 symbol=codeValue]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:83 symbol=scannedCode] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | Cross-platform | N/A direct native HTTP call | WebView return URL handoff | Native scanner returns by loading/starting WebViewActivity with URL | WebView loads the resulting URL outside the scanner component | [ios: Source/ArticleScannerViewController.swift:145 symbol=prepare]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=handleCode] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | WebsiteViewController | ArticleScannerViewController | Scanner URL intercepted. | [ios: Source/WebsiteViewController.swift:232 symbol=performSegue_ARTICLE_SCANNER] |
| NAV-002 | iOS | ArticleScannerViewController | WebsiteWrapperViewController/WebView unwind | Valid scan or cancel. | [ios: Source/ArticleScannerViewController.swift:47 symbol=openWebview]; [ios: Source/ArticleScannerViewController.swift:145 symbol=prepare_BACK_TO_WEBVIEW] |
| NAV-003 | iOS | ArticleScannerViewController | Login unwind | Invalid login preference. | [ios: Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] |
| NAV-004 | Android | WebviewActivity | BarcodeScannerActivity | Scanner URL and granted camera permission. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:235 symbol=permission_granted] |
| NAV-005 | Android | BarcodeScannerActivity | WebviewActivity | Cancel or scan success. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:35 symbol=cancel_to_webview]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=result_to_webview] |
| NAV-006 | Android | BarcodeScannerActivity | LoginActivity | Invalid login preference on resume. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=login_guard] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | No video capture device exists. | Logs `Failed to get the camera device.` and returns from `startCapture`. | Scanner UI remains without active capture. | [ios: Source/ScannerViewController.swift:80 symbol=captureDevice_guard] |
| ERRPATH-002 | iOS | AVCaptureDeviceInput or capture setup throws. | Logs localized error and returns. | Scanner does not start capture. | [ios: Source/ScannerViewController.swift:85 symbol=capture_setup_do]; [ios: Source/ScannerViewController.swift:100 symbol=capture_setup_catch] |
| ERRPATH-003 | iOS | Metadata has supported type but no string content. | Shows scan-error alert and restarts capture after OK. | User remains on scanner after acknowledging. | [ios: Source/ArticleScannerViewController.swift:88 symbol=stringValue_guard]; [ios: Source/ArticleScannerViewController.swift:109 symbol=showErrorMessage] |
| ERRPATH-004 | iOS | Metadata type is not supported GTIN type. | Error haptic plus scan-error alert. | User remains on scanner after restart. | [ios: Source/ArticleScannerViewController.swift:99 symbol=unsupported_type_else] |
| ERRPATH-005 | Android | WebView scanner trigger occurs without camera permission. | Shows un-cancelable dialog and reloads return URL on OK. | Scanner is not opened; WebView continues with return URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:240 symbol=permission_missing] |
| ERRPATH-006 | Android | ScannerBaseActivity starts without camera permission. | Shows un-cancelable dialog and finishes on OK. | Scanner exits. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:152 symbol=permission_missing] |
| ERRPATH-007 | Android | BarcodeScannerProcessor construction fails. | Toast shows creation error and analysis binding returns. | Scanner preview may remain without analysis. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:256 symbol=processor_try] |
| ERRPATH-008 | Android | ML Kit processing throws MlKitException. | Toast with localized message. | Current frame processing failure is visible to user. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:297 symbol=processImageProxy] |
| ERRPATH-009 | Android | Barcode detection fails in processor. | Logs detection failure. | No user-visible scanner error. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:86 symbol=onFailure] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | AVFoundation | Camera session and metadata barcode capture. | RN native scanner library using AVFoundation under the hood. | [ios: Source/ScannerViewController.swift:10 symbol=import_AVFoundation] |
| DEP-002 | iOS | UIKit | Alert, haptic feedback, labels/buttons and segues. | React Native components plus permission/error state. | [ios: Source/ArticleScannerViewController.swift:10 symbol=import_UIKit] |
| DEP-003 | Android | com.google.mlkit:barcode-scanning:17.3.0 | Barcode detection. | `expo-camera` barcode scanning or maintained RN vision/ML Kit scanner package. | [android: app/build.gradle:147 symbol=mlkit_dependency] |
| DEP-004 | Android | androidx.camera camera2/lifecycle/view/extensions 1.4.2 | Camera preview and image analysis. | Scanner package camera backend or Expo Camera. | [android: app/build.gradle:154 symbol=camerax_dependency] |
| DEP-005 | Android | AndroidX Lifecycle/ViewModel | Obtains ProcessCameraProvider. | RN lifecycle handled by component focus/effects. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:108 symbol=ViewModelProvider] |
| DEP-006 | RN | No barcode scanner dependency present | RN must add scanner/camera capability. | Prefer Expo-compatible camera/scanner if project remains Expo. | [rn: package.json:14 symbol=dependencies] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Article scanner description label | Displays `Barcode scannen`. | [ios: Source/ArticleScannerViewController.swift:31 symbol=lblDescription] |
| UI-002 | iOS | Scanner preview with top/bottom gray bars | Camera preview layer fills view and background bars are brought to front. | [ios: Source/ScannerViewController.swift:106 symbol=videoPreviewLayer]; [ios: Source/ScannerViewController.swift:121 symbol=bringSubviewToFront] |
| UI-003 | iOS | Error alert | Shows title `Fehler`, message `Fehler beim Scannen`, OK restarts scanner. | [ios: Source/ArticleScannerViewController.swift:112 symbol=UIAlertController]; [ios: Source/Utils/Messages.swift:21 symbol=error] |
| UI-004 | Android | Scanner title text | Displays localized `scan_barcode_title`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:27 symbol=explanation_setText]; [android: app/src/main/res/values/strings.xml:16 symbol=scan_barcode_title] |
| UI-005 | Android | Scanner layout | Full-screen PreviewView, GraphicOverlay, explanation and cancel image. | [android: app/src/main/res/layout/activity_scanner_base.xml:12 symbol=preview_view]; [android: app/src/main/res/layout/activity_scanner_base.xml:68 symbol=cancel] |
| UI-006 | Android | Result container | Becomes visible after non-empty code is received. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:327 symbol=cleanUp] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Camera frames | iOS camera usage description states camera is used to detect QR codes and barcodes. | RN iOS must declare camera usage text for barcode scanning. | [ios: Info.plist:32 symbol=NSCameraUsageDescription] |
| SEC-002 | Android | Camera frames | Manifest declares camera feature, autofocus feature and CAMERA permission. | RN Android must declare/request camera permission and support no-permission state. | [android: app/src/main/AndroidManifest.xml:5 symbol=camera_feature]; [android: app/src/main/AndroidManifest.xml:8 symbol=CAMERA_permission] |
| SEC-003 | Cross-platform | Scanned barcode value | Value is transient in native code but appended to a URL query parameter. | RN must URL-encode scan result before append and avoid persisting it. | [ios: Source/ArticleScannerViewController.swift:149 symbol=SCAN_RESULT_append]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=SCAN_RESULT_append] |
| SEC-004 | Android | Return URL transport | Android app allows cleartext traffic and scanner return URL may use HTTP according to login preference. | RN must preserve configured protocol behavior unless security policy changes in a later phase. | [android: app/src/main/AndroidManifest.xml:24 symbol=usesCleartextTraffic]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:232 symbol=protocol] |
