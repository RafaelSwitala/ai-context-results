# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T18:30:00+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-002, BEH-002, BEH-004, ERRPATH-004, ERRPATH-010 | Android | `android-mobilebrowser/app/src/test/.../LoginValidationTest.java` | Robolectric + JUnit4 | Extrahierte `LoginActivity.isValid()`-Logik |
| LT-004, LT-005, LT-007, BEH-005, BEH-009, BEH-010, EC-002 | Android | `android-mobilebrowser/app/src/test/.../PreferencesUtilsLoginTest.java` | Robolectric + JUnit4 | Persistenz, URL-Builder, Settings/PIN-Gate-Inputs |
| BEH-013, BEH-018, EC-010 | Android | `android-mobilebrowser/app/src/test/.../StringUtilsLoginTest.java` | Robolectric + JUnit4 | Base64 Encode/Decode für Passwort |
| LT-006, EC-009, NAV-005 | Android | `android-mobilebrowser/app/src/test/.../LoginPinGateTest.java` | JUnit4 | PIN-Vergleich und Gate-Entscheidung |
| LT-001 (partial), BEH-005, EC-001, EC-002, ERRPATH-004 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/LoginUrlUtilsTests.swift` | XCTest | URL-Builder; Quellen erstellt, Target fehlt |
| LT-003 (partial), LT-007, BEH-009, BEH-010, STATE-001, STATE-003 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/LoginPreferencesUtilsTests.swift` | XCTest | Preferences-Persistenz; Quellen erstellt, Target fehlt |
| LT-006, BEH-012, EC-009 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/LoginPinValidationTests.swift` | XCTest | PIN-Logik; Quellen erstellt, Target fehlt |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-001, LT-003 (HTTP/Navigation) | Alamofire / UIAlertController / Segue | SKIP (UI + Netzwerk) | BEH-006, NAV-001: kein Activity-/HTTP-Mock in diesem Run |
| LT-004 (Navigation) | WebviewActivity Intent | SKIP | NAV-002: Robolectric-Activity-Test außerhalb Pure-Unit-Scope |
| LT-005 (Navigation) | LoginActivity / PinActivity / SettingsActivity | SKIP für Activity-Start; Logik via Preferences/PIN-Tests | NAV-003, NAV-004 |
| LT-006 (UI) | PinActivity / PinCodeViewController UI | Pure-Logic-Test für Vergleich; UI SKIP | PIN-Eingabe erfordert Activity |
| LT-007 (Integration) | App.onPause / AppDelegate.saveContext | Preferences-Flag-Test isoliert | Session-Cleanup (API-003) nicht gemockt |
| Android all | `PreferencesUtils.sharedpreferences` | `StorageConfigTestSupport` Reflection | Statisches Feld vor `App.onCreate` |
| iOS all | — | Keine Ausführung | ERR-P2-01: XCTest-Target fehlt |

## Production Changes

Keine fachlichen Produktionsänderungen. Bestehendes Test-Setup (`StorageConfigTestSupport`, `app/build.gradle` testDependencies) wiederverwendet.
