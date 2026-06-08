# Test Definition

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit/UI | iOS | High | Feldvalidierung inkl. spezifischer Fehlermeldungen |
| BEH-002 | Unit/UI | Android | High | `isValid()` Gate basiert auf settings + username |
| BEH-003 | Integration | iOS | High | HTTP Loginresponse steuert Flag + Navigation |
| BEH-004 | Unit/UI | Android | High | Optimistischer Loginflow persistiert Daten vor WebView |
| BEH-005 | Unit/UI | iOS, Android | High | invalid settings führt zu Settings/PIN |
| BEH-006 | Unit/UI | iOS, Android | Medium | PIN match/mismatch Verhalten |
| BEH-007 | Unit/Integration | iOS, Android | Medium | Logout bei Background setzt Login-Flag zurück |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Login requires username and password | leeres username oder password Feld | `LoginButtonTouchUp` | korrekte Fehlermeldung, kein Request, kein State-Update | EP-001, BEH-001, ERRPATH-001, ERRPATH-002 |
| LT-002 | Android | Login validation blocks invalid state | `hasValidSettings=false` oder username leer | Login-Button gedrückt | generic error, keine Navigation zu WebView | EP-002, BEH-002, ERRPATH-004 |
| LT-003 | iOS | Successful login sets flag and navigates | valid settings + credentials + HTTP 200 ohne errorCode | Login ausgeführt | `saveLoginPreferences`, `saveValidLoginPreference(true)`, segue WEBVIEW | BEH-003, STATE-001, NAV-001, STOR-001..STOR-003 |
| LT-004 | Android | Login persists encoded password and opens WebView | valid settings + credentials | Login-Button | encoded password wird gespeichert, hasValidLogin=true, WebviewActivity gestartet | BEH-004, STATE-002, NAV-002, STOR-006..STOR-008 |
| LT-005 | Cross | Invalid settings routes to settings or pin | hasValidSettings=false und variierender pin | Login screen init / settings tap | Route zu PIN falls pin gesetzt, sonst Settings | BEH-005, NAV-003, NAV-004 |
| LT-006 | Cross | Pin gate accepts only exact match | gespeicherter pin=1234 | PIN-Eingabe 1234 bzw. abweichend | bei Match Settings-Zugriff, bei Mismatch Fehler+Reset | BEH-006, NAV-005, ERRPATH-005 |
| LT-007 | Cross | App background resets hasValidLogin | hasValidLogin=true | App geht in Hintergrund | hasValidLogin=false gespeichert | BEH-007, STATE-003, STATE-004 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-008 | iOS | `buildLoginUrl` liefert nil (encoding failure) | generic error dialog, kein login success | API-001, ERRPATH-003 |
| LT-009 | Android | gespeichertes Passwort bereits leer oder invalid base64 | UI bleibt stabil; Login kann neues encoded password schreiben | STOR-007, UI-002 |
| LT-010 | Cross | PIN fehlt trotz PIN-screen Routeversuch | Flow fällt sicher auf Settings/Finish zurück | STOR-005, STOR-010, BEH-006 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Login input validation | BEH-001, BEH-002, ERRPATH-001..ERRPATH-004 | 100% Branch-Abdeckung | Höchste Auswirkung auf erfolgreichen Einstieg |
| State flags | STATE-001..STATE-004, STOR-003, STOR-008 | 100% transitions | Session- und Logout-Konsistenz kritisch |
| PIN protection | BEH-006, NAV-005, ERRPATH-005 | alle Pfade (match/mismatch/empty) | Schutz vor unerlaubter Settings-Änderung |
| Credential persistence | STOR-001, STOR-002, STOR-006, STOR-007, SEC-001..SEC-003 | vollständige Key-Abdeckung | Sicherheits- und Migrationsrelevanz |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| API-003 | Session-delete ist plattformabhängig und i.d.R. integration/network-seitig | Contract-Test mit gemocktem API-Client und assert auf Aufrufbedingungen |
