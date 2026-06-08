# Execution Contract

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/settings/codex/20260603-1411-codex-settings/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-03T14:11:00+02:00 |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| iOS tests | Build tests around SettingsViewController, PreferencesUtils, UrlUtils, and QRCodeParser; mock Alamofire or isolate URL/header/status behavior. | LT-SET-001, LT-SET-002, LT-SET-003, LT-SET-004, LT-SET-005, LT-SET-006 |
| Android tests | Build local unit/Robolectric-style tests around SettingsActivity, PreferencesUtils, QRCodeParser, ConfigFileLoader, HttpStatusUtil, and PinActivity route behavior. | LT-SET-007, LT-SET-008, LT-SET-009, LT-SET-010, LT-SET-011, LT-SET-012, LT-SET-013, LT-SET-014, LT-SET-015, LT-SET-016 |
| Network mocks | Do not call real PRESTIGEenterprise endpoints; mock status 200, 204, 300, 404, timeout/error 0, and URL-build failure. | API-SET-001, API-SET-002, ERRPATH-SET-001, ERRPATH-SET-002, ERRPATH-SET-005 |
| Storage isolation | Reset UserDefaults/SharedPreferences before each test and assert each settings key explicitly. | STOR-SET-001, STOR-SET-002, STOR-SET-003, STOR-SET-004, STOR-SET-005, STOR-SET-006, STOR-SET-007, STOR-SET-008, STOR-SET-009, STOR-SET-010 |
| Divergence tests | Keep iOS 200-only and Android 2xx behavior separate; keep iOS lenient QR fill and Android strict QR fill separate. | MAP-SET-027, MAP-SET-028 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RN settings model | Implement settings as typed state with server, client, protocol enum, token, PIN, locale, valid flag, and optional config version. | MAP-SET-013, MAP-SET-014, MAP-SET-015, MAP-SET-016 |
| RN storage | Store non-sensitive values in AsyncStorage and token/PIN in SecureStore unless a reviewed compatibility decision overrides this. | SEC-SET-001, SEC-SET-002, DEP-SET-006, DEP-SET-007 |
| RN validation | Preserve server-required and PIN-empty-or-four-characters rules. | BEH-SET-003, BEH-SET-009, MAP-SET-007 |
| RN connectivity | Implement check URL builder and HTTP check with explicit success-status decision from MAP-SET-027. | API-SET-001, API-SET-002, MAP-SET-017 |
| RN routing | Implement automatic settings route, settings icon route, PIN gate, QR import route, and post-save route. | NAV-SET-001, NAV-SET-002, NAV-SET-003, NAV-SET-006, NAV-SET-007, NAV-SET-008, NAV-SET-009, NAV-SET-010 |
| Unsafe HTTPS | Do not silently implement or expose trust-all TLS; either add native Android support with product approval or remove the option with a documented divergence. | SEC-SET-003, MAP-SET-018, MAP-SET-026 |
| Android config bootstrap | Implement bundled config bootstrap only if RN has a defined config source; otherwise mark MAP-SET-031 excluded. | BEH-SET-014, MAP-SET-031 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Unit tests | Cover validation, URL builder, QR parser, storage service, locale service, and config bootstrap service. | LT-SET-004, LT-SET-005, LT-SET-010, LT-SET-011, LT-SET-012, LT-SET-013, LT-SET-014 |
| Component tests | Cover initial render, field population, save/cancel visibility, protocol options, language spinner, loading/error states, and QR import result application. | UI-SET-001, UI-SET-004, UI-SET-006, MAP-SET-001 |
| Navigation tests | Cover startup invalid settings, settings icon with and without PIN, correct PIN to settings, and save success to login. | LT-SET-001, LT-SET-002, LT-SET-007, LT-SET-008, LT-SET-011 |
| Security tests | Assert token/PIN use SecureStore paths and unsafe HTTPS mode is blocked, hidden, or native-backed according to Phase 3 decision. | SEC-SET-001, SEC-SET-002, SEC-SET-003, MAP-SET-018 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Behavior parity | Compare RN test outputs with Phase 2 legacy tests for all LT-SET test IDs. | LT-SET-001, LT-SET-002, LT-SET-003, LT-SET-004, LT-SET-005, LT-SET-006, LT-SET-007, LT-SET-008, LT-SET-009, LT-SET-010, LT-SET-011, LT-SET-012, LT-SET-013, LT-SET-014, LT-SET-015, LT-SET-016 |
| Divergence report | Explicitly record decisions for protocol enum, success status, QR validity, language, cancel visibility, config bootstrap, unsafe HTTPS, and HTTP cleartext. | MAP-SET-026, MAP-SET-027, MAP-SET-028, MAP-SET-029, MAP-SET-030, MAP-SET-031, MAP-SET-018, MAP-SET-019 |
| Storage/security | Evidence that settings persist and sensitive values are protected according to RN decision. | MAP-SET-013, MAP-SET-014, SEC-SET-001, SEC-SET-002 |
| No rediscovery | Phase 5 may only use Phase 1/2 IDs for legacy behavior; any missing legacy fact must stop with ERR-REF-01. | REF-003, VAL-P1-03 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | `npm test` | Run Jest tests. | HIGH; script exists in package.json. [rn: rn-e-mobilebrowser/package.json:10 symbol=scripts.test] |
| rn-e-mobilebrowser | `npm run test:coverage` | Run Jest coverage. | HIGH; script exists in package.json. [rn: rn-e-mobilebrowser/package.json:12 symbol=scripts.test:coverage] |
| rn-e-mobilebrowser | `npm run android` | Start Expo Android target. | HIGH; script exists in package.json. [rn: rn-e-mobilebrowser/package.json:7 symbol=scripts.android] |
| android-mobilebrowser | `.\\gradlew.bat test` | Run Android JVM tests. | MEDIUM; Gradle wrapper exists and test source exists, but no Phase-1 execution was required. [android: gradlew.bat:1 symbol=gradlew.bat], [android: app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/mobilebrowser4android/ExampleUnitTest.java:1 symbol=ExampleUnitTest] |
| android-mobilebrowser | `.\\gradlew.bat connectedAndroidTest` | Run Android instrumented tests on a device/emulator. | MEDIUM; Android test source exists, device availability is environment-dependent. [android: app/src/androidTest/java/de/onlinesoftwareag/boa/mobilebrowser4android/ApplicationTest.java:1 symbol=ApplicationTest] |
| ios-mobilebrowser | `xcodebuild test -project MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | Run iOS tests on macOS/Xcode. | LOW; project exists but this Windows workspace cannot validate local Xcode execution. [ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:191 symbol=PBXNativeTarget] |
