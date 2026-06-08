# Code Facts

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `performSegue("WEBVIEW")` | Erfolgreicher Login | [ios: MobileBrowserV2/Source/LoginViewController.swift:155 symbol=LoginButtonTouchUp] |
| EP-002 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `performSegue("SETTINGS"/"PINCODE")` | Settings-Icon oder invalid settings | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| EP-003 | Android | app/src/main/AndroidManifest.xml | LAUNCHER intent | App-Start | [android: app/src/main/AndroidManifest.xml:67 symbol=MAIN] |
| EP-004 | Android | LoginActivity.java | `startActivity(WebviewActivity)` | Login-Button Erfolg | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=onClick] |
| EP-005 | Android | LoginActivity.java | `startActivity(Settings/Pin)` | invalid settings bei onCreate/settings tap | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:121 symbol=onCreate] |
| EP-006 | iOS | WebsiteViewController.swift | `performSegue("ARTICLE_SCANNER")` | WebView URL startet mit barcodescanner | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:233 symbol=decidePolicyFor] |
| EP-007 | Android | WebviewActivity.java | `startActivity(BarcodeScannerActivity)` | onPageFinished erkennt barcodescanner URL | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:237 symbol=onPageFinished] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Login navigiert modal per Segue zu WebView/Settings/PIN | segue identifier | Ziel-ViewController wird präsentiert | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] |
| BEH-002 | Android | Login navigiert per Intent zu WebView/Settings/PIN/License | target Activity class | neuer Activity auf Stack | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=startActivity] |
| BEH-003 | iOS | WebsiteWrapper bettet WebView als Child ein | storyboard id `WebView`, url property | Child VC in Container-Hierarchie | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:42 symbol=showWebview] |
| BEH-004 | Cross | Ungültige Session leitet zurück zu Login | `hasValidLogin=false` | Navigation zu Login-Screen | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:145 symbol=applicationWillEnterForeground] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:351 symbol=onResume] |
| BEH-005 | Cross | Barcode-URL öffnet Scanner und kehrt mit ScanResult zur WebView zurück | barcodescanner URL, scan code | WebView lädt URL inkl. `&ScanResult=` | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:149 symbol=prepare] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=putExtra] |
| BEH-006 | iOS | Logout-Menü in WebView navigiert zurück zu Login | Toolbar action Abmelden | `BACK_TO_LOGIN` unwind nach Session delete | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:41 symbol=barButtonTouched] |
| BEH-007 | Android | WebView Toolbar logout schließt Activity und kehrt zu Login | menu `action_logged_out` | `App.logout()` + `finish()` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:318 symbol=onMenuItemClick] |
| BEH-008 | Android | Hardware-Back ist in WebView und BarcodeScanner deaktiviert | onBackPressed | keine Navigation | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:357 symbol=onBackPressed] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | Cross | authenticated web session | logout action / login URL detected | login screen route | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:254 symbol=didFinish] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:263 symbol=onPageFinished] |
| STATE-002 | Cross | any screen with login guard | `hasValidLogin=false` on resume/foreground | forced navigation to login | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=viewDidLoad] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=onResume] |
| STATE-003 | Android | WebviewActivity active | empty URL at onCreate | LoginActivity started | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:96 symbol=onCreate] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | Cross | Navigation payload `url` (segue property / Intent extra `App.URL`) | W (pass), R (destination) | String URL | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:18 symbol=url] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:90 symbol=getIntent] |
| STOR-002 | Cross | `hasValidLogin` preference flag | R (guard) | Bool gate for navigation | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:145 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:351 symbol=hasValidLoginPreference] |
| STOR-003 | N/A | N/A | N/A | N/A | Kein separates Navigation-State-Store außer URL-Parametern und Auth-Flags; Routing erfolgt imperativ im UI-Code |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | N/A | N/A | N/A | N/A | N/A | Navigation wird nicht über dedizierte Nav-API gesteuert; Netzwerk nur indirekt über WebView-Loads |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | LoginViewController | WebsiteWrapperViewController | segue `WEBVIEW` nach Login-Erfolg | [ios: MobileBrowserV2/Source/LoginViewController.swift:155 symbol=performSegue] |
| NAV-002 | iOS | LoginViewController | SettingsViewController | segue `SETTINGS` ohne PIN | [ios: MobileBrowserV2/Source/LoginViewController.swift:99 symbol=performSegue] |
| NAV-003 | iOS | LoginViewController | PinCodeViewController | segue `PINCODE` wenn PIN gesetzt | [ios: MobileBrowserV2/Source/LoginViewController.swift:95 symbol=performSegue] |
| NAV-004 | iOS | PinCodeViewController | Login/Settings | unwind `BACK_TO_LOGIN`; bei Erfolg weiter `SETTINGS` | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:80 symbol=performSegue] |
| NAV-005 | iOS | SettingsViewController | QrCodeScannerViewController | segue `QRCODE_SCANNER` | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:132 symbol=performSegue] |
| NAV-006 | iOS | QrCodeScannerViewController | SettingsViewController | unwind `BACK_TO_SETTINGS` | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:37 symbol=openSettings] |
| NAV-007 | iOS | WebsiteViewController | ArticleScannerViewController | segue `ARTICLE_SCANNER` bei barcodescanner URL | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:233 symbol=performSegue] |
| NAV-008 | iOS | Website/ArticleScanner | LoginViewController | unwind `BACK_TO_LOGIN` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:256 symbol=performSegue] |
| NAV-009 | iOS | ArticleScannerViewController | WebsiteWrapperViewController | unwind `BACK_TO_WEBVIEW` mit ScanResult | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:51 symbol=openWebview] |
| NAV-010 | Android | LoginActivity | WebviewActivity | erfolgreicher Login | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=startActivity] |
| NAV-011 | Android | LoginActivity | SettingsActivity / PinActivity | invalid settings oder settings icon | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:124 symbol=startActivity] |
| NAV-012 | Android | SettingsActivity | LoginActivity | Settings save success | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:144 symbol=startActivity] |
| NAV-013 | Android | SettingsActivity | QRCodeScannerActivity | QR icon tap (for result) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:160 symbol=startActivityForResult] |
| NAV-014 | Android | PinActivity | SettingsActivity | korrekte PIN | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:175 symbol=openSettings] |
| NAV-015 | Android | WebviewActivity | BarcodeScannerActivity | barcodescanner URL + Kamera-Permission | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:237 symbol=startActivity] |
| NAV-016 | Android | BarcodeScannerActivity | WebviewActivity | Scan success oder cancel | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=startActivity] |
| NAV-017 | Android | WebviewActivity / Error dialog | LoginActivity | login URL, session expired, error OK | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:264 symbol=startActivity] |
| NAV-018 | Android | MyExceptionHandler | LoginActivity | uncaught exception recovery | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/MyExceptionHandler.java:33 symbol=startActivity] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | Android | WebView URL leer bei Start | start LoginActivity | kein WebView render | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:96 symbol=onCreate] |
| ERRPATH-002 | Android | WebView HTTP/Load Error | Error dialog -> LoginActivity | User verlässt WebView-Kontext | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:299 symbol=showErrorDialog] |
| ERRPATH-003 | Android | Kamera-Permission fehlt bei Barcode-Navigation | Dialog, lädt returnUrl im WebView | kein Scanner-Start | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:247 symbol=onPageFinished] |
| ERRPATH-004 | iOS | ArticleScanner ohne valid login | segue `BACK_TO_LOGIN` | Scanner wird nicht gestartet | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:35 symbol=viewDidLoad] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | UIStoryboard (`Main.storyboard`) | Deklarative Segue-Definitionen | RN static route config | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] |
| DEP-002 | iOS | WKWebView navigation delegate | URL-basierte Routing-Entscheidungen | RN WebView `onShouldStartLoadWithRequest` | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=WKNavigationDelegate] |
| DEP-003 | Android | Android `Intent` / Activity stack | Screen transitions | React Navigation stack | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=Intent] |
| DEP-004 | Android | `parentActivityName` in Manifest | Up-navigation metadata | RN header back behavior | [android: app/src/main/AndroidManifest.xml:41 symbol=parentActivityName] |
| DEP-005 | Cross | `PreferencesUtils.hasValidLogin` | Navigation guard | RN auth guard hook | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:145 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:351 symbol=onResume] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Settings save/cancel | `dismiss(animated:)` zurück zum Login-Kontext | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:140 symbol=cancelTouched] |
| UI-002 | Android | Login back button | `moveTaskToBack(true)` statt Activity finish | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:247 symbol=onBackPressed] |
| UI-003 | Android | WebView toolbar | `finishAffinity` schließt App, logout `finish` zurück | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:316 symbol=onMenuItemClick] |
| UI-004 | iOS | WebView toolbar | ActionSheet Abmelden triggert Login-Route | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:41 symbol=barButtonTouched] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | Cross | Login URL in Intent/Segue params | URL enthält user/password Query-Parameter | RN soll sensitive Query-Parameter nicht in Logs/History persistieren | [ios: MobileBrowserV2/Source/LoginViewController.swift:176 symbol=prepare] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:175 symbol=putExtra] |
| SEC-002 | Cross | Navigation trotz invalid session blockieren | Guards prüfen `hasValidLogin` | RN route guards auf Auth-State | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=viewDidLoad] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:68 symbol=onResume] |
