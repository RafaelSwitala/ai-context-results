# Traceability Matrix

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS settings load | SettingsViewController.viewDidLoad | LT-001, LT-010 | MAP-001 | SettingsScreen | READY_FOR_REVIEW |
| EP-002 | Entry Point | iOS settings save | saveTouched | LT-004, LT-006, LT-014 | MAP-001, MAP-004 | SettingsScreen | READY_FOR_REVIEW |
| EP-003 | Entry Point | Android settings load | SettingsActivity.onCreate | LT-001, LT-011 | MAP-001 | SettingsScreen | READY_FOR_REVIEW |
| EP-004 | Entry Point | Android settings save | save onClick | LT-005, LT-006 | MAP-001, MAP-004 | SettingsScreen | READY_FOR_REVIEW |
| EP-005 | Entry Point | Android config bootstrap | App.updateSettingsOnVersionChanged | LT-013, LT-016 | MAP-006, MAP-022 | settingsBootstrapService | READY_FOR_REVIEW |
| BEH-001 | Behavior | prefill settings | viewDidLoad/onCreate | LT-001 | MAP-001, MAP-016, MAP-005 | useSettingsFormState | READY_FOR_REVIEW |
| BEH-002 | Behavior | validate server and pin | isValid/isPinValid | LT-002, LT-003 | MAP-001, MAP-016 | SettingsScreen | READY_FOR_REVIEW |
| BEH-003 | Behavior | save after reachability | save flows | LT-004, LT-005, LT-006 | MAP-004, MAP-017 | connectivityService | READY_FOR_REVIEW |
| BEH-004 | Behavior | iOS protocol switch | httpsProtocol | LT-007 | MAP-018, MAP-019 | useProtocolState | READY_FOR_REVIEW |
| BEH-005 | Behavior | Android protocol spinner | spinnerProtocol | LT-008 | MAP-018, MAP-019 | useProtocolState | READY_FOR_REVIEW |
| BEH-006 | Behavior | QR prefill | unwind/onActivityResult | LT-009, LT-015 | MAP-002, MAP-027 | qrSettingsParser | READY_FOR_REVIEW |
| BEH-007 | Behavior | iOS cancel visibility | hasValidSettings gate | LT-010 | MAP-003 | SettingsScreen | READY_FOR_REVIEW |
| BEH-008 | Behavior | Android cancel visibility | hasSavedPreferences | LT-011 | MAP-003 | SettingsScreen | READY_FOR_REVIEW |
| BEH-009 | Behavior | locale immediate save | spinner listener | LT-012 | MAP-007, MAP-021 | localeService | READY_FOR_REVIEW |
| BEH-010 | Behavior | config bootstrap | version change | LT-013 | MAP-006, MAP-022 | settingsBootstrapService | READY_FOR_REVIEW |
| BEH-011 | Behavior | Douglas server migration | replaceDouglasServerName | LT-017 | MAP-005 | settingsStorageService | READY_FOR_REVIEW |
| STATE-001 | State | hasValidSettings true | save success | LT-004, LT-005 | MAP-012, MAP-017 | settingsStorageService | READY_FOR_REVIEW |
| STATE-002 | State | config version update | saveCurrentConfigVersion | LT-013 | MAP-014, MAP-006 | settingsBootstrapService | READY_FOR_REVIEW |
| STOR-001 | Storage | iOS server key | mb_server_key | LT-001, LT-004 | MAP-008 | settingsStorageService | READY_FOR_REVIEW |
| STOR-002 | Storage | iOS client key | mb_client_key | LT-001 | MAP-009 | settingsStorageService | READY_FOR_REVIEW |
| STOR-003 | Storage | iOS token/pin keys | mb_token_key/mb_pin_key | LT-004 | MAP-010 | settingsStorageService | READY_FOR_REVIEW |
| STOR-004 | Storage | iOS protocol key | mb_httpProtocol_key | LT-007 | MAP-011 | settingsStorageService | READY_FOR_REVIEW |
| STOR-005 | Storage | iOS valid settings flag | mb_valid_settings_key | LT-004, LT-010 | MAP-012 | settingsStorageService | READY_FOR_REVIEW |
| STOR-006 | Storage | Android server key | SERVER | LT-001, LT-005 | MAP-008 | settingsStorageService | READY_FOR_REVIEW |
| STOR-007 | Storage | Android client key | CLIENT | LT-001 | MAP-009 | settingsStorageService | READY_FOR_REVIEW |
| STOR-008 | Storage | Android token/pin | TOKEN/PIN | LT-005 | MAP-010 | settingsStorageService | READY_FOR_REVIEW |
| STOR-009 | Storage | Android protocol | PROTOCOL | LT-008 | MAP-011 | settingsStorageService | READY_FOR_REVIEW |
| STOR-010 | Storage | Android valid settings | HAS_VALID_SETTINGS | LT-005, LT-011 | MAP-012 | settingsStorageService | READY_FOR_REVIEW |
| STOR-011 | Storage | Android locale | LOCALE_SYMBOL | LT-012 | MAP-013, MAP-007 | localeService | READY_FOR_REVIEW |
| STOR-012 | Storage | Android config version | CURRENT_CONFIG_VERSION | LT-013 | MAP-014 | settingsBootstrapService | READY_FOR_REVIEW |
| API-001 | API | iOS check access GET | AF.request | LT-004, LT-006 | MAP-015, MAP-004 | connectivityService | READY_FOR_REVIEW |
| API-002 | API | Android check access GET | HttpStatusUtil | LT-005, LT-006 | MAP-015, MAP-004 | connectivityService | READY_FOR_REVIEW |
| NAV-001 | Navigation | iOS dismiss after save | dismiss | LT-004 | MAP-020 | navigation feature | READY_FOR_REVIEW |
| NAV-002 | Navigation | iOS to QR scanner | QRCODE_SCANNER segue | LT-009 | MAP-027 | QrScannerScreen | READY_FOR_REVIEW |
| NAV-003 | Navigation | Android to Login after save | startActivity Login | LT-005 | MAP-020 | navigation feature | READY_FOR_REVIEW |
| NAV-004 | Navigation | Android to QR scanner | startActivityForResult | LT-009 | MAP-027 | QrScannerScreen | READY_FOR_REVIEW |
| ERRPATH-001 | Error Path | validation errors | pin/server invalid | LT-002, LT-003 | MAP-001 | SettingsScreen | READY_FOR_REVIEW |
| ERRPATH-002 | Error Path | HTTP check failure | non-OK status | LT-006 | MAP-004 | connectivityService | READY_FOR_REVIEW |
| ERRPATH-003 | Error Path | iOS URL build nil | buildCheckAccessUrl nil | LT-014 | MAP-004 | connectivityService | READY_FOR_REVIEW |
| ERRPATH-004 | Error Path | invalid QR ignored | isValid false | LT-015 | MAP-002 | qrSettingsParser | READY_FOR_REVIEW |
| ERRPATH-005 | Error Path | config load fail | ConfigFileLoader null | LT-016 | MAP-006 | settingsBootstrapService | READY_FOR_REVIEW |
| DEP-001 | Dependency | Alamofire | iOS HTTP check | LT-004 | MAP-004 | connectivityService | READY_FOR_REVIEW |
| DEP-002 | Dependency | MBProgressHUD | iOS spinner | LT-004 | MAP-001 | SettingsScreen | READY_FOR_REVIEW |
| DEP-003 | Dependency | HttpStatusUtil | Android HTTP check | LT-005 | MAP-004 | connectivityService | READY_FOR_REVIEW |
| DEP-004 | Dependency | Gson config loader | config.json | LT-013 | MAP-006 | settingsBootstrapService | READY_FOR_REVIEW |
| DEP-005 | Dependency | QRCodeParser | QR prefill | LT-009 | MAP-002 | qrSettingsParser | READY_FOR_REVIEW |
| UI-001 | UI | iOS keyboard insets | scrollView adjustments | N/A | MAP-001 | SettingsScreen | READY_FOR_REVIEW |
| UI-002 | UI | Android language spinner disable | single language | LT-012 | MAP-007 | SettingsScreen | READY_FOR_REVIEW |
| UI-003 | UI | Android protocol spinner options | 3 protocols | LT-008 | MAP-019 | SettingsScreen | READY_FOR_REVIEW |
| UI-004 | UI | iOS https default true | no valid settings yet | LT-010 | MAP-019 | SettingsScreen | READY_FOR_REVIEW |
| SEC-001 | Security | plain pin/token storage | PreferencesUtils | LT-004, LT-005 | MAP-010, MAP-026 | secure storage | READY_FOR_REVIEW |
| SEC-002 | Security | insecure TLS option | PROTOCOL_HTTPS_WITHOUT_VALIDATION | LT-008 | MAP-019 | useProtocolState | READY_FOR_REVIEW |
| SEC-003 | Security | network preflight on save | HTTP check | LT-004, LT-005 | MAP-004, MAP-015 | connectivityService | READY_FOR_REVIEW |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| N/A | Keine offenen Traceability-Lücken in P1-A12 | N/A | N/A |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
