# Migration Mapping

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, BEH-001, BEH-002, UI-001, UI-002 | src/screens/settings/SettingsScreen.tsx | `SettingsScreen` | Adapt | Einheitlicher Save-Flow inkl. Validierung, async save und Error UI |
| MAP-002 | EP-003, EP-004, NAV-001, NAV-003, NAV-005 | src/screens/login/LoginScreen.tsx | `LoginScreen` | Adapt | Gate auf valid settings + optional PIN guard als separater Branch |
| MAP-003 | BEH-006, UI-003 | src/features/storageConfig/qrConfigParser.ts | `parseStorageConfigQr` | Add | Plattformneutrales QR Mapping (inkl. defaults) |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-004 | STOR-001..STOR-013, STATE-001..STATE-005 | src/services/storageConfigService.ts | load/save settings/login/meta flags | Add | Zentraler Service mit typed DTO und Key-Konstanten |
| MAP-005 | API-001, API-002 | src/services/connectivityService.ts | checkAccess(server, client, protocol) | Adapt | Ersetzt plattformspezifischen HTTP-Check |
| MAP-006 | API-003, API-004 | src/services/loginUrlService.ts | buildLoginUrl/buildCheckAccessUrl | Adapt | Vereinheitlicht URL-Encoding und Query-Bau |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-007 | STOR-001, STOR-007 | AsyncStorage/MMKV | `storageConfig.server` | No | Persistiert Zielserver |
| MAP-008 | STOR-002, STOR-008 | AsyncStorage/MMKV | `storageConfig.client` | No | Optionaler Mandant |
| MAP-009 | STOR-003, STOR-004, STOR-009 | SecureStore/Keystore-backed storage | `storageConfig.token/pin` | Yes | Sensible Werte getrennt von normalem Key-Value-Store |
| MAP-010 | STOR-005, STOR-010 | AsyncStorage/MMKV | `storageConfig.protocol` | No | Enum-Wert mit Validierung |
| MAP-011 | STOR-006, STOR-011 | AsyncStorage/MMKV | `storageConfig.hasValidSettings/login` | No | Gate-Flags |
| MAP-012 | STOR-012, STOR-013 | AsyncStorage/MMKV | `storageConfig.locale/configVersion` | No | Android-Divergenz optional als Feature Flag |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-013 | API-001, API-002 | `connectivityService` | `GET {protocol}://{server}/PrestigeEnterprise.MobileBrowser{client}/Default.aspx` | Muss identische Endpoint-Semantik behalten |
| MAP-014 | API-003, API-004 | `loginUrlService` + WebView launcher | `GET {base}/Default.aspx?user={u}&password={p}&App=MobileBrowser[&Culture={c}]` | Culture-Handling als konfigurierbare Option |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-015 | STATE-001, STATE-002 | `useStorageConfigState` | hasValidSettings=false | true nach erfolgreichem checkAccess+save |
| MAP-016 | STATE-003, STATE-004 | `useLoginState` | hasValidLogin=false | true nach erfolgreichem Loginflow |
| MAP-017 | STATE-005 | `useStorageConfigState` | configVersion=null | update bei erfolgreicher seed-Migration |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-018 | STOR-005, STOR-010, SEC-003 | nur HTTP/HTTPS | HTTP/HTTPS/HTTPS-ohne-Validation | Adapt mit explizitem `allowInsecureTls` Toggle (default false) | Sicherheitsrisiko kontrollieren, aber Legacy-Pfad dokumentiert erhalten |
| MAP-019 | BEH-005, STOR-013 | kein config.json bootstrap | bootstrap aus config.json mit Version | Adapt als optionales Bootstrap-Modul | Android-Verhalten darf reproduzierbar bleiben ohne iOS zu brechen |
| MAP-020 | BEH-006, STOR-012 | QR ohne culture | QR mit culture + locale persist | Adapt: culture optional parser field | Cross-platform Konsistenz plus Android-Abwärtskompatibilität |
| MAP-021 | SEC-001, SEC-002 | Klartextähnliche Persistenz in UserDefaults | SharedPreferences ohne zusätzliche Verschlüsselung | Add secure storage für sensible Daten | RN kann Security-Baseline verbessern ohne Featureverlust |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-022 | `@react-native-async-storage/async-storage` oder MMKV | Add | Persistenz für nicht-sensitive Settings/Flags | DEP-001, DEP-003 |
| MAP-023 | Secure Storage (`expo-secure-store` oder `react-native-keychain`) | Add | PIN/Token/Passwort geschützt speichern | SEC-001, SEC-002 |
| MAP-024 | HTTP Client (`fetch`/`axios`) | Reuse/Add | checkAccess und Login-URL-verifizierte Flows | DEP-002, API-001, API-002 |
| MAP-025 | QR Parser utility (existing or new) | Add | QR-basiertes Prefill bleibt erhalten | BEH-006, UI-003 |
