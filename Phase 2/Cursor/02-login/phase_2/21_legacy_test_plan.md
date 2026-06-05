# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T18:30:00+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | leeres username oder password Feld | `LoginButtonTouchUp` | korrekte Fehlermeldung, kein Request, kein State-Update | EP-001, BEH-002, BEH-003, ERRPATH-001, ERRPATH-002 | P0 |
| LT-002 | Android | `hasValidSettings=false` oder username leer | Login-Button gedrückt | generic error, keine Navigation zu WebView | EP-002, BEH-002, BEH-004, ERRPATH-004, ERRPATH-010 | P0 |
| LT-003 | iOS | valid settings + credentials + HTTP 200 ohne errorCode | Login ausgeführt | `saveLoginPreferences`, `saveValidLoginPreference(true)`, segue WEBVIEW | BEH-009, BEH-010, STATE-001, NAV-001, STOR-001..STOR-003 | P0 |
| LT-004 | Android | valid settings + credentials | Login-Button | encoded password wird gespeichert, hasValidLogin=true, WebviewActivity gestartet | BEH-018, BEH-020, BEH-021, STATE-002, NAV-002, STOR-006..STOR-008 | P0 |
| LT-005 | Cross | hasValidSettings=false und variierender pin | Login screen init / settings tap | Route zu PIN falls pin gesetzt, sonst Settings | BEH-004, BEH-016, NAV-003, NAV-004 | P1 |
| LT-006 | Cross | gespeicherter pin=1234 | PIN-Eingabe 1234 bzw. abweichend | bei Match Settings-Zugriff, bei Mismatch Fehler+Reset | BEH-012, BEH-024, NAV-005, ERRPATH-007, ERRPATH-012 | P1 |
| LT-007 | Cross | hasValidLogin=true | App geht in Hintergrund | hasValidLogin=false gespeichert | BEH-007, STATE-003, STATE-004 | P0 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14 | `StorageConfigTestSupport` für `App` + `PreferencesUtils.sharedpreferences` | Bestehendes Test-Setup aus storage-config Phase 2 wiederverwendet |
| iOS | XCTest (Quellen erstellt) | Keine Netzwerk-Mocks für URL/Preferences-Tests | ERR-P2-01: Kein XCTest-Target im `.xcodeproj`; Ausführung auf macOS/Xcode |
