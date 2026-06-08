# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_3/31_rn_implementation_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T14:10:00+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx | SettingsScreen | Add | EP-001, EP-002, EP-003, EP-007, EP-008, BEH-001, BEH-002, BEH-003, BEH-010, BEH-011, BEH-012, UI-001, UI-002, UI-003, UI-004, UI-005, UI-006, UI-007 |
| MAP-002 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx; src/screens/LoginScreen.tsx; src/screens/PinScreen.tsx | AppNavigator, LoginScreen, PinScreen | Add/Adapt | EP-004, EP-009, BEH-007, BEH-016, NAV-001, NAV-002, NAV-005, NAV-006, STATE-001 |
| MAP-003 | rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Add | EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007 |
| MAP-004 | rn-e-mobilebrowser/src/services/storageConfigService.ts | checkAccess, buildCheckAccessUrl | Add | API-001, API-003, BEH-003, BEH-012, ERRPATH-002, ERRPATH-003, ERRPATH-006 |
| MAP-005 | rn-e-mobilebrowser/src/utils/storageConfigQr.ts | parseStorageConfigQr, normalizeScannedQr, isValidQrSettings, isValidScannedQrPayload | Add | BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007 |
| MAP-006 | rn-e-mobilebrowser/src/services/loginUrlService.ts | buildLoginUrl, buildLoginUrlFromPreferences | Add | BEH-008, BEH-017, API-002, API-004 |
| MAP-007 | rn-e-mobilebrowser/src/services/sessionService.ts | getSessionToken, setSessionToken | Adapt | API-005, SEC-001, SEC-002 |
| MAP-008 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | STORAGE_KEYS, getLoginPreferences | Add | STOR-001, STOR-005 |
| MAP-009 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | SecureStore token/pin + AsyncStorage server/client | Add | STOR-002, STOR-006, SEC-001, SEC-002 |
| MAP-010 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveProtocolPreference, normalizeProtocol | Add | STOR-003, STOR-007, SEC-003 |
| MAP-011 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveLoginPreferences, hasValidLoginPreference | Add | STOR-004, STOR-008 |
| MAP-012 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | saveLocale, getLocale, saveCurrentConfigVersion | Add | STOR-009, BEH-009, BEH-013 |
| MAP-013 | rn-e-mobilebrowser/src/services/configFileService.ts | applyBundledConfigIfNeeded, mapConfigFileToSettings | Add | STOR-010, BEH-009, ERRPATH-008 |
| MAP-014 | rn-e-mobilebrowser/src/services/storageConfigService.ts | checkAccess | Add | API-001, API-003 |
| MAP-015 | rn-e-mobilebrowser/src/utils/urlBuilder.ts | buildCheckAccessUrl, buildLoginUrl | Add | API-002, API-004, BEH-008, BEH-017 |
| MAP-016 | rn-e-mobilebrowser/src/services/sessionService.ts | getSessionToken | Excluded (contract only) | API-005, SEC-001, SEC-002 |
| MAP-017 | rn-e-mobilebrowser/src/hooks/useStorageConfig.ts | useStorageConfig | Add | STATE-001, STATE-002, STATE-005, BEH-001, BEH-010 |
| MAP-018 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx; src/utils/storageConfigQr.ts | qrPayload navigation + applyQrSettings | Add | STATE-003, STATE-006, BEH-006, BEH-015 |
| MAP-019 | rn-e-mobilebrowser/src/hooks/useConfigBootstrap.ts | useConfigBootstrap | Add | STATE-004, BEH-009, ERRPATH-008 |
| MAP-020 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | hasValidLoginPreference, saveValidLoginPreference | Adapt (dependency) | STATE-007, STOR-004, STOR-008 |
| MAP-021 | rn-e-mobilebrowser/src/types/storageConfig.ts; storageConfigStorage.ts | HttpProtocol enum 0/1/2 | Add | STOR-003, STOR-007, SEC-003 |
| MAP-022 | rn-e-mobilebrowser/src/services/configFileService.ts; App.tsx | bundledConfig=null → NOT_PRESENT | Adapt | BEH-009, STOR-010 |
| MAP-023 | rn-e-mobilebrowser/src/utils/storageConfigQr.ts | optional culture + fallback | Add | BEH-013, STOR-009 |
| MAP-024 | rn-e-mobilebrowser/src/utils/urlBuilder.ts | encodeURIComponent + scheme guard | Add | API-002, API-004 |
| MAP-025 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | SecureStore for password/token/pin | Add | SEC-001, SEC-002 |
| MAP-026 | @react-native-async-storage/async-storage | Reuse | Reuse | DEP-001, DEP-004 |
| MAP-027 | expo-secure-store | Reuse | Reuse | SEC-001, SEC-002 |
| MAP-028 | jest/jest-expo | Reuse | Reuse | RN-FILE-001 |
| MAP-029 | expo-camera | Add | Add | DEP-007, MAP-003 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| @react-native-async-storage/async-storage | Reuse | Non-sensitive persisted settings | DEP-001, DEP-004, MAP-026 |
| expo-secure-store | Reuse | Token, PIN, password protection | SEC-001, SEC-002, MAP-027 |
| @react-navigation/native-stack | Add | Screen navigation for settings guard and QR flow | NAV-001..NAV-008, MAP-002 |
| react-native-screens, react-native-safe-area-context | Add | React Navigation peer dependencies | MAP-002 |
| expo-camera | Add | QR scanner camera UI (MAP-003, DEP-007) | MAP-029 |
| jest/jest-expo | Reuse | Phase 4 test harness already configured | MAP-028 |

## Implementierungsreihenfolge

1. Types und Utils (`HttpProtocol`, validation, URL builder, QR parser)
2. Storage und Services (`storageConfigStorage`, `storageConfigService`, `loginUrlService`, `sessionService`, `configFileService`)
3. Hooks (`useStorageConfig`, `useConfigBootstrap`)
4. UI Components (`SettingsForm`)
5. Screens (`SettingsScreen`, `LoginScreen`, `PinScreen`, `QRCodeScannerScreen`)
6. Navigation und App-Einstieg (`AppNavigator`, `App.tsx`)
