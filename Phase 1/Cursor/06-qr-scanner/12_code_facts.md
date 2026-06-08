# Code Facts

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `startQRCodeScanner` | Tap QR-Button in Settings-Toolbar | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:128 symbol=startQRCodeScanner] |
| EP-002 | Android | app/src/main/java/.../SettingsActivity.java | `displayQRCode` onClick | Tap `display_qrcode` ImageView | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:159 symbol=displayQRCode] |
| EP-003 | iOS | MobileBrowserV2/Source/QrCodeScannerViewController.swift | `viewDidLoad` | Scanner-Screen erscheint | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:17 symbol=viewDidLoad] |
| EP-004 | Android | app/src/main/java/.../QRCodeScannerActivity.java | `onCreate` | `QRCodeScannerActivity` gestartet | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:27 symbol=onCreate] |
| EP-005 | iOS | MobileBrowserV2/Source/QrCodeScannerViewController.swift | `metadataOutput` | AVFoundation liefert erkannten Code | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput] |
| EP-006 | Android | app/src/main/java/.../QRCodeScannerActivity.java | `sendScannedCode` → `handleCode` | ML Kit liefert String über `ExchangeScannedData` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:55 symbol=sendScannedCode] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | Cross | Settings öffnet dedizierten QR-Scanner-Screen | User tap auf QR-Icon | Präsentation Scanner | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:132 symbol=performSegue] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:160 symbol=startActivityForResult] |
| BEH-002 | Cross | Scanner akzeptiert nur QR-Format | Kamera-Frame | Nur `.qr` bzw. `FORMAT_QR_CODE` | [ios: MobileBrowserV2/Source/ScannerViewController.swift:30 symbol=supportedCodeTypesQR] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:50 symbol=setBarcodeFormats] |
| BEH-003 | Cross | Payload ohne `?` wird zu Query-URL normalisiert | Rohstring z. B. `p=MB&v=1&...` | `http://localhost?` + Payload | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:83 symbol=metadataOutput] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:101 symbol=handleCode] |
| BEH-004 | iOS | Gültiger QR muss `QRCodeParser.parse(...).isValid()` erfüllen | Normalisierte URL | `codeValue` gesetzt, Navigation zurück | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:87 symbol=isValid] |
| BEH-005 | Android | Gültiger QR im Scanner wenn Query-Parameter `p` gleich `MB` | Normalisierte URL | `RESULT_OK` + Extra `qrcode` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:115 symbol=isUrlValid] |
| BEH-006 | iOS | Bei ungültigem QR: Fehlerdialog, Scan wird neu gestartet | Ungültiger Payload | Alert + `restartCapture` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:106 symbol=showErrorMessage] |
| BEH-007 | Android | Bei ungültigem QR: Fehlerdialog, Image-Processor neu gebunden | Ungültiger Payload | Alert + `restartImageProcessor` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:68 symbol=showErrorDialog] |
| BEH-008 | iOS | Erfolgreicher Scan: Haptic Success, Capture stoppt auf Background-Queue | Gültiger QR | `openSettings()` Segue | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:62 symbol=notificationOccurred] |
| BEH-009 | Android | Doppel-Scan desselben Codes wird ignoriert | Gleicher `code` wie `scannedCode` | early return | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:91 symbol=handleCode] |
| BEH-010 | iOS | Settings übernimmt gescannten String und parst Felder ohne erneute `isValid`-Prüfung | `codeValue` nach Unwind | `initViews(settings)` | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:209 symbol=unwindToSettings] |
| BEH-011 | Android | Settings prefilled nur wenn `QRCodeSettings.isValid()` nach Parse | Extra `qrcode` | `fillControlsFromQRCode` oder keine UI-Änderung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:211 symbol=fillControlsFromQRCode] |
| BEH-012 | Cross | Cancel beendet Scanner ohne Ergebnis | Cancel-Tap | iOS: `dismiss` + stop capture; Android: `RESULT_CANCELED` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:123 symbol=backButtonTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:32 symbol=cancel] |
| BEH-013 | Android | System-Back während Scan ist deaktiviert | Back press | `handleOnBackPressed` no-op | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:42 symbol=OnBackPressedCallback] |
| BEH-014 | Cross | Erklärungstext wird beim Start gesetzt | Screen load | Label `qrcode_scanner_title` / `Messages.qrcodeScannerExplanation` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:23 symbol=lblDescription] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:30 symbol=explanation] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | `codeValue=nil` | gültiger Scan | `codeValue=url` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:92 symbol=codeValue] |
| STATE-002 | Android | `scannedCode=""` | neuer Code | `scannedCode=code` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:95 symbol=scannedCode] |
| STATE-003 | iOS | capture running | gültiger/ungültiger Scan | capture stopped (background) | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:67 symbol=stopRunning] |
| STATE-004 | Android | processor active | `stopImageProcessor` vor Result/Error | processor stopped | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:97 symbol=stopImageProcessor] |
| STATE-005 | Android | processor stopped | OK auf Fehlerdialog | `restartImageProcessor` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:77 symbol=restartImageProcessor] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | N/A | — | — | — | Scanner persistiert selbst nicht; Settings-Persistenz gehört Feature `settings` — [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:92 symbol=codeValue] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:107 symbol=putExtra] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | N/A | — | — | — | — | Kein Netzwerk im QR-Scanner-Flow — [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:89 symbol=handleCode] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | Settings | QrCodeScanner (modal) | Segue `QRCODE_SCANNER` | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:132 symbol=performSegue] |
| NAV-002 | iOS | QrCodeScanner | Settings | Segue `BACK_TO_SETTINGS` nach gültigem Scan | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:37 symbol=openSettings] |
| NAV-003 | Android | Settings | QRCodeScannerActivity | `startActivityForResult` RC 9011 | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:161 symbol=startActivityForResult] |
| NAV-004 | Android | QRCodeScannerActivity | Settings (finish) | `RESULT_OK` mit Extra | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:109 symbol=finish] |
| NAV-005 | Cross | Scanner | vorheriger Screen | Cancel | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:135 symbol=dismiss] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:40 symbol=finish] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | `metadataObj.stringValue` nil | `showErrorMessage("No Content")` | Alert + Restart | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:74 symbol=showErrorMessage] |
| ERRPATH-002 | iOS | Parser `isValid()` false | `showErrorMessage("Wrong Code")` | Alert `qrcodeScannerInvalidCode` + Restart | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:87 symbol=showErrorMessage] |
| ERRPATH-003 | iOS | Nicht-QR Metadata-Typ | Haptic error + `showErrorMessage("Invalid code")` | Alert + Restart | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:99 symbol=showErrorMessage] |
| ERRPATH-004 | Android | `isUrlValid` false | `showErrorDialog` | Alert `qrcode_scanner_invalid_code` + Restart | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:111 symbol=showErrorDialog] |
| ERRPATH-005 | Android | Kamera-Permission nicht erteilt | Dialog `no_camera_permission` + `finish` | Scanner schließt | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:154 symbol=requestCameraPermission] |
| ERRPATH-006 | Android | `MlKitException` in Analyzer | Toast mit Message | Scan unterbrochen, kein Result | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:299 symbol=processImageProxy] |
| ERRPATH-007 | iOS | Kein Capture-Device | `NSLog` + return aus `startCapture` | Kein Preview/Scan | [ios: MobileBrowserV2/Source/ScannerViewController.swift:80 symbol=startCapture] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | AVFoundation (`AVCaptureSession`, `AVCaptureMetadataOutput`) | Kamera + QR-Erkennung | RN vision-camera / expo-camera + barcode API | [ios: MobileBrowserV2/Source/ScannerViewController.swift:8 symbol=import AVFoundation] |
| DEP-002 | Android | CameraX (`ProcessCameraProvider`, `ImageAnalysis`) | Kamera-Pipeline | RN camera module | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:22 symbol=ProcessCameraProvider] |
| DEP-003 | Android | ML Kit `com.google.mlkit:barcode-scanning` | QR decode | RN ML Kit wrapper oder expo-barcode-scanner | [android: app/build.gradle:152 symbol=barcode-scanning] |
| DEP-004 | Android | `BarcodeScannerProcessor` | Frame-Analyse | RN native module abstraction | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:257 symbol=BarcodeScannerProcessor] |
| DEP-005 | Cross | `QRCodeParser` / `QRCodeSettings` | Payload-Struktur und Validierung | Shared TS `qrCodeParser.ts` | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | `lblDescription` | Zeigt `Messages.qrcodeScannerExplanation` (`<br/>` → Zeilenumbruch) | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:23 symbol=lblDescription] |
| UI-002 | iOS | Cancel `backButtonTouched` | Stoppt Session, schließt modal | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:123 symbol=backButtonTouched] |
| UI-003 | Android | `explanation` TextView | `R.string.qrcode_scanner_title` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:30 symbol=explanation] |
| UI-004 | Android | `R.id.cancel` | Disabled nach Tap, stop + `RESULT_CANCELED` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:32 symbol=cancel] |
| UI-005 | Android | `display_qrcode` auf Settings | Icon startet Scanner | [android: app/src/main/res/layout/activity_settings.xml:205 symbol=display_qrcode] |
| UI-006 | iOS | Toolbar QR `startQRCodeScanner` | Storyboard-Image `outline_qr_code_scanner_white` | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:326 symbol=startQRCodeScanner] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Kamera-Feed + QR-Inhalt (server, token, pin in URL) | `NSCameraUsageDescription` in Info.plist; Token/PIN nur im Speicher bis Settings-Übernahme | Runtime camera permission + keine Logs von QR payload | [ios: MobileBrowserV2/Info.plist:33 symbol=NSCameraUsageDescription] |
| SEC-002 | Android | Kamera-Feed + QR-Inhalt | `CAMERA` permission check vor Bind; sensitive Query-Parameter | Permission gate + secure handling in Settings layer | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:146 symbol=CAMERA] |
| SEC-003 | Cross | QR enthält `token` und optional `pin` | Legacy: Klartext in URL-String bis Settings-Form | RN: Parser output direkt in secure fields, nicht in Analytics | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:32 symbol=Token] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:43 symbol=getQueryParameter] |
