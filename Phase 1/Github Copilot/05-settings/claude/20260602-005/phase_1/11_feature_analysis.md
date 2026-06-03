# Feature Analysis

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A11 |
| Artifact Path | artifacts/settings/claude/20260602-005/phase_1/11_feature_analysis.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:20:00Z |

## Scope

| Field | Value | Source |
|---|---|---|
| Feature slug | settings | prompt |
| User feature name | settings | prompt |
| In scope | Server/client URL configuration, protocol selection (HTTP/HTTPS/HTTPS-no-validation), PIN management, token storage, QR code scanning for settings import, language/locale selection, settings validation | analysis |
| Out of scope | Advanced cryptography, certificate pinning, detailed SSL configuration UI beyond protocol toggle | analysis |
| Open blockers | none | analysis |

## Discovery Summary

| Platform | Search Terms | Files Found | Relevant Files | Notes |
|---|---|---|---|---|
| iOS | SettingsViewController, UITextField, UISwitch, QRCodeSettings | 2 files found | 2 relevant | Main.storyboard (settings UI); SettingsViewController.swift (logic) |
| Android | SettingsActivity, EditText, Spinner, SharedPreferences, PreferencesUtils | 3 files found | 3 relevant | activity_settings.xml (layout); SettingsActivity.java (logic); PreferencesUtils.java (storage) |

## Relevant Files

| ID | Platform | Path | Main Symbol | Why Relevant | Source |
|---|---|---|---|---|---|
| IOS-FILE-001 | iOS | Source/Base.lproj/Main.storyboard | Settings Scene | Settings UI definition with TextFields and Switch | grep_search |
| IOS-FILE-002 | iOS | Source/SettingsViewContoller.swift | SettingsViewController | Main settings controller handling UI, validation, saving | file_search |
| AND-FILE-001 | Android | app/src/main/res/layout/activity_settings.xml | SettingsActivity layout | Settings UI with EditTexts and Spinners | grep_search |
| AND-FILE-002 | Android | app/src/main/java/.../SettingsActivity.java | SettingsActivity | Main settings activity with form handling | file_search |
| AND-FILE-003 | Android | app/src/main/java/.../utility/PreferencesUtils.java | PreferencesUtils | Centralized preferences storage and retrieval | file_search |

## Feature Boundary

| ID | Boundary Item | In/Out | Reason | Source |
|---|---|---|---|---|
| BOUND-001 | Server configuration (URL text field) | IN | Core setting for app to function | IOS-FILE-002, AND-FILE-002 |
| BOUND-002 | Client/Mandant configuration | IN | Required parameter for login URL | IOS-FILE-002, AND-FILE-002 |
| BOUND-003 | Protocol selection (HTTP/HTTPS toggle) | IN | Security-critical setting | IOS-FILE-002, AND-FILE-002 |
| BOUND-004 | PIN management (4-digit code) | IN | Optional 2FA; validated on save | IOS-FILE-002, AND-FILE-002 |
| BOUND-005 | Token field | IN | Optional authentication token | IOS-FILE-002, AND-FILE-002 |
| BOUND-006 | QR code scanning for settings import | IN | Convenience feature to populate fields | IOS-FILE-002, AND-FILE-002 |
| BOUND-007 | Settings validation before save | IN | Must verify server accessibility | IOS-FILE-002, AND-FILE-002 |
| BOUND-008 | Language/locale selection | IN | UI language switching | AND-FILE-002 |
| BOUND-009 | SSL bypass option (HTTPS without validation) | IN | Support for self-signed certificates | IOS-FILE-002, AND-FILE-002 |
| BOUND-010 | Advanced certificate pinning | OUT | Beyond current implementation scope | N/A |

## Cross-Platform Summary

| Topic | iOS | Android | Same/Different | Consequence |
|---|---|---|---|---|
| Settings UI | UITextField (text) + UISwitch (protocol) | EditText (text) + Spinner (protocol dropdown) | Different UI components | RN must use TextInput + Picker |
| Storage | UserDefaults via PreferencesUtils | SharedPreferences via PreferencesUtils | Both abstract via utility | RN uses AsyncStorage |
| Validation | Before save; checks server accessibility via AF.request | Before save; checks via HttpStatusUtil | Same pattern | RN must implement URL validation |
| QR Scanning | Unwind segue from QrCodeScannerViewController | onActivityResult from QRCodeScannerActivity | Different navigation | RN uses react-native-qr-scanner |
| Protocol Selection | UISwitch binary (HTTPS on/off) | Spinner with 3 options (HTTP, HTTPS, HTTPS-no-validation) | Different UX | Android more flexible |
| PIN Validation | isEmpty OR length==4 in isValid() | isEmpty OR length==4 in isPinValid() | Identical logic | RN can unify |
| Language Selection | N/A in iOS code | Spinner with locale mapping | Android-only | RN needs Android behavior |
| Cancel/Save buttons | Show Cancel only if hasValidSettings | Show Cancel only if hasSavedPreferences | Same logic | Both hide Cancel if first-time |
| Error Dialogs | UIAlertController with title/message | AlertDialog.Builder with similar structure | Similar pattern | RN uses Alert |
