# RN Test Mapping

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P4 |
| Artifact ID | P4-A42 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_4/42_rn_test_mapping.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## Test Mapping

| Legacy Test ID | RN Test ID | Status | Source IDs | Notes |
|---|---|---|---|---|
| LT-001 | RT-LOGIN-007 | MIGRATED | P2-A21 LT-001; P2-A23 LT-001 | Invalid settings gate route decision covered. |
| LT-002 | N/A | BLOCKER | P2-A21 LT-002; P2-A23 LT-002 | PIN success unwind requires PinGateScreen UI/hook harness. |
| LT-003 | RT-LOGIN-008 | MIGRATED | P2-A21 LT-003; P2-A23 LT-003 | Stored URL rebuild covered by login URL service. |
| LT-004 | N/A | SKIP | P2-A21 LT-004; P3-A33 MAP-020 | RN collapses iOS wrapper/child WebView into a single route; no wrapper behavior remains. |
| LT-005 | RT-SESSION-001 | MIGRATED | P2-A21 LT-005; P2-A23 LT-005 | Foreground invalid-login guard covered. |
| LT-006 | RT-SESSION-003; RT-SESSION-005 | MIGRATED | P2-A21 LT-006; P2-A23 LT-006 | Logout clears valid-login and resets route. |
| LT-007 | RT-NAV-002 | MIGRATED | P2-A21 LT-007; P2-A23 LT-007 | Barcode URL route handoff covered. |
| LT-008 | RT-NAV-004; RT-SESSION-002 | MIGRATED | P2-A21 LT-008; P2-A23 LT-008 | Login form action and session expiry covered. |
| LT-009 | RT-NAV-005; RT-STORAGE-004 | MIGRATED | P2-A21 LT-009; P2-A23 LT-009 | QR payload normalization and invalid QR validation covered. |
| LT-010 | RT-NAV-006 | MIGRATED | P2-A21 LT-010; P2-A23 LT-010 | ScanResult append/cancel covered. |
| LT-011 | RT-LOGIN-007 | MIGRATED | P2-A21 LT-011; P2-A23 LT-011 | Android invalid settings route decision covered. |
| LT-012 | RT-LOGIN-003 | MIGRATED | P2-A21 LT-012; P2-A23 LT-012 | Login success returns WebView URL through RN login service. |
| LT-013 | N/A | BLOCKER | P2-A21 LT-013; P2-A23 LT-013 | License popup/screen route requires UI harness; license content is partial in P3. |
| LT-014 | N/A | BLOCKER | P2-A21 LT-014; P2-A23 LT-014 | Login hardware back behavior is screen BackHandler state. |
| LT-015 | RT-STORAGE-003; RT-STORAGE-004 | PARTIAL | P2-A21 LT-015; P2-A23 LT-015 | QR parse/import values covered; SettingsScreen result handler needs UI harness. |
| LT-016 | RT-NAV-005; RT-STORAGE-004 | PARTIAL | P2-A21 LT-016; P2-A23 LT-016 | Scanner payload behavior covered; QR scanner screen back/duplicate paths blocked. |
| LT-017 | RT-NAV-002 | MIGRATED | P2-A21 LT-017; P2-A23 LT-017 | Empty and normal WebView URL decisions covered. |
| LT-018 | RT-NAV-002 | PARTIAL | P2-A21 LT-018; P2-A23 LT-018 | Barcode URL decision covered; permission branch blocked by scanner runtime. |
| LT-019 | RT-NAV-002; RT-NAV-004; RT-SESSION-001; RT-SESSION-002 | MIGRATED | P2-A21 LT-019; P2-A23 LT-019 | Login/error/form/session-auth route decisions covered. |
| LT-020 | RT-NAV-006; RT-SESSION-001 | PARTIAL | P2-A21 LT-020; P2-A23 LT-020 | ScanResult and invalid-auth guard covered; physical scanner runtime excluded. |
| LT-021 | N/A | BLOCKER | P2-A21 LT-021; P2-A23 LT-021 | PIN screen success/back/exit requires UI harness. |
| LT-022 | RT-NAV-001 | MIGRATED | P2-A21 LT-022; P2-A23 LT-022 | Constants covered. |
| LT-023 | RT-NAV-003 | MIGRATED | P2-A21 LT-023; P2-A23 LT-023 | Malformed barcode URL guard covered. |
| LT-024 | N/A | BLOCKER | P2-A21 LT-024; P2-A23 LT-024 | Duplicate scan guard is component ref state. |
| LT-025 | N/A | BLOCKER | P2-A21 LT-025; P2-A23 LT-025 | WebView hardware back no-op is screen BackHandler state. |
| LT-026 | RT-SESSION-001 | MIGRATED | P2-A21 LT-026; P2-A23 LT-026 | Invalid auth guard covered through navigation/session services. |
| LT-027 | N/A | BLOCKER | P2-A21 LT-027; P2-A23 LT-027 | Camera denied branch requires permission/scanner runtime or screen harness. |
