# RN Test Plan (navigation)

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Status | READY_FOR_REVIEW |
| Last updated | 2026-06-08T19:05:00+02:00 |

## Legacy sources

| Platform | Path | Phase-2 tests |
|---|---|---|
| Android | NavigationLoginGuardTest, NavigationQrScannerRouteTest, NavigationRouteLogicTest | 24 |
| iOS | NavigationLoginGuardTests, NavigationRouteConstantsTests, NavigationScanResultTests, NavigationUrlClassifierTests | 4 files |

## RN suites (this feature)

| RN test file | Tests | Legacy |
|---|---|---|
| navigationConstants.test.ts | 1 | NavigationRouteLogicTest, NavigationRouteConstantsTests |
| navigationAuthGuard.test.ts | 3 | WebviewActivityLogicTest, NavigationScanResultTests, WebviewSessionGuardTests |
| scannerNavigationService.test.ts | 1 | NavigationQrScannerRouteTest, NavigationRouteLogicTest |
| authGate.test.ts | 5 | NavigationLoginGuardTest, NavigationLoginGuardTests |
| pinVerification.test.ts | 6 | NavigationLoginGuard* |
| webViewRouteClassifier.test.ts | 9 | NavigationUrlClassifierTests, WebviewUrlClassifier* |
| webViewNavigationService.test.ts | 6 | NavigationRouteLogicTest, NavigationUrlClassifierTests |
| webViewHandoff.test.ts | 5 | NavigationScanResultTests, NavigationRouteLogicTest |
| urlRedaction.test.ts | 2 | WebviewSessionGuardTests |

Cross-feature plan: `artifacts/webview/codex/20260602-1710-codex-webview/phase_4/41_rn_test_plan.md`.

## Commands

| Command | Result |
|---|---|
| `npm test` | PASS 113/113 |
