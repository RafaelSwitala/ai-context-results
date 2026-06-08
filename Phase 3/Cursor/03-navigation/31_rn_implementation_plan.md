# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_3/31_rn_implementation_plan.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T15:00:00+02:00 |

## Implementation Plan

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs |
|---|---|---|---|---|
| MAP-001 | src/screens/LoginScreen.tsx | LoginScreen | Adapt | EP-001, EP-002, EP-008, BEH-001, BEH-002, BEH-012..BEH-016, NAV-001, NAV-002, NAV-009, NAV-013, NAV-014, UI-001, UI-004 |
| MAP-002 | src/screens/SettingsScreen.tsx | SettingsScreen | Reuse/Adapt | EP-003, EP-009, BEH-017, BEH-018, NAV-004, NAV-011, NAV-012 |
| MAP-003 | src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Adapt | EP-004, EP-010, BEH-010, BEH-019, ERRPATH-001, ERRPATH-007, NAV-005, NAV-012, UI-003, UI-006 |
| MAP-004 | src/screens/PinScreen.tsx | PinScreen | Adapt | EP-013, BEH-027, STATE-002, STATE-007, NAV-010 |
| MAP-005 | src/screens/WebViewScreen.tsx | WebViewScreen | Adapt | EP-005, EP-006, EP-011, BEH-003..BEH-009, BEH-020..BEH-024, NAV-003, NAV-006, NAV-007, NAV-015, NAV-016, NAV-018, UI-002, UI-005 |
| MAP-006 | src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add | EP-007, EP-012, BEH-011, BEH-025, BEH-026, ERRPATH-002, NAV-008, NAV-017 |
| MAP-007 | src/screens/LicenseScreen.tsx | LicenseScreen | Add | BEH-015, NAV-014, MAP-023 |
| MAP-008 | src/navigation/navigation.constants.ts | ROUTE_NAMES, URL constants | Add | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 |
| MAP-009 | src/services/webViewNavigationService.ts | classifyWebViewUrl, deriveScannerReturnUrl | Add | BEH-008, BEH-009, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005, ERRPATH-006 |
| MAP-010 | src/services/navigationAuthGuard.ts | resetToLoginIfInvalid, logoutAndReset | Add | BEH-006, BEH-007, BEH-022, BEH-024, BEH-026, SEC-001 |
| MAP-011 | src/services/scannerNavigationService.ts | buildScanResultUrl, normalizeQrPayload | Add | BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-007 |
| MAP-012 | authStorageService / storageConfigStorage | read guards | Reuse | STOR-001, STOR-002, STATE-001, STATE-006, SEC-001 |
| MAP-013 | src/navigation/types.ts | route params url/returnUrl | Add | STOR-003, SEC-002 |
| MAP-014 | src/screens/WebViewScreen.tsx | WebView load | Adapt | API-001, API-002, DEP-002, DEP-005 |
| MAP-015 | N/A | remote checks | Excluded | API-003 |
| MAP-016 | src/navigation/AppNavigator.tsx | Stack navigator | Adapt | STATE-001, STATE-002, STATE-006, STATE-007 |
| MAP-017 | src/screens/WebViewScreen.tsx | WebView(url) route | Adapt | STATE-003, STATE-008, STOR-003 |
| MAP-018 | src/hooks/useNavigationAuthGuard.ts | useNavigationAuthGuard | Add | STATE-004, STATE-010, SEC-001 |
| MAP-019 | WebViewScreen + BarcodeScannerScreen | barcode route flow | Add | STATE-005, STATE-009, BEH-008, BEH-021 |
| MAP-020 | src/screens/WebViewScreen.tsx | single WebView route | Adapt | BEH-003, BEH-004, BEH-014, STOR-003 |
| MAP-021 | src/screens/WebViewScreen.tsx | camera permission fallback | Add | BEH-008, BEH-021, ERRPATH-006, SEC-003 |
| MAP-022 | src/hooks/useNavigationAuthGuard.ts | BackHandler hooks | Add | BEH-016, BEH-019, BEH-024, BEH-027 |
| MAP-023 | src/screens/LicenseScreen.tsx | License route | Add | BEH-015, NAV-014 |
| MAP-024 | @react-navigation/native | NavigationContainer | Reuse | DEP-007 |
| MAP-025 | react-native-webview | WebViewScreen | Reuse | DEP-002, DEP-005 |
| MAP-026 | expo-camera | QR + Barcode scanners | Reuse | DEP-003, DEP-006 |
| MAP-027 | jest/jest-expo | test harness | Reuse | RN-FILE-001 |

## Dependency Plan

| Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|
| @react-navigation/native-stack | Reuse | Typed root stack from storage-config/login | MAP-024 |
| react-native-webview | Reuse | WebViewScreen URL load and navigation callbacks | MAP-025 |
| expo-camera | Reuse | QR and barcode scanner screens | MAP-026 |
| jest/jest-expo | Reuse | Phase 4 pure service tests | MAP-027 |

## Implementierungsreihenfolge

1. Navigation constants and pure services (webViewNavigationService, scannerNavigationService, navigationAuthGuard)
2. Navigation hooks (useNavigationAuthGuard, BackHandler helpers)
3. Extend WebViewScreen with URL classifier, auth guard, toolbar, permission fallback
4. Add BarcodeScannerScreen and LicenseScreen
5. Adapt Login/Pin/QR screens with navigation-specific back behavior
6. Register routes in AppNavigator and types
