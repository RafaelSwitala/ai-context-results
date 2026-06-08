# RN Test Plan (cross-feature)

| Field | Value |
|---|---|
| Feature | all (storage-config, login, navigation, webview) |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_4/41_rn_test_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T19:00:00+02:00 |

## Scope

Phase 4 migrates **all** pure-logic tests from:

- `android-mobilebrowser/.../mobilebrowser4android/*.java` (16 files, 94 @Test methods)
- `ios-mobilebrowser/MobileBrowserV2Tests/*.swift` (17 files, 67 test functions)

into **24 RN Jest suites** under `rn-e-mobilebrowser/src/__tests__/`. Full mapping: `rn-e-mobilebrowser/docs/legacy-test-mapping.md`.

## RN Test Inventory (113 tests)

| RN test file | Legacy sources | Tests |
|---|---|---|
| authGate.test.ts | LoginValidationTest, NavigationLoginGuardTest, NavigationLoginGuardTests | 5 |
| configFileService.test.ts | ConfigFileSettingsTest | 2 |
| loginErrorParser.test.ts | LoginHttpLogic (error extract) | 3 |
| loginHttpLogic.test.ts | LoginHttpLogicTest, LoginHttpLogicTests | 5 |
| loginService.test.ts | LoginValidationTest, LoginValidationTests, LoginHttpLogic* | 10 |
| loginStorage.test.ts | PreferencesUtilsLoginTest, LoginPreferencesUtilsTests | 4 |
| navigationAuthGuard.test.ts | WebviewActivityLogicTest, WebviewSessionGuardTests, NavigationScanResultTests | 3 |
| navigationConstants.test.ts | NavigationRouteLogicTest, NavigationRouteConstantsTests | 1 |
| passwordEncoding.test.ts | StringUtilsLoginTest, LoginUrlUtilsTests | 4 |
| pinVerification.test.ts | LoginPinGateTest, LoginPinValidationTests, NavigationLoginGuard* | 6 |
| scannerNavigationService.test.ts | NavigationQrScannerRouteTest, NavigationRouteLogicTest | 1 |
| serverErrorMapper.test.ts | WebviewErrorHandling*, MiscUtils | 3 |
| storageConfigQr.test.ts | QRCodeParserTest, StorageConfigQRCodeParserTests, NavigationQrScannerRouteTest | 9 |
| storageConfigService.test.ts | SettingsValidationTest, PreferencesUtilsStorageConfigTest | 3 |
| storageConfigStorage.test.ts | PreferencesUtilsStorageConfigTest | 3 |
| storageConfigValidation.test.ts | SettingsValidation*, LoginPinGate*, PreferencesUtils* | 6 |
| urlBuilder.test.ts | PreferencesUtilsStorageConfigTest, StorageConfigUrlUtilsTests, LoginUrlUtilsTests | 7 |
| urlRedaction.test.ts | WebviewSessionGuardTests | 2 |
| webViewConstants.test.ts | WebviewActivityLogicTest | 4 |
| webViewErrorHandling.test.ts | WebviewErrorHandlingTest, WebviewErrorHandlingTests | 5 |
| webViewHandoff.test.ts | WebviewScanResultTest, NavigationScanResultTests, NavigationRouteLogicTest | 5 |
| webViewLoadingLogic.test.ts | WebviewLoadLogicTests, WebviewActivityLogicTest | 7 |
| webViewNavigationService.test.ts | WebviewActivityLogicTest, NavigationRouteLogicTest, WebviewLoadLogicTests | 6 |
| webViewRouteClassifier.test.ts | WebviewUrlClassifierTest, NavigationUrlClassifierTests, WebviewUrlClassifierTests | 9 |

## Skipped legacy tests (Phase 5)

UI Activities, segues, dialogs, camera permission prompts, native WebView lifecycle — see `docs/legacy-test-mapping.md` § Not migrated.

## Commands

| Command | Result |
|---|---|
| `npm test` | PASS 113/113 |
| `npx tsc --noEmit` | PASS |
