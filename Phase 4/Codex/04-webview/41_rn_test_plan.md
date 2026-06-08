# RN Test Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_4/41_rn_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## RN Test Plan

| RN Test ID | Legacy Test ID | Given | When | Then | Mocks |
|---|---|---|---|---|---|
| RT-NAV-001 | LT-025 | Route constants and WebView tokens | Constants are read | Barcode, login, error, about:blank and ScanResult tokens remain stable | None |
| RT-NAV-002 | LT-004, LT-006, LT-007, LT-012, LT-016, LT-018, LT-019, LT-020, LT-025 | Empty, barcode, login, error and normal URLs | `classifyWebViewUrl` runs | RN returns empty-url, scanner handoff, return-to-login or load decision | None |
| RT-NAV-003 | LT-026 | Barcode URL without `://` | Barcode conversion/classifier run | URL is not converted to scanner return URL | None |
| RT-NAV-004 | LT-007, LT-018 | Login form action URL | `classifyWebViewFormAction` runs | Login form action returns session-expired route | None |
| RT-NAV-006 | LT-010, LT-024 | Return URL plus scan code/cancel | `buildScanResultUrl` runs | ScanResult is appended only for non-empty code | None |
| RT-WEBVIEW-001 | LT-017, LT-020, LT-027 | Error code, HTTP status or empty error | `mapServerError` runs | Error message maps deterministically | None |
| RT-SESSION-001 to RT-SESSION-005 | LT-005, LT-008, LT-018, LT-022, LT-023 | Invalid auth, session expiry, logout | Auth/session services run | Invalid login resets route; logout clears valid-login | AsyncStorage/SecureStore mocks |
| RT-LOGIN-003, RT-LOGIN-008 | LT-001, LT-011, LT-012 | Login success/stored URL | Login services run | WebView URL handoff value is built from credentials/preferences | AsyncStorage/SecureStore mocks, HTTP mock |

## Blocked Or Not Migrated

| Legacy Test ID | Status | Reason | Source |
|---|---|---|---|
| LT-002 | SKIP | RN Phase 3 collapses iOS wrapper and child WebView into one `WebViewScreen`; no wrapper route remains. | P3-A33 MAP-020 |
| LT-003, LT-005, LT-009, LT-013, LT-014, LT-021, LT-022, LT-023 | BLOCKER | WebView props, loading HUD, lifecycle cleanup, toolbar close/back and visibility need a React Native UI/render test harness. | P2-A21; P2-A24; P3-A33 |
| LT-015 | SKIP | Android HTTPS-without-validation SSL proceed is excluded in RN Phase 3. | P3-A33 MAP-021 |
| LT-019 | PARTIAL_BLOCKER | Barcode URL classifier is tested; permission/scanner runtime branch remains excluded without scanner dependency. | P2-A24; P3-A33 MAP-003, MAP-026 |
| LT-027 | BLOCKER | Duplicate resource-error display guard is not exposed as RN service state. | P2-A24 LT-027 |
| LT-028 | SKIP | Phase 2 marks inactive timeout body as intentionally not executed. | P2-A23 LT-028; P2-A24 LT-028 |
| LT-029 | BLOCKER | `about:blank` visibility has no RN service decision; current classifier exposes only load/empty/scanner/login actions. | P2-A21 LT-029; P3-A33 MAP-004 |
| LT-030 | SKIP | Phase 2 documents no legacy logging seam; no RN logger seam exists in Phase 3. | P2-A23 LT-030; P2-A24 LT-030 |
