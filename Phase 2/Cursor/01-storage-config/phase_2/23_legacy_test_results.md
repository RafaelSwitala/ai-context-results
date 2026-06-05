# Legacy Test Results

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Codex / Composer |
| Last updated | 2026-06-04T16:45:00+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest --tests "de.onlinesoftwareag.boa.mobilebrowser4android.utility.*"` | SUCCESS (14/14) | ~6s | Run-ID 20260602-1620, Windows, JDK 17 |
| Android | `.\gradlew.bat test` (full) | NOT_RUN | — | Nur storage-config Utility-Scope ausgeführt |
| iOS | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | NOT_RUN | — | Kein XCTest-Target; Windows-Host ohne Xcode (ERR-P2-01) |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | — | NOT_RUN | — | Kein XCTest-Target / UI-Test | P1-A13 |
| LT-002 | iOS | — | NOT_RUN | — | Kein XCTest-Target / UI-Test | P1-A13 |
| LT-003 | iOS | — | NOT_RUN | — | Kein XCTest-Target / UI-Test | P1-A13 |
| LT-004 | iOS | — | NOT_RUN | — | HTTP/UI; nicht implementiert | P1-A13 |
| LT-005 | iOS | — | NOT_RUN | — | HTTP/UI; nicht implementiert | P1-A13 |
| LT-006 | iOS | StorageConfigQRCodeParserTests.swift | NOT_RUN | — | XCTest-Target fehlt (ERR-P2-01) | implementiert |
| LT-007 | iOS | StorageConfigQRCodeParserTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-008 | iOS | StorageConfigQRCodeParserTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-009 | iOS | — | NOT_RUN | — | Scanner-UI | P1-A13 |
| LT-010 | iOS | — | NOT_RUN | — | Navigation-UI | P1-A13 |
| LT-011 | iOS | StorageConfigUrlUtilsTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-012 | Android | ConfigFileSettingsTest.java | PASS | <1s | Nur Validierungslogik, nicht `App.updateSettingsOnVersionChanged` | partial |
| LT-013 | Android | ConfigFileSettingsTest.java | PASS | <1s | `isValid_rejectsMissingServer` | partial |
| LT-014 | Android | — | SKIP | — | SettingsActivity UI | P1-A13 |
| LT-015 | Android | — | SKIP | — | SettingsActivity UI | P1-A13 |
| LT-016 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `httpStatusUtil_okBranchMatchesSaveGate` (OK-Gate) | partial |
| LT-017 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | non-OK via `isOkHttpStatusCode(500)` | partial |
| LT-018 | Android | QRCodeParserTest.java | PASS | <1s | `parse_mapsValidSettings`, culture | |
| LT-019 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | Normalisierung + Parse; Scanner-UI SKIP | partial |
| LT-020 | Android | — | SKIP | — | LoginActivity navigation | P1-A13 |
| LT-021 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `buildLoginUrl_includesCulture` | |
| LT-022 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `replaceDouglasServerName_migratesOldDns` | |
| LT-023 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `buildLoginUrl_doesNotDoubleScheme` | |
| LT-024 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `buildLoginUrl_allowsEmptyClient` | |
| LT-025 | iOS | StorageConfigUrlUtilsTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-026 | Android | PreferencesUtilsStorageConfigTest.java | PASS | <1s | `saveProtocolPreference_ignoresOutOfRange` | |
| LT-027 | Android | QRCodeParserTest.java | PASS | <1s | `parse_fallsBackCultureWhenNotListed` | |
| LT-028 | Android | — | SKIP | — | Activity duplicate-scan | P1-A13 |
| LT-029 | Cross | — | SKIP | — | License dependency | P1-A13 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A | N/A | N/A | N/A | JaCoCo nicht konfiguriert | — |
| iOS | N/A | N/A | N/A | N/A | Tests nicht ausgeführt | — |

**Manuell abgedeckte Produktionsklassen (Android):** `QRCodeParser`, `QRCodeSettings`, `ConfigFileSettings`, `PreferencesUtils` (buildLoginUrl, saveProtocolPreference, replaceDouglasServerName, getLocale/saveLocale), `HttpStatusUtil.isOkHttpStatusCode`.

**Schätzung:** Parser/URL-Pfade ~80 %+ der testbaren Pure-Logic; Activity/HTTP-Integration <20 %.
