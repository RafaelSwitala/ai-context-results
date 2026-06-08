# RN Test Plan (storage-config)

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P4 |
| Artifact ID | P4-A41 |
| Status | READY_FOR_REVIEW |
| Last updated | 2026-06-08T19:05:00+02:00 |

## Legacy sources

| Platform | Path | Tests |
|---|---|---|
| Android | ConfigFileSettingsTest, PreferencesUtilsStorageConfigTest, QRCodeParserTest, SettingsValidationTest | 14 Phase-2 |
| iOS | StorageConfigQRCodeParserTests, StorageConfigUrlUtilsTests, SettingsValidationTests | 3 Phase-2 files |

## RN suites (this feature)

| RN test file | Tests | Legacy |
|---|---|---|
| configFileService.test.ts | 2 | ConfigFileSettingsTest |
| storageConfigQr.test.ts | 9 | QRCodeParserTest, StorageConfigQRCodeParserTests, NavigationQrScannerRouteTest |
| storageConfigService.test.ts | 3 | SettingsValidationTest |
| storageConfigStorage.test.ts | 3 | PreferencesUtilsStorageConfigTest |
| storageConfigValidation.test.ts | 6 | SettingsValidationTest, PreferencesUtils* |
| urlBuilder.test.ts | 7 | PreferencesUtilsStorageConfigTest, StorageConfigUrlUtilsTests |

**Feature subtotal:** ~30 tests (shared suites also cover login/navigation cases — see cross-feature plan in `artifacts/webview/codex/20260602-1710-codex-webview/phase_4/41_rn_test_plan.md`).

## Commands

| Command | Result |
|---|---|
| `npm test` | PASS 113/113 (full suite) |
