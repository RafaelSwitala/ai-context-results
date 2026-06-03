# Migration Mapping

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | NAV-001..NAV-018, BEH-001, BEH-002 | src/navigation/AppNavigator.tsx | `AppNavigator` | Add | Zentraler Stack/Modal-Router für alle Legacy-Routen |
| MAP-002 | NAV-001, NAV-010, STOR-001 | src/screens/webview/WebViewScreen.tsx | `WebViewScreen` | Adapt | Ein Screen statt iOS Wrapper+Child und Android Activity |
| MAP-003 | NAV-002, NAV-003, NAV-011, NAV-014 | src/screens/settings/SettingsScreen.tsx | `SettingsScreen` | Reuse | Bereits aus storage-config/login bekannt |
| MAP-004 | NAV-003, NAV-004, NAV-011, NAV-014 | src/screens/pin/PinGateScreen.tsx | `PinGateScreen` | Reuse | PIN-Gate vor Settings |
| MAP-005 | NAV-005, NAV-006, NAV-013 | src/screens/settings/QrScannerScreen.tsx | `QrScannerScreen` | Adapt | iOS unwind vs Android for-result vereinheitlichen |
| MAP-006 | NAV-007, NAV-009, NAV-015, NAV-016, BEH-005 | src/screens/scanner/ArticleScannerScreen.tsx | `ArticleScannerScreen` | Adapt | Barcode flow mit Rückgabe-URL |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-007 | BEH-004, STOR-002, SEC-002 | src/navigation/authGuard.ts | `canNavigate(route, authState)` | Add | Abbildung von hasValidLogin Guards |
| MAP-008 | BEH-005, EP-006, EP-007 | src/navigation/webviewNavigationBridge.ts | `resolveWebViewNavigation(url)` | Add | Parst barcodescanner/login URLs zu RN routes |
| MAP-009 | BEH-006, BEH-007, STATE-001 | src/navigation/sessionNavigation.ts | `navigateToLoginAfterLogout` | Add | Einheitlicher Logout->Login Pfad |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-010 | STOR-001 | Route params / in-memory nav state | `nav.initialUrl` | Yes | URL nicht dauerhaft loggen |
| MAP-011 | STOR-002 | Auth state hook | `auth.hasValidLogin` | No | Guard-Flag für Navigation |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-012 | API-001 | N/A | N/A | Kein API-Mapping erforderlich; Navigation rein clientseitig |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-013 | STATE-001, STATE-002, STATE-003 | `useNavigationAuthState` | route=Login | WebView bei Login; Login bei logout/guard/empty URL |
| MAP-014 | BEH-005, NAV-009, NAV-016 | `useScannerReturnState` | pendingReturnUrl=null | setzt WebView URL nach Scan |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-015 | BEH-001, BEH-002, DEP-001, DEP-003 | Storyboard Segues (modal) | Intent Activity stack | Add React Navigation stack + modals | Einheitliches Routing-Modell |
| MAP-016 | BEH-003, NAV-001, NAV-010 | Wrapper embeds child WebView VC | Single WebviewActivity | Adapt: ein WebViewScreen | Vereinfachung ohne Funktionsverlust |
| MAP-017 | BEH-008, UI-002 | Login dismiss/unwind patterns | Back disabled + moveTaskToBack/finish | Adapt: explizite BackHandler Policies pro Screen | Verhindert inkonsistentes Back-Verhalten |
| MAP-018 | NAV-013, NAV-006 | QR via unwind segue | QR via startActivityForResult | Adapt: RN screen mit callback param | Moderne API, gleiches Ergebnis |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-019 | `@react-navigation/native` + stack | Add | Primärer Ersatz für Segues/Intents | DEP-001, DEP-003 |
| MAP-020 | `react-native-webview` navigation hooks | Reuse/Add | URL-getriggerte Routen aus WebView | DEP-002, BEH-005 |
| MAP-021 | React Native `BackHandler` | Add | Android Back-Policy und Hardware-Back | BEH-008, UI-002 |
