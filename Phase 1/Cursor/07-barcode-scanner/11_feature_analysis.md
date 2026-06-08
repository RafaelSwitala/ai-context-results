# Feature Analysis

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | barcode-scanner | prompt |
| User feature name | barcode-scanner | prompt |
| In scope | WebView-Trigger `barcodescanner://…`, Kamera-Scanner für Artikel-Barcodes (EAN-8/13, Code128), Login-Gate, Scan-Ergebnis als `&ScanResult={code}` an Rückgabe-URL, Cancel zurück zur WebView, ML Kit / AVFoundation-Pipeline | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| Out of scope | Settings-QR-Scanner (`QrCodeScannerViewController`, `QRCodeScannerActivity`), Legacy `BarcodeCaptureActivity` / `QRCodeCaptureActivity` (auskommentiert), allgemeine WebView-Navigation/Login außer Scanner-Trigger | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:11 symbol=QrCodeScannerViewController] [android: app/src/main/AndroidManifest.xml:72 symbol=BarcodeCaptureActivity] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | ArticleScanner, BARCODESCANNER, ARTICLE_SCANNER, GTIN, ean13, code128, ScanResult | 22 | 8 | Kern: `ArticleScannerViewController` + WebView-Intercept |
| Android | BarcodeScannerActivity, BARCODESCANNER, scan_barcode_title, ScanResult, ML Kit | 35 | 9 | Aktiv: `BarcodeScannerActivity`; Trigger in `WebviewActivity.onPageFinished` |

## Irrelevant Hits (Out of Scope)

| Platform | Path | Reason |
|---|---|---|
| iOS | QrCodeScannerViewController.swift | Settings-QR, Feature `qr-code-scanner` |
| Android | QRCodeScannerActivity.java | Settings-QR |
| Android | BarcodeCaptureActivity.java | Gesamte Klasse block-kommentiert; Manifest auskommentiert |
| Android | BarcodeCaptureDelegate.java, BarcodeCaptureListener.java | Nur für kommentierten Vision-API-Flow |
| iOS | WebsiteViewController `fromBarcodescanner` | Wird nirgends auf `true` gesetzt (totes Flag) |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | `metadataOutput` | Barcode-Erkennung + WebView-Rückkehr | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:60 symbol=metadataOutput] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/ScannerViewController.swift | `supportedCodeTypesGTIN` | Erlaubte Symbologie EAN8/13, Code128 | [ios: MobileBrowserV2/Source/ScannerViewController.swift:32 symbol=supportedCodeTypesGTIN] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | `decidePolicyFor` | Intercept `barcodescanner://` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/WebsiteWrapperViewController.swift | `prepare` / `unwindToWebview` | URL mit ScanResult an Child-WebView | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:145 symbol=prepare] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | `BARCODESCANNER`, `SCAN_RESULT` | Scheme + Query-Suffix | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:23 symbol=BARCODESCANNER] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/Utils/Messages.swift | `barcodeScannerTitle`, `scanError` | UI-Texte | [ios: MobileBrowserV2/Source/Utils/Messages.swift:9 symbol=barcodeScannerTitle] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | `ARTICLE_SCANNER` | Segue WebView → Scanner | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:164 symbol=ARTICLE_SCANNER] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Info.plist | `NSCameraUsageDescription` | Kamera-Berechtigung | [ios: MobileBrowserV2/Info.plist:33 symbol=NSCameraUsageDescription] |
| AND-FILE-001 | Android | app/src/main/java/.../BarcodeScannerActivity.java | `handleCode` | Scan → WebView-URL bauen | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:77 symbol=handleCode] |
| AND-FILE-002 | Android | app/src/main/java/.../ScannerBaseActivity.java | `bindAnalysisUseCase` | CameraX + ML Kit | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:247 symbol=bindAnalysisUseCase] |
| AND-FILE-003 | Android | app/src/main/java/.../WebviewActivity.java | `onPageFinished` | Erkennt `barcodescanner` URL | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| AND-FILE-004 | Android | app/src/main/java/.../App.java | `BARCODESCANNER`, `SCAN_RESULT` | Konstanten | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:32 symbol=BARCODESCANNER] |
| AND-FILE-005 | Android | app/src/main/res/layout/activity_scanner_base.xml | Scanner layout | Gemeinsame Scanner-UI | [android: app/src/main/res/layout/activity_scanner_base.xml:1 symbol=activity_scanner_base] |
| AND-FILE-006 | Android | app/src/main/res/values/strings.xml | `scan_barcode_title` | Titel-String | [android: app/src/main/res/values/strings.xml:16 symbol=scan_barcode_title] |
| AND-FILE-007 | Android | app/src/main/java/.../barcodescanner/BarcodeScannerProcessor.java | `onSuccess` | ML Kit → `sendScannedCode` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:80 symbol=sendScannedCode] |
| AND-FILE-008 | Android | app/src/main/java/.../utility/PreferencesUtils.java | `saveValidLoginPreference` | Workaround gegen Logout beim Scan | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:149 symbol=saveValidLoginPreference] |
| AND-FILE-009 | Android | app/src/main/AndroidManifest.xml | `BarcodeScannerActivity` | Activity-Registrierung | [android: app/src/main/AndroidManifest.xml:107 symbol=BarcodeScannerActivity] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | WebView-URL-Intercept `barcodescanner` | In | Startet Scanner-Flow | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| FB-002 | Kamera-Scan GTIN/Barcode | In | Kernscanner | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:38 symbol=startCapture] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:48 symbol=initialize] |
| FB-003 | Ergebnis-URL `responseUrl + &ScanResult= + code` | In | Rückgabe an Web-App | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:149 symbol=prepare] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=handleCode] |
| FB-004 | Login erforderlich vor Scan | In | Gate in Scanner | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] |
| FB-005 | WebView allgemein (SSL, Session, Toolbar) | Out | Feature `webview` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:144 symbol=onReceivedSslError] |
| FB-006 | Settings-QR-Scanner | Out | Feature `qr-code-scanner` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:11 symbol=QrCodeScannerViewController] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Trigger-Timing | `decidePolicyFor` (Navigation) | `onPageFinished` (Kommentar: shouldOverride feuert nicht immer) | Different | RN WebView: einheitlicher URL-Intercept-Hook |
| URL-Rewrite | `https://` oder `http://` + Pfad nach `://` | Gleiche Logik mit `PreferencesUtils.isHttps` | Same | RN shared `buildBarcodeReturnUrl(scheme, rawUrl)` |
| Erlaubte Formate | EAN8, EAN13, Code128 | `BarcodeScannerOptions.Builder().build()` (alle Standardformate) | Different | RN: iOS-Liste oder dokumentierte Superset-Entscheidung |
| Ungültiger Typ | Alert `scanError` + Restart | Kein dedizierter Invalid-Type-Dialog | Different | RN: optional Validierung + Fehler-UI |
| Cancel | `openWebview` ohne ScanResult | WebviewActivity mit `responseUrl` only | Same (semantisch) | RN: navigate back mit Basis-URL |
| Login-Gate | Segue `BACK_TO_LOGIN` in viewDidLoad | `LoginActivity` in onResume | Same | RN: Auth-Guard vor Kamera |
| Logout-Workaround | nicht vorhanden | `saveValidLoginPreference(true)` bei Kamera für BarcodeScanner | Different | RN: AppState/session handling statt Flag-Hack |
| Back-Taste | nicht explizit blockiert | Back disabled (`OnBackPressedCallback` no-op) | Different | RN: Cancel-Button als primärer Exit |
