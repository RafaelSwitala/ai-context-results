# Legacy Test Results

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_2/23_legacy_test_results.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:15:54+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | .\gradlew.bat testMobilebrowserDebugUnitTest | PASS | 10s | Targeted debug task; 11 tests, 0 failures. |
| Android | .\gradlew.bat tasks --all | PASS | 2s | No Jacoco/Coverage task listed; only unit-test tasks available. |
| Android | .\gradlew.bat test | PASS | 1m 4s | All unit-test variants; 132 executions, 0 failures, 0 errors, 0 skipped. |
| iOS | xcodebuild -version | FAIL | 6s | Command not found on Windows; project also has no XCTest target. |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | No executable test target | NOT_RUN | N/A | No XCTest target in MobileBrowserV2.xcodeproj and xcodebuild unavailable. | P1-A13: LT-001 |
| LT-002 | iOS | No executable test target | NOT_RUN | N/A | UI/controller save path requires XCTest target and dialog harness. | P1-A13: LT-002 |
| LT-003 | iOS | No executable test target | NOT_RUN | N/A | UI/controller save path requires XCTest target and dialog harness. | P1-A13: LT-003 |
| LT-004 | iOS | No executable test target | NOT_RUN | N/A | Alamofire HTTP behavior has no deterministic wrapper in legacy code and XCTest target is absent. | P1-A13: LT-004 |
| LT-005 | iOS | No executable test target | NOT_RUN | N/A | Alamofire HTTP behavior has no deterministic wrapper in legacy code and XCTest target is absent. | P1-A13: LT-005 |
| LT-006 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigQRCodeParserTests.swift | NOT_RUN | N/A | XCTest source prepared, but not wired to an executable target. | P1-A13: LT-006 |
| LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigQRCodeParserTests.swift | NOT_RUN | N/A | XCTest source prepared, but not wired to an executable target. | P1-A13: LT-007 |
| LT-008 | iOS | No executable test target | NOT_RUN | N/A | Camera metadata/controller path requires XCTest target and AVFoundation test harness. | P1-A13: LT-008 |
| LT-009 | iOS | No executable test target | NOT_RUN | N/A | Camera metadata/controller path requires XCTest target and AVFoundation test harness. | P1-A13: LT-009 |
| LT-010 | iOS | No executable test target | NOT_RUN | N/A | Navigation guard requires XCTest target/storyboard harness. | P1-A13: LT-010 |
| LT-011 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift | NOT_RUN | N/A | XCTest source prepared, but not wired to an executable target. | P1-A13: LT-011 |
| LT-012 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettingsTest.java | NOT_RUN | N/A | Full App.updateSettingsOnVersionChanged branch is private/static and asset-backed; only validity predicate was executed. | P1-A13: LT-012 |
| LT-013 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/ConfigFileSettingsTest.java | NOT_RUN | N/A | Full unchanged-preferences branch requires ConfigFileLoader asset variation; only invalid predicate cases were executed. | P1-A13: LT-013 |
| LT-014 | Android | No executable unit test | NOT_RUN | N/A | Protocol spinner assertion requires Activity/Robolectric UI setup beyond deterministic utility scope. | P1-A13: LT-014 |
| LT-015 | Android | No executable unit test | NOT_RUN | N/A | SettingsActivity validation methods are private and dialog assertions require Activity harness. | P1-A13: LT-015 |
| LT-016 | Android | No executable unit test | NOT_RUN | N/A | HttpStatusUtil is called directly; deterministic HTTP OK test needs wrapper/static mock not present. | P1-A13: LT-016 |
| LT-017 | Android | No executable unit test | NOT_RUN | N/A | HttpStatusUtil is called directly; deterministic non-OK test needs wrapper/static mock not present. | P1-A13: LT-017 |
| LT-018 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParserTest.java | PASS | 0.080s in mobilebrowserDebug class | N/A | P1-A13: LT-018 |
| LT-019 | Android | No executable unit test | NOT_RUN | N/A | QRCodeScannerActivity handle path requires Activity/dialog result harness. | P1-A13: LT-019 |
| LT-020 | Android | No executable unit test | NOT_RUN | N/A | LoginActivity navigation requires Activity/Robolectric intent harness and preference state. | P1-A13: LT-020 |
| LT-021 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | PASS | 0.387s in mobilebrowserDebug class | N/A | P1-A13: LT-021 |
| LT-022 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | PASS | 0.387s in mobilebrowserDebug class | N/A | P1-A13: LT-022 |
| LT-023 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | PASS | 0.387s in mobilebrowserDebug class | N/A | P1-A13: LT-023, API-004 |
| LT-023 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift | NOT_RUN | N/A | XCTest source prepared, but not wired to an executable target. | P1-A13: LT-023, API-002 |
| LT-024 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | PASS | 0.387s in mobilebrowserDebug class | N/A | P1-A13: LT-024, API-004 |
| LT-024 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/StorageConfigUrlUtilsTests.swift | NOT_RUN | N/A | XCTest source prepared, but not wired to an executable target. | P1-A13: LT-024, API-002 |
| LT-025 | iOS | No executable test target | NOT_RUN | N/A | URL encoding failure branch needs XCTest target; no xcodebuild available. | P1-A13: LT-025 |
| LT-026 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java | PASS | 0.387s in mobilebrowserDebug class | N/A | P1-A13: LT-026 |
| LT-027 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/QRCodeParserTest.java | PASS | 0.080s in mobilebrowserDebug class | N/A | P1-A13: LT-027 |
| LT-028 | Android | No executable unit test | NOT_RUN | N/A | Duplicate scan suppression lives in QRCodeScannerActivity state and needs Activity harness. | P1-A13: LT-028 |
| LT-029 | Cross | No executable unit test | NOT_RUN | N/A | License/session API belongs to dependency feature; Phase 1 marked API-005 outside storage-config unit scope. | P1-A13: LT-029, API-005 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A - no coverage task configured | N/A - no coverage task configured | N/A - no coverage task configured | N/A - no coverage task configured | Gradle unit tests without Jacoco task | android-mobilebrowser/app/build/reports/tests/testMobilebrowserDebugUnitTest/index.html |
| iOS | N/A - no executable test target | N/A - no executable test target | N/A - no executable test target | N/A - no executable test target | XCTest unavailable in environment | N/A |

## Execution Summary

| Metric | Value |
|---|---|
| Android generated test methods | 11 |
| Android variant executions | 132 |
| Android passrate | 100% for executed tests |
| iOS generated test methods | 6 prepared, 0 executed |
| Error IDs | ERR-P2-01 documented for missing iOS test target and missing Android coverage task; ERR-P2-03 documented for iOS command not available. |
