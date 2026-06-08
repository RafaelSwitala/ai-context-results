# Execution Contract

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/settings/claude/20260602-005/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:40:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| iOS Test Suite | XCTest suite with 9 test cases covering form loading, validation, server check, save, QR parsing | LT-001 through LT-009 |
| Android Test Suite | JUnit suite with 9 test cases covering form loading, validation, server check, save, language, QR parsing | LT-010 through LT-018 |
| Mock AF.request | Mock Alamofire HTTP requests; verify URL and status codes | BEH-004, API-001 |
| Mock HttpStatusUtil | Mock HTTP validation for server accessibility | BEH-009, API-002 |
| Mock PreferencesUtils | Mock SharedPreferences/Keychain reads and writes | STOR-*, BEH-001, BEH-007 |
| Mock QRCodeParser | Mock QR code parsing; return QRCodeSettings object | BEH-013, BEH-014 |
| Form Validation Tests | Test validation logic; empty server, invalid PIN length | BEH-002, BEH-003, BEH-009 |
| Coverage Target | ≥85% code coverage for settings-related code | All BEH-*, EP-* |
| Edge Cases | Test 10 edge cases (timeouts, invalid inputs, partial QR, etc.) | EC-001 through EC-010 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| SettingsScreen.tsx | Main settings screen component; form management and navigation | MAP-001, EP-001, EP-004 |
| useSettingsForm hook | Load settings from AsyncStorage on mount; manage form state | MAP-002, BEH-001, BEH-007 |
| settingsValidator.ts | Server + PIN validation; isValid() logic | MAP-003, BEH-002, BEH-003, BEH-009 |
| SettingsForm component | Reusable form with TextInputs for server, client, token, pin | MAP-004, UI-001, UI-006 |
| ProtocolSelector component | Picker with 3 protocol options (HTTP, HTTPS, HTTPS-no-val) | MAP-005, UI-002, UI-007 |
| LanguageSelector component | Picker for language/locale selection | MAP-006, UI-008 |
| settingsService.ts | validateServerAccess() + saveSettings() functions | MAP-100, MAP-101, BEH-004 through BEH-010 |
| qrCodeService.ts | parseQRCode() wrapper for QR parsing | MAP-102, BEH-013, BEH-014 |
| Loading UI | ActivityIndicator shown during server validation | MAP-402, BEH-011, BEH-012 |
| Error Handling | Show Alert dialogs for validation errors | ERRPATH-*, UI-* |
| Cancel/Save buttons | Conditional visibility; navigation after save | BEH-006, BEH-010, NAV-002 through NAV-005 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Jest Tests | Create __tests__/settings.test.ts covering 18 test cases | LT-001 through LT-018 |
| Mock AsyncStorage | Mock settings persistence; verify read/write | MAP-200, BEH-001 |
| Mock fetch | Mock HTTP validation; verify status codes | MAP-300, BEH-004, BEH-009 |
| Mock QR scanner | Mock parseQRCode; verify field population | MAP-102 |
| Form Validation Tests | Test validateSettings() with various inputs | BEH-002, BEH-003, BEH-009 |
| Route Navigation | Test navigation after save; back button behavior | NAV-002 through NAV-005 |
| Snapshot Tests | Snapshot test SettingsScreen rendering | MAP-001 |
| Integration Tests | Test full flow: load → validate → save → navigate | STATE-* |
| Coverage | ≥90% code coverage for settings | All BEH-*, NAV-* |
| Edge Cases | Test 10 edge cases in RN context | EC-001 through EC-010 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional Parity | RN settings = iOS SettingsViewController + Android SettingsActivity | BEH-001 through BEH-014 |
| Form Loading | Settings load from storage on screen mount | BEH-001, BEH-007 |
| Validation Logic | Server required, PIN 0 or 4 chars; error dialogs shown | BEH-002, BEH-003, BEH-009 |
| Server Accessibility | HTTP GET to URL before save; 200 required | BEH-004, BEH-009 |
| Settings Persistence | After save, navigate and return; settings preserved | BEH-005, BEH-010 |
| QR Code Integration | Scan QR; parse settings; populate fields | BEH-013, BEH-014 |
| Protocol Selection | 3 options available (HTTP, HTTPS, HTTPS-no-val) | BEH-008, UI-005 |
| Language Selection | Language/locale can be changed; persisted | BEH-008, STATE-008 |
| Cancel Behavior | Cancel only shown if settings exist; dismiss without save | BEH-006, BEH-010, NAV-002 |
| Error Handling | All error paths show appropriate dialogs | ERRPATH-* |
| Loading UI | Loading indicator shown during validation | BEH-011, BEH-012 |
| Cross-Platform | Settings behavior identical on iOS/Android RN | All MAP-* |
| Test Coverage | ≥90% code coverage for settings | All critical paths |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test | Run Jest settings tests | HIGH |
| rn-e-mobilebrowser | npm run ios | Run iOS simulator | HIGH |
| rn-e-mobilebrowser | npm run android | Run Android emulator | HIGH |
| ios-mobilebrowser | xcodebuild test | Run XCTest for settings | HIGH |
| android-mobilebrowser | ./gradlew test | Run JUnit for settings | HIGH |
| (all) | UNKNOWN | Test server URL for HTTP check | MEDIUM |
