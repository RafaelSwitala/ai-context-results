# Test Definition

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T16:15:12+02:00 |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit/UI state | iOS/RN | P1 | Prefill/default HTTPS branch. |
| BEH-002 | Unit/UI validation | iOS/RN | P0 | Server and PIN validation. |
| BEH-003 | Unit with HTTP mock | iOS/RN | P0 | Save only after successful check-access. |
| BEH-004 | Unit pure parser | iOS/RN | P0 | QR parse including HTTPS fallback. |
| BEH-005 | Unit pure validation | iOS/RN | P0 | QR validity. |
| BEH-006 | Unit/controller | iOS/RN | P1 | QR scanner normalization and invalid path. |
| BEH-007 | Navigation unit | iOS/RN | P1 | Invalid settings routes to Settings/PIN. |
| BEH-008 | Unit pure URL/storage | iOS/RN | P1 | Login URL from stored config; dependency coverage. |
| BEH-009 | Unit storage/config import | Android/RN | P0 | App-start config version update and locale default. |
| BEH-010 | Unit/UI state | Android/RN | P1 | Prefill/cancel visibility. |
| BEH-011 | Unit/UI validation | Android/RN | P0 | Server and PIN validation. |
| BEH-012 | Unit with HTTP mock | Android/RN | P0 | Protocol mapping and save only on OK status. |
| BEH-013 | Unit pure parser | Android/RN | P0 | QR parse including culture and HTTPS fallback. |
| BEH-014 | Unit pure validation | Android/RN | P0 | QR validity. |
| BEH-015 | Unit/controller | Android/RN | P1 | Duplicate scan, normalization, invalid path. |
| BEH-016 | Navigation unit | Android/RN | P1 | Invalid settings routes to Settings/PIN. |
| BEH-017 | Unit pure URL/storage | Android/RN | P1 | Login URL includes Culture. |
| BEH-018 | Unit storage migration | Android/RN | P2 | Douglas DNS replacement. |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Settings prefill defaults HTTPS when no valid settings | UserDefaults contains no valid settings flag. | SettingsViewController loads. | Server/client/token/pin read as stored/default empty and HTTPS switch is on. | EP-001, BEH-001, STOR-001, UI-001 |
| LT-002 | iOS | Settings save rejects missing server | Server field empty and PIN empty. | Save is tapped. | Generic settings error is shown and STOR-002/STOR-003 are not written. | EP-002, BEH-002, ERRPATH-001, STOR-002 |
| LT-003 | iOS | Settings save rejects non-4-digit PIN | Server is non-empty and PIN has length 3 or 5. | Save is tapped. | Wrong PIN length dialog is shown and settings are not saved. | BEH-002, ERRPATH-001, UI-002 |
| LT-004 | iOS | Settings save persists only after HTTP 200 | Server/client/token/pin/protocol are valid and HTTP mock returns 200. | Save is tapped. | Settings and `hasValidSettings=true` are written and screen is dismissed. | BEH-003, STATE-002, STOR-002, STOR-003, API-001 |
| LT-005 | iOS | Settings save blocks non-200 status | Check-access mock returns non-200. | Save is tapped. | Error dialog appears and settings are not saved. | BEH-003, ERRPATH-003, API-001 |
| LT-006 | iOS | QR parser maps valid settings | QR URL contains `p=MB`, `v=1`, server, mandant, https, token, pin. | QRCodeParser parses URL. | QRCodeSettings contains mapped fields and is valid. | BEH-004, BEH-005, STOR-002 |
| LT-007 | iOS | QR parser defaults invalid https to HTTPS | QR URL has absent or non-integer `https`. | QRCodeParser parses URL. | SecurityProtocol is HTTPS. | BEH-004, STOR-003 |
| LT-008 | iOS | QR scanner normalizes query-only payload | Scanned QR text has no `?` but has valid query params. | metadataOutput handles scan. | Code is prefixed with `http://localhost?` and returns to Settings. | EP-005, BEH-006, NAV-004 |
| LT-009 | iOS | Invalid QR scanner path restarts scan | Scanned QR lacks `p=MB` or `v=1`. | metadataOutput handles scan. | Error dialog is shown and capture restarts after OK. | BEH-006, ERRPATH-004 |
| LT-010 | iOS | Login settings guard | `hasValidSettings=false`, with and without PIN. | Login screen loads or settings button tapped. | App routes to Settings when no PIN exists and to PIN when PIN exists. | EP-004, BEH-007, NAV-001, NAV-002, STATE-001 |
| LT-011 | iOS | Login URL from preferences | Stored server/user exist. | buildLoginUrlFromPreferences is called. | URL is built from stored server, client, username, password and protocol. | BEH-008, API-002, STOR-004 |
| LT-012 | Android | App startup applies newer config file | Current config version differs from valid asset version. | App.updateSettingsOnVersionChanged runs. | Settings, valid flag and current config version are written. | EP-006, BEH-009, STATE-004, STOR-009, STOR-010 |
| LT-013 | Android | App startup ignores invalid/same config | Config file invalid, missing or same version. | App.updateSettingsOnVersionChanged runs. | Existing preferences are unchanged. | ERRPATH-008, STOR-010 |
| LT-014 | Android | Settings prefill maps protocol spinner | SharedPreferences contain protocol 0, 1 or 2. | SettingsActivity loads. | Spinner selects HTTP, HTTPS or HTTPS without validation respectively. | EP-007, BEH-010, UI-004, UI-005 |
| LT-015 | Android | Settings save rejects invalid input | Server empty or PIN length not 4. | Save is tapped. | Correct error dialog appears and settings are not saved. | BEH-011, ERRPATH-005, UI-004 |
| LT-016 | Android | Settings save persists only after OK status | Valid fields and HTTP mock OK. | Save is tapped. | Protocol, settings and valid flag are stored and LoginActivity starts. | BEH-012, STATE-005, STOR-006, STOR-007, API-003 |
| LT-017 | Android | Settings save blocks non-OK status | HTTP mock returns non-OK. | Save is tapped. | Error dialog appears and settings are not saved. | BEH-012, ERRPATH-006, API-003 |
| LT-018 | Android | QR parser maps culture and defaults | Valid QR URL with culture in available languages. | QRCodeParser parses URL. | Settings contain mapped fields and culture; missing/invalid https falls back to HTTPS. | BEH-013, BEH-014, STOR-006, STOR-009 |
| LT-019 | Android | QR scanner normalization and invalid path | Query-only QR text and invalid QR text are scanned. | handleCode runs. | Valid query-only text returns RESULT_OK; invalid code shows error dialog. | EP-010, BEH-015, ERRPATH-007, NAV-008 |
| LT-020 | Android | Login settings guard | `hasValidSettings=false`, with and without PIN. | LoginActivity loads or settings button tapped. | App routes to SettingsActivity when no PIN exists and PinActivity when PIN exists. | EP-009, BEH-016, NAV-005, NAV-006 |
| LT-021 | Android | Login URL includes Culture | Stored server/user and locale exist. | buildLoginUrl/buildLoginUrlFromPreferences is called. | URL includes `App=MobileBrowser` and `Culture=<locale>`. | BEH-017, API-004, STOR-008, STOR-009 |
| LT-022 | Android | Douglas server migration | Stored server equals old Douglas DNS. | replaceDouglasServerName runs. | Server preference is overwritten with new DNS value. | BEH-018, STOR-005 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-023 | Cross | Server already contains `http://` or `https://`. | URL builder does not prepend another scheme. | API-002, API-004 |
| LT-024 | Cross | Client/mandant empty. | URL builder still appends MobileBrowser path and Default.aspx with empty client. | API-002, API-004 |
| LT-025 | iOS | URL encoding fails for server or client. | `buildCheckAccessUrl` returns nil and save shows settings error. | API-002, ERRPATH-002 |
| LT-026 | Android | `saveProtocolPreference` receives -1 or 3. | Protocol preference is not overwritten. | STOR-007 |
| LT-027 | Android | QR culture not listed in AvailableLanguages. | Culture falls back to App default. | BEH-013, STOR-009 |
| LT-028 | Android | Duplicate QR code emitted twice. | Second emission is ignored. | BEH-015 |
| LT-029 | Cross | Token absent. | License/session API dependency returns empty/no-op and storage-config remains valid if other settings pass. | API-005, SEC-001, SEC-002 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Storage read/write | STOR-001, STOR-002, STOR-003, STOR-004, STOR-005, STOR-006, STOR-007, STOR-008, STOR-009 | 100% branch coverage in RN storage service tests; legacy test plan covers critical paths. | Storage side effects define migration parity. |
| QR parse/validation | BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007 | 100% parser branch coverage. | Pure logic with high regression risk. |
| Settings validation/save | BEH-002, BEH-003, BEH-011, BEH-012, ERRPATH-001, ERRPATH-003, ERRPATH-005, ERRPATH-006 | Cover valid, invalid server, invalid PIN, HTTP success, HTTP failure. | Determines whether config becomes trusted. |
| Platform divergence | BEH-009, BEH-013, BEH-018, STOR-009, STOR-010, SEC-003 | Each divergence has at least one explicit RN test or documented exclusion. | Prevents accidental cross-platform flattening. |
| Navigation guards | NAV-001, NAV-002, NAV-005, NAV-006 | Cover invalid-settings no-PIN and has-PIN branches. | Settings access is gated by stored config/PIN. |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-007 | Camera/ML Kit scanning requires device integration; storage-config unit scope should test parser/controller handoff with scanned strings. | LT-008, LT-009, LT-019 cover normalized QR strings and invalid handling. |
| API-001 | Real server availability is external and nondeterministic. | Mock Alamofire/HTTP layer in legacy/RN tests and preserve URL-building facts from P1-A12. |
| API-003 | Real server availability is external and nondeterministic. | Mock HttpStatusUtil/RN HTTP service and verify persistence branches. |
| API-005 | License/session API belongs to dependency feature and requires server data. | Verify token is read/passed by dependency tests; storage-config maps secure token storage. |
