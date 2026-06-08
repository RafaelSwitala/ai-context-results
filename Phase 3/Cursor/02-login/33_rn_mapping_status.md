# RN Mapping Status

| Field | Value |
|---|---|
| Feature | login |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_3/33_rn_mapping_status.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T14:30:00+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | LoginScreen + useLogin + LoginForm | src/screens/LoginScreen.tsx | Validation, prefill, submit, settings button |
| MAP-002 | IMPLEMENTED | authGate.ts | src/navigation/authGate.ts | resolveSettingsGate, resolveSettingsButtonGate |
| MAP-003 | IMPLEMENTED | PinScreen + PinEntry | src/screens/PinScreen.tsx | Auto-verify at 4 digits, empty PIN closes |
| MAP-004 | IMPLEMENTED | authStorageService | src/services/authStorageService.ts | Typed read/write over storageConfigStorage |
| MAP-005 | IMPLEMENTED | loginService, loginUrlService | src/services/loginService.ts | buildLoginUrlFromState, submitLogin |
| MAP-006 | IMPLEMENTED | sessionService.logout | src/services/sessionService.ts | AppState-triggered logout |
| MAP-007 | IMPLEMENTED | authStorageService.readAuthState | userName via AsyncStorage | Medium sensitivity in AsyncStorage |
| MAP-008 | IMPLEMENTED | SecureStore password | storageConfigStorage SECURE_KEYS.password | No plain/base64-only persistence |
| MAP-009 | IMPLEMENTED | setValidLoginFlag | authStorageService | hasValidLogin flag |
| MAP-010 | IMPLEMENTED | getValidSettingsFlag | authStorageService | Login gate check |
| MAP-011 | IMPLEMENTED | SecureStore pin | storageConfigStorage SECURE_KEYS.pin | Reused from storage-config |
| MAP-012 | IMPLEMENTED | submitLogin preflight | loginService.ts | GET with Cache-Control, status 200 |
| MAP-013 | IMPLEMENTED | killUserSessionsBestEffort | sessionService.ts | Best-effort DELETE; errors swallowed |
| MAP-014 | IMPLEMENTED | useAuthState | src/hooks/useAuthState.ts | markLoggedIn + background reset |
| MAP-015 | IMPLEMENTED | useSettingsGateState | src/hooks/useSettingsGateState.ts | Startup replace to Settings/Pin |
| MAP-016 | IMPLEMENTED | DEFAULT_PREFLIGHT=true | loginService.ts | Documented RN policy; configurable |
| MAP-017 | IMPLEMENTED | SecureStore + URL base64 only | passwordEncoding.ts | Security baseline vs legacy |
| MAP-018 | IMPLEMENTED | PinEntry component | src/components/PinEntry.tsx | Unified RN PIN UX |
| MAP-019 | IMPLEMENTED | expo-secure-store | package.json (reuse) | keychain equivalent not added |
| MAP-020 | IMPLEMENTED | AsyncStorage flags | storageConfigStorage.ts (reuse) | hasValidLogin, hasValidSettings |
| MAP-021 | IMPLEMENTED | AppState listener | useAuthState.ts | Matches iOS/Android background logout |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| — | PeCustomErrorParser full message mapping | Nein | Phase 4: generic errorCode message test |
| — | License menu (Android LoginActivity) | Nein | Out of scope per P1-A11 |
| — | WebView feature behavior | Nein | Separate webview feature; shell only here |
