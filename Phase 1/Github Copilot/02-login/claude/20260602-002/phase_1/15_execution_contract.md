# Execution Contract

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T17:30:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Test Suite | Create XCTest suite for iOS LoginViewController with 24 test cases | LT-001 through LT-024, plus edge cases |
| Test Suite | Create JUnit suite for Android LoginActivity with 24 test cases | LT-001 through LT-024, plus edge cases |
| Test Framework | Use XCTest for iOS; JUnit4 for Android | Standard platform testing |
| Mock HTTP | Mock AF.request (iOS) and HttpStatusUtil (Android) using OHHTTPStubs or Mockito | API-001, API-003 |
| Mock Storage | Mock UserDefaults (iOS) and SharedPreferences (Android) for credential tests | STOR-001 through STOR-011 |
| Test Coverage | Achieve ≥80% code coverage for LoginViewController and LoginActivity | All BEH-*, ERRPATH-* |
| Edge Cases | Test 15 edge cases including special characters, boundary conditions, network errors | EC-001 through EC-015 |
| Password Tests | Verify Base64 encoding/decoding for Android; plaintext handling for iOS | BEH-013, BEH-018, BEH-019 |
| Navigation Tests | Mock segues/intents; verify correct screen transitions | NAV-001 through NAV-008 |
| Error Messages | Verify error dialogs shown for all error conditions | ERRPATH-001 through ERRPATH-012 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| AuthService File | Create src/services/AuthService.ts with all operations | MAP-100 through MAP-107 |
| AuthService.authenticate() | Implement HTTP GET to login endpoint; parse response; return {success, errorCode?} | MAP-102, BEH-006 |
| AuthService.buildLoginUrl() | Construct URL with query parameters: server, client, user, password, protocol | MAP-101, BEH-005 |
| AuthService.saveCredentials() | Save username and encrypted password to @react-native-encrypted-storage | MAP-103, SEC-001, SEC-002 |
| AuthService.loadSavedCredentials() | Load username and password from encrypted storage on app init | MAP-100, BEH-001 |
| AuthService.validatePin() | Compare entered PIN with stored PIN (hashed if possible) | MAP-105, BEH-012 |
| AuthService.hasValidSettings() | Check if settings configured (call config service from storage-config feature) | MAP-107, BEH-004 |
| LoginScreen Component | Create screens/LoginScreen.tsx with useLoginForm hook and form state | MAP-001, STATE-400 |
| LoginScreen UI | Render username input, password input, login button, version display, error messages | UI-001, UI-002, UI-010, UI-011 |
| LoginScreen Lifecycle | Load saved credentials on mount; show error alerts; navigate on success | BEH-001, MAP-001 |
| PinScreen Component | Create screens/PinScreen.tsx with PIN entry UI and validation logic | MAP-002, STATE-403 |
| PinScreen UI | Render 4-digit PIN entry, delete button, visual feedback boxes, cancel button | UI-017 through UI-021 |
| CredentialInput Component | Create components/CredentialInput.tsx for reusable username/password inputs | MAP-003 |
| Storage Setup | Configure @react-native-encrypted-storage for credentials and PIN | MAP-200 through MAP-206 |
| HTTP Client | Use fetch() or axios with timeout, error handling, Cache-Control headers | MAP-102, BEH-006 |
| Navigation Integration | Integrate react-navigation stack; map login → webview → pin transitions | NAV-001 through NAV-008 |
| Language Support | Implement i18next/i18n for error messages and labels (future-proofing) | BEH-015, DEP-006 |
| Security | Encrypt credentials and PIN; never log sensitive data; enforce HTTPS | SEC-001 through SEC-010 |
| Error Handling | Display user-friendly error messages for validation, network, and server errors | ERRPATH-001 through ERRPATH-012 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Test Suite | Create __tests__/AuthService.test.ts for all AuthService operations | MAP-100 through MAP-107 |
| Test Count | Write ≥24 test cases covering BEH-*, ERRPATH-*, edge cases | LT-001 through LT-024, EC-* |
| LoginScreen Tests | Test form input, validation, HTTP call (mocked), navigation on success/error | MAP-001, STATE-*, NAV-* |
| PinScreen Tests | Test PIN entry, comparison, error handling, cancel navigation | MAP-002, STATE-403 |
| Storage Tests | Verify encrypted storage save/load for credentials and PIN | MAP-200 through MAP-206 |
| Mock HTTP | Mock fetch() calls with various response codes (200, 401, 500, timeout) | API-001 |
| Mock Storage | Mock @react-native-encrypted-storage.setItem/getItem | STOR-* |
| Mock Navigation | Mock react-navigation navigation.navigate() calls | NAV-* |
| Coverage Target | Achieve ≥85% code coverage for AuthService and LoginScreen | All critical paths |
| Snapshot Tests | Snapshot test LoginScreen and PinScreen UI components | UI-* |
| Platform Parity | Verify RN tests match legacy test intent for both iOS and Android | Mapping matrix |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN login flow matches iOS/Android behavior (credential input, URL building, HTTP, navigation) | BEH-001 through BEH-024 |
| Error Handling | All 12 error paths replicated; same error messages or more user-friendly | ERRPATH-001 through ERRPATH-012 |
| Data Persistence | Credentials and PIN persist correctly between app launches | STOR-001 through STOR-011 |
| Security | Credentials encrypted at rest; never logged; HTTPS enforced; PIN protected | SEC-001 through SEC-010 |
| Navigation | Successful login → webview screen; PIN required if set; settings accessible | NAV-001 through NAV-008 |
| Form Validation | Empty field validation prevents submission; error messages displayed | BEH-002, BEH-003 |
| HTTP Integration | Successfully authenticate against live backend; handle error codes from server | BEH-006, BEH-008 |
| PIN Validation | 4-digit PIN validated correctly; incorrect entries rejected | BEH-012, BEH-024 |
| Performance | Login HTTP request completes in <5 seconds; UI responsive during loading | BEH-006 (implicit) |
| Test Coverage | ≥90% code coverage for AuthService, LoginScreen, PinScreen | Phase 4 requirement |
| Cross-Platform | RN behavior identical on iOS and Android simulators/devices | Mapping matrix |
| Regression | Storage-config feature integration (has settings check) works correctly | BOUND-010, BEH-004, BEH-016 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest tests for RN components | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator with RN app | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator with RN app | HIGH |
| rn-e-mobilebrowser | npm install | Install dependencies (including @react-native-encrypted-storage) | HIGH |
| rn-e-mobilebrowser | npm run build/tsc | TypeScript compilation | HIGH |
| ios-mobilebrowser | xcodebuild test | Run XCTest suite for iOS | HIGH |
| ios-mobilebrowser | xcodebuild archive | Build iOS app | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit tests for Android | HIGH |
| android-mobilebrowser | ./gradlew connectedAndroidTest | Run instrumented tests on device/emulator | HIGH |
| android-mobilebrowser | ./gradlew build | Build Android app | HIGH |
