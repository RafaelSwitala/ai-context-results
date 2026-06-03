# Migration Mapping

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, BEH-001..BEH-004, UI-001, UI-002 | src/screens/login/LoginScreen.tsx | `LoginScreen` | Adapt | Vereinheitlicht iOS/Android Login-Gates, Fehlermeldungen und Submit |
| MAP-002 | EP-003, EP-004, BEH-005, NAV-003, NAV-004 | src/navigation/authGate.ts | `resolveSettingsGate` | Add | Zentral entscheidet, ob Settings oder PIN |
| MAP-003 | BEH-006, NAV-005, UI-003, UI-004 | src/screens/pin/PinGateScreen.tsx | `PinGateScreen` | Adapt | Einheitliche PIN-Eingabe und Error-Feedback |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-004 | STOR-001..STOR-010, STATE-001..STATE-004 | src/services/authStorageService.ts | read/write credentials + flags + pin | Add | Typed Storage API für Login-Kontext |
| MAP-005 | API-001, API-002 | src/services/loginUrlService.ts | buildLoginUrl/buildLoginUrlFromState | Adapt | URL-Parameter parity inkl. optional Culture |
| MAP-006 | API-003, BEH-007 | src/services/sessionService.ts | logout + optional remote session cleanup | Adapt | Einheitliches Logout-Verhalten über AppState |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-007 | STOR-001, STOR-006 | Secure/Hybrid storage | `auth.userName` | Medium | User kann je nach Policy auch normal gespeichert werden |
| MAP-008 | STOR-002, STOR-007, SEC-001, SEC-002 | Secure storage | `auth.password` | Yes | Keine Klartext-/Base64-only Speicherung |
| MAP-009 | STOR-003, STOR-008 | AsyncStorage/MMKV | `auth.hasValidLogin` | No | Session-Flag |
| MAP-010 | STOR-004, STOR-009 | AsyncStorage/MMKV | `auth.hasValidSettings` | No | Gate-Flag |
| MAP-011 | STOR-005, STOR-010, SEC-003 | Secure storage | `auth.pin` | Yes | PIN geschützt speichern |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-012 | API-001, API-002 | `loginUrlService` + WebView launcher | `GET {base}/Default.aspx?user={u}&password={p}&App=MobileBrowser[&Culture={c}]` | iOS macht vorab Request, Android nicht; RN-Entscheidung separat |
| MAP-013 | API-003 | `sessionService` | `DELETE user sessions` (optional by token/user) | Best-effort cleanup, Fehler nicht blockierend |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-014 | STATE-001, STATE-002, STATE-003, STATE-004 | `useAuthState` | hasValidLogin=false | true nach login success; false bei app background/logout |
| MAP-015 | BEH-005, NAV-003, NAV-004 | `useSettingsGateState` | depends on saved settings/pin | settings/pin screen routing |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-016 | BEH-003, BEH-004, API-001, API-002 | HTTP-Response validiert Login vor WebView | direkter Übergang mit URL (Request auskommentiert) | Adapt: konfigurierbarer Preflight-Check (default enabled) | bessere Robustheit, aber Android-Abwärtskompatibilität möglich |
| MAP-017 | STOR-002, STOR-007, SEC-001, SEC-002 | raw password gespeichert | base64 gespeichert | Add secure encrypted storage + kein raw/base64-only Readback | Security-Härtung |
| MAP-018 | BEH-006, UI-003, UI-004 | iOS PIN UI mit Segue | Android PIN Activity mit keypad | Adapt auf gemeinsame RN PIN-Komponente | UX-Konsistenz |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-019 | Secure storage package (`react-native-keychain`/equivalent) | Add | Credentials und PIN sicher speichern | SEC-001..SEC-003 |
| MAP-020 | AsyncStorage/MMKV | Add/Reuse | Flags (`hasValidLogin`, `hasValidSettings`) und weniger sensible Werte | STOR-003, STOR-004, STOR-008, STOR-009 |
| MAP-021 | AppState listener | Reuse | Logout-Reset bei Backgrounding | BEH-007, STATE-003, STATE-004 |
