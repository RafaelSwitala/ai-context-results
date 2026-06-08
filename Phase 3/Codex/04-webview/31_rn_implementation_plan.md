# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_3/31_rn_implementation_plan.md |
| Status | COMPLETED |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:59:29+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebViewScreen | Adapt existing screen for URL param, no-cache WebView source, loading, toolbar, session callbacks, error mapping and WebView capabilities. | EP-002..EP-005, EP-008..EP-010, BEH-002..BEH-007, BEH-016..BEH-030, UI-001, UI-006 |
| MAP-002 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | WebView route params | Reuse route-state URL handoff from login/navigation phases. | EP-001, EP-007, BEH-001, BEH-014, NAV-001, NAV-006 |
| MAP-003 | rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Reuse/adapt barcode handoff route for return URL and ScanResult. | EP-006, EP-011, BEH-013, BEH-031, NAV-005, NAV-009 |
| MAP-004 | rn-e-mobilebrowser/src/services/webViewRouteClassifier.ts | classifyWebViewUrl | Add WebView-specific facade over pure URL classifier. | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-009, BEH-020, BEH-025, BEH-026, BEH-027 |
| MAP-005 | rn-e-mobilebrowser/src/services/webViewReturnUrlService.ts | toBarcodeReturnUrl/buildScanResultUrl | Add WebView-specific facade over scanner return URL helpers. | BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008 |
| MAP-006 | rn-e-mobilebrowser/src/services/webViewSessionService.ts | ensureValidLogin/handleSessionExpired/logoutFromWebView | Add WebView session facade over auth guard/session service. | BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, STOR-003, SEC-002 |
| MAP-007 | rn-e-mobilebrowser/src/utils/serverErrorMapper.ts | mapServerError | Add simple server/WebView error mapper and use it in WebView errors. | BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007 |
| MAP-008 | rn-e-mobilebrowser/src/services/authStorageService.ts | setHasValidLogin/readAuthSnapshot | Reuse existing valid-login storage contract. | STOR-001, STOR-003, SEC-002 |
| MAP-009 | rn-e-mobilebrowser/src/services/loginUrlService.ts; storage services | buildLoginUrlFromPreferences/loadStorageConfig | Reuse adjacent login/settings storage and URL builders. | STOR-002, STOR-004 |
| MAP-010 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | WebView route state | Keep sensitive URLs in route state only; WebView toolbar does not display full URL. | STOR-005, SEC-001 |
| MAP-011 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebView source headers | Reuse `react-native-webview` source with no-cache headers. | API-001, API-003, BEH-004, BEH-017 |
| MAP-012 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | injectedJavaScript/onMessage | Add first-form action detection for login/session expiry. | API-002, API-004, BEH-010, BEH-022 |
| MAP-013 | N/A | N/A | Exclude WebView-owned REST client. | API-005 |
| MAP-014 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | WebView URL route param | Reuse WebView URL route state for initial URL and scanner return update. | STATE-001, STATE-002, STATE-006, STATE-007, STOR-005 |
| MAP-015 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | loading state | Add loading state through WebView load callbacks. | STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027 |
| MAP-016 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx; webViewSessionService | session guard | Add invalid-login/login-form/logout/error reset to Login. | STATE-005, STATE-010, SEC-002 |
| MAP-017 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | empty URL decision | Use Android-like explicit Login fallback for empty URL. | BEH-002, BEH-015, STATE-002, STATE-006 |
| MAP-018 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebView props | Add Android-compatible JavaScript, DOM storage, multi-window JS and iOS-like user agent. | BEH-016, SEC-005 |
| MAP-019 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx; serverErrorMapper | error UX | Choose Android-like error mapping/return-to-login in RN; document iOS divergence. | BEH-007, BEH-021, ERRPATH-002, ERRPATH-005, ERRPATH-006 |
| MAP-020 | rn-e-mobilebrowser/src/services/webViewRouteClassifier.ts; AppNavigator | barcode branch | Reuse classifier and Android permission fallback before Barcode route. | BEH-008, BEH-020, BEH-023, BEH-024, ERRPATH-008, SEC-004 |
| MAP-021 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | SSL decision | Exclude Android SSL-bypass because `react-native-webview` JS API does not expose equivalent cert proceed callback. | BEH-019, ERRPATH-009, SEC-003 |
| MAP-022 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | BackHandler | Implement Android WebView back no-op. | BEH-030 |
| MAP-023 | package dependency | react-native-webview | Reuse installed dependency. | DEP-001, DEP-004, DEP-007, RN-FILE-001 |
| MAP-024 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | route state | Reuse existing custom navigator route params; no new navigation dependency. | DEP-003, DEP-008, RN-FILE-001 |
| MAP-025 | package dependency | jest/jest-expo | Reuse installed harness for Phase 4. | DEP-008, RN-FILE-001 |
| MAP-026 | rn-e-mobilebrowser/src/services/cameraPermissionService.ts; BarcodeScannerScreen | scanner permission/handoff | Reuse RN permission API; no camera scanner package added. | DEP-006, SEC-004 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| react-native-webview | Reuse | Already installed; provides WebViewScreen runtime. | MAP-023 |
| React Native BackHandler/AppState/PermissionsAndroid | Reuse | Built-in back, foreground guard and camera permission APIs. | MAP-020, MAP-022, MAP-026 |
| @react-navigation/native | Present, not newly wired | Existing custom AppNavigator route state carries WebView params without adding stack package. | MAP-024 |
| Camera/scanner package | Not added | Physical scanner implementation belongs to scanner integration; WebView owns return URL contract only. | MAP-026 |
| Jest/jest-expo | Reuse | Present for Phase 4 tests; no Phase-3 tests created. | MAP-025 |
