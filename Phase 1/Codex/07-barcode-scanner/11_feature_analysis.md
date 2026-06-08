# Feature Analysis

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | barcode-scanner | prompt |
| User feature name | barcode-scanner | prompt |
| In scope | Native barcode/article scanner opened from WebView `barcodescanner` URLs, camera permission handling, scan detection, scan-result URL return, cancel/back behavior, RN migration surface. | [ios: Source/WebsiteViewController.swift:225 symbol=webView(_:decidePolicyFor:decisionHandler:)]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| Out of scope | QR-code settings scanner, login form migration, generic WebView rendering, legacy commented Google-Vision `BarcodeCaptureActivity` implementation. | [ios: Source/QrCodeScannerViewController.swift:11 symbol=QrCodeScannerViewController]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeCaptureActivity.java:15 symbol=commented_file] |
| Open blockers | None for Phase 2-5 fachliches Discovery; implementation still requires RN scanner dependency choice and native permission setup. | [rn: package.json:14 symbol=dependencies] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | `barcode`, `barcodescanner`, `ArticleScanner`, `ScannerViewController`, `EAN`, `code128`, `ScanResult`, `NSCameraUsageDescription` | 10 | 7 | Relevant path is WebView-triggered article scanning; QR scanner files are adjacent but out of scope. |
| Android | `barcode`, `BarcodeScannerActivity`, `ScannerBaseActivity`, `BarcodeScannerProcessor`, `CameraX`, `MLKit`, `ScanResult`, `CAMERA`, `scan_barcode_title` | 17 | 10 | Active barcode flow uses CameraX plus ML Kit; old `BarcodeCaptureActivity` is fully commented and manifest entries are commented. |
| RN target | `barcode`, `scanner`, `scan`, package dependencies, Jest config | 3 | 3 | RN app is a placeholder with no barcode scanner dependency yet. |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | Source/WebsiteViewController.swift | WebsiteViewController | Detects `barcodescanner` URLs, constructs the return URL and segues into the article scanner. | [ios: Source/WebsiteViewController.swift:225 symbol=webView(_:decidePolicyFor:decisionHandler:)] |
| IOS-FILE-002 | iOS | Source/ArticleScannerViewController.swift | ArticleScannerViewController | Barcode scanner screen, login guard, scan success/error handling and return to WebView. | [ios: Source/ArticleScannerViewController.swift:12 symbol=ArticleScannerViewController] |
| IOS-FILE-003 | iOS | Source/ScannerViewController.swift | ScannerViewController | Shared AVFoundation camera session setup and supported GTIN code types. | [ios: Source/ScannerViewController.swift:27 symbol=captureSession] |
| IOS-FILE-004 | iOS | Source/Utils/AppSettings.swift | AppSettings | Defines scanner URL prefix and scan-result query suffix. | [ios: Source/Utils/AppSettings.swift:23 symbol=BARCODESCANNER] |
| IOS-FILE-005 | iOS | Source/Utils/Messages.swift | Messages | Defines barcode title and scan-error text. | [ios: Source/Utils/Messages.swift:9 symbol=barcodeScannerTitle] |
| IOS-FILE-006 | iOS | Info.plist | NSCameraUsageDescription | Declares camera usage for QR-code and barcode recognition. | [ios: Info.plist:32 symbol=NSCameraUsageDescription] |
| IOS-FILE-007 | iOS | Source/Base.lproj/Main.storyboard | ARTICLE_SCANNER/BACK_TO_WEBVIEW | Wires WebView to ArticleScanner and unwind return. | [ios: Source/Base.lproj/Main.storyboard:505 symbol=ARTICLE_SCANNER] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | WebviewActivity | Detects `barcodescanner` URLs, builds return URL, checks permission, starts scanner. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java | BarcodeScannerActivity | Active barcode screen handling title, cancel, login guard, scan result return. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:14 symbol=BarcodeScannerActivity] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java | ScannerBaseActivity | CameraX preview/analysis, permission dialog, ML Kit processor lifecycle. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:40 symbol=ScannerBaseActivity] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java | BarcodeScannerProcessor | ML Kit barcode detection and raw value forwarding. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:20 symbol=BarcodeScannerProcessor] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/ExchangeScannedData.java | ExchangeScannedData | Callback interface for detected scan values. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/ExchangeScannedData.java:3 symbol=ExchangeScannedData] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | App | Defines scanner constants and scan-result suffix used by WebView/scanner. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:31 symbol=URL] |
| AND-FILE-007 | Android | app/src/main/AndroidManifest.xml | AndroidManifest | Declares camera permission and active BarcodeScannerActivity. | [android: app/src/main/AndroidManifest.xml:8 symbol=CAMERA_permission] |
| AND-FILE-008 | Android | app/src/main/res/layout/activity_scanner_base.xml | activity_scanner_base | Defines scanner preview, overlay, explanation and cancel UI. | [android: app/src/main/res/layout/activity_scanner_base.xml:12 symbol=preview_view] |
| AND-FILE-009 | Android | app/src/main/res/values/strings.xml | strings | Defines scanner title and camera-permission text. | [android: app/src/main/res/values/strings.xml:12 symbol=no_camera_permission] |
| AND-FILE-010 | Android | app/build.gradle | dependencies | Declares ML Kit barcode scanning and CameraX dependencies. | [android: app/build.gradle:147 symbol=dependencies] |
| RN-FILE-001 | RN | package.json | dependencies/scripts | RN currently has WebView/Jest dependencies but no scanner dependency. | [rn: package.json:14 symbol=dependencies] |
| RN-FILE-002 | RN | App.tsx | App | RN app currently renders only `PlaceholderScreen`. | [rn: App.tsx:3 symbol=App] |
| RN-FILE-003 | RN | jest.config.js | jest config | RN test command and test discovery are available via Jest. | [rn: jest.config.js:1 symbol=module.exports] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BND-001 | WebView-triggered barcode scanner from URLs like `barcodescanner://server/path` | In | Both platforms intercept URLs starting with the scanner prefix. | [ios: Source/WebsiteViewController.swift:225 symbol=webView(_:decidePolicyFor:decisionHandler:)]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| BND-002 | EAN-8, EAN-13 and Code128 on iOS | In | iOS GTIN scanner supports those AV metadata object types. | [ios: Source/ScannerViewController.swift:30 symbol=supportedCodeTypesGTIN] |
| BND-003 | ML Kit barcode formats on Android | In | Active Android scanner builds an unconstrained ML Kit `BarcodeScannerOptions` in `BarcodeScannerActivity`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:47 symbol=initialize] |
| BND-004 | QR-code settings scanner | Out | It is a separate settings-flow controller and uses QR-specific messages. | [ios: Source/QrCodeScannerViewController.swift:11 symbol=QrCodeScannerViewController] |
| BND-005 | Old Google Play Services Vision capture path | Out | The activity source and manifest registration are commented out. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeCaptureActivity.java:15 symbol=commented_file]; [android: app/src/main/AndroidManifest.xml:71 symbol=commented_BarcodeCaptureActivity] |
| BND-006 | WebView server login/session behavior | Out | It can route to login but is part of WebView/login migration, not barcode scanning. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:262 symbol=onPageFinished] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Trigger | WKWebView cancels scanner URL and performs `ARTICLE_SCANNER` segue. | WebView waits for `onPageFinished`, then starts `BarcodeScannerActivity`. | Different | RN should centralize scanner URL interception but allow async permission gating before navigation. |
| Return URL | Uses configured HTTP/HTTPS scheme plus URL after `://`, then appends `&ScanResult=` on success. | Uses configured HTTP/HTTPS scheme plus URL after `://`, then appends `&ScanResult=` on success. | Same | RN should implement one URL transform and one result append helper. |
| Supported formats | EAN-8, EAN-13, Code128 only. | Active ML Kit options are unconstrained, so all ML Kit-supported barcode formats can be returned. | Different | RN decision: preserve iOS-compatible product barcode formats unless product confirms Android's wider acceptance. |
| Permission failure | Info.plist declares camera use; runtime failure is not explicitly handled in scanner code. | WebView checks permission before opening scanner and shows a blocking dialog if missing. | Different | RN must implement explicit permission request/error state for both platforms. |
| Login guard | Article scanner returns to login when login preference is invalid. | Barcode scanner returns to login when login preference is invalid; base also writes login-valid true after permission grant for scanner. | Different | RN must define scanner behavior when session/login is invalid and avoid Android-only login-state mutation unless needed. |
