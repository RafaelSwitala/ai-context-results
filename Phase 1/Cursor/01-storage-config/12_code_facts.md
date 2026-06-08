# Code Facts

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `saveTouched` | Tap auf Save-Button in Settings | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:144 symbol=saveTouched] |
| EP-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | Save `onClick` | Tap auf Save-Button in Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:109 symbol=onClick] |
| EP-003 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `viewDidLoad` | Login-Screen erscheint ohne valid settings | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad] |
| EP-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `onCreate` | App-Start/Resume auf Login-Aktivität | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| EP-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `updateSettingsOnVersionChanged` | App initialisiert SharedPreferences + Config-Migration | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Speichert Settings nur nach erfolgreichem HTTP-200 Check | server, client, token, pin, protocol | persistierte Settings + `hasValidSettings=true` oder Error-Dialog | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] |
| BEH-002 | Android | Speichert Settings nur bei erfolgreichem HTTP-Status | server, client, token, pin, protocol | persistierte Settings + Navigation zu Login oder Error-Dialog | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=HttpStatusUtil.getHttpStatus] |
| BEH-003 | iOS | Erzwingt Settings-Flow wenn noch keine valid settings vorhanden sind | `hasValidSettingsPreference()` | direkte Öffnung Settings/PIN statt Login-Fortsetzung | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad] |
| BEH-004 | Android | Erzwingt Settings oder PIN wenn keine valid settings vorhanden sind | `hasValidSettingsPreference()` + `pin` | Startet `SettingsActivity` oder `PinActivity` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| BEH-005 | Android | Migriert Settings aus `config.json` bei Versionswechsel | `currentVersion`, config file | überschreibt gespeicherte Settings und markiert valid | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:89 symbol=updateSettingsOnVersionChanged] |
| BEH-006 | Cross | QR-Code befüllt Settings-Felder | QR URL (p,v,server,mandant,https,token,pin[,culture]) | UI Felder werden mit geparsten Werten befüllt | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | `hasValidSettings=false` | erfolgreicher Save in Settings | `hasValidSettings=true` | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:164 symbol=saveValidSettingsPreference] |
| STATE-002 | Android | `hasValidSettings=false` | erfolgreicher Save in Settings | `hasValidSettings=true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:117 symbol=saveValidSettingsPreference] |
| STATE-003 | iOS | `hasValidLogin=false` | erfolgreicher Login-Request | `hasValidLogin=true` | [ios: MobileBrowserV2/Source/LoginViewController.swift:151 symbol=LoginButtonTouchUp] |
| STATE-004 | Android | `hasValidLogin=false` | erfolgreicher Login-Button-Flow | `hasValidLogin=true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:171 symbol=onClick] |
| STATE-005 | Android | alte config version | App-Start mit neuer config version | `currentConfigVersion` aktualisiert | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:154 symbol=saveCurrentConfigVersion] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | `mb_server_key` (UserDefaults) | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:21 symbol=server] |
| STOR-002 | iOS | `mb_client_key` (UserDefaults) | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:22 symbol=client] |
| STOR-003 | iOS | `mb_token_key` (UserDefaults) | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:25 symbol=token] |
| STOR-004 | iOS | `mb_pin_key` (UserDefaults) | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:23 symbol=pin] |
| STOR-005 | iOS | `mb_httpProtocol_key` (UserDefaults) | RW | Int enum | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:24 symbol=httpProtocol] |
| STOR-006 | iOS | `mb_valid_settings_key` / `mb_valid_login_key` | RW | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:29 symbol=hasValidSettings] |
| STOR-007 | Android | `preference_server_key` (SharedPreferences) | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=SERVER] |
| STOR-008 | Android | `preference_client_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:15 symbol=CLIENT] |
| STOR-009 | Android | `preference_token_key` / `preference_pin_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:19 symbol=PIN] |
| STOR-010 | Android | `preference_protocol_key` | RW | Int | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:21 symbol=PROTOCOL] |
| STOR-011 | Android | `preference_valid_settings_key` / `preference_valid_login_key` | RW | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:23 symbol=HAS_VALID_SETTINGS] |
| STOR-012 | Android | `preference_sel_local_key` | RW | String locale | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:26 symbol=LOCALE_SYMBOL] |
| STOR-013 | Android | `preference_current_config_version_key` | RW | String version | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:28 symbol=CURRENT_CONFIG_VERSION] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | GET | `AF.request(buildCheckAccessUrl)` | URL mit server/client/protocol | HTTP status zur Settings-Validierung | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] |
| API-002 | Android | GET | `HttpStatusUtil.getHttpStatus(buildCheckAccessUrl)` | URL mit server/client/protocol | HTTP status zur Settings-Validierung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=HttpStatusUtil.getHttpStatus] |
| API-003 | iOS | GET | `AF.request(buildLoginUrl)` | URL mit user/password App=MobileBrowser | HTTP status + Error Query-Param | [ios: MobileBrowserV2/Source/LoginViewController.swift:139 symbol=AF.request] |
| API-004 | Android | GET URL-Build (Call in Webview) | `PreferencesUtils.buildLoginUrl` | URL mit user/encodedPassword/App/Culture | Übergabe an `WebviewActivity` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:143 symbol=buildLoginUrl] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | LoginViewController | SettingsViewController | `hasValidSettings=false` und kein PIN | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| NAV-002 | iOS | SettingsViewController | Login (dismiss) | Save erfolgreich | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:187 symbol=saveTouched] |
| NAV-003 | Android | LoginActivity | SettingsActivity | `hasValidSettings=false` und kein PIN | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:124 symbol=onCreate] |
| NAV-004 | Android | SettingsActivity | LoginActivity | Save erfolgreich | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:144 symbol=onClick] |
| NAV-005 | Android | LoginActivity | PinActivity | PIN vorhanden vor Settings-Zugriff | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:121 symbol=onCreate] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | ungültiger Server oder HTTP != 200 bei Settings-Check | `showSettingsErrorDialog` | Keine Persistenz, bleibt im Settings-Screen | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:174 symbol=saveTouched] |
| ERRPATH-002 | Android | HTTP-Check fehlschlägt | `showSettingsErrorDialog` | Keine Persistenz, bleibt im Settings-Screen | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:135 symbol=onClick] |
| ERRPATH-003 | iOS | PIN ungültig (nicht leer und != 4) | `showWrongPinLengthErrorDialog` | Save wird abgebrochen | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:191 symbol=saveTouched] |
| ERRPATH-004 | Android | PIN ungültig | `showWrongPinErrorDialog` | Save wird abgebrochen | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:148 symbol=onClick] |
| ERRPATH-005 | Android | config.json ungültig oder nicht lesbar | `null` Settings, kein Update | App läuft mit vorhandenen Preferences weiter | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:25 symbol=loadConfigFileSettings] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | `UserDefaults` | Persistenz Settings/Login Flags | RN AsyncStorage/MMKV | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:34 symbol=sharedPreferences] |
| DEP-002 | iOS | Alamofire | HTTP-Prüfung/Requests in Settings/Login | RN fetch/axios | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:9 symbol=import Alamofire] |
| DEP-003 | Android | `SharedPreferences` | Persistenz Settings/Login/Locale/ConfigVersion | RN AsyncStorage/MMKV | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:65 symbol=onCreate] |
| DEP-004 | Android | Gson | Parsing von config.json | RN JSON.parse + typed schema | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:21 symbol=Gson] |
| DEP-005 | Android | App singleton (`App.getInstance`) | globaler Zugriff auf SharedPreferences/Locales | RN Context/DI Service | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:54 symbol=getInstance] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Settings Screen | Cancel-Button wird versteckt, wenn keine valid settings vorhanden sind | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:97 symbol=viewDidLoad] |
| UI-002 | Android | Settings Screen | Cancel-Button wird versteckt, wenn keine gespeicherten Prefs vorhanden sind | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:105 symbol=hasSavedPreferences] |
| UI-003 | Cross | Settings Screen | QR-Scan kann Felder server/client/protocol/token/pin vorausfüllen | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:209 symbol=unwindToSettings] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:204 symbol=onActivityResult] |
| UI-004 | Android | Settings/Login Language Spinner | Locale-Auswahl wird sofort gespeichert | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:184 symbol=setOnItemSelectedListener] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | `password`, `token`, `pin` in UserDefaults | Keine Verschlüsselung auf App-Ebene sichtbar | RN soll Secure-Storage-Anforderung prüfen (Keychain/Keystore) | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:45 symbol=password] |
| SEC-002 | Android | `password`, `token`, `pin` in SharedPreferences | Keine Encryption-API im Persistenzpfad sichtbar | RN soll mind. Option für secure storage definieren | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:17 symbol=PASSWORD] |
| SEC-003 | Android | HTTPS ohne Zertifikatsvalidierung (`PROTOCOL_HTTPS_WITHOUT_VALIDATION`) | Sicherheitsabsenkung explizit möglich | RN muss Verhalten explizit übernehmen oder verbieten | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:12 symbol=PROTOCOL_HTTPS_WITHOUT_VALIDATION] |
