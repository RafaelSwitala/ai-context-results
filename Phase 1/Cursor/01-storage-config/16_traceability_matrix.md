# Traceability Matrix

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS Settings Save | SettingsViewContoller.saveTouched | LT-001, LT-008 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| EP-002 | Entry Point | Android Settings Save | SettingsActivity onClick | LT-002, LT-008 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| EP-003 | Entry Point | iOS Login Gating | LoginViewController.viewDidLoad | LT-003 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| EP-004 | Entry Point | Android Login Gating | LoginActivity.onCreate | LT-004 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| EP-005 | Entry Point | Android Config-Version Update | App.updateSettingsOnVersionChanged | LT-005, LT-011 | MAP-019 | src/services/storageConfigBootstrap.ts | READY_FOR_REVIEW |
| BEH-001 | Behavior | iOS save-after-check | SettingsViewContoller.saveTouched | LT-001 | MAP-001, MAP-005 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| BEH-002 | Behavior | Android save-after-check | SettingsActivity onClick | LT-002 | MAP-001, MAP-005 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| BEH-003 | Behavior | iOS enforce settings first | LoginViewController.viewDidLoad | LT-003 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| BEH-004 | Behavior | Android enforce settings/PIN first | LoginActivity.onCreate | LT-004 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| BEH-005 | Behavior | Android config migration | App.updateSettingsOnVersionChanged | LT-005, LT-011 | MAP-019 | src/services/storageConfigBootstrap.ts | READY_FOR_REVIEW |
| BEH-006 | Behavior | QR settings prefill | QRCodeParser.parse (iOS/Android) | LT-006, LT-007, LT-009 | MAP-003, MAP-020 | src/features/storageConfig/qrConfigParser.ts | READY_FOR_REVIEW |
| STATE-001 | State | iOS valid settings transition | PreferencesUtils.saveValidSettingsPreference | LT-001 | MAP-015 | src/hooks/useStorageConfigState.ts | READY_FOR_REVIEW |
| STATE-002 | State | Android valid settings transition | PreferencesUtils.saveValidSettingsPreference | LT-002 | MAP-015 | src/hooks/useStorageConfigState.ts | READY_FOR_REVIEW |
| STATE-003 | State | iOS valid login transition | LoginViewController.LoginButtonTouchUp | LT-003 | MAP-016 | src/hooks/useLoginState.ts | READY_FOR_REVIEW |
| STATE-004 | State | Android valid login transition | LoginActivity onClick | LT-004 | MAP-016 | src/hooks/useLoginState.ts | READY_FOR_REVIEW |
| STATE-005 | State | Android config version transition | PreferencesUtils.saveCurrentConfigVersion | LT-005 | MAP-017, MAP-019 | src/hooks/useStorageConfigState.ts | READY_FOR_REVIEW |
| STOR-001 | Storage | iOS server key | PreferncesUtils Keys.userName/server block | LT-001 | MAP-007 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-002 | Storage | iOS client key | PreferncesUtils client | LT-001 | MAP-008 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-003 | Storage | iOS token key | PreferncesUtils token | LT-001 | MAP-009 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-004 | Storage | iOS pin key | PreferncesUtils pin | LT-001, LT-008 | MAP-009 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-005 | Storage | iOS protocol key | PreferncesUtils httpProtocol | LT-001, LT-006 | MAP-010, MAP-018 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-006 | Storage | iOS validity flags | PreferncesUtils hasValid* | LT-001, LT-003 | MAP-011 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-007 | Storage | Android server key | PreferencesUtils.SERVER | LT-002 | MAP-007 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-008 | Storage | Android client key | PreferencesUtils.CLIENT | LT-002 | MAP-008 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-009 | Storage | Android pin/token keys | PreferencesUtils.PIN/TOKEN | LT-002, LT-008 | MAP-009 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-010 | Storage | Android protocol key | PreferencesUtils.PROTOCOL | LT-002, LT-006, LT-009 | MAP-010, MAP-018 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-011 | Storage | Android validity flags | PreferencesUtils.HAS_VALID_* | LT-002, LT-004 | MAP-011 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-012 | Storage | Android locale key | PreferencesUtils.LOCALE_SYMBOL | LT-007 | MAP-012, MAP-020 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| STOR-013 | Storage | Android config version key | PreferencesUtils.CURRENT_CONFIG_VERSION | LT-005 | MAP-012, MAP-019 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| API-001 | API | iOS check access call | AF.request(checkAccessUrl) | LT-001, LT-010 | MAP-013 | src/services/connectivityService.ts | READY_FOR_REVIEW |
| API-002 | API | Android check access call | HttpStatusUtil.getHttpStatus | LT-002 | MAP-013 | src/services/connectivityService.ts | READY_FOR_REVIEW |
| API-003 | API | iOS login URL/call | AF.request(loginUrl) | LT-010 | MAP-014 | src/services/loginUrlService.ts | READY_FOR_REVIEW |
| API-004 | API | Android login URL handoff | LoginActivity buildLoginUrl + Intent | LT-004 | MAP-014 | src/services/loginUrlService.ts | READY_FOR_REVIEW |
| NAV-001 | Navigation | iOS Login->Settings | openSettingsButtonTapped | LT-003 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| NAV-002 | Navigation | iOS Settings->Login | dismiss after save | LT-001 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| NAV-003 | Navigation | Android Login->Settings | LoginActivity.startActivity(Settings) | LT-004 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| NAV-004 | Navigation | Android Settings->Login | SettingsActivity.startActivity(Login) | LT-002 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| NAV-005 | Navigation | Android Login->Pin | LoginActivity.startActivity(Pin) | LT-004 | MAP-002 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-001 | Error Path | iOS settings request failure | showSettingsErrorDialog | LT-001, LT-008 | MAP-001, MAP-013 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-002 | Error Path | Android settings request failure | showSettingsErrorDialog | LT-002, LT-008 | MAP-001, MAP-013 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-003 | Error Path | iOS pin invalid | showWrongPinLengthErrorDialog | LT-008 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-004 | Error Path | Android pin invalid | showWrongPinErrorDialog | LT-008 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-005 | Error Path | Android config parse/load failure | ConfigFileLoader returns null | LT-011 | MAP-019 | src/services/storageConfigBootstrap.ts | READY_FOR_REVIEW |
| DEP-001 | Dependency | iOS UserDefaults | PreferncesUtils.sharedPreferences | LT-001 | MAP-004, MAP-022 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| DEP-002 | Dependency | iOS Alamofire | Settings/Login controllers | LT-001, LT-010 | MAP-024 | src/services/connectivityService.ts | READY_FOR_REVIEW |
| DEP-003 | Dependency | Android SharedPreferences | App.onCreate + PreferencesUtils | LT-002, LT-005 | MAP-004, MAP-022 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| DEP-004 | Dependency | Android Gson | ConfigFileLoader | LT-005, LT-011 | MAP-019 | src/services/storageConfigBootstrap.ts | READY_FOR_REVIEW |
| DEP-005 | Dependency | Android App singleton | App.getInstance | LT-005 | MAP-004 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| UI-001 | UI | iOS cancel hidden without valid settings | SettingsViewController.viewDidLoad | LT-003 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| UI-002 | UI | Android cancel hidden without saved prefs | SettingsActivity.hasSavedPreferences | LT-004 | MAP-001 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| UI-003 | UI | QR fills settings fields | Settings unwind/onActivityResult | LT-006 | MAP-003 | src/features/storageConfig/qrConfigParser.ts | READY_FOR_REVIEW |
| UI-004 | UI | Android spinner saves locale | SettingsActivity spinner listener | LT-007 | MAP-020 | src/screens/settings/SettingsScreen.tsx | READY_FOR_REVIEW |
| SEC-001 | Security | iOS sensitive values plain persisted | PreferncesUtils password/token/pin | LT-001 | MAP-009, MAP-021, MAP-023 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| SEC-002 | Security | Android sensitive values plain persisted | PreferencesUtils PASSWORD/TOKEN/PIN | LT-002 | MAP-009, MAP-021, MAP-023 | src/services/storageConfigService.ts | READY_FOR_REVIEW |
| SEC-003 | Security | Android insecure TLS mode option | PROTOCOL_HTTPS_WITHOUT_VALIDATION | LT-009 | MAP-018 | src/services/connectivityService.ts | READY_FOR_REVIEW |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| N/A | Keine offenen Traceability-Lücken in P1-A12 identifiziert | N/A | N/A |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
