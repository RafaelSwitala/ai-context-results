# Feature Analysis

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T18:24:31+02:00 |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | webview | prompt; [ai-context: features/feature-list.md:4 symbol=webview] |
| User feature name | webview | prompt |
| In scope | Native WebView screen/container, URL handoff from login and barcode scanner, WebView load settings, no-cache behavior, loading indicator state, URL interception for barcode/login/error pages, session-expiry detection, toolbar logout/close actions, WebView error dialogs and security-sensitive URL/certificate/camera branches. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:22 symbol=webView]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:105 symbol=showWebView] |
| Out of scope | Login validation, settings validation, QR scanner setup, barcode recognition internals and license HTML rendering, except where these supply or receive WebView URLs. | [ios: MobileBrowserV2/Source/LoginViewController.swift:176 symbol=prepare]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:77 symbol=handleCode] |
| Open blockers | No Phase-1 blocker; RN has `react-native-webview` available but currently renders only `PlaceholderScreen`. | [rn: package.json:24 symbol=react-native-webview]; [rn: App.tsx:3 symbol=App] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | WebView, WKWebView, WebsiteViewController, WebsiteWrapperViewController, navigationDelegate, decidePolicyFor, didFinish, didFail, barcodescanner, login.aspx, BACK_TO_LOGIN, ARTICLE_SCANNER, ScanResult, reloadIgnoringLocalCacheData | 9 | 7 | iOS uses a WebsiteWrapper container that instantiates a storyboard `WebView` controller; the WebView uses WKNavigationDelegate callbacks for barcode and login/session handling. [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:39 symbol=showWebview]; [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor] |
| Android | WebviewActivity, WebViewClient, WebChromeClient, loadUrl, no-cache, onReceivedSslError, shouldOverrideUrlLoading, onPageFinished, evaluateJavascript, error=-, barcodescanner, Login.aspx, App.URL, progressBar, menu_toolbar | 15 | 10 | Android WebviewActivity owns WebView settings, URL source selection, permission-gated barcode routing, error dialogs, toolbar logout/close and disabled back navigation. [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:73 symbol=onCreate]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:308 symbol=initToolbars] |
| RN | react-native-webview, @react-navigation/native, PlaceholderScreen, jest | 3 | 2 | RN dependencies already include `react-native-webview`, navigation and Jest, but no WebView screen exists. [rn: package.json:16 symbol=@react-navigation/native]; [rn: package.json:24 symbol=react-native-webview]; [rn: App.tsx:1 symbol=PlaceholderScreen] |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | WebsiteViewController | Main WebView behavior: WKWebView delegate, load/reload, toolbar logout, barcode/login handling and loading state. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:12 symbol=WebsiteViewController] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/WebsiteWrapperViewController.swift | WebsiteWrapperViewController | WebView container that creates WebsiteViewController and forwards URL. | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:39 symbol=showWebview] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/LoginViewController.swift | prepare(for:) | Supplies login URL to WebsiteWrapper on WEBVIEW segue. | [ios: MobileBrowserV2/Source/LoginViewController.swift:168 symbol=prepare] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/ArticleScannerViewController.swift | prepare(for:) | Returns barcode scan result URL back to WebsiteWrapper. | [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:142 symbol=prepare] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Base.lproj/Main.storyboard | WebView scene | Declares WKWebView, toolbar, ArticleScanner segue and Back-to-Login unwind. | [ios: MobileBrowserV2/Source/Base.lproj/Main.storyboard:457 symbol=WebsiteViewController] |
| IOS-FILE-006 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | AppSettings | Defines WebView route constants: barcode scheme, error token, scan result, login token and about:blank. | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:21 symbol=AppSettings] |
| IOS-FILE-007 | iOS | MobileBrowserV2/Source/Utils/UrlUtils.swift | buildLoginUrlFromPreferences | Rebuilds login URL used as WebView input. | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:140 symbol=buildLoginUrlFromPreferences] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | WebviewActivity | Main Android WebView behavior: WebView settings, URL source, callbacks, errors, toolbar and back behavior. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:34 symbol=WebviewActivity] |
| AND-FILE-002 | Android | app/src/main/res/layout/activity_webview.xml | activity_webview | Declares WebView, progress bar and bottom toolbar. | [android: app/src/main/res/layout/activity_webview.xml:17 symbol=webView] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | login.onClick | Starts WebviewActivity with App.URL after successful login. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:137 symbol=login.onClick] |
| AND-FILE-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java | BarcodeScannerActivity | Returns original or ScanResult URL to WebviewActivity and guards invalid login. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:22 symbol=onCreate] |
| AND-FILE-005 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | App constants/logout | Defines URL constants, iOS user agent and logout side effects used by WebView. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:31 symbol=URL] |
| AND-FILE-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | buildLoginUrlFromPreferences/buildLoginUrl | Rebuilds login URL when WebviewActivity starts without intent URL. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:222 symbol=buildLoginUrl] |
| AND-FILE-007 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/MiscUtils.java | getServerError | Maps WebView HTTP/resource/server errors to user messages. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/MiscUtils.java:9 symbol=getServerError] |
| AND-FILE-008 | Android | app/src/main/res/menu/menu.xml | WebView toolbar menu | Defines logout and close-app toolbar actions. | [android: app/src/main/res/menu/menu.xml:7 symbol=action_logged_out] |
| AND-FILE-009 | Android | app/src/main/AndroidManifest.xml | WebviewActivity declaration | Declares WebviewActivity parent, theme, orientation and config changes. | [android: app/src/main/AndroidManifest.xml:128 symbol=WebviewActivity] |
| AND-FILE-010 | Android | app/src/main/res/values/strings.xml | strings | Defines error and toolbar labels used in WebView dialogs/menu. | [android: app/src/main/res/values/strings.xml:34 symbol=username_not_found] |
| RN-FILE-001 | RN | package.json | dependencies/scripts | Existing WebView, navigation and test dependencies. | [rn: package.json:10 symbol=test]; [rn: package.json:24 symbol=react-native-webview] |
| RN-FILE-002 | RN | App.tsx | App | Current RN app renders PlaceholderScreen and has no WebView implementation. | [rn: App.tsx:1 symbol=PlaceholderScreen] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | WebView screen and web-content loading | In | Both platforms have a dedicated WebView screen with explicit native WebView load behavior. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:92 symbol=webView.load]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:129 symbol=webView.loadUrl] |
| BOUND-002 | WebView URL source and return payload | In | WebView receives login URL from login and receives scanner return URLs. | [ios: MobileBrowserV2/Source/LoginViewController.swift:176 symbol=prepare]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/BarcodeScannerActivity.java:87 symbol=handleCode] |
| BOUND-003 | Barcode scanner route trigger | In | WebView detects barcode scheme and routes to scanner; scanner recognition internals stay out. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| BOUND-004 | Session-expiry/login-page detection | In | WebView detects login form/login URL and clears/returns login state. | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:251 symbol=didFinish]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:217 symbol=onPageFinished] |
| BOUND-005 | Login URL construction details | Dependency | WebView consumes built URLs; full login URL contract is owned by login feature. | [ios: MobileBrowserV2/Source/Utils/UrlUtils.swift:140 symbol=buildLoginUrlFromPreferences]; [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:222 symbol=buildLoginUrl] |
| BOUND-006 | License WebView | Out | LicenseActivity uses a WebView for static HTML, but it is not the post-login app WebView. | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:35 symbol=webView] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| WebView host | WebsiteWrapper creates WebsiteViewController child by storyboard identifier `WebView`. | WebviewActivity directly owns the Android WebView. | Different container shape. | RN should implement one WebViewScreen route and treat the iOS wrapper as a transport detail. |
| Initial URL | WebsiteViewController loads non-empty `url` property passed from wrapper. | WebviewActivity uses `App.URL` extra or rebuilds URL from preferences; empty URL starts LoginActivity. | Different fallback. | RN must define URL-required route and an explicit empty-URL Login fallback. |
| Cache policy | iOS uses `reloadIgnoringLocalCacheData`. | Android sets `LOAD_NO_CACHE` and passes `Pragma`/`Cache-Control` headers. | Similar intent, different APIs. | RN WebView should pass no-cache headers where possible and document cache gaps. |
| Web settings | iOS storyboard uses WKWebView defaults. | Android enables JavaScript, DOM storage, multiple windows, zoom, hardware layer and iOS user agent. | Different. | RN must decide which Android settings map to WebView props and document unmapped native settings. |
| Barcode scheme | iOS handles barcode scheme in `decidePolicyFor` and opens ArticleScanner. | Android suppresses load in `shouldOverrideUrlLoading`, then processes barcode in `onPageFinished` with camera permission branch. | Different trigger timing and permission branch. | RN should test URL classification and permission handling separately. |
| Error handling | iOS hides loader on didFail without user dialog. | Android clears WebView content and shows mapped error dialog, OK starts Login. | Different. | RN must preserve or explicitly choose error UX per platform. |
| Back behavior | iOS has no WebView hardware back override. | Android `onBackPressed` returns without action. | Different. | RN Android BackHandler must block WebView back if parity is required. |
