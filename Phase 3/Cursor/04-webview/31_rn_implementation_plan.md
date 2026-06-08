# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_3/31_rn_implementation_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T16:30:00+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | src/screens/WebViewScreen.tsx | WebViewScreen | Adapt | EP-002..EP-011, BEH-002..BEH-031, UI-001, UI-004..UI-006 |
| MAP-002 | src/navigation/types.ts, AppNavigator.tsx | WebView route `{ url }` | Reuse | EP-001, EP-007, BEH-001, BEH-014, NAV-001, NAV-006 |
| MAP-003 | src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Reuse | EP-006, EP-011, BEH-013, BEH-031, NAV-005, NAV-009 |
| MAP-004 | src/services/webViewRouteClassifier.ts | classifyWebViewUrl | Reuse | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-020, BEH-025..BEH-027 |
| MAP-005 | src/services/webViewReturnUrlService.ts | toBarcodeReturnUrl, buildScanResultUrl | Reuse | BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008 |
| MAP-006 | src/services/webViewSessionService.ts | handleSessionExpired, logoutFromWebView, ensureValidLogin | Add | BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, SEC-002 |
| MAP-007 | src/utils/serverErrorMapper.ts | mapServerError | Add | BEH-021, BEH-025, ERRPATH-005..ERRPATH-007 |
| MAP-008 | src/services/authStorageService.ts | getValidLoginFlag, setValidLoginFlag | Reuse | STOR-001, STOR-003, SEC-002 |
| MAP-009 | src/services/storageConfigStorage.ts, loginUrlService.ts | buildLoginUrlFromPreferences | Reuse | STOR-002, STOR-004 |
| MAP-010 | src/navigation/types.ts | WebView/BarcodeScanner params | Reuse | STOR-005, SEC-001 |
| MAP-011 | src/constants/webView.constants.ts, WebViewScreen | WEBVIEW_NO_CACHE_HEADERS, source.headers | Add | API-001, API-003, BEH-004, BEH-017 |
| MAP-012 | src/constants/webView.constants.ts, WebViewScreen | WEBVIEW_INJECTED_LOGIN_FORM_CHECK, onMessage | Adapt | API-002, API-004, BEH-010, BEH-022 |
| MAP-013 | N/A | Remote login/settings APIs | Excluded | API-005 |
| MAP-014 | src/hooks/useWebViewRouteParams.ts | useWebViewRouteParams | Add | STATE-001, STATE-002, STATE-006, STATE-007, STOR-005 |
| MAP-015 | src/hooks/useWebViewLoadingState.ts | useWebViewLoadingState | Add | STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027 |
| MAP-016 | src/hooks/useWebViewSessionGuard.ts | useWebViewSessionGuard | Add | STATE-005, STATE-010, SEC-002, BEH-004, BEH-029 |
| MAP-017 | useWebViewRouteParams + WebViewScreen | Android-like empty URL → Login | Adapt | BEH-002, BEH-015, STATE-002, STATE-006 |
| MAP-018 | src/constants/webView.constants.ts, WebViewScreen | javaScriptEnabled, domStorageEnabled, userAgent | Add | BEH-016, SEC-005 |
| MAP-019 | WebViewScreen onError/onHttpError | Platform-specific error UX | Add | BEH-007, BEH-021, ERRPATH-002, ERRPATH-005, ERRPATH-006 |
| MAP-020 | webViewRouteClassifier + WebViewScreen | Single classifier + permission branch | Reuse | BEH-008, BEH-020, BEH-023, BEH-024, SEC-004 |
| MAP-021 | src/utils/storageConfigValidation.ts | protocolAllowsSslBypass | Partial | BEH-019, ERRPATH-009, SEC-003 |
| MAP-022 | useWebViewSessionGuard → useWebViewBackHandler | Android back no-op | Reuse | BEH-030 |
| MAP-023 | package.json | react-native-webview | Reuse | DEP-001, DEP-004, DEP-007 |
| MAP-024 | package.json | @react-navigation/native | Reuse | DEP-003, DEP-008 |
| MAP-025 | package.json | jest/jest-expo | Reuse | DEP-008 |
| MAP-026 | expo-camera | useCameraPermissions in WebViewScreen | Reuse | DEP-006, SEC-004 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| react-native-webview | Reuse | WebViewScreen core component | MAP-023 |
| @react-navigation/native-stack | Reuse | Route params and reset to Login | MAP-024 |
| expo-camera | Reuse | Barcode permission branch from navigation Phase 3 | MAP-026 |
| jest/jest-expo | Reuse | Phase 4 unit/screen tests | MAP-025 |

## Platform Decisions

| Mapping ID | Decision | Reason |
|---|---|---|
| MAP-017 | Android-like empty URL fallback to Login | Single RN screen; explicit reset matches Android BEH-015 |
| MAP-018 | Android-compatible WebView props (JS, DOM storage, iOS UA, no-cache headers) | BEH-016/BEH-017 parity |
| MAP-019 | Android: mapped error dialog + Login reset; iOS: hide loader only (BEH-007) | Preserve legacy divergence |
| MAP-021 | EXCLUDED proceed: react-native-webview 13.x cancels SSL without JS proceed API; helper `protocolAllowsSslBypass` documents intent | SEC-003 / ERR-P2-01 follow-up via native patch if required |

## Implementierungsreihenfolge

1. Webview-specific services and utils (classifier re-export, return URL, session, serverErrorMapper, constants)
2. Webview hooks (route params, loading state, session guard)
3. Refactor WebViewScreen to use hooks; add loading UI, headers, WebView settings, error handlers, foreground reload
4. Static validation (tsc, jest)
5. Phase-3 artifacts and run_metadata
