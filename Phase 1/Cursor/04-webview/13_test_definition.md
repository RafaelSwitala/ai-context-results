# Test Definition

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Integration | iOS, Android | High | Initial URL load |
| BEH-002 | UI | iOS, Android | Medium | Loading indicators |
| BEH-003 | Integration | iOS | High | barcodescanner intercept timing (decidePolicy) |
| BEH-004 | Integration | Android | High | barcodescanner in onPageFinished |
| BEH-005 | Integration | iOS, Android | High | JS session expiry detection |
| BEH-006 | Integration | iOS | High | login URL dismiss |
| BEH-007 | Integration | Android | High | login URL redirect |
| BEH-008 | Integration | iOS, Android | High | Toolbar logout |
| BEH-009 | Integration | Android | High | Error dialog path |
| BEH-010 | Integration | Android | Medium | SSL proceed policy |
| BEH-011 | Integration | iOS | Medium | Foreground relaunch guard |
| BEH-012 | Unit | Android | Low | WebSettings configuration |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | Cross | WebView loads initial login URL | gültige URL in property/Intent | view load | WebView.load/loadUrl mit no-cache Policy aufgerufen | BEH-001, EP-001, EP-002, STOR-001, STOR-002 |
| LT-002 | Cross | Loading indicator shown and hidden | navigation start und finish | load cycle | Indicator sichtbar dann hidden, isLoading toggled | BEH-002, STATE-001, STATE-002, UI-003 |
| LT-003 | iOS | Barcodescanner URL cancels navigation and opens scanner | URL starts with barcodescanner | decidePolicyFor | policy cancel + ARTICLE_SCANNER segue | BEH-003, NAV-001 |
| LT-004 | Android | Barcodescanner URL opens scanner from onPageFinished | finished URL barcodescanner | onPageFinished | BarcodeScannerActivity mit return URL gestartet | BEH-004, NAV-003 |
| LT-005 | Cross | Form action login.aspx invalidates session | JS returns form action mit login | didFinish/onPageFinished | hasValidLogin=false + Login route | BEH-005, STATE-003, NAV-002, NAV-004 |
| LT-006 | iOS | Login URL in navigation dismisses webview | URL contains login.aspx | decidePolicyFor | dismiss called, navigation cancelled | BEH-006, NAV-005 |
| LT-007 | Android | Login URL navigates to LoginActivity | URL contains LOGIN | onPageFinished | saveValidLogin false + start Login + finish | BEH-007, NAV-004 |
| LT-008 | iOS | Logout from toolbar resets session and navigates | authenticated session | Abmelden action | saveValidLogin false + doDeleteUser + BACK_TO_LOGIN | BEH-008, API-002, NAV-002 |
| LT-009 | Android | Logout menu calls App.logout and finishes | Webview toolbar logout | menu click | logout invoked + activity finish | BEH-008, API-003, UI-002 |
| LT-010 | Android | WebView error shows dialog and routes to login | simulated onReceivedError | error callback | loadData cleared + dialog -> Login | BEH-009, ERRPATH-002 |
| LT-011 | Android | SSL error proceeds only for insecure protocol setting | isHttpsWithoutValidation=true | onReceivedSslError | handler.proceed called | BEH-010, SEC-002 |
| LT-012 | iOS | Foreground without valid login routes to login | hasValidLogin=false | willEnterForeground | BACK_TO_LOGIN segue, kein reload | BEH-011, EP-003 |
| LT-013 | Android | Empty URL at onCreate routes to login | Intent URL empty | onCreate | LoginActivity started, showWebView skipped | ERRPATH-005, NAV-004 |
| LT-014 | Android | Camera denied shows dialog and reloads return URL | no CAMERA permission | barcode URL finished | dialog shown, loadUrl(returnUrl) | ERRPATH-004 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-015 | iOS | Load error hides indicator without user dialog | didFail navigation | webViewLoadFinishedWithError, no alert | ERRPATH-001 |
| LT-016 | Android | ERROR query in URL shows server error dialog | URL mit error=-N | showErrorDialog mit code substring | ERRPATH-003 |
| LT-017 | Android | WebView hidden for about:blank during special URLs | about:blank in URL | setVisibility GONE | STATE-004, UI-004 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| URL interception | BEH-003, BEH-004, BEH-006, BEH-007 | 100% branches | Kernintegration mit Scanner/Login |
| Session lifecycle | BEH-005, BEH-008, BEH-011, STATE-003 | alle Pfade | Sicherheitskritisch |
| Error handling | ERRPATH-001..ERRPATH-005, BEH-009 | Android voll, iOS dokumentiert | Unterschiedliche UX bewusst festhalten |
| WebView config | BEH-012, SEC-003 | Settings assertions | Parität mit Legacy-Web-App-Anforderungen |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| API-001 | Echter HTTP-Page-Load braucht WebView-Runtime/Integration | WebView mock mit assert auf load-URL und headers |
| API-002, API-003 | Logout-API integration | Mock PeApiHelper/RequestUtils und assert call conditions |
