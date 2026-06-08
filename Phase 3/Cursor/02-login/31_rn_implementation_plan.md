# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_3/31_rn_implementation_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T14:30:00+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | rn-e-mobilebrowser/src/screens/LoginScreen.tsx | LoginScreen | Adapt | EP-001, EP-002, BEH-001..BEH-004, UI-001, UI-002 |
| MAP-002 | rn-e-mobilebrowser/src/navigation/authGate.ts | resolveSettingsGate, resolveSettingsButtonGate | Add | EP-003, EP-004, BEH-005, NAV-003, NAV-004 |
| MAP-003 | rn-e-mobilebrowser/src/screens/PinScreen.tsx; src/components/PinEntry.tsx | PinScreen, PinEntry | Adapt | BEH-006, NAV-005, UI-003, UI-004 |
| MAP-004 | rn-e-mobilebrowser/src/services/authStorageService.ts | readAuthState, saveCredentials, setValidLoginFlag | Add | STOR-001..STOR-010, STATE-001..STATE-004 |
| MAP-005 | rn-e-mobilebrowser/src/services/loginService.ts; loginUrlService.ts | submitLogin, buildLoginUrlFromState | Adapt | API-001, API-002 |
| MAP-006 | rn-e-mobilebrowser/src/services/sessionService.ts | logout, killUserSessionsBestEffort | Adapt | API-003, BEH-007 |
| MAP-007 | rn-e-mobilebrowser/src/services/authStorageService.ts | readAuthState (userName) | Adapt | STOR-001, STOR-006 |
| MAP-008 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts via authStorageService | SecureStore password | Reuse/Adapt | STOR-002, STOR-007, SEC-001, SEC-002 |
| MAP-009 | rn-e-mobilebrowser/src/services/authStorageService.ts | setValidLoginFlag | Adapt | STOR-003, STOR-008 |
| MAP-010 | rn-e-mobilebrowser/src/services/authStorageService.ts | getValidSettingsFlag | Reuse | STOR-004, STOR-009 |
| MAP-011 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts via authStorageService | SecureStore pin | Reuse | STOR-005, STOR-010, SEC-003 |
| MAP-012 | rn-e-mobilebrowser/src/services/loginService.ts | submitLogin preflight GET | Adapt | API-001, API-002 |
| MAP-013 | rn-e-mobilebrowser/src/services/sessionService.ts | killUserSessionsBestEffort | Adapt | API-003 |
| MAP-014 | rn-e-mobilebrowser/src/hooks/useAuthState.ts | useAuthState | Add | STATE-001..STATE-004 |
| MAP-015 | rn-e-mobilebrowser/src/hooks/useSettingsGateState.ts | useSettingsGateState | Add | BEH-005, NAV-003, NAV-004 |
| MAP-016 | rn-e-mobilebrowser/src/services/loginService.ts | DEFAULT_PREFLIGHT=true | Adapt | BEH-003, BEH-004, API-001, API-002 |
| MAP-017 | rn-e-mobilebrowser/src/services/storageConfigStorage.ts | SecureStore for password | Adapt | SEC-001, SEC-002 |
| MAP-018 | rn-e-mobilebrowser/src/components/PinEntry.tsx | PinEntry | Adapt | BEH-006, UI-003, UI-004 |
| MAP-019 | expo-secure-store (existing) | Secure credential storage | Reuse | SEC-001..SEC-003 |
| MAP-020 | @react-native-async-storage/async-storage (existing) | Flags and userName | Reuse | STOR-003, STOR-004, STOR-008, STOR-009 |
| MAP-021 | rn-e-mobilebrowser/src/hooks/useAuthState.ts | AppState listener | Reuse | BEH-007, STATE-003, STATE-004 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| expo-secure-store | Reuse | Password/PIN secure storage (MAP-019 statt keychain) | SEC-001..SEC-003 |
| @react-native-async-storage/async-storage | Reuse | hasValidLogin/hasValidSettings flags | MAP-020 |
| react-native AppState | Reuse | Background logout | MAP-021 |
| react-native-webview | Reuse | Post-login WebView navigation shell | NAV-001, NAV-002 |

## Implementierungsreihenfolge

1. Auth types, password encoding, error parser utils
2. authStorageService + loginService + sessionService logout extension
3. authGate + useAuthState + useSettingsGateState + useLogin hooks
4. LoginForm + PinEntry components
5. LoginScreen, PinScreen, WebViewScreen adaptations
6. AppNavigator route registration

## RN Policy Decisions

| Topic | Decision | Source IDs |
|---|---|---|
| Preflight HTTP check | Enabled by default (iOS parity); disable via `LoginPreflightOptions.enabled=false` | MAP-016 |
| Password storage | Plaintext in SecureStore; base64 only for URL query param | MAP-017 |
| Session DELETE | Best-effort on logout; non-blocking errors | MAP-013 |
