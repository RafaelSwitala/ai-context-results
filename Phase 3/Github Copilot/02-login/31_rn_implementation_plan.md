# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | login |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/login/claude/20260602-002/phase_3/31_rn_implementation_plan.md |
| Status | IMPLEMENTATION_IN_PROGRESS |
| Created by | GitHub Copilot |
| Last updated | 2026-06-07 (UTC+2) |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs | Sequence |
|---|---|---|---|---|---|
| MAP-001 | src/screens/login/LoginScreen.tsx | `LoginScreen` | Adapt | EP-001, EP-002, BEH-001..BEH-004, UI-001, UI-002, NAV-001, NAV-002, ERRPATH-001..ERRPATH-006 | 1 |
| MAP-002 | src/navigation/authGate.ts | `resolveSettingsGate` | Add | EP-003, EP-004, BEH-005, NAV-003, NAV-004 | 1 |
| MAP-003 | src/screens/pin/PinGateScreen.tsx | `PinGateScreen` | Adapt | BEH-006, NAV-005, UI-003, UI-004, ERRPATH-005, ERRPATH-007 | 1 |
| MAP-004 | src/services/authStorageService.ts | `authStorageService` | Add | STOR-001..STOR-010, STATE-001..STATE-004, SEC-001..SEC-003 | 2 |
| MAP-005 | src/services/loginUrlService.ts | `buildLoginUrl`, `buildLoginUrlFromState` | Adapt | API-001, API-002, STOR-001, STOR-006 | 3 |
| MAP-006 | src/services/sessionService.ts | `logout` | Adapt | API-003, BEH-007, STATE-003, STATE-004, EP-005, EP-006 | 4 |
| MAP-007 | src/services/authStorageService.ts | `readUsername`, `writeUsername` | Add | STOR-001, STOR-006, MAP-004 | 2 |
| MAP-008 | src/services/authStorageService.ts | `readPassword`, `writePassword` | Add | STOR-002, STOR-007, SEC-001, SEC-002, MAP-004 | 2 |
| MAP-009 | src/services/authStorageService.ts | `readHasValidLogin`, `writeHasValidLogin` | Add | STOR-003, STOR-008, STATE-001, STATE-002 | 2 |
| MAP-010 | src/services/authStorageService.ts | `readHasValidSettings`, `writeHasValidSettings` | Add | STOR-004, STOR-009, MAP-004 | 2 |
| MAP-011 | src/services/authStorageService.ts | `readPin`, `writePin` | Add | STOR-005, STOR-010, SEC-003, MAP-004 | 2 |
| MAP-012 | src/services/loginService.ts | `loginWithCredentials`, `checkLoginStatus` | Add | API-001, API-002, MAP-005, BEH-003, BEH-004, NAV-001, NAV-002 | 5 |
| MAP-013 | src/services/sessionService.ts | `deleteRemoteSession` | Add | API-003, BEH-007, EP-005, EP-006 | 4 |
| MAP-014 | src/hooks/useAuthState.ts | `useAuthState` | Add | STATE-001, STATE-002, STATE-003, STATE-004 | 6 |
| MAP-015 | src/navigation/authGate.ts | `useSettingsGateState` | Add | BEH-005, NAV-003, NAV-004, STATE-001 | 1 |
| MAP-016 | src/services/loginService.ts | `checkLoginPreflight` | Add | BEH-003, BEH-004, API-001, API-002 | 5 |
| MAP-017 | src/services/authStorageService.ts | `readPassword`, `writePassword` mit Encryption | Adapt | STOR-002, STOR-007, SEC-001, SEC-002, MAP-008 | 2 |
| MAP-018 | src/screens/pin/PinGateScreen.tsx | PIN input + validation logic | Adapt | BEH-006, UI-003, UI-004, MAP-003 | 1 |
| MAP-019 | package.json + src/services/authStorageService.ts | Secure storage via expo-secure-store | Add/Reuse | SEC-001..SEC-003, MAP-008, MAP-011, MAP-017 | 0 |
| MAP-020 | src/services/authStorageService.ts + src/services/storageConfigStorage.ts | AsyncStorage/MMKV reuse | Reuse | STOR-003, STOR-004, STOR-008, STOR-009 | 0 |
| MAP-021 | src/services/sessionService.ts | AppState listener for logout reset | Reuse | BEH-007, STATE-003, STATE-004, EP-005, EP-006 | 4 |

## Dependency Plan

| Dependency | Add/Reuse | Version | Reason | Source IDs | Status |
|---|---|---|---|---|---|
| expo-secure-store | Reuse | ~15.0.8 | Already in package.json; used for encrypted storage of credentials and PIN | SEC-001, SEC-002, SEC-003, MAP-019 | Already added |
| @react-native-async-storage/async-storage | Reuse | 2.2.0 | Already in package.json; used for non-sensitive flags | MAP-020 | Already added |
| @react-navigation/native | Reuse | ^7.2.2 | Already in package.json; used for authGate navigation | NAV-001..NAV-006, MAP-015 | Already added |
| react-native AppState | Reuse | Built-in | Native React Native API; used for lifecycle-based logout | BEH-007, STATE-003, STATE-004, MAP-021 | Built-in |
| react-native WebView | Reuse | ^13.16.1 | Already in package.json; used to trigger login in webview after credentials accepted | NAV-001, NAV-002 | Already added |

## Implementation Sequence

### Phase 0: Storage & Dependencies (Validation)
- Verify expo-secure-store and AsyncStorage are properly imported
- Ensure AppState listener available

### Phase 1: Navigation & Screens
1. Create or adapt `src/navigation/authGate.ts` (MAP-002, MAP-015)
2. Adapt `src/screens/login/LoginScreen.tsx` (MAP-001)
3. Create or adapt `src/screens/pin/PinGateScreen.tsx` (MAP-003, MAP-018)

### Phase 2: Storage Service
- Create `src/services/authStorageService.ts` (MAP-004, MAP-007 through MAP-011, MAP-017, MAP-019)
  - Read/write username, password, hasValidLogin, hasValidSettings, pin
  - Use secure storage for credentials/PIN; AsyncStorage for flags

### Phase 3: Login Service
- Adapt `src/services/loginUrlService.ts` (MAP-005)
- Create `src/services/loginService.ts` (MAP-012, MAP-013, MAP-016)
  - `loginWithCredentials`: send credentials, handle response
  - `checkLoginPreflight`: iOS-style pre-check (optional)
  - `checkLoginStatus`: read stored login flag

### Phase 4: Session & State Management
- Adapt `src/services/sessionService.ts` (MAP-006, MAP-013, MAP-021)
  - Add `deleteRemoteSession` for logout cleanup
  - Add AppState listener to reset login on background

### Phase 5: Hooks
- Create `src/hooks/useAuthState.ts` (MAP-014)
  - Expose login state, transitions

### Validation & Testing
- TypeScript compilation pass
- Lint pass
- All source IDs referenced in mappings
