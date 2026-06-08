# RN Test Mapping

| Field | Value |
|---|---|
| Feature | login |
| Phase | P4 |
| Artifact ID | P4-A42 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_4/42_rn_test_mapping.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-08T15:48:11+02:00 |

## Test Mapping

| Legacy Test ID | RN Test ID | Status | Source IDs | Notes |
|---|---|---|---|---|
| LT-001 | RT-LOGIN-001 | MIGRATED | P2-A21 LT-001; P2-A23 LT-001 | iOS empty username/password gate mapped to RN login service errors. |
| LT-002 | RT-LOGIN-001 | MIGRATED | P2-A21 LT-002; P2-A23 LT-002 | Android invalid settings/empty username gate mapped to RN login service errors. |
| LT-003 | RT-LOGIN-002; RT-LOGIN-003; RT-LOGIN-004; RT-LOGIN-005; RT-LOGIN-006; RT-LOGIN-008 | MIGRATED | P2-A21 LT-003; P2-A23 LT-003 | URL build, HTTP success/error and storage side effects covered at RN service seams. |
| LT-004 | RT-LOGIN-002; RT-LOGIN-003; RT-LOGIN-005; RT-LOGIN-006; RT-LOGIN-008 | MIGRATED | P2-A21 LT-004; P2-A23 LT-004 | Android optimistic success and URL payload represented through RN submit/build services. |
| LT-005 | RT-LOGIN-007 | MIGRATED | P2-A21 LT-005; P2-A23 LT-005 | Settings/PIN route decision covered by pure auth gate. |
| LT-006 | N/A | BLOCKER | P2-A21 LT-006; P2-A24 LT-006 | Requires UI/hook test harness for `PinGateScreen` or extracted PIN service. |
| LT-007 | RT-LOGIN-006; RT-SESSION-002; RT-SESSION-003 | MIGRATED | P2-A21 LT-007; P2-A23 LT-007 | Local valid-login reset covered in auth/session service tests. |

## Source Test Directories

| Platform | Directory | Coverage |
|---|---|---|
| Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/mobilebrowser4android/ | Login validation, HTTP, PIN, preference and Base64 tests mapped through RT-LOGIN and RT-SESSION IDs. |
| iOS | ios-mobilebrowser/MobileBrowserV2Tests | Login validation, URL, preferences, HTTP and PIN validation tests mapped or blocked above. |
