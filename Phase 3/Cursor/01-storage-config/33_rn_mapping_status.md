# RN Mapping Status

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_3/33_rn_mapping_status.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T14:10:00+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | SettingsScreen + SettingsForm | src/screens/SettingsScreen.tsx, src/components/SettingsForm.tsx | Server, mandant, protocol, token, PIN, locale, save/check-access |
| MAP-002 | IMPLEMENTED | AppNavigator, LoginScreen, PinScreen | src/navigation/AppNavigator.tsx, src/screens/LoginScreen.tsx, src/screens/PinScreen.tsx | Invalid-settings redirect; PIN gate before settings |
| MAP-003 | IMPLEMENTED | QRCodeScannerScreen | src/screens/QRCodeScannerScreen.tsx | expo-camera QR scan, normalize/validate, navigate with qrPayload |
| MAP-004 | IMPLEMENTED | storageConfigService.checkAccess | src/services/storageConfigService.ts | Injectable fetchFn; Cache-Control header |
| MAP-005 | IMPLEMENTED | storageConfigQr utils | src/utils/storageConfigQr.ts | parse, normalize, isValidQrSettings |
| MAP-006 | IMPLEMENTED | loginUrlService | src/services/loginUrlService.ts | buildLoginUrlFromPreferences with Culture param |
| MAP-007 | IMPLEMENTED | sessionService | src/services/sessionService.ts | Token read/write via SecureStore |
| MAP-008 | IMPLEMENTED | storageConfigStorage keys | src/services/storageConfigStorage.ts | Documented legacy key mapping in STORAGE_KEYS |
| MAP-009 | IMPLEMENTED | storageConfigStorage | src/services/storageConfigStorage.ts | SecureStore for token/pin; AsyncStorage for server/client |
| MAP-010 | IMPLEMENTED | saveProtocolPreference | src/services/storageConfigStorage.ts | Invalid writes ignored; invalid reads default HTTPS |
| MAP-011 | IMPLEMENTED | login preference storage | src/services/storageConfigStorage.ts | Username AsyncStorage; password SecureStore |
| MAP-012 | IMPLEMENTED | locale + config version | src/services/storageConfigStorage.ts | saveLocale, getLocale, saveCurrentConfigVersion |
| MAP-013 | IMPLEMENTED | configFileService | src/services/configFileService.ts | map/validate/apply bundled config when provided |
| MAP-014 | IMPLEMENTED | checkAccess | src/services/storageConfigService.ts | GET built URL |
| MAP-015 | IMPLEMENTED | urlBuilder | src/utils/urlBuilder.ts | URL_PATH + Default.aspx pattern |
| MAP-016 | EXCLUDED | sessionService token provider | src/services/sessionService.ts | License API out of scope; storage contract only |
| MAP-017 | IMPLEMENTED | useStorageConfig | src/hooks/useStorageConfig.ts | Load, edit, validate, check-access, save |
| MAP-018 | IMPLEMENTED | Settings qrPayload flow | SettingsScreen + navigation types | QR fills controls without save until Speichern |
| MAP-019 | IMPLEMENTED | useConfigBootstrap | src/hooks/useConfigBootstrap.ts | Called from AppNavigator on startup |
| MAP-020 | IMPLEMENTED | hasValidLoginPreference | src/services/storageConfigStorage.ts | Storage contract for login feature dependency |
| MAP-021 | IMPLEMENTED | HttpProtocol enum | src/types/storageConfig.ts | 0=http, 1=https, 2=httpsWithoutValidation |
| MAP-022 | EXCLUDED | configFileService + App bundledConfig=null | App.tsx passes null | No RN product-flavor config.json; Android-only divergence documented |
| MAP-023 | IMPLEMENTED | culture in QR parser | src/utils/storageConfigQr.ts | Optional culture with availableLocales fallback |
| MAP-024 | IMPLEMENTED | urlBuilder encoding | src/utils/urlBuilder.ts | encodeURIComponent; no double scheme |
| MAP-025 | IMPLEMENTED | SecureStore secrets | src/services/storageConfigStorage.ts | Stronger than legacy base64/UserDefaults |
| MAP-026 | IMPLEMENTED | @react-native-async-storage/async-storage | package.json | Reused existing dependency |
| MAP-027 | IMPLEMENTED | expo-secure-store | package.json | Reused existing dependency |
| MAP-028 | IMPLEMENTED | jest/jest-expo | jest.config.js | Reused; tests deferred to Phase 4 |
| MAP-029 | IMPLEMENTED | expo-camera | package.json, QRCodeScannerScreen.tsx | Installed via expo install |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| MAP-022 | Kein gebündeltes flavor-spezifisches config.json im RN-Projekt | Nein | Phase 4/5: Divergenztest mit injiziertem Config-Fixture oder NOT_PRESENT-Begründung |
| MAP-016 | Lizenz-API nicht implementiert | Nein | Separates Session/License-Feature nutzt getSessionToken |
| MAP-003 | Kamera-UI nicht unit-testbar ohne Mocks | Nein | Phase 4: Parser/Navigation-Tests ohne Kamera |
