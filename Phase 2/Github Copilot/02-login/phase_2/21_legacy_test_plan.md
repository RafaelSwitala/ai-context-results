# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_2/ |
| Status | READY_FOR_REVIEW |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-04T01:45:00Z |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Empty username or password field. | `LoginButtonTouchUp` is called. | Correct error message is shown and no request is made, no state update. | EP-001, BEH-001, ERRPATH-001, ERRPATH-002 | P0 |
| LT-002 | Android | `hasValidSettings=false` or username empty. | Login button is pressed. | Generic error dialog appears and no navigation to WebView. | EP-002, BEH-002, ERRPATH-004 | P0 |
| LT-003 | iOS | Valid settings + credentials + HTTP 200 without errorCode. | Login is executed. | `saveLoginPreferences` is called, `saveValidLoginPreference(true)` is set, segue to WEBVIEW occurs. | BEH-003, STATE-001, NAV-001, STOR-001, STOR-002, STOR-003 | P0 |
| LT-004 | Android | Valid settings + credentials. | Login button is pressed. | Encoded password is saved, `hasValidLogin=true`, WebviewActivity starts. | BEH-004, STATE-002, NAV-002, STOR-006, STOR-007, STOR-008 | P0 |
| LT-005 | Cross | `hasValidSettings=false` with varying PIN. | Login screen initializes or settings button is tapped. | Route to PIN if PIN is set, else route to Settings. | BEH-005, NAV-003, NAV-004 | P0 |
| LT-006 | Cross | Stored PIN is 1234. | PIN entry 1234 or different value. | On match, Settings access is allowed; on mismatch, error is shown and PIN resets. | BEH-006, NAV-005, ERRPATH-005 | P0 |
| LT-007 | Cross | `hasValidLogin=true`. | App goes to background. | `hasValidLogin=false` is saved. | BEH-007, STATE-003, STATE-004 | P1 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs | Priority |
|---|---|---|---|---|---|
| EC-001 | iOS/Android | Username with spaces. | Accepted and passed to URL encoding. | BEH-005, API-001, API-004 | P1 |
| EC-002 | iOS/Android | Password with special characters (!, @, #, $). | Accepted and properly encoded in URL. | BEH-005 | P1 |
| EC-003 | iOS/Android | Username 1 character long. | Accepted (non-empty validation passes). | BEH-002, BEH-003 | P1 |
| EC-004 | iOS/Android | Password 100+ characters long. | Accepted and URL encoded. | BEH-005 | P1 |
| EC-005 | iOS/Android | Rapid login attempts (spam button). | Only one HTTP request in flight; spinner prevents multiples. | BEH-006 | P1 |
| EC-006 | iOS/Android | Network timeout during login. | Timeout handled by HTTP library; error state reached. | BEH-006, ERRPATH-005 | P1 |
| EC-007 | iOS/Android | Server returns malformed response (not HTTP 200 or known error). | Treated as error; generic error dialog shown. | BEH-007 | P1 |
| EC-008 | iOS/Android | Error code in query param is blank string. | Not treated as error; login success assumed. | BEH-008 | P1 |
| EC-009 | iOS | PIN code with leading zero (e.g., "0123"). | Accepted as valid 4-digit code. | BEH-012 | P1 |
| EC-010 | Android | Password contains newline or tab characters. | Base64 encoding handles correctly; stored and decoded correctly. | BEH-013, BEH-018 | P1 |
| EC-011 | iOS/Android | User clears both fields and taps login. | Empty validation triggers; error shown. | BEH-002, BEH-003 | P1 |
| EC-012 | iOS/Android | Server responds with HTTP 500. | Non-200 status; generic error shown. | ERRPATH-005 | P1 |
| EC-013 | iOS/Android | `buildLoginUrl()` receives null/empty server. | Returns nil/invalid; error handling triggered. | ERRPATH-004 | P1 |
| EC-014 | iOS | Spinner is nil/not loaded. | `showSpinner()` may fail silently; login still proceeds. | BEH-006 | P2 |
| EC-015 | Android | `PreferencesUtils.getLoginPreferences()` returns null. | NPE if not handled; should validate. | BEH-013, BEH-017 | P1 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| iOS | XCTest (if available) | HTTP mock (Alamofire or URLSession), UserDefaults stub, Navigation mock | iOS test infrastructure status unknown; may require setup. |
| Android | JUnit 4 + Mockito | HTTP mock, SharedPreferences mock, AppState listener mock | Existing Android test structure; dependencies available. |
