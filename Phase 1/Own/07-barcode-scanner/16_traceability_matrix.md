# Traceability Matrix

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS WebView scanner URL interception. | [ios: Source/WebsiteViewController.swift:208 symbol=webView(_:decidePolicyFor:decisionHandler:)] | LT-001, LT-014, LT-016 | MAP-001 | src/features/webview/barcodeScannerUrl.ts | COVERED |
| EP-002 | Entry Point | iOS ArticleScanner loads scanner flow. | [ios: Source/ArticleScannerViewController.swift:26 symbol=viewDidLoad] | LT-002, LT-003 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| EP-003 | Entry Point | iOS AVFoundation capture start. | [ios: Source/ScannerViewController.swift:75 symbol=startCapture] | LT-003 | MAP-006 | barcodeScannerService.ts | COVERED |
| EP-004 | Entry Point | Android WebView scanner URL handling. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:213 symbol=onPageFinished] | LT-007, LT-014, LT-016 | MAP-001 | barcodeScannerUrl.ts | COVERED |
| EP-005 | Entry Point | Android BarcodeScannerActivity receives return URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:21 symbol=onCreate] | LT-009 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| EP-006 | Entry Point | Android ScannerBaseActivity initializes camera provider. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:75 symbol=onCreate] | LT-011, LT-013 | MAP-006 | barcodeScannerService.ts | COVERED |
| BEH-001 | Behavior | iOS scanner URL converts to return URL and segues. | [ios: Source/WebsiteViewController.swift:225 symbol=BARCODESCANNER_check] | LT-001, LT-014 | MAP-001, MAP-007 | barcodeScannerUrl.ts | COVERED |
| BEH-002 | Behavior | iOS scanner requires valid login. | [ios: Source/ArticleScannerViewController.swift:31 symbol=viewDidLoad] | LT-002 | MAP-002, MAP-009 | BarcodeScannerScreen.tsx | COVERED |
| BEH-003 | Behavior | iOS accepts EAN-8/EAN-13/Code128. | [ios: Source/ScannerViewController.swift:30 symbol=supportedCodeTypesGTIN] | LT-003 | MAP-006, MAP-017 | barcodeScannerService.ts | COVERED |
| BEH-004 | Behavior | iOS successful scan stops and returns result. | [ios: Source/ArticleScannerViewController.swift:74 symbol=supported_type_check] | LT-004 | MAP-006, MAP-007, MAP-012 | BarcodeScannerScreen.tsx | COVERED |
| BEH-005 | Behavior | iOS invalid scan shows error and restarts. | [ios: Source/ArticleScannerViewController.swift:109 symbol=showErrorMessage] | LT-005 | MAP-004, MAP-006, MAP-013 | BarcodeScannerErrorState.tsx | COVERED |
| BEH-006 | Behavior | iOS cancel returns without result. | [ios: Source/ArticleScannerViewController.swift:126 symbol=backButtonTouched] | LT-006 | MAP-002, MAP-020 | BarcodeScannerScreen.tsx | COVERED |
| BEH-007 | Behavior | Android scanner URL starts scanner with permission. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] | LT-007, LT-014 | MAP-001, MAP-016 | WebViewScreen.tsx | COVERED |
| BEH-008 | Behavior | Android missing permission dialog and return URL reload. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:240 symbol=permission_missing] | LT-008 | MAP-004, MAP-014 | BarcodeScannerErrorState.tsx | COVERED |
| BEH-009 | Behavior | Android cancel returns without result. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:29 symbol=cancel_listener] | LT-009 | MAP-002, MAP-020 | BarcodeScannerScreen.tsx | COVERED |
| BEH-010 | Behavior | Android non-empty scan dedupes and returns result. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:77 symbol=handleCode] | LT-010, LT-014 | MAP-006, MAP-007, MAP-015 | useBarcodeScanner.ts | COVERED |
| BEH-011 | Behavior | Android processor forwards raw barcode value. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:71 symbol=onSuccess] | LT-011 | MAP-006 | barcodeScannerService.ts | COVERED |
| BEH-012 | Behavior | Android hardware back is consumed. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:41 symbol=OnBackPressedCallback] | LT-021 | MAP-002, MAP-020 | BarcodeScannerScreen.tsx | COVERED |
| BEH-013 | Behavior | Android invalid login redirects to login. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:65 symbol=onResume] | LT-012 | MAP-002, MAP-009 | BarcodeScannerScreen.tsx | COVERED |
| BEH-014 | Behavior | Android active scanner uses unconstrained ML Kit options. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:47 symbol=initialize] | LT-003 | MAP-006, MAP-017 | barcodeScannerService.ts | COVERED |
| STATE-001 | State | iOS capture starts running. | [ios: Source/ScannerViewController.swift:46 symbol=viewWillAppear] | LT-003 | MAP-006, MAP-013 | useBarcodeScanner.ts | COVERED |
| STATE-002 | State | iOS valid scan stops capture. | [ios: Source/ArticleScannerViewController.swift:78 symbol=stop_scanner] | LT-004 | MAP-006, MAP-013 | useBarcodeScanner.ts | COVERED |
| STATE-003 | State | iOS error OK restarts capture. | [ios: Source/ArticleScannerViewController.swift:116 symbol=restartCapture] | LT-005 | MAP-006, MAP-013 | useBarcodeScanner.ts | COVERED |
| STATE-004 | State | Android permission granted binds camera use cases. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:146 symbol=requestCameraPermission] | LT-013, LT-015 | MAP-006, MAP-014 | useCameraPermission.ts | COVERED |
| STATE-005 | State | Android pause/destroy stops processor. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:131 symbol=onPause] | LT-009, LT-015 | MAP-006, MAP-013 | useBarcodeScanner.ts | COVERED |
| STATE-006 | State | Android scannedCode dedupe state. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:79 symbol=dedupe] | LT-010 | MAP-015 | useBarcodeScanner.ts | COVERED |
| STATE-007 | State | Android WebView hidden on scanner/login/about URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:269 symbol=visibility_check] | LT-007 | MAP-016 | WebViewScreen.tsx | COVERED |
| STOR-001 | Storage | iOS reads login preference. | [ios: Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] | LT-002 | MAP-009 | session storage service | COVERED |
| STOR-002 | Storage | Android reads login preference. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] | LT-012 | MAP-009 | session storage service | COVERED |
| STOR-003 | Storage | Android writes login-valid true after camera permission. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:148 symbol=isBarcodeScanner] | LT-013 | MAP-010, MAP-019 | session storage service | COVERED |
| STOR-004 | Storage | Scanned value remains transient. | [ios: Source/ArticleScannerViewController.swift:95 symbol=codeValue]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:83 symbol=scannedCode] | LT-004, LT-010, LT-017 | MAP-011 | none | COVERED |
| API-001 | API | No direct native HTTP call; returns via WebView URL. | [ios: Source/ArticleScannerViewController.swift:145 symbol=prepare]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=handleCode] | LT-014 | MAP-012 | WebViewScreen.tsx | COVERED |
| NAV-001 | Navigation | iOS WebView to ArticleScanner. | [ios: Source/WebsiteViewController.swift:232 symbol=performSegue_ARTICLE_SCANNER] | LT-001 | MAP-001 | barcodeScannerUrl.ts | COVERED |
| NAV-002 | Navigation | iOS ArticleScanner returns to WebView. | [ios: Source/ArticleScannerViewController.swift:47 symbol=openWebview] | LT-004, LT-006 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| NAV-003 | Navigation | iOS ArticleScanner returns to login. | [ios: Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] | LT-002 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| NAV-004 | Navigation | Android WebView to BarcodeScannerActivity. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:235 symbol=permission_granted] | LT-007 | MAP-001 | WebViewScreen.tsx | COVERED |
| NAV-005 | Navigation | Android BarcodeScannerActivity returns to WebView. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=result_to_webview] | LT-009, LT-010 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| NAV-006 | Navigation | Android BarcodeScannerActivity to LoginActivity. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=login_guard] | LT-012 | MAP-002 | BarcodeScannerScreen.tsx | COVERED |
| ERRPATH-001 | Error Path | iOS no video capture device logs and returns. | [ios: Source/ScannerViewController.swift:80 symbol=captureDevice_guard] | LT-015 | MAP-008, MAP-018 | BarcodeScannerErrorState.tsx | COVERED |
| ERRPATH-002 | Error Path | iOS capture setup exception logs and returns. | [ios: Source/ScannerViewController.swift:100 symbol=capture_setup_catch] | LT-015 | MAP-008, MAP-018 | BarcodeScannerErrorState.tsx | COVERED |
| ERRPATH-003 | Error Path | iOS no scan content error. | [ios: Source/ArticleScannerViewController.swift:88 symbol=stringValue_guard] | LT-005 | MAP-004 | BarcodeScannerErrorState.tsx | COVERED |
| ERRPATH-004 | Error Path | iOS unsupported metadata error. | [ios: Source/ArticleScannerViewController.swift:99 symbol=unsupported_type_else] | LT-005 | MAP-004, MAP-017 | BarcodeScannerErrorState.tsx | COVERED |
| ERRPATH-005 | Error Path | Android WebView no camera permission. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:240 symbol=permission_missing] | LT-008, LT-015 | MAP-004, MAP-014, MAP-018 | useCameraPermission.ts | COVERED |
| ERRPATH-006 | Error Path | Android scanner base no camera permission. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:152 symbol=permission_missing] | LT-015 | MAP-004, MAP-014, MAP-018 | useCameraPermission.ts | COVERED |
| ERRPATH-007 | Error Path | Android processor construction fails. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:256 symbol=processor_try] | LT-018 | MAP-004, MAP-008 | barcodeScannerService.ts | COVERED |
| ERRPATH-008 | Error Path | Android ML Kit processing exception. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:297 symbol=processImageProxy] | LT-019 | MAP-004, MAP-008 | barcodeScannerService.ts | COVERED |
| ERRPATH-009 | Error Path | Android processor detection failure logs. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:86 symbol=onFailure] | LT-020 | MAP-008 | barcodeScannerService.ts | COVERED |
| DEP-001 | Dependency | iOS AVFoundation. | [ios: Source/ScannerViewController.swift:10 symbol=import_AVFoundation] | LT-015 | MAP-006 | scanner dependency adapter | COVERED |
| DEP-002 | Dependency | iOS UIKit UI/haptic/alerts. | [ios: Source/ArticleScannerViewController.swift:10 symbol=import_UIKit] | LT-005 | MAP-002, MAP-004 | RN components | COVERED |
| DEP-003 | Dependency | Android ML Kit barcode-scanning. | [android: app/build.gradle:147 symbol=mlkit_dependency] | LT-011, LT-015 | MAP-006, MAP-021 | scanner dependency adapter | COVERED |
| DEP-004 | Dependency | Android CameraX. | [android: app/build.gradle:154 symbol=camerax_dependency] | LT-013, LT-015 | MAP-006, MAP-021 | scanner dependency adapter | COVERED |
| DEP-005 | Dependency | Android lifecycle/ViewModel provider. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:108 symbol=ViewModelProvider] | LT-013 | MAP-006 | RN hook lifecycle | COVERED |
| DEP-006 | Dependency | RN lacks barcode scanner dependency. | [rn: package.json:14 symbol=dependencies] | LT-015 | MAP-021 | package.json | COVERED |
| UI-001 | UI | iOS title label. | [ios: Source/ArticleScannerViewController.swift:31 symbol=lblDescription] | LT-003 | MAP-003 | BarcodeScannerScreen.tsx | COVERED |
| UI-002 | UI | iOS preview and bars. | [ios: Source/ScannerViewController.swift:106 symbol=videoPreviewLayer] | LT-015 | MAP-003 | BarcodeScannerScreen.tsx | COVERED |
| UI-003 | UI | iOS error alert. | [ios: Source/ArticleScannerViewController.swift:112 symbol=UIAlertController] | LT-005 | MAP-004 | BarcodeScannerErrorState.tsx | COVERED |
| UI-004 | UI | Android scanner title text. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:27 symbol=explanation_setText] | LT-008 | MAP-003 | BarcodeScannerScreen.tsx | COVERED |
| UI-005 | UI | Android preview/overlay/cancel layout. | [android: app/src/main/res/layout/activity_scanner_base.xml:12 symbol=preview_view] | LT-009, LT-015 | MAP-003 | BarcodeScannerScreen.tsx | COVERED |
| UI-006 | UI | Android result container visible after code. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:327 symbol=cleanUp] | LT-010 | MAP-003 | BarcodeScannerScreen.tsx | COVERED |
| SEC-001 | Security | iOS camera usage description. | [ios: Info.plist:32 symbol=NSCameraUsageDescription] | LT-015 | MAP-014, MAP-018 | app config | COVERED |
| SEC-002 | Security | Android camera permission and features. | [android: app/src/main/AndroidManifest.xml:5 symbol=camera_feature] | LT-007, LT-015 | MAP-014, MAP-018 | app config | COVERED |
| SEC-003 | Security | Scan value is appended to URL. | [ios: Source/ArticleScannerViewController.swift:149 symbol=SCAN_RESULT_append]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=SCAN_RESULT_append] | LT-004, LT-010, LT-017 | MAP-007, MAP-011, MAP-012 | barcodeResultUrl.ts | COVERED |
| SEC-004 | Security | Return URL may use HTTP according to preference. | [android: app/src/main/AndroidManifest.xml:24 symbol=usesCleartextTraffic] | LT-014 | MAP-007, MAP-012 | barcodeResultUrl.ts | COVERED |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| DEP-001, DEP-003, DEP-004 | Real camera/scanner recognition cannot be proven by unit tests. | No | Add Phase-5 device validation with EAN-8, EAN-13 and Code128 samples. |
| SEC-001, SEC-002 | System permission prompts require platform runtime validation. | No | Add Phase-5 manual/device permission checklist. |
| MAP-021 | Exact RN scanner dependency is not selected in Phase 1. | No | Phase 3 must choose and document a maintained Expo-compatible scanner package. |

## Self-Validation (VAL-P1)

| Rule | Result |
|---|---|
| VAL-P1-01 | PASS — iOS + Android durchsucht |
| VAL-P1-02 | PASS — API mit N/A; STOR vollständig |
| VAL-P1-03 | PASS — Execution Contract für Phase 2–5 |
| VAL-P1-04 | PASS — alle P1-A12 IDs in Matrix |
| VAL-GEN-02 | PASS — Legacy-Quellen gesetzt |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
