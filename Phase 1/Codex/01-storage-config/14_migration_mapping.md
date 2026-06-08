# Migration Mapping

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T16:15:12+02:00 |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, EP-003, EP-007, EP-008, BEH-001, BEH-002, BEH-003, BEH-010, BEH-011, BEH-012, UI-001, UI-002, UI-003, UI-004, UI-005, UI-006, UI-007 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx | SettingsScreen | Add | One RN settings screen should expose server, mandant, protocol, token, PIN, optional language and QR import handoff. |
| MAP-002 | EP-004, EP-009, BEH-007, BEH-016, NAV-001, NAV-002, NAV-005, NAV-006, STATE-001 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx; rn-e-mobilebrowser/src/screens/LoginScreen.tsx | Settings guard | Adapt | Preserve invalid-settings routing and PIN guard; exact navigation files may adjust to existing RN navigation structure. |
| MAP-003 | EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007 | rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Add | Scanner library choice belongs to Phase 3; parser and normalizer must be tested independent of camera. |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-004 | API-001, API-002, API-003, API-004, BEH-003, BEH-012, ERRPATH-002, ERRPATH-003, ERRPATH-006 | rn-e-mobilebrowser/src/services/storageConfigService.ts | checkAccess/buildCheckAccessUrl | Add | Use injected HTTP function for tests; preserve iOS URL encoding and Android scheme behavior as explicit decisions. |
| MAP-005 | BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007 | rn-e-mobilebrowser/src/utils/storageConfigQr.ts | parseStorageConfigQr/normalizeScannedQr/isValidQrSettings | Add | Pure utilities; support Android culture and protocol 2 while keeping iOS-compatible defaults. |
| MAP-006 | BEH-008, BEH-017, API-002, API-004 | rn-e-mobilebrowser/src/services/loginUrlService.ts | buildLoginUrl/buildLoginUrlFromPreferences | Add/Adapt | Dependency mapping for login; include Android Culture query only when RN storage contains locale. |
| MAP-007 | API-005, SEC-001, SEC-002 | rn-e-mobilebrowser/src/services/sessionService.ts | token provider | Adapt | Do not implement license feature here; expose secure token retrieval for later dependency. |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-008 | STOR-001, STOR-005 | AsyncStorage/SecureStore via rn-e-mobilebrowser/src/services/storageConfigStorage.ts | Compatibility constants documented from legacy keys | Mixed | RN may use new names, but mapping must preserve semantic fields. |
| MAP-009 | STOR-002, STOR-006, SEC-001, SEC-002 | SecureStore for token/PIN; AsyncStorage for server/client/protocol | server, client, protocol, token, pin | Yes for token/PIN | Stronger protection than legacy is allowed by MIG-005. |
| MAP-010 | STOR-003, STOR-007, SEC-003 | AsyncStorage | protocol | No | Model enum values 0/1/2; iOS uses 0/1 and Android uses 0/1/2. |
| MAP-011 | STOR-004, STOR-008 | SecureStore for password; AsyncStorage for username/flags | userName, password, hasValidLogin, hasValidSettings | Password yes | Login dependency requires same storage service, but login behavior is not implemented in storage-config. |
| MAP-012 | STOR-009, BEH-009, BEH-013 | AsyncStorage | locale, currentConfigVersion | No | Android-only divergence; RN should keep optional locale/config version fields. |
| MAP-013 | STOR-010, BEH-009, ERRPATH-008 | Bundled JSON or static TypeScript config in rn-e-mobilebrowser/src/services/configFileService.ts | bundled config version | Token/PIN inside config are sensitive once persisted | Add only if RN product flavors/config delivery require it; preserve versioned update behavior if implemented. |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-014 | API-001, API-003 | storageConfigService.checkAccess | GET built URL | Mock in tests; no real network in unit tests. |
| MAP-015 | API-002, API-004, BEH-008, BEH-017 | urlBuilder/loginUrlService | `/PrestigeEnterprise.MobileBrowser{client}/Default.aspx` | Preserve scheme-prepend and path constants. |
| MAP-016 | API-005, SEC-001, SEC-002 | sessionService token provider | `/prestigeenterprise.services{client}/api/Licenses` dependency | Excluded from storage-config implementation except token storage contract. |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-017 | STATE-001, STATE-002, STATE-005, BEH-001, BEH-010 | rn-e-mobilebrowser/src/hooks/useStorageConfig.ts | Loaded from storage; HTTPS default true when no valid settings. | Editing -> validating -> checkingAccess -> saved or error. |
| MAP-018 | STATE-003, STATE-006, BEH-006, BEH-015 | useStorageConfigQrImport | Empty QR state. | Scanned -> parsed -> controls filled; not persisted until save. |
| MAP-019 | STATE-004, BEH-009, ERRPATH-008 | useConfigBootstrap or app bootstrap service | App start. | Config file valid and new -> persist settings/version; otherwise unchanged. |
| MAP-020 | STATE-007, STOR-004, STOR-008 | auth/session state dependency | hasValidLogin from storage. | App pause/logout -> hasValidLogin=false; dependency only for storage service. |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-021 | STOR-003, STOR-007, SEC-003 | Protocol enum has HTTP/HTTPS; invalid raw values default to HTTPS. | Protocol enum has HTTP/HTTPS/HTTPS-without-validation; invalid save ignored. | Model 0/1/2, default invalid reads to HTTPS, ignore invalid writes. | Covers Android superset without breaking iOS parity. |
| MAP-022 | BEH-009, STOR-009, STOR-010 | No config.json import found. | Config file import/version update on app start. | Implement optional versioned bundled config only if product config is present in RN; otherwise document as Android-only NOT_PRESENT. | Phase 3 can use this mapping without rediscovery. |
| MAP-023 | BEH-013, STOR-009 | QR parser has no culture. | QR parser accepts culture and validates against available languages. | Include optional `culture` field and default fallback. | Android superset is non-breaking for iOS QR payloads. |
| MAP-024 | API-002, API-004 | iOS percent-encodes server/client and can return nil. | Android appends raw server/client strings. | RN URL builder should encode safely and test Android raw-equivalent examples; failed encoding maps to error path. | Safer encoding preserves iOS bugfix comments and avoids invalid URLs. |
| MAP-025 | SEC-001, SEC-002 | Password stored raw in UserDefaults after successful login. | Password stored as base64 string in SharedPreferences. | Store password in SecureStore; encode only if required by URL builder. | MIG-005 requires at least legacy-level protection; SecureStore improves both. |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-026 | @react-native-async-storage/async-storage | Reuse | Already present for non-sensitive persisted settings. | DEP-001, DEP-004, RN-FILE-001 |
| MAP-027 | expo-secure-store | Reuse | Already present and needed for token/password/PIN. | SEC-001, SEC-002, RN-FILE-001 |
| MAP-028 | Jest/jest-expo | Reuse | Already present for parser, storage and service tests. | RN-FILE-001 |
| MAP-029 | QR scanner package | Add later if absent | Required only for actual camera UI; parser tests do not depend on it. | DEP-007, MAP-003 |
