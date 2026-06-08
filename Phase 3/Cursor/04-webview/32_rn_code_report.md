# RN Code Report

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P3 |
| Artifact ID | P3-A32 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_3/32_rn_code_report.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T16:30:00+02:00 |

## Changed Files

| Path | Purpose | Source IDs |
|---|---|---|
| rn-e-mobilebrowser/src/services/webViewRouteClassifier.ts | Re-export URL classifier from navigation service | MAP-004 |
| rn-e-mobilebrowser/src/services/webViewReturnUrlService.ts | Barcode return URL + ScanResult builder | MAP-005 |
| rn-e-mobilebrowser/src/services/webViewSessionService.ts | Session expiry and logout wrappers | MAP-006 |
| rn-e-mobilebrowser/src/utils/serverErrorMapper.ts | MiscUtils-compatible error messages | MAP-007 |
| rn-e-mobilebrowser/src/constants/webView.constants.ts | No-cache headers, iOS UA, injected JS | MAP-011, MAP-012, MAP-018 |
| rn-e-mobilebrowser/src/hooks/useWebViewRouteParams.ts | Route URL resolve and empty fallback | MAP-014, MAP-017 |
| rn-e-mobilebrowser/src/hooks/useWebViewLoadingState.ts | Loading indicator and visibility state | MAP-015 |
| rn-e-mobilebrowser/src/hooks/useWebViewSessionGuard.ts | Auth guard, back no-op, foreground reload | MAP-016, MAP-022 |
| rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | Full WebView feature screen | MAP-001, MAP-019, MAP-020 |
| rn-e-mobilebrowser/src/utils/storageConfigValidation.ts | protocolAllowsSslBypass helper | MAP-021 |

## Created Symbols

| Symbol | File | Role |
|---|---|---|
| toBarcodeReturnUrl | webViewReturnUrlService.ts | barcodescanner:// → http(s) return URL |
| mapServerError | serverErrorMapper.ts | User-facing server/HTTP error text |
| handleSessionExpired | webViewSessionService.ts | Clear login on session expiry |
| useWebViewRouteParams | useWebViewRouteParams.ts | Resolve intent URL vs stored login URL |
| useWebViewLoadingState | useWebViewLoadingState.ts | Progress bar + hide WebView for special URLs |
| useWebViewSessionGuard | useWebViewSessionGuard.ts | Invalid-login exit + iOS foreground reload |
| WEBVIEW_NO_CACHE_HEADERS | webView.constants.ts | Pragma/Cache-Control no-cache |
| protocolAllowsSslBypass | storageConfigValidation.ts | Protocol 2 detection (SSL policy helper) |

## Commands

| Command | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | PASS | No TypeScript errors |
| `npm test -- --passWithNoTests` | PASS | RN tests deferred to Phase 4 |
| `npm run lint` | N/A | No lint script in package.json |
| `npx expo export` | NOT_RUN | Not required for Phase 3 validation |

## Issues

| Error ID | Description | Resolution | Status |
|---|---|---|---|
| — | `onReceivedSslError` not in react-native-webview TS/native JS API | Document MAP-021 EXCLUDED; SSL errors surface via onError on Android | OPEN (native patch optional) |
| — | WebView logic partially implemented in navigation Phase 3 | webview Phase 3 adds dedicated layer + loading/error/foreground parity | RESOLVED |
