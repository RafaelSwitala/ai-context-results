# Execution Contract

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Form tests | Prefill, validation, cancel visibility | BEH-001, BEH-002, BEH-007, BEH-008, LT-001..LT-003, LT-010, LT-011 |
| Save gate tests | HTTP success/failure paths | BEH-003, API-001, API-002, LT-004..LT-006, LT-014 |
| Protocol tests | iOS 2-state vs Android 3-state mapping | BEH-004, BEH-005, LT-007, LT-008 |
| QR tests | Valid/invalid QR prefill | BEH-006, LT-009, LT-015 |
| Bootstrap tests | Android config version migration | BEH-010, LT-013, LT-016 |
| Evidence | Jeder Test referenziert P1-A12 IDs | EP-001..SEC-003 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Settings screen | `SettingsScreen` + `useSettingsFormState` + `useSettingsSaveState` | MAP-001, MAP-016, MAP-017 |
| Save pipeline | validate -> checkServerAccess -> persist -> set hasValidSettings | BEH-003, MAP-004, MAP-005, MAP-012 |
| Protocol UI | 3-option protocol control mit Mapping zu enum | MAP-018, MAP-019, SEC-002 |
| Security | PIN/Token in secure storage | SEC-001, MAP-010, MAP-026 |
| Divergences | Locale picker und config bootstrap als explizite RN-Module | MAP-021, MAP-022 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RT coverage | Jede `LT-*` hat `RT-*` oder Skip | LT-001..LT-017 |
| Mock connectivity | checkServerAccess mockbar | MAP-004, MAP-015 |
| Storage mocks | settingsStorageService unit tests | MAP-005, MAP-008..MAP-014 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Settings parity | Save gate, validation, QR prefill gegen Legacy | BEH-001..BEH-011 |
| Storage parity | Alle STOR keys mapped | STOR-001..STOR-012 |
| Divergence closure | Protocol/locale/bootstrap Entscheidungen dokumentiert | MAP-019..MAP-023 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Test-/Build-Command nicht ausgeführt | Low |
| android-mobilebrowser | UNKNOWN | Test-/Build-Command nicht ausgeführt | Low |
| rn-e-mobilebrowser | UNKNOWN | RN commands in späteren Phasen | Low |
