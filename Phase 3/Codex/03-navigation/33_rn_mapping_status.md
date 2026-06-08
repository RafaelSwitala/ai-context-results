# RN Mapping Status

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_3/33_rn_mapping_status.md |
| Status | COMPLETED_WITH_PARTIALS |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:54:43+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | LoginScreen/AppNavigator | Login has settings/PIN callbacks, WebView success route, License action and BackHandler exit. | Uses existing screen path. |
| MAP-002 | IMPLEMENTED | SettingsScreen | Settings has save, cancel and QR route callbacks. | Form semantics remain storage-config. |
| MAP-003 | IMPLEMENTED | QRCodeScannerScreen | QR route returns parsed values to Settings, invalid QR remains on screen, back is no-op. | Physical camera excluded by MAP-026. |
| MAP-004 | IMPLEMENTED | PinGateScreen | Correct PIN opens Settings; back/cancel returns out of PIN route. | Typecheck PASS. |
| MAP-005 | IMPLEMENTED | WebViewScreen | WebView route uses URL param, classifier, auth reset, toolbar logout/close and barcode callback. | Wrapper collapsed per MAP-020. |
| MAP-006 | PARTIAL | BarcodeScannerScreen | Barcode cancel/scan/auth reset route handoff implemented. | Physical scanner dependency excluded by MAP-026. |
| MAP-007 | PARTIAL | LicenseScreen | License route shell added. | Native license HTML/content not migrated. |
| MAP-008 | IMPLEMENTED | navigation.constants | Route names, param keys and legacy URL constants added. | Typecheck PASS. |
| MAP-009 | IMPLEMENTED | webViewNavigationService | URL/form classifier added for barcode/login/error/empty paths. | Pure service ready for Phase 4 tests. |
| MAP-010 | IMPLEMENTED | navigationAuthGuard | Valid-login reset and logout reset helpers added. | Reuses login session service. |
| MAP-011 | IMPLEMENTED | scannerNavigationService | QR normalizer, scanner return URL and ScanResult URL builder added. | ScanResult constant preserved. |
| MAP-012 | IMPLEMENTED | authStorageService | Navigation reads `pin`, `hasValidSettings`, `hasValidLogin` via existing auth snapshot. | Storage implementation reused. |
| MAP-013 | IMPLEMENTED | AppNavigator route state | `url`/`returnUrl` are kept in component state only. | Full URL is no longer displayed in toolbar. |
| MAP-014 | IMPLEMENTED | WebViewScreen | `react-native-webview` used with no-cache headers. | WebView rendering is integration-tested only. |
| MAP-015 | EXCLUDED | N/A | No standalone navigation API implemented. | Login/settings remote checks remain dependency outcomes. |
| MAP-016 | IMPLEMENTED | AppNavigator | Root route state covers Login -> PIN/Settings and PIN -> Settings. | Typecheck PASS. |
| MAP-017 | IMPLEMENTED | AppNavigator/WebViewScreen | Login success URL opens WebView route. | Existing login callback reused. |
| MAP-018 | IMPLEMENTED | navigationAuthGuard/WebViewScreen/BarcodeScannerScreen | Invalid auth resets guarded routes to Login. | Uses valid-login flag. |
| MAP-019 | IMPLEMENTED | WebViewScreen/BarcodeScannerScreen | Barcode URL opens Barcode route or fallback URL; scan returns WebView URL. | Camera fallback implemented. |
| MAP-020 | IMPLEMENTED | WebViewScreen | Single WebView route replaces iOS wrapper/native activity split. | Documented RN decision. |
| MAP-021 | PARTIAL | cameraPermissionService/AppNavigator | Android camera permission check and denied fallback added. | No real scanner package. |
| MAP-022 | IMPLEMENTED | BackHandler in screens | Login exits app, WebView/scanners no-op, PIN cancels. | RN model for Android behavior. |
| MAP-023 | PARTIAL | LicenseScreen | Android-only License route shell added. | Content not migrated. |
| MAP-024 | PARTIAL | AppNavigator | Typed custom root navigator implemented. | `@react-navigation/native` present, but no stack package wired. |
| MAP-025 | IMPLEMENTED | WebViewScreen | Existing `react-native-webview` reused. | Typecheck PASS. |
| MAP-026 | EXCLUDED | scanner dependency | No camera/scanner dependency added. | Scanner handoff screens provide testable route seam. |
| MAP-027 | IMPLEMENTED | Jest/jest-expo | Existing Jest harness reused; no tests in Phase 3. | `--passWithNoTests` PASS. |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| `MAP-006`, `MAP-021`, `MAP-026` | Physical camera scanning is not implemented because no RN scanner package exists. | Blocks full device parity, not route/service unit tests. | Add Expo-compatible scanner dependency and wire decoded values into scanner screens. |
| `MAP-007`, `MAP-023` | License route has RN shell only; native license content is not migrated. | Blocks Android license content parity. | Migrate license HTML/content when license feature is in RN scope. |
| `MAP-024` | App uses typed local route state instead of React Navigation stack. | Does not block Phase 4 route tests, but differs from P1 dependency preference. | Add stack/native-stack dependency later if project standardizes on React Navigation containers. |
