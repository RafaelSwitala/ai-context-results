# RN Test Mapping

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P4 |
| Artifact ID | P4-A42 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_4/42_rn_test_mapping.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## Test Mapping

| Legacy Test ID | RN Test ID | Status | Source IDs | Notes |
|---|---|---|---|---|
| LT-001 | RT-STORAGE-006 | MIGRATED_WITH_BEHAVIOR_FAILURE | P2-A21 LT-001; P2-A23 LT-001 | RN currently returns HTTP for missing stored protocol; Jest failure documents this for Phase 5. |
| LT-002 | N/A | BLOCKER | P2-A21 LT-002; P2-A24 LT-002 | Needs SettingsScreen/useStorageConfig UI or hook test harness. |
| LT-003 | N/A | BLOCKER | P2-A21 LT-003; P2-A24 LT-003 | Needs SettingsScreen/useStorageConfig UI or hook test harness. |
| LT-004 | RT-STORAGE-002; RT-STORAGE-006 | PARTIAL | P2-A21 LT-004; P2-A23 LT-004 | HTTP OK and persistence services covered; full screen save flow blocked by hook harness. |
| LT-005 | RT-STORAGE-002 | MIGRATED | P2-A21 LT-005; P2-A23 LT-005 | Non-OK HTTP status blocks check-access. |
| LT-006 | RT-STORAGE-003 | MIGRATED | P2-A21 LT-006; P2-A23 LT-006 | QR field mapping and validity covered. |
| LT-007 | RT-STORAGE-003 | MIGRATED_WITH_BEHAVIOR_FAILURE | P2-A21 LT-007; P2-A23 LT-007 | RN currently returns HTTP for absent `https`; Jest failure documents this for Phase 5. |
| LT-008 | RT-STORAGE-004 | MIGRATED | P2-A21 LT-008; P2-A23 LT-008 | Query-only QR normalization covered. |
| LT-009 | RT-STORAGE-004 | MIGRATED | P2-A21 LT-009; P2-A23 LT-009 | Invalid QR protocol validation covered. |
| LT-010 | RT-LOGIN-007 | MIGRATED | P2-A21 LT-010; P2-A23 LT-010 | Settings/PIN gate covered by auth gate. |
| LT-011 | RT-STORAGE-001; RT-LOGIN-008 | MIGRATED | P2-A21 LT-011; P2-A23 LT-011 | Login/check-access URL builders covered. |
| LT-012 | RT-STORAGE-007 | MIGRATED | P2-A21 LT-012; P2-A23 LT-012 | Valid newer config apply covered. |
| LT-013 | RT-STORAGE-007 | MIGRATED | P2-A21 LT-013; P2-A23 LT-013 | Invalid and same-version config ignored. |
| LT-014 | N/A | BLOCKER | P2-A21 LT-014; P2-A24 LT-014 | Protocol spinner prefill is UI-only. |
| LT-015 | N/A | BLOCKER | P2-A21 LT-015; P2-A24 LT-015 | Settings validation is hook/UI state. |
| LT-016 | RT-STORAGE-002; RT-STORAGE-006 | PARTIAL | P2-A21 LT-016; P2-A23 LT-016 | HTTP OK and storage side effects covered; full screen flow blocked. RT-STORAGE-006 also exposes default protocol divergence. |
| LT-017 | RT-STORAGE-002 | MIGRATED | P2-A21 LT-017; P2-A23 LT-017 | Non-OK HTTP check covered. |
| LT-018 | RT-STORAGE-003 | MIGRATED | P2-A21 LT-018; P2-A23 LT-018 | Android QR fields and culture behavior covered. |
| LT-019 | RT-STORAGE-004; RT-NAV-005 | MIGRATED | P2-A21 LT-019; P2-A23 LT-019 | Parser/normalizer covered; full scanner UI remains blocked under LT-028. |
| LT-020 | RT-LOGIN-007 | MIGRATED | P2-A21 LT-020; P2-A23 LT-020 | Login guard route decision covered. |
| LT-021 | RT-LOGIN-002; RT-LOGIN-008 | MIGRATED | P2-A21 LT-021; P2-A23 LT-021 | App marker and Culture query covered. |
| LT-022 | RT-STORAGE-005 | MIGRATED | P2-A21 LT-022; P2-A23 LT-022 | Douglas DNS migration covered. |
| LT-023 | RT-STORAGE-001; RT-LOGIN-008 | MIGRATED | P2-A21 LT-023; P2-A23 LT-023 | Existing scheme not duplicated. |
| LT-024 | RT-STORAGE-001; RT-LOGIN-008 | MIGRATED | P2-A21 LT-024; P2-A23 LT-024 | Empty client path covered. |
| LT-025 | N/A | BLOCKER | P2-A21 LT-025; P2-A23 LT-025 | No deterministic RN encoding failure source. |
| LT-026 | RT-STORAGE-005 | MIGRATED | P2-A21 LT-026; P2-A23 LT-026 | Invalid protocol writes ignored. |
| LT-027 | RT-STORAGE-003 | MIGRATED | P2-A21 LT-027; P2-A23 LT-027 | Unsupported culture fallback covered. |
| LT-028 | N/A | BLOCKER | P2-A21 LT-028; P2-A23 LT-028 | Duplicate scanner emission requires component test harness. |
| LT-029 | N/A | SKIP | P2-A21 LT-029; P2-A23 LT-029 | Phase 2 marks dependency outside storage-config unit scope. |
