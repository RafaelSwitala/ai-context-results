# Code Facts

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `LoginButtonTouchUp` | Tap auf Anmelden | [ios: MobileBrowserV2/Source/LoginViewController.swift:106 symbol=LoginButtonTouchUp] |
| EP-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | login `onClick` | Tap auf Login Button | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:137 symbol=onClick] |
| EP-003 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `openSettingsButtonTapped` | Klick auf Settings Icon bzw. invalid settings in `viewDidLoad` | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| EP-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `onCreate` gating | Activity Start mit invalid settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| EP-005 | iOS | MobileBrowserV2/Source/AppDelegate.swift | `logout` | App geht in Background (`saveContext`) | [ios: MobileBrowserV2/Source/AppDelegate.swift:32 symbol=logout] |
| EP-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `logout` | Lifecycle `onPause` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:122 symbol=logout] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Verlangt non-empty username und password vor Login-Request | userName, password fields | spezifische Fehlermeldung pro fehlendem Feld | [ios: MobileBrowserV2/Source/LoginViewController.swift:111 symbol=LoginButtonTouchUp] |
| BEH-002 | Android | Verlangt valid settings + non-empty username für Login | settings flag, username field | Loginflow startet nur wenn `isValid()` true | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:237 symbol=isValid] |
| BEH-003 | iOS | Führt Login-HTTP Request aus und setzt Login-Flag nur bei Erfolg | login URL + response | `hasValidLogin=true`, segue WEBVIEW | [ios: MobileBrowserV2/Source/LoginViewController.swift:139 symbol=AF.request] |
| BEH-004 | Android | Persistiert encoded password und setzt Login-Flag vor WebView-Navigation | user, encodedPassword, built URL | saveLoginPreferences + startActivity(Webview) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:171 symbol=onClick] |
| BEH-005 | Cross | Leitet bei invalid settings zu Settings/PIN statt Login | hasValidSettings + pin presence | Navigation zu Settings oder PIN | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| BEH-006 | Cross | PIN muss exakt matchen, um Settings zu öffnen | entered pin, stored pin | Erfolg: Settings erreichbar, sonst Fehler/Reset | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:75 symbol=didFinishedEnterCode] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:112 symbol=onClick] |
| BEH-007 | Cross | Logout setzt valid login zurück und versucht Session Cleanup | stored token/user | `hasValidLogin=false` + optional delete session call | [ios: MobileBrowserV2/Source/AppDelegate.swift:35 symbol=logout] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:124 symbol=logout] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | `hasValidLogin=false` | erfolgreicher Login-Response ohne Error-Code | `hasValidLogin=true` | [ios: MobileBrowserV2/Source/LoginViewController.swift:151 symbol=LoginButtonTouchUp] |
| STATE-002 | Android | `hasValidLogin=false` | Login button path erfolgreich | `hasValidLogin=true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:172 symbol=onClick] |
| STATE-003 | iOS | `hasValidLogin=true/false` | App geht in Background | `hasValidLogin=false` | [ios: MobileBrowserV2/Source/AppDelegate.swift:35 symbol=logout] |
| STATE-004 | Android | `hasValidLogin=true/false` | Process `onPause` | `hasValidLogin=false` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:124 symbol=logout] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | `mb_userName_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:18 symbol=userName] |
| STOR-002 | iOS | `mb_password_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:19 symbol=password] |
| STOR-003 | iOS | `mb_valid_login_key` | RW | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:30 symbol=hasValidLogin] |
| STOR-004 | iOS | `mb_valid_settings_key` | R (Login gate) | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:29 symbol=hasValidSettings] |
| STOR-005 | iOS | `mb_pin_key` | R (Settings gate) | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:23 symbol=pin] |
| STOR-006 | Android | `preference_user_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:16 symbol=USER] |
| STOR-007 | Android | `preference_password_key` | RW | String (base64 encoded) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:17 symbol=PASSWORD] |
| STOR-008 | Android | `preference_valid_login_key` | RW | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:24 symbol=HAS_VALID_LOGIN] |
| STOR-009 | Android | `preference_valid_settings_key` | R (Login gate) | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:23 symbol=HAS_VALID_SETTINGS] |
| STOR-010 | Android | `preference_pin_key` | R (PIN gate) | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:19 symbol=PIN] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | GET | `AF.request(buildLoginUrl)` | URL mit user, optional password(base64), App parameter | HTTP status + optional `Error` query | [ios: MobileBrowserV2/Source/LoginViewController.swift:139 symbol=AF.request] |
| API-002 | Android | URL build for WebView | `PreferencesUtils.buildLoginUrl` | URL mit user, optional encodedPassword, App + Culture | URL wird an WebView übergeben | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:222 symbol=buildLoginUrl] |
| API-003 | Cross | Delete Session (logout) | `PeApiHelper.doDeleteUser` / `RequestUtils.killUserSessions` | token + user aus preferences | serverseitiger Session-Cleanup best effort | [ios: MobileBrowserV2/Source/AppDelegate.swift:38 symbol=logout] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:128 symbol=logout] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | Login | WebView | Login success ohne Error-Code | [ios: MobileBrowserV2/Source/LoginViewController.swift:155 symbol=LoginButtonTouchUp] |
| NAV-002 | Android | LoginActivity | WebviewActivity | `isValid()==true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=onClick] |
| NAV-003 | iOS | Login | Settings oder PIN | `hasValidSettings=false` bzw. PIN vorhanden | [ios: MobileBrowserV2/Source/LoginViewController.swift:92 symbol=openSettingsButtonTapped] |
| NAV-004 | Android | LoginActivity | SettingsActivity oder PinActivity | `hasValidSettings=false` + PIN-Bedingung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:119 symbol=onCreate] |
| NAV-005 | Cross | PIN screen | Settings | PIN korrekt | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:80 symbol=performSegue] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | username leer | `showErrorDialog(Messages.usernameNotFound)` | Login abgebrochen | [ios: MobileBrowserV2/Source/LoginViewController.swift:111 symbol=LoginButtonTouchUp] |
| ERRPATH-002 | iOS | password leer | `showErrorDialog(Messages.passwordNotFound)` | Login abgebrochen | [ios: MobileBrowserV2/Source/LoginViewController.swift:115 symbol=LoginButtonTouchUp] |
| ERRPATH-003 | iOS | HTTP != 200 oder buildLoginUrl nil | generic error dialog | kein Login-State-Update | [ios: MobileBrowserV2/Source/LoginViewController.swift:143 symbol=LoginButtonTouchUp] |
| ERRPATH-004 | Android | `isValid()==false` (invalid settings/username) | generic error dialog | kein Login, bleibt auf Login-Screen | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:178 symbol=onClick] |
| ERRPATH-005 | Cross | falscher PIN | Fehleranzeige + Eingabe-Reset | kein Zugriff auf Settings | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:83 symbol=didFinishedEnterCode] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:116 symbol=onClick] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | Alamofire | Login HTTP Request | RN fetch/axios | [ios: MobileBrowserV2/Source/LoginViewController.swift:8 symbol=import Alamofire] |
| DEP-002 | iOS | UserDefaults via PreferencesUtils | Credential/Flag Persistenz | RN AsyncStorage + secure store | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:34 symbol=sharedPreferences] |
| DEP-003 | Android | SharedPreferences via PreferencesUtils | Credential/Flag Persistenz | RN AsyncStorage + secure store | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:30 symbol=sharedpreferences] |
| DEP-004 | Android | App lifecycle observer | Auto-Logout bei Background | RN AppState listener | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:84 symbol=onCreate] |
| DEP-005 | Cross | Base64 utility (`StringUtils`/Swift data.base64EncodedString) | Passwortkodierung für URL oder Speicherung | RN btoa/Buffer utility | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:128 symbol=buildLoginUrl] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:142 symbol=onClick] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Login screen | Prefillt user/password aus Preferences bei `viewWillAppear` | [ios: MobileBrowserV2/Source/LoginViewController.swift:38 symbol=viewWillAppear] |
| UI-002 | Android | Login screen | Prefillt user/password (decoded) aus Preferences | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:129 symbol=onCreate] |
| UI-003 | iOS | PIN screen | Zeigt invalid-pin Text und leert Eingabe bei falscher PIN | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:67 symbol=setupUI] |
| UI-004 | Android | PIN screen | Zeigt invalid PIN rot; Exit/Delete verfügbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:116 symbol=onClick] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | password in preferences | Unverschlüsselt in UserDefaults sichtbar | RN soll sensibles Feld in secure storage speichern | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:45 symbol=password] |
| SEC-002 | Android | password base64 in preferences | Base64 ist keine kryptografische Absicherung | RN soll echte sichere Speicherung verwenden | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:109 symbol=saveLoginPreferences] |
| SEC-003 | Cross | PIN in preferences | Klartextähnliche Persistenz | RN soll PIN mindestens verschlüsselt ablegen | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:72 symbol=pin] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:63 symbol=getLoginPreferences] |
