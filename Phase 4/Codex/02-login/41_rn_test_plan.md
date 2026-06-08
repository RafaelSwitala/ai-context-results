# RN Test Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_4/41_rn_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## RN Test Plan

| RN Test ID | Legacy Test ID | Given | When | Then | Mocks |
|---|---|---|---|---|---|
| RT-LOGIN-001 | LT-001, LT-002 | Missing username, missing password, or invalid settings | `submitLogin` runs | Login returns missing-field or invalid-settings error before request | AsyncStorage/SecureStore mocks |
| RT-LOGIN-002 | LT-003, LT-004 | Valid settings, user, password, locale | `buildLoginUrl` runs | URL contains user, Base64 password, `App=MobileBrowser`, `Culture` | None |
| RT-LOGIN-003 | LT-003, LT-004 | Valid settings and HTTP 200 response without `Error` query | `submitLogin` runs | Credentials persist and `hasValidLogin=true` | AsyncStorage/SecureStore mocks, HTTP mock |
| RT-LOGIN-004 | LT-003 | HTTP 200 response with `Error=-6` query | `submitLogin` runs | Login returns `server-error` and does not set valid-login | AsyncStorage/SecureStore mocks, HTTP mock |
| RT-LOGIN-005 | LT-003, LT-004 | HTTP 500 or thrown network error | `submitLogin` runs | Login returns `preflight-failed` | AsyncStorage/SecureStore mocks, HTTP mock |
| RT-LOGIN-006 | LT-003, LT-004, LT-007 | Stored auth values and later logout/background reset | Auth snapshot and valid-login setter run | Snapshot exposes stored values; valid-login can be cleared | AsyncStorage/SecureStore mocks |
| RT-LOGIN-007 | LT-005 | Invalid settings with empty or non-empty PIN | `resolveSettingsGate` / `resolveSettingsAccessRoute` run | Empty PIN routes Settings; non-empty PIN routes PIN | None |
| RT-LOGIN-008 | LT-003, LT-004 | Stored server, credentials and locale | `buildLoginUrlFromPreferences` runs | URL is rebuilt without duplicate scheme and with empty client path support | AsyncStorage/SecureStore mocks |

## Blocked Or Not Migrated

| Legacy Test ID | Status | Reason | Source |
|---|---|---|---|
| LT-006 | BLOCKER | Exact PIN entry/mismatch behavior is inside `PinGateScreen` hook/UI state. Project has no React Native Testing Library or `react-test-renderer`; adding a new dependency was not required for Phase 4 service readiness. | P2-A21 LT-006; P2-A24 LT-006; P3-A33 MAP-003 |
