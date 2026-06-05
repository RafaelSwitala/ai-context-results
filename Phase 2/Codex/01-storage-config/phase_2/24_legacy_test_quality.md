# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/storage-config/codex/20260602-1615-codex-storage-config/phase_2/24_legacy_test_quality.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:15:54+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-001 | Planned UI prefill/default HTTPS assertion. | Yes in XCTest if target exists. | Yes. | Not executed because iOS target is absent. | Keep as Phase-3/RN parity source; add XCTest target before legacy execution. |
| LT-002 | Planned invalid server save assertion. | Yes with controller harness. | Yes. | Dialog/storage side effect not executable without XCTest target. | Documented NOT_RUN. |
| LT-003 | Planned invalid PIN save assertion. | Yes with controller harness. | Yes. | Dialog/storage side effect not executable without XCTest target. | Documented NOT_RUN. |
| LT-004 | Planned HTTP 200 save assertion. | Yes only with HTTP wrapper/mock. | Yes. | Direct Alamofire call has no test seam and XCTest target absent. | Documented NOT_RUN; RN tests should mock HTTP service. |
| LT-005 | Planned non-200 block assertion. | Yes only with HTTP wrapper/mock. | Yes. | Direct Alamofire call has no test seam and XCTest target absent. | Documented NOT_RUN; RN tests should mock HTTP service. |
| LT-006 | Parser maps QR fields and validity. | Yes. | Yes. | Prepared iOS test not executed. | Add XCTest target or port to RN parser tests. |
| LT-007 | Invalid https defaults to HTTPS. | Yes. | Yes. | Prepared iOS test not executed. | Add XCTest target or port to RN parser tests. |
| LT-008 | Scanner normalizes query-only payload. | Yes with scanner/controller harness. | Yes. | AVFoundation metadata path not isolated. | Documented NOT_RUN. |
| LT-009 | Invalid scanner payload shows error/restarts. | Yes with scanner/controller harness. | Yes. | AVFoundation metadata path not isolated. | Documented NOT_RUN. |
| LT-010 | Invalid settings route to Settings/PIN. | Yes with storyboard harness. | Yes. | Navigation relies on UIKit target/storyboard. | Documented NOT_RUN. |
| LT-011 | Login URL from preferences. | Yes. | Yes. | Prepared iOS test not executed. | Add XCTest target or port to RN URL tests. |
| LT-012 | App startup applies newer config file. | Partially. | Partially. | Only ConfigFileSettings.isValid was executed; asset-backed private update branch not covered. | Marked NOT_RUN for full LT; preserve as RN config bootstrap test requirement. |
| LT-013 | App startup ignores invalid/same config. | Partially. | Partially. | Invalid predicate covered; unchanged preferences branch not executed. | Marked NOT_RUN for full LT; preserve as RN config bootstrap test requirement. |
| LT-014 | Protocol spinner prefill. | Yes with Activity harness. | Yes. | Not implemented; UI spinner state is outside pure utility tests. | Documented NOT_RUN. |
| LT-015 | Settings save rejects invalid input. | Yes with Activity harness. | Yes. | Private validation and dialogs need Activity tests. | Documented NOT_RUN. |
| LT-016 | Settings save persists only after OK status. | Yes with HTTP seam. | Yes. | Direct static HttpStatusUtil call prevents deterministic mock without extra tooling. | Documented NOT_RUN. |
| LT-017 | Settings save blocks non-OK status. | Yes with HTTP seam. | Yes. | Direct static HttpStatusUtil call prevents deterministic mock without extra tooling. | Documented NOT_RUN. |
| LT-018 | QR parser maps fields, culture and defaults. | Yes. | Yes. | App language registry is seeded manually. | PASS; acceptable because dependency is deterministic test state. |
| LT-019 | QR scanner normalization and invalid path. | Yes with Activity harness. | Yes. | Not implemented; scanner result/dialog harness required. | Documented NOT_RUN. |
| LT-020 | Login settings guard. | Yes with Activity harness. | Yes. | Not implemented; navigation intent assertions required. | Documented NOT_RUN. |
| LT-021 | Login URL includes App and Culture. | Yes. | Yes. | SharedPreferences injected by reflection because production utility stores static private reference. | PASS; acceptable legacy workaround documented. |
| LT-022 | Douglas DNS migration. | Yes. | Yes. | Exact string branch only; non-matching branch not separately asserted. | PASS; sufficient for LT-022. |
| LT-023 | Existing scheme is not duplicated. | Yes. | Yes. | Android passed; iOS prepared but not executed. | Keep cross-platform gap visible. |
| LT-024 | Empty client still builds expected path. | Yes. | Yes. | Android passed; iOS prepared but not executed. | Keep cross-platform gap visible. |
| LT-025 | iOS URL encoding failure. | Yes with XCTest. | Yes. | Not executed; Foundation percent-encoding failure is hard to provoke deterministically. | Documented NOT_RUN. |
| LT-026 | Invalid protocol writes ignored. | Yes. | Yes. | Uses reflection-injected SharedPreferences. | PASS. |
| LT-027 | Unsupported QR culture falls back to default. | Yes. | Yes. | App language registry is seeded manually. | PASS. |
| LT-028 | Duplicate QR emission ignored. | Yes with Activity harness. | Yes. | Scanner state is inside Activity and not covered by pure tests. | Documented NOT_RUN. |
| LT-029 | Token absent dependency no-op. | Yes in dependency tests. | Yes. | Out of storage-config unit scope per Phase 1. | Documented NOT_RUN and retained as dependency follow-up. |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| iOS legacy test target | No XCTest target exists and xcodebuild is unavailable on Windows. | iOS prepared tests cannot prove legacy behavior until a macOS/Xcode runner or target setup exists. | Add MobileBrowserV2Tests target to xcodeproj on macOS and run xcodebuild test. |
| BEH-003, API-001 | iOS check-access save branches not executable. | HTTP success/failure persistence could regress unnoticed in legacy. | RN Phase 4 must mock HTTP service and assert persistence side effects. |
| BEH-009, STATE-004, STOR-010 | Android App.updateSettingsOnVersionChanged full branch not executed. | Config file bootstrap side effects only partially covered through validity predicate. | Introduce injectable ConfigFileLoader or Robolectric asset fixture in future legacy hardening. |
| BEH-011, BEH-012, ERRPATH-005, ERRPATH-006 | Android SettingsActivity validation/save not unit-tested. | UI validation and HTTP-gated persistence could regress in legacy. | RN Phase 4 should implement UI/service separation and direct tests for validation + HTTP OK/non-OK. |
| BEH-015, BEH-016, NAV-005, NAV-006 | Android scanner/login navigation paths not unit-tested. | Navigation parity remains dependent on Phase 1 facts and future RN tests. | Use Robolectric ActivityScenario or RN navigation tests in later phases. |
| OUT-005 | No Android coverage task is configured. | Quantitative coverage is unavailable; only pass/fail evidence exists. | Add Jacoco/AGP coverage configuration if legacy coverage percentages are required. |
