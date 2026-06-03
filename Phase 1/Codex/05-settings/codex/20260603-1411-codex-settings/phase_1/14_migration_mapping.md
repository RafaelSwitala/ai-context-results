# Migration Mapping

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/settings/codex/20260603-1411-codex-settings/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-03T14:11:00+02:00 |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-SET-001 | EP-SET-003, EP-SET-007, UI-SET-001, UI-SET-004, UI-SET-005 | src/features/settings/SettingsScreen.tsx | SettingsScreen | Add | One cross-platform screen with fields for server, client, protocol enum, token, locale, PIN, save/cancel, QR action, loading, and error dialogs. |
| MAP-SET-002 | EP-SET-001, EP-SET-002, EP-SET-005, EP-SET-006, NAV-SET-001, NAV-SET-002, NAV-SET-003, NAV-SET-006, NAV-SET-007 | src/navigation/AppNavigator.tsx | AppNavigator | Add | Startup and settings-button routes must decide between Settings and Pin screen based on valid settings and PIN. |
| MAP-SET-003 | NAV-SET-004, NAV-SET-008 | src/features/settings/PinGateScreen.tsx | PinGateScreen | Add | Reuse existing PIN feature behavior if migrated; settings migration needs only the route-to-settings contract. |
| MAP-SET-004 | EP-SET-004, NAV-SET-005, NAV-SET-009, BEH-SET-005, BEH-SET-012 | src/features/settings/SettingsQrImportButton.tsx | SettingsQrImportButton | Add | QR scanner implementation may live in scanner feature; settings owns consuming the returned URL and applying parsed settings. |
| MAP-SET-005 | BEH-SET-002, UI-SET-006 | src/features/settings/SettingsActions.tsx | SettingsActions | Add | Cancel visibility should follow RN decision in MAP-SET-020 because iOS and Android differ. |
| MAP-SET-006 | UI-SET-003 | src/features/settings/useKeyboardInsets.ts | useKeyboardInsets | Adapt | Use React Native keyboard APIs or safe-area-aware scroll behavior for form accessibility. |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-SET-007 | BEH-SET-003, BEH-SET-009, ERRPATH-SET-003, ERRPATH-SET-004, ERRPATH-SET-006, ERRPATH-SET-007 | src/features/settings/settingsValidation.ts | validateSettingsForm | Add | Return typed errors for empty server and invalid PIN length. |
| MAP-SET-008 | BEH-SET-004, BEH-SET-010, API-SET-001, API-SET-002, ERRPATH-SET-001, ERRPATH-SET-002, ERRPATH-SET-005 | src/features/settings/settingsConnectionService.ts | checkSettingsAccess | Add | Build check URL, run HTTP request, and apply RN decision for accepted status codes. |
| MAP-SET-009 | BEH-SET-006, BEH-SET-013, ERRPATH-SET-008 | src/features/settings/settingsQrParser.ts | parseSettingsQrCode | Add | Parse shared QR fields plus Android culture; expose validity result so screen can choose iOS leniency or Android strictness. |
| MAP-SET-010 | BEH-SET-014, ERRPATH-SET-009 | src/features/settings/configFileService.ts | loadBundledSettingsConfig | Add | Needed only if RN carries Android config-file bootstrap; otherwise mark excluded in Phase 3 with product decision. |
| MAP-SET-011 | BEH-SET-015 | src/features/settings/settingsMigrationService.ts | replaceLegacyDouglasServerName | Add | Preserve Android Douglas replacement as a one-time migration or drop by explicit decision. |
| MAP-SET-012 | BEH-SET-011, STATE-SET-009 | src/features/settings/languageService.ts | getAvailableLanguages/saveLocale | Add | Android language behavior should become cross-platform or be Android-only with documented divergence. |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-SET-013 | STOR-SET-001, STOR-SET-002, STOR-SET-004, STOR-SET-006, STOR-SET-008 | AsyncStorage | `settings.server`, `settings.client`, `settings.protocol`, `settings.hasValidSettings` | No | Non-sensitive settings can use AsyncStorage; key migration from native legacy is not automatic in RN. |
| MAP-SET-014 | STOR-SET-003, STOR-SET-005, STOR-SET-007, SEC-SET-001, SEC-SET-002, DEP-SET-007 | SecureStore | `settings.pin`, `settings.token` | Yes | PIN and token should move to SecureStore even though legacy used UserDefaults/SharedPreferences. |
| MAP-SET-015 | STOR-SET-009, BEH-SET-011 | AsyncStorage | `settings.locale` | No | Required for Android parity and for appending Culture to login URLs if that behavior is retained. |
| MAP-SET-016 | STOR-SET-010, BEH-SET-014 | AsyncStorage | `settings.currentConfigVersion` | No | Required only if bundled config-file bootstrap is implemented. |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-SET-017 | API-SET-001, API-SET-002, BEH-SET-004, BEH-SET-010 | settingsConnectionService | GET `{protocol}://{server}/PRESTIGEenterprise.MobileBrowser{client}/Default.aspx` | Use shared URL builder; decide whether success means iOS 200-only or Android any-2xx. |
| MAP-SET-018 | SEC-SET-003, DEP-SET-003 | Native Android network adapter or exclusion note | HTTPS without validation | RN JavaScript fetch cannot reliably implement trust-all TLS; Phase 3 must either add native Android support or exclude this mode with product sign-off. |
| MAP-SET-019 | SEC-SET-004, SEC-SET-005 | Platform network config | HTTP cleartext | RN must include Android cleartext/network security and iOS ATS handling if HTTP mode remains supported. |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-SET-020 | STATE-SET-001, STATE-SET-005, STOR-SET-006, STOR-SET-008 | useSettingsBootstrap | `hasValidSettings` from storage | false routes to Settings or PinGate; true routes to Login/Main flow. |
| MAP-SET-021 | BEH-SET-001, BEH-SET-007, STOR-SET-001, STOR-SET-002, STOR-SET-003, STOR-SET-004, STOR-SET-005, STOR-SET-007 | useSettingsForm | Stored values or defaults | Field edits update local state; save validates and persists. |
| MAP-SET-022 | STATE-SET-003, STATE-SET-006, STATE-SET-007 | useSettingsSave | idle | validating -> checking -> saving -> saved or error. |
| MAP-SET-023 | BEH-SET-012, BEH-SET-013, STATE-SET-009 | useSettingsQrImport | current form values | parsed QR result updates form and locale when valid per RN decision. |
| MAP-SET-024 | BEH-SET-011, STOR-SET-009 | useLocaleSelection | saved locale or default locale | selection immediately persists locale. |
| MAP-SET-025 | BEH-SET-014, STATE-SET-008, STOR-SET-010 | useConfigBootstrap | stored current config version | valid changed config updates settings and version. |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-SET-026 | BEH-SET-008, STOR-SET-004, STOR-SET-007, SEC-SET-003 | Binary HTTP/HTTPS switch. | Three protocol modes: HTTP, HTTPS, HTTPS without validation. | Model protocol as enum with values `http`, `https`, `httpsWithoutValidation`; hide/disable unsafe mode unless product approves native support. | Android has shipping behavior that cannot be represented by boolean. |
| MAP-SET-027 | API-SET-001, API-SET-002 | Accepts only HTTP 200. | Accepts any 2xx status. | Prefer Android any-2xx for HTTP semantics, then document divergence from iOS. | HTTP 204/201 are success statuses in Android helper. |
| MAP-SET-028 | BEH-SET-005, BEH-SET-012, ERRPATH-SET-008 | Settings applies parsed QR values without QR validity check. | Settings applies QR values only when QR settings are valid. | Prefer Android strict validity before applying QR values. | Prevents malformed QR from overwriting form. |
| MAP-SET-029 | BEH-SET-011, STOR-SET-009 | No settings language control. | Language spinner persists locale and QR can set culture. | Carry locale in RN settings if Android parity is required; otherwise mark iOS-aligned exclusion. | Android login URL appends Culture from saved locale. |
| MAP-SET-030 | BEH-SET-002, UI-SET-006 | Cancel hidden when no valid settings exist. | Cancel hidden when no saved server/client/password/PIN/token exists. | Prefer iOS valid-settings rule for clearer startup lock-in, unless preserving Android partial-preferences behavior is required. | Validity flag better matches ability to leave settings. |
| MAP-SET-031 | BEH-SET-014, STOR-SET-010 | No config-file bootstrap found. | Config file can overwrite settings on version change. | Implement as optional bootstrap service gated by bundled config presence. | Android uses it for flavor/customer configuration. |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-SET-032 | @react-native-async-storage/async-storage | Reuse | Already installed for non-sensitive settings. | DEP-SET-006, RN-FILE-001 |
| MAP-SET-033 | expo-secure-store | Reuse | Already installed for token/PIN storage. | DEP-SET-007, SEC-SET-001, SEC-SET-002 |
| MAP-SET-034 | @react-navigation/native | Reuse | Already installed for settings/login/PIN routing. | EP-SET-001, EP-SET-005, RN-FILE-001 |
| MAP-SET-035 | react-native-webview | Reuse | Already installed for downstream WebView feature; settings controls its login URL inputs. | API-SET-001, API-SET-002, RN-FILE-001 |
| MAP-SET-036 | Native Android networking module | Add only if approved | Needed for HTTPS without validation parity; otherwise exclude unsafe mode. | SEC-SET-003, MAP-SET-018 |
