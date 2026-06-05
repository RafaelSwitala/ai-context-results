# Legacy Test Results

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T18:30:00+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest --tests "de.onlinesoftwareag.boa.mobilebrowser4android.utility.StringUtilsLoginTest" --tests "...PreferencesUtilsLoginTest" --tests "...LoginValidationTest" --tests "...LoginPinGateTest"` | SUCCESS (20/20) | ~6s | Run-ID 20260602-1703, Windows, JDK 17 |
| iOS | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | NOT_RUN | — | Kein XCTest-Target; Windows-Host ohne Xcode (ERR-P2-01) |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | LoginUrlUtilsTests.swift | NOT_RUN | — | UI/HTTP-Validierung nicht unit-testbar; URL-Teil implementiert | P1-A13 |
| LT-001 | iOS | — | SKIP | — | Empty username/password Guard in LoginViewController — UI-Test | ERRPATH-001, ERRPATH-002 |
| LT-002 | Android | LoginValidationTest.java | PASS | <1s | `loginValidation_rejectsEmptyUsername`, `loginValidation_rejectsInvalidSettings` | |
| LT-002 | Android | LoginValidationTest.java | PASS | <1s | `loginValidation_acceptsValidSettingsAndUsername` | |
| LT-003 | iOS | LoginPreferencesUtilsTests.swift | NOT_RUN | — | XCTest-Target fehlt (ERR-P2-01) | implementiert |
| LT-003 | iOS | — | SKIP | — | HTTP 200 + Segue WEBVIEW — Integration | BEH-006, NAV-001 |
| LT-004 | Android | PreferencesUtilsLoginTest.java | PASS | <1s | `saveLoginPreferences_persistsEncodedPasswordAndValidLoginFlag` | partial (ohne WebView) |
| LT-004 | Android | StringUtilsLoginTest.java | PASS | <1s | `encodeBase64_roundTripsPlainPassword` | |
| LT-004 | Android | — | SKIP | — | WebviewActivity Intent-Start | NAV-002 |
| LT-005 | Android | PreferencesUtilsLoginTest.java | PASS | <1s | `getLoginPreferences_pinPresentWhenStored`, `pinEmptyRoutesToSettings` | partial |
| LT-005 | iOS | LoginPinValidationTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-005 | Cross | — | SKIP | — | Activity-Navigation Login→Settings/PIN | NAV-003, NAV-004 |
| LT-006 | Android | LoginPinGateTest.java | PASS | <1s | `pinValidation_acceptsExactMatch`, `pinValidation_rejectsMismatch`, `pinValidation_acceptsLeadingZero` | |
| LT-006 | iOS | LoginPinValidationTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-006 | Cross | — | SKIP | — | PIN-UI Reset bei Mismatch | ERRPATH-007, UI-003, UI-004 |
| LT-007 | Android | PreferencesUtilsLoginTest.java | PASS | <1s | `saveValidLoginPreference_falseOnLogout` | partial |
| LT-007 | iOS | LoginPreferencesUtilsTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-007 | Cross | — | SKIP | — | Session-Cleanup API-003 bei Logout | API-003 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A | N/A | N/A | N/A | JaCoCo nicht konfiguriert | — |
| iOS | N/A | N/A | N/A | N/A | Tests nicht ausgeführt | — |

**Manuell abgedeckte Produktionsklassen (Android):** `StringUtils` (encode/decode), `PreferencesUtils` (saveLoginPreferences, saveValidLoginPreference, hasValidLoginPreference, hasValidSettingsPreference, buildLoginUrl, buildLoginUrlFromPreferences, getLoginPreferences), extrahierte Validierungslogik aus `LoginActivity.isValid()`.

**Schätzung:** Login-Persistenz, URL-Builder und Validierungs-Gates ~70 % der testbaren Pure-Logic; HTTP-Login-Flow, Activity-Navigation und PIN-UI <30 %.
