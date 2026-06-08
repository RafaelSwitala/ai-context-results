# Feature Analysis

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | qr-code-scanner | prompt |
| User feature name | qr-code-scanner | prompt |
| In scope | Kamera-Scanner für PRESTIGEenterprise-QR-Codes vom Settings-Screen, QR-Erkennung, URL-Normalisierung (`?`), Validierung, Fehlerdialog, Cancel/Back, Rückgabe des gescannten Payloads an Settings, Parser/Settings-DTO (`QRCodeParser`, `QRCodeSettings`) | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:89 symbol=handleCode] |
| Out of scope | Artikel-/Barcode-Scanner in der WebView (`ArticleScannerViewController`, `BarcodeScannerActivity`), Legacy `QRCodeCaptureActivity` (Manifest auskommentiert), Settings-Speichern/Erreichbarkeits-Check nach QR-Prefill, Login/PIN-Gates | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:12 symbol=ArticleScannerViewController] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:1 symbol=BarcodeScannerActivity] [android: app/src/main/AndroidManifest.xml:83 symbol=QRCodeCaptureActivity] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:87 symbol=QRCodeParser.parse] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:115 symbol=isUrlValid] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | QrCode, QRCode, Scanner, QRCODE_SCANNER, AVFoundation, QRCodeParser, startQRCodeScanner | 24 | 9 | Kern: `QrCodeScannerViewController` + Basis `ScannerViewController`; Settings-Unwind für Ergebnis |
| Android | QRCodeScanner, qrcode_scanner, ML Kit, ScannerBase, display_qrcode, QRCodeParser | 38 | 9 | Aktiv: `QRCodeScannerActivity`; `QRCodeCaptureActivity` nur als toter Legacy-Code |

## Irrelevant Hits (Out of Scope)

