# Test Definition

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/settings/codex/20260603-1411-codex-settings/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-03T14:11:00+02:00 |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-SET-001 | Unit/UI integration | iOS | High | Verify initial form population and default HTTPS from `PreferencesUtils`. [P1-A12: BEH-SET-001] |
| BEH-SET-002 | UI integration | iOS | Medium | Verify cancel visibility and dismiss. [P1-A12: BEH-SET-002] |
| BEH-SET-003 | Unit/UI integration | iOS | High | Verify server and PIN validation branches. [P1-A12: BEH-SET-003] |
| BEH-SET-004 | Unit with mocked HTTP | iOS | High | Verify check URL, no-cache header, status 200-only success, persistence, and error branch. [P1-A12: BEH-SET-004] |
| BEH-SET-005 | Unit/UI integration | iOS | High | Verify QR result fills controls even when QR validity is not checked in controller. [P1-A12: BEH-SET-005] |
| BEH-SET-006 | Unit | iOS | Medium | Verify QR parser parameter mapping and HTTPS fallback. [P1-A12: BEH-SET-006] |
| BEH-SET-007 | Unit/UI integration | Android | High | Verify initial form population, protocol selection, and Douglas server replacement side effect. [P1-A12: BEH-SET-007], [P1-A12: BEH-SET-015] |
| BEH-SET-008 | UI/unit | Android | High | Verify three protocol options and int mapping. [P1-A12: BEH-SET-008] |
| BEH-SET-009 | Unit/UI integration | Android | High | Verify server and PIN validation branches. [P1-A12: BEH-SET-009] |
| BEH-SET-010 | Unit with mocked HTTP | Android | High | Verify protocol pre-save, 2xx success range, persistence, and navigation to LoginActivity. [P1-A12: BEH-SET-010] |
| BEH-SET-011 | Unit/UI integration | Android | Medium | Verify language spinner default, disabled-single-language state, and save-on-select. [P1-A12: BEH-SET-011] |
| BEH-SET-012 | Unit/UI integration | Android | High | Verify valid QR fills controls and invalid QR does not overwrite controls. [P1-A12: BEH-SET-012] |
| BEH-SET-013 | Unit | Android | Medium | Verify QR parser culture default/filtering and protocol parse fallback. [P1-A12: BEH-SET-013] |
| BEH-SET-014 | Unit | Android | Medium | Verify config-file bootstrap only on valid changed version. [P1-A12: BEH-SET-014] |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-SET-001 | iOS | Settings opens automatically when invalid | `hasValidSettings` is false. | LoginViewController loads. | Segue `SETTINGS` is performed. | EP-SET-001, STATE-SET-001, NAV-SET-001 |
| LT-SET-002 | iOS | Settings button respects PIN gate | Stored PIN is `1234`, then empty. | Settings toolbar button is tapped. | With PIN, segue `PINCODE`; without PIN, segue `SETTINGS`. | EP-SET-002, STATE-SET-002, NAV-SET-002, NAV-SET-003 |
| LT-SET-003 | iOS | Settings form initializes from UserDefaults | Preferences contain server, client, protocol, token, PIN and valid flag. | SettingsViewController loads. | Controls match stored values; HTTPS defaults to on when valid flag is false. | EP-SET-003, BEH-SET-001, STOR-SET-001, STOR-SET-002, STOR-SET-003, STOR-SET-004, STOR-SET-005, STOR-SET-006, UI-SET-001 |
| LT-SET-004 | iOS | Save rejects empty server and invalid PIN | Server is empty or PIN has length other than 0/4. | Save is tapped. | Generic error for server; wrong-PIN dialog for invalid PIN; no settings success save. | BEH-SET-003, STATE-SET-004, ERRPATH-SET-003, ERRPATH-SET-004 |
| LT-SET-005 | iOS | Save accepts only HTTP 200 | Valid form and mocked check responses 200, 204, 404, URL-build nil. | Save is tapped. | 200 saves all settings and valid flag; 204/404/nil show error and do not run success save. | BEH-SET-004, STATE-SET-003, API-SET-001, ERRPATH-SET-001, ERRPATH-SET-002, DEP-SET-001, DEP-SET-002 |
| LT-SET-006 | iOS | QR import fills controls | QR scanner unwind contains URL query values. | `unwindToSettings` executes. | Controls receive server, client, HTTPS state, token, and PIN regardless of QR validity check in settings controller. | EP-SET-004, BEH-SET-005, BEH-SET-006, NAV-SET-005, UI-SET-003 |
| LT-SET-007 | Android | Settings opens automatically when invalid | `hasValidSettings` is false and stored PIN is present or absent. | LoginActivity starts. | With PIN, PinActivity starts; without PIN, SettingsActivity starts. | EP-SET-005, STATE-SET-005, NAV-SET-006, NAV-SET-007 |
| LT-SET-008 | Android | Settings icon respects PIN gate | LoginActivity is visible with stored PIN present or absent. | Settings icon is tapped. | With PIN, PinActivity starts; without PIN, SettingsActivity starts. | EP-SET-006, NAV-SET-006, NAV-SET-007, NAV-SET-008 |
| LT-SET-009 | Android | Settings form initializes from SharedPreferences | SharedPreferences contain server, client, token, PIN, and each protocol value. | SettingsActivity starts. | Controls match stored values; protocol spinner selects HTTPS, HTTPS without validation, or HTTP. | EP-SET-007, BEH-SET-007, BEH-SET-008, STOR-SET-007, STOR-SET-008, UI-SET-004, UI-SET-005, UI-SET-006 |
| LT-SET-010 | Android | Save rejects empty server and invalid PIN | Server is empty or PIN length is not 0/4. | Save is tapped. | Generic error for server; wrong-PIN dialog for invalid PIN; success save does not run. | BEH-SET-009, STATE-SET-007, ERRPATH-SET-006, ERRPATH-SET-007 |
| LT-SET-011 | Android | Save accepts 2xx and rejects non-2xx | Valid form and mocked check statuses 200, 204, 300, 404, error 0. | Save is tapped. | 200/204 save valid flag and settings and navigate to LoginActivity; 300/404/0 show error; protocol is pre-saved. | BEH-SET-010, STATE-SET-006, STATE-SET-007, API-SET-002, ERRPATH-SET-005, NAV-SET-010, DEP-SET-003 |
| LT-SET-012 | Android | Language spinner persists locale | Available languages contain multiple entries, then one entry. | SettingsActivity starts and user selects a language. | Spinner defaults from saved locale or Deutsch, saves selected locale, and is disabled with one available language. | BEH-SET-011, STATE-SET-009, STOR-SET-009 |
| LT-SET-013 | Android | QR import validates and persists culture | Valid and invalid QR-code URLs are returned from scanner. | `onActivityResult` executes. | Valid QR fills controls and saves culture; invalid QR leaves controls unchanged. | BEH-SET-012, BEH-SET-013, ERRPATH-SET-008, NAV-SET-009 |
| LT-SET-014 | Android | Config file bootstrap updates settings on version change | Config file valid with new version, valid with same version, invalid, and missing. | App startup executes updateSettingsOnVersionChanged. | New valid version saves settings, valid flag, and version; same/invalid/missing leaves settings unchanged. | EP-SET-008, BEH-SET-014, STATE-SET-008, STOR-SET-010, ERRPATH-SET-009, DEP-SET-004 |
| LT-SET-015 | Android | Douglas server replacement is applied | Stored server equals `prestigeweb01.dhag.rd.local` in different case variants. | SettingsActivity/LoginActivity applies replacement. | Server becomes `prestigeweb01.douglas-informatik.de`; other values are unchanged. | BEH-SET-015, BEH-SET-007 |
| LT-SET-016 | Android | Unsafe HTTPS mode affects HTTP client and WebView SSL handling | Protocol value is `PROTOCOL_HTTPS_WITHOUT_VALIDATION`. | Connectivity check client is created and WebView receives SSL error. | Unsafe OkHttp configuration is selected and WebView proceeds on SSL error. | SEC-SET-003, DEP-SET-003 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-SET-017 | iOS | Client is empty while server is valid. | URL builder returns a URL with no client suffix before `/Default.aspx`; save can proceed to connectivity result. | BEH-SET-004, API-SET-001, STOR-SET-002 |
| LT-SET-018 | iOS | Server already starts with `http://` or `https://`. | URL builder does not prepend another scheme. | API-SET-001, SEC-SET-005 |
| LT-SET-019 | Android | Check URL returns timeout/exception. | `HttpStatusUtil` maps status to `0` and settings screen shows generic error. | API-SET-002, ERRPATH-SET-005 |
| LT-SET-020 | Android | QR culture is not in `AvailableLanguages`. | Parser keeps default locale instead of QR culture. | BEH-SET-013, STOR-SET-009 |
| LT-SET-021 | Cross-platform | Token and PIN are present during migration. | RN storage tests assert SecureStore or documented compatibility storage, not accidental plain-text storage. | SEC-SET-001, SEC-SET-002, DEP-SET-006, DEP-SET-007 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Settings validation branches | BEH-SET-003, BEH-SET-009, ERRPATH-SET-003, ERRPATH-SET-004, ERRPATH-SET-006, ERRPATH-SET-007 | 100% branch coverage for empty server, empty PIN, four-character PIN, invalid PIN. | Validation controls whether settings are accepted. |
| Connectivity success/failure | API-SET-001, API-SET-002, ERRPATH-SET-001, ERRPATH-SET-002, ERRPATH-SET-005 | Cover 200-only iOS behavior and 2xx Android behavior plus network error. | Cross-platform parity depends on accepted status semantics. |
| Persistence | STOR-SET-001, STOR-SET-002, STOR-SET-003, STOR-SET-004, STOR-SET-005, STOR-SET-006, STOR-SET-007, STOR-SET-008, STOR-SET-009, STOR-SET-010 | Verify every settings key read/write path. | Later RN implementation must preserve or intentionally migrate persisted behavior. |
| Navigation and PIN gate | NAV-SET-001, NAV-SET-002, NAV-SET-003, NAV-SET-004, NAV-SET-006, NAV-SET-007, NAV-SET-008, NAV-SET-010 | Cover automatic settings route, direct settings route, PIN route, and post-save route. | Settings entry is user-facing and guards configuration. |
| QR-code import | BEH-SET-005, BEH-SET-006, BEH-SET-012, BEH-SET-013, ERRPATH-SET-008 | Cover valid, invalid, missing `https`, unsupported culture, and malformed URL. | QR import is a major settings input path. |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| UI-SET-003 | iOS keyboard scroll behavior depends on UIKit keyboard notifications and visual layout. | UI/integration test should verify scroll inset change with keyboard notification. [P1-A12: UI-SET-003] |
| SEC-SET-003 | Unsafe TLS trust and WebView SSL proceed require platform/network integration, not pure unit tests. | Instrumented Android test or manual security validation with a controlled self-signed endpoint. [P1-A12: SEC-SET-003] |
| SEC-SET-004 | Android cleartext transport depends on manifest/network runtime policy. | Manifest/static check plus device integration test against HTTP endpoint. [P1-A12: SEC-SET-004] |
| DEP-SET-001 | Alamofire request execution is external network behavior unless mocked. | Mock Alamofire layer or validate URL/header construction in unit scope. [P1-A12: API-SET-001] |
