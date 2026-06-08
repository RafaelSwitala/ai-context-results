# Migration Mapping

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T15:45:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-005 | src/services/storageService.ts | StorageService | Reuse | Replace static utility classes with modular StorageService; maintains same public API |
| MAP-002 | BEH-001, BEH-002, BEH-008 | src/services/storageService.ts | getCredentials(), setCredentials() | Adapt | Combine iOS getters and Android LoginPreferences into unified RN interface |
| MAP-003 | UI-001 to UI-007 | src/screens/SettingsScreen.tsx | SettingsScreen | Add | New RN component wraps StorageService; maps to both iOS SettingsViewController and Android SettingsActivity |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | EP-001, EP-002, EP-003 | StorageService | readCredentials (iOS: PreferencesUtils properties) | Reuse | Single service method replaces iOS multiple property getters |
| MAP-101 | BEH-001, BEH-002, BEH-003, BEH-004 | StorageService | writeCredentials, writeProtocol | Reuse | Adapt batch-save pattern from both platforms |
| MAP-102 | BEH-011 | StorageService | buildLoginUrl | Reuse | Adapt from Android buildLoginUrlFromPreferences(); create RN helper |
| MAP-103 | BEH-012 | StorageService | migrateDouglasServerName | Reuse | Adapt Android legacy migration; run once on app init |
| MAP-104 | BEH-013, BEH-014 | StorageService | getLocale(), setLocale(), getConfigVersion(), setConfigVersion() | Adapt | Combine Android implementations into cross-platform service |
| MAP-105 | BEH-005, BEH-006 | StorageService | validateLogin(), validateSettings() | Adapt | Replace iOS/Android validation flags with RN service methods |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-200 | STOR-001, STOR-013 | AsyncStorage or @react-native-async-storage/async-storage | Default storage engine | Evaluate | RN needs cross-platform storage abstraction; AsyncStorage default for non-sensitive data |
| MAP-201 | STOR-002, STOR-003, STOR-007, STOR-016, STOR-017, STOR-018, STOR-019 | react-native-encrypted-storage or Keychain | Credentials (username, password, token) | YES | Use encrypted storage library; iOS Keychain, Android Encrypted SharedPreferences |
| MAP-202 | STOR-004, STOR-005, STOR-006, STOR-008, STOR-014, STOR-015, STOR-020 | AsyncStorage | Configuration (server, client, pin, protocol) | NO | Non-sensitive config can use AsyncStorage |
| MAP-203 | STOR-009, STOR-010, STOR-011, STOR-021, STOR-022 | AsyncStorage | Validation/state flags (protocol, hasValidLogin, hasValidSettings) | NO | Flags are not sensitive |
| MAP-204 | STOR-023, STOR-024 | AsyncStorage | Locale and config version | NO | Tracking data, not sensitive |
| MAP-205 | STOR-012 (deprecated isValid) | N/A | Deprecated key (mb_isValid_key) | NO | iOS marked as unused 2023-10-17; do not migrate |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001 to API-005 | StorageService | readAsync(key), writeAsync(key, value), deleteAsync(key) | Adapt UserDefaults API to RN async model |
| MAP-301 | API-006 to API-008 | StorageService | getLoginPreferences(), setLoginPreferences() | Adapt Android LoginPreferences pattern to RN |
| MAP-302 | API-009 | RN app initialization | initStorage() on app startup | Adapt Android App.onCreate() init pattern |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | STATE-001, STATE-006 | useStorageConfig() hook | { credentials: null, isLoading: false } | On setCredentials(): update credentials, persist via StorageService |
| MAP-401 | STATE-002 | StorageService (cached) | Credentials lazily loaded on first access | Read from AsyncStorage/Keychain once, cache in memory |
| MAP-402 | STATE-003, STATE-004 | useStorageConfig() hook | { protocol: PROTOCOL_HTTPS, isValid: false } | On setProtocol(): validate value (0-2), update, persist |
| MAP-403 | STATE-005 | RN app init | StorageService initialized in App root component | PreferenceManager equivalent: initialize on app launch |
| MAP-404 | STATE-007 | useStorageConfig() hook | Credentials stored, isValid: true | After successful login: validate creds, set isValid flag |
| MAP-405 | STATE-008 | StorageService | Config state migrated (Douglas hostname, etc.) | Run migration on app launch; update config if version mismatch |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-003, BEH-004, BEH-010 | Protocol as HttpProtocolEnum (enum type) | Protocol as int constants (0, 1, 2) | Use string constants in RN (e.g., 'http', 'https', 'https-no-validation') | Enums not language-native; strings more portable |
| DIV-002 | STOR-002 to STOR-011, STOR-014 to STOR-024 | Key prefix: "mb_*_key" (iOS style) | Key prefix: "preference_*_key" (Android style) | Normalize to single RN key scheme (e.g., '@storage/username', '@storage/protocol') | Avoid platform-specific naming in RN code |
| DIV-003 | BEH-007, BEH-009 | iOS: implicit batch via UserDefaults scope | Android: explicit SharedPreferences.Editor.commit() | Use async batch API in RN (e.g., multiSet() in AsyncStorage) | RN should match Android explicit commit semantics |
| DIV-004 | BEH-001, BEH-008 | iOS: individual property getters (userName, password, etc.) | Android: single getLoginPreferences() returning object | Use unified getCredentials() in RN returning structured object | Android pattern better for RN; reduces API surface |
| DIV-005 | BEH-012 | iOS: (no documented legacy server migration) | Android: replaceDouglasServerName() migration for Android 12 DNS fix | Run migration logic once on RN app launch; store migration version to avoid re-running | Unify platform-specific migrations into single RN migration handler |
| DIV-006 | BEH-011 | iOS: (no documented URL builder) | Android: buildLoginUrlFromPreferences() helper | Implement buildLoginUrl() in RN StorageService | Android pattern is useful; include in RN |
| DIV-007 | BEH-013, BEH-014 | iOS: (implicit, not documented) | Android: locale and config version tracking | Implement full locale/version tracking in RN | Use Android's comprehensive approach |
| DIV-008 | STOR-001, STOR-013 | iOS UserDefaults: synchronous, automatic persistence | Android SharedPreferences: synchronous .commit() or async .apply() | Use async AsyncStorage in RN to avoid blocking UI | RN should follow async best practice (not block main thread) |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | @react-native-async-storage/async-storage | Add | Cross-platform AsyncStorage for non-sensitive configuration | STOR-001, STOR-013 |
| MAP-DEP-002 | react-native-encrypted-storage or @react-native-keychain/keychain | Add | Encrypted storage for credentials (username, password, token); replaces iOS UserDefaults + Android SharedPreferences insecure storage | SEC-001, SEC-004, SEC-005 |
| MAP-DEP-003 | @react-native-community/async-storage alternative (MMKV on Android) | Consider | High-performance alternative to AsyncStorage for RN; Android has MMKV, iOS has encrypted defaults | Performance consideration |
| MAP-DEP-004 | react-native | Reuse | Core framework for storage abstraction layer | All mappings |
| MAP-DEP-005 | typescript | Reuse | Type safety for StorageService and configuration objects | All mappings |
| MAP-DEP-006 | TypeScript interfaces for StorageConfig, LoginPreferences | Add | Define shared types for credentials, protocol, validation state | EP-*, BEH-* |
