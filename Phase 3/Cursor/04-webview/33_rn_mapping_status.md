# RN Mapping Status

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_3/33_rn_mapping_status.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T16:30:00+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | WebViewScreen | src/screens/WebViewScreen.tsx | Loading UI, toolbar, lifecycle, URL callbacks |
| MAP-002 | IMPLEMENTED | WebView route params | navigation/types.ts, AppNavigator.tsx | Reused from login/navigation |
| MAP-003 | IMPLEMENTED | BarcodeScannerScreen | src/screens/BarcodeScannerScreen.tsx | Scanner handoff from navigation Phase 3 |
| MAP-004 | IMPLEMENTED | webViewRouteClassifier.ts | Re-exports webViewNavigationService | Pure classifier unchanged |
| MAP-005 | IMPLEMENTED | webViewReturnUrlService.ts | toBarcodeReturnUrl, buildScanResultUrl | Wraps navigation scanner services |
| MAP-006 | IMPLEMENTED | webViewSessionService.ts | handleSessionExpired, logoutFromWebView, ensureValidLogin | Delegates to navigationAuthGuard |
| MAP-007 | IMPLEMENTED | serverErrorMapper.ts | mapServerError | Android MiscUtils parity |
| MAP-008 | IMPLEMENTED | authStorageService | getValidLoginFlag | Reused from login |
| MAP-009 | IMPLEMENTED | storageConfigStorage, loginUrlService | buildLoginUrlFromPreferences | No duplicate storage |
| MAP-010 | IMPLEMENTED | navigation types | url, returnUrl route params | Not persisted |
| MAP-011 | IMPLEMENTED | webView.constants.ts, WebViewScreen | source.headers + cacheEnabled=false | No-cache load parity |
| MAP-012 | IMPLEMENTED | WebViewScreen onMessage | Injected login.aspx form check | Session expiry detection |
| MAP-013 | EXCLUDED | N/A | Remote APIs owned by login/settings | API-005 |
| MAP-014 | IMPLEMENTED | useWebViewRouteParams | Resolves URL, empty → Login | Scanner return via setCurrentUrl |
| MAP-015 | IMPLEMENTED | useWebViewLoadingState | ActivityIndicator progress bar | Visibility from classifier |
| MAP-016 | IMPLEMENTED | useWebViewSessionGuard | Auth guard + foreground reload | BEH-004 iOS reload |
| MAP-017 | IMPLEMENTED | useWebViewRouteParams | shouldRouteToLoginOnEmptyUrl | Android-like fallback |
| MAP-018 | IMPLEMENTED | WebViewScreen props | javaScriptEnabled, domStorageEnabled, userAgent | Android WebSettings parity |
| MAP-019 | IMPLEMENTED | WebViewScreen onError/onHttpError | Android dialog; iOS silent finishLoading | MAP-019 decision applied |
| MAP-020 | IMPLEMENTED | WebViewScreen + classifier | Single processUrl path + camera permission | Reuses navigation flow |
| MAP-021 | EXCLUDED | protocolAllowsSslBypass | Helper only; no SSL proceed in RN WebView 13.x | Requires native module patch |
| MAP-022 | IMPLEMENTED | useWebViewSessionGuard | useWebViewBackHandler no-op when logged in | Android BEH-030 |
| MAP-023 | IMPLEMENTED | react-native-webview | package.json dependency | Reused |
| MAP-024 | IMPLEMENTED | @react-navigation/native | package.json dependency | Reused |
| MAP-025 | IMPLEMENTED | jest/jest-expo | jest.config.js | Phase 4 tests planned |
| MAP-026 | IMPLEMENTED | expo-camera | useCameraPermissions in WebViewScreen | Reused from navigation |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| MAP-021 | HTTPS-without-validation cannot proceed past SSL errors in react-native-webview | Ja (SEC-003 parity) | Native patch or config plugin; document in Phase 5 |
| MAP-013 | No WebView-owned REST client | Nein | Covered by login feature |
| GAP-ERROR-UX | iOS silent fail vs Android dialog | Nein | MAP-019 decision documented; Phase 4 platform tests |
