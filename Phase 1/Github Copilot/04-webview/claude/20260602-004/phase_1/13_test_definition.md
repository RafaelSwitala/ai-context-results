# Test Definition

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/webview/claude/20260602-004/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T20:50:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit | iOS | HIGH | URL loading with no-cache policy |
| BEH-002 | Unit | iOS | MEDIUM | JavaScript evaluation for form action detection |
| BEH-003 | Integration | iOS | HIGH | Barcode scanner URL interception |
| BEH-004 | Integration | iOS | HIGH | Login redirect URL interception |
| BEH-005 | Unit | iOS | MEDIUM | Stop loading on view disappear |
| BEH-006 | Unit | Android | HIGH | URL loading with no-cache headers |
| BEH-007 | Unit | Android | HIGH | WebSettings configuration |
| BEH-008 | Unit | Android | HIGH | URL interception (shouldOverrideUrlLoading) |
| BEH-009 | Unit | Android | MEDIUM | SSL error handling |
| BEH-010 | Unit | Android | MEDIUM | Load HTML from assets |
| BEH-011 | Unit | iOS/Android | HIGH | Loading indicator management |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Load URL with no-cache | WebsiteViewController displayed; URL provided | setTitleAndUrl completes | webView.load() called with .reloadIgnoringLocalCacheData | EP-002, BEH-001 |
| LT-002 | iOS | URL loading starts | webView.load() called | didStartProvisionalNavigation fires | isLoading = true; MBProgressHUD shown | EP-001, BEH-001, STATE-003 |
| LT-003 | iOS | JavaScript form action evaluation | Page loaded; form present | didFinish + evaluateJavaScript | Form action returned; or redirect if action is login | BEH-002, STATE-005, ERRPATH-005 |
| LT-004 | iOS | Detect and intercept barcode scanner URL | Page loads; URL with BARCODESCANNER scheme | decidePolicyFor navigationAction called | Segue to scanner; cancel navigation | BEH-003, NAV-001 |
| LT-005 | iOS | Detect and intercept login URL | Page loads; URL contains LOGIN | decidePolicyFor navigationAction called | dismiss(); cancel navigation | BEH-004, NAV-002 |
| LT-006 | iOS | Session check on foreground | App in background; valid session | applicationWillEnterForeground fires | Reload URL if session valid | EP-005, BEH-001, STATE-008, ERRPATH-001 |
| LT-007 | iOS | Force logout on invalid session | App in foreground; session invalid | applicationWillEnterForeground fires | Segue BACK_TO_LOGIN | EP-005, ERRPATH-001 |
| LT-008 | iOS | Load failure handling | Page fails to load | didFail or didFailProvisionalNavigation | HUD hidden; error state | BEH-011, STATE-006, ERRPATH-002 |
| LT-009 | iOS | Stop loading on disappear | WebView loading | viewWillDisappear called | webView.stopLoading(); navigationDelegate = nil | BEH-005, STATE-007 |
| LT-010 | Android | Configure WebView settings | WebviewActivity created | showWebView() executes | JavaScript enabled; cache mode NO_CACHE; DOM storage enabled | EP-004, BEH-007 |
| LT-011 | Android | Load URL with headers | currentUrl determined; headers prepared | showWebView calls webView.loadUrl() | Page loads with no-cache headers | EP-004, BEH-006, STATE-010 |
| LT-012 | Android | URL interception on barcode | Page loads; URL contains BARCODESCANNER | shouldOverrideUrlLoading checks | Return true; intercept; start BarcodeCaptureActivity | BEH-008, NAV-003 |
| LT-013 | Android | URL interception on login | Page loads; URL contains LOGIN | shouldOverrideUrlLoading checks | Return true; intercept; start LoginActivity | BEH-008, NAV-004 |
| LT-014 | Android | SSL error handling allow | SSL error received; isHttpsWithoutValidation = true | onReceivedSslError called | handler.proceed() called | BEH-009, SEC-003, ERRPATH-004 |
| LT-015 | Android | SSL error handling deny | SSL error received; isHttpsWithoutValidation = false | onReceivedSslError called | handler.cancel() called (or not proceed) | BEH-009 |
| LT-016 | Android | HTTP error dialog | HTTP error received (e.g., 500) | onReceivedHttpError called | Error dialog shown with status code | BEH-008, ERRPATH-003 |
| LT-017 | Android | Load HTML assets (License) | LicenseActivity created | showWebView calls loadDataWithBaseURL | License HTML displayed from assets | EP-006, BEH-010 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS | Invalid URL format | Load fails gracefully; error callback | BEH-001, ERRPATH-002 |
| EC-002 | iOS | Network timeout | didFail called; HUD hidden | BEH-001, ERRPATH-002 |
| EC-003 | iOS | Multiple rapid navigation actions | Second action queued; not duplicated | BEH-003, BEH-004 |
| EC-004 | iOS | evaluateJavaScript returns nil | No crash; default behavior | BEH-002 |
| EC-005 | iOS | Session check during load | Check deferred; load completes first | EP-005, STATE-008 |
| EC-006 | Android | currentUrl null from Intent | Use PreferencesUtils URL fallback | EP-003, STATE-009 |
| EC-007 | Android | currentUrl empty string | Intent to LoginActivity; no load | EP-003 |
| EC-008 | Android | shouldOverrideUrlLoading on relative URL | Allow load (not intercepted) | BEH-008 |
| EC-009 | Android | WebSettings.setCacheMode during load | Settings applied before load; respected | BEH-007 |
| EC-010 | iOS/Android | Quick background/foreground cycle | State preserved; no double load | STATE-008, STATE-011 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| URL Loading | BEH-001, BEH-006, API-001, API-002 | 100% | All URLs must load correctly |
| Navigation Interception | BEH-003, BEH-004, BEH-008, NAV-* | 100% | Barcode and login redirects are critical |
| Error Handling | ERRPATH-*, BEH-009 | 95%+ | Network and SSL errors must not crash app |
| State Management | STATE-*, EP-* | 90%+ | App state consistency across backgrounding |
| Loading UI | BEH-011, UI-* | 80%+ | User feedback during loading |
| Session Validation | EP-005, STATE-008, ERRPATH-001 | 90%+ | Security-critical foreground check |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| BEH-001 (actual rendering) | Requires UI testing; pixel-perfect rendering not testable in unit tests | Integration test or manual inspection |
| STATE-007 (navigation delegate cleanup) | Requires memory profiling; can verify with mock delegation | Verify navigationDelegate set to nil |
| EP-005 (background transition) | Requires system lifecycle; can only be tested via integration/manual | Manual background/foreground cycle |
| SEC-003 (SSL bypass) | Requires HTTPS mock server; can mock handler behavior | Mock SSL error + verify handler.proceed called |