| Platform | Path | Reason |
|---|---|---|
| iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | Barcode/GTIN für WebView-Artikel, nicht Settings-QR |
| iOS | MobileBrowserV2/Source/WebsiteViewController.swift (`ARTICLE_SCANNER`) | Deep-Link Barcodescanner-Flow |
| Android | BarcodeScannerActivity.java | WebView-Barcode-Flow |
| Android | QRCodeCaptureActivity.java | Nicht mehr im Manifest registriert (auskommentiert) |
| iOS/Android | UIColorExtensions / generische „scanner“-Strings | Kein QR-Feature |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/QrCodeScannerViewController.swift | `metadataOutput` | QR-Scan-Logik, Validierung, Navigation zurück | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/ScannerViewController.swift | `startCapture` | Kamera/AVCapture-Basis für QR | [ios: MobileBrowserV2/Source/ScannerViewController.swift:75 symbol=startCapture] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/QRCodeParser.swift | `parse` | Query-Parameter → Settings-DTO | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/QRCodeSettings.swift | `isValid` | Validierungsregeln für QR-Payload | [ios: MobileBrowserV2/Source/Utils/QRCodeSettings.swift:19 symbol=isValid] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `startQRCodeScanner` / `unwindToSettings` | Entry + Ergebnisübernahme | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:128 symbol=startQRCodeScanner] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/Utils/Messages.swift | `qrcodeScannerExplanation` | UI-Texte Scanner/Fehler | [ios: MobileBrowserV2/Source/Utils/Messages.swift:10 symbol=qrcodeScannerExplanation] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | `QRCODE_SCANNER` | Segue Settings → Scanner | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:366 symbol=QRCODE_SCANNER] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Source/Extensions/URLExtensions.swift | `queryParameters` | Parser-Hilfe für Query-Strings | [ios: MobileBrowserV2/Source/Extensions/URLExtensions.swift:19 symbol=queryParameters] |
| IOS-FILE-009 | iOS | MobileBrowserV2/Info.plist | `NSCameraUsageDescription` | Kamera-Berechtigungstext | [ios: MobileBrowserV2/Info.plist:33 symbol=NSCameraUsageDescription] |
| AND-FILE-001 | Android | app/src/main/java/.../QRCodeScannerActivity.java | `handleCode` | QR-Format, Validierung, Result | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:89 symbol=handleCode] |
| AND-FILE-002 | Android | app/src/main/java/.../ScannerBaseActivity.java | `bindAnalysisUseCase` | CameraX + ML Kit Pipeline | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:247 symbol=bindAnalysisUseCase] |
| AND-FILE-003 | Android | app/src/main/java/.../utility/QRCodeParser.java | `parse` | Query-Parameter inkl. culture | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |
| AND-FILE-004 | Android | app/src/main/java/.../utility/QRCodeSettings.java | `isValid` | Vollständige Payload-Validierung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeSettings.java:7 symbol=isValid] |
| AND-FILE-005 | Android | app/src/main/java/.../SettingsActivity.java | `onActivityResult` | Start Scanner + Prefill | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:159 symbol=displayQRCode] |
| AND-FILE-006 | Android | app/src/main/res/layout/activity_scanner_base.xml | `preview_view` | Scanner-UI-Layout | [android: app/src/main/res/layout/activity_scanner_base.xml:1 symbol=activity_scanner_base] |
| AND-FILE-007 | Android | app/src/main/res/layout/activity_settings.xml | `display_qrcode` | QR-Button auf Settings | [android: app/src/main/res/layout/activity_settings.xml:205 symbol=display_qrcode] |
| AND-FILE-008 | Android | app/src/main/res/values/strings.xml | `qrcode_scanner_title` | Lokalisierbare Scanner-Texte | [android: app/src/main/res/values/strings.xml:23 symbol=qrcode_scanner_title] |
| AND-FILE-009 | Android | app/src/main/java/.../barcodescanner/BarcodeScannerProcessor.java | `processImageProxy` | ML Kit Barcode-Erkennung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:1 symbol=BarcodeScannerProcessor] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Settings-QR-Scanner UI + Kamera | In | Kernfeature | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:17 symbol=viewDidLoad] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:27 symbol=onCreate] |
| FB-002 | QR-Payload-Validierung im Scanner | In | Gate vor Rückgabe | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:87 symbol=isValid] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:105 symbol=isUrlValid] |
| FB-003 | Rückgabe an Settings (Intent/Segue) | In | Übergabe des Roh-URL-Strings | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:206 symbol=unwindToSettings] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:201 symbol=onActivityResult] |
| FB-004 | Settings-Feld-Prefill + Speichern | Out | Gehört Feature `settings` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:210 symbol=fillControlsFromQRCode] [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:246 symbol=initViews] |
| FB-005 | WebView-Barcode/Artikel-Scanner | Out | Separater Use Case | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:12 symbol=ArticleScannerViewController] |
| FB-006 | Legacy QRCodeCaptureActivity | Out | Manifest-Eintrag auskommentiert | [android: app/src/main/AndroidManifest.xml:83 symbol=QRCodeCaptureActivity] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Scanner-Technologie | AVFoundation `AVCaptureMetadataOutput` (nur QR) | CameraX + ML Kit `FORMAT_QR_CODE` | Different | RN: einheitliche Kamera/Barcode-Library (z. B. expo-camera + Parser) |
| Validierung im Scanner | `QRCodeSettings.isValid()` (p=MB, v=1, server) | Nur `p=MB` in `isUrlValid` | Different | RN: strikte Validierung wie iOS + Settings-Gate wie Android |
| URL ohne `?` | Prefix `http://localhost?` | Gleich | Same | RN: gleiche Normalisierung |
| Ergebnis an Settings | Unwind + `codeValue`; `initViews` ohne `isValid`-Gate | `RESULT_OK` + Extra; Prefill nur wenn `isValid` | Different | RN: einheitliches Prefill nur bei vollständig gültigem QR |
| Cancel/Back | Cancel stoppt Session + `dismiss`; Hardware-Back nicht blockiert | Cancel + Back disabled via `OnBackPressedCallback` | Different | RN: explizite Cancel-UX, Back-Verhalten festlegen |
| Culture aus QR | nicht im iOS-Parser | `culture` in Android-Parser + Locale-Save | Different | RN: optional culture (siehe settings-Divergenz) |
| Kamera ohne Permission | Implizit über AVFoundation (kein dedizierter Dialog in Scanner-Basis) | Dialog `no_camera_permission` + `finish` | Different | RN: Permission-Flow vor Scanner-Start |
| Fehler nach Invalid QR | Alert + `restartCapture` | Alert + `restartImageProcessor` | Same (semantisch) | RN: Retry-Scan nach OK |
