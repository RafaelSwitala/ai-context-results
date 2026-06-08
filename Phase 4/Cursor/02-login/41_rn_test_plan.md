# RN Test Plan (login)

| Field | Value |
|---|---|
| Feature | login |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Status | READY_FOR_REVIEW |
| Last updated | 2026-06-08T19:05:00+02:00 |

## Legacy sources

| Platform | Path | Phase-2 tests |
|---|---|---|
| Android | LoginHttpLogicTest, LoginPinGateTest, LoginValidationTest, PreferencesUtilsLoginTest, StringUtilsLoginTest | 20 |
| iOS | LoginValidationTests, LoginHttpLogicTests, LoginPinValidationTests, LoginPreferencesUtilsTests, LoginUrlUtilsTests | 5 files |

## RN suites (this feature)

| RN test file | Tests | Legacy |
|---|---|---|
| loginService.test.ts | 10 | LoginValidationTest, LoginValidationTests, LoginHttpLogic* |
| loginHttpLogic.test.ts | 5 | LoginHttpLogicTest, LoginHttpLogicTests |
| loginErrorParser.test.ts | 3 | LoginHttpLogic (error extract) |
| loginStorage.test.ts | 4 | PreferencesUtilsLoginTest, LoginPreferencesUtilsTests |
| passwordEncoding.test.ts | 4 | StringUtilsLoginTest, LoginUrlUtilsTests |
| authGate.test.ts | 5 | LoginValidationTest, NavigationLoginGuardTest |
| pinVerification.test.ts | 6 | LoginPinGateTest, LoginPinValidationTests, NavigationLoginGuard* |

Cross-feature plan: `artifacts/webview/codex/20260602-1710-codex-webview/phase_4/41_rn_test_plan.md`.

## Commands

| Command | Result |
|---|---|
| `npm test` | PASS 113/113 |
