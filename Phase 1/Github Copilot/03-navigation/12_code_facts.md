# Code Facts

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T19:00:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | AppDelegate.swift | application:didFinishLaunchingWithOptions | App launch | [ios: Source/AppDelegate.swift:func application] |
| EP-002 | iOS | SceneDelegate.swift | scene:willConnectTo | Scene connection (iOS 13+) | [ios: Source/SceneDelegate.swift:func scene] |
| EP-003 | iOS | Main.storyboard | LoginView (initial ViewController) | Storyboard initialization | [ios: Source/Base.lproj/Main.storyboard:initialViewController] |
| EP-004 | iOS | LoginViewController.swift | performSegue(withIdentifier:) | Screen transition | [ios: Source/LoginViewController.swift:performSegue] |
| EP-005 | iOS | WebsiteViewController.swift | performSegue(withIdentifier: "BACK_TO_LOGIN") | Logout navigation | [ios: Source/WebsiteViewController.swift:performSegue] |
| EP-006 | Android | App.java | onCreate() | App launch | [android: app/src/main/java/.../App.java:public void onCreate] |
| EP-007 | Android | LoginActivity.java | startActivity(intent) | Activity start | [android: LoginActivity.java:startActivity(intent)] |
| EP-008 | Android | BarcodeCaptureActivity.java | startActivity() + finish() | Navigation with finish | [android: BarcodeCaptureActivity.java:startActivity + finish] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Present segue (modal transition) | segue identifier, destination VC | Modal screen shown; transition animates | [ios: Source/WebsiteViewController.swift:performSegue(withIdentifier:)] |
| BEH-002 | iOS | Prepare segue for data passing | segue identifier, sender | Destination receives data via prepare(for:) | [ios: Source/LoginViewController.swift:prepare(for segue:)] |
| BEH-003 | iOS | Unwind segue to previous screen | unwind identifier | Pop to source screen | [ios: Source/WebsiteWrapperViewController.swift:@IBAction func unwindToWebview] |
| BEH-004 | iOS | Set initial ViewController from storyboard | storyboardIdentifier | Screen loaded as first screen | [ios: Source/Base.lproj/Main.storyboard:initialViewController=LoginView] |
| BEH-005 | iOS | App lifecycle logout navigation | logout called | Navigate back to LoginViewController | [ios: Source/AppDelegate.swift:func logout] |
| BEH-006 | iOS | Session check on foreground | applicationWillEnterForeground | Check hasValidLoginPreference; navigate if invalid | [ios: Source/WebsiteViewController.swift:applicationWillEnterForeground] |
| BEH-007 | Android | Start Activity with Intent | Intent(context, targetActivity) | Target activity started, new stack frame | [android: BarcodeCaptureActivity.java:Intent intent = new Intent] |
| BEH-008 | Android | Pass data via Intent extras | intent.putExtra(key, value) | Data accessible in target activity via getIntent() | [android: BarcodeCaptureActivity.java:intent.putExtra(App.URL, url)] |
| BEH-009 | Android | Finish activity (back navigation) | finish() | Current activity removed from stack; previous exposed | [android: BarcodeCaptureActivity.java:finish()] |
| BEH-010 | Android | App lifecycle on pause | App.onPause() | Logout called; session ended | [android: App.java:public void onPause] |
| BEH-011 | Android | Get Intent data in Activity | getIntent().getExtras().getString(key) | Data retrieved from Intent | [android: BarcodeCaptureActivity.java:getIntent().getExtras().getString(App.URL)] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | App start | didFinishLaunchingWithOptions | Scene connected | [ios: AppDelegate.swift:didFinishLaunchingWithOptions] |
| STATE-002 | iOS | Scene connected | scene:willConnectTo | Initial ViewController (LoginView) shown | [ios: SceneDelegate.swift:scene:willConnectTo] |
| STATE-003 | iOS | LoginViewController | User taps login success segue | WebsiteWrapperViewController presented | [ios: LoginViewController.swift:performSegue(WEBVIEW)] |
| STATE-004 | iOS | WebsiteViewController | Logout button tapped | performSegue(BACK_TO_LOGIN) | [ios: WebsiteViewController.swift:barButtonTouched] |
| STATE-005 | iOS | WebsiteViewController | App enters background | Session invalidated; logout called | [ios: WebsiteViewController.swift:applicationWillEnterForeground] |
| STATE-006 | iOS | PinCodeViewController | PIN entered correctly | performSegue(BACK_TO_LOGIN) or SETTINGS | [ios: PinCodeViewController.swift:performSegue] |
| STATE-007 | Android | App start | onCreate | App singleton initialized | [android: App.java:onCreate] |
| STATE-008 | Android | App background | onPause | logout(); session invalid | [android: App.java:onPause] |
| STATE-009 | Android | LoginActivity | User taps login success | startActivity(WebviewActivity) | [android: LoginActivity.java:startActivity] |
| STATE-010 | Android | BarcodeCaptureActivity | Barcode scanned | Intent to WebviewActivity + finish() | [android: BarcodeCaptureActivity.java:startActivity + finish] |
| STATE-011 | Android | WebviewActivity | Error condition | startActivity(LoginActivity) + finish() | [android: BarcodeCaptureActivity.java (implicit)] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | hasValidLoginPreference | Read | Bool | [ios: WebsiteViewController.swift:PreferencesUtils.hasValidLoginPreference()] |
| STOR-002 | Android | hasValidLogin (SharedPreferences) | Read | Boolean | [android: App.java (implicit in session check)] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | PeApiHelper.doDeleteUser() | Logout API call | POST/DELETE to backend | Success/failure callback | [ios: AppDelegate.swift:PeApiHelper.doDeleteUser] |
| API-002 | iOS | PeApiHelper.doDeleteUser() | User session cleanup | Delete session/token | Session terminated | [ios: WebsiteViewController.swift:PeApiHelper.doDeleteUser] |
| API-003 | Android | RequestUtils.killUserSessions() | Logout API call | POST/DELETE to backend | Session terminated | [android: App.java:utils.killUserSessions] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | LoginViewController | WebsiteWrapperViewController | Segue "WEBVIEW" on login success | [ios: LoginViewController.swift:performSegue(WEBVIEW)] |
| NAV-002 | iOS | LoginViewController | PinCodeViewController | Segue "PINCODE" if PIN exists | [ios: LoginViewController.swift:performSegue(PINCODE)] |
| NAV-003 | iOS | LoginViewController | SettingsViewController | Segue "SETTINGS" if no PIN | [ios: LoginViewController.swift:performSegue(SETTINGS)] |
| NAV-004 | iOS | WebsiteViewController | LoginViewController | Segue "BACK_TO_LOGIN" on logout | [ios: WebsiteViewController.swift:performSegue(BACK_TO_LOGIN)] |
| NAV-005 | iOS | WebsiteViewController | ArticleScannerViewController | Unwind segue from scanner | [ios: WebsiteWrapperViewController.swift:unwindToWebview] |
| NAV-006 | Android | LoginActivity | WebviewActivity | Intent to WebviewActivity on success | [android: LoginActivity.java:startActivity(WebviewActivity)] |
| NAV-007 | Android | LoginActivity | PinActivity | Intent to PinActivity if PIN set | [android: LoginActivity.java:startActivity(PinActivity)] |
| NAV-008 | Android | LoginActivity | SettingsActivity | Intent to SettingsActivity if no PIN | [android: LoginActivity.java:startActivity(SettingsActivity)] |
| NAV-009 | Android | BarcodeCaptureActivity | WebviewActivity | Intent to WebviewActivity with scanned URL | [android: BarcodeCaptureActivity.java:startActivity(WebviewActivity)] |
| NAV-010 | Android | BarcodeCaptureActivity | LoginActivity | Intent to LoginActivity on error | [android: BarcodeCaptureActivity.java:startActivity(LoginActivity)] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | Session invalid on foreground | Check hasValidLoginPreference; navigate if false | Force logout; return to login screen | [ios: WebsiteViewController.swift:applicationWillEnterForeground] |
| ERRPATH-002 | iOS | Logout API fails | Continue navigation despite error | User logged out locally even if API fails | [ios: AppDelegate.swift:logout handler] |
| ERRPATH-003 | Android | Session invalid on pause | onPause calls logout; kill sessions | User logged out; app clean state | [android: App.java:onPause] |
| ERRPATH-004 | Android | Intent.getExtras() returns null | Handle null gracefully | Activity may have no data; use defaults | [android: BarcodeCaptureActivity.java (implicit)] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | UIKit | UIViewController, Segue, Storyboard | React Native Navigation | [ios: AppDelegate.swift (implicit)] |
| DEP-002 | iOS | UIStoryboard | Storyboard-based navigation | React Navigation Navigator | [ios: Main.storyboard] |
| DEP-003 | Android | android.content.Intent | Start activities, pass data | React Navigation | [android: LoginActivity.java (import Intent)] |
| DEP-004 | Android | android.app.Application | App singleton, lifecycle | React Native App.tsx entry point | [android: App.java extends Application] |
| DEP-005 | iOS/Android | Session/Login state | Track valid login status across app | Redux or Context API in RN | [ios: PreferencesUtils, android: App] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | Modal transition | Segue uses "crossDissolve" animation | [ios: LoginViewController modalTransitionStyle] |
| UI-002 | iOS | Navigation bar | Implicit back button in navigation stack | [ios: UIStoryboardSegue behavior] |
| UI-003 | Android | Activity stack | Back button managed by OS; finish() pops stack | [android: Activity lifecycle] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Session state | Stored in PreferencesUtils; plaintext | RN must use encrypted storage | [ios: PreferencesUtils.hasValidLoginPreference] |
| SEC-002 | Android | Session state | Stored in SharedPreferences; plaintext | RN must use encrypted storage | [android: App.java, PreferencesUtils] |
| SEC-003 | iOS/Android | Navigation intent/segue data | URL parameters, error codes passed between screens | RN should sanitize/validate route params | [ios/android: Intent.putExtra, prepare(for:)] |
