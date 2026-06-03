# Migration Mapping

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_1/14_migration_mapping.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T17:15:00Z |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-005, IOS-FILE-001, AND-FILE-001 | screens/LoginScreen.tsx | LoginScreen component | Export functional component; use hook for state | Single login screen covers both iOS ViewController and Android Activity |
| MAP-002 | EP-004, EP-008, IOS-FILE-002, AND-FILE-002 | screens/PinScreen.tsx | PinScreen component | Export functional component; custom PIN input | Single PIN screen for both platforms |
| MAP-003 | UI-001, UI-002, UI-010, UI-011 | components/CredentialInput.tsx | CredentialInput component | Reusable input component for username/password | Simplifies form handling |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-100 | BEH-001, STOR-001, STOR-002 | AuthService.loadSavedCredentials() | async function | Call on component mount; load from storage | Returns {username: string, password: string} |
| MAP-101 | BEH-005, API-001, API-004 | AuthService.buildLoginUrl() | function | Accept server, client, user, password, protocol | Returns formatted URL string |
| MAP-102 | BEH-006, API-001, API-003 | AuthService.authenticate() | async function | Make HTTP GET request to login endpoint | Use fetch(); handle errors; return {success, errorCode?} |
| MAP-103 | BEH-009, BEH-020, STOR-001, STOR-002 | AuthService.saveCredentials() | async function | Save username and password to storage | Use encrypted storage for sensitive data |
| MAP-104 | BEH-010, BEH-021, STOR-003 | AuthService.setValidLogin() | async function | Set hasValidLogin flag in storage | Use boolean flag for session state |
| MAP-105 | BEH-012, BEH-024 | AuthService.validatePin() | function | Compare entered PIN with stored PIN | Return boolean; use hashing if possible |
| MAP-106 | BEH-015 | AuthService.setLocale() | async function | Save language preference to storage | Android only currently; prepare for RN |
| MAP-107 | BEH-004, BEH-016 | AuthService.hasValidSettings() | async function | Check if settings are configured | Return boolean |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-200 | STOR-001 | @react-native-encrypted-storage | auth/username | NO | Consider encrypted storage for consistency |
| MAP-201 | STOR-002 | @react-native-encrypted-storage | auth/password | YES | Must be encrypted |
| MAP-202 | STOR-003 | AsyncStorage | auth/hasValidLogin | NO | Boolean flag; can use AsyncStorage |
| MAP-203 | STOR-004, STOR-009 | @react-native-encrypted-storage | auth/pin | YES | Must be encrypted |
| MAP-204 | STOR-005, STOR-010 | AsyncStorage | config/hasValidSettings | NO | Boolean flag |
| MAP-205 | STOR-011 | AsyncStorage | i18n/locale | NO | Language preference |
| MAP-206 | STOR-006, STOR-007 | @react-native-encrypted-storage | auth/credentials | YES | Combined {user, password} object; fully encrypted |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-300 | API-001, API-003, API-004 | AuthService.authenticate() | GET /login | Build URL with query params; handle 200 vs error status |
| MAP-301 | BEH-008 | AuthService.parseErrorResponse() | Parse query params for Error= key | Extract error code from response URL |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-400 | STATE-001, STATE-002, STATE-003 | useLoginForm hook | {username: "", password: ""} | Update on text change |
| MAP-401 | STATE-004, STATE-005, STATE-006 | useLoginForm hook | isLoading: false | Set true during HTTP request; false on completion |
| MAP-402 | STATE-007, STATE-008, STATE-009 | useLoginForm hook | error: null | Set on validation/HTTP error; null on success |
| MAP-403 | STATE-010, STATE-011, STATE-012 | usePinEntry hook | enteredPin: "" | Accumulate digits; compare; clear on error |
| MAP-404 | BEH-001, STATE-001 | useLoginForm hook (initialization) | Load saved credentials on mount | Async storage read |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| DIV-001 | BEH-013, BEH-019 | Plaintext password storage | Base64-encoded password storage | Use encrypted storage for both | RN should exceed both platforms' security |
| DIV-002 | ERRPATH-001, ERRPATH-002 | Empty field validation messages | No explicit empty field validation | Validate both fields in RN | Be more robust than Android |
| DIV-003 | NAV-001, NAV-002, NAV-006, NAV-008 | UIStoryboardSegue navigation | Intent-based navigation | Use react-navigation stack | RN abstraction unifies both |
| DIV-004 | UI-007, UI-018 | Custom PinCodeView control | Individual TextView boxes | Create custom PIN input component | Cleaner UX than Android |
| DIV-005 | UI-015, UI-016 | No language selection in iOS | Spinner for language selection | Optional in RN; add if i18n support needed | iOS simpler; Android more complete |
| DIV-006 | BEH-006, BEH-022 | AF.request() for HTTP; navigate via segue | Direct Intent navigation (HTTP commented out) | Use fetch() or axios; navigate via react-navigation | RN uses standard approach |
| DIV-007 | UI-020, UI-021 | No delete button visible | Delete button visible | Include delete in PIN UI | Android UX better |
| DIV-008 | BEH-002, BEH-003 | Multiple guards for each field | Implicit/no validation | Validate both; show specific error messages | RN should be explicit |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-DEP-001 | @react-native-encrypted-storage | ADD | Store sensitive data (credentials, PIN) securely | STOR-002, STOR-004, MAP-200, MAP-201, MAP-203 |
| MAP-DEP-002 | react-navigation (@react-navigation/native, @react-navigation/stack) | REUSE | Navigation between login and main screens (from storage-config) | NAV-*, MAP-001 |
| MAP-DEP-003 | react-native (TextInput, View, Button, Alert) | REUSE | Core UI components | UI-*, MAP-001, MAP-002 |
| MAP-DEP-004 | axios or fetch | REUSE/ADD | HTTP client for authentication endpoint | API-001, MAP-102 |
| MAP-DEP-005 | react-hook-form | ADD | Form state management for login form | BEH-001, BEH-002, BEH-003, MAP-400 |
| MAP-DEP-006 | i18next or react-i18next | REUSE/ADD | Language/locale support (Android has; iOS doesn't) | BEH-015, STOR-011 |
