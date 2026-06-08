# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_3/31_rn_implementation_plan.md |
| Status | IN_PROGRESS |
| Created by | GitHub Copilot (Claude Haiku 4.5) |
| Last updated | 2026-06-07T12:00:00Z |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | src/screens/SettingsScreen.tsx | SettingsScreen | Add | EP-001, EP-002, EP-003, EP-007, EP-008, BEH-001, BEH-002, BEH-003, BEH-010, BEH-011, BEH-012, UI-001, UI-002, UI-003, UI-004, UI-005, UI-006, UI-007 |
| MAP-002 | src/navigation/AppNavigator.tsx, src/screens/LoginScreen.tsx | Settings guard, useSettingsGuard hook | Adapt | EP-004, EP-009, BEH-007, BEH-016, NAV-001, NAV-002, NAV-005, NAV-006, STATE-001 |
| MAP-003 | src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Add | EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007 |
| MAP-004 | src/services/storageConfigService.ts | checkAccess, buildCheckAccessUrl | Add | API-001, API-002, API-003, API-004, BEH-003, BEH-012, ERRPATH-002, ERRPATH-003, ERRPATH-006 |
| MAP-005 | src/utils/storageConfigQr.ts | parseStorageConfigQr, normalizeScannedQr, isValidQrSettings | Add | BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007 |
| MAP-006 | src/services/loginUrlService.ts | buildLoginUrl, buildLoginUrlFromPreferences | Add/Adapt | BEH-008, BEH-017, API-002, API-004 |
| MAP-007 | src/services/sessionService.ts | getToken, setToken, clearToken | Adapt | API-005, SEC-001, SEC-002 |
| MAP-008 | src/services/storageConfigStorage.ts | Storage constants and compatibility mapping | Add | STOR-001, STOR-005 |
| MAP-009 | src/services/storageConfigStorage.ts | secureStore operations for token/PIN | Add | STOR-002, STOR-006, SEC-001, SEC-002 |
| MAP-010 | src/types/index.ts, src/services/storageConfigStorage.ts | Protocol enum (HTTP, HTTPS, HTTPS_WITHOUT_VALIDATION) | Add | STOR-003, STOR-007, SEC-003 |
| MAP-011 | src/services/storageConfigStorage.ts | Login storage (userName, password, hasValidLogin, hasValidSettings) | Add | STOR-004, STOR-008 |
| MAP-012 | src/services/storageConfigStorage.ts | Locale and config version fields (Android-only optional) | Add | STOR-009, BEH-009, BEH-013 |
| MAP-013 | src/services/configFileService.ts | Bundled config file loading (optional, if RN product has config) | Add | STOR-010, BEH-009, ERRPATH-008 |
| MAP-014 | src/services/storageConfigService.ts, src/hooks/useStorageConfig.ts | Mock HTTP check in tests | Mock/Reuse | API-001, API-003 |
| MAP-015 | src/services/loginUrlService.ts | URL path constant `/PrestigeEnterprise.MobileBrowser{client}/Default.aspx` | Reuse | API-002, API-004, BEH-008, BEH-017 |
| MAP-016 | src/services/sessionService.ts | Token provider for Licenses API (dependency only) | Reuse | API-005, SEC-001, SEC-002 |
| MAP-017 | src/hooks/useStorageConfig.ts | Main settings hook with state machine | Add | STATE-001, STATE-002, STATE-005, BEH-001, BEH-010 |
| MAP-018 | src/hooks/useStorageConfigQrImport.ts | QR import state hook | Add | STATE-003, STATE-006, BEH-006, BEH-015 |
| MAP-019 | src/services/configBootstrapService.ts | Config file versioning on app start | Add | STATE-004, BEH-009, ERRPATH-008 |
| MAP-020 | src/services/sessionService.ts | hasValidLogin dependency from storage | Reuse | STATE-007, STOR-004, STOR-008 |
| MAP-021 | src/types/index.ts | Protocol enum with 3 levels (0/1/2) and fallback logic | Add | STOR-003, STOR-007, SEC-003 |
| MAP-022 | src/services/configFileService.ts | Config.json optional versioned import (Android parity) | Add optional | BEH-009, STOR-009, STOR-010 |
| MAP-023 | src/utils/storageConfigQr.ts | Optional culture field in QR parser | Add | BEH-013, STOR-009 |
| MAP-024 | src/services/loginUrlService.ts | Safe URL encoding for server/client | Adapt | API-002, API-004 |
| MAP-025 | src/services/storageConfigStorage.ts | SecureStore for password (upgrade from legacy) | Adapt | SEC-001, SEC-002 |
| MAP-026 | package.json | @react-native-async-storage/async-storage | Reuse | DEP-001, DEP-004, RN-FILE-001 |
| MAP-027 | package.json | expo-secure-store | Reuse | SEC-001, SEC-002, RN-FILE-001 |
| MAP-028 | jest.config.js, package.json | Jest/jest-expo | Reuse | RN-FILE-001 |
| MAP-029 | (Later, phase 3b or 4) | QR scanner package (optional, phase 3b) | Add later | DEP-007, MAP-003 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs | Status |
|---|---|---|---|---|
| @react-native-async-storage/async-storage | Reuse | Already in package.json; used for non-sensitive settings persistence | DEP-001, DEP-004, RN-FILE-001 | VERIFIED |
| expo-secure-store | Reuse | Already in package.json; used for token/password/PIN encrypted storage | SEC-001, SEC-002, RN-FILE-001 | VERIFIED |
| Jest/jest-expo | Reuse | Already in package.json; used for unit tests | RN-FILE-001 | VERIFIED |
| react-native-vision-camera or expo-camera | Add later (phase 3b) | QR scanner UI; parser/validator are pure and testable without camera | DEP-007, MAP-003 | DEFERRED |
| fetch or axios (native to RN) | Reuse | Built-in fetch API for HTTP check-access calls in tests via mock | DEP-002, DEP-006 | VERIFIED (mocked) |

