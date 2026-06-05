# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_2/21_legacy_test_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:15:54+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | UserDefaults contains no valid settings flag. | SettingsViewController loads. | Server/client/token/pin read as stored/default empty and HTTPS switch is on. | P1-A13: EP-001, BEH-001, STOR-001, UI-001 | P1 |
| LT-002 | iOS | Server field empty and PIN empty. | Save is tapped. | Generic settings error is shown and STOR-002/STOR-003 are not written. | P1-A13: EP-002, BEH-002, ERRPATH-001, STOR-002 | P0 |
| LT-003 | iOS | Server is non-empty and PIN has length 3 or 5. | Save is tapped. | Wrong PIN length dialog is shown and settings are not saved. | P1-A13: BEH-002, ERRPATH-001, UI-002 | P0 |
| LT-004 | iOS | Server/client/token/pin/protocol are valid and HTTP mock returns 200. | Save is tapped. | Settings and hasValidSettings=true are written and screen is dismissed. | P1-A13: BEH-003, STATE-002, STOR-002, STOR-003, API-001 | P0 |
| LT-005 | iOS | Check-access mock returns non-200. | Save is tapped. | Error dialog appears and settings are not saved. | P1-A13: BEH-003, ERRPATH-003, API-001 | P0 |
| LT-006 | iOS | QR URL contains p=MB, v=1, server, mandant, https, token, pin. | QRCodeParser parses URL. | QRCodeSettings contains mapped fields and is valid. | P1-A13: BEH-004, BEH-005, STOR-002 | P0 |
| LT-007 | iOS | QR URL has absent or non-integer https. | QRCodeParser parses URL. | SecurityProtocol is HTTPS. | P1-A13: BEH-004, STOR-003 | P0 |
| LT-008 | iOS | Scanned QR text has no question mark but valid query params. | metadataOutput handles scan. | Code is prefixed with http://localhost? and returns to Settings. | P1-A13: EP-005, BEH-006, NAV-004 | P1 |
| LT-009 | iOS | Scanned QR lacks p=MB or v=1. | metadataOutput handles scan. | Error dialog is shown and capture restarts after OK. | P1-A13: BEH-006, ERRPATH-004 | P1 |
| LT-010 | iOS | hasValidSettings=false, with and without PIN. | Login screen loads or settings button tapped. | App routes to Settings when no PIN exists and to PIN when PIN exists. | P1-A13: EP-004, BEH-007, NAV-001, NAV-002, STATE-001 | P1 |
| LT-011 | iOS | Stored server/user exist. | buildLoginUrlFromPreferences is called. | URL is built from stored server, client, username, password and protocol. | P1-A13: BEH-008, API-002, STOR-004 | P1 |
| LT-012 | Android | Current config version differs from valid asset version. | App.updateSettingsOnVersionChanged runs. | Settings, valid flag and current config version are written. | P1-A13: EP-006, BEH-009, STATE-004, STOR-009, STOR-010 | P0 |
| LT-013 | Android | Config file invalid, missing or same version. | App.updateSettingsOnVersionChanged runs. | Existing preferences are unchanged. | P1-A13: ERRPATH-008, STOR-010 | P0 |
| LT-014 | Android | SharedPreferences contain protocol 0, 1 or 2. | SettingsActivity loads. | Spinner selects HTTP, HTTPS or HTTPS without validation respectively. | P1-A13: EP-007, BEH-010, UI-004, UI-005 | P1 |
| LT-015 | Android | Server empty or PIN length not 4. | Save is tapped. | Correct error dialog appears and settings are not saved. | P1-A13: BEH-011, ERRPATH-005, UI-004 | P0 |
| LT-016 | Android | Valid fields and HTTP mock OK. | Save is tapped. | Protocol, settings and valid flag are stored and LoginActivity starts. | P1-A13: BEH-012, STATE-005, STOR-006, STOR-007, API-003 | P0 |
| LT-017 | Android | HTTP mock returns non-OK. | Save is tapped. | Error dialog appears and settings are not saved. | P1-A13: BEH-012, ERRPATH-006, API-003 | P0 |
| LT-018 | Android | Valid QR URL with culture in available languages. | QRCodeParser parses URL. | Settings contain mapped fields and culture; missing/invalid https falls back to HTTPS. | P1-A13: BEH-013, BEH-014, STOR-006, STOR-009 | P0 |
| LT-019 | Android | Query-only QR text and invalid QR text are scanned. | handleCode runs. | Valid query-only text returns RESULT_OK; invalid code shows error dialog. | P1-A13: EP-010, BEH-015, ERRPATH-007, NAV-008 | P1 |
| LT-020 | Android | hasValidSettings=false, with and without PIN. | LoginActivity loads or settings button tapped. | App routes to SettingsActivity when no PIN exists and PinActivity when PIN exists. | P1-A13: EP-009, BEH-016, NAV-005, NAV-006 | P1 |
| LT-021 | Android | Stored server/user and locale exist. | buildLoginUrl/buildLoginUrlFromPreferences is called. | URL includes App=MobileBrowser and Culture=<locale>. | P1-A13: BEH-017, API-004, STOR-008, STOR-009 | P1 |
| LT-022 | Android | Stored server equals old Douglas DNS. | replaceDouglasServerName runs. | Server preference is overwritten with new DNS value. | P1-A13: BEH-018, STOR-005 | P2 |
| LT-023 | Cross | Server already contains http:// or https://. | URL builder runs. | URL builder does not prepend another scheme. | P1-A13: API-002, API-004 | P1 |
| LT-024 | Cross | Client/mandant empty. | URL builder runs. | URL builder still appends MobileBrowser path and Default.aspx with empty client. | P1-A13: API-002, API-004 | P1 |
| LT-025 | iOS | URL encoding fails for server or client. | buildCheckAccessUrl runs or save is tapped. | buildCheckAccessUrl returns nil and save shows settings error. | P1-A13: API-002, ERRPATH-002 | P2 |
| LT-026 | Android | saveProtocolPreference receives -1 or 3. | Preference helper saves protocol. | Protocol preference is not overwritten. | P1-A13: STOR-007 | P2 |
| LT-027 | Android | QR culture not listed in AvailableLanguages. | QRCodeParser parses URL. | Culture falls back to App default. | P1-A13: BEH-013, STOR-009 | P2 |
| LT-028 | Android | Duplicate QR code emitted twice. | Scanner handles duplicate emissions. | Second emission is ignored. | P1-A13: BEH-015 | P2 |
| LT-029 | Cross | Token absent. | License/session dependency asks storage-config for token. | Dependency receives empty/no-op token and storage-config remains valid if other settings pass. | P1-A13: API-005, SEC-001, SEC-002 | P2 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric | SharedPreferences test instance via reflection into PreferencesUtils; App singleton language fields seeded in tests. | Existing Gradle unit-test tree was present but contained only commented skeleton test. Added testImplementation dependencies in app/build.gradle. |
| iOS | XCTest | Manual UserDefaults isolation would be required for preference-heavy tests; HTTP/Alamofire would require a wrapper or test double. | No XCTest target exists in MobileBrowserV2.xcodeproj and xcodebuild is unavailable in this Windows environment. XCTest source files were added but not wired into the project target. |
| Cross | Platform-specific unit test frameworks | None beyond storage/URL helper isolation. | Android side was executed; iOS side is prepared only. |
