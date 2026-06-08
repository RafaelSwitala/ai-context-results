# RN Mapping Status

| Field | Value |
|---|---|
| Feature | login |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_3/33_rn_mapping_status.md |
| Status | COMPLETED_WITH_PARTIALS |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-05T14:47:35+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | LoginScreen | `src/screens/LoginScreen.tsx` has credential prefill fields, validation errors, submit and settings access. | Uses existing root screen path instead of `src/screens/login/`. |
| MAP-002 | IMPLEMENTED | authGate/AppNavigator | `resolveSettingsGate` and navigator `pin/settings` routes added. | Invalid settings route goes to PIN when stored PIN exists. |
| MAP-003 | IMPLEMENTED | PinGateScreen | `src/screens/PinGateScreen.tsx` implements 4-digit exact match and invalid feedback. | Typecheck PASS. |
| MAP-004 | IMPLEMENTED | authStorageService | `readAuthSnapshot`, `saveAuthCredentials`, `setHasValidLogin` added. | Facade reuses storage-config service. |
| MAP-005 | IMPLEMENTED | loginUrlService | Existing `buildLoginUrl` reused for login and Culture. | Secure password is encoded only for URL generation. |
| MAP-006 | IMPLEMENTED | sessionService/useAuthState | `logoutCurrentSession` and AppState background listener added. | Local flag reset implemented. |
| MAP-007 | IMPLEMENTED | authStorageService/storageConfigStorage | Username read/write contract exists via `preference_user_key`. | Medium sensitivity remains AsyncStorage. |
| MAP-008 | IMPLEMENTED | authStorageService/storageConfigStorage | Password persists through SecureStore. | No raw/base64-only persistence. |
| MAP-009 | IMPLEMENTED | authStorageService/storageConfigStorage | `hasValidLogin` flag read/write reused. | Typecheck PASS. |
| MAP-010 | IMPLEMENTED | authStorageService/storageConfigStorage | `hasValidSettings` flag read reused for login gate. | Typecheck PASS. |
| MAP-011 | IMPLEMENTED | authStorageService/storageConfigStorage | PIN read uses SecureStore-backed storage service. | PIN gate uses same contract. |
| MAP-012 | IMPLEMENTED | loginService/WebViewScreen | `submitLogin` builds/checks URL and `WebViewScreen` opens success URL. | HTTP preflight default enabled. |
| MAP-013 | PARTIAL | sessionService | Local logout reset and injectable cleanup added. | Concrete remote delete API remains dependency scope. |
| MAP-014 | IMPLEMENTED | useAuthState | Hook manages loaded auth, submit success refresh and background logout. | Typecheck PASS. |
| MAP-015 | IMPLEMENTED | useSettingsGateState/authGate | Gate resolver hook added. | Available for Phase 4 tests. |
| MAP-016 | IMPLEMENTED | loginService | `preflightEnabled` defaults to true and can be disabled. | Documents iOS/Android divergence decision. |
| MAP-017 | IMPLEMENTED | storageConfigStorage/loginUrlService | SecureStore password and URL-time encoding reused. | Security hardening implemented. |
| MAP-018 | IMPLEMENTED | PinGateScreen | Shared RN PIN component replaces platform-specific controllers. | Typecheck PASS. |
| MAP-019 | IMPLEMENTED | package dependency | `expo-secure-store` already installed and imported by storage service. | Reuse instead of adding keychain package. |
| MAP-020 | IMPLEMENTED | package dependency | `@react-native-async-storage/async-storage` already installed and imported. | Reused for non-sensitive values. |
| MAP-021 | IMPLEMENTED | React Native AppState | `AppState.addEventListener('change')` used in `useAuthState`. | Background triggers local logout reset. |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| `MAP-013` | Remote server-side session cleanup is injectable but not wired to a concrete license/session API. | Blocks full logout/session API parity, not local auth-state parity. | Wire `SessionCleanup` to the session/license feature when that API is migrated. |
