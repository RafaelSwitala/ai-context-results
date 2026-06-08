# Traceability Matrix

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/settings/codex/20260603-1411-codex-settings/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-03T14:11:00+02:00 |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-SET-001 | Entry | iOS invalid settings startup route | [P1-A12: EP-SET-001] | LT-SET-001 | MAP-SET-002, MAP-SET-020 | src/navigation/AppNavigator.tsx | COVERED |
| EP-SET-002 | Entry | iOS settings button PIN/direct route | [P1-A12: EP-SET-002] | LT-SET-002 | MAP-SET-002 | src/navigation/AppNavigator.tsx | COVERED |
| EP-SET-003 | Entry | iOS settings screen load | [P1-A12: EP-SET-003] | LT-SET-003 | MAP-SET-001, MAP-SET-021 | src/features/settings/SettingsScreen.tsx | COVERED |
| EP-SET-004 | Entry | iOS QR scanner action | [P1-A12: EP-SET-004] | LT-SET-006 | MAP-SET-004 | src/features/settings/SettingsQrImportButton.tsx | COVERED |
| EP-SET-005 | Entry | Android invalid settings startup route | [P1-A12: EP-SET-005] | LT-SET-007 | MAP-SET-002, MAP-SET-020 | src/navigation/AppNavigator.tsx | COVERED |
| EP-SET-006 | Entry | Android settings icon PIN/direct route | [P1-A12: EP-SET-006] | LT-SET-008 | MAP-SET-002 | src/navigation/AppNavigator.tsx | COVERED |
| EP-SET-007 | Entry | Android settings screen load | [P1-A12: EP-SET-007] | LT-SET-009 | MAP-SET-001, MAP-SET-021 | src/features/settings/SettingsScreen.tsx | COVERED |
| EP-SET-008 | Entry | Android app startup config bootstrap | [P1-A12: EP-SET-008] | LT-SET-014 | MAP-SET-010, MAP-SET-025 | src/features/settings/configFileService.ts | COVERED |
| BEH-SET-001 | Behavior | iOS prefill and default HTTPS | [P1-A12: BEH-SET-001] | LT-SET-003 | MAP-SET-021 | src/features/settings/useSettingsForm.ts | COVERED |
| BEH-SET-002 | Behavior | iOS cancel visibility/dismiss | [P1-A12: BEH-SET-002] | LT-SET-003 | MAP-SET-005, MAP-SET-030 | src/features/settings/SettingsActions.tsx | COVERED |
| BEH-SET-003 | Behavior | iOS server/PIN validation | [P1-A12: BEH-SET-003] | LT-SET-004 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| BEH-SET-004 | Behavior | iOS check URL, 200-only save | [P1-A12: BEH-SET-004] | LT-SET-005, LT-SET-017, LT-SET-018 | MAP-SET-008, MAP-SET-017, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| BEH-SET-005 | Behavior | iOS QR result fills controls | [P1-A12: BEH-SET-005] | LT-SET-006 | MAP-SET-004, MAP-SET-009, MAP-SET-028 | src/features/settings/settingsQrParser.ts | COVERED |
| BEH-SET-006 | Behavior | iOS QR parameter mapping | [P1-A12: BEH-SET-006] | LT-SET-006 | MAP-SET-009 | src/features/settings/settingsQrParser.ts | COVERED |
| BEH-SET-007 | Behavior | Android prefill and server replacement | [P1-A12: BEH-SET-007] | LT-SET-009, LT-SET-015 | MAP-SET-021, MAP-SET-011 | src/features/settings/useSettingsForm.ts | COVERED |
| BEH-SET-008 | Behavior | Android protocol options | [P1-A12: BEH-SET-008] | LT-SET-009 | MAP-SET-001, MAP-SET-026 | src/features/settings/SettingsScreen.tsx | COVERED |
| BEH-SET-009 | Behavior | Android server/PIN validation | [P1-A12: BEH-SET-009] | LT-SET-010 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| BEH-SET-010 | Behavior | Android pre-save protocol, 2xx save | [P1-A12: BEH-SET-010] | LT-SET-011 | MAP-SET-008, MAP-SET-017, MAP-SET-022, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| BEH-SET-011 | Behavior | Android language spinner | [P1-A12: BEH-SET-011] | LT-SET-012 | MAP-SET-012, MAP-SET-015, MAP-SET-024, MAP-SET-029 | src/features/settings/languageService.ts | COVERED |
| BEH-SET-012 | Behavior | Android QR valid import and culture | [P1-A12: BEH-SET-012] | LT-SET-013 | MAP-SET-004, MAP-SET-009, MAP-SET-023, MAP-SET-028 | src/features/settings/settingsQrParser.ts | COVERED |
| BEH-SET-013 | Behavior | Android QR parser culture/default | [P1-A12: BEH-SET-013] | LT-SET-013, LT-SET-020 | MAP-SET-009, MAP-SET-023 | src/features/settings/settingsQrParser.ts | COVERED |
| BEH-SET-014 | Behavior | Android config-file bootstrap | [P1-A12: BEH-SET-014] | LT-SET-014 | MAP-SET-010, MAP-SET-016, MAP-SET-025, MAP-SET-031 | src/features/settings/configFileService.ts | COVERED |
| BEH-SET-015 | Behavior | Android Douglas server replacement | [P1-A12: BEH-SET-015] | LT-SET-015 | MAP-SET-011 | src/features/settings/settingsMigrationService.ts | COVERED |
| STATE-SET-001 | State | iOS invalid settings opens settings | [P1-A12: STATE-SET-001] | LT-SET-001 | MAP-SET-020 | src/features/settings/useSettingsBootstrap.ts | COVERED |
| STATE-SET-002 | State | iOS PIN gate before settings | [P1-A12: STATE-SET-002] | LT-SET-002 | MAP-SET-002, MAP-SET-003 | src/features/settings/PinGateScreen.tsx | COVERED |
| STATE-SET-003 | State | iOS save success persists valid settings | [P1-A12: STATE-SET-003] | LT-SET-005 | MAP-SET-022 | src/features/settings/useSettingsSave.ts | COVERED |
| STATE-SET-004 | State | iOS invalid save shows error | [P1-A12: STATE-SET-004] | LT-SET-004 | MAP-SET-007, MAP-SET-022 | src/features/settings/settingsValidation.ts | COVERED |
| STATE-SET-005 | State | Android invalid settings routes PIN/settings | [P1-A12: STATE-SET-005] | LT-SET-007 | MAP-SET-020 | src/features/settings/useSettingsBootstrap.ts | COVERED |
| STATE-SET-006 | State | Android save success persists and navigates | [P1-A12: STATE-SET-006] | LT-SET-011 | MAP-SET-022 | src/features/settings/useSettingsSave.ts | COVERED |
| STATE-SET-007 | State | Android invalid/check failure error | [P1-A12: STATE-SET-007] | LT-SET-010, LT-SET-011 | MAP-SET-022 | src/features/settings/useSettingsSave.ts | COVERED |
| STATE-SET-008 | State | Android config version update | [P1-A12: STATE-SET-008] | LT-SET-014 | MAP-SET-025 | src/features/settings/configFileService.ts | COVERED |
| STATE-SET-009 | State | Android locale selection persists | [P1-A12: STATE-SET-009] | LT-SET-012 | MAP-SET-024 | src/features/settings/languageService.ts | COVERED |
| STOR-SET-001 | Storage | iOS server key | [P1-A12: STOR-SET-001] | LT-SET-003 | MAP-SET-013, MAP-SET-021 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-002 | Storage | iOS client key | [P1-A12: STOR-SET-002] | LT-SET-003, LT-SET-017 | MAP-SET-013, MAP-SET-021 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-003 | Storage | iOS PIN key | [P1-A12: STOR-SET-003] | LT-SET-003, LT-SET-021 | MAP-SET-014, MAP-SET-021 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-004 | Storage | iOS protocol key | [P1-A12: STOR-SET-004] | LT-SET-003 | MAP-SET-013, MAP-SET-021, MAP-SET-026 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-005 | Storage | iOS token key | [P1-A12: STOR-SET-005] | LT-SET-003, LT-SET-021 | MAP-SET-014, MAP-SET-021 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-006 | Storage | iOS valid settings key | [P1-A12: STOR-SET-006] | LT-SET-003 | MAP-SET-013, MAP-SET-020 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-007 | Storage | Android settings keys | [P1-A12: STOR-SET-007] | LT-SET-009, LT-SET-021 | MAP-SET-013, MAP-SET-014, MAP-SET-021 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-008 | Storage | Android valid settings key | [P1-A12: STOR-SET-008] | LT-SET-009 | MAP-SET-013, MAP-SET-020 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-009 | Storage | Android locale key | [P1-A12: STOR-SET-009] | LT-SET-012, LT-SET-020 | MAP-SET-015, MAP-SET-024 | src/features/settings/settingsStorage.ts | COVERED |
| STOR-SET-010 | Storage | Android config version key | [P1-A12: STOR-SET-010] | LT-SET-014 | MAP-SET-016, MAP-SET-025 | src/features/settings/settingsStorage.ts | COVERED |
| API-SET-001 | API | iOS settings check request | [P1-A12: API-SET-001] | LT-SET-005, LT-SET-017, LT-SET-018 | MAP-SET-008, MAP-SET-017, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| API-SET-002 | API | Android settings check request | [P1-A12: API-SET-002] | LT-SET-011, LT-SET-019 | MAP-SET-008, MAP-SET-017, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| NAV-SET-001 | Navigation | iOS login to settings when invalid | [P1-A12: NAV-SET-001] | LT-SET-001 | MAP-SET-002, MAP-SET-020 | src/navigation/AppNavigator.tsx | COVERED |
| NAV-SET-002 | Navigation | iOS login to PIN | [P1-A12: NAV-SET-002] | LT-SET-002 | MAP-SET-002, MAP-SET-003 | src/navigation/AppNavigator.tsx | COVERED |
| NAV-SET-003 | Navigation | iOS login to settings direct | [P1-A12: NAV-SET-003] | LT-SET-002 | MAP-SET-002 | src/navigation/AppNavigator.tsx | COVERED |
| NAV-SET-004 | Navigation | iOS PIN unwind to settings | [P1-A12: NAV-SET-004] | LT-SET-002 | MAP-SET-003 | src/features/settings/PinGateScreen.tsx | COVERED |
| NAV-SET-005 | Navigation | iOS settings to QR scanner | [P1-A12: NAV-SET-005] | LT-SET-006 | MAP-SET-004 | src/features/settings/SettingsQrImportButton.tsx | COVERED |
| NAV-SET-006 | Navigation | Android login to PIN | [P1-A12: NAV-SET-006] | LT-SET-007, LT-SET-008 | MAP-SET-002, MAP-SET-003 | src/navigation/AppNavigator.tsx | COVERED |
| NAV-SET-007 | Navigation | Android login to settings direct | [P1-A12: NAV-SET-007] | LT-SET-007, LT-SET-008 | MAP-SET-002 | src/navigation/AppNavigator.tsx | COVERED |
| NAV-SET-008 | Navigation | Android PIN to settings | [P1-A12: NAV-SET-008] | LT-SET-008 | MAP-SET-003 | src/features/settings/PinGateScreen.tsx | COVERED |
| NAV-SET-009 | Navigation | Android settings to QR scanner | [P1-A12: NAV-SET-009] | LT-SET-013 | MAP-SET-004 | src/features/settings/SettingsQrImportButton.tsx | COVERED |
| NAV-SET-010 | Navigation | Android save success to login | [P1-A12: NAV-SET-010] | LT-SET-011 | MAP-SET-002, MAP-SET-022 | src/navigation/AppNavigator.tsx | COVERED |
| ERRPATH-SET-001 | Error | iOS URL build failure | [P1-A12: ERRPATH-SET-001] | LT-SET-005 | MAP-SET-008 | src/features/settings/settingsConnectionService.ts | COVERED |
| ERRPATH-SET-002 | Error | iOS non-200 check failure | [P1-A12: ERRPATH-SET-002] | LT-SET-005 | MAP-SET-008, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| ERRPATH-SET-003 | Error | iOS invalid PIN length | [P1-A12: ERRPATH-SET-003] | LT-SET-004 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| ERRPATH-SET-004 | Error | iOS empty server | [P1-A12: ERRPATH-SET-004] | LT-SET-004 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| ERRPATH-SET-005 | Error | Android non-2xx or network error | [P1-A12: ERRPATH-SET-005] | LT-SET-011, LT-SET-019 | MAP-SET-008, MAP-SET-027 | src/features/settings/settingsConnectionService.ts | COVERED |
| ERRPATH-SET-006 | Error | Android invalid PIN length | [P1-A12: ERRPATH-SET-006] | LT-SET-010 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| ERRPATH-SET-007 | Error | Android empty server | [P1-A12: ERRPATH-SET-007] | LT-SET-010 | MAP-SET-007 | src/features/settings/settingsValidation.ts | COVERED |
| ERRPATH-SET-008 | Error | Android invalid QR ignored | [P1-A12: ERRPATH-SET-008] | LT-SET-013 | MAP-SET-009, MAP-SET-028 | src/features/settings/settingsQrParser.ts | COVERED |
| ERRPATH-SET-009 | Error | Android config load/parse failure | [P1-A12: ERRPATH-SET-009] | LT-SET-014 | MAP-SET-010, MAP-SET-031 | src/features/settings/configFileService.ts | COVERED |
| DEP-SET-001 | Dependency | iOS Alamofire | [P1-A12: DEP-SET-001] | LT-SET-005 | MAP-SET-008, MAP-SET-017 | src/features/settings/settingsConnectionService.ts | COVERED |
| DEP-SET-002 | Dependency | iOS MBProgressHUD | [P1-A12: DEP-SET-002] | LT-SET-005 | MAP-SET-001, MAP-SET-022 | src/features/settings/SettingsScreen.tsx | COVERED |
| DEP-SET-003 | Dependency | Android OkHttp and unsafe TLS | [P1-A12: DEP-SET-003] | LT-SET-011, LT-SET-016 | MAP-SET-008, MAP-SET-018, MAP-SET-036 | src/features/settings/settingsConnectionService.ts | DECISION_REQUIRED |
| DEP-SET-004 | Dependency | Android Gson config parse | [P1-A12: DEP-SET-004] | LT-SET-014 | MAP-SET-010 | src/features/settings/configFileService.ts | COVERED |
| DEP-SET-005 | Dependency | Android preference storage | [P1-A12: DEP-SET-005] | LT-SET-009 | MAP-SET-013, MAP-SET-014 | src/features/settings/settingsStorage.ts | COVERED |
| DEP-SET-006 | Dependency | RN AsyncStorage | [P1-A12: DEP-SET-006] | LT-SET-021 | MAP-SET-013, MAP-SET-032 | src/features/settings/settingsStorage.ts | COVERED |
| DEP-SET-007 | Dependency | RN SecureStore | [P1-A12: DEP-SET-007] | LT-SET-021 | MAP-SET-014, MAP-SET-033 | src/features/settings/settingsStorage.ts | COVERED |
| UI-SET-001 | UI | iOS settings fields | [P1-A12: UI-SET-001] | LT-SET-003 | MAP-SET-001 | src/features/settings/SettingsScreen.tsx | COVERED |
| UI-SET-002 | UI | iOS colors/buttons | [P1-A12: UI-SET-002] | LT-SET-003 | MAP-SET-001 | src/features/settings/SettingsScreen.tsx | COVERED |
| UI-SET-003 | UI | iOS keyboard scroll insets | [P1-A12: UI-SET-003] | LT-SET-006 | MAP-SET-006 | src/features/settings/useKeyboardInsets.ts | UNIT_LIMITED |
| UI-SET-004 | UI | Android settings fields | [P1-A12: UI-SET-004] | LT-SET-009 | MAP-SET-001 | src/features/settings/SettingsScreen.tsx | COVERED |
| UI-SET-005 | UI | Android system/IME insets | [P1-A12: UI-SET-005] | LT-SET-009 | MAP-SET-001, MAP-SET-006 | src/features/settings/SettingsScreen.tsx | COVERED |
| UI-SET-006 | UI | Android cancel hidden with no saved prefs | [P1-A12: UI-SET-006] | LT-SET-009 | MAP-SET-005, MAP-SET-030 | src/features/settings/SettingsActions.tsx | COVERED |
| SEC-SET-001 | Security | iOS token/PIN plain UserDefaults | [P1-A12: SEC-SET-001] | LT-SET-021 | MAP-SET-014, MAP-SET-033 | src/features/settings/settingsStorage.ts | COVERED |
| SEC-SET-002 | Security | Android token/PIN plain SharedPreferences | [P1-A12: SEC-SET-002] | LT-SET-021 | MAP-SET-014, MAP-SET-033 | src/features/settings/settingsStorage.ts | COVERED |
| SEC-SET-003 | Security | Android HTTPS without validation | [P1-A12: SEC-SET-003] | LT-SET-016 | MAP-SET-018, MAP-SET-026, MAP-SET-036 | native/android or exclusion decision | DECISION_REQUIRED |
| SEC-SET-004 | Security | Android cleartext HTTP allowed | [P1-A12: SEC-SET-004] | LT-SET-016 | MAP-SET-019, MAP-SET-026 | platform network config | DECISION_REQUIRED |
| SEC-SET-005 | Security | iOS HTTP option | [P1-A12: SEC-SET-005] | LT-SET-018 | MAP-SET-019, MAP-SET-026 | platform network config | DECISION_REQUIRED |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| NONE | No orphaned Phase-1 Code Fact IDs remain after mapping to LT and MAP IDs. | No | Phase 2 may proceed with test generation. |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
