# RN Test Mapping (cross-feature)

| Field | Value |
|---|---|
| Feature | all |
| Phase | P4 |
| Artifact ID | P4-A42 |
| Status | READY_FOR_REVIEW |
| Last updated | 2026-06-08T19:00:00+02:00 |

## Summary

| Legacy platform | Files | Pure-logic tests | RN migrated | SKIP (UI/native) |
|---|---|---|---|---|
| Android Java | 16 | 94 | ~85 | ~9 |
| iOS Swift | 17 | 67 | ~60 (same RN suites) | ~7 overlap |

Every Android `@Test` in the listed Java files maps to an RN Jest test or a documented SKIP reason. iOS Swift pure-logic tests map to the same RN suites (ERR-P2-01: iOS tests were NOT_RUN on Windows in Phase 2).

Detailed file-level mapping: `rn-e-mobilebrowser/docs/legacy-test-mapping.md`.

## Feature artifact cross-reference

| Feature run | Phase 4 folder | RN tests primarily covering |
|---|---|---|
| storage-config | `artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_4/` | storageConfig*, configFile*, urlBuilder, QR |
| login | `artifacts/login/codex/20260602-1703-codex-login/phase_4/` | login*, passwordEncoding, authGate, pinVerification |
| navigation | `artifacts/navigation/codex/20260602-1705-codex-navigation/phase_4/` | navigation*, scanner*, authGate |
| webview | `artifacts/webview/codex/20260602-1710-codex-webview/phase_4/` | webView*, serverErrorMapper, urlRedaction |

All tests live in one shared `src/__tests__/` tree (no duplication per feature).
