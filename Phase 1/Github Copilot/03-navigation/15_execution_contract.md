# Execution Contract

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T19:45:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| iOS Test Suite | XCTest suite with 16 test cases covering all segues, data passing, logout, session checks | LT-001 through LT-009 |
| Android Test Suite | JUnit suite with 16 test cases covering all intents, data passing, lifecycle navigation | LT-010 through LT-016 |
| Mock Storyboard | Mock UIStoryboard for tests; verify correct ViewController instantiation | BEH-004 |
| Mock Intent | Mock Intent creation and data passing | BEH-007, BEH-008 |
| Mock Navigation | Mock segue and unwind flows without actual UI | BEH-001, BEH-003 |
| Session Check | Mock PreferencesUtils.hasValidLoginPreference() for foreground check | BEH-006 |
| Coverage Target | ≥80% code coverage for all navigation classes/ViewControllers | All BEH-*, EP-* |
| Edge Cases | Test 9 edge cases (null destinations, rapid taps, timeout) | EC-001 through EC-009 |
| API Mocking | Mock logout API calls (PeApiHelper, RequestUtils) | API-001, API-003 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RootNavigator | Create navigation/RootNavigator.tsx with Stack Navigator | MAP-002 |
| Login Screen | Screens/LoginScreen.tsx (initial route) | MAP-003 |
| Webview Screen | Screens/WebviewScreen.tsx + logout button | BEH-005 |
| Settings Screen | Screens/SettingsScreen.tsx | NAV-003 |
| PIN Screen | Screens/PinScreen.tsx | NAV-002 |
| Scanner Screen | Screens/ScannerScreen.tsx for barcode scanning | NAV-009 |
| AuthService.logout() | Implement logout flow + API call + navigation | MAP-100, API-001 |
| SessionService.checkValid() | Check session on app foreground | MAP-101, BEH-006 |
| NavigationService | Wrapper for react-navigation linking + state | MAP-102, MAP-103 |
| App Lifecycle | Configure AppState listener for background/foreground | MAP-402, BEH-010 |
| Route Parameters | Pass data via route params (URL, error codes, scan results) | MAP-101, BEH-002 |
| Deep Linking | Configure deep linking for URL handling (future) | NAV-005 |
| Navigation Config | Centralize screen names and route constants | DIV-006 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Tests | Create __tests__/navigation.test.ts covering 16 test cases | LT-001 through LT-016 |
| Mock react-navigation | Mock navigation.navigate(), navigation.goBack() | MAP-102, MAP-103 |
| Mock AuthService | Mock logout(), checkValid() | MAP-100, MAP-101 |
| Mock AppState | Mock app lifecycle state changes | BEH-010, MAP-402 |
| Route Params | Test route parameter passing (URL, errors, etc.) | BEH-002, BEH-008 |
| Coverage | ≥85% code coverage for navigation | All BEH-*, NAV-* |
| Snapshot Tests | Snapshot test screen component rendering | UI-001, UI-003 |
| Integration Tests | Test multi-screen flows (login → webview → logout → login) | STATE-* |
| Edge Cases | Test 9 edge cases in RN context | EC-001 through EC-009 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN navigation flow = iOS segues + Android intents | BEH-001 through BEH-011 |
| Segue Mapping | All segues (WEBVIEW, PINCODE, SETTINGS, BACK_TO_LOGIN) working | NAV-001 through NAV-008 |
| Intent Mapping | All intents (WebviewActivity, PinActivity, SettingsActivity) working | NAV-006 through NAV-010 |
| Data Passing | Route params correctly transfer URL, error codes, scan results | BEH-002, BEH-008 |
| Back Navigation | goBack() works for all screens; stack properly managed | BEH-003, BEH-009 |
| Logout Flow | Logout button triggers API call, clears session, returns to login | BEH-005, API-001 |
| Session Check | Foreground check validates login; forces logout if invalid | BEH-006, BEH-010 |
| App Lifecycle | Background/foreground transitions manage session correctly | STATE-005, STATE-008 |
| Error Handling | All error paths gracefully degrade | ERRPATH-001 through ERRPATH-004 |
| Test Coverage | ≥90% code coverage for navigation | All critical paths |
| Cross-Platform | Navigation behavior identical on iOS/Android simulators | Mapping matrix |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest navigation tests | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator (storyboard available) | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator | HIGH |
| ios-mobilebrowser | xcodebuild test | Run XCTest for navigation | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit for Intent navigation | HIGH |
| (all) | UNKNOWN | Deep linking test URLs (not yet determined) | LOW |
