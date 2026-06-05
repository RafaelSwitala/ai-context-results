# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:39:04+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Login fields loaded, username or password empty | `LoginButtonTouchUp` is invoked | User/password error is presented; `hasValidLogin` remains false; no request path is reached | P1-A13: LT-001; EP-001; BEH-001; BEH-002; BEH-003; ERRPATH-001; ERRPATH-002 | HIGH |
| LT-002 | Android | Valid settings are missing or username is empty | Login activity starts or login button is pressed | Invalid settings route away; empty username shows generic error; no WebView navigation; `hasValidLogin` remains false | P1-A13: LT-002; EP-002; BEH-002; STOR-009; ERRPATH-004 | HIGH |
| LT-003 | iOS | Valid settings, credentials, successful response without `Error` query | Login success side effects are exercised at unit seams | Login URL can be built; credentials can be saved; `hasValidLogin=true`; WebView segue remains integration-covered | P1-A13: LT-003; BEH-003; BEH-005; BEH-009; BEH-010; BEH-011; STATE-001; NAV-001; STOR-001; STOR-002; STOR-003; API-001 | HIGH |
| LT-004 | Android | Valid settings, username, password, locale | Login button is pressed | Base64 password is stored; `hasValidLogin=true`; `WebviewActivity` starts with login URL extra | P1-A13: LT-004; EP-002; BEH-004; BEH-017; BEH-018; BEH-020; BEH-021; BEH-022; STATE-002; NAV-002; STOR-006; STOR-007; STOR-008; API-002 | HIGH |
| LT-005 | Cross | `hasValidSettings=false`, once without PIN and once with PIN | Login screen init or settings action runs | Route targets Settings when no PIN exists; route targets PIN when PIN exists | P1-A13: LT-005; EP-003; EP-004; BEH-005; BEH-016; NAV-003; NAV-004; STOR-004; STOR-005; STOR-009; STOR-010 | HIGH |
| LT-006 | Cross | Stored PIN is `1234` | Matching and non-matching PIN input is entered | Match opens settings; mismatch shows invalid-PIN state and allows retry | P1-A13: LT-006; BEH-006; BEH-012; BEH-023; BEH-024; NAV-005; ERRPATH-005; ERRPATH-007; ERRPATH-012; UI-003; UI-004; STOR-005; STOR-010 | HIGH |
| LT-007 | Cross | `hasValidLogin=true` | App background/logout hook runs | `hasValidLogin=false` is persisted | P1-A13: LT-007; EP-005; EP-006; BEH-007; STATE-003; STATE-004; STOR-003; STOR-008; API-003; DEP-004 | HIGH |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14.1 | Isolated `SharedPreferences`, controlled `App` singleton fields, Robolectric activity shadows | Existing `app/src/test/` structure is used. `testOptions.unitTests.includeAndroidResources=true` was required so activity tests can load manifest, resources, AppCompat themes and drawables; documented as `ERR-P2-01` recovery. |
| iOS | XCTest | Manual recording subclasses for `present` and `performSegue` | Tests are written under existing `MobileBrowserV2Tests/`. Local execution is `N/A` because this Windows workspace has no `xcodebuild` or `swift`, and `project.pbxproj` does not define an XCTest target. |
