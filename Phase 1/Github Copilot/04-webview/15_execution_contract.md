# Execution Contract

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:00:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| iOS Test Suite | XCTest suite with 9 test cases covering all WKWebView navigation, loading, error handling | LT-001 through LT-009 |
| Android Test Suite | JUnit suite with 8 test cases covering all WebView loading, interception, SSL handling | LT-010 through LT-017 |
| Mock WebView | Mock WKWebView and Android WebView for unit tests | BEH-001 through BEH-011 |
| Mock Navigation | Mock decidePolicyFor / shouldOverrideUrlLoading for URL interception tests | BEH-003, BEH-004, BEH-008 |
| Mock JavaScript | Mock evaluateJavaScript callbacks | BEH-002 |
| Mock PreferencesUtils | Mock session validation and URL building | EP-005, STOR-* |
| Coverage Target | ≥85% code coverage for WebView-related classes | All BEH-*, EP-* |
| Edge Cases | Test 10 edge cases (invalid URLs, timeouts, SSL errors, etc.) | EC-001 through EC-010 |
| Loading UI | Test progress bar/HUD show/hide | UI-*, BEH-011 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| WebviewScreen.tsx | Main screen component; manages URL state and WebView lifecycle | MAP-001, EP-001, EP-003 |
| WebViewWrapper.tsx | Abstraction component wrapping react-native-webview; platform-specific props | MAP-002, BEH-001, BEH-006 |
| useWebViewSettings hook | Apply WebSettings (JS enabled, cache mode, DOM storage, etc.) | MAP-003, BEH-007 |
| WebViewLoader.tsx | Loading indicator component; show during load | MAP-004, UI-* |
| navigationService.ts | URL interception for barcode/login detection | MAP-100, BEH-003, BEH-004, BEH-008 |
| sessionService.ts | Session validation on app foreground | MAP-101, EP-005, STATE-008 |
| WebViewService.ts | JavaScript evaluation bridge (optional; form action detection) | MAP-102, BEH-002 |
| AppState Integration | App lifecycle listener for background/foreground | MAP-405, STATE-008 |
| Route Params | Pass URL as route param from navigation service | MAP-001 |
| Error Handling | Graceful error UI for load failures | ERRPATH-* |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Tests | Create __tests__/webview.test.ts covering 17 test cases | LT-001 through LT-017 |
| Mock react-native-webview | Mock WebView component; verify source, onLoad*, onNavigation props | MAP-002 |
| Mock react-native AppState | Mock app lifecycle state changes | MAP-101 |
| Mock navigationService | Mock URL interception logic | MAP-100 |
| Mock sessionService | Mock session check on foreground | MAP-101 |
| Snapshot Tests | Snapshot test WebviewScreen rendering | MAP-001 |
| Integration Tests | Test multi-step flow: load URL → handle navigation → error → reload | STATE-* |
| Coverage | ≥90% code coverage for WebView components and services | All BEH-*, NAV-* |
| Edge Cases | Test 10 edge cases in RN context | EC-001 through EC-010 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN WebView behavior = iOS WKWebView + Android WebView | BEH-001 through BEH-011 |
| URL Loading | URLs load correctly with no-cache policy | BEH-001, BEH-006, API-001, API-002 |
| Navigation Interception | Barcode and login URLs intercepted correctly | BEH-003, BEH-004, BEH-008, NAV-* |
| Error Handling | Load errors, SSL errors, HTTP errors handled gracefully | ERRPATH-*, BEH-009 |
| Session Management | Session check on foreground; logout redirect | EP-005, STATE-008, ERRPATH-001 |
| Loading UI | Progress indicator shows during load; hides on completion | UI-*, BEH-011 |
| State Preservation | WebView state preserved during background/foreground cycles | STATE-008 |
| JavaScript Bridge | Form action detection via JavaScript evaluation works | BEH-002 |
| Cross-Platform | WebView behavior identical on iOS/Android RN | All MAP-* |
| Test Coverage | ≥90% code coverage for WebView | All critical paths |
| Performance | Page loads in <5s on dev network | BEH-001, BEH-006 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest WebView tests | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator | HIGH |
| ios-mobilebrowser | xcodebuild test | Run XCTest for WebView | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit for WebView | HIGH |
| (all) | UNKNOWN | Base URL for test server (internal/staging) | MEDIUM |
