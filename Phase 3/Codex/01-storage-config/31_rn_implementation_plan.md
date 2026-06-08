# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_3/31_rn_implementation_plan.md |
| Status | COMPLETED |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:33:53+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx | SettingsScreen | Add settings form for server, mandant, protocol, token, PIN, culture and QR import handoff. | EP-001, EP-002, EP-003, EP-007, EP-008, BEH-001, BEH-002, BEH-003, BEH-010, BEH-011, BEH-012, UI-001..UI-007 |
| MAP-002 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx; rn-e-mobilebrowser/src/screens/LoginScreen.tsx | AppNavigator/LoginScreen settings guard | Add minimal internal navigator and invalid-settings routing. | EP-004, EP-009, BEH-007, BEH-016, NAV-001, NAV-002, NAV-005, NAV-006, STATE-001 |
| MAP-003 | rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Add parser handoff screen; physical camera dependency deferred because no QR scanner package exists. | EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007 |
| MAP-004 | rn-e-mobilebrowser/src/services/storageConfigService.ts | buildCheckAccessUrl/checkAccess | Add pure URL builder plus injected fetch check. | API-001, API-002, API-003, API-004, BEH-003, BEH-012, ERRPATH-002, ERRPATH-003, ERRPATH-006 |
| MAP-005 | rn-e-mobilebrowser/src/utils/storageConfigQr.ts | normalizeScannedQr/parseStorageConfigQr/isValidQrSettings | Add pure QR utilities with iOS defaults and Android culture/protocol superset. | BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007 |
| MAP-006 | rn-e-mobilebrowser/src/services/loginUrlService.ts | buildLoginUrl/buildLoginUrlFromPreferences | Add dependency URL builder using storage contract and optional Culture. | BEH-008, BEH-017, API-002, API-004 |
| MAP-007 | rn-e-mobilebrowser/src/services/sessionService.ts | getSessionToken | Add token provider only; no license/session behavior. | API-005, SEC-001, SEC-002 |
| MAP-008 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | STORAGE_CONFIG_KEYS/loadStorageConfig | Add compatibility key constants and AsyncStorage/SecureStore split. | STOR-001, STOR-005 |
| MAP-009 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveSettingsPreferences | Add setting persistence with SecureStore for token/PIN. | STOR-002, STOR-006, SEC-001, SEC-002 |
| MAP-010 | rn-e-mobilebrowser/src/types/storageConfig.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | HttpProtocol/saveProtocolPreference | Add enum 0/1/2 with invalid read default and invalid write ignore. | STOR-003, STOR-007, SEC-003 |
| MAP-011 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveLoginPreferences/saveValidLoginPreference | Add login dependency storage contract with password in SecureStore. | STOR-004, STOR-008 |
| MAP-012 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveLocale/saveCurrentConfigVersion | Add optional locale/config version fields. | STOR-009, BEH-009, BEH-013 |
| MAP-013 | rn-e-mobilebrowser/src/services/configFileService.ts | parseConfigFile/applyConfigFileIfNewer | Add optional config parser/apply service; no bundled RN config asset present. | STOR-010, BEH-009, ERRPATH-008 |
| MAP-014 | rn-e-mobilebrowser/src/services/storageConfigService.ts | checkAccess | Add GET status contract using injected HTTP function. | API-001, API-003 |
| MAP-015 | rn-e-mobilebrowser/src/services/loginUrlService.ts | buildLoginUrl | Add `/PrestigeEnterprise.MobileBrowser{client}/Default.aspx` URL builder. | API-002, API-004, BEH-008, BEH-017 |
| MAP-016 | rn-e-mobilebrowser/src/services/sessionService.ts | getSessionToken | Add storage-backed token provider; license endpoint excluded. | API-005, SEC-001, SEC-002 |
| MAP-017 | rn-e-mobilebrowser/src/hooks/useStorageConfig.ts | useStorageConfig | Add load/edit/validate/check/save state machine. | STATE-001, STATE-002, STATE-005, BEH-001, BEH-010 |
| MAP-018 | rn-e-mobilebrowser/src/hooks/useStorageConfigQrImport.ts | useStorageConfigQrImport | Add scanned-string import state; imported values do not persist until save. | STATE-003, STATE-006, BEH-006, BEH-015 |
| MAP-019 | rn-e-mobilebrowser/src/services/configFileService.ts | applyConfigFileIfNewer | Add service only; app bootstrap not wired because RN has no bundled config asset. | STATE-004, BEH-009, ERRPATH-008 |
| MAP-020 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveValidLoginPreference/loadStorageConfig | Add valid-login storage dependency; auth/logout behavior remains dependency feature. | STATE-007, STOR-004, STOR-008 |
| MAP-021 | rn-e-mobilebrowser/src/types/storageConfig.ts | HttpProtocol/protocolToScheme | Add Android superset protocol model with HTTPS transport for value 2. | STOR-003, STOR-007, SEC-003 |
| MAP-022 | rn-e-mobilebrowser/src/services/configFileService.ts | parseConfigFile/applyConfigFileIfNewer | Document RN config asset as NOT_PRESENT; service ready for future asset input. | BEH-009, STOR-009, STOR-010 |
| MAP-023 | rn-e-mobilebrowser/src/utils/storageConfigQr.ts | parseStorageConfigQr culture handling | Add optional culture with default fallback. | BEH-013, STOR-009 |
| MAP-024 | rn-e-mobilebrowser/src/services/storageConfigService.ts | buildCheckAccessUrl | Add safe server/client encoding and scheme prepend. | API-002, API-004 |
| MAP-025 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts; rn-e-mobilebrowser/src/services/loginUrlService.ts | SecureStore password / encodePassword | Store password securely; encode for URL generation only. | SEC-001, SEC-002 |
| MAP-026 | package dependency | @react-native-async-storage/async-storage | Reuse installed dependency. | DEP-001, DEP-004, RN-FILE-001 |
| MAP-027 | package dependency | expo-secure-store | Reuse installed dependency. | SEC-001, SEC-002, RN-FILE-001 |
| MAP-028 | package dependency | jest/jest-expo | Reuse installed dependency; Phase 3 no RN tests added. | RN-FILE-001 |
| MAP-029 | package dependency | QR scanner package | Defer add; no existing package and parser handoff implemented without camera dependency. | DEP-007, MAP-003 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| @react-native-async-storage/async-storage | Reuse | Present in package.json and used for non-sensitive settings, flags, locale and config version. | DEP-001, DEP-004, MAP-026 |
| expo-secure-store | Reuse | Present in package.json and used for token, PIN and password. | SEC-001, SEC-002, MAP-027 |
| fetch | Reuse | RN global fetch covers check-access without adding OkHttp/Alamofire replacement dependency. | DEP-002, DEP-006, MAP-004 |
| jest/jest-expo | Reuse | Present for Phase 4 tests; no Phase 3 tests created. | MAP-028 |
| QR scanner package | Not added | No existing package; adding native camera dependency is deferred to scanner/device integration scope. Parser and handoff are implemented. | DEP-007, MAP-029 |
