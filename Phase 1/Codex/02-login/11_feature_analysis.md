# Feature Analysis

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | login | prompt |
| User feature name | login | prompt |
| In scope | Login-Validierung, URL-Building, Credential-Persistenz, PIN-Gate zu Settings, Login-State-Flags, Logout-Reset | [ios: MobileBrowserV2/Source/LoginViewController.swift:106 symbol=LoginButtonTouchUp] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:137 symbol=onClick] |
| Out of scope | WebView-Inhalt nach Login, Lizenzdialoge, Scanner-Feature | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:1 symbol=WebsiteViewController] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:1 symbol=WebviewActivity] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/AppDelegate.swift:32 symbol=logout] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:122 symbol=logout] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | login, username, password, pin, hasValidLogin, buildLoginUrl, logout | 17 | 6 | Login-Flow in ViewController, PIN in separatem Controller, Logout in AppDelegate |
| Android | login, user, password, pin, hasValidLogin, buildLoginUrl, logout | 46 | 6 | Login/PIN als Activities, Logout im Application-Lifecycle |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `LoginButtonTouchUp` | Haupt-Login-Aktion inkl. Validierung, API-Call, Persistenz | [ios: MobileBrowserV2/Source/LoginViewController.swift:106 symbol=LoginButtonTouchUp] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/PinCodeViewController.swift | `setupUI` | PIN-Prüfung vor Settings-Zugriff | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:48 symbol=setupUI] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/PreferncesUtils.swift | `saveLoginPreferences` | Persistiert User/Pass + Login-/Settings-Flags | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:142 symbol=saveLoginPreferences] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | `buildLoginUrl` | Baut Login-URL inkl. base64 Passwortparameter | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:92 symbol=buildLoginUrl] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/AppDelegate.swift | `logout` | Setzt Login-Flag zurück und triggert Server-Session-Delete | [ios: MobileBrowserV2/Source/AppDelegate.swift:32 symbol=logout] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/SettingsViewContoller.swift | `saveTouched` | Liefert prerequisite (`hasValidSettings=true`) für Login | [ios: MobileBrowserV2/Source/SettingsViewContoller.swift:185 symbol=saveTouched] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `onCreate` / login onClick | Login-Gating, Prefill, Persistenz und Navigation | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| AND-FILE-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java | `onCreate` | PIN-Abfrage und Gate zu Settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:46 symbol=onCreate] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | `saveLoginPreferences` | SharedPreferences für Login-Daten und Flags | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:109 symbol=saveLoginPreferences] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java | `isHttps` | Login-DTO und Protokollauswertung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/LoginPreferences.java:17 symbol=isHttps] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `logout` | Lifecycle-basiertes Logout und Login-Flag-Reset | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:122 symbol=logout] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java | `onClick` | Stellt valid settings für Login sicher | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/SettingsActivity.java:139 symbol=onClick] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Username/Password Eingabevalidierung | In | Login startet nur mit Pflichtfeldern | [ios: MobileBrowserV2/Source/LoginViewController.swift:111 symbol=LoginButtonTouchUp] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:243 symbol=isValid] |
| FB-002 | Login URL-Erzeugung | In | Zielserveraufruf basiert auf Settings + Userdaten | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:92 symbol=buildLoginUrl] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:222 symbol=buildLoginUrl] |
| FB-003 | Credential- und Flag-Persistenz | In | Reopen/Prefill und Session-Status hängen davon ab | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:150 symbol=saveValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:127 symbol=saveValidLoginPreference] |
| FB-004 | PIN-Schutz vor Settings-Zugriff | In | Settings-Änderung optional mit 4-stelligem PIN geschützt | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:75 symbol=didFinishedEnterCode] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:112 symbol=onClick] |
| FB-005 | Session-Logout beim Backgrounding | In | valid login wird beim App-Verlassen zurückgesetzt | [ios: MobileBrowserV2/Source/AppDelegate.swift:35 symbol=logout] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:118 symbol=onPause] |
| FB-006 | Serverseitige Business-Fehlercodes | Out (nur konsumiert) | Fehlercode-Parsen liegt außerhalb Login-Storage-Kerns | [ios: MobileBrowserV2/Source/LoginViewController.swift:228 symbol=showPeErrorDialog] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:212 symbol=showErrorDialog] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Login Request | Führt echten HTTP Request vor Navigation aus | Request aktuell auskommentiert, navigiert direkt mit URL | Different | RN muss entscheiden: strikt mit Online-Check oder Android-ähnlich optimistisch |
| Passwortpersistenz | Speichert raw Passwort in Preferences | Speichert base64-kodiertes Passwort | Different | RN braucht einheitliche Passwort-Policy |
| PIN-Gate | Eigener `PinCodeViewController` mit Segue zurück | `PinActivity` mit numerischem Pad und direktem Start Settings | Different | RN sollte eine gemeinsame PIN-Gate-Komponente mit einheitlicher UX nutzen |
| Logout Trigger | Beim Background via `AppDelegate.saveContext` | Beim App-Lifecycle `onPause` | Same intent, Different hook | RN muss AppState-Event für Logout-Reset abbilden |
