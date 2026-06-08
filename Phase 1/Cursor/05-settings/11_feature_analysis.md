# Feature Analysis

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | settings | prompt |
| User feature name | settings | prompt |
| In scope | Settings-Screen (server/client/protocol/token/pin), Validierung, Erreichbarkeits-Check vor Speichern, Persistenz in Preferences, QR-Prefill, Cancel-Button-Logik, Keyboard-Handling (iOS), Sprach-/Protokoll-Spinner (Android), config.json Bootstrap (Android) | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:144 symbol=saveTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:109 symbol=onClick] |
| Out of scope | Login-Formular, PIN-Gate vor Settings-Zugriff, WebView nach erfolgreicher Konfiguration | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=getHttpStatus] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | Settings, saveTouched, hasValidSettings, QRCODE, httpsProtocol, pin, token | 18 | 5 | Kern in `SettingsViewContoller` + `PreferencesUtils` + QR Parser |
| Android | SettingsActivity, saveSettings, protocol spinner, locale, config.json, QRCode | 52 | 8 | Zusätzlich Config-Bootstrap und Language-Spinner |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `saveTouched` / `viewDidLoad` | Settings-UI, Save/Cancel, QR, Validierung | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:53 symbol=viewDidLoad] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/Utils/PreferncesUtils.swift | `saveSettingsPreferences` | Persistiert Settings-Felder und Flags | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:185 symbol=saveSettingsPreferences] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | `buildCheckAccessUrl` | Erreichbarkeits-URL für Save-Gate | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:50 symbol=buildCheckAccessUrl] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/QRCodeParser.swift | `parse` | QR-Prefill der Settings-Felder | [ios: MobileBrowserV2/Source/Utils/QRCodeParser.swift:14 symbol=parse] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Utils/QRCodeSettings.swift | `isValid` | QR-Settings Validierungsregeln | [ios: MobileBrowserV2/Source/Utils/QRCodeSettings.swift:19 symbol=isValid] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | `onCreate` / Save onClick | Settings-UI, Spinner, Save-Flow | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:52 symbol=onCreate] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | `saveSettingsPreferences` | SharedPreferences für Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:86 symbol=saveSettingsPreferences] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java | `getHttpStatus` | HTTP-Check vor Speichern | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/NetworkUrilities/HttpStatusUtil.java:22 symbol=getHttpStatus] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java | `parse` | QR-Prefill inkl. Culture | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParser.java:11 symbol=parse] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `updateSettingsOnVersionChanged` | Automatisches Überschreiben aus config.json | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:87 symbol=updateSettingsOnVersionChanged] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java | `loadConfigFileSettings` | Lädt initiale/bundled Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileLoader.java:14 symbol=loadConfigFileSettings] |
| AND-FILE-007 | Android | app/src/main/res/layout/activity_settings.xml | Form layout | UI-Felder server/client/pin/token/spinner | [android: app/src/main/res/layout/activity_settings.xml:1 symbol=activity_settings] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Settings-Felder server/client/protocol/token/pin | In | Kern des Features | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:19 symbol=server] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:68 symbol=server] |
| FB-002 | HTTP Erreichbarkeits-Check vor Persistenz | In | Save nur bei erreichbarem Server | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:170 symbol=AF.request] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:132 symbol=getHttpStatus] |
| FB-003 | QR-Code Prefill | In | Alternative Eingabe der Settings | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:209 symbol=unwindToSettings] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:204 symbol=onActivityResult] |
| FB-004 | Locale-Auswahl im Settings-Screen | In (Android only) | Sprache wird sofort persistiert | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:184 symbol=setOnItemSelectedListener] |
| FB-005 | config.json Bootstrap bei Versionswechsel | In (Android only) | App-Start kann Settings überschreiben | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:92 symbol=updateSettingsOnVersionChanged] |
| FB-006 | Navigation nach Save zu Login | Out (Konsument) | Gehört navigation/login | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:144 symbol=startActivity] [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:187 symbol=dismiss] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Protokoll-UI | HTTPS Switch (2 Zustände) | Spinner: HTTPS / HTTPS ohne Validation / HTTP | Different | RN braucht 3-stufiges Protokollmodell |
| Save-Erfolg Navigation | dismiss zurück zu Login | startActivity LoginActivity | Different | RN: einheitliche Post-Save-Route |
| Locale in Settings | nicht im Settings-Screen | Language-Spinner persistiert sofort | Different | RN Locale optional im Settings-Screen |
| Config Bootstrap | nicht vorhanden | config.json bei Versionswechsel | Different | RN optionaler Bootstrap-Service |
| QR Culture | nicht in iOS Parser/UI | Culture aus QR + saveLocale | Different | RN Culture-Feld optional |
| Validierung | server required, pin 0 oder 4 | gleiche Regel | Same | RN shared validation schema |
