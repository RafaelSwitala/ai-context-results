# RN Test Mapping

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P4 |
| Artifact ID | P4-A42 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_4/42_rn_test_mapping.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## Test Mapping

| Legacy Test ID | RN Test ID | Status | Source IDs | Notes |
|---|---|---|---|---|
| LT-001 | RT-LOGIN-008 | MIGRATED | P2-A21 LT-001; P2-A23 LT-001 | Stored login preferences rebuild WebView URL. |
| LT-002 | N/A | SKIP | P2-A21 LT-002; P3-A33 MAP-020 | RN wrapper collapsed. |
| LT-003 | RT-NAV-002 | PARTIAL | P2-A21 LT-003; P2-A23 LT-003 | Non-empty URL load decision covered; WebView load props/lifecycle need UI harness. |
| LT-004 | RT-NAV-002 | MIGRATED | P2-A21 LT-004; P2-A23 LT-004 | Empty URL decision covered. |
| LT-005 | N/A | BLOCKER | P2-A21 LT-005; P2-A24 LT-005 | Loading HUD and WebView callbacks need UI/render harness. |
| LT-006 | RT-NAV-002 | MIGRATED | P2-A21 LT-006; P2-A23 LT-006 | Barcode route decision covered. |
| LT-007 | RT-NAV-002; RT-NAV-004; RT-SESSION-002 | MIGRATED | P2-A21 LT-007; P2-A23 LT-007 | Login URL/form action and session expiry covered. |
| LT-008 | RT-SESSION-003; RT-SESSION-005 | MIGRATED | P2-A21 LT-008; P2-A23 LT-008 | Logout clears valid-login and resets route. |
| LT-009 | N/A | BLOCKER | P2-A21 LT-009; P2-A24 LT-009 | WebView cleanup lifecycle needs UI/render harness. |
| LT-010 | RT-NAV-006 | MIGRATED | P2-A21 LT-010; P2-A23 LT-010 | ScanResult append/cancel covered. |
| LT-011 | RT-LOGIN-003 | MIGRATED | P2-A21 LT-011; P2-A23 LT-011 | Login success returns URL. |
| LT-012 | RT-NAV-002; RT-LOGIN-008 | MIGRATED | P2-A21 LT-012; P2-A23 LT-012 | Empty/non-empty and stored URL behavior covered. |
| LT-013 | N/A | BLOCKER | P2-A21 LT-013; P2-A24 LT-013 | WebView props/no-cache/user-agent require screen render harness. |
| LT-014 | N/A | BLOCKER | P2-A21 LT-014; P2-A24 LT-014 | Page start/finish loading state is screen state. |
| LT-015 | N/A | SKIP | P2-A21 LT-015; P3-A33 MAP-021 | SSL bypass excluded in RN Phase 3. |
| LT-016 | RT-NAV-002 | MIGRATED | P2-A21 LT-016; P2-A23 LT-016 | Barcode/login/normal URL suppression and load decision covered. |
| LT-017 | RT-WEBVIEW-001 | PARTIAL | P2-A21 LT-017; P2-A23 LT-017 | Error mapping covered; dialog/clear screen flow needs UI harness. |
| LT-018 | RT-NAV-002; RT-NAV-004; RT-SESSION-002 | MIGRATED | P2-A21 LT-018; P2-A23 LT-018 | Login page/form session expiry covered. |
| LT-019 | RT-NAV-002 | PARTIAL | P2-A21 LT-019; P2-A23 LT-019 | Barcode URL branch covered; permission branch blocked. |
| LT-020 | RT-NAV-002; RT-WEBVIEW-001 | MIGRATED | P2-A21 LT-020; P2-A23 LT-020 | Error URL and server-error mapping covered. |
| LT-021 | N/A | BLOCKER | P2-A21 LT-021; P2-A24 LT-021 | WebView visibility for special URLs needs screen/service expansion. |
| LT-022 | RT-SESSION-003; RT-SESSION-005 | PARTIAL | P2-A21 LT-022; P2-A23 LT-022 | Logout covered; toolbar close/finishAffinity needs UI harness. |
| LT-023 | RT-SESSION-001 | PARTIAL | P2-A21 LT-023; P2-A23 LT-023 | Invalid-login resume covered; back/destroy need UI harness. |
| LT-024 | RT-NAV-006 | MIGRATED | P2-A21 LT-024; P2-A23 LT-024 | Scan/cancel return URL covered. |
| LT-025 | RT-NAV-001; RT-NAV-002 | MIGRATED | P2-A21 LT-025; P2-A23 LT-025 | Constants and URL outcomes covered except about:blank visibility under LT-029. |
| LT-026 | RT-NAV-003 | MIGRATED | P2-A21 LT-026; P2-A23 LT-026 | Malformed barcode URL guard covered. |
| LT-027 | RT-WEBVIEW-001 | PARTIAL | P2-A21 LT-027; P2-A23 LT-027 | Error mapping covered; duplicate-dialog guard blocked. |
| LT-028 | N/A | SKIP | P2-A21 LT-028; P2-A23 LT-028 | Inactive timeout body intentionally not asserted. |
| LT-029 | N/A | BLOCKER | P2-A21 LT-029; P2-A23 LT-029 | RN classifier has no hidden/aboutBlank decision. |
| LT-030 | N/A | SKIP | P2-A21 LT-030; P2-A23 LT-030 | No logger seam in Phase 2 or Phase 3. |
