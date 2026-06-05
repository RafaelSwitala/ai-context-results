# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:39:04+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-001 | Yes - required iOS field validation asserts exact alert message and login flag remains false | Yes | Yes | Not executed locally because iOS toolchain and XCTest target are unavailable | Keep test file; require macOS/Xcode target wiring before Phase 5 parity comparison. |
| LT-002 | Yes - Android invalid username blocks navigation, shows generic error and leaves login flag false | Yes | Yes | Android legacy only validates username and settings, not password | Covered according to Phase-1 Android facts; password gap tracked separately. |
| LT-003 | Partial - iOS URL construction, credential persistence and valid-login flag are unit-tested, but Alamofire success callback and WebView segue are not executed | Yes | Medium | Static network dependency and no local iOS execution reduce sensitivity for NAV-001/API-001 | Documented as coverage gap; avoid production refactor in Phase 2. |
| LT-004 | Yes - Android stores encoded password, sets valid login and starts `WebviewActivity` with URL extra | Yes | Yes | Does not exercise commented-out HTTP preflight branch | Accept; P1 identifies Android login as optimistic persistence/navigation path. |
| LT-005 | Yes for Android route selection; partial for iOS settings-gate/error seam | Yes | Medium | iOS route to Settings/PIN is not locally executed | Keep iOS test file and mark local execution `NOT_RUN`; Android route coverage is executable. |
| LT-006 | Yes - Android and iOS test files cover PIN match and mismatch; Android executable test asserts no settings route on mismatch | Yes | Yes | Android mismatch test observes current retry state after error instead of requiring immediate field reset | Accepted as legacy-observable behavior; risk noted because P1 text expects reset. |
| LT-007 | Yes - logout resets valid-login flag | Yes | Yes | iOS logout completion does not fire without token/user, so test asserts synchronous flag reset only | Accept; Phase-1 state requirement is the flag reset. |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| API-001; DEP-001 | iOS Alamofire request callback is not unit-executed | iOS LT-003 cannot prove HTTP 200/error-code branches in this environment | Run on macOS after adding/wiring XCTest target, or introduce testable network seam in a later refactor outside Phase 2. |
| NAV-001; NAV-003 | iOS storyboard navigation is only represented through unit seams and not executed locally | iOS navigation parity evidence remains weaker than Android | Execute XCTest target on macOS with storyboard-aware tests or record manual target setup as Phase 5 input. |
| ERRPATH-002 | Android has no explicit password-empty validation in P1 facts or legacy `isValid()` | Cross-platform parity may differ if RN requires password validation for Android | Preserve as documented legacy divergence; RN decision belongs to Phase 3/5. |
| ERRPATH-007; ERRPATH-012 | Android wrong-PIN path shows error but does not immediately clear `userEntered` until the next digit rollover | P1 reset wording is stricter than observed Android unit behavior | Flag for parity decision; do not change legacy production behavior in Phase 2. |
| OUT-005 | Android and iOS coverage percentages are unavailable | Quantitative comparison cannot include statement/branch coverage for legacy login | Add Jacoco/Xcode coverage tooling in a separate test-infrastructure task if coverage metrics become mandatory. |
