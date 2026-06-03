# Migration Mapping

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T17:57:20+02:00 |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, EP-008, BEH-001, BEH-002, BEH-012, BEH-013, BEH-014, BEH-015, BEH-016, NAV-001, NAV-002, NAV-009, NAV-013, NAV-014, UI-001, UI-004 | rn-e-mobilebrowser/src/screens/LoginScreen.tsx | LoginScreen | Add | Owns settings/PIN guard triggers, WebView submit route, license launch and Android back behavior. |
| MAP-002 | EP-003, EP-009, BEH-017, BEH-018, NAV-004, NAV-011, NAV-012 | rn-e-mobilebrowser/src/screens/SettingsScreen.tsx | SettingsScreen | Add/Adapt | Settings feature owns form semantics; navigation owns save/cancel/QR route contract. |
| MAP-003 | EP-004, EP-010, BEH-010, BEH-019, ERRPATH-001, ERRPATH-007, NAV-005, NAV-012, UI-003, UI-006 | rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Add | Return parsed QR payload to Settings; invalid QR remains scanner. |
| MAP-004 | EP-013, BEH-027, STATE-002, STATE-007, NAV-010 | rn-e-mobilebrowser/src/screens/PinScreen.tsx | PinScreen | Add | Correct PIN navigates to Settings; back/exit follows Android-specific behavior and iOS cancel dismissal. |
| MAP-005 | EP-005, EP-006, EP-011, BEH-003, BEH-004, BEH-005, BEH-006, BEH-007, BEH-008, BEH-009, BEH-020, BEH-021, BEH-022, BEH-023, BEH-024, NAV-003, NAV-006, NAV-007, NAV-015, NAV-016, NAV-018, UI-002, UI-005 | rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | WebViewScreen | Add | Merge iOS wrapper and native WebView Activity into one RN route with URL param. |
| MAP-006 | EP-007, EP-012, BEH-011, BEH-025, BEH-026, ERRPATH-002, NAV-008, NAV-017 | rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add | Returns WebView route with original URL plus optional scan result; invalid auth resets Login. |
| MAP-007 | BEH-015, NAV-014 | rn-e-mobilebrowser/src/screens/LicenseScreen.tsx | LicenseScreen | Add/Adapt | Only required if license menu remains in RN feature scope. |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-008 | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 | rn-e-mobilebrowser/src/navigation/navigation.constants.ts | route constants and URL keys | Add | Preserve `barcodescanner`, `login.aspx`, `ScanResult` and URL param semantics. |
| MAP-009 | BEH-008, BEH-009, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005, ERRPATH-006 | rn-e-mobilebrowser/src/services/webViewNavigationService.ts | classifyWebViewUrl/deriveScannerReturnUrl | Add | Pure functions make WebView route decisions testable outside UI. |
| MAP-010 | BEH-006, BEH-007, BEH-022, BEH-023, BEH-024, BEH-026, SEC-001 | rn-e-mobilebrowser/src/services/navigationAuthGuard.ts | resetToLoginIfInvalid/logoutAndReset | Add | Centralize valid-login route reset and logout stack reset. |
| MAP-011 | BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-002, ERRPATH-007 | rn-e-mobilebrowser/src/services/scannerNavigationService.ts | normalizeQrPayload/buildScanResultUrl | Add | Handles QR normalization and barcode result URL construction. |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-012 | STOR-001, STOR-002, STATE-001, STATE-006, SEC-001 | Existing login/settings storage service | pin, hasValidSettings, hasValidLogin | PIN yes | Navigation reads these values; storage implementation belongs to storage-config/login phases. |
| MAP-013 | STOR-003, SEC-002 | React Navigation route params | url, returnUrl, scanResult | URL may contain credentials | Do not persist route URLs for navigation; avoid logging route params. |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-014 | API-001, API-002, DEP-002, DEP-005 | WebViewScreen | WebView URL load | Use `react-native-webview` with no-cache headers where supported. |
| MAP-015 | API-003 | N/A | N/A | Remote login/settings checks remain dependencies; navigation consumes success/failure outcomes. |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-016 | STATE-001, STATE-002, STATE-006, STATE-007 | rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | Login stack. | Login -> PIN/Settings; PIN success -> Settings; cancel/back -> platform-specific close/back. |
| MAP-017 | STATE-003, STATE-008, STOR-003 | AppNavigator/WebViewScreen route params | Login with URL ready. | Login success -> WebView(url). |
| MAP-018 | STATE-004, STATE-010, SEC-001 | useNavigationAuthGuard | WebView/scanner authenticated. | logout/session expiry/error -> reset or navigate to Login. |
| MAP-019 | STATE-005, STATE-009, BEH-008, BEH-021 | WebViewScreen/BarcodeScannerScreen | WebView. | barcode URL -> scanner(returnUrl) or Android denied fallback. |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-020 | BEH-003, BEH-004, BEH-014, STOR-003 | Login opens WebsiteWrapper, wrapper embeds WebView child. | Login starts WebviewActivity directly with URL extra. | Use one `WebViewScreen` route with URL param; no wrapper route unless layout requires it. | Wrapper is transport detail; route payload is the shared behavior. |
| MAP-021 | BEH-008, BEH-021, ERRPATH-006, SEC-003 | Barcode route opens scanner without observed permission branch in navigation code. | Barcode route checks camera permission and falls back to loading return URL. | RN must implement permission guard before scanner route and keep denied fallback. | Android source has explicit user-facing permission route. |
| MAP-022 | BEH-016, BEH-024, BEH-027 | iOS uses modal cancel/unwind/dismiss; no Android hardware back model. | Login backgrounds task, WebView ignores back, scanner disables back, PIN back finishes. | Implement Android BackHandler per screen; iOS follows navigation buttons. | Back behavior is user-visible and screen-specific. |
| MAP-023 | BEH-015, NAV-014 | No iOS license route found in storyboard. | Login popup starts LicenseActivity. | Add License route only for Android parity or cross-platform product decision. | Route is Android-only in discovered sources. |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-024 | @react-navigation/native | Reuse | Dependency exists and App currently lacks navigator. | DEP-007, RN-FILE-001, RN-FILE-002 |
| MAP-025 | react-native-webview | Reuse | Required for WebViewScreen parity. | DEP-002, DEP-005, RN-FILE-001 |
| MAP-026 | Camera/scanner library | Add | RN package for QR/barcode scanning is not present in package.json. | DEP-003, DEP-006, RN-FILE-001 |
| MAP-027 | Jest/jest-expo | Reuse | Needed for pure route decision and component tests. | RN-FILE-001 |
