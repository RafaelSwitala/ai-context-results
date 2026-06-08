# Test Definition

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T17:00:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-002 | Unit | iOS/Android | HIGH | Empty username validation |
| BEH-003 | Unit | iOS/Android | HIGH | Empty password validation |
| BEH-004 | Unit | iOS/Android | HIGH | Settings validation before login |
| BEH-005 | Unit | iOS/Android | HIGH | Login URL construction with all parameters |
| BEH-006 | Integration | iOS/Android | MEDIUM | HTTP request (mocked) with proper headers |
| BEH-007 | Unit | iOS/Android | MEDIUM | Response status code parsing |
| BEH-008 | Unit | iOS/Android | MEDIUM | Error code extraction from query params |
| BEH-009 | Unit | iOS/Android | HIGH | Credential save to preferences |
| BEH-010 | Unit | iOS/Android | HIGH | Valid login flag set to true |
| BEH-012 | Unit | iOS/Android | HIGH | PIN validation correctness check |
| BEH-013 | Unit | Android | MEDIUM | Password Base64 encoding/decoding |
| BEH-015 | Unit | Android | MEDIUM | Language selection save |
| BEH-018 | Unit | Android | MEDIUM | Password encoding before save |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Test load saved credentials | User has saved username "alice" and password "pass123" | LoginViewController.viewWillAppear() | userName text field = "alice", password text field = "pass123" | BEH-001, STOR-001, STOR-002 |
| LT-002 | iOS | Test username empty validation | Username text field is empty | LoginButtonTouchUp() called | Error dialog shown with "usernameNotFound" message | BEH-002, ERRPATH-001 |
| LT-003 | iOS | Test password empty validation | Password text field is empty | LoginButtonTouchUp() called | Error dialog shown with "passwordNotFound" message | BEH-003, ERRPATH-002 |
| LT-004 | iOS | Test valid settings check | PreferencesUtils.hasValidSettingsPreference() = false | LoginButtonTouchUp() called | showGenericErrorDialog() called | BEH-004, ERRPATH-003 |
| LT-005 | iOS | Test login URL construction | Server="app.example.com", Client="client123", User="alice", Password="pass123", Protocol=https | buildLoginUrl() | URL="https://app.example.com/login?client=client123&user=alice&password=pass123" | BEH-005 |
| LT-006 | iOS | Test HTTP request success (200) | Valid URL, AF request returns status 200, no error code in query params | AF.request() callback | PreferencesUtils.saveLoginPreferences() called, segue to WEBVIEW | BEH-006, BEH-007, BEH-009, BEH-010, NAV-003 |
| LT-007 | iOS | Test HTTP request error non-200 | Valid URL, AF request returns status 401 | AF.request() callback | showGenericErrorDialog() called | BEH-007, ERRPATH-005 |
| LT-008 | iOS | Test error code in query params | Valid URL, status 200 but Error=PE-005 in query params | AF.request() callback | showPeErrorDialog(errorCode: "PE-005") called | BEH-008, ERRPATH-006 |
| LT-009 | iOS | Test login credentials saved | Successful login with user="bob", password="secret" | PreferencesUtils.saveLoginPreferences() | UserDefaults userName="bob", password="secret" | BEH-009, STOR-001, STOR-002 |
| LT-010 | iOS | Test PIN entered correctly | PIN stored = "1234", user enters "1234" | didFinishedEnterCode callback | performSegue("BACK_TO_LOGIN") | BEH-012, STATE-011 |
| LT-011 | iOS | Test PIN entered incorrectly | PIN stored = "1234", user enters "5678" | didFinishedEnterCode callback | error message shown, PIN cleared, stays on screen | BEH-012, ERRPATH-007 |
| LT-012 | iOS | Test settings button navigation (no PIN) | PIN not set (empty), user taps openSettingsButton | openSettingsButtonTapped() | performSegue("SETTINGS") | NAV-002 |
| LT-013 | iOS | Test settings button navigation (with PIN) | PIN set to "1234", user taps openSettingsButton | openSettingsButtonTapped() | performSegue("PINCODE") | NAV-001 |
| LT-014 | Android | Test load saved credentials | User has saved username "alice", password (Base64 "cGFzczEyMw==") | LoginActivity.onCreate() | user EditText = "alice", password EditText = "pass123" (decoded) | BEH-013, STOR-006, STOR-007 |
| LT-015 | Android | Test valid settings check on onCreate | PreferencesUtils.hasValidSettingsPreference() = false, PIN not set | LoginActivity.onCreate() | startActivity(SettingsActivity) | BEH-016, STATE-014 |
| LT-016 | Android | Test valid settings check with PIN | PreferencesUtils.hasValidSettingsPreference() = false, PIN = "1234" | LoginActivity.onCreate() | startActivity(PinActivity) | BEH-016, STATE-014 |
| LT-017 | Android | Test login URL construction | Server="app.example.com", Client="client123", User="alice", Password (Base64), Protocol=https | buildLoginUrl() | URL with encoded parameters | BEH-017 |
| LT-018 | Android | Test password encoding before save | User enters password "secret123" | LoginButton click | StringUtils.encodeBase64("secret123") called; saved as Base64 | BEH-018, STOR-007 |
| LT-019 | Android | Test credentials saved on success | Successful login; PreferencesUtils.saveLoginPreferences() called | Login success | UserDefaults/SharedPreferences USER="bob", PASSWORD=encoded | BEH-020, STOR-006, STOR-007 |
| LT-020 | Android | Test navigation to WebviewActivity | Successful login | startActivity(WebviewActivity) | WebviewActivity started with URL extra | BEH-022, NAV-007 |
| LT-021 | Android | Test PIN entered correctly | PIN stored = "1234", user enters "1234" via buttons | PIN entry complete | Activity.finish() called | BEH-024, STATE-021 |
| LT-022 | Android | Test PIN entered incorrectly | PIN stored = "1234", user enters "5678" | PIN entry complete (4 digits) | Error message shown, user can retry | BEH-024, ERRPATH-012 |
| LT-023 | Android | Test language selection | German language in spinner, user selects English | onItemSelected() | PreferencesUtils.saveLocale("en") called | BEH-015, STOR-011 |
| LT-024 | Android | Test language spinner disabled (single language) | Only one language available | LoginActivity.onCreate() | spinnerLanguage.setEnabled(false) | UI-013 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS/Android | Username with spaces | Accepted, passed to URL encoding | BEH-005, API-001/API-004 |
| EC-002 | iOS/Android | Password with special characters (!, @, #, $) | Accepted, properly encoded in URL | BEH-005 |
| EC-003 | iOS/Android | Username 1 character long | Accepted (non-empty validation passes) | BEH-002/BEH-003 |
| EC-004 | iOS/Android | Password 100+ characters long | Accepted, URL encoded | BEH-005 |
| EC-005 | iOS/Android | Rapid login attempts (spam button) | Only one HTTP request in flight; spinner prevents multiples | BEH-006 |
| EC-006 | iOS/Android | Network timeout during login | Timeout handled by HTTP library; error state reached | BEH-006, ERRPATH-005 |
| EC-007 | iOS/Android | Server returns malformed response (not HTTP 200 or known error) | Treated as error; generic error dialog shown | BEH-007 |
| EC-008 | iOS/Android | Error code in query param is blank string | Not treated as error; login success assumed | BEH-008 |
| EC-009 | iOS | PIN code with leading zero (e.g., "0123") | Accepted as valid 4-digit code | BEH-012 |
| EC-010 | Android | Password contains newline or tab characters | Base64 encoding handles; stored and decoded correctly | BEH-013, BEH-018 |
| EC-011 | iOS/Android | User clears both fields and taps login | Empty validation triggers; error shown | BEH-002, BEH-003 |
| EC-012 | iOS/Android | Server responds with HTTP 500 | Non-200 status; generic error shown | ERRPATH-005 |
| EC-013 | iOS/Android | buildLoginUrl() receives null/empty server | Returns nil/invalid; error handling triggered | ERRPATH-004 |
| EC-014 | iOS | Spinner is nil/not loaded | showSpinner() may fail silently; login still proceeds | BEH-006 (robustness) |
| EC-015 | Android | PreferencesUtils.getLoginPreferences() returns null | NPE if not handled; should validate | BEH-013, BEH-017 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Credential Validation | BEH-002, BEH-003, ERRPATH-001, ERRPATH-002 | 100% | Must prevent login with empty fields |
| Credential Storage | BEH-009, BEH-013, STOR-001 through STOR-011 | 100% | Critical: credentials must persist correctly |
| HTTP Communication | BEH-005, BEH-006, BEH-007, API-001, API-004 | 100% (mocked) | Authentication endpoint must work |
| Navigation | NAV-001 through NAV-008, BEH-011, BEH-022 | 90%+ | Post-login navigation must be reliable |
| PIN Validation | BEH-012, BEH-024, LT-010, LT-011 | 100% | PIN is security-critical |
| Password Encoding | BEH-013, BEH-018, BEH-019, SEC-006 | 100% (Android) | Base64 must encode/decode correctly |
| Error Handling | ERRPATH-001 through ERRPATH-012, BEH-007, BEH-008 | 95%+ | All error paths must show user feedback |
| Security | SEC-001 through SEC-010 | 100% | Credentials must not be logged or exposed |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001 (Alamofire) | External HTTP library; tested by iOS SDK | Use HTTP mocking (OHHTTPStubs) in integration tests |
| DEP-002 (MBProgressHUD) | UI library; requires UI testing framework | Manual verification or snapshot testing |
| API-001 (AF.request real endpoint) | Requires live server or WireMock | Use mocked HTTP responses in unit tests |
| API-003 (HttpStatusUtil real endpoint) | Requires live server | Use mocked HTTP responses in unit tests |
| UI-001 through UI-021 | UI rendering requires UIKit/Android framework | Use XCTest/Espresso or snapshot testing |
| NAV-001 (UIStoryboardSegue) | Requires storyboard loading | Use storyboard mocking or Navigation testing framework |
| BEH-001 (viewWillAppear lifecycle) | UIViewController lifecycle | Mock lifecycle events; validate state changes |
