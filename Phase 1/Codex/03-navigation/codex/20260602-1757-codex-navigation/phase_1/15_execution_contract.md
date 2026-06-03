# Execution Contract

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T17:57:20+02:00 |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy test scope | Prioritize route decisions, payload transfer, invalid-auth resets, scanner returns, and Android back behavior; camera/WebView rendering may be mocked. | LT-001, LT-022, BEH-001, BEH-027 |
| iOS harness | If no iOS test target exists, Phase 2 must document setup limitation and still define test seams around segue IDs and delegate handlers. | DEP-001, DEP-002, DEP-003 |
| Android harness | Android unit tests should mock `startActivity`, route extras, WebViewClient callbacks, Activity results and BackDispatcher callbacks. | EP-008, EP-013, LT-011, LT-021 |
| Mocking | Mock storage guards, WebView URL callbacks, camera permission and scanner code callbacks. | STOR-001, STOR-002, ERRPATH-006, DEP-006 |
| Divergence assertion | Tests must assert Android back behavior and Android-only license route; do not silently normalize them. | MAP-022, MAP-023 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Navigator | Replace PlaceholderScreen with a typed root navigator that includes Login, Settings, PIN, WebView, QR scanner, Barcode scanner and optional License. | MAP-001, MAP-007, DEP-007, RN-FILE-002 |
| Route params | WebView and scanner routes must use explicit URL/returnUrl/scanResult params and must not persist route URLs. | STOR-003, MAP-008, MAP-013, SEC-002 |
| Auth guard | WebView and scanner routes must reset or return to Login when valid-login becomes false. | BEH-007, BEH-009, BEH-022, BEH-026, SEC-001 |
| WebView URL classifier | Implement route decisions for `barcodescanner`, `login.aspx`, `error=-`, empty URL and normal page loads. | BEH-008, BEH-020, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005 |
| Scanner returns | QR scanner returns settings payload; barcode scanner returns WebView URL plus optional `ScanResult`. | BEH-010, BEH-011, BEH-019, BEH-025 |
| Android back | Implement per-screen BackHandler for Login backgrounding, WebView no-op, scanner no-op, and PIN finish/back behavior where RN can model it. | BEH-016, BEH-019, BEH-024, BEH-027, MAP-022 |
| Permission handling | Barcode route must check camera permission before entering scanner and provide denied fallback. | ERRPATH-006, SEC-003, MAP-021 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Navigator tests | Verify Login -> PIN/Settings/WebView, Settings -> QR, PIN -> Settings, WebView -> Login/Barcode, Barcode -> WebView/Login. | LT-001, LT-021, NAV-001, NAV-018 |
| Pure service tests | Cover constants, URL classification, return URL conversion, QR normalization and scan-result URL building. | LT-022, MAP-008, MAP-009, MAP-011 |
| Auth guard tests | Cover logout, login form, error OK, invalid-login resume and scanner invalid-auth reset. | LT-005, LT-006, LT-008, LT-019, LT-020 |
| Android back tests | Use BackHandler mocks to cover screen-specific behavior. | LT-014, LT-016, LT-025, MAP-022 |
| Permission tests | Mock camera permission granted/denied and verify scanner vs fallback navigation. | LT-018, LT-027, SEC-003 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Behavior parity | Every BEH/STATE/NAV/ERRPATH source has a passing RN test, legacy test mapping or documented platform decision. | BEH-001, BEH-027, STATE-001, STATE-010, NAV-001, NAV-018, ERRPATH-001, ERRPATH-007 |
| Route payload parity | WebView URL, QR payload and ScanResult URL values are preserved or divergences are recorded. | STOR-003, SEC-002, MAP-013 |
| Security parity | Invalid login state cannot leave WebView or scanner accessible. | SEC-001, BEH-007, BEH-024, BEH-026 |
| Divergence handling | Android back, camera-permission branch and Android-only license route are explicitly accepted, adapted or excluded. | MAP-021, MAP-022, MAP-023 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | `npm test` | Run RN Jest tests. | HIGH; package.json defines `test`. [rn: package.json:10 symbol=scripts] |
| rn-e-mobilebrowser | `npm run test:coverage` | Run RN Jest coverage. | HIGH; package.json defines `test:coverage`. [rn: package.json:12 symbol=scripts] |
| android-mobilebrowser | `.\gradlew.bat test` | Run Android unit tests on Windows. | MEDIUM; Gradle wrapper exists and flavors may affect exact task. [android: gradlew.bat:1 symbol=gradlew]; [android: app/build.gradle:97 symbol=productFlavors] |
| android-mobilebrowser | `.\gradlew.bat connectedAndroidTest` | Run Android instrumentation tests. | MEDIUM; emulator/device required. [android: app/src/androidTest/java/de/onlinesoftwareag/boa/mobilebrowser4android/ApplicationTest.java:1 symbol=ApplicationTest] |
| ios-mobilebrowser | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | Run iOS tests if a test target is added. | LOW; no iOS test files were found in discovered source list. [ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:193 symbol=MobileBrowserV2] |
