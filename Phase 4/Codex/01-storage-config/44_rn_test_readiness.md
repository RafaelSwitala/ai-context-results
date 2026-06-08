# RN Test Readiness

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P4 |
| Artifact ID | P4-A44 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_4/44_rn_test_readiness.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## Readiness

| Check | Result | Command/Evidence | Notes |
|---|---|---|---|
| npm launcher | NOT_RUN | `npm test -- --runInBand --listTests` failed because global `npm-cli.js` is missing | Used local project binaries instead. |
| TypeScript | PASS | `node .\node_modules\typescript\bin\tsc --noEmit` | Test files and Jest config typecheck. |
| Jest discovery | PASS | `node .\node_modules\jest\bin\jest.js --runInBand --listTests` | 4 test files discovered. |
| Jest execution | FAIL | `node .\node_modules\jest\bin\jest.js --runInBand` | 25/27 tests pass; `RT-STORAGE-003` and `RT-STORAGE-006` fail because absent QR/stored protocol maps to HTTP instead of HTTPS. |
| Storage targeted execution | FAIL | `node .\node_modules\jest\bin\jest.js --runInBand src/__tests__/StorageConfig.test.ts` | 5/7 storage-config tests pass; 2 HTTPS-default assertions fail. |

## Risks For Phase 5

| Risk | Impact | Mitigation |
|---|---|---|
| Protocol default divergence | LT-001 and LT-007 RN behavior differs from Phase-2 expectation; Phase 5 should compare and classify. | Fix `getProtocol()` and QR `readProtocol(null)` to default HTTPS if parity is required. |
| Settings UI/hook paths blocked | LT-002, LT-003, LT-014, LT-015, LT-028 are not covered by RN tests yet. | Add React Native Testing Library or extract validation/duplicate-guard services. |
| No physical scanner dependency | QR camera behavior remains parser/handoff only. | Add Expo-compatible scanner dependency in scanner integration scope. |
