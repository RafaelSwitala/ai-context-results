# RN Test Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_4/41_rn_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## RN Test Plan

| RN Test ID | Legacy Test ID | Given | When | Then | Mocks |
|---|---|---|---|---|---|
| RT-STORAGE-001 | LT-011, LT-023, LT-024 | Server/client/protocol combinations | `buildCheckAccessUrl` runs | No duplicate scheme; empty client still builds MobileBrowser default path | None |
| RT-STORAGE-002 | LT-004, LT-005, LT-016, LT-017 | HTTP 2xx, 403 and injected GET calls | `isOkHttpStatus` / `checkAccess` run | Only OK status is accepted before persistence | HTTP mock |
| RT-STORAGE-003 | LT-006, LT-007, LT-018, LT-027 | Valid QR values, missing/invalid `https`, culture values | `parseStorageConfigQr` runs | Fields map, invalid/missing protocol defaults to HTTPS, culture falls back | None |
| RT-STORAGE-004 | LT-008, LT-009, LT-019 | Query-only and invalid QR payloads | QR normalizer/parser run | Query-only payload is normalized; invalid MB protocol fails validation | None |
| RT-STORAGE-005 | LT-022, LT-026 | Old Douglas DNS and invalid protocol writes | Storage helpers run | DNS migrates; invalid protocol values are ignored | AsyncStorage mock |
| RT-STORAGE-006 | LT-001, LT-004, LT-016, LT-017 | Settings values persisted through RN storage service | Save/load helpers run | Stored server/client/token/PIN/protocol/valid flag round-trip | AsyncStorage/SecureStore mocks |
| RT-STORAGE-007 | LT-012, LT-013 | Valid newer config JSON, same version and invalid server | Config-file service runs | Newer valid config applies; invalid/same-version config is ignored | AsyncStorage/SecureStore mocks |
| RT-LOGIN-007 | LT-010, LT-020 | Invalid settings with/without PIN | Auth gate runs | PIN routes to PIN, empty PIN routes Settings | None |
| RT-LOGIN-002, RT-LOGIN-008 | LT-021, LT-023, LT-024 | Stored or explicit login URL values | Login URL builders run | App/Culture/user/password and path behavior are preserved | AsyncStorage/SecureStore mocks |

## Blocked Or Not Migrated

| Legacy Test ID | Status | Reason | Source |
|---|---|---|---|
| LT-002, LT-003, LT-014, LT-015 | BLOCKER | Settings validation/prefill behavior is inside `useStorageConfig`/`SettingsScreen`; no RN UI hook test harness is installed. | P2-A21; P2-A24 |
| LT-025 | BLOCKER | Phase 2 did not execute a deterministic legacy encoding failure; RN JavaScript URL encoding does not expose the same failing input without a new fachliche expectation. | P2-A23 LT-025; P2-A24 LT-025 |
| LT-028 | BLOCKER | Duplicate QR emission guard is component/ref state in `QRCodeScannerScreen`; no RN UI test harness is installed. | P2-A21 LT-028; P3-A33 MAP-003 |
| LT-029 | SKIP | Phase 2 marks token-absent dependency as outside storage-config unit scope. | P2-A23 LT-029; P2-A24 LT-029 |
