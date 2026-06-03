# Code Facts

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T16:45:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | LoginViewController.swift | LoginViewController class | UIViewController lifecycle | [ios: Source/LoginViewController.swift:class LoginViewController] |
| EP-002 | iOS | LoginViewController.swift | viewWillAppear() | Screen appears; load saved credentials | [ios: Source/LoginViewController.swift:override func viewWillAppear] |
| EP-003 | iOS | LoginViewController.swift | LoginButtonTouchUp() | Login button tapped | [ios: Source/LoginViewController.swift:@IBAction func LoginButtonTouchUp] |
| EP-004 | iOS | PinCodeViewController.swift | PinCodeViewController class | PIN entry screen | [ios: Source/PinCodeViewController.swift:class PinCodeViewController] |
| EP-005 | Android | LoginActivity.java | LoginActivity class | Activity lifecycle | [android: LoginActivity.java:class LoginActivity extends BaseActivity] |
| EP-006 | Android | LoginActivity.java | onCreate() | Activity initialization | [android: LoginActivity.java:protected void onCreate] |
| EP-007 | Android | LoginActivity.java | login.setOnClickListener() | Login button tapped | [android: LoginActivity.java:login.setOnClickListener] |
| EP-008 | Android | PinActivity.java | PinActivity class | PIN entry screen | [android: PinActivity.java:class PinActivity extends BaseActivity] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Load saved credentials on screen appearance | None (implicit context) | userName and password UITextFields populated with saved values | [ios: LoginViewController.swift:viewWillAppear - self.userName.text = PreferencesUtils.userName] |
| BEH-002 | iOS | Validate username not empty | username string | Error dialog shown or proceed to validation | [ios: LoginViewController.swift:guard let username = userName.text, !username.isEmpty] |
| BEH-003 | iOS | Validate password not empty | password string | Error dialog shown or proceed to login | [ios: LoginViewController.swift:guard let password = password.text, !password.isEmpty] |
| BEH-004 | iOS | Check if valid settings exist | None | Boolean; if false, open settings or PIN screen | [ios: LoginViewController.swift:PreferencesUtils.hasValidSettingsPreference()] |
| BEH-005 | iOS | Build login URL from credentials and preferences | username, password, server, client, protocol | Formatted login URL | [ios: LoginViewController.swift:UrlUtils.buildLoginUrl()] |
| BEH-006 | iOS | Send HTTP request to login endpoint | URL, Cache-Control header | HTTP response or error | [ios: LoginViewController.swift:AF.request(url, headers: headers)] |
| BEH-007 | iOS | Parse response: check status code | HTTP response | 200 = success; non-200 = generic error | [ios: LoginViewController.swift:if response.response?.statusCode != 200] |
| BEH-008 | iOS | Parse response: extract error code from query params | Response URL query string | Error code string or nil | [ios: LoginViewController.swift:let errorCode = response.response?.url?.query?.replacingOccurrences] |
| BEH-009 | iOS | Handle login success: save credentials | username, password | Credentials persisted to PreferencesUtils | [ios: LoginViewController.swift:PreferencesUtils.saveLoginPreferences(user: username, password: password)] |
| BEH-010 | iOS | Handle login success: set valid login flag | None | hasValidLogin = true | [ios: LoginViewController.swift:PreferencesUtils.saveValidLoginPreference(true)] |
| BEH-011 | iOS | Navigate to WebView on success | None | Segue to WEBVIEW screen with login URL | [ios: LoginViewController.swift:self.performSegue(withIdentifier: "WEBVIEW")] |
| BEH-012 | iOS | PIN validation: compare entered code with stored | entered PIN, stored PIN | Match = proceed; no match = clear and show error | [ios: PinCodeViewController.swift:let isGuessed = (code == self.pinCode)] |
| BEH-013 | Android | Load and display saved credentials on onCreate | None | EditText fields populated with user and decoded password | [android: LoginActivity.java:user.setText(prefs.user); password.setText(StringUtils.decodeBase64(prefs.password))] |
| BEH-014 | Android | Display version and language selection | None | Version label and language spinner shown | [android: LoginActivity.java:version.setText(versionText); spinnerLanguage.setAdapter(dataAdapterLanguage)] |
| BEH-015 | Android | Save selected language | Spinner item selected | Locale persisted to PreferencesUtils | [android: LoginActivity.java:PreferencesUtils.saveLocale(locale)] |
| BEH-016 | Android | Check if valid settings exist; navigate if not | None | If not valid, start SettingsActivity or PinActivity | [android: LoginActivity.java:if (!PreferencesUtils.hasValidSettingsPreference())] |
| BEH-017 | Android | Build login URL from stored preferences and input | username, password entered | Formatted login URL | [android: LoginActivity.java:PreferencesUtils.buildLoginUrl(prefs.server, ...)] |
| BEH-018 | Android | Encode password before saving | plaintext password | Base64-encoded password string | [android: LoginActivity.java:StringUtils.encodeBase64(password.getText().toString())] |
| BEH-019 | Android | Decode password for display | Base64-encoded password | Plaintext password string | [android: LoginActivity.java:StringUtils.decodeBase64(prefs.password)] |
| BEH-020 | Android | Save credentials on successful login | username, encoded password | Credentials persisted | [android: LoginActivity.java:PreferencesUtils.saveLoginPreferences(user.getText().toString(), encodedPassword)] |
| BEH-021 | Android | Set valid login flag | None | hasValidLogin = true | [android: LoginActivity.java:PreferencesUtils.saveValidLoginPreference(true)] |
| BEH-022 | Android | Navigate to WebView with Intent | login URL | WebviewActivity started with URL extra | [android: LoginActivity.java:Intent intent = new Intent(LoginActivity.this, WebviewActivity.class); intent.putExtra(App.URL, url)] |
| BEH-023 | Android | PIN validation: numeric button input | digit pressed | Accumulate entered PIN; check length | [android: PinActivity.java:Button press handlers for digits 0-9] |
| BEH-024 | Android | PIN validation: compare entered code with stored | entered PIN, stored PIN | Match = finish activity; no match = show error | [android: PinActivity.java:if (userEntered.equals(userPin))] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | LoginViewController loaded | viewWillAppear() | Credentials loaded into text fields | [ios: LoginViewController.swift:viewWillAppear] |
| STATE-002 | iOS | Credentials loaded | User enters username | USERNAME_ENTERED (implicit) | [ios: LoginViewController.swift:UITextField input] |
| STATE-003 | iOS | USERNAME_ENTERED | User enters password | PASSWORD_ENTERED (implicit) | [ios: LoginViewController.swift:UITextField input] |
| STATE-004 | iOS | PASSWORD_ENTERED | User taps login button | LOGIN_VALIDATING | [ios: LoginViewController.swift:LoginButtonTouchUp] |
| STATE-005 | iOS | LOGIN_VALIDATING | Validation fails (empty/invalid settings) | VALIDATION_ERROR; error dialog shown | [ios: LoginViewController.swift:guard statements] |
| STATE-006 | iOS | LOGIN_VALIDATING | Validation passes | HTTP_REQUEST_PENDING | [ios: LoginViewController.swift:AF.request() started] |
| STATE-007 | iOS | HTTP_REQUEST_PENDING | Response received with 200 status | LOGIN_SUCCESS | [ios: LoginViewController.swift:if response.response?.statusCode == 200] |
| STATE-008 | iOS | LOGIN_SUCCESS | Credentials saved and flag set | NAVIGATING_TO_WEBVIEW (or PINCODE if PIN exists) | [ios: LoginViewController.swift:PreferencesUtils.save* + performSegue] |
| STATE-009 | iOS | HTTP_REQUEST_PENDING | Response received with non-200 or error code | LOGIN_ERROR | [ios: LoginViewController.swift:else branch] |
| STATE-010 | iOS | PinCodeViewController shown | User enters 4 digits | PIN_ENTERED | [ios: PinCodeViewController.swift:didFinishedEnterCode] |
| STATE-011 | iOS | PIN_ENTERED | PIN matches stored value | PIN_VALID; navigate back | [ios: PinCodeViewController.swift:if isGuessed] |
| STATE-012 | iOS | PIN_ENTERED | PIN does not match | PIN_INVALID; error shown, fields cleared | [ios: PinCodeViewController.swift:else branch] |
| STATE-013 | Android | LoginActivity.onCreate() | Settings valid? Yes | Display login UI with saved credentials | [android: LoginActivity.java:onCreate else branch] |
| STATE-014 | Android | LoginActivity.onCreate() | Settings valid? No | Start SettingsActivity or PinActivity immediately | [android: LoginActivity.java:if (!PreferencesUtils.hasValidSettingsPreference())] |
| STATE-015 | Android | Login UI shown | User enters username and password | CREDENTIALS_ENTERED (implicit) | [android: LoginActivity.java:EditText input] |
| STATE-016 | Android | CREDENTIALS_ENTERED | User taps login button | LOGIN_VALIDATING | [android: LoginActivity.java:login.setOnClickListener] |
| STATE-017 | Android | LOGIN_VALIDATING | Validation passes | LOGIN_URL_BUILT | [android: LoginActivity.java:PreferencesUtils.buildLoginUrl()] |
| STATE-018 | Android | LOGIN_URL_BUILT | Credentials and flag saved | LOGIN_SUCCESS | [android: LoginActivity.java:PreferencesUtils.saveLoginPreferences() + saveValidLoginPreference()] |
| STATE-019 | Android | LOGIN_SUCCESS | WebviewActivity started | NAVIGATING_TO_WEBVIEW | [android: LoginActivity.java:startActivity(intent)] |
| STATE-020 | Android | PinActivity.onCreate() | PIN stored and user entered | PIN_ENTERED | [android: PinActivity.java:onCreate, button handlers] |
| STATE-021 | Android | PIN_ENTERED | PIN matches stored | PIN_VALID; finish activity | [android: PinActivity.java:if (userEntered.equals(userPin))] |
| STATE-022 | Android | PIN_ENTERED | PIN does not match after 4 digits | PIN_INVALID; error shown | [android: PinActivity.java:else branch] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | UserDefaults via PreferencesUtils.userName | Read/Write | String? | [ios: LoginViewController.swift:PreferencesUtils.userName] |
| STOR-002 | iOS | UserDefaults via PreferencesUtils.password | Read/Write | String? | [ios: LoginViewController.swift:PreferencesUtils.password] |
| STOR-003 | iOS | UserDefaults via PreferencesUtils.hasValidLogin | Read/Write | Bool | [ios: LoginViewController.swift:PreferencesUtils.hasValidLogin] |
| STOR-004 | iOS | UserDefaults via PreferencesUtils.pin | Read | String? | [ios: LoginViewController.swift:PreferencesUtils.pin] |
| STOR-005 | iOS | UserDefaults via PreferencesUtils.hasValidSettings | Read | Bool | [ios: LoginViewController.swift:PreferencesUtils.hasValidSettingsPreference()] |
| STOR-006 | Android | SharedPreferences USER key | Read/Write | String (plaintext username) | [android: LoginActivity.java:user.setText(prefs.user)] |
| STOR-007 | Android | SharedPreferences PASSWORD key | Read/Write | String (Base64-encoded) | [android: LoginActivity.java:prefs.password] |
| STOR-008 | Android | SharedPreferences HAS_VALID_LOGIN | Read/Write | Boolean | [android: LoginActivity.java:PreferencesUtils.saveValidLoginPreference(true)] |
| STOR-009 | Android | SharedPreferences PIN key | Read | String | [android: PinActivity.java:userPin = PreferencesUtils.getLoginPreferences().pin] |
| STOR-010 | Android | SharedPreferences HAS_VALID_SETTINGS | Read | Boolean | [android: LoginActivity.java:PreferencesUtils.hasValidSettingsPreference()] |
| STOR-011 | Android | SharedPreferences LOCALE key | Read/Write | String (language code) | [android: LoginActivity.java:PreferencesUtils.saveLocale(locale)] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | AF.request() | Login URL endpoint (built from server/client/user/password) | GET request with Cache-Control: no-cache header | HTTP response with status code | [ios: LoginViewController.swift:AF.request(url, headers: headers).responseData] |
| API-002 | iOS | responseData | URL response handler | Built login URL | Response data or error (data not parsed in code) | [ios: LoginViewController.swift:AF.request(...).responseData { response in }] |
| API-003 | Android | HttpStatusUtil.doRequest() | Login URL endpoint | GET request (implementation in utility) | Response object with status code | [android: LoginActivity.java:ResponseResult result = HttpStatusUtil.doRequest(url, null, HttpMethod.GET)] |
| API-004 | Android | PreferencesUtils.buildLoginUrl() | Server + client + user + password + protocol | Constructed URL string | Formatted login URL | [android: LoginActivity.java:String url = PreferencesUtils.buildLoginUrl(...)] |
| API-005 | iOS | UrlUtils.buildLoginUrl() | Server, client, user, password, protocol | URL string or nil | Formatted login URL | [ios: LoginViewController.swift:guard let url = UrlUtils.buildLoginUrl(...)] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | LoginViewController | PinCodeViewController | openSettingsButton tapped AND pin exists | [ios: LoginViewController.swift:performSegue(withIdentifier: "PINCODE")] |
| NAV-002 | iOS | LoginViewController | SettingsViewController | openSettingsButton tapped AND no pin | [ios: LoginViewController.swift:performSegue(withIdentifier: "SETTINGS")] |
| NAV-003 | iOS | LoginViewController | WebsiteWrapperViewController | Login successful | [ios: LoginViewController.swift:performSegue(withIdentifier: "WEBVIEW")] |
| NAV-004 | iOS | PinCodeViewController | LoginViewController | PIN valid OR cancel button tapped | [ios: PinCodeViewController.swift:performSegue(BACK_TO_LOGIN) or dismiss] |
| NAV-005 | Android | LoginActivity | PinActivity | openSettingsButton tapped AND pin exists | [android: LoginActivity.java:startActivity(intent to PinActivity)] |
| NAV-006 | Android | LoginActivity | SettingsActivity | openSettingsButton tapped AND no pin | [android: LoginActivity.java:startActivity(intent to SettingsActivity)] |
| NAV-007 | Android | LoginActivity | WebviewActivity | Login successful | [android: LoginActivity.java:startActivity(intent to WebviewActivity with URL)] |
| NAV-008 | Android | PinActivity | LoginActivity | PIN valid or exit button tapped | [android: PinActivity.java:finish()] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | Username empty | showErrorDialog(Messages.usernameNotFound) | User sees error alert; remains on login screen | [ios: LoginViewController.swift:guard let username = userName.text, !username.isEmpty] |
| ERRPATH-002 | iOS | Password empty | showErrorDialog(Messages.passwordNotFound) | User sees error alert; remains on login screen | [ios: LoginViewController.swift:guard let password = password.text, !password.isEmpty] |
| ERRPATH-003 | iOS | Valid settings not configured | isValid() returns false; showGenericErrorDialog() | User sees error; remains on login screen | [ios: LoginViewController.swift:if self.isValid()] |
| ERRPATH-004 | iOS | buildLoginUrl() returns nil | showGenericErrorDialog() | User sees generic error; remains on login screen | [ios: LoginViewController.swift:guard let url = UrlUtils.buildLoginUrl(...)] |
| ERRPATH-005 | iOS | HTTP response status != 200 | showGenericErrorDialog() | User sees generic error; remains on login screen | [ios: LoginViewController.swift:if response.response?.statusCode != 200] |
| ERRPATH-006 | iOS | Error code in query params | showPeErrorDialog(errorCode:) | User sees PE-specific error message | [ios: LoginViewController.swift:if (!errorCode.isEmptyOrNil)] |
| ERRPATH-007 | iOS | PIN entered incorrectly | Clear input fields, show error message "invalidPin" | Fields cleared; user can retry | [ios: PinCodeViewController.swift:else branch - deleteBackward in loop] |
| ERRPATH-008 | Android | Username or password empty | No explicit check; form may submit empty (implicit) | Depends on backend response | [android: LoginActivity.java:(no guard statements)] |
| ERRPATH-009 | Android | Valid settings not configured | startActivity(SettingsActivity or PinActivity) | User directed to settings before login | [android: LoginActivity.java:if (!PreferencesUtils.hasValidSettingsPreference())] |
| ERRPATH-010 | Android | isValid() returns false | showGenericErrorDialog() | User sees error; remains on login screen | [android: LoginActivity.java:if (isValid())] |
| ERRPATH-011 | Android | PIN not stored (empty) | finish() immediately | PinActivity closes without showing PIN entry | [android: PinActivity.java:if (TextUtils.isEmpty(userPin))] |
| ERRPATH-012 | Android | PIN entered incorrectly after 4 digits | Clear input, show status message | Cleared fields; user can retry | [android: PinActivity.java:(else logic after PIN_LENGTH reached)] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | Alamofire | HTTP request library for login endpoint call | URLSession (built-in) or similar RN fetch | [ios: LoginViewController.swift:import Alamofire] |
| DEP-002 | iOS | MBProgressHUD | Progress/spinner display during login | Custom spinner or React Native Activity Indicator | [ios: LoginViewController.swift:import MBProgressHUD] |
| DEP-003 | iOS | UIKit | UIViewController, segues, dialogs | React Native Navigation | [ios: LoginViewController.swift:implicit] |
| DEP-004 | iOS | PreferencesUtils | Credential and config storage | RN AsyncStorage + encrypted storage | [ios: LoginViewController.swift:PreferencesUtils.*] |
| DEP-005 | iOS | UrlUtils | Login URL construction | Custom URL builder in RN | [ios: LoginViewController.swift:UrlUtils.buildLoginUrl] |
| DEP-006 | iOS | CustomColors, Messages | UI styling and localized strings | RN theme/styles, localization library | [ios: LoginViewController.swift:CustomColors.grayDark, Messages.*] |
| DEP-007 | Android | android.content.Intent | Navigation between activities | React Native Navigation | [android: LoginActivity.java:import android.content.Intent] |
| DEP-008 | Android | android.widget.EditText | Credential input fields | React Native TextInput | [android: LoginActivity.java:EditText] |
| DEP-009 | Android | android.widget.Spinner | Language/locale selection | React Native Picker | [android: LoginActivity.java:Spinner] |
| DEP-010 | Android | PreferencesUtils | Credential and config storage | RN AsyncStorage + encrypted storage | [android: LoginActivity.java:PreferencesUtils.*] |
| DEP-011 | Android | StringUtils | Base64 password encoding/decoding | Node crypto or base64 library in RN | [android: LoginActivity.java:StringUtils.encodeBase64/decodeBase64] |
| DEP-012 | Android | HttpStatusUtil | HTTP request utility (currently commented out) | fetch() or axios in RN | [android: LoginActivity.java:HttpStatusUtil.doRequest (commented)] |
| DEP-013 | Android | LanguageResourceUtils | Language/locale mapping | Localization library (i18n) in RN | [android: LoginActivity.java:LanguageResourceUtils.getLocale] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | LoginViewController screen | Display username UITextField with saved value | [ios: LoginViewController.swift:self.userName.text = PreferencesUtils.userName] |
| UI-002 | iOS | LoginViewController screen | Display password UITextField with saved value | [ios: LoginViewController.swift:self.password.text = PreferencesUtils.password] |
| UI-003 | iOS | LoginViewController screen | Show app version (CFBundleShortVersionString.CFBundleVersion) | [ios: LoginViewController.swift:versionLabel.text] |
| UI-004 | iOS | LoginViewController screen | Login button styled with dark gray background and white text | [ios: LoginViewController.swift:configuration.baseForegroundColor = .white, baseBackgroundColor] |
| UI-005 | iOS | LoginViewController screen | Toolbar and labels colored with CustomColors.grayDark | [ios: LoginViewController.swift:toolbar.backgroundColor = CustomColors.grayDark] |
| UI-006 | iOS | PinCodeViewController screen | Display title "Pin Title" (from Messages) | [ios: PinCodeViewController.swift:titleTextField.text = Messages.pinTitle] |
| UI-007 | iOS | PinCodeViewController screen | Display 4-digit PIN entry control (PinCodeView) | [ios: PinCodeViewController.swift:let pincode = PinCodeView()] |
| UI-008 | iOS | PinCodeViewController screen | Display error "invalidPin" in red (initially hidden) | [ios: PinCodeViewController.swift:errorTextField.text = Messages.invalidPin; isHidden = true] |
| UI-009 | Android | LoginActivity screen | Display version (versionName.versionCode) with app abbreviation and debug flag | [android: LoginActivity.java:version.setText(versionText)] |
| UI-010 | Android | LoginActivity screen | Display username EditText with saved user value | [android: LoginActivity.java:user.setText(prefs.user)] |
| UI-011 | Android | LoginActivity screen | Display password EditText with decoded Base64 password | [android: LoginActivity.java:password.setText(StringUtils.decodeBase64(prefs.password))] |
| UI-012 | Android | LoginActivity screen | Display language Spinner with available languages and current selection | [android: LoginActivity.java:spinnerLanguage.setAdapter(dataAdapterLanguage)] |
| UI-013 | Android | LoginActivity screen | Disable language Spinner if only one language available | [android: LoginActivity.java:if (mapLanguages.size() == 1) spinnerLanguage.setEnabled(false)] |
| UI-014 | Android | LoginActivity screen | Login button triggers login action on click | [android: LoginActivity.java:login.setOnClickListener(...)] |
| UI-015 | Android | LoginActivity screen | Settings icon/button for configuration access | [android: LoginActivity.java:settings.setOnClickListener(...)] |
| UI-016 | Android | LoginActivity screen | Licenses icon/button for showing menu | [android: LoginActivity.java:licenses.setOnClickListener(v -> showMenu(v))] |
| UI-017 | Android | PinActivity screen | Display title "Pin Title" (from Messages) | [android: PinActivity.java:titleView] |
| UI-018 | Android | PinActivity screen | Display 4 PIN box TextViews for visual feedback | [android: PinActivity.java:pinBox0, pinBox1, pinBox2, pinBox3] |
| UI-019 | Android | PinActivity screen | Display digit buttons 0-9 | [android: PinActivity.java:button0 to button9] |
| UI-020 | Android | PinActivity screen | Display delete/backspace button | [android: PinActivity.java:buttonDelete] |
| UI-021 | Android | PinActivity screen | Display exit button to return to login | [android: PinActivity.java:buttonExit] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Username | Stored in UserDefaults (plaintext, plist file) | RN must use encrypted storage (Keychain or encrypted library) | [ios: LoginViewController.swift:PreferencesUtils.userName] |
| SEC-002 | iOS | Password | Stored in UserDefaults (plaintext, plist file) | RN must use encrypted storage (Keychain or encrypted library) | [ios: LoginViewController.swift:PreferencesUtils.password] |
| SEC-003 | iOS | HTTP request | Cache-Control: no-cache header used | RN should enforce no-cache and HTTPS only | [ios: LoginViewController.swift:headers = ["Cache-Control": "no-cache"]] |
| SEC-004 | iOS | PIN code | Stored in UserDefaults (plaintext); compared as plaintext | RN should hash PIN or use encrypted storage | [ios: PinCodeViewController.swift:code == self.pinCode] |
| SEC-005 | Android | Username | Stored in SharedPreferences (plaintext, app-private file) | RN must use encrypted storage | [android: LoginActivity.java:user.setText(prefs.user)] |
| SEC-006 | Android | Password | Stored in SharedPreferences (Base64-encoded; not encrypted) | RN must use stronger encryption (encrypted storage lib) | [android: LoginActivity.java:StringUtils.encodeBase64(password)] |
| SEC-007 | Android | PIN code | Stored in SharedPreferences (plaintext) | RN should hash PIN or use encrypted storage | [android: PinActivity.java:userPin = PreferencesUtils.getLoginPreferences().pin] |
| SEC-008 | Android | HTTP request | No explicit security headers documented | RN should enforce HTTPS, no cache, secure headers | [android: LoginActivity.java:(no HTTP security config visible)] |
| SEC-009 | iOS/Android | Error messages | User-facing error dialogs may leak information | RN should use generic error messages in production | [ios/android: showErrorDialog, showGenericErrorDialog] |
| SEC-010 | iOS/Android | Version info | Displayed on login screen | May leak app version to attackers; consider hiding in production | [ios/android: version.text/versionLabel.text] |
