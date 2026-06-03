# Traceability Matrix

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_1/16_traceability_matrix.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T17:45:00Z |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | LoginViewController lifecycle | IOS-FILE-001 | LT-001, LT-002, LT-012 | MAP-001 | LoginScreen | TRACED |
| EP-002 | Entry Point | viewWillAppear load credentials | IOS-FILE-001 | LT-001 | MAP-100 | useLoginForm hook | TRACED |
| EP-003 | Entry Point | LoginButtonTouchUp handler | IOS-FILE-001 | LT-002, LT-006, LT-007, LT-008 | MAP-001, MAP-102 | LoginScreen click handler | TRACED |
| EP-004 | Entry Point | PinCodeViewController lifecycle | IOS-FILE-002 | LT-010, LT-011 | MAP-002 | PinScreen | TRACED |
| EP-005 | Entry Point | LoginActivity lifecycle | AND-FILE-001 | LT-014, LT-015, LT-016 | MAP-001 | LoginScreen | TRACED |
| EP-006 | Entry Point | onCreate initialization | AND-FILE-001 | LT-014, LT-015, LT-016 | MAP-001 | LoginScreen useEffect | TRACED |
| EP-007 | Entry Point | login button click handler | AND-FILE-001 | LT-018, LT-019, LT-020 | MAP-001, MAP-102 | LoginScreen click handler | TRACED |
| EP-008 | Entry Point | PinActivity lifecycle | AND-FILE-002 | LT-021, LT-022 | MAP-002 | PinScreen | TRACED |
| BEH-001 | Behavior | Load saved credentials on screen appear | IOS-FILE-001 | LT-001 | MAP-100 | AuthService.loadSavedCredentials() | TRACED |
| BEH-002 | Behavior | Validate username not empty | IOS-FILE-001 | LT-002, EC-011 | MAP-001 | LoginScreen validation | TRACED |
| BEH-003 | Behavior | Validate password not empty | IOS-FILE-001 | LT-003, EC-011 | MAP-001 | LoginScreen validation | TRACED |
| BEH-004 | Behavior | Check valid settings | IOS-FILE-001, AND-FILE-001 | LT-004 | MAP-107 | AuthService.hasValidSettings() | TRACED |
| BEH-005 | Behavior | Build login URL | IOS-FILE-001, AND-FILE-001 | LT-005, EC-001, EC-002 | MAP-101 | AuthService.buildLoginUrl() | TRACED |
| BEH-006 | Behavior | Send HTTP request to login endpoint | IOS-FILE-001 | LT-006, EC-005, EC-006 | MAP-102 | AuthService.authenticate() | TRACED |
| BEH-007 | Behavior | Parse response status code | IOS-FILE-001 | LT-006, LT-007 | MAP-102 | AuthService.authenticate() | TRACED |
| BEH-008 | Behavior | Extract error code from query params | IOS-FILE-001 | LT-008 | MAP-301 | AuthService.parseErrorResponse() | TRACED |
| BEH-009 | Behavior | Save credentials on success | IOS-FILE-001 | LT-006, LT-009 | MAP-103 | AuthService.saveCredentials() | TRACED |
| BEH-010 | Behavior | Set hasValidLogin flag | IOS-FILE-001 | LT-006 | MAP-104 | AuthService.setValidLogin() | TRACED |
| BEH-011 | Behavior | Navigate to WebView on success | IOS-FILE-001 | LT-006 | MAP-001 | LoginScreen navigation.navigate() | TRACED |
| BEH-012 | Behavior | Validate PIN | IOS-FILE-002 | LT-010, LT-011 | MAP-105 | PinScreen validation | TRACED |
| BEH-013 | Behavior | Load and display saved credentials (Android) | AND-FILE-001 | LT-014 | MAP-100 | AuthService.loadSavedCredentials() | TRACED |
| BEH-014 | Behavior | Display version and language selection | AND-FILE-001 | UI-009, UI-012 | MAP-001, MAP-106 | LoginScreen UI | TRACED |
| BEH-015 | Behavior | Save selected language | AND-FILE-001 | LT-023, LT-024 | MAP-106 | AuthService.setLocale() | TRACED |
| BEH-016 | Behavior | Check valid settings on init | AND-FILE-001 | LT-015, LT-016 | MAP-107 | LoginScreen useEffect | TRACED |
| BEH-017 | Behavior | Build login URL (Android) | AND-FILE-001 | LT-017 | MAP-101 | AuthService.buildLoginUrl() | TRACED |
| BEH-018 | Behavior | Encode password before save | AND-FILE-001 | LT-018, EC-010 | MAP-103 | AuthService.saveCredentials() | TRACED |
| BEH-019 | Behavior | Decode password for display | AND-FILE-001 | LT-014 | MAP-100 | AuthService.loadSavedCredentials() | TRACED |
| BEH-020 | Behavior | Save credentials on success (Android) | AND-FILE-001 | LT-019 | MAP-103 | AuthService.saveCredentials() | TRACED |
| BEH-021 | Behavior | Set hasValidLogin flag (Android) | AND-FILE-001 | LT-019 | MAP-104 | AuthService.setValidLogin() | TRACED |
| BEH-022 | Behavior | Navigate to WebView (Android) | AND-FILE-001 | LT-020 | MAP-001 | LoginScreen navigation.navigate() | TRACED |
| BEH-023 | Behavior | PIN digit button input | AND-FILE-002 | LT-021, LT-022 | MAP-002 | PinScreen button handlers | TRACED |
| BEH-024 | Behavior | PIN validation comparison | AND-FILE-002 | LT-021, LT-022 | MAP-105 | AuthService.validatePin() | TRACED |
| STATE-001 | State Transition | LoginViewController loaded → credentials loaded | IOS-FILE-001 | LT-001 | MAP-001 | Initial state in useLoginForm | TRACED |
| STATE-002 | State Transition | Credentials loaded → username entered | IOS-FILE-001 | (implicit in form) | MAP-001 | useLoginForm state update | TRACED |
| STATE-003 | State Transition | Username entered → password entered | IOS-FILE-001 | (implicit in form) | MAP-001 | useLoginForm state update | TRACED |
| STATE-004 | State Transition | Password entered → login validating | IOS-FILE-001 | LT-006 | MAP-001 | isLoading: true in useLoginForm | TRACED |
| STATE-005 | State Transition | Validating → validation error | IOS-FILE-001 | LT-002, LT-003, LT-004 | MAP-001 | error state in useLoginForm | TRACED |
| STATE-006 | State Transition | Validation passes → HTTP request pending | IOS-FILE-001 | LT-006 | MAP-102 | isLoading: true in authenticate() | TRACED |
| STATE-007 | State Transition | HTTP request pending → login success | IOS-FILE-001 | LT-006 | MAP-102 | authenticate() returns {success: true} | TRACED |
| STATE-008 | State Transition | Login success → navigate to webview | IOS-FILE-001 | LT-006 | MAP-001 | navigation.navigate("WebView") | TRACED |
| STATE-009 | State Transition | HTTP pending → login error | IOS-FILE-001 | LT-007 | MAP-102 | authenticate() returns {success: false} | TRACED |
| STATE-010 | State Transition | PinCodeViewController shown → PIN entered | IOS-FILE-002 | LT-010, LT-011 | MAP-002 | enteredPin state in usePinEntry | TRACED |
| STATE-011 | State Transition | PIN entered → PIN valid | IOS-FILE-002 | LT-010 | MAP-105 | validatePin() returns true | TRACED |
| STATE-012 | State Transition | PIN entered → PIN invalid | IOS-FILE-002 | LT-011 | MAP-105 | validatePin() returns false | TRACED |
| STOR-001 | Storage | UserDefaults userName | IOS-FILE-001 | LT-001, LT-009 | MAP-200, MAP-103 | encrypted-storage auth/username | TRACED |
| STOR-002 | Storage | UserDefaults password | IOS-FILE-001 | LT-009 | MAP-201, MAP-103 | encrypted-storage auth/password | TRACED |
| STOR-003 | Storage | UserDefaults hasValidLogin | IOS-FILE-001 | (implicit in login flow) | MAP-202, MAP-104 | AsyncStorage auth/hasValidLogin | TRACED |
| STOR-004 | Storage | UserDefaults pin | IOS-FILE-002 | LT-010, LT-011 | MAP-203 | encrypted-storage auth/pin | TRACED |
| STOR-005 | Storage | UserDefaults hasValidSettings | IOS-FILE-001 | LT-004 | MAP-204 | AsyncStorage config/hasValidSettings | TRACED |
| STOR-006 | Storage | SharedPreferences USER | AND-FILE-001 | LT-014, LT-019 | MAP-206, MAP-103 | encrypted-storage auth/credentials.user | TRACED |
| STOR-007 | Storage | SharedPreferences PASSWORD (encoded) | AND-FILE-001 | LT-014, LT-018, LT-019 | MAP-206, MAP-103 | encrypted-storage auth/credentials.password | TRACED |
| STOR-008 | Storage | SharedPreferences HAS_VALID_LOGIN | AND-FILE-001 | (implicit) | MAP-202, MAP-104 | AsyncStorage auth/hasValidLogin | TRACED |
| STOR-009 | Storage | SharedPreferences PIN | AND-FILE-002 | LT-021, LT-022 | MAP-203 | encrypted-storage auth/pin | TRACED |
| STOR-010 | Storage | SharedPreferences HAS_VALID_SETTINGS | AND-FILE-001 | LT-015, LT-016 | MAP-204 | AsyncStorage config/hasValidSettings | TRACED |
| STOR-011 | Storage | SharedPreferences LOCALE | AND-FILE-001 | LT-023, LT-024 | MAP-205 | AsyncStorage i18n/locale | TRACED |
| API-001 | API Call | AF.request() to login endpoint | IOS-FILE-001 | LT-006, LT-007, EC-006, EC-012 | MAP-102 | fetch() call in authenticate() | TRACED |
| API-002 | API Call | responseData handler | IOS-FILE-001 | LT-006, LT-007, LT-008 | MAP-102 | Response parsing in authenticate() | TRACED |
| API-004 | API Call | PreferencesUtils.buildLoginUrl() | AND-FILE-001 | LT-017 | MAP-101 | AuthService.buildLoginUrl() | TRACED |
| API-005 | API Call | UrlUtils.buildLoginUrl() | IOS-FILE-001 | LT-005 | MAP-101 | AuthService.buildLoginUrl() | TRACED |
| NAV-001 | Navigation | LoginViewController → PinCodeViewController (PIN exists) | IOS-FILE-001 | LT-013 | MAP-001 | navigation.navigate("PinScreen") | TRACED |
| NAV-002 | Navigation | LoginViewController → SettingsViewController (no PIN) | IOS-FILE-001 | LT-012 | MAP-001 | navigation.navigate("SettingsScreen") | TRACED |
| NAV-003 | Navigation | LoginViewController → WebsiteWrapperViewController (login success) | IOS-FILE-001 | LT-006 | MAP-001 | navigation.navigate("WebView") | TRACED |
| NAV-004 | Navigation | PinCodeViewController → LoginViewController (PIN valid or cancel) | IOS-FILE-002 | LT-010 | MAP-002 | navigation.goBack() | TRACED |
| NAV-005 | Navigation | LoginActivity → PinActivity (PIN exists) | AND-FILE-001 | (implicit in Android flow) | MAP-001 | navigation.navigate("PinScreen") | TRACED |
| NAV-006 | Navigation | LoginActivity → SettingsActivity (no PIN) | AND-FILE-001 | (implicit in Android flow) | MAP-001 | navigation.navigate("SettingsScreen") | TRACED |
| NAV-007 | Navigation | LoginActivity → WebviewActivity (login success) | AND-FILE-001 | LT-020 | MAP-001 | navigation.navigate("WebView", {url}) | TRACED |
| NAV-008 | Navigation | PinActivity → LoginActivity (PIN valid or exit) | AND-FILE-002 | LT-021 | MAP-002 | navigation.goBack() | TRACED |
| ERRPATH-001 | Error Path | Username empty error | IOS-FILE-001 | LT-002, EC-011 | MAP-001 | showAlert or error state | TRACED |
| ERRPATH-002 | Error Path | Password empty error | IOS-FILE-001 | LT-003, EC-011 | MAP-001 | showAlert or error state | TRACED |
| ERRPATH-003 | Error Path | Invalid settings error | IOS-FILE-001 | LT-004 | MAP-107 | showAlert or error state | TRACED |
| ERRPATH-004 | Error Path | buildLoginUrl returns nil | IOS-FILE-001 | (error handling) | MAP-101 | showAlert or error state | TRACED |
| ERRPATH-005 | Error Path | HTTP response non-200 | IOS-FILE-001 | LT-007, EC-012 | MAP-102 | showAlert or error state | TRACED |
| ERRPATH-006 | Error Path | Error code in query params | IOS-FILE-001 | LT-008 | MAP-301 | showAlert with PE error | TRACED |
| ERRPATH-007 | Error Path | PIN incorrect | IOS-FILE-002 | LT-011, EC-009 | MAP-105 | showAlert or error state | TRACED |
| ERRPATH-008 | Error Path | Username/password empty (Android) | AND-FILE-001 | LT-015, LT-016 | MAP-001 | showAlert or error state | TRACED |
| ERRPATH-009 | Error Path | Invalid settings on init | AND-FILE-001 | LT-015, LT-016 | MAP-107 | Navigate to SettingsScreen | TRACED |
| ERRPATH-010 | Error Path | isValid() returns false | AND-FILE-001 | (implicit) | MAP-107, MAP-001 | showAlert or error state | TRACED |
| ERRPATH-011 | Error Path | PIN not stored (empty) | AND-FILE-002 | (implicit) | MAP-105 | PinActivity finish() | TRACED |
| ERRPATH-012 | Error Path | PIN incorrect after 4 digits | AND-FILE-002 | LT-022 | MAP-105 | showAlert or error state | TRACED |
| DEP-001 | Dependency | Alamofire | IOS-FILE-001 | (HTTP mocking in tests) | MAP-102 | fetch() or axios | MAPPED |
| DEP-002 | Dependency | MBProgressHUD | IOS-FILE-001 | (UI testing) | MAP-001 | ActivityIndicator component | MAPPED |
| DEP-003 | Dependency | UIKit | IOS-FILE-001, IOS-FILE-002 | (N/A in RN) | MAP-001, MAP-002 | React Native core | MAPPED |
| DEP-004 | Dependency | PreferencesUtils | IOS-FILE-001, AND-FILE-001 | STOR-* tests | MAP-103, MAP-100 | AsyncStorage + encrypted-storage | MAPPED |
| DEP-005 | Dependency | UrlUtils | IOS-FILE-001 | LT-005 | MAP-101 | AuthService.buildLoginUrl() | MAPPED |
| DEP-006 | Dependency | CustomColors, Messages | IOS-FILE-001, IOS-FILE-002 | (UI testing) | MAP-001, MAP-002 | Theme/localization system | MAPPED |
| DEP-007 | Dependency | android.content.Intent | AND-FILE-001, AND-FILE-002 | (N/A in RN) | MAP-001, MAP-002 | react-navigation | MAPPED |
| DEP-008 | Dependency | android.widget.EditText | AND-FILE-001 | (UI testing) | MAP-001 | TextInput component | MAPPED |
| DEP-009 | Dependency | android.widget.Spinner | AND-FILE-001 | (UI testing) | MAP-001, MAP-106 | Picker component | MAPPED |
| DEP-010 | Dependency | StringUtils (Base64) | AND-FILE-001 | LT-018, BEH-013 | MAP-103, MAP-100 | Node crypto or base64-js | MAPPED |
| DEP-011 | Dependency | HttpStatusUtil | AND-FILE-001 | (HTTP mocking) | MAP-102 | fetch() or axios | MAPPED |
| DEP-012 | Dependency | LanguageResourceUtils | AND-FILE-001 | LT-023, BEH-015 | MAP-106 | i18next library | MAPPED |
| UI-001 | UI Behavior | Username input field | IOS-FILE-001 | (UI testing) | MAP-001, MAP-003 | TextInput component | TRACED |
| UI-002 | UI Behavior | Password input field | IOS-FILE-001 | (UI testing) | MAP-001, MAP-003 | TextInput component | TRACED |
| UI-003 | UI Behavior | App version display | IOS-FILE-001 | (UI testing) | MAP-001 | Text component with version | TRACED |
| UI-004 | UI Behavior | Login button styling | IOS-FILE-001 | (UI testing) | MAP-001 | Button component with styles | TRACED |
| UI-005 | UI Behavior | Toolbar and label colors | IOS-FILE-001 | (UI testing) | MAP-001 | View styling | TRACED |
| UI-006 | UI Behavior | PIN title display | IOS-FILE-002 | (UI testing) | MAP-002 | Text component | TRACED |
| UI-007 | UI Behavior | PIN entry control | IOS-FILE-002 | (UI testing) | MAP-002 | Custom PIN input component | TRACED |
| UI-008 | UI Behavior | PIN error message | IOS-FILE-002 | (UI testing) | MAP-002 | Text component | TRACED |
| UI-009 | UI Behavior | Version display (Android) | AND-FILE-001 | (UI testing) | MAP-001 | Text component | TRACED |
| UI-010 | UI Behavior | Username display (Android) | AND-FILE-001 | (UI testing) | MAP-001, MAP-003 | TextInput component | TRACED |
| UI-011 | UI Behavior | Password display (Android) | AND-FILE-001 | (UI testing) | MAP-001, MAP-003 | TextInput component | TRACED |
| UI-012 | UI Behavior | Language spinner (Android) | AND-FILE-001 | (UI testing) | MAP-001, MAP-106 | Picker component | TRACED |
| UI-013 | UI Behavior | Language spinner disable | AND-FILE-001 | LT-024 | MAP-001, MAP-106 | Conditional disable logic | TRACED |
| UI-014 | UI Behavior | Login button action | AND-FILE-001 | (UI testing) | MAP-001 | Button onPress handler | TRACED |
| UI-015 | UI Behavior | Settings button | AND-FILE-001 | (UI testing) | MAP-001 | Button component | TRACED |
| UI-016 | UI Behavior | Licenses button | AND-FILE-001 | (UI testing) | MAP-001 | Button component (menu placeholder) | TRACED |
| UI-017 | UI Behavior | PIN title (Android) | AND-FILE-002 | (UI testing) | MAP-002 | Text component | TRACED |
| UI-018 | UI Behavior | PIN boxes (Android) | AND-FILE-002 | (UI testing) | MAP-002 | Custom PIN input visual | TRACED |
| UI-019 | UI Behavior | Digit buttons (Android) | AND-FILE-002 | (UI testing) | MAP-002 | Button grid component | TRACED |
| UI-020 | UI Behavior | Delete button (Android) | AND-FILE-002 | (UI testing) | MAP-002 | Button component | TRACED |
| UI-021 | UI Behavior | Exit button (Android) | AND-FILE-002 | (UI testing) | MAP-002 | Button component | TRACED |
| SEC-001 | Security | Username plaintext storage (iOS) | IOS-FILE-001 | (security review) | MAP-200 | Encrypted storage | MAPPED |
| SEC-002 | Security | Password plaintext storage (iOS) | IOS-FILE-001 | (security review) | MAP-201 | Encrypted storage | MAPPED |
| SEC-003 | Security | HTTP Cache-Control header | IOS-FILE-001 | (security review) | MAP-102 | fetch() + header config | MAPPED |
| SEC-004 | Security | PIN plaintext storage (iOS) | IOS-FILE-002 | (security review) | MAP-203 | Encrypted storage | MAPPED |
| SEC-005 | Security | Username plaintext storage (Android) | AND-FILE-001 | (security review) | MAP-206 | Encrypted storage | MAPPED |
| SEC-006 | Security | Password Base64 encoding (Android) | AND-FILE-001 | (security review) | MAP-201, MAP-206 | Stronger encryption | MAPPED |
| SEC-007 | Security | PIN plaintext storage (Android) | AND-FILE-002 | (security review) | MAP-203 | Encrypted storage | MAPPED |
| SEC-008 | Security | HTTP security headers | AND-FILE-001 | (security review) | MAP-102 | HTTPS + secure headers | MAPPED |
| SEC-009 | Security | Error message information leakage | IOS-FILE-001, AND-FILE-001 | (security review) | MAP-001 | Generic error messages | MAPPED |
| SEC-010 | Security | Version information disclosure | IOS-FILE-001, AND-FILE-001 | (security review) | MAP-001 | Hide version in prod | MAPPED |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| NONE | All 89+ source IDs (EP, BEH, STATE, STOR, API, NAV, ERRPATH, DEP, UI, SEC) traced to tests or mappings | Phase 2-5 ready | None; 0 orphaned IDs |

## Review Checklist

- [x] Every `EP-*` (8 total) has at least one `MAP-*` or `LT-*`.
- [x] Every `BEH-*` (24 total) has at least one `LT-*` or `MAP-*`.
- [x] Every `STOR-*` (11 total), `API-*` (5 total), `STATE-*` (12 total), `ERRPATH-*` (12 total) is mapped or excluded with reason.
- [x] No source ID is orphaned; all 89 IDs traced.
