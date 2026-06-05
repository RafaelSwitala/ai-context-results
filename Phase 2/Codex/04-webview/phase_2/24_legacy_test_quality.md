# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T18:08:54+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-001 | Yes - iOS seam asserts WEBVIEW URL payload | Yes | Yes | NOT_RUN locally | Run on macOS/Xcode target. |
| LT-002 | Partial - wrapper embedding planned | Yes | Medium | Storyboard child creation not executable locally | Add macOS XCTest/UI test. |
| LT-003 | Partial - WKWebView load planned | Yes | Medium | iOS WebKit runtime unavailable | Add macOS XCTest with WebView double. |
| LT-004 | Partial - empty URL planned | Yes | Medium | Private iOS method/runtime unavailable | Extract testable URL loader seam later. |
| LT-005 | Partial - loading state planned | Yes | Medium | MBProgressHUD/WebKit runtime unavailable | Cover in RN screen tests and macOS XCTest. |
| LT-006 | Partial - barcode route planned | Yes | Medium | WKNavigationAction unavailable locally | Extract URL classifier in RN. |
| LT-007 | Partial - login/session expiry planned | Yes | Medium | JavaScript callback unavailable locally | Cover in RN callback tests. |
| LT-008 | Partial - logout route planned | Yes | Medium | action sheet/delete callback unavailable locally | Add simulator/UI or service seam. |
| LT-009 | Partial - cleanup planned | Yes | Medium | WKWebView lifecycle unavailable locally | Add macOS XCTest. |
| LT-010 | Yes - iOS seam asserts ScanResult URL construction | Yes | Yes | NOT_RUN locally | Run on macOS/Xcode target. |
| LT-011 | Yes - Android asserts Login to Webview `App.URL` payload | Yes | Yes | None | No action. |
| LT-012 | Yes - Android asserts intent URL, stored URL and empty fallback | Yes | Yes | None | No action. |
| LT-013 | Yes - Android asserts WebView settings and no-cache headers | Yes | Yes | Does not prove native renderer behavior | Accept unit scope; smoke-test on device later. |
| LT-014 | Yes - Android asserts page start/finish loaded/progress/visibility | Yes | Yes | Timeout body not executed here | Timeout edge documented under LT-028. |
| LT-015 | No executable assertion | N/A | N/A | SSL handler branch not stable in local unit seam | Extract SSL decision or add instrumentation. |
| LT-016 | Yes - Android asserts barcode/login suppression and normal URL progress | Yes | Yes | Uses deprecated string overload matching legacy code | Accept; mirrors legacy callback. |
| LT-017 | No executable assertion | N/A | N/A | WebResource error plumbing not stable locally | Add extracted error mapper or instrumentation. |
| LT-018 | Yes - Android login URL page finish clears auth, starts Login, finishes, hides WebView | Yes | Yes | Does not mock JS form action separately | Cover JS form in RN callback tests. |
| LT-019 | No executable assertion | N/A | N/A | Permission branch requires native permission/scanner runtime | Add permission service tests in RN/instrumentation. |
| LT-020 | No executable assertion | N/A | N/A | Error URL dialog branch skipped | Add error mapper seam. |
| LT-021 | Yes - Android hide/show behavior covered for login/about/barcode/normal paths | Yes | Yes | Error path visibility partly skipped | Covered as available through page finish. |
| LT-022 | Yes - Android toolbar logout clears auth and finishes | Yes | Yes | Close/finishAffinity not separately asserted | Add separate close assertion if Robolectric exposes stable signal. |
| LT-023 | Yes - Android pause hides progress, resume invalid finishes, back no-op | Yes | Yes | onDestroy private WebView ref not asserted | Accept as observable lifecycle coverage. |
| LT-024 | No executable assertion | N/A | N/A | Scanner runtime path skipped | Add scanner route seam/instrumentation. |
| LT-025 | Yes on Android constants; iOS seam written | Yes | Yes | iOS NOT_RUN | Re-run iOS on macOS. |
| LT-026 | No executable assertion | N/A | N/A | iOS risky malformed barcode split not run | RN should guard malformed URLs. |
| LT-027 | No executable assertion | N/A | N/A | Duplicate resource error callback not stable locally | Add extracted error-display guard. |
| LT-028 | No executable assertion | N/A | N/A | 20s inactive timeout would only slow suite | Keep documented; test only if timeout body becomes active. |
| LT-029 | Yes - Android about:blank hides WebView | Yes | Yes | None | No action. |
| LT-030 | Partial - no logging seam exists; constants/routes documented | Yes | Medium | Cannot assert absence of logging where no logger seam exists | Add RN security test around console/logger mocks. |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| DEP-001; DEP-002; DEP-003 | iOS WebKit, MBProgressHUD and storyboard paths are not executable on Windows | iOS legacy evidence remains seam-only | Add/wire XCTest target and run on macOS/Xcode. |
| BEH-019; ERRPATH-009; SEC-003 | Android SSL bypass branch skipped | SSL policy could diverge without legacy unit failure | Extract SSL decision into testable service or cover with instrumentation. |
| BEH-021; ERRPATH-005; ERRPATH-006; ERRPATH-007 | Android WebView error dialog branches skipped | Error UX could regress without legacy unit failure | Extract error mapper/dialog route decision for RN and optionally legacy. |
| BEH-023; BEH-024; ERRPATH-008; SEC-004; DEP-006 | Barcode permission/scanner runtime skipped | Camera-denied and scanner handoff parity has weaker evidence | Add permission service tests and scanner instrumentation. |
| SEC-001; LT-030 | No legacy logging seam for sensitive URL assertion | Sensitive URL leakage cannot be mechanically proven in legacy unit scope | Add RN tests with logger mocks and code review guard. |
| OUT-005 | Coverage percentages unavailable | Quantitative comparison cannot include legacy coverage | Add Jacoco/Xcode coverage tooling separately. |
