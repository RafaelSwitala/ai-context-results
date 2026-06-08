# Migration Mapping

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-003, BEH-001, UI-001..UI-004 | src/screens/settings/SettingsScreen.tsx | `SettingsScreen` | Adapt | Formular für alle Settings-Felder |
| MAP-002 | BEH-006, NAV-002, NAV-004 | src/features/settings/qrSettingsParser.ts | `parseQrToSettings` | Reuse/Adapt | Gemeinsamer QR Parser |
| MAP-003 | BEH-007, BEH-008 | src/screens/settings/SettingsScreen.tsx | `showCancelButton` | Adapt | Abhängig von hasValidSettings/hasSavedPrefs |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-004 | BEH-003, API-001, API-002 | src/services/connectivityService.ts | `checkServerAccess` | Adapt | Preflight vor Save |
| MAP-005 | STOR-001..STOR-012, STATE-001, STATE-002 | src/services/settingsStorageService.ts | load/save settings DTO | Add | Typed settings persistence |
| MAP-006 | BEH-010, EP-005, ERRPATH-005 | src/services/settingsBootstrapService.ts | `applyConfigIfVersionChanged` | Add | Android-only bootstrap optional |
| MAP-007 | BEH-009, STOR-011 | src/services/localeService.ts | `saveLocale` | Adapt | Android parity |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-008 | STOR-001, STOR-006 | settings.server | String | No | Server hostname |
| MAP-009 | STOR-002, STOR-007 | settings.client | String | No | Mandant optional |
| MAP-010 | STOR-003, STOR-008 | settings.token / settings.pin | Secure storage | Yes | Nicht plain persistieren |
| MAP-011 | STOR-004, STOR-009 | settings.protocol | Int enum | No | 0/1/2 Modell |
| MAP-012 | STOR-005, STOR-010 | settings.hasValidSettings | Bool | No | Gate für Login |
| MAP-013 | STOR-011 | settings.locale | String | No | Android feature optional in RN |
| MAP-014 | STOR-012 | settings.configVersion | String | No | Bootstrap tracking |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-015 | API-001, API-002 | connectivityService | `GET {base}/Default.aspx` reachability | Gleiche Semantik wie Legacy check access |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-016 | BEH-001, BEH-002 | `useSettingsFormState` | loaded from storage | user edits fields |
| MAP-017 | STATE-001, BEH-003 | `useSettingsSaveState` | isSaving=false | true during check+save; sets hasValidSettings on success |
| MAP-018 | BEH-004, BEH-005 | `useProtocolState` | default https | maps UI control to protocol enum |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-019 | BEH-004, BEH-005, UI-003, UI-004 | 2-state HTTPS switch | 3-state protocol spinner | Adapt: segmented control with 3 options | Vollständige Android-Abdeckung |
| MAP-020 | NAV-001, NAV-003 | dismiss nach Save | navigate LoginActivity | Adapt: navigate to Login route | Einheitlicher Post-Save Flow |
| MAP-021 | BEH-009, STOR-011 | keine Locale im Settings UI | locale spinner sofort persistiert | Adapt: optional locale picker in Settings | Feature parity choice |
| MAP-022 | BEH-010, MAP-006 | kein config bootstrap | config.json version overwrite | Adapt optional module | Android enterprise builds |
| MAP-023 | BEH-006, DEP-005 | QR ohne culture field | QR mit culture + locale save | Adapt: culture optional in parser | Cross-platform |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-024 | settingsStorageService (from storage-config) | Reuse | Shared persistence layer | STOR-001..STOR-012 |
| MAP-025 | connectivityService | Reuse/Add | HTTP preflight | API-001, API-002 |
| MAP-026 | Secure storage package | Reuse | PIN/Token protection | SEC-001, MAP-010 |
| MAP-027 | QR scanner screen | Reuse | QR prefill entry | BEH-006, NAV-002, NAV-004 |
