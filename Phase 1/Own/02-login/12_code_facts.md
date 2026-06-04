# Code Facts

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/12_code_facts.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `LoginButtonTouchUp` | Tap auf Anmelden | [ios: MobileBrowserV2/Source/LoginViewController.swift:106 symbol=LoginButtonTouchUp] |
| EP-002 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | login `onClick` | Tap auf Login Button | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:137 symbol=onClick] |
| EP-003 | iOS | MobileBrowserV2/Source/LoginViewController.swift | `openSettingsButtonTapped` | Klick auf Settings Icon bzw. invalid settings in `viewDidLoad` | [ios: MobileBrowserV2/Source/LoginViewController.swift:89 symbol=openSettingsButtonTapped] |
| EP-004 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java | `onCreate` gating | Activity Start mit invalid settings | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:117 symbol=onCreate] |
| EP-005 | iOS | MobileBrowserV2/Source/AppDelegate.swift | `logout` | App geht in Background (`saveContext`) | [ios: MobileBrowserV2/Source/AppDelegate.swift:32 symbol=logout] |
| EP-006 | Android | app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java | `logout` | Lifecycle `onPause` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:122 symbol=logout] |

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
| STATE-001 | iOS | `hasValidLogin=false` | erfolgreicher Login-Response ohne Error-Code | `hasValidLogin=true` | [ios: MobileBrowserV2/Source/LoginViewController.swift:151 symbol=LoginButtonTouchUp] |
| STATE-002 | Android | `hasValidLogin=false` | Login button path erfolgreich | `hasValidLogin=true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:172 symbol=onClick] |
| STATE-003 | iOS | `hasValidLogin=true/false` | App geht in Background | `hasValidLogin=false` | [ios: MobileBrowserV2/Source/AppDelegate.swift:35 symbol=logout] |
| STATE-004 | Android | `hasValidLogin=true/false` | Process `onPause` | `hasValidLogin=false` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:124 symbol=logout] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | `mb_userName_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:18 symbol=userName] |
| STOR-002 | iOS | `mb_password_key` | RW | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:19 symbol=password] |
| STOR-003 | iOS | `mb_valid_login_key` | RW | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:30 symbol=hasValidLogin] |
| STOR-004 | iOS | `mb_valid_settings_key` | R (Login gate) | Bool | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:29 symbol=hasValidSettings] |
| STOR-005 | iOS | `mb_pin_key` | R (Settings gate) | String | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:23 symbol=pin] |
| STOR-006 | Android | `preference_user_key` | RW | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:16 symbol=USER] |
| STOR-007 | Android | `preference_password_key` | RW | String (base64 encoded) | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:17 symbol=PASSWORD] |
| STOR-008 | Android | `preference_valid_login_key` | RW | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:24 symbol=HAS_VALID_LOGIN] |
| STOR-009 | Android | `preference_valid_settings_key` | R (Login gate) | Bool | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:23 symbol=HAS_VALID_SETTINGS] |
| STOR-010 | Android | `preference_pin_key` | R (PIN gate) | String | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:19 symbol=PIN] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | GET | `AF.request(buildLoginUrl)` | URL mit user, optional password(base64), App parameter | HTTP status + optional `Error` query | [ios: MobileBrowserV2/Source/LoginViewController.swift:139 symbol=AF.request] |
| API-002 | Android | URL build for WebView | `PreferencesUtils.buildLoginUrl` | URL mit user, optional encodedPassword, App + Culture | URL wird an WebView übergeben | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:222 symbol=buildLoginUrl] |
| API-003 | Cross | Delete Session (logout) | `PeApiHelper.doDeleteUser` / `RequestUtils.killUserSessions` | token + user aus preferences | serverseitiger Session-Cleanup best effort | [ios: MobileBrowserV2/Source/AppDelegate.swift:38 symbol=logout] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/App.java:128 symbol=logout] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | Login | WebView | Login success ohne Error-Code | [ios: MobileBrowserV2/Source/LoginViewController.swift:155 symbol=LoginButtonTouchUp] |
| NAV-002 | Android | LoginActivity | WebviewActivity | `isValid()==true` | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:174 symbol=onClick] |
| NAV-003 | iOS | Login | Settings oder PIN | `hasValidSettings=false` bzw. PIN vorhanden | [ios: MobileBrowserV2/Source/LoginViewController.swift:92 symbol=openSettingsButtonTapped] |
| NAV-004 | Android | LoginActivity | SettingsActivity oder PinActivity | `hasValidSettings=false` + PIN-Bedingung | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:119 symbol=onCreate] |
| NAV-005 | Cross | PIN screen | Settings | PIN korrekt | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:80 symbol=performSegue] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:174 symbol=openSettings] |

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
| UI-001 | iOS | Login screen | Prefillt user/password aus Preferences bei `viewWillAppear` | [ios: MobileBrowserV2/Source/LoginViewController.swift:38 symbol=viewWillAppear] |
| UI-002 | Android | Login screen | Prefillt user/password (decoded) aus Preferences | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginActivity.java:129 symbol=onCreate] |
| UI-003 | iOS | PIN screen | Zeigt invalid-pin Text und leert Eingabe bei falscher PIN | [ios: MobileBrowserV2/Source/PinCodeViewController.swift:67 symbol=setupUI] |
| UI-004 | Android | PIN screen | Zeigt invalid PIN rot; Exit/Delete verfügbar | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/PinActivity.java:116 symbol=onClick] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | password in preferences | Unverschlüsselt in UserDefaults sichtbar | RN soll sensibles Feld in secure storage speichern | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:45 symbol=password] |
| SEC-002 | Android | password base64 in preferences | Base64 ist keine kryptografische Absicherung | RN soll echte sichere Speicherung verwenden | [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:109 symbol=saveLoginPreferences] |
| SEC-003 | Cross | PIN in preferences | Klartextähnliche Persistenz | RN soll PIN mindestens verschlüsselt ablegen | [ios: MobileBrowserV2/Source/Utils/PreferncesUtils.swift:72 symbol=pin] [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:63 symbol=getLoginPreferences] |