## Implementation Order

Based on dependencies and testability:

1. **Types and Constants** (MAP-010, MAP-021, MAP-008)
   - `src/types/index.ts` - Define Protocol enum, QRSettings, Settings types
   - `src/services/storageConfigStorage.ts` - Storage key constants and helper types

2. **Storage Services** (MAP-008, MAP-009, MAP-011, MAP-012)
   - `src/services/storageConfigStorage.ts` - AsyncStorage and SecureStore abstractions

3. **Utility Functions** (MAP-005, MAP-024)
   - `src/utils/storageConfigQr.ts` - QR parser, normalizer, validator (pure functions)
   - `src/services/loginUrlService.ts` - URL builders with proper encoding

4. **API Services** (MAP-004, MAP-007, MAP-006)
   - `src/services/storageConfigService.ts` - checkAccess, validation service
   - `src/services/sessionService.ts` - Token provider (dependency)
   - Update `src/services/loginUrlService.ts` - buildLoginUrl variants

5. **Hooks (State Management)** (MAP-017, MAP-018, MAP-020)
   - `src/hooks/useStorageConfig.ts` - Main settings state machine
   - `src/hooks/useStorageConfigQrImport.ts` - QR import state
   - Integration with existing auth/session hooks if present

6. **Screens** (MAP-001, MAP-003, MAP-002)
   - `src/screens/SettingsScreen.tsx` - Settings UI with save/cancel/QR import
   - `src/screens/QRCodeScannerScreen.tsx` - QR scanner screen (camera library deferred)
   - `src/screens/LoginScreen.tsx` - Adapt with settings guard logic (MAP-002)
   - `src/navigation/AppNavigator.tsx` - Add routing and navigation guards

7. **Optional Config Service** (MAP-013, MAP-019, MAP-022)
   - `src/services/configFileService.ts` - If RN project requires bundled config
   - `src/services/configBootstrapService.ts` - App initialization hook

## Validation Checklist

- [ ] All MAP-* entries mapped to concrete RN files and symbols
- [ ] No MAP-* without a strategy (Add/Adapt/Reuse)
- [ ] Dependencies verified in package.json or marked as deferred
- [ ] Code order respects MIG-004 rules (types → storage → utils → services → hooks → screens)
- [ ] Architecture rules followed: no business logic in components, no UI imports in services
- [ ] All source IDs traced back to Phase 1

## Known Risks and Decisions

1. **QR Scanner UI (MAP-003, MAP-029)**: Camera integration is deferred to phase 3b. Parser and validator are pure functions and fully testable.
2. **Config File (MAP-013, MAP-022)**: Optional implementation; depends on whether RN product has bundled config assets.
3. **Protocol Handling (MAP-021)**: RN supports all 3 levels (HTTP, HTTPS, HTTPS_WITHOUT_VALIDATION) via conditional logic in HTTP service.
4. **Culture Field (MAP-023)**: Added as optional to QR parser; Locale persistence is Android-only optional.
5. **URL Encoding (MAP-024)**: Using RN's native encodeURIComponent with fallback error handling.
