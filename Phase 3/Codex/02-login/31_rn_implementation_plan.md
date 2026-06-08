# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_3/31_rn_implementation_plan.md |
| Status | COMPLETED |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:47:35+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/LoginScreen.tsx | LoginScreen | Adapt existing screen to credential prefill, validation, submit, locale field, settings button and WebView navigation. | EP-001, EP-002, BEH-001..BEH-004, UI-001, UI-002 |
| MAP-002 | rn-e-mobilebrowser/src/navigation/authGate.ts; rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | resolveSettingsGate | Add central settings/PIN gate and wire it into navigator. | EP-003, EP-004, BEH-005, NAV-003, NAV-004 |
| MAP-003 | rn-e-mobilebrowser/src/screens/PinGateScreen.tsx | PinGateScreen | Add shared RN PIN keypad, exact match check, delete/cancel and invalid feedback. | BEH-006, NAV-005, UI-003, UI-004 |
| MAP-004 | rn-e-mobilebrowser/src/services/authStorageService.ts | readAuthSnapshot/saveAuthCredentials/setHasValidLogin | Add typed auth facade over existing storage-config SecureStore/AsyncStorage service. | STOR-001..STOR-010, STATE-001..STATE-004 |
| MAP-005 | rn-e-mobilebrowser/src/services/loginUrlService.ts | buildLoginUrl/buildLoginUrlFromPreferences | Reuse/adapt existing storage-config URL builder for login credentials and Culture. | API-001, API-002 |
| MAP-006 | rn-e-mobilebrowser/src/services/sessionService.ts; rn-e-mobilebrowser/src/hooks/useAuthState.ts | logoutCurrentSession/useAuthState AppState listener | Adapt session service to reset login flag on background and expose injectable best-effort cleanup. | API-003, BEH-007 |
| MAP-007 | rn-e-mobilebrowser/src/services/authStorageService.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | userName storage | Reuse existing `preference_user_key` AsyncStorage write/read for username. | STOR-001, STOR-006 |
| MAP-008 | rn-e-mobilebrowser/src/services/authStorageService.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | password storage | Reuse SecureStore-backed password storage. | STOR-002, STOR-007, SEC-001, SEC-002 |
| MAP-009 | rn-e-mobilebrowser/src/services/authStorageService.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | hasValidLogin storage | Reuse AsyncStorage-backed valid login flag. | STOR-003, STOR-008 |
| MAP-010 | rn-e-mobilebrowser/src/services/authStorageService.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | hasValidSettings storage | Reuse AsyncStorage-backed valid settings flag. | STOR-004, STOR-009 |
| MAP-011 | rn-e-mobilebrowser/src/services/authStorageService.ts; rn-e-mobilebrowser/src/services/storageConfigStorage.ts | pin storage | Reuse SecureStore-backed PIN storage. | STOR-005, STOR-010, SEC-003 |
| MAP-012 | rn-e-mobilebrowser/src/services/loginService.ts; rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | submitLogin/WebViewScreen | Add login submit service and WebView launcher target for login URL. | API-001, API-002 |
| MAP-013 | rn-e-mobilebrowser/src/services/sessionService.ts | logoutCurrentSession | Add local reset and optional injectable remote cleanup hook; no concrete license/session API implemented. | API-003 |
| MAP-014 | rn-e-mobilebrowser/src/hooks/useAuthState.ts | useAuthState | Add auth state hook with login success flag refresh and background logout. | STATE-001, STATE-002, STATE-003, STATE-004 |
| MAP-015 | rn-e-mobilebrowser/src/hooks/useSettingsGateState.ts; rn-e-mobilebrowser/src/navigation/authGate.ts | useSettingsGateState | Add reusable gate resolver for settings/PIN routes. | BEH-005, NAV-003, NAV-004 |
| MAP-016 | rn-e-mobilebrowser/src/services/loginService.ts | submitLogin preflightEnabled option | Implement default enabled preflight GET with configurable Android-compatible bypass. | BEH-003, BEH-004, API-001, API-002 |
| MAP-017 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | SecureStore password contract | Reuse stronger secure storage, no raw/base64-only persistence. | STOR-002, STOR-007, SEC-001, SEC-002 |
| MAP-018 | rn-e-mobilebrowser/src/screens/PinGateScreen.tsx | PinGateScreen | Shared RN keypad implements PIN entry, delete, cancel and invalid state. | BEH-006, UI-003, UI-004 |
| MAP-019 | package dependency | expo-secure-store | Reuse already installed secure storage package instead of adding new keychain package. | SEC-001, SEC-002, SEC-003 |
| MAP-020 | package dependency | @react-native-async-storage/async-storage | Reuse already installed AsyncStorage for non-sensitive flags and username. | STOR-003, STOR-004, STOR-008, STOR-009 |
| MAP-021 | react-native AppState | AppState.addEventListener | Reuse RN AppState listener in `useAuthState`. | BEH-007, STATE-003, STATE-004 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| expo-secure-store | Reuse | Already present; protects password and PIN beyond legacy raw/base64 storage. | SEC-001, SEC-002, SEC-003, MAP-019 |
| @react-native-async-storage/async-storage | Reuse | Already present; stores username and valid flags. | STOR-003, STOR-004, MAP-020 |
| react-native AppState | Reuse | Built-in lifecycle hook for background logout reset. | BEH-007, MAP-021 |
| react-native-webview | Reuse | Already present; implements login success navigation target. | NAV-001, NAV-002, MAP-012 |
| fetch | Reuse | RN global fetch replaces Alamofire/HttpStatusUtil for optional login preflight. | DEP-001, DEP-012, MAP-016 |
