# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_2/22_legacy_test_implementation.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:15:54+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-018, LT-027 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParserTest.java | JUnit4 + Robolectric | Valid QR mapping, supported culture, invalid https fallback, unsupported culture fallback, invalid p-path. |
| LT-021, LT-022, LT-023, LT-024, LT-026 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | JUnit4 + Robolectric | Storage persistence, protocol bounds, URL scheme/client handling, Culture query, Douglas DNS migration. |
| LT-012, LT-013 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettingsTest.java | JUnit4 + Robolectric | Config file validity predicate covered; full App.updateSettingsOnVersionChanged branch not executed because ConfigFileLoader is static/asset-backed. |
| LT-006, LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigQRCodeParserTests.swift | XCTest | Prepared XCTest source for parser validity and HTTPS fallback; not added to xcodeproj target. |
| LT-011, LT-023, LT-024 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift | XCTest | Prepared XCTest source for URL helper behavior; not added to xcodeproj target. |
| LT-018, LT-021, LT-022, LT-026, LT-027 | Android | android-mobilebrowser/app/build.gradle | Gradle | Added junit:junit:4.13.2, androidx.test:core:1.7.0, org.robolectric:robolectric:4.14.1 as testImplementation dependencies. |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-018, LT-027 | App singleton language state | Seed App.getInstance().DefaulLocale and AvailableLanguages in @Before. | QRCodeParser depends on app language registry but test must remain deterministic. |
| LT-021, LT-022, LT-026 | SharedPreferences | Use ApplicationProvider test SharedPreferences and reflect it into PreferencesUtils.sharedpreferences. | PreferencesUtils stores a private static SharedPreferences reference initialized from App singleton. |
| LT-012, LT-013 | Android framework TextUtils | Robolectric shadows Android TextUtils. | ConfigFileSettings.isValid uses Android TextUtils in JVM unit tests. |
| LT-004, LT-005, LT-016, LT-017 | HTTP check-access | Not implemented in legacy Phase 2; documented as NOT_RUN. | Existing code calls Alamofire/HttpStatusUtil directly; deterministic unit tests would require production seam or static mocking not present in project. |

## Changed Files And Commands

| Type | Path/Command | Result | Notes |
|---|---|---|---|
| Test file | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParserTest.java | Added | Covers Android QR parse/culture/default branches. |
| Test file | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | Added | Covers Android storage, URL and protocol helper behavior. |
| Test file | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettingsTest.java | Added | Covers config file settings validity predicate. |
| Test file | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigQRCodeParserTests.swift | Added | Prepared XCTest source; not executable in current harness. |
| Test file | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift | Added | Prepared XCTest source; not executable in current harness. |
| Build config | android-mobilebrowser/app/build.gradle | Updated | Added testImplementation dependencies only; no production dependency changed. |
| Command | .\gradlew.bat testMobilebrowserDebugUnitTest | PASS | 11 tests, 0 failures, 0 errors, 0 skipped in mobilebrowserDebug. |
| Command | .\gradlew.bat test | PASS | 132 test executions across 12 Android variant tasks, 0 failures. |
| Command | xcodebuild -version | FAIL | xcodebuild is not available in this Windows environment. |
