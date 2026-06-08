# Feature Analysis

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T17:57:20+02:00 |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | navigation | prompt; [ai-context: features/feature-list.md:3 symbol=navigation] |
| User feature name | navigation | prompt |
| In scope | Screen graph, explicit segues/intents, WebView-triggered scanner routes, settings/PIN guards, logout/login returns, scanner cancel/success returns, Android hardware-back overrides and menu navigation. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW]; [android: app/src/main/AndroidManifest.xml:57 symbol=LoginActivity] |
| Out of scope | Validation internals, credential persistence internals, QR/barcode recognition algorithms, settings form field semantics and license document content except where they decide or receive navigation. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:257 symbol=isValid]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:35 symbol=webView] |
| Open blockers | No blockers for later phases; RN currently renders only `PlaceholderScreen`, while `@react-navigation/native` and `react-native-webview` are available dependencies. | [rn: App.tsx:1 symbol=PlaceholderScreen]; [rn: package.json:16 symbol=@react-navigation/native]; [rn: package.json:24 symbol=react-native-webview] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | navigation, segue, performSegue, prepare, unwind, dismiss, WebView, Settings, PINCODE, QRCODE_SCANNER, ARTICLE_SCANNER, BACK_TO_LOGIN, BACK_TO_WEBVIEW, barcodescanner, login.aspx | 13 | 9 | iOS navigation is storyboard/segue based with modal presentations, child WebView embedding, unwind segues and WKWebView delegate decisions. [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW]; [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor] |
| Android | startActivity, Intent, parentActivityName, onBackPressed, onActivityResult, WebviewActivity, SettingsActivity, PinActivity, QRCodeScannerActivity, BarcodeScannerActivity, LicenseActivity, App.URL, menu | 22 | 12 | Android navigation is Activity/Intent based with manifest parent activities, explicit extras, toolbar menus and overridden back behavior. [android: app/src/main/AndroidManifest.xml:35 symbol=SettingsActivity]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:308 symbol=initToolbars] |
| RN | react-navigation, WebView, PlaceholderScreen, package.json | 4 | 2 | RN has navigation and WebView dependencies, but no real navigator/screens yet. [rn: package.json:16 symbol=@react-navigation/native]; [rn: App.tsx:3 symbol=App] |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | Storyboard scenes/segues | Declares Login, Settings, WebView wrapper, WebView, ArticleScanner, QR scanner and PIN navigation edges. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/LoginViewController.swift | LoginViewController | Starts Settings/PIN/WebView and handles PIN unwind to Settings. | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | SettingsViewController | Starts QR scanner, dismisses on cancel/save success and receives QR unwind. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:128 symbol=startQRCodeScanner] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/QrCodeScannerViewController.swift | QrCodeScannerViewController | Returns valid QR data to Settings or dismisses on cancel. | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:33 symbol=openSettings] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/PinCodeViewController.swift | PinCodeViewController | Returns to Login unwind on correct PIN; dismisses on cancel. | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:74 symbol=didFinishedEnterCode] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/WebsiteWrapperViewController.swift | WebsiteWrapperViewController | Embeds WebsiteViewController and restores it after article scanner unwind. | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:39 symbol=showWebview] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | WebsiteViewController | Loads WebView URL, handles menu logout, foreground checks, barcode scheme and login-page returns. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:31 symbol=barButtonTouched] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | ArticleScannerViewController | Returns to WebView with optional `ScanResult` or to Login when login state is invalid. | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:47 symbol=openWebview] |
| IOS-FILE-009 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | AppSettings | Defines shared route constants for barcode scheme, login URL and scan result query. | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:21 symbol=AppSettings] |
| AND-FILE-001 | Android | app/src/main/AndroidManifest.xml | manifest activities | Declares launcher, parent activities and exported settings/login route metadata. | [android: app/src/main/AndroidManifest.xml:35 symbol=SettingsActivity] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | App constants/logout | Defines intent URL key and route constants; logout clears valid login. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:31 symbol=URL] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | LoginActivity | Launcher flow to Settings/PIN/WebView/License and back-button behavior. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:44 symbol=onCreate] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | SettingsActivity | Starts QR scanner for result, saves back to Login and cancels through back dispatcher. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:109 symbol=save.onClick] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java | QRCodeScannerActivity | Returns QR result to Settings or cancelled result on cancel; hardware back disabled. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:27 symbol=onCreate] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java | PinActivity | Opens Settings on correct PIN; exit/back finish PIN activity. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | WebviewActivity | Loads current URL, redirects on empty/error/login/barcode URLs, handles toolbar logout/close and disables back. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:73 symbol=onCreate] |
| AND-FILE-008 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java | BarcodeScannerActivity | Returns to WebView on cancel or scan and redirects to Login when login state is invalid. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:22 symbol=onCreate] |
| AND-FILE-009 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java | LicenseActivity | License target launched from Login popup. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:19 symbol=onCreate] |
| AND-FILE-010 | Android | app/src/main/res/menu/menu.xml | WebView toolbar menu | Declares logout and close-app WebView actions. | [android: app/src/main/res/menu/menu.xml:7 symbol=action_logged_out] |
| AND-FILE-011 | Android | app/src/main/res/menu/login_activity_menu.xml | Login popup menu | Declares license action. | [android: app/src/main/res/menu/login_activity_menu.xml:5 symbol=action_licenses] |
| AND-FILE-012 | Android | app/src/main/res/layout/activity_webview.xml | activity_webview | Provides WebView and bottom toolbar IDs consumed by WebviewActivity. | [android: app/src/main/res/layout/activity_webview.xml:17 symbol=webView] |
| RN-FILE-001 | RN | package.json | dependencies/scripts | Existing RN navigation, WebView and Jest dependencies. | [rn: package.json:16 symbol=@react-navigation/native]; [rn: package.json:24 symbol=react-native-webview]; [rn: package.json:10 symbol=test] |
| RN-FILE-002 | RN | App.tsx | App | Current RN app has no navigator and renders PlaceholderScreen. | [rn: App.tsx:1 symbol=PlaceholderScreen] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | Native screen graph and route names | In | Both platforms encode route names or Activity classes as the primary navigation contract. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:145 symbol=WEBVIEW]; [android: app/src/main/AndroidManifest.xml:57 symbol=LoginActivity] |
| BOUND-002 | WebView URL loading and WebView-triggered routes | In | WebView delegates decide scanner, login return and error navigation. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=BARCODESCANNER]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| BOUND-003 | Settings and PIN guards | In | Login routes to PIN or Settings based on stored PIN/settings validity. | [ios: MobileBrowserV2/Source/LoginViewController.swift:92 symbol=openSettingsButtonTapped]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| BOUND-004 | Scanner recognition internals | Dependency | Scanner result decides navigation, but camera frame processing is scanner feature scope. | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:55 symbol=sendScannedCode] |
| BOUND-005 | Login/settings business validation | Dependency | Validation gates navigation, but validation logic belongs to login/settings/storage-config features. | [ios: MobileBrowserV2/Source/LoginViewController.swift:193 symbol=isValid]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:252 symbol=isValid] |
| BOUND-006 | License content | Out | Navigation only launches LicenseActivity; license HTML rendering content is not a route decision. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:226 symbol=showMenu]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:35 symbol=webView] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Navigation mechanism | Storyboard modal segues and unwind segues. | Explicit Activities, Intents and `onActivityResult`. | Different. | RN should centralize route names in a typed navigator and model return payloads explicitly. |
| Login to Settings/PIN | `openSettingsButtonTapped` uses PINCODE when PIN exists, SETTINGS otherwise. | `LoginActivity` starts PinActivity when PIN exists, SettingsActivity otherwise. | Same decision, different transport. | RN settings guard should check the same settings/PIN facts. |
| WebView container | Login opens WebsiteWrapper; wrapper embeds WebsiteView child. | Login starts WebviewActivity directly with `App.URL`. | Different. | RN can use a single WebView route; wrapper behavior maps to route param ownership. |
| Barcode route | WebView detects `barcodescanner` URL and opens ArticleScanner with return URL. | WebView detects `barcodescanner` URL and starts BarcodeScannerActivity with return URL if camera permission is granted. | Same trigger, Android has permission branch. | RN must include permission denied fallback that loads return URL or documents a platform decision. |
| Back behavior | iOS uses explicit cancel buttons/dismiss/unwind; system back is not central. | Login moves task to back, WebView no-ops back, scanner backs are disabled, PIN back exits. | Different. | RN BackHandler behavior must be screen-specific on Android. |
| Logout navigation | WebView menu sets valid-login false and unwinds/finishes to Login. | Toolbar logout calls App.logout and finishes WebviewActivity. | Similar. | RN logout should clear state and reset navigation to Login. |
