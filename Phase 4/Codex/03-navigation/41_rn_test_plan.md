# RN Test Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_4/41_rn_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## RN Test Plan

| RN Test ID | Legacy Test ID | Given | When | Then | Mocks |
|---|---|---|---|---|---|
| RT-NAV-001 | LT-022 | Route names, param keys and WebView route tokens | Constants are read | Login/settings/PIN/WebView/barcode/license and URL token constants are stable | None |
| RT-NAV-002 | LT-007, LT-017, LT-018, LT-019, LT-025 | Empty, barcode, login, error and normal URLs | `classifyWebViewUrl` runs | RN returns empty-url, scanner handoff, return-to-login or load decision | None |
| RT-NAV-003 | LT-023 | Malformed barcode URL without `://` | Barcode conversion/classifier run | URL is not converted to scanner return URL | None |
| RT-NAV-004 | LT-008 | Login form action URL | `classifyWebViewFormAction` runs | Login form action returns session-expired/login route | None |
| RT-NAV-005 | LT-009, LT-016 | Query-only QR scanner payload | QR normalizer runs | Payload is prefixed with `http://localhost?` | None |
| RT-NAV-006 | LT-010, LT-020 | Return URL with scan code, empty scan or cancel | `buildScanResultUrl` runs | ScanResult is appended only for non-empty code | None |
| RT-LOGIN-007 | LT-001, LT-011 | Invalid settings with/without PIN | Auth gate runs | PIN routes to PIN, empty PIN routes Settings | None |
| RT-SESSION-001 to RT-SESSION-005 | LT-005, LT-006, LT-019, LT-020, LT-026 | Valid-login true/false and logout/session-expired events | Auth/session guard services run | Invalid auth resets to Login; logout clears valid-login | AsyncStorage/SecureStore mocks |

## Blocked Or Not Migrated

| Legacy Test ID | Status | Reason | Source |
|---|---|---|---|
| LT-002, LT-021 | BLOCKER | Correct-PIN success/back/exit behavior lives in `PinGateScreen`; no RN UI test harness installed. | P2-A21; P2-A24 |
| LT-004, LT-013, LT-014, LT-015, LT-024, LT-025, LT-027 | BLOCKER | Screen-only route, back handler, license popup, Settings QR import, duplicate scan and permission denial paths require React Native Testing Library or a device/instrumentation seam. | P2-A21; P2-A24; P3-A33 |
| LT-018, LT-020 | PARTIAL_BLOCKER | URL/return/auth service seams are tested; physical camera permission/scanner runtime remains excluded. | P2-A24; P3-A33 MAP-006, MAP-021, MAP-026 |
