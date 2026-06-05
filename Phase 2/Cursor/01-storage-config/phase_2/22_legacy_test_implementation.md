# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Codex / Composer |
| Last updated | 2026-06-04T16:45:00+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-006, LT-007, LT-018, LT-027, LT-019 (parse) | Android | `android-mobilebrowser/app/src/test/.../QRCodeParserTest.java` | Robolectric + JUnit4 | `QRCodeParser.parse` |
| LT-021, LT-022, LT-023, LT-024, LT-026, LT-016/017 (gate) | Android | `android-mobilebrowser/app/src/test/.../PreferencesUtilsStorageConfigTest.java` | Robolectric + JUnit4 | URL builder, Douglas migration, protocol guard, HTTP OK gate |
| LT-012, LT-013 (validity) | Android | `android-mobilebrowser/app/src/test/.../ConfigFileSettingsTest.java` | Robolectric + JUnit4 | `ConfigFileSettings.isValid` |
| LT-006, LT-007, LT-008 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigQRCodeParserTests.swift` | XCTest | Quellen erstellt, Target fehlt |
| LT-011, LT-023, LT-024, LT-025 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift` | XCTest | Quellen erstellt, Target fehlt |
| — | Android/iOS | `android-mobilebrowser/app/build.gradle` | Gradle | `testImplementation` JUnit, Mockito, Robolectric; `unitTests.includeAndroidResources` |
| — | Android | `.../StorageConfigTestSupport.java` | — | Injiziert `App` + `PreferencesUtils.sharedpreferences` |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-004, LT-005, LT-016, LT-017 | HTTP / Alamofire / HttpStatusUtil network | Nicht in Activity-Tests; Android prüft `HttpStatusUtil.isOkHttpStatusCode` isoliert | API-001/003: kein echter Server |
| LT-001–LT-003, LT-010, LT-014, LT-015, LT-020 | UI / ViewController / Activity | SKIP (kein Robolectric-Activity-Test in diesem Run) | Kamera/UI außerhalb Pure-Unit-Scope |
| LT-012 (integration) | `ConfigFileLoader` / Assets | SKIP Integration; nur `ConfigFileSettings.isValid` | Asset-Flavor-abhängig |
| LT-028 | QR Scanner duplicate | SKIP | Benötigt Activity-State |
| LT-029 | License API | SKIP | Dependency-Feature (API-005) |
| Android all | `PreferencesUtils.sharedpreferences` | Reflection + Robolectric `SharedPreferences` | Produktions-Bug: statisches Feld wird vor `App.onCreate` geladen |
| iOS all | — | Keine Ausführung | ERR-P2-01: XCTest-Target fehlt |

## Production Changes

Keine fachlichen Produktionsänderungen. Nur Test- und Build-Konfiguration in `app/build.gradle`.
