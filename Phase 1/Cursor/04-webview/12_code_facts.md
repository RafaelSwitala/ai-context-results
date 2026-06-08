# Code Facts

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | WebsiteWrapperViewController.swift | `viewDidLoad` / `showWebview` | Nach Login-Segue mit gesetzter `url` | [ios: MobileBrowserV2/Source/WebsiteWrapperViewController.swift:30 symbol=showWebview] |
| EP-002 | Android | WebviewActivity.java | `onCreate` / `showWebView` | Activity-Start mit `App.URL` Intent extra | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:74 symbol=onCreate] |
| EP-003 | iOS | WebsiteViewController.swift | `applicationWillEnterForeground` | App kehrt aus Background zurück | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:142 symbol=applicationWillEnterForeground] |
| EP-004 | Android | WebviewActivity.java | `onResume` | Activity wird wieder sichtbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:348 symbol=onResume] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | Cross | Lädt initiale Prestige-URL in WebView | login URL string | HTTP(S) page load gestartet | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:92 symbol=load] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:129 symbol=loadUrl] |
| BEH-002 | Cross | Zeigt Ladeindikator während Page-Load | navigation start event | Progress HUD / ProgressBar sichtbar | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:201 symbol=didStartProvisionalNavigation] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:137 symbol=onPageStarted] |
| BEH-003 | iOS | Interceptiert barcodescanner-URL und startet Scanner-Flow | URL prefix `barcodescanner` | Navigation cancel + ARTICLE_SCANNER segue | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:225 symbol=decidePolicyFor] |
| BEH-004 | Android | Erkennt barcodescanner-URL in onPageFinished und öffnet Scanner | finished URL | startActivity BarcodeScanner mit return URL | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:231 symbol=onPageFinished] |
| BEH-005 | Cross | Erkennt Session-Ablauf via Form-Action JS | `document.forms[0].action` | `hasValidLogin=false` + Redirect Login | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:253 symbol=didFinish] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:220 symbol=evaluateJavascript] |
| BEH-006 | iOS | Login-URL in Navigation cancelt WebView und dismissed Container | URL contains `login.aspx` | dismiss animated | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:237 symbol=decidePolicyFor] |
| BEH-007 | Android | Login-URL in onPageFinished navigiert zu LoginActivity | URL contains LOGIN | invalidate login + startActivity Login + finish | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:262 symbol=onPageFinished] |
| BEH-008 | Cross | Toolbar-Logout beendet Web-Session | user tap logout | flag reset + optional server cleanup + leave webview | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:42 symbol=barButtonTouched] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:318 symbol=onMenuItemClick] |
| BEH-009 | Android | Bei WebView-Fehler wird Seite geleert und Error-Dialog gezeigt | HTTP/resource error | loadData null + dialog -> Login | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:199 symbol=onReceivedError] |
| BEH-010 | Android | SSL-Fehler werden bei insecure protocol ignoriert | SslError + protocol setting | handler.proceed() | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:145 symbol=onReceivedSslError] |
| BEH-011 | iOS | Bei Foreground ohne valid login wird zu Login navigiert | hasValidLogin=false | BACK_TO_LOGIN segue | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:145 symbol=applicationWillEnterForeground] |
| BEH-012 | Android | WebView-Konfiguration aktiviert JS, Zoom, DOM Storage, iOS-UA | WebSettings | konfigurierte WebView-Instanz | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:111 symbol=setJavaScriptEnabled] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | Cross | page loading | didStart/onPageStarted | isLoading=true, indicator visible | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:195 symbol=isLoading] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:139 symbol=loaded] |
| STATE-002 | Cross | page loading | didFinish/onPageFinished | isLoading=false, indicator hidden | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:288 symbol=webViewLoadFinished] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:282 symbol=onPageFinished] |
| STATE-003 | Cross | authenticated session | session expiry detected | hasValidLogin=false | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:254 symbol=saveValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:263 symbol=saveValidLoginPreference] |
| STATE-004 | Android | webview visible | barcode/login/about:blank URL | webView GONE | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:273 symbol=setVisibility] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | `WebsiteViewController.url` property | W (von Wrapper), R (load) | String URL | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:54 symbol=url] |
| STOR-002 | Android | Intent extra `App.URL` | R | String URL | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:90 symbol=getIntent] |
| STOR-003 | Cross | `hasValidLogin` preference | R/W | Bool session gate | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:145 symbol=hasValidLoginPreference] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:351 symbol=hasValidLoginPreference] |
| STOR-004 | Android | `currentUrl` field | R/W | String in-memory | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:47 symbol=currentUrl] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | Cross | GET (implicit) | WebView page load | Prestige Default.aspx URL | HTML/JS Web-App | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:92 symbol=load] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:129 symbol=loadUrl] |
| API-002 | iOS | REST via PeApi | `PeApiHelper.doDeleteUser` | User licenses lookup + delete | completion callback vor Login-Navigation | [ios: MobileBrowserV2/Source/PeServices/PeApiHelper.swift:13 symbol=doDeleteUser] |
| API-003 | Android | REST via RequestUtils | `App.logout` -> `killUserSessions` | token + user wenn gesetzt | best-effort session cleanup | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:128 symbol=killUserSessions] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | WebsiteViewController | ArticleScannerViewController | barcodescanner URL intercepted | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:233 symbol=performSegue] |
| NAV-002 | iOS | WebsiteViewController | Login (unwind) | session expired / logout / foreground invalid login | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:256 symbol=performSegue] |
| NAV-003 | Android | WebviewActivity | BarcodeScannerActivity | barcodescanner URL + camera permission | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:237 symbol=startActivity] |
| NAV-004 | Android | WebviewActivity | LoginActivity | empty URL, login URL, errors, logout | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:97 symbol=onCreate] |
| NAV-005 | iOS | WebsiteViewController | dismiss parent | login.aspx in decidePolicyFor | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:239 symbol=dismiss] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | WKWebView load fail | `webViewLoadFinishedWithError` (kein Dialog) | Indicator hidden, keine explizite User-Meldung | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:266 symbol=didFail] |
| ERRPATH-002 | Android | HTTP error / resource error | clear webview + `showErrorDialog` | Dialog OK -> LoginActivity | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:192 symbol=onReceivedHttpError] |
| ERRPATH-003 | Android | URL contains ERROR query | extract error code + dialog | User zu Login geleitet | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:255 symbol=onPageFinished] |
| ERRPATH-004 | Android | Camera permission missing for barcode URL | Alert + reload returnUrl | Scanner nicht gestartet | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:247 symbol=onPageFinished] |
| ERRPATH-005 | Android | Empty URL at start | start LoginActivity | WebView nicht angezeigt | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:96 symbol=onCreate] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | WebKit (`WKWebView`) | Rendering und Navigation Delegate | react-native-webview | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:22 symbol=webView] |
| DEP-002 | iOS | MBProgressHUD | Loading overlay | RN ActivityIndicator overlay | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:201 symbol=MBProgressHUD] |
| DEP-003 | Android | `android.webkit.WebView` + WebViewClient | Rendering und callbacks | react-native-webview | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:135 symbol=setWebViewClient] |
| DEP-004 | Cross | `PreferencesUtils` / `AppSettings` constants | URL patterns und session flags | RN config + auth service | [ios: MobileBrowserV2/Source/Utils/AppSettings.swift:23 symbol=BARCODESCANNER] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:34 symbol=LOGIN] |
| DEP-005 | iOS | PeApiHelper | Logout license cleanup | RN API service | [ios: MobileBrowserV2/Source/PeServices/PeApiHelper.swift:13 symbol=doDeleteUser] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Toolbar bar button | ActionSheet mit Abmelden/Abbrechen | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:38 symbol=actionSheet] |
| UI-002 | Android | Bottom toolbar menu | Close app (`finishAffinity`) oder Logout (`finish`) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:314 symbol=onMenuItemClick] |
| UI-003 | Android | ProgressBar overlay | Sichtbar während Load, hidden on finish | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:133 symbol=progressBar1] |
| UI-004 | Cross | WebView visibility | Android toggelt GONE bei speziellen URLs | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:273 symbol=setVisibility] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | Cross | Login URL mit Credentials in Query | URL wird an WebView übergeben | RN: keine Logs; Secure handling der initialen URL | [ios: MobileBrowserV2/Source/WebsiteViewController.swift:92 symbol=load] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:129 symbol=loadUrl] |
| SEC-002 | Android | SSL certificate errors | proceed bei `HTTPS_WITHOUT_VALIDATION` | RN: explizite insecure-TLS-Option dokumentieren | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:145 symbol=onReceivedSslError] |
| SEC-003 | Cross | JavaScript execution enabled | JS für Session-Check und Web-App erforderlich | RN: `javaScriptEnabled` + injiziertes Session-Script | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebviewActivity.java:111 symbol=setJavaScriptEnabled] [ios: MobileBrowserV2/Source/WebsiteViewController.swift:251 symbol=evaluateJavaScript] |
