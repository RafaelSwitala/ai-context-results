# Code Facts

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T20:45:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | WebsiteViewController.swift | viewDidLoad() | Screen loads; WebView displayed | [ios: Source/WebsiteViewController.swift:override func viewDidLoad] |
| EP-002 | iOS | WebsiteViewController.swift | setTitleAndUrl() | URL set from segue parameter | [ios: Source/WebsiteViewController.swift:var url = ""] |
| EP-003 | Android | WebviewActivity.java | onCreate() | Activity created | [android: WebviewActivity.java:protected void onCreate] |
| EP-004 | Android | WebviewActivity.java | showWebView() | WebView initialized and shown | [android: WebviewActivity.java:private void showWebView()] |
| EP-005 | iOS | WebsiteViewController.swift | applicationWillEnterForeground() | App returns from background | [ios: Source/WebsiteViewController.swift:@objc private func applicationWillEnterForeground] |
| EP-006 | Android | LicenseActivity.java | onCreate() | License screen loads | [android: LicenseActivity.java:onCreate()] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Load URL with cache policy | URLRequest(url, cachePolicy: .reloadIgnoringLocalCacheData) | Page displayed; didStartProvisionalNavigation fires | [ios: Source/WebsiteViewController.swift:webView.load(URLRequest(url:] |
| BEH-002 | iOS | JavaScript evaluation | evaluateJavaScript("...form action...") | Form action returned; or error | [ios: Source/WebsiteViewController.swift:webView.evaluateJavaScript(...)] |
| BEH-003 | iOS | Detect barcode scanner URL | URL starts with AppSettings.BARCODESCANNER | Segue to scanner; webView URL intercepted | [ios: Source/WebsiteViewController.swift:if url.lowercased().starts(with: AppSettings.BARCODESCANNER)] |
| BEH-004 | iOS | Detect login redirect | URL contains AppSettings.LOGIN | dismiss() webView; redirect to login | [ios: Source/WebsiteViewController.swift:if url.lowercased().contains(AppSettings.LOGIN)] |
| BEH-005 | iOS | Stop loading on disappear | viewWillDisappear called | webView.stopLoading() | [ios: Source/WebsiteViewController.swift:override func viewWillDisappear] |
| BEH-006 | Android | Load URL with no-cache headers | loadUrl(currentUrl, noCacheHeaders) | Page displayed; onPageStarted fires | [android: WebviewActivity.java:webView.loadUrl(currentUrl, noCacheHeaders)] |
| BEH-007 | Android | Configure WebSettings | setJavaScriptEnabled, setCacheMode, setDomStorageEnabled, etc. | WebView settings applied before load | [android: WebviewActivity.java:WebSettings settings = webView.getSettings()] |
| BEH-008 | Android | Intercept URL loading | shouldOverrideUrlLoading() checks URL | Return true to intercept; false to allow load | [android: WebviewActivity.java:public boolean shouldOverrideUrlLoading] |
| BEH-009 | Android | Handle SSL errors | onReceivedSslError() checks isHttpsWithoutValidation | handler.proceed() or handler.cancel() | [android: WebviewActivity.java:public void onReceivedSslError] |
| BEH-010 | Android | Load HTML from assets | loadDataWithBaseURL("file:///android_asset/", html, ...) | License HTML displayed | [android: LicenseActivity.java:webView.loadDataWithBaseURL(...)] |
| BEH-011 | iOS | Stop loading indicator | Stop showing loading UI | HUD hidden; isNetworkActivityIndicatorVisible = false | [ios: Source/WebsiteViewController.swift:fileprivate func webViewLoadFinished()] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | App launches | WebsiteViewController displayed | viewDidLoad executes; setTitleAndUrl called | [ios: Source/WebsiteViewController.swift:override func viewDidLoad] |
| STATE-002 | iOS | URL available | setTitleAndUrl completion | webView.load() executes | [ios: Source/WebsiteViewController.swift:self.webView.load(URLRequest(url:] |
| STATE-003 | iOS | Load starts | didStartProvisionalNavigation | isLoading = true; MBProgressHUD shown | [ios: Source/WebsiteViewController.swift:func webView(_ webView: WKWebView, didStartProvisionalNavigation] |
| STATE-004 | iOS | Navigation intercepted | decidePolicyFor navigationAction | URL checked; allowed or cancelled based on rules | [ios: Source/WebsiteViewController.swift:func webView(_ webView: WKWebView, decidePolicyFor navigationAction] |
| STATE-005 | iOS | Load completes | didFinish navigation | HUD hidden; JavaScript evaluation for form action | [ios: Source/WebsiteViewController.swift:func webView(_ webView: WKWebView, didFinish navigation] |
| STATE-006 | iOS | Load fails | didFail or didFailProvisionalNavigation | webViewLoadFinishedWithError() called | [ios: Source/WebsiteViewController.swift:func webView(_ webView: WKWebView, didFail navigation] |
| STATE-007 | iOS | App backgrounded | viewWillDisappear | webView.stopLoading(); navigationDelegate = nil | [ios: Source/WebsiteViewController.swift:override func viewWillDisappear] |
| STATE-008 | iOS | App foreground | applicationWillEnterForeground | Check session; reload if valid | [ios: Source/WebsiteViewController.swift:@objc private func applicationWillEnterForeground] |
| STATE-009 | Android | WebviewActivity created | onCreate executes | currentUrl from Intent or PreferencesUtils | [android: WebviewActivity.java:currentUrl = getIntent().getStringExtra(App.URL)] |
| STATE-010 | Android | WebView configured | showWebView() | WebSettings applied; webView.loadUrl() called | [android: WebviewActivity.java:WebSettings settings = webView.getSettings()] |
| STATE-011 | Android | Page loading | onPageStarted | ProgressBar visible; LongOperation timer starts | [android: WebviewActivity.java:public void onPageStarted] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | PreferencesUtils.hasValidLoginPreference() | Read | Bool | [ios: Source/WebsiteViewController.swift:PreferencesUtils.hasValidLoginPreference()] |
| STOR-002 | iOS | PreferencesUtils.isHttps | Read | Bool | [ios: Source/WebsiteViewController.swift:let scheme = PreferencesUtils.isHttps ? "https://" : "http://"] |
| STOR-003 | Android | PreferencesUtils.buildLoginUrlFromPreferences() | Read | String (URL) | [android: WebviewActivity.java:currentUrl = PreferencesUtils.buildLoginUrlFromPreferences()] |
| STOR-004 | Android | App.IOS_USER_AGENT | Read | String | [android: WebviewActivity.java:settings.setUserAgentString(App.IOS_USER_AGENT)] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|
| API-001 | iOS | URLRequest with no-cache | https://<server>/Default.aspx?... | HTTP GET with cachePolicy | HTML page content | [ios: Source/WebsiteViewController.swift:URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData)] |
| API-002 | Android | loadUrl() | https://<server>/Default.aspx?... | HTTP GET with Pragma/Cache-Control headers | HTML page content | [android: WebviewActivity.java:webView.loadUrl(currentUrl, noCacheHeaders)] |
| API-003 | Android | loadDataWithBaseURL() | file:///android_asset/ | Local file load | HTML from assets | [android: LicenseActivity.java:webView.loadDataWithBaseURL("file:///android_asset/"...)] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | WebsiteViewController | BarcodeScannerViewController | URL contains BARCODESCANNER scheme | [ios: Source/WebsiteViewController.swift:performSegue(withIdentifier: "ARTICLE_SCANNER")] |
| NAV-002 | iOS | WebsiteViewController | LoginViewController | URL contains LOGIN; or session check fails | [ios: Source/WebsiteViewController.swift:performSegue(withIdentifier: "BACK_TO_LOGIN")] |
| NAV-003 | Android | WebviewActivity | BarcodeCaptureActivity | URL contains BARCODESCANNER scheme | [android: WebviewActivity.java:Intent to BarcodeCaptureActivity (commented code)] |
| NAV-004 | Android | WebviewActivity | LoginActivity | URL contains LOGIN or currentUrl empty | [android: WebviewActivity.java:Intent intent = new Intent(WebviewActivity.this, LoginActivity.class)] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | Session invalid on foreground | Check hasValidLoginPreference; performSegue BACK_TO_LOGIN | Redirect to login screen | [ios: Source/WebsiteViewController.swift:if !PreferencesUtils.hasValidLoginPreference()] |
| ERRPATH-002 | iOS | Load fails | didFail or didFailProvisionalNavigation callback | webViewLoadFinishedWithError(); HUD hidden | [ios: Source/WebsiteViewController.swift:func webView(_ webView: WKWebView, didFail navigation] |
| ERRPATH-003 | Android | HTTP error | onReceivedHttpError; show error dialog | User sees error code message | [android: WebviewActivity.java:public void onReceivedHttpError] |
| ERRPATH-004 | Android | SSL error with validation off | onReceivedSslError; handler.proceed() | Continue despite SSL error | [android: WebviewActivity.java:if (PreferencesUtils.getLoginPreferences().isHttpsWithoutValidation())] |
| ERRPATH-005 | iOS | Form action is login page | JavaScript evaluates form action; contains LOGIN | Redirect to login | [ios: Source/WebsiteViewController.swift:if (action.description.lowercased().contains(AppSettings.LOGIN))] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | WebKit.WKWebView | Modern web view component | React Native WebView | [ios: Source/WebsiteViewController.swift:import WebKit] |
| DEP-002 | iOS | MBProgressHUD | Loading indicator UI | React Native ActivityIndicator | [ios: Source/WebsiteViewController.swift:import MBProgressHUD] |
| DEP-003 | iOS | UINotificationCenter | App lifecycle notifications | React Native AppState | [ios: Source/WebsiteViewController.swift:NotificationCenter.default.addObserver] |
| DEP-004 | Android | android.webkit.WebView | Web view component | React Native WebView | [android: WebviewActivity.java:import android.webkit.WebView] |
| DEP-005 | Android | android.webkit.WebChromeClient | Chrome client for dialogs/progress | React Native WebView (built-in) | [android: WebviewActivity.java:import android.webkit.WebChromeClient] |
| DEP-006 | Android | android.webkit.WebViewClient | Client for navigation/errors | React Native WebView (built-in) | [android: WebviewActivity.java:import android.webkit.WebViewClient] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | MBProgressHUD | Show/hide loading indicator during page load | [ios: Source/WebsiteViewController.swift:MBProgressHUD.showAdded/hide] |
| UI-002 | iOS | UIApplication.isNetworkActivityIndicatorVisible | Animated spinner in status bar | [ios: Source/WebsiteViewController.swift:UIApplication.shared.isNetworkActivityIndicatorVisible] |
| UI-003 | iOS | UIToolbar + UIBarButtonItem | Logout button in toolbar | [ios: Source/WebsiteViewController.swift:@IBOutlet weak var toolbar: UIToolbar] |
| UI-004 | Android | ProgressBar | Indeterminate progress during page load | [android: WebviewActivity.java:progressBar.setVisibility(View.VISIBLE)] |
| UI-005 | Android | WebView (LAYER_TYPE_HARDWARE) | Hardware acceleration for rendering | [android: WebviewActivity.java:webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Session token in URL | Passed via URLRequest; cached/transmitted via HTTPS | RN must use HTTPS; no cache for session tokens | [ios: Source/WebsiteViewController.swift:URLRequest(url:, cachePolicy: .reloadIgnoringLocalCacheData)] |
| SEC-002 | Android | Session token in URL | Passed via loadUrl; no-cache headers added | RN must use HTTPS; validate SSL | [android: WebviewActivity.java:noCacheHeaders.put("Cache-Control", "no-cache")] |
| SEC-003 | iOS/Android | SSL validation bypass | isHttpsWithoutValidation flag allows self-signed certs | RN must inherit flag; ideally validate properly | [android: WebviewActivity.java:if (PreferencesUtils.getLoginPreferences().isHttpsWithoutValidation())] |
| SEC-004 | iOS | JavaScript evaluation | Limited scope; form action detection only | RN should restrict JS injection to trusted origins | [ios: Source/WebsiteViewController.swift:webView.evaluateJavaScript] |
