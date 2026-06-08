# RN Mapping Status

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_3/33_rn_mapping_status.md |
| Status | COMPLETED_WITH_PARTIALS |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:33:53+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | SettingsScreen | `src/screens/SettingsScreen.tsx` renders server, mandant, protocol, token, PIN, culture, QR import and save. | Typecheck PASS. |
| MAP-002 | IMPLEMENTED | AppNavigator/LoginScreen | `src/navigation/AppNavigator.tsx` and `src/screens/LoginScreen.tsx` route invalid settings to settings. | PIN screen is represented as dependency state, not full PIN feature. |
| MAP-003 | PARTIAL | QRCodeScannerScreen | `src/screens/QRCodeScannerScreen.tsx` handles scanned strings, duplicates and invalid QR. | Physical camera dependency deferred by MAP-029. |
| MAP-004 | IMPLEMENTED | storageConfigService | `buildCheckAccessUrl` and `checkAccess` added with injected HTTP GET. | Typecheck PASS. |
| MAP-005 | IMPLEMENTED | storageConfigQr | `normalizeScannedQr`, `parseStorageConfigQr`, `isValidQrSettings` added. | Pure utility ready for Phase 4 tests. |
| MAP-006 | IMPLEMENTED | loginUrlService | `buildLoginUrl` and `buildLoginUrlFromPreferences` added. | Login behavior itself out of storage-config scope. |
| MAP-007 | IMPLEMENTED | sessionService | `getSessionToken` reads token from storage service. | No license API behavior implemented. |
| MAP-008 | IMPLEMENTED | storageConfigStorage | Legacy semantic key constants plus read service added. | Uses Android active keys and documents iOS aliases. |
| MAP-009 | IMPLEMENTED | storageConfigStorage | `saveSettingsPreferences` stores token/PIN in SecureStore. | Stronger than legacy storage. |
| MAP-010 | IMPLEMENTED | storageConfig types/storage | `HttpProtocol` supports 0/1/2; invalid reads default to HTTPS, invalid writes ignored. | Typecheck PASS. |
| MAP-011 | IMPLEMENTED | storageConfigStorage | `saveLoginPreferences`, `saveValidLoginPreference` added; password uses SecureStore. | Login feature can reuse contract. |
| MAP-012 | IMPLEMENTED | storageConfigStorage | `saveLocale`, `saveCurrentConfigVersion` added. | Optional fields preserved. |
| MAP-013 | PARTIAL | configFileService | `parseConfigFile` and `applyConfigFileIfNewer` added. | No RN bundled config asset exists. |
| MAP-014 | IMPLEMENTED | storageConfigService | `checkAccess` returns success/failure status with no-cache header. | HTTP calls injectable for Phase 4. |
| MAP-015 | IMPLEMENTED | loginUrlService | Uses `MOBILE_BROWSER_PATH` and `DEFAULT_PAGE` constants. | Culture included only when present. |
| MAP-016 | IMPLEMENTED | sessionService | Token provider only. | License/session endpoint excluded per P1 contract. |
| MAP-017 | IMPLEMENTED | useStorageConfig | Hook loads defaults, validates PIN/server, checks access, then persists and marks valid. | Typecheck PASS. |
| MAP-018 | IMPLEMENTED | useStorageConfigQrImport | Hook parses scanned value and returns fields without persistence. | Typecheck PASS. |
| MAP-019 | PARTIAL | configFileService | Versioned apply function exists. | App bootstrap not wired because RN config asset is NOT_PRESENT. |
| MAP-020 | IMPLEMENTED | storageConfigStorage | `hasValidLogin` read/write contract added. | Logout/session behavior remains auth dependency. |
| MAP-021 | IMPLEMENTED | storageConfig types/service | Protocol 2 modeled and mapped to HTTPS transport. | Covers Android superset. |
| MAP-022 | EXCLUDED | config file asset bootstrap | No RN `config.json` or product flavor asset pipeline present. | Service implemented for future asset input; runtime asset import NOT_PRESENT. |
| MAP-023 | IMPLEMENTED | storageConfigQr | Optional culture field with available/default fallback added. | Defaults remain non-breaking for iOS QR. |
| MAP-024 | IMPLEMENTED | storageConfigService | URL builder encodes server/client and prepends scheme. | Typecheck PASS. |
| MAP-025 | IMPLEMENTED | storageConfigStorage/loginUrlService | Password stored in SecureStore and encoded only for login URL. | Stronger protection than legacy. |
| MAP-026 | IMPLEMENTED | package dependency | `@react-native-async-storage/async-storage` present and imported. | Reused. |
| MAP-027 | IMPLEMENTED | package dependency | `expo-secure-store` present and imported. | Reused. |
| MAP-028 | IMPLEMENTED | package dependency | Jest/jest-expo present; local Jest binary loads. | 0 tests until Phase 4. |
| MAP-029 | EXCLUDED | QR scanner package | No scanner package added. | Deferred to camera/device integration; parser/handoff implemented. |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| MAP-003, MAP-029 | Physical camera QR scanning is not implemented. | Blocks full device parity, not parser/storage Phase 4 unit tests. | Add an Expo-compatible camera/scanner dependency in scanner integration scope and wire decoded string into `useStorageConfigQrImport`. |
| MAP-013, MAP-019, MAP-022 | No RN bundled `config.json` asset exists, so startup bootstrap is not wired. | Blocks Android config-file parity only if RN product config delivery is required. | Add product config asset delivery or keep documented NOT_PRESENT in Phase 5. |
