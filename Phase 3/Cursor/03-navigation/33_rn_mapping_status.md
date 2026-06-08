# RN Mapping Status

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A33 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_3/33_rn_mapping_status.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T15:00:00+02:00 |

## Mapping Status

| Mapping ID | Status | RN Target | Evidence | Notes |
|---|---|---|---|---|
| MAP-001 | IMPLEMENTED | LoginScreen | src/screens/LoginScreen.tsx | Settings guard via authGate; license route; Android back exits app |
| MAP-002 | IMPLEMENTED | SettingsScreen | src/screens/SettingsScreen.tsx | Reused from storage-config; save/cancel/QR routes intact |
| MAP-003 | IMPLEMENTED | QRCodeScannerScreen | src/screens/QRCodeScannerScreen.tsx | QR payload to Settings; hardware back disabled |
| MAP-004 | IMPLEMENTED | PinScreen | src/screens/PinScreen.tsx | Correct PIN -> Settings; back finishes |
| MAP-005 | IMPLEMENTED | WebViewScreen | src/screens/WebViewScreen.tsx | URL classifier, logout, login return, barcode trigger |
| MAP-006 | IMPLEMENTED | BarcodeScannerScreen | src/screens/BarcodeScannerScreen.tsx | ScanResult URL; auth guard on focus |
| MAP-007 | PARTIAL | LicenseScreen | src/screens/LicenseScreen.tsx | Route exists; license HTML content out of scope |
| MAP-008 | IMPLEMENTED | navigation.constants.ts | src/navigation/navigation.constants.ts | barcodescanner, login.aspx, ScanResult tokens |
| MAP-009 | IMPLEMENTED | webViewNavigationService.ts | Pure URL classification functions | Matches Phase 2 legacy tests |
| MAP-010 | IMPLEMENTED | navigationAuthGuard.ts | resetToLoginIfInvalid, logoutAndReset | Central auth reset |
| MAP-011 | IMPLEMENTED | scannerNavigationService.ts | buildScanResultUrl, normalizeQrPayload | Reuses storage-config QR normalize |
| MAP-012 | IMPLEMENTED | authStorageService | Reused from login phase | Navigation reads guard flags |
| MAP-013 | IMPLEMENTED | types.ts route params | url, returnUrl not persisted | Params in navigation state only |
| MAP-014 | IMPLEMENTED | WebViewScreen WebView | incognito, no-cache style load | react-native-webview |
| MAP-015 | EXCLUDED | N/A | Remote login/settings checks | Consumed from login/storage-config features |
| MAP-016 | IMPLEMENTED | AppNavigator.tsx | Full typed stack | Login initial route |
| MAP-017 | IMPLEMENTED | WebView route param | WebView: { url: string } | Single route replaces iOS wrapper |
| MAP-018 | IMPLEMENTED | useNavigationAuthGuard | Focus + AppState active check | Resets to Login when invalid |
| MAP-019 | IMPLEMENTED | WebView -> BarcodeScanner flow | navigation.navigate with returnUrl | Duplicate scan ignored |
| MAP-020 | IMPLEMENTED | WebViewScreen | No wrapper route | MAP-020 decision applied |
| MAP-021 | IMPLEMENTED | WebViewScreen permission fallback | Alert + load returnUrl when denied | Android parity |
| MAP-022 | IMPLEMENTED | useNavigationAuthGuard BackHandlers | Login/Pin/WebView/Scanner specific | Per-screen Android back |
| MAP-023 | PARTIAL | LicenseScreen | Route for Android parity | Content rendering excluded |
| MAP-024 | IMPLEMENTED | @react-navigation/native | package.json | Reused |
| MAP-025 | IMPLEMENTED | react-native-webview | WebViewScreen | Reused |
| MAP-026 | IMPLEMENTED | expo-camera | QR + Barcode screens | Reused, not new package |
| MAP-027 | IMPLEMENTED | jest/jest-expo | jest.config.js | Phase 4 tests planned |

## Open Gaps

| Mapping ID | Gap | Blocks Phase 4/5 | Required Action |
|---|---|---|---|
| MAP-007 | License HTML/WebView content | Nein | Separate license feature or Phase 5 exclusion doc |
| MAP-015 | No standalone remote navigation API | Nein | Covered by login/storage-config |
| MAP-007/023 | iOS has no license route in storyboard | Nein | RN adds cross-platform route by product decision |
