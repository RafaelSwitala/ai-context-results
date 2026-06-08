# Code Facts

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | `decidePolicyFor` | WebView navigiert zu URL mit Prefix `barcodescanner` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] |
| EP-002 | Android | app/src/main/java/.../WebviewActivity.java | `onPageFinished` | Geladene URL startet mit `barcodescanner` und enthält `://` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| EP-003 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | `viewDidLoad` | Nach Segue `ARTICLE_SCANNER` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:26 symbol=viewDidLoad] |
| EP-004 | Android | app/src/main/java/.../BarcodeScannerActivity.java | `onCreate` | Intent mit Extra `App.URL` (= responseUrl) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:22 symbol=onCreate] |
| EP-005 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | `metadataOutput` | AVFoundation Barcode erkannt | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:60 symbol=metadataOutput] |
| EP-006 | Android | app/src/main/java/.../BarcodeScannerActivity.java | `sendScannedCode` | ML Kit liefert raw value | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:52 symbol=sendScannedCode] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | Cross | Web-App löst Scanner via Custom-URL-Scheme aus | URL `barcodescanner…` | Scanner-Screen mit `responseUrl` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:230 symbol=responseUrl] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:233 symbol=returnUrl] |
| BEH-002 | Cross | Scheme wird in http(s)-URL für Rückkehr umgeschrieben | `barcodescanner://path…` | `http(s)://path…` per Login-Protokoll | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:229 symbol=scheme] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:232 symbol=protocol] |
| BEH-003 | Cross | Scanner startet nur bei gültigem Login | `hasValidLogin` false | Redirect Login, kein Capture | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] |
| BEH-004 | iOS | Akzeptiert EAN8, EAN13, Code128 | Metadata-Typ in GTIN-Liste | Erfolg → `codeValue`, `openWebview` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:74 symbol=supportedCodeTypesGTIN] |
| BEH-005 | Android | ML Kit mit Default-Options (keine Format-Einschränkung in Activity) | Beliebiger erkannten Barcode-String | `handleCode` baut WebView-URL | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:48 symbol=initialize] |
| BEH-006 | Cross | Erfolg: WebView lädt `responseUrl + &ScanResult= + code` | responseUrl, barcode string | Neue WebView-URL | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:149 symbol=SCAN_RESULT] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=SCAN_RESULT] |
| BEH-007 | iOS | Ungültiger Barcode-Typ zeigt Fehler und restart | Nicht-GTIN Typ | Alert `Messages.scanError` + `restartCapture` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:104 symbol=showErrorMessage] |
| BEH-008 | Android | Kein Invalid-Type-Fehlerdialog im BarcodeScannerActivity | — | Jeder ML-Kit-Treffer wird verarbeitet | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:77 symbol=handleCode] |
| BEH-009 | Cross | Cancel kehrt zur WebView ohne ScanResult zurück | Cancel-Tap | URL = `responseUrl` allein | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:138 symbol=openWebview] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:36 symbol=cancel] |
| BEH-010 | Android | Doppel-Scan gleichen Codes ignorieren | `code == scannedCode` | return | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:79 symbol=handleCode] |
| BEH-011 | Android | Bei fehlender Kamera-Permission: Dialog, WebView lädt returnUrl | Permission denied | Kein Scanner-Start | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:241 symbol=no_camera_permission] |
| BEH-012 | Android | Vor Barcode-Scan: `saveValidLoginPreference(true)` wenn Kamera ok | BarcodeScanner + permission granted | Login-Flag true (Logout-Workaround) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:149 symbol=saveValidLoginPreference] |
| BEH-013 | iOS | Erfolg: Haptic Success, Capture stop (background queue) | Gültiger GTIN | Navigation WebView | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:76 symbol=notificationOccurred] |
| BEH-014 | Cross | Erklärungstext „Barcode scannen“ | Screen load | Label gesetzt | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:31 symbol=barcodeScannerTitle] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:27 symbol=scan_barcode_title] |
| BEH-015 | Android | System-Back während Scan deaktiviert | Back press | no-op | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:41 symbol=OnBackPressedCallback] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | `codeValue=nil` | erfolgreicher GTIN-Scan | `codeValue=string` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:95 symbol=codeValue] |
| STATE-002 | Android | `scannedCode=""` | neuer Code | `scannedCode=code` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:83 symbol=scannedCode] |
| STATE-003 | iOS | capture running | Scan/Cancel | capture stopped | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:81 symbol=stopRunning] |
| STATE-004 | Android | processor active | `stopImageProcessor` | processor stopped | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:85 symbol=stopImageProcessor] |
| STATE-005 | iOS | `redirectUrl` gesetzt | Segue ARTICLE_SCANNER | Scanner kennt Rückgabe-Basis-URL | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:167 symbol=redirectUrl] |
| STATE-006 | Android | Intent extra `App.URL` | onCreate | `responseUrl` gesetzt | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:25 symbol=responseUrl] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | Android | `preference_valid_login_key` (via PreferencesUtils) | W | Bool `true` | Workaround beim Barcode-Scanner-Kamera-Start — [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:149 symbol=saveValidLoginPreference] |
| STOR-002 | Cross | Login-Flag lesen | R | Bool Gate | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=hasValidLoginPreference] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | N/A | — | — | — | — | Kein HTTP im Scanner; WebView lädt result URL — [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:42 symbol=load] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:87 symbol=startActivity] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | WebView | ArticleScanner | URL prefix `barcodescanner` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:233 symbol=ARTICLE_SCANNER] |
| NAV-002 | iOS | ArticleScanner | WebView (Wrapper) | Erfolg oder Cancel (`BACK_TO_WEBVIEW`) | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:51 symbol=BACK_TO_WEBVIEW] |
| NAV-003 | iOS | ArticleScanner | Login | `!hasValidLogin` in viewDidLoad | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:35 symbol=BACK_TO_LOGIN] |
| NAV-004 | Android | WebviewActivity | BarcodeScannerActivity | barcodescanner URL + camera granted | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:237 symbol=startActivity] |
| NAV-005 | Android | BarcodeScannerActivity | WebviewActivity | Scan success oder Cancel | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=startActivity] |
| NAV-006 | Android | BarcodeScannerActivity | LoginActivity | `!hasValidLogin` onResume | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:69 symbol=LoginActivity] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | `stringValue` nil bei GTIN-Typ | `showErrorMessage("No Content")` | Alert + Restart | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:90 symbol=showErrorMessage] |
| ERRPATH-002 | iOS | Metadata-Typ nicht in GTIN-Liste | Haptic error + `showErrorMessage("Invalid code")` | Alert `scanError` + Restart | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:104 symbol=showErrorMessage] |
| ERRPATH-003 | Android | Keine Kamera-Permission vor Scanner | Dialog, `webView.loadUrl(returnUrl)` | Scanner nicht gestartet | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:241 symbol=loadUrl] |
| ERRPATH-004 | Android | `MlKitException` in Analyzer | Toast | Scan unterbrochen | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:299 symbol=processImageProxy] |
| ERRPATH-005 | Android | Kamera-Permission denied in ScannerBase | Dialog + `finish` | Scanner schließt | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:154 symbol=requestCameraPermission] |
| ERRPATH-006 | iOS | Kein Capture-Device | NSLog + return | Kein Scan | [ios: MobileBrowserV2/Source/ScannerViewController.swift:80 symbol=startCapture] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | AVFoundation | Barcode-Erkennung | RN camera + barcode module | [ios: MobileBrowserV2/Source/ScannerViewController.swift:8 symbol=import AVFoundation] |
| DEP-002 | Android | CameraX + ML Kit barcode-scanning | Kamera + Decode | RN vision-camera / expo-camera | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:257 symbol=BarcodeScannerProcessor] |
| DEP-003 | Android | `BarcodeScannerProcessor` | Frame → String | Shared scanner service | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/barcodescanner/BarcodeScannerProcessor.java:66 symbol=detectInImage] |
| DEP-004 | Cross | WKWebView navigation delegate | Trigger-Intercept | RN WebView `onShouldStartLoadWithRequest` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor] |
| DEP-005 | Cross | Android WebViewClient | Trigger in onPageFinished | RN WebView navigation hook | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:213 symbol=onPageFinished] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | `lblDescription` | Text `Messages.barcodeScannerTitle` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:31 symbol=lblDescription] |
| UI-002 | iOS | Cancel `backButtonTouched` | Stop capture, `openWebview` ohne Code | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:126 symbol=backButtonTouched] |
| UI-003 | Android | `explanation` | `R.string.scan_barcode_title` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:27 symbol=explanation] |
| UI-004 | Android | `R.id.cancel` | Zurück zu Webview mit responseUrl | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:29 symbol=cancel] |
| UI-005 | Android | WebView visibility | GONE wenn URL barcodescanner/login/about:blank | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:270 symbol=setVisibility] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | Cross | Kamera-Feed | Permission + Usage Description | Runtime permission vor Scan | [ios: MobileBrowserV2/Info.plist:33 symbol=NSCameraUsageDescription] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:235 symbol=CAMERA] |
| SEC-002 | Cross | Barcode-Wert in URL-Query | Im Klartext an Web-App übergeben | Kein Logging von ScanResult in Analytics | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:26 symbol=SCAN_RESULT] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:35 symbol=SCAN_RESULT] |
| SEC-003 | Android | Login-Flag Manipulation während Scan | `saveValidLoginPreference(true)` | RN: Session-Handling ohne Flag-Hack | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerBaseActivity.java:149 symbol=saveValidLoginPreference] |
