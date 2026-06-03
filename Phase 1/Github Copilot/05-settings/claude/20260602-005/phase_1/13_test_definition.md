# Test Definition

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/settings/claude/20260602-005/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:30:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit | iOS/Android | HIGH | Load settings from storage |
| BEH-002 | Unit | iOS/Android | HIGH | Validate form (server required + PIN) |
| BEH-003 | Unit | iOS/Android | HIGH | PIN length validation (0 or 4) |
| BEH-004 | Integration | iOS/Android | HIGH | Server accessibility check before save |
| BEH-005 | Unit | iOS/Android | HIGH | Save settings after validation |
| BEH-006 | Unit | iOS | MEDIUM | Hide Cancel button if no config |
| BEH-007 | Unit | Android | HIGH | Load settings and language |
| BEH-008 | Unit | Android | HIGH | Display 3 protocol options |
| BEH-009 | Integration | Android | HIGH | Validate and test server URL |
| BEH-010 | Unit | Android | HIGH | Save settings after validation |
| BEH-011 | Unit | iOS | MEDIUM | Show loading spinner |
| BEH-012 | Unit | Android | MEDIUM | Disable save button during check |
| BEH-013 | Integration | iOS | HIGH | Parse QR code and populate |
| BEH-014 | Integration | Android | HIGH | Parse QR code in onActivityResult |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Load settings on view load | SettingsViewController displayed | viewDidLoad() | TextFields populated from PreferencesUtils | EP-001, BEH-001, STATE-001 |
| LT-002 | iOS | Validate empty server field | Settings form displayed | Save tapped + server empty | showSettingsErrorDialog(); no save | BEH-002, ERRPATH-001 |
| LT-003 | iOS | Validate PIN length | Settings form displayed | Save tapped + PIN invalid | showWrongPinLengthErrorDialog() | BEH-003, ERRPATH-002 |
| LT-004 | iOS | Test server accessibility | Valid server URL entered | AF.request to URL | If 200: save preferences + dismiss | BEH-004, STATE-004 |
| LT-005 | iOS | Test server error response | Invalid server URL entered | AF.request to URL | If not 200: showSettingsErrorDialog() | BEH-004, ERRPATH-003 |
| LT-006 | iOS | Save settings successfully | Form valid + server accessible | Save tapped | PreferencesUtils.saveSettingsPreferences() called; dismiss | BEH-005, STATE-004 |
| LT-007 | iOS | Cancel button hidden if no config | SettingsViewController viewDidLoad + no saved settings | UI rendered | Cancel button isHidden = true | BEH-006, STATE-001 |
| LT-008 | iOS | Show loading spinner during save | Save tapped + checking server | Alamofire request in progress | showSpinner() called; button disabled | BEH-011, STATE-004 |
| LT-009 | iOS | Parse QR code and populate fields | QR scanned from QrCodeScannerViewController | unwindToSettings segue fired | initViews() called; all fields updated | BEH-013, STATE-006, NAV-001 |
| LT-010 | Android | Load settings on activity create | SettingsActivity onCreate | Load from SharedPreferences | EditTexts populated; Spinners set | EP-004, BEH-007, STATE-007 |
| LT-011 | Android | Show 3 protocol options | SettingsActivity created | Spinner initialized | Spinner contains HTTP, HTTPS, HTTPS-no-validation | BEH-008 |
| LT-012 | Android | Validate empty server field | Settings form displayed | Save clicked + server empty | showSettingsErrorDialog(); no save | BEH-009, ERRPATH-004 |
| LT-013 | Android | Validate PIN length | Settings form displayed | Save clicked + PIN invalid | showWrongPinErrorDialog() | BEH-009, ERRPATH-005 |
| LT-014 | Android | Test server accessibility | Valid server URL entered | HttpStatusUtil.getHttpStatus() called | If 200: save preferences + navigate LoginActivity | BEH-009, STATE-009 |
| LT-015 | Android | Test server error response | Invalid server URL entered | HttpStatusUtil.getHttpStatus() called | If not 200: showSettingsErrorDialog() | BEH-009, ERRPATH-006 |
| LT-016 | Android | Change language selection | Spinner initialized | onItemSelected fired | PreferencesUtils.saveLocale() called | BEH-008, STATE-008 |
| LT-017 | Android | Parse QR code in onActivityResult | QRCodeScannerActivity returns | onActivityResult with data | fillControlsFromQRCode() called; fields updated | BEH-014, STATE-010 |
| LT-018 | Android | Hide Cancel button if no saved prefs | SettingsActivity onCreate + first time | hasSavedPreferences() check | Cancel button visibility = GONE | BEH-010, STATE-007 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS | Server field with leading/trailing spaces | Should be trimmed or validated | BEH-002 |
| EC-002 | iOS | PIN field with non-numeric characters | Should reject or ignore | BEH-003 |
| EC-003 | iOS | HTTP request timeout during validation | Should show error dialog | BEH-004, ERRPATH-003 |
| EC-004 | Android | Protocol spinner rapid selections | Should use last selected value | BEH-008 |
| EC-005 | Android | Language spinner with single option | Should be disabled | BEH-008 |
| EC-006 | iOS/Android | Save clicked while previous request pending | Should disable button; prevent duplicate requests | BEH-011, BEH-012 |
| EC-007 | iOS | QR code with partial settings | Should populate only non-empty fields | BEH-013 |
| EC-008 | Android | QR code with invalid JSON | Should not crash; show graceful error | BEH-014 |
| EC-009 | iOS/Android | Go back from settings after partial edit | Should discard changes; not save | STATE-002, STATE-007 |
| EC-010 | Android | Settings loaded with missing SharedPreferences keys | Should use default values | BEH-007, STOR-007 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Form Validation | BEH-002, BEH-003, BEH-009 | 100% | All validation paths must work |
| Server Accessibility | BEH-004, BEH-009, API-001, API-002 | 100% | Critical business logic |
| Settings Persistence | BEH-005, BEH-010, STOR-* | 100% | Data must be saved correctly |
| QR Code Integration | BEH-013, BEH-014, NAV-001, NAV-004 | 95%+ | Convenience feature; critical when used |
| Error Handling | ERRPATH-* | 90%+ | User must see clear errors |
| Language Selection | BEH-008, STATE-008 | 80%+ | Android-specific; less critical |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| BEH-004 / BEH-009 (real HTTP request) | Requires mock server or mocked AF.request/HttpStatusUtil | Mock the HTTP client; verify correct URL and headers |
| BEH-011 (MBProgressHUD animation) | Requires UI testing framework | Verify spinner shown/hidden callbacks |
| STATE-001 / STATE-007 (activity lifecycle) | Requires full activity/fragment lifecycle | Mock lifecycle callbacks |
| NAV-001 / NAV-004 (segue/intent navigation) | Requires navigation framework mocking | Verify correct segue identifier or intent intent |
| UI-001 through UI-009 (visual rendering) | Requires snapshot/UI testing | Verify component states via properties |
