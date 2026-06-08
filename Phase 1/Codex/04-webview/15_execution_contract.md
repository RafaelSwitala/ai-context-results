# Execution Contract

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T18:24:31+02:00 |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy test scope | Prioritize WebView URL source, callback classification, loading state, error/session handling, barcode route and toolbar/lifecycle behavior. | LT-001, LT-025 |
| iOS harness | If no iOS test target exists, Phase 2 must document setup limitation and still define handler-level tests for `WebsiteViewController`. | EP-003, EP-004, DEP-001 |
| Android harness | Use Activity/Robolectric-style tests or documented alternatives for WebviewActivity callback behavior and Intent assertions. | EP-008, EP-010, DEP-004 |
| Mocking | Mock WebView/WKWebView callbacks, storage preferences, camera permission, JavaScript form action, scanner return and error dialogs. | API-002, API-004, ERRPATH-008, STOR-001, STOR-003 |
| Divergence coverage | Explicitly test or document iOS no-dialog failure behavior, Android error dialog behavior, Android SSL-bypass and Android WebView back no-op. | MAP-019, MAP-021, MAP-022 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| WebView screen | Implement RN WebViewScreen with URL route param, WebView source, no-cache headers, loading UI, toolbar actions and lifecycle/auth guard. | MAP-001, MAP-011, MAP-015, MAP-016 |
| URL classification | Implement pure classifier for barcode, login, error, about:blank and normal URLs. | MAP-004, LT-025 |
| Session expiry | Detect login form/login URL, clear valid-login state and reset/navigate to Login. | BEH-010, BEH-022, SEC-002 |
| Barcode handoff | Convert barcode scheme to return URL, check camera permission and route to BarcodeScanner or denied fallback. | BEH-008, BEH-023, BEH-024, SEC-004 |
| Error UX | Preserve or explicitly decide iOS vs Android error behavior before implementing user-facing WebView error handling. | BEH-007, BEH-021, MAP-019 |
| Security | Treat WebView URLs as sensitive and do not log full URLs; decide HTTPS-without-validation support explicitly. | SEC-001, SEC-003 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Pure unit tests | Cover route constants, URL classifier, barcode return URL and scan-result URL builder. | LT-025, MAP-004, MAP-005 |
| Screen tests | Cover initial URL load, loading state, toolbar logout/close, empty URL fallback and Android back behavior. | LT-003, LT-012, LT-014, LT-022, LT-023 |
| Callback tests | Cover WebView navigation, finish, error, SSL decision and JavaScript/session-expiry handlers. | LT-015, LT-017, LT-018, LT-020 |
| Permission tests | Mock camera permission granted/denied and verify scanner route vs return URL fallback. | LT-019, LT-027 |
| Security tests | Assert URL route params are not logged by WebView services and invalid login exits WebView. | LT-030, SEC-001, SEC-002 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Behavior parity | Every BEH/STATE/ERRPATH is mapped to RN tests or explicit platform decision. | BEH-001, BEH-031, STATE-001, STATE-010, ERRPATH-001, ERRPATH-009 |
| WebView load parity | RN report shows correct URL source, no-cache behavior and WebView settings decisions. | API-001, API-003, BEH-016, SEC-005 |
| Session/security parity | RN report proves invalid login/session expiry exits WebView and sensitive URLs are not logged. | SEC-001, SEC-002 |
| Divergence handling | Error UX, SSL bypass, barcode permission and Android back behavior are explicitly accepted/adapted/excluded. | MAP-019, MAP-020, MAP-021, MAP-022 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | `npm test` | Run RN Jest tests. | HIGH; package.json defines `test`. [rn: package.json:10 symbol=scripts] |
| rn-e-mobilebrowser | `npm run test:coverage` | Run RN Jest coverage. | HIGH; package.json defines `test:coverage`. [rn: package.json:12 symbol=scripts] |
| android-mobilebrowser | `.\gradlew.bat test` | Run Android unit tests on Windows. | MEDIUM; Gradle wrapper exists and product flavors may affect exact task. [android: gradlew.bat:1 symbol=gradlew]; [android: app/build.gradle:97 symbol=productFlavors] |
| android-mobilebrowser | `.\gradlew.bat connectedAndroidTest` | Run Android instrumentation tests requiring emulator/device. | MEDIUM; Android instrumentation folder exists. [android: app/src/androidTest/java/de/onlinesoftwareag/boa/mobilebrowser4android/ApplicationTest.java:1 symbol=ApplicationTest] |
| ios-mobilebrowser | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | Run iOS tests if a test target is added. | LOW; no iOS test files were found during discovery. [ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:193 symbol=MobileBrowserV2] |
