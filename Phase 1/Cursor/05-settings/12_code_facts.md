# Code Facts

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | SettingsViewContoller.swift | `viewDidLoad` | Settings-Screen wird geöffnet | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:53 symbol=viewDidLoad] |
| EP-002 | iOS | SettingsViewContoller.swift | `saveTouched` | Tap Speichern | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:144 symbol=saveTouched] |
| EP-003 | Android | SettingsActivity.java | `onCreate` | Settings Activity Start | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:52 symbol=onCreate] |
| EP-004 | Android | SettingsActivity.java | Save `onClick` | Tap Speichern | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:109 symbol=onClick] |
| EP-005 | Android | App.java | `updateSettingsOnVersionChanged` | App-Start nach config version change | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | Cross | Lädt gespeicherte Settings in UI | Preferences server/client/token/pin/protocol | Felder vorausgefüllt | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:58 symbol=viewDidLoad] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:92 symbol=getLoginPreferences] |
| BEH-002 | Cross | Validiert server non-empty und PIN 0 oder 4 Zeichen | server, pin fields | isValid true/false | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:257 symbol=isValid] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:252 symbol=isValid] |
| BEH-003 | Cross | Speichert nur nach erfolgreichem Server-Reachability-Check | check access URL | hasValidSettings=true + persisted fields oder Fehlerdialog | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:174 symbol=saveTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:134 symbol=onClick] |
| BEH-004 | iOS | Protokoll wird als HTTPS-Switch gesetzt (http/https) | httpsProtocol switch | saveProtocolPreference(0/1) | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:148 symbol=saveTouched] |
| BEH-005 | Android | Protokoll per Spinner inkl. insecure HTTPS mode | spinner selection | saveProtocolPreference(0/1/2) vor HTTP check | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:124 symbol=onClick] |
| BEH-006 | Cross | QR-Scan befüllt Settings-Felder | QR URL | initViews/fillControlsFromQRCode | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:210 symbol=initViews] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:210 symbol=fillControlsFromQRCode] |
| BEH-007 | iOS | Cancel-Button nur sichtbar wenn bereits valid settings | hasValidSettings | cancel hidden oder sichtbar | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:97 symbol=viewDidLoad] |
| BEH-008 | Android | Cancel-Button nur wenn gespeicherte Prefs existieren | hasSavedPreferences | cancel GONE oder sichtbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:105 symbol=hasSavedPreferences] |
| BEH-009 | Android | Locale-Auswahl speichert sofort | language spinner item | saveLocale | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:189 symbol=saveLocale] |
| BEH-010 | Android | config.json überschreibt Settings bei neuer Version | config version != current | saveSettings + valid flag + version key | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:92 symbol=updateSettingsOnVersionChanged] |
| BEH-011 | Android | Douglas server name migration vor UI load | old server hostname | SERVER key ersetzt | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:90 symbol=replaceDouglasServerName] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | Cross | `hasValidSettings=false` | erfolgreicher Save | `hasValidSettings=true` | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:185 symbol=saveValidSettingsPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:139 symbol=saveValidSettingsPreference] |
| STATE-002 | Android | alte config version | App-Start mit neuer config version | currentConfigVersion aktualisiert | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:154 symbol=saveCurrentConfigVersion] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | `mb_server_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:21 symbol=server] |
| STOR-002 | iOS | `mb_client_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:22 symbol=client] |
| STOR-003 | iOS | `mb_token_key` / `mb_pin_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:25 symbol=token] |
| STOR-004 | iOS | `mb_httpProtocol_key` | RW | Int enum | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:24 symbol=httpProtocol] |
| STOR-005 | iOS | `mb_valid_settings_key` | RW | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:29 symbol=hasValidSettings] |
| STOR-006 | Android | `preference_server_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=SERVER] |
| STOR-007 | Android | `preference_client_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:15 symbol=CLIENT] |
| STOR-008 | Android | `preference_token_key` / `preference_pin_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:19 symbol=PIN] |
| STOR-009 | Android | `preference_protocol_key` | RW | Int | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:21 symbol=PROTOCOL] |
| STOR-010 | Android | `preference_valid_settings_key` | RW | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:23 symbol=HAS_VALID_SETTINGS] |
| STOR-011 | Android | `preference_sel_local_key` | RW | String locale | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:26 symbol=LOCALE_SYMBOL] |
| STOR-012 | Android | `preference_current_config_version_key` | RW | String version | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:28 symbol=CURRENT_CONFIG_VERSION] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|
| API-001 | iOS | GET | `AF.request(buildCheckAccessUrl)` | Check-Access URL | HTTP status 200 required for save | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] |
| API-002 | Android | GET | `HttpStatusUtil.getHttpStatus` | Check-Access URL | OK status required for save | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=getHttpStatus] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | Settings | zurück (dismiss) | Save success oder Cancel | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:187 symbol=dismiss] |
| NAV-002 | iOS | Settings | QrCodeScannerViewController | QR toolbar tap | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:132 symbol=performSegue] |
| NAV-003 | Android | SettingsActivity | LoginActivity | Save success | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:144 symbol=startActivity] |
| NAV-004 | Android | SettingsActivity | QRCodeScannerActivity | QR icon tap | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:160 symbol=startActivityForResult] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | Cross | server leer oder ungültige PIN | wrong pin dialog oder generic settings error | kein Save | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:191 symbol=saveTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:148 symbol=onClick] |
| ERRPATH-002 | Cross | HTTP check fails | showSettingsErrorDialog | hasValidSettings bleibt unverändert | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:174 symbol=saveTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:135 symbol=onClick] |
| ERRPATH-003 | iOS | buildCheckAccessUrl returns nil | showSettingsErrorDialog | kein Netzwerkcall | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:160 symbol=saveTouched] |
| ERRPATH-004 | Android | QR settings invalid | fillControlsFromQRCode skipped | Felder unverändert | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:211 symbol=fillControlsFromQRCode] |
| ERRPATH-005 | Android | config.json load/parse fails | null settings, kein bootstrap update | App nutzt bestehende Preferences | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:25 symbol=loadConfigFileSettings] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | Alamofire | HTTP reachability check | RN fetch/axios | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:9 symbol=import Alamofire] |
| DEP-002 | iOS | MBProgressHUD | Save loading spinner | RN ActivityIndicator | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:317 symbol=MBProgressHUD] |
| DEP-003 | Android | HttpStatusUtil + OkHttp async | Reachability check | RN connectivity service | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java:22 symbol=getHttpStatus] |
| DEP-004 | Android | Gson + assets config.json | Config bootstrap | RN bundled JSON loader | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:21 symbol=Gson] |
| DEP-005 | Cross | QRCodeParser + QRCodeSettings | QR prefill | RN QR parser utility | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | ScrollView + keyboard notifications | Passt contentInset bei Keyboard an | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:271 symbol=registerForKeyboardNotifications] |
| UI-002 | Android | Language spinner | Disabled wenn nur eine Sprache verfügbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:180 symbol=setEnabled] |
| UI-003 | Android | Protocol spinner | 3 Optionen HTTPS/HTTPS-no-validation/HTTP | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:79 symbol=securityProtocol] |
| UI-004 | iOS | HTTPS switch default | true wenn noch keine valid settings | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:60 symbol=httpsProtocol] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | Cross | token/pin in preferences | Klartext in UserDefaults/SharedPreferences | RN secure storage für PIN/Token | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:72 symbol=pin] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:94 symbol=PIN] |
| SEC-002 | Android | HTTPS ohne Zertifikatsvalidierung | Explizite Protokoll-Option | RN Policy + Warnung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:119 symbol=PROTOCOL_HTTPS_WITHOUT_VALIDATION] |
| SEC-003 | Cross | Server-URL Reachability test | Netzwerkzugriff beim Save | RN preflight mit Timeout | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java:32 symbol=get] |
