# Feature Analysis

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/settings/codex/20260603-1411-codex-settings/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-03T14:11:00+02:00 |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | settings | prompt |
| User feature name | settings | prompt |
| In scope | Settings UI, initial settings routing, PIN gate before opening settings, QR-code import into settings, validation, settings persistence, config-file bootstrap on Android, connectivity check before accepting settings, and Android language/protocol variants. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:13 symbol=SettingsViewController], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:32 symbol=SettingsActivity] |
| Out of scope | Login credential validation, WebView behavior after login, barcode scanning after WebView, license cleanup, and scanner implementation internals are only referenced where they affect settings entry or persisted settings values. | [ios: MobileBrowserV2/Source/LoginViewController.swift:106 symbol=LoginButtonTouchUp], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:105 symbol=showWebView] |
| Open blockers | No Phase-1 blocker found; iOS/Android settings behavior differs and is captured as platform divergence for later RN decisions. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:25 symbol=httpsProtocol], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:78 symbol=onCreate] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | settings, SettingsViewController, PreferencesUtils, hasValidSettings, QRCODE_SCANNER, PINCODE, QRCodeParser, mb_server_key, buildCheckAccessUrl | 13 | 9 | Settings is implemented by a storyboard-backed `SettingsViewController`, persisted through `PreferencesUtils`, opened from login, and populated by QR-code parsing. [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:13 symbol=SettingsViewController] |
| Android | settings, SettingsActivity, PreferencesUtils, preference_server_key, spinner_protocol, spinner_language, QRCodeParser, ConfigFileLoader, hasValidSettings, PinActivity | 19 | 13 | Settings is implemented as `SettingsActivity`, persisted through default SharedPreferences, can be bootstrapped from `config.json`, and includes Android-only language and `HTTPS ohne Validierung` choices. [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:78 symbol=onCreate] |
| React Native | settings, preference, config, AsyncStorage, SecureStore | 2 | 2 | RN has dependencies suitable for storage and WebView but currently renders only a placeholder screen. [rn: rn-e-mobilebrowser/package.json:14 symbol=dependencies], [rn: rn-e-mobilebrowser/App.tsx:3 symbol=App] |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | SettingsViewController | Main iOS settings screen: loads values, validates, checks URL, saves settings, handles QR scanner unwind, and displays errors. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:13 symbol=SettingsViewController] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | SettingsView | Declares iOS Settings scene fields, HTTPS switch, save/cancel buttons, and QR scanner toolbar entry. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:157 symbol=SettingsView] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/PreferncesUtils.swift | PreferencesUtils | Stores settings keys and values in UserDefaults, including server, client, token, PIN, protocol, and validity flags. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:17 symbol=Keys] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | buildCheckAccessUrl | Builds the default page URL used to verify settings before saving. | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:50 symbol=buildCheckAccessUrl] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/LoginViewController.swift | openSettingsButtonTapped | Opens settings at startup when no valid settings exist and routes through PIN when a PIN is stored. | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/Utils/QRCodeParser.swift | QRCodeParser.parse | Parses QR-code query parameters into settings fields. | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/Utils/QRCodeSettings.swift | QRCodeSettings | Defines QR-code settings fields and validity constraints for protocol `MB` and version `1`. | [ios: MobileBrowserV2/Source/Utils/QRCodeSettings.swift:8 symbol=QRCodeSettings] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Source/Utils/Messages.swift | Messages | Provides settings error and wrong-PIN messages. | [ios: MobileBrowserV2/Source/Utils/Messages.swift:20 symbol=loginErrorGeneric] |
| IOS-FILE-009 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | HttpProtocolEnum | Defines iOS HTTP/HTTPS enum and URL path constants consumed by settings validation. | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:10 symbol=HttpProtocolEnum] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | SettingsActivity | Main Android settings screen: loads values, protocol/language spinners, validation, URL check, save, cancel, and QR import. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:32 symbol=SettingsActivity] |
| AND-FILE-002 | Android | app/src/main/res/layout/activity_settings.xml | activity_settings | Declares Android settings UI fields, spinners, save/cancel buttons, and QR scanner toolbar entry. | [android: app/src/main/res/layout/activity_settings.xml:42 symbol=server] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | PreferencesUtils | Stores settings in default SharedPreferences, builds settings-derived URLs, locale, and config version. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:8 symbol=PreferencesUtils] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | LoginActivity | Opens settings at startup or by settings icon, optionally routing through PIN. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java | PinActivity | Enforces stored 4-digit PIN before opening settings. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java | QRCodeParser.parse | Parses QR-code query parameters including culture and protocol. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeSettings.java | QRCodeSettings | Validates QR-code settings as server plus protocol `MB` plus version `1`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeSettings.java:5 symbol=QRCodeSettings] |
| AND-FILE-008 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/Settings.java | Settings | Base settings model for QR-code and config-file settings. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/Settings.java:4 symbol=Settings] |
| AND-FILE-009 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java | ConfigFileLoader | Loads `config.json`, maps it to settings, and enables config-file bootstrap. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:14 symbol=loadConfigFileSettings] |
| AND-FILE-010 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | App.updateSettingsOnVersionChanged | Updates persisted settings from config file when config version changes. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |
| AND-FILE-011 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java | HttpStatusUtil | Performs settings connectivity check and classifies HTTP status results. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java:22 symbol=getHttpStatus] |
| AND-FILE-012 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HostAccessCallableAsync.java | HostAccessCallableAsync | Uses normal or unsafe OkHttp client based on the persisted protocol mode. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HostAccessCallableAsync.java:20 symbol=client] |
| AND-FILE-013 | Android | app/src/main/AndroidManifest.xml | SettingsActivity declaration | Declares SettingsActivity, LoginActivity, PinActivity, QRCodeScannerActivity, and network permissions. | [android: app/src/main/AndroidManifest.xml:35 symbol=SettingsActivity] |
| RN-FILE-001 | RN | rn-e-mobilebrowser/package.json | dependencies | RN already includes AsyncStorage, SecureStore, navigation, WebView, Jest, and Expo scripts relevant to migration. | [rn: rn-e-mobilebrowser/package.json:14 symbol=dependencies] |
| RN-FILE-002 | RN | rn-e-mobilebrowser/App.tsx | App | RN app currently renders only `PlaceholderScreen`; settings implementation is not present. | [rn: rn-e-mobilebrowser/App.tsx:3 symbol=App] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-SET-001 | Settings screen fields and persistence | In | The screen reads and writes server, client, protocol, token, PIN, and Android locale. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:58 symbol=viewDidLoad], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:92 symbol=onCreate] |
| BOUND-SET-002 | Connectivity check before saving | In | Both platforms build a default page URL and accept settings only after successful access. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:155 symbol=saveTouched], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:127 symbol=onClick] |
| BOUND-SET-003 | QR-code scanner implementation | Out | Settings consumes scanner results, but camera capture and QR recognition are separate scanner behavior. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:201 symbol=unwindToSettings], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:198 symbol=onActivityResult] |
| BOUND-SET-004 | PIN gate before settings | In | PIN controls whether settings can be opened from login. | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |
| BOUND-SET-005 | Login request and WebView session | Out | Login and WebView consume persisted settings but have their own feature behavior. | [ios: MobileBrowserV2/Source/LoginViewController.swift:120 symbol=LoginButtonTouchUp], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:90 symbol=onCreate] |
| BOUND-SET-006 | Android config-file bootstrap | In | Android updates settings from `config.json` when config version changes. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence | Source |
|---|---|---|---|---|---|
| Stored core fields | server, client, token, PIN, HTTP protocol, valid settings flag. | server, client, token, PIN, protocol, valid settings flag, locale, current config version. | Different | RN must support the shared core fields and decide to carry Android locale/config behavior as cross-platform behavior. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:21 symbol=Keys], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=PreferencesUtils] |
| Protocol choices | Binary HTTPS switch; saved enum raw values are HTTP `0` or HTTPS `1`. | Spinner with HTTPS `1`, HTTPS without validation `2`, HTTP `0`. | Different | RN must model protocol as an enum, not a boolean, if Android parity is required. | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:10 symbol=HttpProtocolEnum], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:10 symbol=PROTOCOL_HTTP] |
| QR-code import | Parses server, mandant, https, token, PIN and fills controls without checking `QRCodeSettings.isValid()` in SettingsViewController. | Parses server, mandant, https, token, PIN, culture and fills controls only when `QRCodeSettings.isValid()` passes. | Different | RN must choose Android's stricter QR validation or intentionally reproduce iOS leniency. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:201 symbol=unwindToSettings], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:210 symbol=fillControlsFromQRCode] |
| Language | No settings language control in iOS settings. | Settings and login include a language spinner and append `Culture` to login URLs. | Different | RN migration should include locale as product-level behavior if Android parity is prioritized. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:169 symbol=SettingsView], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:165 symbol=fillSpinnerLanguage] |
| Connectivity validation | Alamofire GET with `Cache-Control: no-cache`; accepts only status code 200. | OkHttp host-access check; accepts any 2xx status. | Different | RN settings service must define accepted HTTP status behavior explicitly. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:164 symbol=saveTouched], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java:157 symbol=isOkHttpStatusCode] |
| Cancel behavior | Cancel is hidden when no valid settings exist; otherwise dismisses modal. | Cancel is hidden when no saved preferences exist; otherwise goes back. | Different | RN must distinguish "valid settings" from "any saved preferences" or select one rule. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:95 symbol=viewDidLoad], [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:105 symbol=onCreate] |
