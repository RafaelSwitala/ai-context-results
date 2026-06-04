# Feature Analysis

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T16:15:12+02:00 |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | storage-config | prompt; [ai-context: features/feature-list.md:1 symbol=storage-config] |
| User feature name | storage-config | prompt |
| In scope | Persistierte App-Konfiguration fuer Server, Mandant, Protokoll, Token, PIN, Validitaetsflags, QR-Code-Import, Android-Config-JSON-Import, Settings-Screen-Pruefung und URL-Aufbau aus Settings. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:17 symbol=Keys]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=PreferencesUtils] |
| Out of scope | Login-WebView-Verhalten nach erfolgreicher Anmeldung, Barcode-Scanning fuer Artikel, Lizenzverwaltung als eigenstaendiges Feature; sie werden nur als Abhaengigkeiten genannt, wenn sie Storage-Werte lesen. | [ios: MobileBrowserV2/Source/LoginViewController.swift:171 symbol=prepare]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:171 symbol=login.onClick] |
| Open blockers | Keine Blocker fuer Phase 2-5; iOS hat keine belegte Config-Datei-Import-Schiene, Android schon. Diese Divergenz ist in P1-A14 gemappt. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged]; [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:185 symbol=saveSettingsPreferences] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | storage, config, Settings, PreferencesUtils, UserDefaults, QRCodeParser, QRCodeSettings, server, mandant, https, token, pin, buildCheckAccessUrl | 15 | 9 | Aktive Storage-Datei ist `PreferncesUtils.swift`; `PreferencensUtils.swift` enthaelt nur Header/Import und ist out of scope. [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:11 symbol=PreferencesUtils]; [ios: MobileBrowserV2/Source/Utils/PreferencensUtils.swift:1 symbol=NOT_PRESENT] |
| Android | storage, config, SettingsActivity, PreferencesUtils, SharedPreferences, ConfigFile, config.json, QRCodeParser, server, mandant, https, token, pin, CurrentConfigVersion | 22 | 13 | Android hat SharedPreferences plus flavor-spezifische `config.json` Assets und Versionsmigration beim App-Start. [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged]; [android: app/src/bauhaus/assets/config.json:1 symbol=config.json] |
| RN | AsyncStorage, secure-store, jest, scripts | 1 | 1 | RN-Projekt enthaelt bereits AsyncStorage, SecureStore und Jest-Scripts fuer spaetere Migration. [rn: package.json:14 symbol=dependencies]; [rn: package.json:5 symbol=scripts] |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/Utils/PreferncesUtils.swift | PreferencesUtils | UserDefaults-Keys und Read/Write-Methoden fuer Settings, Login und Validitaetsflags. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:17 symbol=Keys] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | SettingsViewController | Settings UI liest Preferences, validiert Server/PIN, prueft URL und persistiert Settings. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:53 symbol=viewDidLoad]; [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:144 symbol=saveTouched] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/QRCodeParser.swift | QRCodeParser.parse | Parsed QR-Code-Parameter `p`, `v`, `server`, `mandant`, `https`, `token`, `pin`. | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/QRCodeSettings.swift | QRCodeSettings | Validierung von QR-Code-Settings auf Server, `p=MB`, `v=1`. | [ios: MobileBrowserV2/Source/Utils/QRCodeSettings.swift:19 symbol=isValid] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | UrlUtils | Baut Check-Access- und Login-URLs aus persistierter Konfiguration. | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:50 symbol=buildCheckAccessUrl]; [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:140 symbol=buildLoginUrlFromPreferences] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/LoginViewController.swift | LoginViewController | Erzwingt Settings bei ungueltiger Konfiguration und oeffnet Settings/PIN. | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad]; [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/QrCodeScannerViewController.swift | QrCodeScannerViewController | Normalisiert und validiert QR-Code vor Rueckkehr in Settings. | [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:46 symbol=metadataOutput] |
| IOS-FILE-008 | iOS | MobileBrowserV2/Source/PeServices/PeApi.swift | PeApi | Liest Token als OAuth Consumer Key fuer Lizenz-API. | [ios: MobileBrowserV2/Source/PeServices/PeApi.swift:31 symbol=loadUsers] |
| IOS-FILE-009 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | AppSettings | URL-Pfad-Konstanten fuer URL-Aufbau. | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:21 symbol=AppSettings] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | PreferencesUtils | SharedPreferences-Keys, Read/Write, URL-Aufbau, Locale und Config-Version. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=PreferencesUtils] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | SettingsActivity | Settings UI liest Preferences, validiert Server/PIN, prueft URL, QR-Code und Locale. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:52 symbol=onCreate] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java | QRCodeParser.parse | Parsed QR-Code-Parameter plus Culture-Fallback. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeSettings.java | QRCodeSettings | Validierung von QR-Code-Settings. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeSettings.java:5 symbol=QRCodeSettings] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/Settings.java | Settings | Gemeinsames Settings-Modell fuer QR-Code und Config-File. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/Settings.java:4 symbol=Settings] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java | ConfigFileLoader | Laedt `config.json`, mapped in Settings und setzt Protokoll-Fallback. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:14 symbol=loadConfigFileSettings] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFile.java | ConfigFile | JSON-Schema fuer Android-Asset-Konfiguration. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFile.java:3 symbol=ConfigFile] |
| AND-FILE-008 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettings.java | ConfigFileSettings | Validierung fuer Config-Datei-Protokoll `FILE`. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettings.java:5 symbol=ConfigFileSettings] |
| AND-FILE-009 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | App | Initialisiert SharedPreferences, Locale und Config-Datei-Update bei Versionswechsel. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:60 symbol=onCreate] |
| AND-FILE-010 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | LoginActivity | Erzwingt Settings/PIN bei ungueltiger Konfiguration und nutzt Preferences fuer Login-URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:115 symbol=onCreate] |
| AND-FILE-011 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java | QRCodeScannerActivity | Normalisiert, validiert und liefert QR-Code an SettingsActivity. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:89 symbol=handleCode] |
| AND-FILE-012 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java | LoginPreferences | DTO fuer gespeicherte Werte und HTTPS-Helper. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java:3 symbol=LoginPreferences] |
| AND-FILE-013 | Android | app/src/bauhaus/assets/config.json; app/src/superstore/assets/config.json | config.json | Flavor-Defaultwerte fuer Server, Mandant, HTTPS, Token, Culture, PIN. | [android: app/src/bauhaus/assets/config.json:1 symbol=config.json]; [android: app/src/superstore/assets/config.json:1 symbol=config.json] |
| RN-FILE-001 | RN | package.json | dependencies/scripts | Belegt vorhandene Storage-/SecureStore-Dependencies und Jest-Kommandos. | [rn: package.json:14 symbol=dependencies]; [rn: package.json:5 symbol=scripts] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | Settings persistieren: Server, Mandant, Token, PIN, Protokoll, Validitaetsflags | In | Beide Plattformen definieren und speichern diese Werte. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:185 symbol=saveSettingsPreferences]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:86 symbol=saveSettingsPreferences] |
| BOUND-002 | QR-Code als Settings-Import | In | Beide Plattformen parsen QR-Parameter und fuellen Settings-Controls. | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:201 symbol=unwindToSettings]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:198 symbol=onActivityResult] |
| BOUND-003 | Android `config.json` als Default-/Update-Quelle | In | Android laedt Asset-Config und schreibt Preferences bei neuer Version. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |
| BOUND-004 | Login-Credentials speichern | Dependency | Username/Password liegen in gleicher Storage-Utility und beeinflussen `hasValidLogin`; fachliche Login-Pruefung ist ausserhalb storage-config. | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:142 symbol=saveLoginPreferences]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:109 symbol=saveLoginPreferences] |
| BOUND-005 | Lizenz-/Session-API mit Token | Dependency | Token wird als OAuth/API-Key genutzt; API-Funktion selbst ist Lizenz-/Session-Feature. | [ios: MobileBrowserV2/Source/PeServices/PeApi.swift:34 symbol=loadUsers]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/RequestUtils.java:41 symbol=getLicenseGuids] |
| BOUND-006 | Barcode-Scanner fuer Artikel | Out | Barcode-Scanner nutzt Login-State und WebView-Redirects, ist aber kein Settings-Storage. | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:33 symbol=viewDidLoad] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Persistent store | UserDefaults via static `PreferencesUtils`. | Default SharedPreferences via `App.SharedPreferences`. | Different storage API, same conceptual store. | RN muss Storage-Service abstrahieren und sensible Werte getrennt behandeln. |
| Setting fields | Server, client, token, pin, httpProtocol, valid settings/login, user/password. | Server, client, token, pin, protocol, valid settings/login, user/password, locale, config version. | Android has locale/config-version additions. | RN Mapping uebernimmt Android-only Config-Version/Locale als Divergenz. |
| Protocol values | `HttpProtocolEnum` raw `0=http`, `1=https`; invalid values default to HTTPS. | `0=http`, `1=https`, `2=https without validation`; invalid save is ignored. | Different. | RN muss `httpsWithoutValidation` bewusst modellieren oder als Android-only markieren. |
| Settings validation | Server required; PIN empty or exactly 4; URL must return HTTP 200 before saving. | Server required; PIN empty or exactly 4; URL status must be OK before saving. | Same core behavior. | Shared tests fuer validation/save, platform-specific protocol branch. |
| QR import | Requires `p=MB`, `v=1`, server; parses `mandant`, `https`, `token`, `pin`; missing/invalid HTTPS defaults to HTTPS. | Requires `p=MB`, `v=1`, server; parses `mandant`, `https`, `token`, `pin`, `culture`; missing/invalid HTTPS defaults to HTTPS. | Android includes culture. | RN QR parser should include culture optional and preserve iOS behavior when absent. |
| Default config file | NOT_PRESENT in iOS source tree. | Present for bauhaus/superstore assets and applied on version change. | Different. | RN Phase 3 must decide whether to add Android-equivalent bundled config support or mark platform divergence. |
| Storage Mechanism | UserDefaults.standard | SharedPreferences via PreferenceManager | Different | RN must use cross-platform abstraction (AsyncStorage, MMKV, or similar) |
| Key Naming | "mb_*_key" prefix | "preference_*_key" prefix | Different | Need to normalize keys for RN migration |
| Stored Keys | userName, password, server, client, pin, token, httpProtocol, isValid flags | SERVER, CLIENT, USER, PASSWORD, TOKEN, PIN, PROTOCOL constants, LOCALE, CONFIG_VERSION | Similar | Same conceptual data, different key names |
| Initialization | Lazy (via static properties) | Eager in App.onCreate() via PreferenceManager | Different | RN should initialize during app startup like Android |
| Atomic Operations | editor.set() then implicit commit | editor.set() then explicit commit() or apply() | Similar | Both provide atomic batching |
| Validation Flags | hasValidSettings, hasValidLogin | HAS_VALID_SETTINGS, HAS_VALID_LOGIN | Same | Core validation state concept exists on both |
| Extra Configs | isValid (marked as 2023-10-17 not used) | CONFIG_VERSION, LOCALE_SYMBOL | Different | Android has version/locale management; iOS less explicit |
