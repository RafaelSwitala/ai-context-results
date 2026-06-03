# Code Facts

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A12 |
| Artifact Path | artifacts/settings/claude/20260602-005/phase_1/12_code_facts.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:25:00Z |

## Entry Points

| ID | Platform | File | Symbol | Trigger | Source |
|---|---|---|---|---|---|
| EP-001 | iOS | SettingsViewContoller.swift | viewDidLoad() | Settings screen displayed | [ios: Source/SettingsViewContoller.swift:override func viewDidLoad] |
| EP-002 | iOS | SettingsViewContoller.swift | cancelTouched() | Cancel button tapped | [ios: Source/SettingsViewContoller.swift:@IBAction func cancelTouched] |
| EP-003 | iOS | SettingsViewContoller.swift | saveTouched() | Save button tapped | [ios: Source/SettingsViewContoller.swift:@IBAction func saveTouched] |
| EP-004 | Android | SettingsActivity.java | onCreate() | Settings activity created | [android: SettingsActivity.java:protected void onCreate] |
| EP-005 | Android | SettingsActivity.java | save.setOnClickListener() | Save button listener | [android: SettingsActivity.java:save.setOnClickListener] |
| EP-006 | Android | SettingsActivity.java | displayQRCode.setOnClickListener() | QR code button listener | [android: SettingsActivity.java:displayQRCode.setOnClickListener] |

## Behaviors

| ID | Platform | Behavior | Inputs | Outputs | Source |
|---|---|---|---|---|---|
| BEH-001 | iOS | Load settings from PreferencesUtils | viewDidLoad() | TextFields populated; Switch state set | [ios: Source/SettingsViewContoller.swift:self.server.text = PreferencesUtils.server] |
| BEH-002 | iOS | Validate settings (server + PIN) | Form filled | isValid() returns true/false | [ios: Source/SettingsViewContoller.swift:private func isValid() -> Bool] |
| BEH-003 | iOS | Check PIN length (0 or 4) | PIN text | isPinValid() returns true if valid | [ios: Source/SettingsViewContoller.swift:private func isPinValid() -> Bool] |
| BEH-004 | iOS | Test server access before save | AF.request to URL | 200 response = valid; error = invalid | [ios: Source/SettingsViewContoller.swift:AF.request(url, headers: headers).responseData] |
| BEH-005 | iOS | Save settings after validation | Validated fields | PreferencesUtils.saveSettingsPreferences() called | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.saveSettingsPreferences(...)] |
| BEH-006 | iOS | Hide Cancel button if no valid config | hasValidSettings flag | Cancel button hidden | [ios: Source/SettingsViewContoller.swift:if PreferencesUtils.hasValidSettings {...} else { self.cancelButton.isHidden = true }] |
| BEH-007 | Android | Load settings and language | onCreate() | EditTexts/Spinners populated from SharedPreferences | [android: SettingsActivity.java:server.setText(prefs.server)] |
| BEH-008 | Android | Show 3 protocol options in spinner | onCreate() | Spinner populated: HTTP, HTTPS, HTTPS-no-validation | [android: SettingsActivity.java:securityProtocol.add(getResources().getString...)] |
| BEH-009 | Android | Validate and test server URL | Save button clicked | HttpStatusUtil returns status code | [android: SettingsActivity.java:Map.Entry<Integer, String> httpStatus = HttpStatusUtil.getHttpStatus(url)] |
| BEH-010 | Android | Save settings after successful validation | isValid() true + HTTP 200 | saveSettingsPreferences called; navigate to LoginActivity | [android: SettingsActivity.java:PreferencesUtils.saveSettingsPreferences(...)] |
| BEH-011 | iOS | Display loading spinner | Save in progress | HUD shown; button disabled temporarily | [ios: Source/SettingsViewContoller.swift:self.showSpinner()] |
| BEH-012 | Android | Disable save button during HTTP request | HTTP check in progress | Button disabled | [android: SettingsActivity.java:v.setEnabled(false)] |
| BEH-013 | iOS | Parse QR code and populate fields | QR scanned + unwind segue | initViews() updates server, client, protocol, token, pin | [ios: Source/SettingsViewContoller.swift:func initViews(_ settings: QRCodeSettings)] |
| BEH-014 | Android | Parse QR code in onActivityResult | QRCodeScannerActivity returns data | fillControlsFromQRCode() populates fields | [android: SettingsActivity.java:protected void onActivityResult] |

## State And Transitions

