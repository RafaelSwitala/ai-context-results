# Execution Contract

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T16:15:12+02:00 |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy test scope | Create focused tests for parser, validation, URL building and persistence branches; do not require real backend. | LT-001, LT-004, LT-006, LT-012, LT-016, API-001, API-003 |
| iOS test harness | If no existing iOS test target is present, Phase 2 must document required setup or mark legacy execution blocked with evidence; no iOS test files were found in discovery. | IOS-FILE-001, IOS-FILE-002 |
| Android test harness | Existing Android test tree contains only skeleton tests; Phase 2 should add unit tests around utility logic and mocked HTTP behavior. | AND-FILE-001, AND-FILE-002 |
| Mocking | HTTP checks must be mocked or wrapped because real server availability is outside deterministic test scope. | API-001, API-003, ERRPATH-003, ERRPATH-006 |
| QR tests | Parser/normalizer tests are mandatory and can run without camera dependencies. | BEH-004, BEH-005, BEH-013, BEH-014, MAP-005 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Storage service | Implement a typed RN storage service for server, client, protocol, locale, config version, valid flags, username and sensitive secrets. | STOR-001, STOR-005, MAP-008, MAP-009, MAP-010, MAP-011, MAP-012 |
| Sensitive data | Token, password and PIN must use SecureStore or stronger; AsyncStorage is acceptable for non-sensitive values. | SEC-001, SEC-002, MAP-009, MAP-011, MAP-027 |
| Protocol enum | RN must support 0=http, 1=https, 2=httpsWithoutValidation, with default HTTPS on invalid read and ignored invalid write. | STOR-003, STOR-007, SEC-003, MAP-021 |
| Settings screen | Implement server, client, protocol, token, PIN and optional language controls; save must validate and check access before marking settings valid. | BEH-001, BEH-002, BEH-003, BEH-010, BEH-011, BEH-012, MAP-001 |
| QR import | Implement pure QR parser/normalizer and wire scanner result to fill controls without saving until Save. | BEH-006, BEH-015, STATE-003, STATE-006, MAP-005 |
| Config file import | Treat Android config file behavior as explicit divergence; implement only with versioned bundled config or document NOT_PRESENT for RN. | BEH-009, STOR-010, MAP-022 |
| Login/session dependency | Provide storage and URL helper contracts for login/session features; do not implement unrelated login or license behavior in storage-config. | BEH-008, BEH-017, API-005, MAP-006, MAP-016 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Unit tests | Cover parser, validation, storage read/write, protocol mapping, URL construction and config bootstrap branches. | LT-006, LT-012, LT-016, LT-018, LT-021, MAP-004, MAP-005, MAP-008 |
| Secure storage mocks | Mock SecureStore and AsyncStorage separately to verify sensitive/non-sensitive split. | SEC-001, SEC-002, MAP-009, MAP-011 |
| HTTP mocks | Mock check-access success and failure; verify save side effects and error state. | API-001, API-003, ERRPATH-003, ERRPATH-006 |
| Navigation tests | Verify invalid-settings no-PIN and has-PIN branches. | NAV-001, NAV-002, NAV-005, NAV-006, MAP-002 |
| Divergence tests | Include protocol 2, culture fallback and config version update tests. | MAP-021, MAP-022, MAP-023 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Behavior parity | RN behavior report maps each BEH/STATE/ERRPATH to passing RN tests or documented exclusion. | BEH-001, BEH-018, STATE-001, STATE-007, ERRPATH-001, ERRPATH-008 |
| Storage parity | RN storage keys/types and sensitive split are documented against STOR and SEC facts. | STOR-001, STOR-010, SEC-001, SEC-004 |
| Test parity | Every LT-* from P1-A13 has an RN RT-* equivalent or documented non-migration reason. | LT-001, LT-029 |
| Divergence handling | Android-only config file, culture and protocol 2 are explicitly implemented or excluded. | MAP-021, MAP-022, MAP-023 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | `npm test` | Run RN Jest tests. | HIGH; package.json defines `test`. [rn: package.json:5 symbol=scripts] |
| rn-e-mobilebrowser | `npm run test:coverage` | Run RN Jest coverage. | HIGH; package.json defines `test:coverage`. [rn: package.json:10 symbol=scripts] |
| android-mobilebrowser | `./gradlew test` or `.\gradlew.bat test` | Run Android unit tests. | MEDIUM; Gradle wrapper and test tree exist, exact flavor/task may be needed. [android: gradlew.bat:1 symbol=gradlew]; [android: app/build.gradle:97 symbol=productFlavors] |
| android-mobilebrowser | `./gradlew connectedAndroidTest` or `.\gradlew.bat connectedAndroidTest` | Run Android instrumentation tests. | MEDIUM; androidTest tree exists, device/emulator required. [android: app/src/androidTest/java/de/onlinesoftwareag/boa/mobilebrowser4android/ApplicationTest.java:1 symbol=ApplicationTest] |
| ios-mobilebrowser | `xcodebuild test ...` | Run iOS tests if a test target is added. | LOW; no iOS test files were found during discovery. [ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:193 symbol=MobileBrowserV2] |
