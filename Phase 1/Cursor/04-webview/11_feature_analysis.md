# Feature Analysis

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/11_feature_analysis.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | webview | prompt |
| User feature name | webview | prompt |
| In scope | Laden der Prestige-Web-App nach Login, WKWebView/WebView-Konfiguration, URL-Interception (barcodescanner/login), Session-Erkennung per JS, Ladeindikatoren, Toolbar Logout/Close, SSL-/Fehlerbehandlung | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:92 symbol=load] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:129 symbol=loadUrl] |
| Out of scope | Statische Lizenz-WebView (`LicenseActivity`), Scanner-Implementierung selbst, Login-Formular-UI | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:37 symbol=loadDataWithBaseURL] [ios: MobileBrowserV2/Source/ArticleScannerViewController.swift:38 symbol=startCapture] |
| Open blockers | Keine fachlichen Blocker in Phase 1 | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:208 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:213 symbol=onPageFinished] |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---:|---:|---|
| iOS | WKWebView, webview, navigationDelegate, decidePolicy, evaluateJavaScript, MBProgressHUD | 5 | 3 | Hauptlogik in `WebsiteViewController`, Container in `WebsiteWrapperViewController` |
| Android | WebView, WebViewClient, loadUrl, onPageFinished, SslError, evaluateJavascript | 8 | 2 | Hauptlogik in `WebviewActivity`; Layout `activity_webview.xml` |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | MobileBrowserV2/Source/WebsiteViewController.swift | `WKNavigationDelegate` | Kern-WebView: Laden, Interception, Session-Check, Logout | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:186 symbol=WKNavigationDelegate] |
| IOS-FILE-002 | iOS | MobileBrowserV2/Source/WebsiteWrapperViewController.swift | `showWebview` | Übergibt Login-URL an Child-WebView | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:42 symbol=showWebview] |
| IOS-FILE-003 | iOS | MobileBrowserV2/Source/Utils/AppSettings.swift | URL-Konstanten | barcodescanner/login/error/scan_result Semantik | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:23 symbol=BARCODESCANNER] |
| IOS-FILE-004 | iOS | MobileBrowserV2/Source/PeServices/PeApiHelper.swift | `doDeleteUser` | Server-Session-Cleanup beim WebView-Logout | [ios: MobileBrowserV2/Source/PeServices/PeApiHelper.swift:13 symbol=doDeleteUser] |
| IOS-FILE-005 | iOS | MobileBrowserV2/Source/Extensions/UIViewControllerExtensions.swift | `ackAddChildView` | Einbettung der WebView in Wrapper | [ios: MobileBrowserV2/Source/Extensions/UIViewControllerExtensions.swift:14 symbol=ackAddChildView] |
| AND-FILE-001 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java | `showWebView` / WebViewClient | Kern-WebView: Settings, Clients, Fehler, Toolbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:105 symbol=showWebView] |
| AND-FILE-002 | Android | app/src/main/res/layout/activity_webview.xml | WebView + ProgressBar + Toolbar | UI-Struktur des WebView-Screens | [android: app/src/main/res/layout/activity_webview.xml:17 symbol=webView] |
| AND-FILE-003 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | Konstanten + `logout` | URL-Pfade, User-Agent, Logout aus Toolbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:32 symbol=BARCODESCANNER] |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| FB-001 | Initial URL aus Login (Intent/Segue) | In | WebView startet mit authentifizierter App-URL | [ios: MobileBrowserV2/Source/LoginViewController.swift:176 symbol=prepare] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:90 symbol=getIntent] |
| FB-002 | URL-Scheme-Interception (barcodescanner, login.aspx) | In | Steuert Scanner-Start und Session-Ende | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| FB-003 | JS-Form-Action Session-Expiry Check | In | Erkennt abgelaufene Session nach Page-Load | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:251 symbol=evaluateJavaScript] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:218 symbol=evaluateJavascript] |
| FB-004 | WebView Toolbar (Logout/Close) | In | Nutzerinitiiertes Beenden der Web-Session | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:41 symbol=barButtonTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:318 symbol=onMenuItemClick] |
| FB-005 | License HTML WebView | Out | Separater statischer Inhalt, nicht Prestige-App | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:37 symbol=loadDataWithBaseURL] |
| FB-006 | Navigation zu Scanner/Login Activities | Out (Konsument) | Gehört zum Feature navigation; WebView triggert nur | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:233 symbol=performSegue] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:237 symbol=startActivity] |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| WebView-Engine | `WKWebView` | `android.webkit.WebView` | Different (Impl), Same (Rolle) | RN: `react-native-webview` |
| Initial Load Policy | `reloadIgnoringLocalCacheData`, 30s timeout | `LOAD_NO_CACHE` + no-cache HTTP headers | Same intent | RN sollte No-Cache-Ladestrategie beibehalten |
| Barcode URL Handling | `decidePolicyFor` cancel + Segue | `onPageFinished` + startActivity Scanner | Different timing | RN `onShouldStartLoadWithRequest` + zentraler Handler |
| Login/session URL | dismiss (iOS) vs startActivity+finish (Android) | Different UX | RN einheitlicher redirect zu Login |
| SSL Validation | Standard WK (kein custom bypass im WebView-Code) | `onReceivedSslError` proceed bei insecure protocol | Different | RN TLS-Policy an Settings koppeln |
| User-Agent | WK default | Spoofed iOS UA string | Different | RN UA-String explizit setzen falls benötigt |