| ID | Platform | From | Event | To | Source |
|---|---|---|---|---|---|
| STATE-001 | iOS | App launch | Settings segue triggered | SettingsViewController viewDidLoad; preferences loaded | [ios: Source/SettingsViewContoller.swift:override func viewDidLoad] |
| STATE-002 | iOS | Settings displayed | User taps Cancel | dismiss(animated: true); return to previous screen | [ios: Source/SettingsViewContoller.swift:@IBAction func cancelTouched] |
| STATE-003 | iOS | Settings displayed | User taps Save + invalid | Error dialog shown; no state change | [ios: Source/SettingsViewContoller.swift:if isValid() { ... } else { showSettingsErrorDialog() }] |
| STATE-004 | iOS | Settings displayed | User taps Save + valid | AF.request checks URL; if 200: save preferences; dismiss | [ios: Source/SettingsViewContoller.swift:AF.request(url, headers: headers).responseData] |
| STATE-005 | iOS | Settings displayed | User taps QR scanner | Segue to QrCodeScannerViewController | [ios: Source/SettingsViewContoller.swift:@IBAction func startQRCodeScanner] |
| STATE-006 | iOS | QR scanner returns | User scans QR code + unwind | initViews() called; fields repopulated | [ios: Source/SettingsViewContoller.swift:@IBAction func unwindToSettings(segue:] |
| STATE-007 | Android | App launch | Settings intent triggered | SettingsActivity onCreate; preferences loaded | [android: SettingsActivity.java:protected void onCreate] |
| STATE-008 | Android | Settings displayed | User changes language | Spinner onItemSelected fires; saveLocale() called | [android: SettingsActivity.java:spinnerLanguage.setOnItemSelectedListener] |
| STATE-009 | Android | Settings displayed | User taps Save + valid | URL checked; if 200: save preferences; startActivity LoginActivity | [android: SettingsActivity.java:save.setOnClickListener] |
| STATE-010 | Android | Settings displayed | User taps QR code | startActivityForResult QRCodeScannerActivity | [android: SettingsActivity.java:displayQRCode.setOnClickListener] |

## Storage

| ID | Platform | Key/Store | Read/Write/Delete | Value Type | Source |
|---|---|---|---|---|---|
| STOR-001 | iOS | PreferencesUtils.server | Read/Write | String | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.server] |
| STOR-002 | iOS | PreferencesUtils.client | Read/Write | String | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.client] |
| STOR-003 | iOS | PreferencesUtils.isHttps | Read/Write | Bool | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.isHttps] |
| STOR-004 | iOS | PreferencesUtils.token | Read/Write | String | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.token] |
| STOR-005 | iOS | PreferencesUtils.pin | Read/Write | String | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.pin] |
| STOR-006 | iOS | PreferencesUtils.hasValidSettings | Read/Write | Bool | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.hasValidSettings] |
| STOR-007 | Android | SharedPreferences (SERVER, CLIENT, PROTOCOL, TOKEN, PIN) | Read/Write | String/Int | [android: SettingsActivity.java:PreferencesUtils.getLoginPreferences()] |
| STOR-008 | Android | SharedPreferences (LOCALE_SYMBOL) | Read/Write | String | [android: SettingsActivity.java:PreferencesUtils.saveLocale(locale)] |
| STOR-009 | Android | SharedPreferences (HAS_VALID_SETTINGS) | Read/Write | Boolean | [android: SettingsActivity.java:PreferencesUtils.saveValidSettingsPreference(true)] |

## API Calls

| ID | Platform | Method | Endpoint/Client | Request | Response | Source |
|---|---|---|---|---|---|
| API-001 | iOS | AF.request() with headers | buildCheckAccessUrl() | HTTP GET with Cache-Control: no-cache | 200 OK or error | [ios: Source/SettingsViewContoller.swift:AF.request(url, headers: headers).responseData] |
| API-002 | Android | HttpStatusUtil.getHttpStatus() | buildCheckAccessUrl() | HTTP GET to verify settings | status code + message | [android: SettingsActivity.java:HttpStatusUtil.getHttpStatus(url)] |

## Navigation

| ID | Platform | From | To | Condition | Source |
|---|---|---|---|---|---|
| NAV-001 | iOS | SettingsViewController | QrCodeScannerViewController | User taps QR scanner button | [ios: Source/SettingsViewContoller.swift:performSegue(withIdentifier: "QRCODE_SCANNER")] |
| NAV-002 | iOS | SettingsViewController | Previous screen | User taps Cancel | [ios: Source/SettingsViewContoller.swift:dismiss(animated: true)] |
| NAV-003 | iOS | SettingsViewController | Previous screen | User saves successfully | [ios: Source/SettingsViewContoller.swift:self.dismiss(animated: true)] |
| NAV-004 | Android | SettingsActivity | QRCodeScannerActivity | User taps QR code button | [android: SettingsActivity.java:startActivityForResult(intent, RC_QRCODE_CAPTURE)] |
| NAV-005 | Android | SettingsActivity | LoginActivity | Settings saved successfully | [android: SettingsActivity.java:startActivity(new Intent(SettingsActivity.this, LoginActivity.class))] |

## Error Paths

