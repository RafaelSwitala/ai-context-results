# Feature Analysis

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | storage-config | prompt |
| User feature name | storage-config | prompt |
| In scope | Persistenz von Server/Client/Token/PIN/Protocol/Login-Flags, Config-Seed aus QR/Datei, Gating auf Settings/Login-Flows | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:17 symbol=Keys] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=SERVER] |
| Out of scope | WebView-Laufzeit, Barcode-Erkennung selbst, Lizenz-API-Aufrufe | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:16 symbol=buildUserLicensesUrl] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:1 symbol=WebviewActivity] |
| Open blockers | Keine Blocker in Phase 1 | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:147 symbol=saveTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:112 symbol=onClick] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | storage, config, preferences, userdefaults, settings, qrcode, login | 14 | 5 | Kernlogik in `PreferencesUtils`, `SettingsViewController`, `LoginViewController`, `QRCodeParser`, `UrlUtils` |
| Android | storage, config, sharedpreferences, settings, qrcode, login, locale | 44 | 8 | Zusätzlich config.json bootstrap (`ConfigFileLoader`) und Config-Version-Persistenz |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/Utils/PreferncesUtils.swift | `PreferencesUtils` | Definiert Storage-Keys und Read/Write für Settings/Login | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:17 symbol=Keys] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `saveTouched` | Validiert Settings, prüft Erreichbarkeit und persistiert Konfiguration | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:144 symbol=saveTouched] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `viewDidLoad` / `LoginButtonTouchUp` | Erzwingt vorhandene Settings vor Login, persistiert Login-Daten | [ios: MobileBrowserV2/Source/LoginViewController.swift:78 symbol=viewDidLoad] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/QRCodeParser.swift | `parse` | Extrahiert Storage-relevante Konfigurationsparameter aus QR-Code | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | `buildCheckAccessUrl` / `buildLoginUrl` | Nutzt gespeicherte Settings zum URL-Bau inkl. Passwort-Parameter | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:50 symbol=buildCheckAccessUrl] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | `PreferencesUtils` | SharedPreferences-Keys, Getter/Setter und URL-Building | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14 symbol=SERVER] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | `onCreate` / Save-Click | Lädt/persistiert Settings, prüft URL, steuert Navigation zu Login | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:92 symbol=onCreate] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `onCreate` / `isValid` | Gating auf valid settings, persistiert Login und navigiert weiter | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `updateSettingsOnVersionChanged` | Bootstrapt Settings aus config.json bei Versionswechsel | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java | `loadConfigFileSettings` | Lädt und mapped Config-Datei zu persistierbaren Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:14 symbol=loadConfigFileSettings] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettings.java | `isValid` | Validiert Config-Protokoll und Version vor Übernahme | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettings.java:8 symbol=isValid] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java | `parse` | Extrahiert Settings inkl. Culture aus QR-Code | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |
| AND-FILE-008 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java | `isHttps` | Modelliert geladene Settings/Login-States für Consumer | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java:17 symbol=isHttps] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Persistenz von Verbindungsparametern (server/client/protocol) | In | Kern des Features storage-config | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:54 symbol=server] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:86 symbol=saveSettingsPreferences] |
| FB-002 | Persistenz von Login-Status und Credentials | In | Gating und Auto-Fill hängen von gespeicherten Werten ab | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:119 symbol=hasValidLogin] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:109 symbol=saveLoginPreferences] |
| FB-003 | Settings-Validierung via HTTP-Check vor Persistenz | In | Speichern setzt erfolgreiche Erreichbarkeitsprüfung voraus | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=HttpStatusUtil.getHttpStatus] |
| FB-004 | QR-Code Parsing für Prefill | In | Konfiguration kann via QR gesetzt werden | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:209 symbol=unwindToSettings] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:204 symbol=onActivityResult] |
| FB-005 | Config-Datei-Bootstrap inkl. Versionsverwaltung | In (Android only) | Nur Android hat config.json + current config version | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:89 symbol=updateSettingsOnVersionChanged] |
| FB-006 | Verschlüsselte Speicherung sensibler Felder | Out | Beide Plattformen nutzen Plain Preferences/UserDefaults | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:45 symbol=password] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:17 symbol=PASSWORD] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Persistenz-Backend | `UserDefaults.standard` | `SharedPreferences` (Default) | Different (Impl), Same (Semantik) | RN sollte plattformneutralen Storage-Service mit identischen Keys/DTO bereitstellen |
| Protokoll-Modell | `HttpProtocolEnum` mit HTTP/HTTPS | Int-Konstanten inkl. HTTPS ohne Zertifikatsvalidierung | Different | RN braucht explizite Policy für unsicheren TLS-Modus (Feature-Flag oder Ausschluss) |
| Bootstrap-Quelle | Benutzer/QR in UI-Flow | UI-Flow plus `config.json` beim App-Start | Different | RN benötigt Entscheidung, ob dateibasierter Initial-Seed übernommen wird |
| Locale im Config-Flow | Kein Culture-Handling in QR Parser | Culture aus QR und Locale in Preferences | Different | RN muss Locale-Persistenz als Android-Divergenz dokumentieren oder harmonisieren |
| Passwortbehandlung | Base64 erst bei URL-Build | Base64 vor Persistenz im Login-Flow | Different | RN sollte konsistentes Verhalten definieren, idealerweise keine Speicherung im Klartext |
