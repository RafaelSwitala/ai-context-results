# Migration Mapping

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/settings/claude/20260602-005/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T21:35:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-004 | screens/SettingsScreen.tsx | SettingsScreen | Replace SettingsViewController + SettingsActivity | Single screen for both platforms |
| MAP-002 | BEH-001, BEH-007 | hooks/useSettingsForm.ts | useSettingsForm() | Load settings from storage on mount | Unify iOS/Android loading |
| MAP-003 | BEH-002, BEH-009 | utils/settingsValidator.ts | validateSettings() | Server + PIN validation logic | Shared validation |
| MAP-004 | UI-001, UI-006 | components/SettingsForm.tsx | SettingsForm | TextInput fields for server, client, token, pin | Reusable form component |
| MAP-005 | UI-002, UI-007 | components/ProtocolSelector.tsx | ProtocolSelector | Picker with 3 protocol options | Unify iOS switch + Android spinner |
| MAP-006 | UI-008 | components/LanguageSelector.tsx | LanguageSelector | Picker for language/locale | Android behavior for both |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-004, BEH-009, API-001, API-002 | settingsService.ts | validateServerAccess() | HTTP GET to check URL; return status | Unified for both platforms |
| MAP-101 | BEH-005, BEH-010, STOR-* | settingsService.ts | saveSettings() | Persist to AsyncStorage | Unify PreferencesUtils + SharedPreferences |
| MAP-102 | BEH-013, BEH-014 | qrCodeService.ts | parseQRCode() | QR parsing; return QRCodeSettings | Delegate to library |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-200 | STOR-001 through STOR-009 | AsyncStorage | settings/server, settings/client, settings/protocol, settings/token, settings/pin, settings/hasValid, settings/locale | YES | Must use encrypted storage for credentials |
| MAP-201 | STOR-006, STOR-009 | Redux or Context | settings/isConfigured | NO | Boolean flag for cancel button visibility |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-002 | fetch() or axios | buildCheckAccessUrl() | HTTP GET to verify settings; uses Cache-Control: no-cache |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | BEH-001, BEH-007 | useState + useEffect | { server: '', client: '', protocol: 'https', pin: '', token: '', locale: '' } | On mount: load from storage |
| MAP-401 | BEH-002, BEH-009 | useState | { isValidating: false, error: null } | true during HTTP check; error on failure |
| MAP-402 | BEH-011, BEH-012 | isValidating state | false | true during server validation |
| MAP-403 | BEH-006, BEH-010 | useMemo | hasValidSettings computed | Derived from storage flag |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-006, BEH-010 | Cancel hidden if no config | Cancel hidden if no saved prefs | RN hides if !hasValidSettings | Same logic both platforms |
| DIV-002 | BEH-002, BEH-008 | UISwitch binary (on/off) | Spinner 3 options (HTTP, HTTPS, HTTPS-no-val) | RN uses Picker with 3 options | Android model more flexible |
| DIV-003 | BEH-011 | MBProgressHUD | Button disabled + implicit UI feedback | RN ActivityIndicator + button disabled | Explicit loading UI |
| DIV-004 | BEH-001, BEH-007 | PreferencesUtils read | SharedPreferences via PreferencesUtils | RN AsyncStorage | Both async I/O |
| DIV-005 | BEH-004, BEH-009 | AF.request status code | HttpStatusUtil.getHttpStatus() | RN fetch().status | Both check HTTP status |
| DIV-006 | BEH-013, BEH-014 | Unwind segue from QR | onActivityResult callback | RN navigation or callback | Different navigation patterns |
| DIV-007 | UI-008 | N/A (iOS no language selector) | Spinner with locale mapping | RN Picker for language | Implement Android behavior for both |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | @react-native-async-storage/async-storage | REUSE | Settings persistence | STOR-*, MAP-200 |
| MAP-DEP-002 | react-native-qrcode-scanner or expo-barcode-scanner | ADD | QR code scanning for settings import | BEH-013, BEH-014, MAP-102 |
| MAP-DEP-003 | fetch (built-in) or axios | REUSE | HTTP validation of server URL | API-001, API-002, MAP-100 |
| MAP-DEP-004 | react-native-localization | ADD (optional) | Language/locale selection | BEH-008, UI-008, MAP-006 |
| MAP-DEP-005 | redux or @react-navigation/native (context) | REUSE | Settings state management | MAP-400 through MAP-403 |
