# Traceability Matrix

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS login tap | LoginViewController.LoginButtonTouchUp | LT-001, LT-003 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| EP-002 | Entry Point | Android login tap | LoginActivity login onClick | LT-002, LT-004 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| EP-003 | Entry Point | iOS settings gate from login | LoginViewController.openSettingsButtonTapped | LT-005 | MAP-002 | src/navigation/authGate.ts | READY_FOR_REVIEW |
| EP-004 | Entry Point | Android settings gate from login init | LoginActivity.onCreate | LT-005 | MAP-002 | src/navigation/authGate.ts | READY_FOR_REVIEW |
| EP-005 | Entry Point | iOS logout trigger | AppDelegate.logout | LT-007 | MAP-006 | src/services/sessionService.ts | READY_FOR_REVIEW |
| EP-006 | Entry Point | Android logout trigger | App.logout | LT-007 | MAP-006 | src/services/sessionService.ts | READY_FOR_REVIEW |
| BEH-001 | Behavior | iOS required user/password | LoginViewController.LoginButtonTouchUp | LT-001 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| BEH-002 | Behavior | Android settings+username validation | LoginActivity.isValid | LT-002 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| BEH-003 | Behavior | iOS request-driven login success | LoginViewController AF.request branch | LT-003, LT-008 | MAP-001, MAP-016 | src/services/loginService.ts | READY_FOR_REVIEW |
| BEH-004 | Behavior | Android optimistic login + persist | LoginActivity onClick success path | LT-004 | MAP-001, MAP-016 | src/services/loginService.ts | READY_FOR_REVIEW |
| BEH-005 | Behavior | invalid settings routes away from login | LoginViewController.viewDidLoad / LoginActivity.onCreate | LT-005 | MAP-002, MAP-015 | src/navigation/authGate.ts | READY_FOR_REVIEW |
| BEH-006 | Behavior | PIN gate exact match required | PinCodeViewController / PinActivity | LT-006, LT-010 | MAP-003, MAP-018 | src/screens/pin/PinGateScreen.tsx | READY_FOR_REVIEW |
| BEH-007 | Behavior | background logout resets flag | AppDelegate.logout / App.logout | LT-007 | MAP-006, MAP-021 | src/services/sessionService.ts | READY_FOR_REVIEW |
| STATE-001 | State | iOS login false->true | PreferencesUtils.saveValidLoginPreference(true) | LT-003 | MAP-014 | src/hooks/useAuthState.ts | READY_FOR_REVIEW |
| STATE-002 | State | Android login false->true | PreferencesUtils.saveValidLoginPreference(true) | LT-004 | MAP-014 | src/hooks/useAuthState.ts | READY_FOR_REVIEW |
| STATE-003 | State | iOS any->false on background | AppDelegate.logout | LT-007 | MAP-014, MAP-021 | src/hooks/useAuthState.ts | READY_FOR_REVIEW |
| STATE-004 | State | Android any->false on pause | App.logout | LT-007 | MAP-014, MAP-021 | src/hooks/useAuthState.ts | READY_FOR_REVIEW |
| STOR-001 | Storage | iOS username key | PreferencesUtils.Keys.userName | LT-003 | MAP-007 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-002 | Storage | iOS password key | PreferencesUtils.Keys.password | LT-003 | MAP-008, MAP-017 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-003 | Storage | iOS valid login key | PreferencesUtils.Keys.hasValidLogin | LT-003, LT-007 | MAP-009 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-004 | Storage | iOS valid settings key | PreferencesUtils.Keys.hasValidSettings | LT-005 | MAP-010 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-005 | Storage | iOS pin key | PreferencesUtils.Keys.pin | LT-005, LT-006 | MAP-011 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-006 | Storage | Android user key | PreferencesUtils.USER | LT-004 | MAP-007 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-007 | Storage | Android password key (encoded) | PreferencesUtils.PASSWORD | LT-004, LT-009 | MAP-008, MAP-017 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-008 | Storage | Android valid login key | PreferencesUtils.HAS_VALID_LOGIN | LT-004, LT-007 | MAP-009 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-009 | Storage | Android valid settings key | PreferencesUtils.HAS_VALID_SETTINGS | LT-002, LT-005 | MAP-010 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| STOR-010 | Storage | Android pin key | PreferencesUtils.PIN | LT-005, LT-006, LT-010 | MAP-011 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| API-001 | API | iOS login GET call | AF.request(loginUrl) | LT-003, LT-008 | MAP-012, MAP-016 | src/services/loginService.ts | READY_FOR_REVIEW |
| API-002 | API | Android login URL assembly | PreferencesUtils.buildLoginUrl | LT-004 | MAP-012, MAP-016 | src/services/loginUrlService.ts | READY_FOR_REVIEW |
| API-003 | API | logout session cleanup | AppDelegate.logout / App.logout | LT-007 | MAP-013 | src/services/sessionService.ts | READY_FOR_REVIEW |
| NAV-001 | Navigation | iOS login->webview | LoginViewController.performSegue WEBVIEW | LT-003 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| NAV-002 | Navigation | Android login->webview | LoginActivity.startActivity(WebviewActivity) | LT-004 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| NAV-003 | Navigation | iOS login->settings/pin | openSettingsButtonTapped | LT-005 | MAP-002 | src/navigation/authGate.ts | READY_FOR_REVIEW |
| NAV-004 | Navigation | Android login->settings/pin | LoginActivity.onCreate gate | LT-005 | MAP-002 | src/navigation/authGate.ts | READY_FOR_REVIEW |
| NAV-005 | Navigation | pin->settings | Pin controller/activity success path | LT-006 | MAP-003 | src/screens/pin/PinGateScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-001 | Error Path | iOS missing username | showErrorDialog(usernameNotFound) | LT-001 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-002 | Error Path | iOS missing password | showErrorDialog(passwordNotFound) | LT-001 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-003 | Error Path | iOS request/build failure | showGenericErrorDialog | LT-008 | MAP-001, MAP-012 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-004 | Error Path | Android invalid login preconditions | showGenericErrorDialog | LT-002 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| ERRPATH-005 | Error Path | wrong PIN | invalid pin UI + reset | LT-006 | MAP-003 | src/screens/pin/PinGateScreen.tsx | READY_FOR_REVIEW |
| DEP-001 | Dependency | iOS Alamofire | import Alamofire in LoginViewController | LT-003 | MAP-012 | src/services/loginService.ts | READY_FOR_REVIEW |
| DEP-002 | Dependency | iOS UserDefaults persistence | PreferencesUtils.sharedPreferences | LT-003, LT-007 | MAP-004 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| DEP-003 | Dependency | Android SharedPreferences persistence | PreferencesUtils.sharedpreferences | LT-004, LT-007 | MAP-004 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| DEP-004 | Dependency | Android lifecycle observer | ProcessLifecycleOwner observer | LT-007 | MAP-021 | src/services/sessionService.ts | READY_FOR_REVIEW |
| DEP-005 | Dependency | Base64 utility | Swift base64 / Android StringUtils.encodeBase64 | LT-004, LT-009 | MAP-005, MAP-017 | src/services/loginUrlService.ts | READY_FOR_REVIEW |
| UI-001 | UI | iOS login prefill | viewWillAppear sets user/password fields | LT-003 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| UI-002 | UI | Android login prefill | LoginActivity decodes stored password for UI | LT-004, LT-009 | MAP-001 | src/screens/login/LoginScreen.tsx | READY_FOR_REVIEW |
| UI-003 | UI | iOS pin error display | PinCodeViewController errorTextField | LT-006 | MAP-003 | src/screens/pin/PinGateScreen.tsx | READY_FOR_REVIEW |
| UI-004 | UI | Android pin status text | PinActivity statusView invalid pin | LT-006 | MAP-003 | src/screens/pin/PinGateScreen.tsx | READY_FOR_REVIEW |
| SEC-001 | Security | iOS password plain in preferences | PreferencesUtils password property | LT-003 | MAP-008, MAP-019 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| SEC-002 | Security | Android password base64 only | PreferencesUtils.saveLoginPreferences | LT-004 | MAP-008, MAP-019 | src/services/authStorageService.ts | READY_FOR_REVIEW |
| SEC-003 | Security | PIN plain-like persistence | PreferencesUtils pin fields | LT-006 | MAP-011, MAP-019 | src/services/authStorageService.ts | READY_FOR_REVIEW |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| N/A | Keine offenen Gaps identifiziert | N/A | N/A |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
