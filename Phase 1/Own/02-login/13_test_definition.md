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
| BEH-002 | Unit | iOS/Android | HIGH | Empty username validation |
| BEH-003 | Unit | iOS/Android | HIGH | Empty password validation |
| BEH-004 | Unit | iOS/Android | HIGH | Settings validation before login |
| BEH-005 | Unit | iOS/Android | HIGH | Login URL construction with all parameters |
| BEH-006 | Integration | iOS/Android | MEDIUM | HTTP request (mocked) with proper headers |
| BEH-007 | Unit | iOS/Android | MEDIUM | Response status code parsing |
| BEH-008 | Unit | iOS/Android | MEDIUM | Error code extraction from query params |
| BEH-009 | Unit | iOS/Android | HIGH | Credential save to preferences |
| BEH-010 | Unit | iOS/Android | HIGH | Valid login flag set to true |
| BEH-012 | Unit | iOS/Android | HIGH | PIN validation correctness check |
| BEH-013 | Unit | Android | MEDIUM | Password Base64 encoding/decoding |
| BEH-015 | Unit | Android | MEDIUM | Language selection save |
| BEH-018 | Unit | Android | MEDIUM | Password encoding before save |

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
| EC-001 | iOS/Android | Username with spaces | Accepted, passed to URL encoding | BEH-005, API-001/API-004 |
| EC-002 | iOS/Android | Password with special characters (!, @, #, $) | Accepted, properly encoded in URL | BEH-005 |
| EC-003 | iOS/Android | Username 1 character long | Accepted (non-empty validation passes) | BEH-002/BEH-003 |
| EC-004 | iOS/Android | Password 100+ characters long | Accepted, URL encoded | BEH-005 |
| EC-005 | iOS/Android | Rapid login attempts (spam button) | Only one HTTP request in flight; spinner prevents multiples | BEH-006 |
| EC-006 | iOS/Android | Network timeout during login | Timeout handled by HTTP library; error state reached | BEH-006, ERRPATH-005 |
| EC-007 | iOS/Android | Server returns malformed response (not HTTP 200 or known error) | Treated as error; generic error dialog shown | BEH-007 |
| EC-008 | iOS/Android | Error code in query param is blank string | Not treated as error; login success assumed | BEH-008 |
| EC-009 | iOS | PIN code with leading zero (e.g., "0123") | Accepted as valid 4-digit code | BEH-012 |
| EC-010 | Android | Password contains newline or tab characters | Base64 encoding handles; stored and decoded correctly | BEH-013, BEH-018 |
| EC-011 | iOS/Android | User clears both fields and taps login | Empty validation triggers; error shown | BEH-002, BEH-003 |
| EC-012 | iOS/Android | Server responds with HTTP 500 | Non-200 status; generic error shown | ERRPATH-005 |
| EC-013 | iOS/Android | buildLoginUrl() receives null/empty server | Returns nil/invalid; error handling triggered | ERRPATH-004 |
| EC-014 | iOS | Spinner is nil/not loaded | showSpinner() may fail silently; login still proceeds | BEH-006 (robustness) |
| EC-015 | Android | PreferencesUtils.getLoginPreferences() returns null | NPE if not handled; should validate | BEH-013, BEH-017 |

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
