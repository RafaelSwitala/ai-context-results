# Migration Mapping

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T20:55:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-003, EP-004 | screens/WebviewScreen.tsx | WebviewScreen component | Replace WebsiteViewController + WebviewActivity with RN component | Single entry point for both platforms |
| MAP-002 | BEH-001, BEH-006, API-001, API-002 | components/WebView.tsx | WebViewWrapper component | Wrap react-native-webview; abstract iOS/Android differences | Use source prop with uri/html |
| MAP-003 | BEH-007 | hooks/useWebViewSettings.ts | Custom hook | Apply WebSettings equivalent via webView props | Set javaScriptEnabled, cacheMode, etc. |
| MAP-004 | BEH-011, UI-001, UI-002, UI-004 | components/WebViewLoader.tsx | Loading indicator component | ActivityIndicator replaces MBProgressHUD | Show/hide based on onLoadStart/onLoadEnd |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-003, BEH-004, BEH-008 | navigationService.ts | handleWebViewNavigation() | URL interception for barcode/login URLs | Custom onShouldStartLoadWithRequest handler |
| MAP-101 | EP-005, STATE-008, ERRPATH-001 | sessionService.ts | checkSessionOnForeground() | Session validation on app resume | AppState listener + navigate if invalid |
| MAP-102 | BEH-002 | WebViewService.ts | evaluateFormAction() | JavaScript evaluation for form action detection | injectJavaScript() bridge to native |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-200 | STOR-001, STOR-003 | AsyncStorage | auth/sessionUrl, auth/hasValidLogin | NO | Session state; may contain URL |
| MAP-201 | STOR-002, STOR-004 | Redux or Context | app/scheme, app/userAgent | NO | Configuration flags |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-002 | fetch() or axios | https://<server>/Default.aspx?... | Page URL; passed to WebView as source |
| MAP-301 | API-003 | fetch() from assets | file:///android_asset/ or app bundle | License HTML load (RN: require() inline or from assets) |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | STATE-001, STATE-009 | useState + useEffect | { url: null, loading: false, error: null } | On mount: load URL; on update: reload |
| MAP-401 | STATE-002, STATE-010 | useCallback | setUrl() triggers webView reload | Controlled via source prop |
| MAP-402 | STATE-003, STATE-011 | onLoadStart callback | { loading: true } | ActivityIndicator shown |
| MAP-403 | STATE-004, STATE-006 | onNavigationStateChange callback | Intercept URL; conditionally cancel | barcode/login URLs handled by navigation service |
| MAP-404 | STATE-005 | onLoadEnd callback | { loading: false } | ActivityIndicator hidden; evaluate form action |
| MAP-405 | STATE-007, STATE-008 | AppState listener | { focused: boolean } | On resume: check session; reload URL if needed |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-001, BEH-006 | URLRequest with cachePolicy | loadUrl() with Map<String, String> headers | RN WebView source prop; cacheMode: never | Both achieve no-cache |
| DIV-002 | BEH-003, BEH-004, BEH-008 | decidePolicyFor navigationAction + decisionHandler | shouldOverrideUrlLoading returns boolean | RN onShouldStartLoadWithRequest | Both intercept; RN unifies callback |
| DIV-003 | BEH-002 | evaluateJavaScript(code, callback) | Not explicitly shown but available | RN injectJavaScript() | RN-specific bridge |
| DIV-004 | BEH-007 | Implicit WKWebViewConfiguration | WebSettings object | RN WebView props | RN abstracts platform differences |
| DIV-005 | BEH-009 | Not shown; WKWebView handles SSL | onReceivedSslError + handler | RN URLSession SSL config (OS level) | RN inherits platform SSL handling |
| DIV-006 | UI-001, UI-002, UI-004 | MBProgressHUD + UIApplication indicator | ProgressBar | RN ActivityIndicator | RN cross-platform component |
| DIV-007 | STATE-008, EP-005 | NotificationCenter.willEnterForegroundNotification | App lifecycle callback | RN AppState | RN abstracts both |
| DIV-008 | BEH-005, STATE-007 | webView.navigationDelegate = nil | No explicit cleanup | RN cleanup via useEffect return | Component unmount handles cleanup |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | react-native-webview | REUSE | Core WebView component for both platforms | BEH-001, BEH-006, MAP-001, MAP-002 |
| MAP-DEP-002 | @react-native-async-storage/async-storage | REUSE | Session URL and state storage | MAP-200, STOR-* |
| MAP-DEP-003 | react-native AppState | REUSE | App lifecycle (background/foreground) | MAP-101, EP-005, STATE-008 |
| MAP-DEP-004 | react-native-screens or @react-navigation/native | REUSE | Navigation integration | MAP-100, MAP-101 |
| MAP-DEP-005 | fetch or axios | REUSE (built-in) | HTTP requests if needed for initial URL fetch | API-* |
