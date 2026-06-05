# Legacy Test Results

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:50:19+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | FAIL | 3s | First navigation compile attempt failed because the test used protected Robolectric shadow methods for Login back behavior. Test was corrected to observable no-navigation/no-finish assertions. |
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | PASS | 20s | Final run passed: 28/28 Android unit tests, including 11/11 `NavigationFeatureTest` tests. Raw XML: android-mobilebrowser/app/build/test-results/testMobilebrowser_defaultDebugUnitTest/TEST-de.onlinesoftwareag.boa.mobilebrowser4android.NavigationFeatureTest.xml |
| Android | `.\gradlew.bat tasks --all` | PASS | 2s | Coverage task discovery; no Jacoco or Gradle coverage task is configured. |
| iOS | `Get-Command xcodebuild` | FAIL | <1s | `xcodebuild` is not installed in this Windows environment; iOS test execution is `NOT_RUN`. |
| iOS | `Get-Command swift` | FAIL | <1s | `swift` is not installed in this Windows environment; iOS syntax/test execution is `NOT_RUN`. |
| iOS | `rg -n "MobileBrowserV2Tests\|PBXNativeTarget\|XCTest" ios-mobilebrowser/MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj` | PASS | <1s | Project file exposes only the `MobileBrowserV2` native target and no XCTest target. |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable and no XCTest target exists | P1-A13 LT-001; P1-A15 iOS harness |
| LT-002 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable and no XCTest target exists | P1-A13 LT-002; P1-A15 iOS harness |
| LT-003 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable and no XCTest target exists | P1-A13 LT-003; P1-A15 iOS harness |
| LT-004 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | Storyboard child embedding requires UIKit runtime; local iOS execution unavailable | P1-A13 LT-004; DEP-001 |
| LT-005 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | WKWebView foreground/load behavior requires iOS runtime; local iOS execution unavailable | P1-A13 LT-005; DEP-002 |
| LT-006 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | WebView logout action sheet/delete callback requires iOS runtime; local iOS execution unavailable | P1-A13 LT-006; DEP-002 |
| LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | WKNavigationAction construction requires iOS runtime; local iOS execution unavailable | P1-A13 LT-007; DEP-002 |
| LT-008 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | WKWebView JavaScript callback requires iOS runtime; local iOS execution unavailable | P1-A13 LT-008; ERRPATH-003 |
| LT-009 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | AVFoundation metadata callback requires iOS runtime; local iOS execution unavailable | P1-A13 LT-009; DEP-003 |
| LT-010 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable; seam test file added | P1-A13 LT-010; NAV-008 |
| LT-011 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.430s; 0.473s | N/A | P1-A13 LT-011; P1-A15 Android harness |
| LT-012 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.273s | N/A | P1-A13 LT-012 |
| LT-013 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | PopupMenu item selection is not stably exposed through local Robolectric without UI instrumentation | P1-A13 LT-013; BEH-015 |
| LT-014 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.239s | N/A | P1-A13 LT-014 |
| LT-015 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.406s | N/A | P1-A13 LT-015 |
| LT-016 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | CameraX/MLKit scanner Activity lifecycle is hardware/runtime-heavy; QR result path is covered through Settings `onActivityResult` and QR parser tests | P1-A13 LT-016; DEP-006 |
| LT-017 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.127s; 0.163s | N/A | P1-A13 LT-017 |
| LT-018 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | WebViewClient barcode permission branch depends on native WebView callback plus camera permission state; route constants and WebView load are covered | P1-A13 LT-018; SEC-003 |
| LT-019 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.148s; 0.309s | N/A | P1-A13 LT-019 |
| LT-020 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | BarcodeScannerActivity depends on CameraX/MLKit lifecycle; route constants and auth guard requirements documented | P1-A13 LT-020; DEP-006 |
| LT-021 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.764s | N/A | P1-A13 LT-021 |
| LT-022 | Cross | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java; ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | PASS | 0.056s Android; iOS NOT_RUN | iOS toolchain unavailable; Android constants passed | P1-A13 LT-022 |
| LT-023 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | NOT_RUN | N/A | WKNavigationAction seam not executable locally | P1-A13 LT-023 |
| LT-024 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | Duplicate scanner code guard is inside private CameraX/MLKit handler; not safely invoked without scanner runtime | P1-A13 LT-024 |
| LT-025 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | PASS | 0.309s | N/A | P1-A13 LT-025 |
| LT-026 | Cross | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift; android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | iOS not executable; Android barcode scanner invalid-auth guard is CameraX scanner runtime path; WebView invalid-auth guard passed under LT-019 | P1-A13 LT-026 |
| LT-027 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | SKIP | N/A | Camera permission denial branch requires WebView callback plus permission state; documented as follow-up instrumentation seam | P1-A13 LT-027 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | Gradle task discovery via `.\gradlew.bat tasks --all` | N/A - no coverage report generated |
| iOS | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | `xcodebuild`/`swift` unavailable; no XCTest target in project file | N/A - no coverage report generated |
