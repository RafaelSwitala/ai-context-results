# Legacy Test Results

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:39:04+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | FAIL | 16s | First run after adding activity tests failed because Robolectric did not load Android resources/manifest. Recovery: added `testOptions.unitTests.includeAndroidResources=true` (`ERR-P2-01`). |
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | PASS | 19s | 17 tests passed after resource recovery; intermediate run used to verify recovery. Raw report: android-mobilebrowser/app/build/reports/tests/testMobilebrowser_defaultDebugUnitTest/index.html |
| Android | `.\gradlew.bat tasks --all` | PASS | 3s | Used to check for coverage tasks; no Jacoco or coverage report task is defined. |
| iOS | `Get-Command xcodebuild` | FAIL | <1s | `xcodebuild` is not installed in this Windows environment; iOS test execution is `NOT_RUN`. |
| iOS | `Get-Command swift` | FAIL | <1s | `swift` is not installed in this Windows environment; iOS syntax/test execution is `NOT_RUN`. |
| iOS | `rg -n "MobileBrowserV2Tests\|PBXNativeTarget\|XCTest" ios-mobilebrowser/MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj` | PASS | <1s | Project file shows only the `MobileBrowserV2` native target and no XCTest target entries; local iOS execution remains `N/A`. |
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | PASS | 16s | Final verification after narrowing LT-004 to the Phase-1 core case; 17 tests passed. Raw XML: android-mobilebrowser/app/build/test-results/testMobilebrowser_defaultDebugUnitTest/TEST-de.onlinesoftwareag.boa.mobilebrowser4android.LoginFeatureTest.xml |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable locally (`xcodebuild` and `swift` missing); no XCTest target found in project file | P1-A13 LT-001; P1-A15 input validation tests |
| LT-002 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | PASS | 0.554s | N/A | P1-A13 LT-002; P1-A15 input validation tests |
| LT-003 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable locally; success flow file added but not executable here | P1-A13 LT-003; P1-A15 login success tests |
| LT-004 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | PASS | 0.338s | N/A | P1-A13 LT-004; P1-A15 login success tests |
| LT-005 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable locally; settings-gate test file added but not executable here | P1-A13 LT-005; P1-A15 navigation assertions |
| LT-005 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | PASS | 0.678s; 7.882s | N/A | P1-A13 LT-005; P1-A15 navigation assertions |
| LT-006 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable locally; PIN test file added but not executable here | P1-A13 LT-006; P1-A15 PIN tests |
| LT-006 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | PASS | 1.309s | N/A | P1-A13 LT-006; P1-A15 PIN tests |
| LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable locally; logout test file added but not executable here | P1-A13 LT-007; P1-A15 logout tests |
| LT-007 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | PASS | 0.220s | N/A | P1-A13 LT-007; P1-A15 logout tests |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | Gradle task discovery via `.\gradlew.bat tasks --all` | N/A - no coverage report generated |
| iOS | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | `xcodebuild`/`swift` unavailable; no XCTest target in project file | N/A - no coverage report generated |