| ID | Platform | Error Condition | Handling | User/State Effect | Source |
|---|---|---|---|---|---|
| ERRPATH-001 | iOS | Server field empty | showSettingsErrorDialog() | Error alert shown | [ios: Source/SettingsViewContoller.swift:if isValid() { ... } else { showSettingsErrorDialog() }] |
| ERRPATH-002 | iOS | PIN invalid (not 0 or 4 chars) | showWrongPinLengthErrorDialog() | Error alert shown | [ios: Source/SettingsViewContoller.swift:if !isPinValid() { showWrongPinLengthErrorDialog() }] |
| ERRPATH-003 | iOS | HTTP request fails (not 200) | showSettingsErrorDialog() | Error alert shown; settings not saved | [ios: Source/SettingsViewContoller.swift:if response.response?.statusCode != 200 { showSettingsErrorDialog() }] |
| ERRPATH-004 | Android | Server field empty | showSettingsErrorDialog() | Error alert shown | [android: SettingsActivity.java:if (isValid()) { ... } else { showSettingsErrorDialog() }] |
| ERRPATH-005 | Android | PIN invalid | showWrongPinErrorDialog() | Error alert shown | [android: SettingsActivity.java:if (!isPinValid()) { showWrongPinErrorDialog() }] |
| ERRPATH-006 | Android | HTTP request fails | showSettingsErrorDialog() | Error alert shown; settings not saved | [android: SettingsActivity.java:if (!isRequestSuccessful) { showSettingsErrorDialog() }] |

## Dependencies

| ID | Platform | Dependency | Purpose | Replacement Candidate | Source |
|---|---|---|---|---|---|
| DEP-001 | iOS | Alamofire (AF.request) | HTTP requests for server validation | fetch or axios in RN | [ios: Source/SettingsViewContoller.swift:import Alamofire] |
| DEP-002 | iOS | MBProgressHUD | Loading spinner during validation | React Native ActivityIndicator | [ios: Source/SettingsViewContoller.swift:import MBProgressHUD] |
| DEP-003 | iOS | PreferencesUtils | Settings storage abstraction | AsyncStorage in RN | [ios: Source/SettingsViewContoller.swift:PreferencesUtils.saveSettingsPreferences] |
| DEP-004 | Android | android.webkit.SharedPreferences | Preferences storage | AsyncStorage in RN | [android: SettingsActivity.java:import android.content.SharedPreferences] |
| DEP-005 | Android | HttpStatusUtil | HTTP validation | fetch in RN | [android: SettingsActivity.java:HttpStatusUtil.getHttpStatus] |
| DEP-006 | iOS/Android | QRCodeParser | QR code parsing | react-native-qr-scanner in RN | [ios/android: QRCodeSettings, QRCodeParser] |

## UI-Relevant Behavior

| ID | Platform | Element/Screen | Behavior | Source |
|---|---|---|---|---|
| UI-001 | iOS | UITextField (server, client, token, pin) | Text input; keyboard handling with NotificationCenter | [ios: Source/SettingsViewContoller.swift:registerForKeyboardNotifications()] |
| UI-002 | iOS | UISwitch (protocol) | Toggle HTTPS on/off | [ios: Source/SettingsViewContoller.swift:@IBOutlet weak var httpsProtocol: UISwitch] |
| UI-003 | iOS | UIButton (Save/Cancel) | Conditional display; Cancel hidden if no valid settings | [ios: Source/SettingsViewContoller.swift:self.cancelButton.isHidden] |
| UI-004 | iOS | UILabel | Color styling with CustomColors.grayDark | [ios: Source/SettingsViewContoller.swift:self.serverLabel.textColor = CustomColors.grayDark] |
| UI-005 | iOS | MBProgressHUD | Loading spinner shown during save | [ios: Source/SettingsViewContoller.swift:self.showSpinner()] |
| UI-006 | Android | EditText | Text input fields for server, client, token, pin | [android: SettingsActivity.java:server = findViewById(R.id.server)] |
| UI-007 | Android | Spinner (protocol) | Dropdown with 3 protocol options | [android: SettingsActivity.java:spinnerProtocol = findViewById(R.id.spinner_protocol)] |
| UI-008 | Android | Spinner (language) | Language/locale selection | [android: SettingsActivity.java:spinnerLanguage = findViewById(R.id.spinner_language)] |
| UI-009 | Android | Button (Save/Cancel) | Conditional display; Cancel hidden if no saved preferences | [android: SettingsActivity.java:if (!hasSavedPreferences(prefs)) { cancel.setVisibility(View.GONE) }] |

## Security And Privacy

| ID | Platform | Data | Protection | RN Requirement | Source |
|---|---|---|---|---|---|
| SEC-001 | iOS | Server URL + credentials in TextField | Plaintext in memory; persisted in Keychain via PreferencesUtils | RN must use Keychain/Keystore | [ios: Source/SettingsViewContoller.swift:self.server.text] |
| SEC-002 | Android | Server URL + credentials in EditText | Plaintext in memory; persisted in SharedPreferences | RN must use EncryptedSharedPreferences | [android: SettingsActivity.java:server.getText()] |
| SEC-003 | iOS/Android | Protocol selection bypass (HTTPS-no-validation) | Allows MITM attacks if enabled; user-controlled flag | RN should warn user before enabling | [ios/android: PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION] |
| SEC-004 | iOS | PIN storage | Plaintext PIN in PreferencesUtils | RN should not store PIN unencrypted | [ios: PreferencesUtils] |
| SEC-005 | iOS/Android | Server accessibility check | No SSL pinning; relies on platform SSL validation | RN should use platform SSL defaults | [ios/android: AF.request / HttpStatusUtil] |
