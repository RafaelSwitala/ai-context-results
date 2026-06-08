# Migration Mapping

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, BEH-001, UI-001..UI-004 | src/screens/webview/WebViewScreen.tsx | `WebViewScreen` | Add | Hauptscreen mit WebView, Toolbar, Loading |
| MAP-002 | BEH-003, BEH-004, NAV-001, NAV-003 | src/features/webview/urlInterceptHandler.ts | `handleWebViewUrl` | Add | Zentralisiert barcodescanner/login/error URLs |
| MAP-003 | BEH-005, SEC-003 | src/features/webview/sessionProbe.ts | `probeSessionFromDom` | Add | Injiziertes JS für form-action Check |
| MAP-004 | UI-001, UI-002, BEH-008 | src/features/webview/WebViewToolbar.tsx | `WebViewToolbar` | Adapt | Logout/Close Actions |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-005 | BEH-001, STOR-001, STOR-002 | src/services/webviewLoadService.ts | `getInitialWebViewUrl` | Adapt | URL aus Login-State |
| MAP-006 | BEH-008, API-002, API-003 | src/services/sessionService.ts | `logoutFromWebView` | Reuse | Bereits aus login-Feature |
| MAP-007 | BEH-010, SEC-002 | src/services/webviewTlsPolicy.ts | `shouldAllowInsecureSsl` | Adapt | Android insecure protocol parity |
| MAP-008 | BEH-012 | src/services/webviewConfig.ts | `getWebViewProps` | Add | JS, cache, UA, zoom settings |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-009 | STOR-001, STOR-002, STOR-004 | In-memory route param | `webview.currentUrl` | Yes | Keine persistente URL-Speicherung |
| MAP-010 | STOR-003 | Auth state | `auth.hasValidLogin` | No | Session gate für reload/resume |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|---|
| MAP-011 | API-001 | react-native-webview load | implicit GET page | Haupt-App-Load |
| MAP-012 | API-002, API-003 | sessionService | license/session cleanup on logout | Best-effort vor Login-Route |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-013 | STATE-001, STATE-002 | `useWebViewLoadState` | isLoading=false | true on start, false on end/error |
| MAP-014 | STATE-003, BEH-011 | `useWebViewSessionState` | hasValidLogin from auth | false on expiry/logout/foreground guard |
| MAP-015 | STATE-004 | `useWebViewVisibility` | visible=true | hidden bei transitional URLs (Android parity optional) |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-016 | BEH-003, BEH-004 | intercept in decidePolicyFor (before load) | handle in onPageFinished (after load) | Adapt: unified handler mit timing flag | Gleiches Ergebnis, unterschiedlicher Zeitpunkt |
| MAP-017 | BEH-006, BEH-007 | dismiss on login URL | startActivity Login + finish | Adapt: navigate to Login screen | Einheitliche RN-Route |
| MAP-018 | ERRPATH-001, BEH-009 | load errors ohne Dialog | Error dialog -> Login | Adapt: mindestens Toast/Dialog auf beiden Plattformen | UX-Härtung optional |
| MAP-019 | BEH-012, DEP-003 | WKWebView defaults | spoofed iOS User-Agent | Adapt: configurable userAgent prop | Legacy server compatibility |
| MAP-020 | SEC-002, BEH-010 | kein SSL bypass im iOS WebView code | proceed on SslError wenn insecure | Adapt: `onReceivedSslError` handler in RN WebView | Security policy explizit |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-021 | `react-native-webview` | Add | WKWebView/WebView Ersatz | DEP-001, DEP-003 |
| MAP-022 | `@react-navigation/native` | Reuse | Leave WebView route on logout/session expiry | NAV-002, NAV-004 |
| MAP-023 | Auth/session services from login feature | Reuse | hasValidLogin + logout API | STOR-003, API-002, API-003 |
