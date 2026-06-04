# Migration Mapping

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T18:24:31+02:00 |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-002, EP-003, EP-004, EP-005, EP-008, EP-009, EP-010, BEH-002, BEH-003, BEH-004, BEH-005, BEH-006, BEH-007, BEH-016, BEH-017, BEH-018, BEH-019, BEH-020, BEH-021, BEH-022, BEH-023, BEH-024, BEH-025, BEH-026, BEH-027, BEH-028, BEH-029, BEH-030, UI-001, UI-006 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebViewScreen | Add | Main RN screen using `react-native-webview`, route URL param, loading UI, toolbar/menu and callback handlers. |
| MAP-002 | EP-001, EP-007, BEH-001, BEH-014, NAV-001, NAV-006 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | WebView route params | Add/Adapt | Login feature passes URL into WebView route; WebView feature defines route param shape. |
| MAP-003 | EP-006, EP-011, BEH-013, BEH-031, NAV-005, NAV-009 | rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add/Adapt | Scanner implementation is dependency; WebView owns return URL contract. |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-004 | IOS-FILE-006, AND-FILE-005, BEH-008, BEH-009, BEH-020, BEH-025, BEH-026, BEH-027 | rn-e-mobilebrowser/src/services/webViewRouteClassifier.ts | classifyWebViewUrl | Add | Pure classifier for barcode/login/error/about-blank/normal URL outcomes. |
| MAP-005 | BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008 | rn-e-mobilebrowser/src/services/webViewReturnUrlService.ts | toBarcodeReturnUrl/buildScanResultUrl | Add | Converts barcode scheme to return URL and appends `ScanResult`. |
| MAP-006 | BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, STOR-003, SEC-002 | rn-e-mobilebrowser/src/services/webViewSessionService.ts | handleSessionExpired/logoutFromWebView/ensureValidLogin | Add/Adapt | Clears valid login and resets/navigates to Login. |
| MAP-007 | BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007 | rn-e-mobilebrowser/src/utils/serverErrorMapper.ts | mapServerError | Add/Reuse | Can reuse login error mapping if implemented there. |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-008 | STOR-001, STOR-003, SEC-002 | Existing auth/login storage | hasValidLogin | No | WebView reads/clears explicit valid-login flag. |
| MAP-009 | STOR-002, STOR-004 | Existing login/settings storage | server, client, user, password, protocol | Password yes | WebView consumes URL builders from login/settings features; do not duplicate storage. |
| MAP-010 | STOR-005, SEC-001 | React Navigation route params | url, returnUrl | URL may contain credentials | Route payload only; never log full URL. |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-011 | API-001, API-003, BEH-004, BEH-017 | WebViewScreen | WebView source uri with no-cache headers | Use `react-native-webview` source prop and headers where supported. |
| MAP-012 | API-002, API-004, BEH-010, BEH-022 | WebViewScreen injected/evaluate JS handler | Read first form action | RN WebView needs an equivalent event/injected JavaScript path for session-expiry detection. |
| MAP-013 | API-005 | N/A | N/A | Remote login/settings/session APIs remain adjacent feature dependencies. |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-014 | STATE-001, STATE-002, STATE-006, STATE-007, STOR-005 | useWebViewRouteParams | URL route param. | Missing/empty URL -> Login fallback; scanner return updates URL. |
| MAP-015 | STATE-003, STATE-004, STATE-008, STATE-009, BEH-005, BEH-006, BEH-018, BEH-027 | useWebViewLoadingState | loading false. | start -> loading true; finish/fail/pause -> loading false; visibility branch from URL classification. |
| MAP-016 | STATE-005, STATE-010, SEC-002 | useWebViewSessionGuard | authenticated WebView. | logout/session expiry/error/invalid resume -> Login/reset. |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-017 | BEH-002, BEH-015, STATE-002, STATE-006 | Wrapper embeds WebsiteViewController; empty WebView URL silently does not load. | WebviewActivity owns WebView; empty URL starts LoginActivity. | Use single RN WebViewScreen; implement Android-like explicit empty-URL fallback or document iOS divergence. | Empty URL handling is user-visible on Android. |
| MAP-018 | BEH-016, SEC-005 | WKWebView defaults are used in storyboard. | Android explicitly enables JavaScript, DOM storage, zoom, multiple windows and iOS user agent. | RN props must intentionally choose Android-compatible WebView capabilities and document unmapped props. | Server web app behavior may depend on these settings. |
| MAP-019 | BEH-007, BEH-021, ERRPATH-002, ERRPATH-005, ERRPATH-006 | iOS load failure only hides loader. | Android shows mapped dialog and returns to Login. | Preserve platform-specific error UX or pick one in Phase 3 decision log. | Error UX differs materially. |
| MAP-020 | BEH-008, BEH-020, BEH-023, BEH-024, ERRPATH-008, SEC-004 | Barcode handled in policy decision; no permission branch found. | Barcode processing happens on page finish and checks camera permission. | RN classifier should process barcode URLs once and include permission branch. | Prevents duplicate scanner opens and permission regressions. |
| MAP-021 | BEH-019, ERRPATH-009, SEC-003 | No SSL-bypass WebView branch found. | HTTPS-without-validation proceeds on SSL error. | Support only if RN/native layer permits it; otherwise block with explicit error and document. | Security-sensitive divergence. |
| MAP-022 | BEH-030 | No WebView hardware back override found. | WebView back press is a no-op. | Android RN BackHandler should no-op on WebView route if preserving parity. | Back behavior is visible and testable. |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-023 | react-native-webview | Reuse | Present in RN dependencies for WebViewScreen. | DEP-001, DEP-004, DEP-007, RN-FILE-001 |
| MAP-024 | @react-navigation/native | Reuse | Present in RN dependencies for WebView route params and resets. | DEP-003, DEP-008, RN-FILE-001 |
| MAP-025 | Jest/jest-expo | Reuse | Present for classifier, service, hook and screen tests. | DEP-008, RN-FILE-001 |
| MAP-026 | Camera/scanner permission package | Add if scanner feature has not added one | Needed for barcode route permission branch. | DEP-006, SEC-004 |
