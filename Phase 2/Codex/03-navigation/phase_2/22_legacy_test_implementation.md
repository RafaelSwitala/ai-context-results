# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:50:19+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-011; LT-012; LT-014; LT-015; LT-017; LT-019; LT-021; LT-022; LT-025 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/NavigationFeatureTest.java | JUnit4 + Robolectric | Adds 11 executable tests for Login guard/settings icon, Login to WebView payload, Login back no-navigation behavior, Settings QR route/result, WebView empty/load/auth/logout/back, PIN routes and constants. |
| LT-001; LT-002; LT-003; LT-010; LT-022 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/NavigationFeatureTests.swift | XCTest | Adds deterministic seam tests for Login settings guard, PIN unwind, WebView prepare URL, ArticleScanner return URL and route constants. Not locally executed because iOS toolchain/target is unavailable. |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-011; LT-012; LT-015; LT-017; LT-019; LT-021 | Android preferences | Test-specific SharedPreferences injected into `App` and `PreferencesUtils` | Makes guard and payload assertions deterministic; source IDs STOR-002 and STOR-003. |
| LT-011; LT-012; LT-015; LT-017; LT-019; LT-021 | Android navigation | Robolectric `ShadowActivity`, started intents and activity lifecycle calls | Verifies route targets/extras without device/emulator; source IDs NAV-009, NAV-010, NAV-012, NAV-013, NAV-015, NAV-018. |
| LT-017; LT-019; LT-025 | Android WebView | Robolectric `ShadowWebView` and direct lifecycle/back invocation | Verifies URL load headers and auth/back behavior without native renderer; source IDs API-002, BEH-020 and BEH-024. |
| LT-001; LT-002 | iOS segues | Recording `LoginViewController` subclass overrides `performSegue` | Captures segue IDs without storyboard runtime; source IDs NAV-001 and NAV-002. |
| LT-003; LT-010 | iOS route payloads | Direct `prepare(for:)` calls with destination controllers | Verifies URL transfer and `ScanResult` construction without launching UI; source IDs NAV-003 and NAV-008. |

## Implementation Decisions

| Decision ID | Decision | Reason | Source | Alternatives |
|---|---|---|---|---|
| DEC-P2-NAV-001 | Android tests target `mobilebrowser_defaultDebug` unit tests with Robolectric | Matches existing project setup and Phase-2 unit scope | TEST-001; TEST-002; P1-A15 Android harness | Instrumentation tests would require device/emulator and exceed local unit scope. |
| DEC-P2-NAV-002 | Scanner frame recognition is not forced through CameraX/MLKit in unit tests | Phase 1 permits mocked camera/WebView rendering; CameraX provider is hardware/runtime-heavy | P1-A15 mocking; DEP-003; DEP-006 | Device tests or refactoring scanner handlers into pure route services. |
| DEC-P2-NAV-003 | iOS tests are written as XCTest seam files but recorded as `NOT_RUN` | Windows environment lacks Xcode/Swift and project has no XCTest target | P1-A15 iOS harness; VAL-P2-02 | Creating an Xcode test target in `project.pbxproj` would be broad project mutation and still not executable here. |
| DEC-P2-NAV-004 | Android license popup route is planned but not asserted through `PopupMenu` internals | Robolectric does not expose a stable PopupMenu item-click path for this project without UI instrumentation | LT-013; BEH-015; NAV-014 | Add an extracted route handler in production later, or cover with instrumentation/UI test. |
