# Legacy Test Results

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T18:08:54+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest` | PASS | 32s | Final Android run passed 37/37 unit tests; WebView subset passed 9/9. Raw XML: android-mobilebrowser/app/build/test-results/testMobilebrowser_defaultDebugUnitTest/TEST-de.onlinesoftwareag.boa.mobilebrowser4android.WebviewFeatureTest.xml |
| Android | `.\gradlew.bat tasks --all` | PASS | 2s | Used for coverage task discovery; no Jacoco/coverage task is configured. |
| iOS | `Get-Command xcodebuild` | FAIL | <1s | `xcodebuild` is unavailable in this Windows environment; iOS tests are `NOT_RUN`. |
| iOS | `Get-Command swift` | FAIL | <1s | `swift` is unavailable in this Windows environment; iOS tests are `NOT_RUN`. |
| iOS | `rg -n "MobileBrowserV2Tests\|PBXNativeTarget\|XCTest" ios-mobilebrowser/MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj` | PASS | <1s | Project file shows only the app native target and no XCTest target. |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | iOS toolchain unavailable and no XCTest target exists | P1-A13 LT-001 |
| LT-002 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | Storyboard child embedding requires iOS runtime; no local XCTest target | P1-A13 LT-002 |
| LT-003 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | WKWebView runtime unavailable locally | P1-A13 LT-003 |
| LT-004 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | WKWebView runtime unavailable locally | P1-A13 LT-004 |
| LT-005 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | MBProgressHUD/WKNavigationDelegate runtime unavailable locally | P1-A13 LT-005 |
| LT-006 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | WKNavigationAction runtime unavailable locally | P1-A13 LT-006 |
| LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | WKWebView JavaScript/navigation runtime unavailable locally | P1-A13 LT-007 |
| LT-008 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | iOS action sheet/delete callback runtime unavailable locally | P1-A13 LT-008 |
| LT-009 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | WKWebView lifecycle cleanup runtime unavailable locally | P1-A13 LT-009 |
| LT-010 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | iOS seam file added but not executable locally | P1-A13 LT-010 |
| LT-011 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.365s | N/A | P1-A13 LT-011 |
| LT-012 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.263s | N/A | P1-A13 LT-012 |
| LT-013 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.177s | N/A | P1-A13 LT-013 |
| LT-014 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.199s | N/A | P1-A13 LT-014 |
| LT-015 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | Constructing reliable `SslErrorHandler` proceed/cancel assertions is not exposed by local Robolectric seams | P1-A13 LT-015 |
| LT-016 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.169s | N/A | P1-A13 LT-016 |
| LT-017 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | HTTP/resource error dialog branch requires WebResource request/response plumbing not stable in local unit seam | P1-A13 LT-017 |
| LT-018 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.332s | N/A | P1-A13 LT-018 |
| LT-019 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | Camera permission branch requires native permission state and scanner route runtime | P1-A13 LT-019 |
| LT-020 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | Error URL dialog branch is coupled to Android error dialog mapping; route token covered in LT-025 | P1-A13 LT-020 |
| LT-021 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.332s | N/A | P1-A13 LT-021 |
| LT-022 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.175s | N/A | P1-A13 LT-022 |
| LT-023 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.183s; 0.175s | N/A | P1-A13 LT-023 |
| LT-024 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | BarcodeScannerActivity route depends on CameraX/scanner lifecycle; ScanResult constant covered in LT-025 | P1-A13 LT-024 |
| LT-025 | Cross | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java; ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | PASS | 0.078s Android; iOS NOT_RUN | Android constants passed; iOS unavailable | P1-A13 LT-025 |
| LT-026 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | NOT_RUN | N/A | iOS WKNavigationAction seam unavailable locally | P1-A13 LT-026 |
| LT-027 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | Duplicate resource error requires stable WebResourceError callback plumbing | P1-A13 LT-027 |
| LT-028 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | 20s timeout body is intentionally inactive and would only slow unit suite | P1-A13 LT-028 |
| LT-029 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | PASS | 0.332s | N/A | P1-A13 LT-029 |
| LT-030 | Cross | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift; android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | SKIP | N/A | No WebView logging seam exists in legacy code; sensitive constants/routes documented | P1-A13 LT-030 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | N/A - no Gradle coverage/Jacoco task is configured | Gradle task discovery via `.\gradlew.bat tasks --all` | N/A - no coverage report generated |
| iOS | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | N/A - iOS tests not executable in this Windows environment | `xcodebuild`/`swift` unavailable; no XCTest target in project file | N/A - no coverage report generated |
