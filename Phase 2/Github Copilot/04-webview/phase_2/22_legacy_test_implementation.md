# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_2/22_legacy_test_implementation.md |
| Status | READY_FOR_REVIEW |
| Created by | GitHub Copilot |
| Last updated | 2026-06-04 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-001, LT-002, LT-011, LT-012 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewNavigationTest.java | JUnit 4 + Mockito | Tests WebView URL passing and Intent extras |
| LT-003, LT-013, LT-014, LT-021 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewLoadTest.java | JUnit 4 + Mockito | Tests WebView loading, settings, and visibility |
| LT-006, LT-016, LT-019, LT-024 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewUrlClassificationTest.java | JUnit 4 + Mockito | Tests URL classification (barcode, login, scanner returns) |
| LT-004, LT-012, LT-017, LT-020 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewErrorHandlingTest.java | JUnit 4 + Mockito | Tests error handling, empty URL, SSL errors |
| LT-007, LT-008, LT-015, LT-018, LT-022, LT-023 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewSessionTest.java | JUnit 4 + Mockito | Tests logout, session expiry, lifecycle, toolbar |
| LT-025, LT-026, LT-030 | Cross | Cross-platform tests deferred to Phase 4 | RN Jest | URL classifier constants and sensitive data handling |
| LT-001-LT-010, LT-026, LT-030 | iOS | MobileBrowserV2/MobileBrowserV2Tests/WebViewNavigationTest.swift | XCTest | Tests iOS WebView URL passing and delegates (Phase 2 setup limitation documented) |
| LT-003-LT-009, LT-012 | iOS | MobileBrowserV2/MobileBrowserV2Tests/WebViewLoadAndErrorTest.swift | XCTest | Tests iOS WebView loading and error handling (Phase 2 setup limitation documented) |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-001, LT-011, LT-012 | Intent extras and SharedPreferences | Mock Intent.getStringExtra() and SharedPreferences reads | Avoid disk I/O and Activity lifecycle during tests |
| LT-003, LT-013, LT-014 | WKWebView/WebView loading callbacks | Mock WKWebView delegate methods and WebViewClient | Test URL decision logic without real network calls |
| LT-004, LT-012 | URL empty state | Direct string checks (no mock needed) | Validate fallback logic |
| LT-006, LT-016, LT-019 | URL classification (barcode, login, error schemes) | Mock URL parsing and pattern matching | Test route decisions without WebView rendering |
| LT-007, LT-008, LT-018 | Login form and valid-login state | Mock JavaScript evaluation and SharedPreferences writes | Test session expiry detection |
| LT-015 | SSL error handling | Mock onReceivedSslError callback and protocol preference | Test security decision logic |
| LT-017, LT-020 | Error dialogs and LoginActivity start | Mock error callback and Intent firing | Test error UX without UI framework |
| LT-022, LT-023 | Toolbar clicks and lifecycle callbacks | Mock button listeners and Android lifecycle methods | Test lifecycle cleanup and logout |
| LT-024 | Barcode scanner return URL | Mock scanner result handling | Test return URL construction |
| LT-030 | URL logging and sensitive data | Assert no sensitive strings in logs or route params | Verify security practices |

## Build Configuration Changes

No changes to production code. Test dependencies verified in `app/build.gradle`:
- JUnit 4.13.2
- Mockito Core 4.8.0
- Robolectric 4.x (optional for Activity shadowing)

iOS: No test target exists in legacy codebase. Phase 2 recognizes this as infrastructure gap (ERR-P2-01) and documents expected test seams rather than full implementation.

## Implementation Notes

### Android

**Test Architecture:** 5 focused test classes covering distinct WebView behaviors

1. **WebViewNavigationTest** - URL passing (LT-001, LT-011, LT-012)
   - Mock Intent.getStringExtra() for URL extras
   - Verify storage reads for empty URL fallback

2. **WebViewLoadTest** - Settings and loading state (LT-003, LT-013, LT-014, LT-021)
   - Mock WKWebView/WebView lifecycle callbacks
   - Assert settings (no-cache, user-agent, zoom, multiple-window)
   - Verify loading state toggles on start/finish

3. **WebViewUrlClassificationTest** - URL routing (LT-006, LT-016, LT-019, LT-024)
   - Mock shouldOverrideUrlLoading for barcode/login/normal URLs
   - Test return URL construction from scanner results
   - Verify permission-based routing (barcode denied fallback)

4. **WebViewErrorHandlingTest** - Error paths (LT-004, LT-012, LT-017, LT-020)
   - Mock error callbacks (HTTP errors, SSL errors, resource errors)
   - Test error dialog mapping and LoginActivity intent
   - Verify empty URL triggers LoginActivity

5. **WebViewSessionTest** - Session and lifecycle (LT-007, LT-008, LT-015, LT-018, LT-022, LT-023)
   - Mock login form detection (login.aspx in JavaScript/URL)
   - Test logout action and valid-login state change
   - Verify lifecycle cleanup (pause, resume invalid, back, destroy)

**Pre-flight recovery (ERR-P2-01):** Standard JUnit infrastructure operational.

### iOS

**Infrastructure limitation (ERR-P2-01):** MobileBrowserV2.xcodeproj has no test target.
- Phase 2 defines expected test seams around WKWebView delegates and URL classification
- Full test implementation blocked; Phase 5 will validate via RN equivalence

## Mapping to Phase 1

Each implemented test class maps to behavior categories from P1-A13. Test naming follows source ID grouping for traceability.
