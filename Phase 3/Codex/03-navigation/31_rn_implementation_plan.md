# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_3/31_rn_implementation_plan.md |
| Status | COMPLETED |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:54:43+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/LoginScreen.tsx; rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | LoginScreen route callbacks | Adapt existing login screen for settings/PIN guard, WebView submit route, License route and Android back exit. | EP-001, EP-002, EP-008, BEH-001, BEH-002, BEH-012..BEH-016, NAV-001, NAV-002, NAV-009, NAV-013, NAV-014, UI-001, UI-004 |
| MAP-002 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx; rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | SettingsScreen navigation callbacks | Adapt settings save/cancel/QR route contract. | EP-003, EP-009, BEH-017, BEH-018, NAV-004, NAV-011, NAV-012 |
| MAP-003 | rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Adapt QR screen to cancel/result/back no-op; parser semantics remain storage-config. | EP-004, EP-010, BEH-010, BEH-019, ERRPATH-001, ERRPATH-007, NAV-005, NAV-012, UI-003, UI-006 |
| MAP-004 | rn-e-mobilebrowser/src/screens/PinGateScreen.tsx | PinGateScreen | Adapt existing login PIN gate as Navigation PIN route. | EP-013, BEH-027, STATE-002, STATE-007, NAV-010 |
| MAP-005 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebViewScreen | Adapt WebView route with URL param, no-cache headers, toolbar, URL classifier and auth guard callbacks. | EP-005, EP-006, EP-011, BEH-003..BEH-009, BEH-020..BEH-024, NAV-003, NAV-006, NAV-007, NAV-015, NAV-016, NAV-018, UI-002, UI-005 |
| MAP-006 | rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add barcode scanner handoff screen with cancel/scan return and invalid-auth reset. | EP-007, EP-012, BEH-011, BEH-025, BEH-026, ERRPATH-002, NAV-008, NAV-017 |
| MAP-007 | rn-e-mobilebrowser/src/screens/LicenseScreen.tsx | LicenseScreen | Add Android license route shell. | BEH-015, NAV-014 |
| MAP-008 | rn-e-mobilebrowser/src/navigation/navigation.constants.ts | ROUTE_NAMES/ROUTE_PARAM_KEYS/WEBVIEW_NAVIGATION | Add route constants and legacy URL tokens. | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 |
| MAP-009 | rn-e-mobilebrowser/src/services/webViewNavigationService.ts | classifyWebViewUrl/classifyWebViewFormAction | Add pure WebView URL decision service. | BEH-008, BEH-009, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005, ERRPATH-006 |
| MAP-010 | rn-e-mobilebrowser/src/services/navigationAuthGuard.ts | resetToLoginIfInvalid/logoutAndReset | Add auth guard/reset service over login storage/session service. | BEH-006, BEH-007, BEH-022, BEH-023, BEH-024, BEH-026, SEC-001 |
| MAP-011 | rn-e-mobilebrowser/src/services/scannerNavigationService.ts | normalizeQrPayload/deriveScannerReturnUrl/buildScanResultUrl | Add scanner payload and ScanResult URL helpers. | BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-002, ERRPATH-007 |
| MAP-012 | rn-e-mobilebrowser/src/services/authStorageService.ts | readAuthSnapshot | Reuse login/storage-config storage for pin/settings/login guards. | STOR-001, STOR-002, STATE-001, STATE-006, SEC-001 |
| MAP-013 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | route state params | Keep `url`/`returnUrl`/`scanResult` in route state only, not persistent storage. | STOR-003, SEC-002 |
| MAP-014 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebView | Reuse `react-native-webview` and no-cache headers. | API-001, API-002, DEP-002, DEP-005 |
| MAP-015 | N/A | N/A | Exclude standalone remote navigation API; login/settings checks remain dependency outcomes. | API-003 |
| MAP-016 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | root route state | Adapt root navigator transitions for login/settings/PIN. | STATE-001, STATE-002, STATE-006, STATE-007 |
| MAP-017 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx; rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebView route URL state | Add Login success -> WebView(url) transition. | STATE-003, STATE-008, STOR-003 |
| MAP-018 | rn-e-mobilebrowser/src/services/navigationAuthGuard.ts; WebViewScreen/BarcodeScannerScreen | auth guard | Add valid-login guard reset for WebView/scanner. | STATE-004, STATE-010, SEC-001 |
| MAP-019 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx; rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | barcode loop | Add WebView barcode branch and Barcode -> WebView return. | STATE-005, STATE-009, BEH-008, BEH-021 |
| MAP-020 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebView route | Use one WebView route with URL param. | BEH-003, BEH-004, BEH-014, STOR-003 |
| MAP-021 | rn-e-mobilebrowser/src/services/cameraPermissionService.ts; WebViewScreen/AppNavigator | requestBarcodeScannerPermission | Add Android camera permission check and denied fallback to return URL. | BEH-008, BEH-021, ERRPATH-006, SEC-003 |
| MAP-022 | LoginScreen/WebViewScreen/QRCodeScannerScreen/BarcodeScannerScreen/PinGateScreen | BackHandler | Add screen-specific Android back handling. | BEH-016, BEH-024, BEH-027 |
| MAP-023 | rn-e-mobilebrowser/src/screens/LicenseScreen.tsx | LicenseScreen | Add Android-only license route shell for parity. | BEH-015, NAV-014 |
| MAP-024 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | typed custom root navigator | Adapt existing custom route state; no stack package added. | DEP-007, RN-FILE-001, RN-FILE-002 |
| MAP-025 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | react-native-webview | Reuse installed dependency. | DEP-002, DEP-005, RN-FILE-001 |
| MAP-026 | BarcodeScannerScreen/QRCodeScannerScreen | scanner input handoff | Do not add camera/scanner dependency in Phase 3; screens expose route handoff seam. | DEP-003, DEP-006, RN-FILE-001 |
| MAP-027 | package dependency | jest/jest-expo | Reuse installed Jest harness; no Phase-3 RN tests added. | RN-FILE-001 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| @react-navigation/native | Present, not newly wired | Existing package is present, but no stack package is installed; Phase 3 uses the existing typed `AppNavigator` route state to avoid adding dependencies. | MAP-024 |
| react-native-webview | Reuse | Existing package provides WebView route parity. | MAP-025 |
| React Native BackHandler/AppState/PermissionsAndroid | Reuse | Built-in APIs cover Android back, foreground/auth guard and camera permission branch. | MAP-021, MAP-022 |
| Camera/scanner library | Not added | No scanner package exists; adding native camera dependency is deferred. Scanner route handoff is implemented. | MAP-026 |
| Jest/jest-expo | Reuse | Existing harness for later Phase 4 tests. | MAP-027 |
