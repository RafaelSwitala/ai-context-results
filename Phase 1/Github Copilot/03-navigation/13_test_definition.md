# Test Definition

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T19:15:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit | iOS | HIGH | Segue presentation mechanism |
| BEH-002 | Unit | iOS | HIGH | Data passing via prepare(for:) |
| BEH-003 | Unit | iOS | HIGH | Unwind segue navigation |
| BEH-004 | Unit | iOS | HIGH | Storyboard initialization |
| BEH-005 | Integration | iOS | HIGH | Logout navigation flow |
| BEH-006 | Integration | iOS | MEDIUM | Session check on foreground |
| BEH-007 | Unit | Android | HIGH | Intent-based navigation |
| BEH-008 | Unit | Android | HIGH | Intent extras data passing |
| BEH-009 | Unit | Android | HIGH | Activity.finish() back navigation |
| BEH-010 | Integration | Android | HIGH | Logout on pause |
| BEH-011 | Unit | Android | HIGH | getIntent() data retrieval |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Test storyboard initialization | App starts | AppDelegate.application() | LoginView (storyboardIdentifier="LoginView") shown | EP-003, BEH-004, NAV |
| LT-002 | iOS | Test segue presentation | LoginViewController displayed | Perform segue(WEBVIEW) | WebsiteWrapperViewController presented with modal transition | BEH-001, NAV-001 |
| LT-003 | iOS | Test segue data passing | WebsiteWrapperViewController | prepare(for segue WEBVIEW) | WebsiteViewController receives url property | BEH-002, NAV-001 |
| LT-004 | iOS | Test logout navigation | WebsiteViewController + logout button | performSegue(BACK_TO_LOGIN) | WebsiteViewController dismissed; LoginViewController displayed | BEH-005, NAV-004 |
| LT-005 | iOS | Test logout API call | Logout button tapped | AppDelegate.logout() + PeApiHelper.doDeleteUser() | Session terminated; hasValidLoginPreference = false | BEH-005, API-002 |
| LT-006 | iOS | Test session check on foreground | App enters foreground | applicationWillEnterForeground called | hasValidLoginPreference checked; if false, segue to login | BEH-006, NAV-004 |
| LT-007 | iOS | Test PIN navigation | LoginViewController + PIN exists | performSegue(PINCODE) | PinCodeViewController presented | NAV-002 |
| LT-008 | iOS | Test Settings navigation | LoginViewController + No PIN | performSegue(SETTINGS) | SettingsViewController presented | NAV-003 |
| LT-009 | iOS | Test unwind segue | ArticleScannerViewController returns | unwindToWebview segue fires | WebsiteViewController displayed; webview reloaded | BEH-003, NAV-005 |
| LT-010 | Android | Test Intent navigation | LoginActivity + login success | startActivity(Intent WebviewActivity) | WebviewActivity started; URL extra passed | BEH-007, BEH-008, NAV-006 |
| LT-011 | Android | Test Intent extras passing | WebviewActivity launched | intent.putExtra(App.URL, url) + getIntent().getExtras() | URL retrieved in WebviewActivity | BEH-008, BEH-011 |
| LT-012 | Android | Test finish() back navigation | WebviewActivity | finish() called | Activity removed; back stack exposed | BEH-009 |
| LT-013 | Android | Test barcode scanner navigation | BarcodeCaptureActivity + scan result | startActivity(WebviewActivity) + intent.putExtra() | WebviewActivity started with scanned URL | BEH-007, BEH-008, NAV-009 |
| LT-014 | Android | Test barcode error navigation | BarcodeCaptureActivity + error | startActivity(LoginActivity) | LoginActivity started; login required | NAV-010 |
| LT-015 | Android | Test logout on pause | App in foreground | App.onPause() | logout() called; RequestUtils.killUserSessions() | BEH-010 |
| LT-016 | Android | Test PIN navigation | LoginActivity + PIN set | startActivity(PinActivity) | PinActivity started | NAV-007 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS | Segue while another in progress | Second segue queued or rejected | BEH-001 |
| EC-002 | iOS | prepare(for:) destination is nil | Segue aborted gracefully | BEH-002 |
| EC-003 | iOS | Logout API times out | Local logout continues; error handled | BEH-005, ERRPATH-002 |
| EC-004 | iOS | Session invalid checked multiple times | First check triggers navigation; subsequent ignored | BEH-006 |
| EC-005 | Android | startActivity with null Intent | NullPointerException or handled | BEH-007 |
| EC-006 | Android | getIntent().getExtras() returns null | Null check; use defaults | BEH-011, ERRPATH-004 |
| EC-007 | Android | finish() called while activity transitioning | Activity properly cleaned up | BEH-009 |
| EC-008 | iOS/Android | Rapid navigation (double tap segue/intent) | Only one transition; spam prevented | BEH-001, BEH-007 |
| EC-009 | Android | Back stack exceeds depth limit | Navigation handled without crash | BEH-009 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Segue Navigation | BEH-001, NAV-001 through NAV-005 | 100% | All screen transitions must work |
| Intent Navigation | BEH-007, NAV-006 through NAV-010 | 100% | All Activity transitions must work |
| Data Passing | BEH-002, BEH-008, BEH-011 | 100% | URL, error codes must transfer correctly |
| Back Navigation | BEH-003, BEH-009 | 100% | Must return to previous screen |
| Session Management | BEH-005, BEH-006, BEH-010 | 95%+ | Logout and session check critical |
| Error Handling | ERRPATH-* | 90%+ | Graceful degradation required |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| BEH-001 (segue animation) | Requires UI testing framework (XCTest UI) | Snapshot or manual testing |
| BEH-004 (storyboard loading) | Requires storyboard resources at runtime | Integration test with loaded storyboard |
| EP-002 (SceneDelegate scene connection) | Requires iOS 13+ scene lifecycle | Manual app launch testing |
| BEH-006 (background/foreground transition) | Requires system lifecycle management | Manual background/foreground testing |
