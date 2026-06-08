# RN Mapping Status

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_3/33_rn_mapping_status.md |
| Status | COMPLETED_WITH_PARTIALS |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:59:29+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | WebViewScreen | `WebViewScreen.tsx` contains WebView, toolbar, loading, error, lifecycle/auth and callback handling. | Typecheck PASS. |
| MAP-002 | IMPLEMENTED | AppNavigator | Login success passes URL route state into WebView. | Reused login/navigation work. |
| MAP-003 | PARTIAL | BarcodeScannerScreen | Return URL and ScanResult handoff implemented. | Physical scanner dependency absent. |
| MAP-004 | IMPLEMENTED | webViewRouteClassifier | WebView classifier facade added. | Pure service ready for Phase 4 tests. |
| MAP-005 | IMPLEMENTED | webViewReturnUrlService | Return URL and ScanResult facade added. | Reuses scanner navigation service. |
| MAP-006 | IMPLEMENTED | webViewSessionService | Ensure/session expired/logout facade added. | Reuses auth guard/session service. |
| MAP-007 | IMPLEMENTED | serverErrorMapper | Server/WebView error mapping added and used in WebView errors. | Typecheck PASS. |
| MAP-008 | IMPLEMENTED | auth storage | Valid-login read/clear reused. | No duplicate storage. |
| MAP-009 | IMPLEMENTED | login/settings services | URL builder and storage dependencies reused. | No duplicate storage. |
| MAP-010 | IMPLEMENTED | route state | URLs kept in route/component state; toolbar avoids full URL display. | Sensitive URL handling. |
| MAP-011 | IMPLEMENTED | WebViewScreen | No-cache WebView source headers added. | Typecheck PASS. |
| MAP-012 | IMPLEMENTED | WebViewScreen | First-form action detection added via injected JS and `onMessage`. | Session expiry resets login. |
| MAP-013 | EXCLUDED | N/A | No WebView-owned REST client implemented. | Adjacent feature dependency. |
| MAP-014 | IMPLEMENTED | AppNavigator | URL route state handles initial and scanner-return URLs. | Typecheck PASS. |
| MAP-015 | IMPLEMENTED | WebViewScreen | Loading state uses `onLoadStart` and `onLoadEnd`. | Typecheck PASS. |
| MAP-016 | IMPLEMENTED | WebViewScreen/webViewSessionService | Logout, session expiry and invalid auth reset to Login. | Typecheck PASS. |
| MAP-017 | IMPLEMENTED | WebViewScreen/AppNavigator | Empty/missing URL falls back to Login by classifier/navigator behavior. | Android-like decision. |
| MAP-018 | IMPLEMENTED | WebViewScreen | JavaScript, DOM storage, multi-window JS and iOS-like user agent set. | Some native Android settings have no RN prop. |
| MAP-019 | IMPLEMENTED | WebViewScreen/serverErrorMapper | RN uses Android-like mapped error and return-to-login behavior. | iOS no-dialog divergence documented. |
| MAP-020 | IMPLEMENTED | classifier/AppNavigator | Barcode branch includes permission fallback and single scanner handoff. | Physical scanner absent. |
| MAP-021 | EXCLUDED | WebView SSL handling | HTTPS-without-validation cert proceed is not implemented. | Security-sensitive unsupported RN API. |
| MAP-022 | IMPLEMENTED | WebViewScreen | Android BackHandler returns true/no-op. | Typecheck PASS. |
| MAP-023 | IMPLEMENTED | react-native-webview | Installed dependency imported by WebViewScreen. | Reused. |
| MAP-024 | PARTIAL | AppNavigator | Custom typed route state used instead of React Navigation stack. | No stack package installed. |
| MAP-025 | IMPLEMENTED | Jest/jest-expo | Existing Jest harness loads. | 0 tests in Phase 3. |
| MAP-026 | PARTIAL | cameraPermissionService/BarcodeScannerScreen | Permission branch and handoff implemented. | No scanner package. |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| `MAP-003`, `MAP-026` | Physical barcode scanner is not implemented because no RN scanner package exists. | Blocks full scanner/WebView device parity, not pure route tests. | Add scanner dependency and wire decoded barcode into `BarcodeScannerScreen`. |
| `MAP-021` | Android SSL-bypass protocol is not supported in RN WebView implementation. | Blocks HTTPS-without-validation parity. | Decide whether to add native WebView customization or reject this legacy mode in Phase 5. |
| `MAP-024` | App uses custom route state instead of React Navigation stack. | Does not block WebView behavior tests, but differs from preferred dependency mapping. | Add stack/native-stack package if project standardizes on React Navigation containers. |
