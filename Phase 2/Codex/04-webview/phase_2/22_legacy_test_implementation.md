# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T18:08:54+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-011; LT-012; LT-013; LT-014; LT-016; LT-018; LT-021; LT-022; LT-023; LT-025; LT-029 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewFeatureTest.java | JUnit4 + Robolectric | Adds 9 executable tests for URL handoff/source/fallback, WebView settings/headers, override behavior, page start/finish, login/about/barcode visibility, toolbar logout, lifecycle/back, resume auth guard and constants. |
| LT-001; LT-010; LT-025 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/WebviewFeatureTests.swift | XCTest | Adds deterministic seam tests for WEBVIEW URL prepare, ArticleScanner return URL and route constants. Local execution blocked by missing iOS toolchain/test target. |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-011; LT-012; LT-018; LT-022; LT-023 | Android preferences/auth | Test-specific SharedPreferences injected into `App` and `PreferencesUtils` via reflection | Isolates WebView URL source and valid-login guard state. |
| LT-012; LT-013; LT-014; LT-016; LT-018; LT-021; LT-023 | Android WebView | Robolectric `WebView`, `WebViewClient`, `ShadowWebView`, direct callback invocation | Verifies settings, headers, URL suppression, visibility and lifecycle without native renderer. |
| LT-022 | Android toolbar | Robolectric toolbar menu `performIdentifierAction` | Asserts logout effect without UI instrumentation. |
| LT-001; LT-010 | iOS route payloads | Direct `prepare(for:)` invocation with destination controllers | Verifies URL transfer and ScanResult construction without storyboard runtime. |

## Implementation Decisions

| Decision ID | Decision | Reason | Source | Alternatives |
|---|---|---|---|---|
| DEC-P2-WEBVIEW-001 | Android WebView behavior is tested through Robolectric callback seams | Phase 2 is unit scope and WebView renderer/device is not required for URL/settings assertions | P1-A15 Android harness; TEST-001 | Connected instrumentation tests for full renderer behavior. |
| DEC-P2-WEBVIEW-002 | SSL, HTTP/resource error dialog, barcode permission and scanner branches are documented as skipped where local seams are unsafe | These require `SslErrorHandler`, permission APIs, native WebView callback state or CameraX runtime | LT-015; LT-017; LT-019; LT-020; LT-024; DEP-006 | Extract classifier/permission/error services or add instrumentation tests. |
| DEC-P2-WEBVIEW-003 | iOS tests are seam files and marked `NOT_RUN` locally | Windows environment lacks Xcode/Swift and project lacks XCTest target | P1-A15 iOS harness | Mutating `project.pbxproj` to add a test target would still not make tests executable here. |
