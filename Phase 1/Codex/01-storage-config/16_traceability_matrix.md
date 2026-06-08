# Traceability Matrix

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T16:15:12+02:00 |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry | iOS Settings prefill entry. | IOS-FILE-002 | LT-001 | MAP-001 | SettingsScreen/useStorageConfig | READY |
| EP-002 | Entry | iOS Settings save entry. | IOS-FILE-002 | LT-002, LT-003, LT-004, LT-005 | MAP-001 | SettingsScreen | READY |
| EP-003 | Entry | iOS QR return entry. | IOS-FILE-002 | LT-006, LT-008 | MAP-001, MAP-005 | SettingsScreen/storageConfigQr | READY |
| EP-004 | Entry | iOS settings guard. | IOS-FILE-006 | LT-010 | MAP-002 | AppNavigator/LoginScreen | READY |
| EP-005 | Entry | iOS scanner detection. | IOS-FILE-007 | LT-008, LT-009 | MAP-003, MAP-005 | QRCodeScannerScreen/storageConfigQr | READY |
| EP-006 | Entry | Android app bootstrap config update. | AND-FILE-009 | LT-012, LT-013 | MAP-019, MAP-022 | configFileService/app bootstrap | READY |
| EP-007 | Entry | Android Settings entry/save. | AND-FILE-002 | LT-014, LT-015, LT-016, LT-017 | MAP-001 | SettingsScreen/useStorageConfig | READY |
| EP-008 | Entry | Android QR return entry. | AND-FILE-002 | LT-018, LT-019 | MAP-001, MAP-005 | SettingsScreen/storageConfigQr | READY |
| EP-009 | Entry | Android settings guard. | AND-FILE-010 | LT-020 | MAP-002 | AppNavigator/LoginScreen | READY |
| EP-010 | Entry | Android scanner detection. | AND-FILE-011 | LT-019 | MAP-003, MAP-005 | QRCodeScannerScreen/storageConfigQr | READY |
| BEH-001 | Behavior | iOS settings prefill/default HTTPS. | IOS-FILE-002 | LT-001 | MAP-001, MAP-017 | SettingsScreen/useStorageConfig | READY |
| BEH-002 | Behavior | iOS save validation. | IOS-FILE-002 | LT-002, LT-003 | MAP-001, MAP-017 | SettingsScreen/useStorageConfig | READY |
| BEH-003 | Behavior | iOS save after HTTP 200. | IOS-FILE-002 | LT-004, LT-005 | MAP-004, MAP-017 | storageConfigService/useStorageConfig | READY |
| BEH-004 | Behavior | iOS QR parse. | IOS-FILE-003 | LT-006, LT-007 | MAP-005 | storageConfigQr | READY |
| BEH-005 | Behavior | iOS QR validation. | IOS-FILE-004 | LT-006, LT-009 | MAP-005 | storageConfigQr | READY |
| BEH-006 | Behavior | iOS QR scanner normalization/error. | IOS-FILE-007 | LT-008, LT-009 | MAP-003, MAP-005, MAP-018 | QRCodeScannerScreen/storageConfigQr | READY |
| BEH-007 | Behavior | iOS settings guard/PIN. | IOS-FILE-006 | LT-010 | MAP-002, MAP-017 | AppNavigator/LoginScreen | READY |
| BEH-008 | Behavior | iOS login URL dependency. | IOS-FILE-005, IOS-FILE-006 | LT-011 | MAP-006, MAP-015 | loginUrlService | READY |
| BEH-009 | Behavior | Android default locale/config update. | AND-FILE-009 | LT-012, LT-013 | MAP-013, MAP-019, MAP-022 | configFileService/app bootstrap | READY |
| BEH-010 | Behavior | Android settings prefill/cancel. | AND-FILE-002 | LT-014 | MAP-001, MAP-017 | SettingsScreen/useStorageConfig | READY |
| BEH-011 | Behavior | Android save validation. | AND-FILE-002 | LT-015 | MAP-001, MAP-017 | SettingsScreen/useStorageConfig | READY |
| BEH-012 | Behavior | Android save after OK status. | AND-FILE-002 | LT-016, LT-017 | MAP-004, MAP-017 | storageConfigService/useStorageConfig | READY |
| BEH-013 | Behavior | Android QR parse/culture. | AND-FILE-003 | LT-018, LT-027 | MAP-005, MAP-023 | storageConfigQr | READY |
| BEH-014 | Behavior | Android QR validation. | AND-FILE-004 | LT-018, LT-019 | MAP-005 | storageConfigQr | READY |
| BEH-015 | Behavior | Android QR scanner duplicate/normalization/error. | AND-FILE-011 | LT-019, LT-028 | MAP-003, MAP-005, MAP-018 | QRCodeScannerScreen/storageConfigQr | READY |
| BEH-016 | Behavior | Android settings guard/PIN. | AND-FILE-010 | LT-020 | MAP-002, MAP-017 | AppNavigator/LoginScreen | READY |
| BEH-017 | Behavior | Android login URL with Culture. | AND-FILE-001 | LT-021 | MAP-006, MAP-015, MAP-023 | loginUrlService | READY |
| BEH-018 | Behavior | Android Douglas DNS replacement. | AND-FILE-001 | LT-022 | MAP-008 | storageConfigStorage migration helper | READY |
| STATE-001 | State | iOS invalid settings opens Settings. | IOS-FILE-006 | LT-010 | MAP-002, MAP-017 | AppNavigator/useStorageConfig | READY |
| STATE-002 | State | iOS successful save sets valid settings. | IOS-FILE-002 | LT-004 | MAP-017 | useStorageConfig | READY |
| STATE-003 | State | iOS valid QR fills controls only. | IOS-FILE-002, IOS-FILE-007 | LT-006, LT-008 | MAP-018 | useStorageConfigQrImport | READY |
| STATE-004 | State | Android app bootstrap applies config version. | AND-FILE-009 | LT-012 | MAP-019, MAP-022 | configFileService | READY |
| STATE-005 | State | Android successful save sets valid settings. | AND-FILE-002 | LT-016 | MAP-017 | useStorageConfig | READY |
| STATE-006 | State | Android valid QR fills controls and locale. | AND-FILE-002 | LT-018, LT-019 | MAP-018, MAP-023 | useStorageConfigQrImport | READY |
| STATE-007 | State | Android logout clears valid login. | AND-FILE-009 | LT-029 | MAP-020 | auth/session dependency | READY |
| STOR-001 | Storage | iOS UserDefaults keys. | IOS-FILE-001 | LT-001 | MAP-008 | storageConfigStorage | READY |
| STOR-002 | Storage | iOS save settings. | IOS-FILE-001 | LT-002, LT-004, LT-006 | MAP-009 | storageConfigStorage | READY |
| STOR-003 | Storage | iOS protocol storage/default. | IOS-FILE-001 | LT-004, LT-007, LT-023 | MAP-010, MAP-021 | storageConfigStorage | READY |
| STOR-004 | Storage | iOS credentials and valid flags. | IOS-FILE-001 | LT-011 | MAP-011 | storageConfigStorage/login dependency | READY |
| STOR-005 | Storage | Android SharedPreferences keys. | AND-FILE-001 | LT-022 | MAP-008 | storageConfigStorage | READY |
| STOR-006 | Storage | Android save settings. | AND-FILE-001 | LT-016, LT-018 | MAP-009 | storageConfigStorage | READY |
| STOR-007 | Storage | Android protocol storage/validation. | AND-FILE-001 | LT-016, LT-026 | MAP-010, MAP-021 | storageConfigStorage | READY |
| STOR-008 | Storage | Android credentials and valid flags. | AND-FILE-001 | LT-021 | MAP-011 | storageConfigStorage/login dependency | READY |
| STOR-009 | Storage | Android locale/config version. | AND-FILE-001 | LT-012, LT-018, LT-021, LT-027 | MAP-012, MAP-023 | storageConfigStorage | READY |
| STOR-010 | Storage | Android config.json asset. | AND-FILE-006, AND-FILE-007, AND-FILE-013 | LT-012, LT-013 | MAP-013, MAP-022 | configFileService | READY |
| API-001 | API | iOS check-access GET. | IOS-FILE-002 | LT-004, LT-005 | MAP-004, MAP-014 | storageConfigService | READY |
| API-002 | API | iOS URL construction. | IOS-FILE-005, IOS-FILE-009 | LT-011, LT-023, LT-024, LT-025 | MAP-004, MAP-015, MAP-024 | storageConfigService/loginUrlService | READY |
| API-003 | API | Android check-access HTTP status. | AND-FILE-002 | LT-016, LT-017 | MAP-004, MAP-014 | storageConfigService | READY |
| API-004 | API | Android URL construction. | AND-FILE-001, AND-FILE-009 | LT-021, LT-023, LT-024 | MAP-004, MAP-015, MAP-024 | storageConfigService/loginUrlService | READY |
| API-005 | API | Token-dependent license/session API. | IOS-FILE-008, Android RequestUtils | LT-029 | MAP-007, MAP-016 | sessionService token provider | READY |
| NAV-001 | Navigation | iOS Login to Settings. | IOS-FILE-006 | LT-010 | MAP-002 | AppNavigator | READY |
| NAV-002 | Navigation | iOS Login to PIN. | IOS-FILE-006 | LT-010 | MAP-002 | AppNavigator | READY |
| NAV-003 | Navigation | iOS Settings to QR scanner. | IOS-FILE-002 | LT-008 | MAP-003 | AppNavigator/QRCodeScannerScreen | READY |
| NAV-004 | Navigation | iOS QR scanner to Settings. | IOS-FILE-007 | LT-008, LT-009 | MAP-003 | AppNavigator/QRCodeScannerScreen | READY |
| NAV-005 | Navigation | Android Login to Settings. | AND-FILE-010 | LT-020 | MAP-002 | AppNavigator | READY |
| NAV-006 | Navigation | Android Login to PIN. | AND-FILE-010 | LT-020 | MAP-002 | AppNavigator | READY |
| NAV-007 | Navigation | Android Settings to QR scanner. | AND-FILE-002 | LT-019 | MAP-003 | AppNavigator/QRCodeScannerScreen | READY |
| NAV-008 | Navigation | Android QR scanner to Settings. | AND-FILE-011, AND-FILE-002 | LT-019 | MAP-003 | AppNavigator/QRCodeScannerScreen | READY |
| ERRPATH-001 | Error | iOS invalid input. | IOS-FILE-002 | LT-002, LT-003 | MAP-001 | SettingsScreen | READY |
| ERRPATH-002 | Error | iOS URL build failure. | IOS-FILE-002 | LT-025 | MAP-004 | storageConfigService | READY |
| ERRPATH-003 | Error | iOS non-200 check-access. | IOS-FILE-002 | LT-005 | MAP-004, MAP-014 | storageConfigService | READY |
| ERRPATH-004 | Error | iOS invalid QR. | IOS-FILE-007 | LT-009 | MAP-003, MAP-005 | QRCodeScannerScreen/storageConfigQr | READY |
| ERRPATH-005 | Error | Android invalid input. | AND-FILE-002 | LT-015 | MAP-001 | SettingsScreen | READY |
| ERRPATH-006 | Error | Android non-OK check-access. | AND-FILE-002 | LT-017 | MAP-004, MAP-014 | storageConfigService | READY |
| ERRPATH-007 | Error | Android invalid QR. | AND-FILE-011, AND-FILE-002 | LT-019 | MAP-003, MAP-005 | QRCodeScannerScreen/storageConfigQr | READY |
| ERRPATH-008 | Error | Android config file not applied. | AND-FILE-006, AND-FILE-009 | LT-013 | MAP-013, MAP-019, MAP-022 | configFileService | READY |
| DEP-001 | Dependency | iOS UserDefaults. | IOS-FILE-001 | LT-001 | MAP-008, MAP-026 | storageConfigStorage | READY |
| DEP-002 | Dependency | iOS Alamofire. | IOS-FILE-002 | LT-004, LT-005 | MAP-004, MAP-014 | storageConfigService | READY |
| DEP-003 | Dependency | iOS MBProgressHUD. | IOS-FILE-002 | LT-004, LT-005 | MAP-001 | SettingsScreen loading state | READY |
| DEP-004 | Dependency | Android SharedPreferences. | AND-FILE-009 | LT-012, LT-016 | MAP-008, MAP-026 | storageConfigStorage | READY |
| DEP-005 | Dependency | Android Gson. | AND-FILE-006 | LT-012, LT-013 | MAP-013 | configFileService | READY |
| DEP-006 | Dependency | Android OkHttp/HttpStatusUtil. | AND-FILE-002 | LT-016, LT-017 | MAP-004, MAP-014 | storageConfigService | READY |
| DEP-007 | Dependency | Android ML Kit scanner. | AND-FILE-011 | LT-019 | MAP-003, MAP-029 | QRCodeScannerScreen | READY |
| UI-001 | UI | iOS settings fields. | IOS-FILE-002 | LT-001 | MAP-001 | SettingsScreen | READY |
| UI-002 | UI | iOS save/cancel buttons. | IOS-FILE-002 | LT-002, LT-004 | MAP-001 | SettingsScreen | READY |
| UI-003 | UI | iOS QR import UI. | IOS-FILE-002 | LT-008 | MAP-001, MAP-003 | SettingsScreen/QRCodeScannerScreen | READY |
| UI-004 | UI | Android settings fields. | AND-FILE-002 | LT-014, LT-015 | MAP-001 | SettingsScreen | READY |
| UI-005 | UI | Android protocol spinner. | AND-FILE-002 | LT-014 | MAP-001, MAP-021 | SettingsScreen | READY |
| UI-006 | UI | Android language spinner. | AND-FILE-002 | LT-018, LT-027 | MAP-001, MAP-012, MAP-023 | SettingsScreen | READY |
| UI-007 | UI | Android QR import UI. | AND-FILE-002 | LT-019 | MAP-001, MAP-003 | SettingsScreen/QRCodeScannerScreen | READY |
| SEC-001 | Security | iOS secrets in UserDefaults. | IOS-FILE-001 | LT-029 | MAP-009, MAP-011, MAP-025, MAP-027 | SecureStore-backed storage | READY |
| SEC-002 | Security | Android secrets in SharedPreferences/base64 password. | AND-FILE-001, AND-FILE-010 | LT-021, LT-029 | MAP-009, MAP-011, MAP-025, MAP-027 | SecureStore-backed storage | READY |
| SEC-003 | Security | Android HTTPS without validation. | AND-FILE-001, AND-FILE-012 | LT-014, LT-016, LT-026 | MAP-010, MAP-021 | protocol model/http service | READY |
| SEC-004 | Security | Check URL success/failure contract. | IOS-FILE-002, AND-FILE-002 | LT-004, LT-005, LT-016, LT-017 | MAP-004, MAP-014 | storageConfigService | READY |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| DEP-007 | Physical camera integration is not unit-testable in storage-config scope. | No | Test parser/controller handoff with strings; run device tests only in scanner feature. |
| API-005 | License/session API is dependency behavior, not storage-config core. | No | Verify secure token storage and expose token provider for later feature phases. |
| iOS legacy test target | No iOS test files found during discovery. | No | Phase 2 should document setup if adding iOS tests is infeasible in the project. |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
