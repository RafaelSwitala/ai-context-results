# Feature Analysis

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | navigation | prompt |
| User feature name | navigation | prompt |
| In scope | Screen-/Activity-Wechsel, Storyboard-Segues, Android-Intents, Unwind/Back-Stack, WebView-URL-getriggerte Navigation, PIN/Settings-Gates | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] [android: app/src/main/AndroidManifest.xml:57 symbol=LoginActivity] |
| Out of scope | WebView-Inhaltsrendering, Scanner-Erkennungslogik, API-Authentifizierung selbst | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/RequestUtils.java:1 symbol=RequestUtils] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/LoginViewController.swift:155 symbol=WEBVIEW] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=onClick] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | segue, performSegue, unwind, storyboard, navigation, dismiss, instantiateViewController, child view | 12 | 8 | Navigation über `Main.storyboard` + programmatisches Child-Embedding |
| Android | startActivity, Intent, finish, parentActivityName, onBackPressed, LAUNCHER | 38 | 9 | Activity-Stack mit Manifest-Einstieg `LoginActivity` |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | segue identifiers | Definiert alle Storyboard-Routen (WEBVIEW, SETTINGS, PINCODE, etc.) | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `performSegue` / `prepare` | Login-Hub zu WebView, Settings, PIN | [ios: MobileBrowserV2/Source/LoginViewController.swift:95 symbol=performSegue] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/WebsiteWrapperViewController.swift | `showWebview` / `ackAddChildView` | Container lädt WebView per Child-VC | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:42 symbol=showWebview] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | `performSegue` / `decidePolicyFor` | Logout, Barcode-Route, Login-Redirect aus WebView | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:45 symbol=performSegue] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `performSegue` / `dismiss` | Settings zu QR-Scanner und zurück | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:132 symbol=performSegue] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/PinCodeViewController.swift | `BACK_TO_LOGIN` | PIN-Flow zurück zu Login/Settings | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:80 symbol=performSegue] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | `BACK_TO_WEBVIEW` | Scanner-Rückkehr mit ScanResult-URL | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:51 symbol=openWebview] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Source/Extensions/UIViewControllerExtensions.swift | `ackAddChildView` | Programmatische View-Hierarchie für WebView | [ios: MobileBrowserV2/Source/Extensions/UIViewControllerExtensions.swift:14 symbol=ackAddChildView] |
| AND-FILE-001 | Android | app/src/main/AndroidManifest.xml | activity declarations | Launcher, parent activities, export flags | [android: app/src/main/AndroidManifest.xml:57 symbol=LoginActivity] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `startActivity` | Hub Login -> WebView/Settings/PIN/License | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:121 symbol=startActivity] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | `startActivity` / `finish` | WebView-Navigation inkl. Logout und Login-URL-Redirects | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:222 symbol=startActivity] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | `startActivity` | Settings -> Login nach Save, QR-Scanner for result | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:144 symbol=startActivity] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java | `openSettings` | PIN success -> SettingsActivity | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java | `handleCode` | Scanner -> Webview mit ScanResult | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=handleCode] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java | `finish` + result Intent | QR-Scanner Rückgabe an Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:106 symbol=finish] |
| AND-FILE-008 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/MyExceptionHandler.java | crash recovery | Globaler Fallback auf LoginActivity | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/MyExceptionHandler.java:28 symbol=registerActivity] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Storyboard-Segue-Routen | In | Primäres iOS-Navigationsmodell | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] |
| FB-002 | Activity-Intent-Routen | In | Primäres Android-Navigationsmodell | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=startActivity] |
| FB-003 | WebView-URL-getriggerte Navigation | In | Barcode- und Login-Redirects steuern Screen-Wechsel | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| FB-004 | Navigation-Parameter (URL, ScanResult) | In | Übergabe zwischen Screens | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:149 symbol=prepare] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:88 symbol=putExtra] |
| FB-005 | Deep-Linking von außerhalb der App | Out | Kein universeller Deep-Link-Einstieg im Manifest sichtbar | [android: app/src/main/AndroidManifest.xml:65 symbol=intent-filter] |
| FB-006 | React Navigation Stack-Konfiguration | Out | RN-Implementierung gehört zu späteren Phasen | [P1-A14: MAP-001] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Navigations-Mechanismus | UIStoryboard Segues + Child VC | Explicit `Intent` zwischen Activities | Different | RN braucht zentralen Router (z. B. React Navigation) mit Route-Map |
| Einstiegspunkt | Storyboard initial VC (Login) | `LoginActivity` als LAUNCHER | Same intent | RN Root-Route = Login |
| WebView-Container | Wrapper + Child `WebsiteViewController` | Single `WebviewActivity` | Different | RN kann einen WebView-Screen mit nested layout abbilden |
| Back-Verhalten | Unwind segues / dismiss | `finish()` + deaktivierter Back in WebView/Scanner | Different | RN muss Hardware-Back und Logout explizit modellieren |
| Session-Guard Navigation | `hasValidLogin` prüft vor Scanner/Foreground | `onResume`/`onCreate` prüft Flag und redirected | Same intent | RN Navigation Guards auf Auth-State |
