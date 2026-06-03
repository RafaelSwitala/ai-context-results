# Code Facts

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T15:45:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | PreferncesUtils.swift | PreferencesUtils (class) | Static property access (singleton pattern) | [ios: Source/Utils/PreferncesUtils.swift:class PreferencesUtils] |
| EP-002 | iOS | PreferncesUtils.swift | userName, password, server, client, pin, token, httpProtocol properties | Property getters/setters for credential access | [ios: Source/Utils/PreferncesUtils.swift:static var userName] |
| EP-003 | iOS | PreferncesUtils.swift | saveLoginPreferences(_ user: String, password: String) | Static method to batch-save credentials | [ios: Source/Utils/PreferncesUtils.swift:static func saveLoginPreferences] |
| EP-004 | iOS | PreferncesUtils.swift | saveValidLoginPreference(_ isValid: Bool) | Static method to set login validation state | [ios: Source/Utils/PreferncesUtils.swift:static func saveValidLoginPreference] |
| EP-005 | Android | PreferencesUtils.java | PreferencesUtils (class) | Static utility methods for SharedPreferences access | [android: utility/PreferencesUtils.java:class PreferencesUtils] |
| EP-006 | Android | PreferencesUtils.java | getLoginPreferences() | Static method returning LoginPreferences object | [android: utility/PreferencesUtils.java:public static LoginPreferences getLoginPreferences()] |
| EP-007 | Android | PreferencesUtils.java | saveLoginPreferences(String user, String encodedPassword) | Static method to batch-save credentials | [android: utility/PreferencesUtils.java:public static void saveLoginPreferences] |
| EP-008 | Android | PreferencesUtils.java | buildLoginUrlFromPreferences() | Static method to construct login URL from stored preferences | [android: utility/PreferencesUtils.java:public static String buildLoginUrlFromPreferences()] |
| EP-009 | Android | App.java | App.onCreate() | Application initialization; SharedPreferences singleton setup | [android: App.java:public void onCreate()] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Read user credentials | None (implicit context) | String? (userName, password, server, client, pin, token) | [ios: Source/Utils/PreferncesUtils.swift:static var userName get] |
| BEH-002 | iOS | Write user credentials | userName, password, server, client, pin, token (String values) | Stored to UserDefaults | [ios: Source/Utils/PreferncesUtils.swift:static var userName set] |
| BEH-003 | iOS | Read protocol configuration | None | HttpProtocolEnum (.http, .https) | [ios: Source/Utils/PreferncesUtils.swift:static var httpProtocol get] |
| BEH-004 | iOS | Write protocol configuration | HttpProtocolEnum value | Stored to UserDefaults | [ios: Source/Utils/PreferncesUtils.swift:static var httpProtocol set] |
| BEH-005 | iOS | Check login validity | None | Bool (hasValidLogin) | [ios: Source/Utils/PreferncesUtils.swift:static var hasValidLogin get] |
| BEH-006 | iOS | Set login validity | Bool value | Stored to UserDefaults | [ios: Source/Utils/PreferncesUtils.swift:static var hasValidLogin set] |
| BEH-007 | iOS | Batch save login preferences | (user: String, password: String) | Atomic write of userName + password to UserDefaults | [ios: Source/Utils/PreferncesUtils.swift:static func saveLoginPreferences] |
| BEH-008 | Android | Read login preferences | None | LoginPreferences object with all fields | [android: PreferencesUtils.java:public static LoginPreferences getLoginPreferences()] |
| BEH-009 | Android | Write login preferences | (server, client, token, pin, protocol: int) | Atomic write via SharedPreferences.Editor.commit() | [android: PreferencesUtils.java:public static void saveSettingsPreferences] |
| BEH-010 | Android | Write protocol preference | protocol: int (0, 1, or 2) | Stored via SharedPreferences.Editor | [android: PreferencesUtils.java:public static void saveProtocolPreference] |
| BEH-011 | Android | Build login URL from preferences | None | String (formatted login URL with server, client, user, password, protocol) | [android: PreferencesUtils.java:public static String buildLoginUrlFromPreferences()] |
| BEH-012 | Android | Replace legacy Douglas server name | None | Updates SharedPreferences if old hostname found | [android: PreferencesUtils.java:public static void replaceDouglasServerName()] |
| BEH-013 | Android | Save and load locale | locale: String | Stored to SharedPreferences via apply() | [android: PreferencesUtils.java:public static void saveLocale, getLocale] |
| BEH-014 | Android | Config version tracking | version: String | Stored to SharedPreferences for migration detection | [android: PreferencesUtils.java:saveCurrentConfigVersion, getCurrentConfigVersion] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | No stored credentials | saveLoginPreferences() called | Credentials stored in UserDefaults | [ios: Source/Utils/PreferncesUtils.swift:userName, password set] |
| STATE-002 | iOS | Credentials stored | Preferences read accessed | In-memory caching (implicit via UserDefaults) | [ios: Source/Utils/PreferncesUtils.swift:sharedPreferences get/set] |
| STATE-003 | iOS | hasValidLogin = false | saveValidLoginPreference(true) | hasValidLogin = true | [ios: Source/Utils/PreferncesUtils.swift:hasValidLogin set] |
| STATE-004 | iOS | httpProtocol = default (.https) | httpProtocol setter called | httpProtocol = new enum value | [ios: Source/Utils/PreferncesUtils.swift:httpProtocol set] |
| STATE-005 | Android | SharedPreferences not initialized | App.onCreate() | SharedPreferences = PreferenceManager.getDefaultSharedPreferences(this) | [android: App.java:onCreate()] |
| STATE-006 | Android | Credentials not stored | saveSettingsPreferences() | Credentials stored, editor.commit() flushes to storage | [android: PreferencesUtils.java:saveSettingsPreferences(String,...)] |
| STATE-007 | Android | protocol unknown | saveProtocolPreference(int protocol) | protocol stored (0, 1, or 2); validation applied | [android: PreferencesUtils.java:saveProtocolPreference] |
| STATE-008 | Android | Old Douglas hostname | replaceDouglasServerName() called | New hostname stored (DNS rule change, Android 12 compat) | [android: PreferencesUtils.java:replaceDouglasServerName] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | UserDefaults.standard (singleton) | Read/Write | String, Bool, Int (via Keys enum) | [ios: Source/Utils/PreferncesUtils.swift:private static var sharedPreferences] |
| STOR-002 | iOS | mb_userName_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.userName] |
| STOR-003 | iOS | mb_password_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.password] |
| STOR-004 | iOS | mb_server_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.server] |
| STOR-005 | iOS | mb_client_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.client] |
| STOR-006 | iOS | mb_pin_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.pin] |
| STOR-007 | iOS | mb_token_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.token] |
| STOR-008 | iOS | mb_url_key | Read/Write | String? | [ios: Source/Utils/PreferncesUtils.swift:Keys.url] |
| STOR-009 | iOS | mb_httpProtocol_key | Read/Write | Int (raw value of enum) | [ios: Source/Utils/PreferncesUtils.swift:Keys.httpProtocol] |
| STOR-010 | iOS | mb_valid_settings_key | Read/Write | Bool | [ios: Source/Utils/PreferncesUtils.swift:Keys.hasValidSettings] |
| STOR-011 | iOS | mb_valid_login_key | Read/Write | Bool | [ios: Source/Utils/PreferncesUtils.swift:Keys.hasValidLogin] |
| STOR-012 | iOS | mb_isValid_key | Read/Write | Bool (marked as unused 2023-10-17) | [ios: Source/Utils/PreferncesUtils.swift:Keys.isValid] |
| STOR-013 | Android | SharedPreferences (default via PreferenceManager) | Read/Write | String, Int, Bool | [android: App.java:SharedPreferences = PreferenceManager.getDefaultSharedPreferences(this)] |
| STOR-014 | Android | preference_server_key | Read/Write | String | [android: PreferencesUtils.java:SERVER = "preference_server_key"] |
| STOR-015 | Android | preference_client_key | Read/Write | String | [android: PreferencesUtils.java:CLIENT = "preference_client_key"] |
| STOR-016 | Android | preference_user_key | Read/Write | String | [android: PreferencesUtils.java:USER = "preference_user_key"] |
| STOR-017 | Android | preference_password_key | Read/Write | String (encoded) | [android: PreferencesUtils.java:PASSWORD = "preference_password_key"] |
| STOR-018 | Android | preference_pin_key | Read/Write | String | [android: PreferencesUtils.java:PIN = "preference_pin_key"] |
| STOR-019 | Android | preference_token_key | Read/Write | String | [android: PreferencesUtils.java:TOKEN = "preference_token_key"] |
| STOR-020 | Android | preference_protocol_key | Read/Write | Int (0, 1, 2) | [android: PreferencesUtils.java:PROTOCOL = "preference_protocol_key"] |
| STOR-021 | Android | preference_valid_settings_key | Read/Write | Boolean | [android: PreferencesUtils.java:HAS_VALID_SETTINGS] |
| STOR-022 | Android | preference_valid_login_key | Read/Write | Boolean | [android: PreferencesUtils.java:HAS_VALID_LOGIN] |
| STOR-023 | Android | preference_sel_local_key | Read/Write | String (locale like "en-US", "de-DE") | [android: PreferencesUtils.java:LOCALE_SYMBOL] |
| STOR-024 | Android | preference_current_config_version_key | Read/Write | String | [android: PreferencesUtils.java:CURRENT_CONFIG_VERSION] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|---|
| API-001 | iOS | saveLoginPreferences() | UserDefaults.set() | (String, String) tuple | void (side effect: stored) | [ios: PreferncesUtils.swift:saveLoginPreferences] |
| API-002 | iOS | string(forKey:) | UserDefaults.standard | Key name (String) | String? or default | [ios: PreferncesUtils.swift:sharedPreferences.string] |
| API-003 | iOS | set(newValue, forKey:) | UserDefaults.standard | Key + Value | void (persisted) | [ios: PreferncesUtils.swift:sharedPreferences.set] |
| API-004 | iOS | integer(forKey:) | UserDefaults.standard | Key name | Int (protocol enum value) | [ios: PreferncesUtils.swift:sharedPreferences.integer] |
| API-005 | iOS | bool(forKey:) | UserDefaults.standard | Key name | Bool (validation flags) | [ios: PreferncesUtils.swift:sharedPreferences.bool] |
| API-006 | Android | getLoginPreferences() | SharedPreferences.getString/getInt/getBoolean | Key names | LoginPreferences object | [android: PreferencesUtils.java:getLoginPreferences] |
| API-007 | Android | saveSettingsPreferences() | SharedPreferences.Editor.put* + commit() | (server, client, token, pin, protocol) | void | [android: PreferencesUtils.java:saveSettingsPreferences] |
| API-008 | Android | saveLoginPreferences() | SharedPreferences.Editor.put* + commit() | (user, password) | void | [android: PreferencesUtils.java:saveLoginPreferences] |
| API-009 | Android | PreferenceManager.getDefaultSharedPreferences() | Android framework | Context | SharedPreferences instance | [android: App.java:onCreate()] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | PreferencesUtils (any caller) | UserDefaults.standard | Always (singleton pattern) | [ios: PreferncesUtils.swift:sharedPreferences static var] |
| NAV-002 | Android | App.onCreate() | PreferenceManager.getDefaultSharedPreferences() | On app startup | [android: App.java:onCreate()] |
| NAV-003 | Android | PreferencesUtils (any method) | App.getInstance().SharedPreferences | Always (dependency) | [android: PreferencesUtils.java:App.getInstance().SharedPreferences] |
| NAV-004 | Android | SettingsActivity | PreferencesUtils methods | On user interaction (save/load settings) | [android: SettingsActivity.java:onCreate(), save button handler] |
| NAV-005 | iOS | SettingsViewController (implied) | PreferencesUtils | When displaying or saving settings | [ios: PreferncesUtils.swift:used as utility] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | UserDefaults not available | Implicit nil return | Property returns nil; calling code must handle optional | [ios: PreferncesUtils.swift:static var userName get] |
| ERRPATH-002 | iOS | Invalid enum value stored | Fallback to default (.https) | httpProtocol defaults to .https if raw value invalid | [ios: PreferncesUtils.swift:HttpProtocolEnum(rawValue: rawValue) ?? .https] |
| ERRPATH-003 | Android | SharedPreferences null | Early return or exception | buildLoginUrlFromPreferences() checks null and returns empty string | [android: PreferencesUtils.java:if (sharedpreferences != null)] |
| ERRPATH-004 | Android | Protocol value out of range | Early return (no-op) | saveProtocolPreference() validates 0-2 range | [android: PreferencesUtils.java:if (protocol < PROTOCOL_HTTP ...)] |
| ERRPATH-005 | Android | Empty string values | Empty string stored | saveSettingsPreferences() uses TextUtils.isEmpty() checks | [android: PreferencesUtils.java:!TextUtils.isEmpty(client)] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | Foundation framework | UserDefaults access | Implicit (no external lib) | [ios: PreferncesUtils.swift:import Foundation] |
| DEP-002 | iOS | UIKit (indirect) | App integration | Implicit via iOS SDK | [ios: AppSettings.swift:import UIKit] |
| DEP-003 | Android | android.content.SharedPreferences | Android preferences API | androidx.preference.PreferenceManager (already used) | [android: App.java:import android.content.SharedPreferences] |
| DEP-004 | Android | androidx.preference.PreferenceManager | Standard preference access | Replacement: DataStore (modern alternative, but not yet implemented) | [android: App.java:import androidx.preference.PreferenceManager] |
| DEP-005 | Android | android.text.TextUtils | String validation | java.lang.String methods (replacement) | [android: PreferencesUtils.java:TextUtils.isEmpty] |
| DEP-006 | Android | LoginPreferences (custom) | Data container for credentials | Plain data object | [android: PreferencesUtils.java:LoginPreferences prefs] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | SettingsViewController (implied) | Display current server, client, pin, token from PreferencesUtils | [ios: PreferncesUtils.swift:used as backend for settings] |
| UI-002 | iOS | Settings UI (implied) | Save user input via PreferencesUtils properties | [ios: PreferncesUtils.swift:static var setters] |
| UI-003 | iOS | Settings UI (implied) | Show/update protocol selection (HTTP/HTTPS) | [ios: PreferncesUtils.swift:httpProtocol property] |
| UI-004 | Android | SettingsActivity | Display server, client, pin, token from getLoginPreferences() | [android: SettingsActivity.java:onCreate(), setText(prefs.*)] |
| UI-005 | Android | SettingsActivity | Spinner shows protocol options based on PROTOCOL_* constants | [android: SettingsActivity.java:spinnerProtocol.setSelection() using protocol int] |
| UI-006 | Android | SettingsActivity | Save button calls PreferencesUtils.saveSettingsPreferences() | [android: SettingsActivity.java:save button handler (implied)] |
| UI-007 | Android | SettingsActivity | Language/locale selection persisted via PreferencesUtils.saveLocale() | [android: PreferencesUtils.java:saveLocale(), getLocale()] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | username, password, token | Stored in UserDefaults (plaintext in plist) | RN must use Keychain or secure storage library | [ios: PreferncesUtils.swift:password key] |
| SEC-002 | iOS | server, client, pin | Stored in UserDefaults (plaintext) | RN can use standard AsyncStorage (non-sensitive) or secure library | [ios: PreferncesUtils.swift:server, client, pin keys] |
| SEC-003 | iOS | Validation flags (hasValidLogin) | Stored in UserDefaults (plaintext) | RN can use standard AsyncStorage | [ios: PreferncesUtils.swift:hasValidLogin] |
| SEC-004 | Android | username, password, token | Stored in SharedPreferences (plaintext file, app-private) | RN must use encrypted SharedPreferences or Keychain wrapper | [android: PreferencesUtils.java:PASSWORD, TOKEN keys] |
| SEC-005 | Android | server, client, pin | Stored in SharedPreferences (plaintext, app-private) | RN can use standard AsyncStorage | [android: PreferencesUtils.java:SERVER, CLIENT, PIN] |
| SEC-006 | Android | Validation flags | Stored in SharedPreferences (plaintext) | RN can use standard AsyncStorage | [android: PreferencesUtils.java:HAS_VALID_LOGIN] |
| SEC-007 | iOS | Protocol (HTTP/HTTPS) selection | Stored in UserDefaults; encryption/validation at transport layer | RN should enforce HTTPS default in network layer | [ios: PreferncesUtils.swift:httpProtocol property] |
| SEC-008 | Android | Protocol selection | Stored in SharedPreferences; no transport-layer enforcement in storage | RN network layer must enforce protocol choice | [android: PreferencesUtils.java:PROTOCOL constant] |
| SEC-009 | iOS | Config version | Stored for migration; not security-sensitive | RN can track version in AsyncStorage | [ios: (implicit, iOS has similar needs)] |
| SEC-010 | Android | Config version, locale | Stored in SharedPreferences for app state tracking | RN can store in AsyncStorage | [android: PreferencesUtils.java:CURRENT_CONFIG_VERSION, LOCALE_SYMBOL] |
