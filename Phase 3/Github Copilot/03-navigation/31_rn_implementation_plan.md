# RN Implementation Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A31 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_3/31_rn_implementation_plan.md |
| Status | IN_PROGRESS |
| Created by | GitHub Copilot |
| Last updated | 2026-06-04 |

## Implementation Plan

### Component And Screen Mapping

| Artifact ID | RN Target Path | RN Symbol | Strategy | Source IDs | Status |
|---|---|---|---|---|---|
| MAP-001 | src/screens/LoginScreen.tsx | LoginScreen | Adapt | EP-001, EP-002, EP-008, BEH-001, BEH-002, BEH-012, BEH-013, BEH-014, BEH-015, BEH-016, NAV-001, NAV-002, NAV-009, NAV-013, NAV-014, UI-001, UI-004 | IMPLEMENTED |
| MAP-002 | src/screens/SettingsScreen.tsx | SettingsScreen | Adapt | EP-003, EP-009, BEH-017, BEH-018, NAV-004, NAV-011, NAV-012 | IMPLEMENTED |
| MAP-003 | src/screens/QRCodeScannerScreen.tsx | QRCodeScannerScreen | Adapt | EP-004, EP-010, BEH-010, BEH-019, ERRPATH-001, ERRPATH-007, NAV-005, NAV-012, UI-003, UI-006 | IMPLEMENTED |
| MAP-004 | src/screens/pin/PinGateScreen.tsx | PinScreen | Adapt | EP-013, BEH-027, STATE-002, STATE-007, NAV-010 | PARTIAL |
| MAP-005 | src/screens/WebViewScreen.tsx | WebViewScreen | Add | EP-005, EP-006, EP-011, BEH-003, BEH-004, BEH-005, BEH-006, BEH-007, BEH-008, BEH-009, BEH-020, BEH-021, BEH-022, BEH-023, BEH-024, NAV-003, NAV-006, NAV-007, NAV-015, NAV-016, NAV-018, UI-002, UI-005 | IMPLEMENTED |
| MAP-006 | src/screens/BarcodeScannerScreen.tsx | BarcodeScannerScreen | Add | EP-007, EP-012, BEH-011, BEH-025, BEH-026, ERRPATH-002, NAV-008, NAV-017 | PARTIAL |
| MAP-007 | src/screens/LicenseScreen.tsx | LicenseScreen | Add | BEH-015, NAV-014 | IMPLEMENTED |

### Service And Hook Mapping

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs | Status |
|---|---|---|---|---|---|
| MAP-008 | src/navigation/navigation.constants.ts | route constants, URL keys | Add | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 | IMPLEMENTED |
| MAP-009 | src/services/webViewNavigationService.ts | classifyWebViewUrl, deriveScannerReturnUrl | Add | BEH-008, BEH-009, BEH-021, BEH-022, ERRPATH-004, ERRPATH-005, ERRPATH-006 | IMPLEMENTED |
| MAP-010 | src/services/navigationAuthGuard.ts | resetToLoginIfInvalid, logoutAndReset | Add | BEH-006, BEH-007, BEH-022, BEH-023, BEH-024, BEH-026, SEC-001 | IMPLEMENTED |
| MAP-011 | src/services/scannerNavigationService.ts | normalizeQrPayload, buildScanResultUrl | Add | BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-002, ERRPATH-007 | IMPLEMENTED |

### Navigator And State Mapping

| Mapping ID | RN Target Path | RN Symbol | Strategy | Source IDs | Status |
|---|---|---|---|---|---|
| MAP-016 | src/navigation/AppNavigator.tsx | RootStackParamList, Stack.Navigator | Adapt | STATE-001, STATE-002, STATE-006, STATE-007 | IMPLEMENTED |
| MAP-017 | src/navigation/AppNavigator.tsx | WebViewScreen route params | Adapt | STATE-003, STATE-008, STOR-003 | IMPLEMENTED |
| MAP-018 | src/hooks/useNavigationAuthGuard.ts | useNavigationAuthGuard hook | Add | STATE-004, STATE-010, SEC-001 | IMPLEMENTED |
| MAP-019 | src/navigation/AppNavigator.tsx | WebViewScreen/BarcodeScannerScreen URL routing | Adapt | STATE-005, STATE-009, BEH-008, BEH-021 | IMPLEMENTED |

## Dependency Plan

| Dependency | Current Version | Add/Reuse | Reason | Source IDs | Status |
|---|---|---|---|---|---|
| @react-navigation/native | ^7.2.2 | Reuse | Already in package.json; provides navigation container and hooks. | DEP-007, RN-FILE-001 | READY |
| @react-navigation/native-stack | ^7.16.0 | Reuse | Already in package.json; provides native stack navigator. | DEP-007 | READY |
| react-native-webview | ^13.16.1 | Reuse | Already in package.json; required for MAP-005 (WebViewScreen). | DEP-002, DEP-005, RN-FILE-001 | READY |
| @react-native-camera/camera or expo-camera | N/A | Verify | Required for QR/barcode scanning if not yet added. | DEP-003, DEP-006, MAP-003, MAP-006 | CHECK |
| react-native-permission or expo-permissions | N/A | Verify | Required for camera permission handling (MAP-021, ERRPATH-006). | SEC-003, MAP-021 | CHECK |

## Implementation Order

1. **Constants and utilities** (MAP-008): Define route names and URL keys.
2. **Navigation services** (MAP-009, MAP-010, MAP-011): Pure route logic functions.
3. **Screens** (MAP-001, MAP-002, MAP-003, MAP-004): Update existing screens with navigation behaviors.
4. **WebViewScreen** (MAP-005): New screen with URL routing and auth guard.
5. **BarcodeScannerScreen** (MAP-006): New screen with permission handling.
6. **LicenseScreen** (MAP-007): Android parity screen if required.
7. **Hooks** (MAP-018): Auth guard hook for screens.
8. **AppNavigator update** (MAP-016, MAP-017, MAP-019): Finalize navigator structure.

## Platform Divergences Handled

| Mapping ID | iOS Behavior | Android Behavior | RN Decision | Status |
|---|---|---|---|---|
| MAP-020 | WebsiteWrapper embeds WebView. | Direct WebviewActivity with URL extra. | Single WebViewScreen with URL param. | PLANNED |
| MAP-021 | No permission check in nav code. | Barcode route checks camera permission. | Implement permission guard before scanner route. | PLANNED |
| MAP-022 | Modal cancel/dismiss/unwind. | Activity back behavior varies per screen. | Per-screen BackHandler implementation. | PLANNED |
| MAP-023 | No license route in iOS. | License popup in Android. | Add License route for Android parity. | PLANNED |

## Integration Points With Other Features

| Feature | Integration | Mapping IDs | Status |
|---|---|---|---|
| login | Login state guards WebView/scanner access. | MAP-001, MAP-018, SEC-001 | Dependency OK |
| settings | Settings guards initial route choice. | MAP-001, MAP-002 | Dependency OK |
| storage-config | Settings and PIN storage. | MAP-001, MAP-004, STOR-001, STOR-002 | Dependency OK |
| webview | WebView URL delegate for barcode/login/error routes. | MAP-005, MAP-009, MAP-019 | Dependency OK |
| qr-code-scanner | QR result parsing and return. | MAP-003, MAP-011 | Dependency OK |
| barcode-scanner | Barcode result and permission handling. | MAP-006, MAP-011, MAP-021 | Dependency OK |

