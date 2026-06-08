# RN Code Report

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P3 |
| Artifact ID | P3-A32 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_3/32_rn_code_report.md |
| Status | READY_FOR_REVIEW |
| Created by | Cursor / Auto |
| Last updated | 2026-06-08T15:00:00+02:00 |

## Changed Files

| Path | Purpose | Source IDs |
|---|---|---|
| rn-e-mobilebrowser/src/navigation/navigation.constants.ts | Route names and URL tokens | MAP-008 |
| rn-e-mobilebrowser/src/services/webViewNavigationService.ts | URL classification and return URL derivation | MAP-009 |
| rn-e-mobilebrowser/src/services/scannerNavigationService.ts | ScanResult URL and QR normalize | MAP-011 |
| rn-e-mobilebrowser/src/services/navigationAuthGuard.ts | Auth guard and logout reset | MAP-010 |
| rn-e-mobilebrowser/src/hooks/useNavigationAuthGuard.ts | Focus/AppState guard + BackHandler | MAP-018, MAP-022 |
| rn-e-mobilebrowser/src/screens/WebViewScreen.tsx | Full WebView navigation behavior | MAP-005, MAP-014, MAP-017, MAP-019..MAP-021 |
| rn-e-mobilebrowser/src/screens/BarcodeScannerScreen.tsx | Barcode scan return to WebView | MAP-006 |
| rn-e-mobilebrowser/src/screens/LicenseScreen.tsx | Android license route shell | MAP-007, MAP-023 |
| rn-e-mobilebrowser/src/screens/LoginScreen.tsx | License button + login back handler | MAP-001, NAV-014 |
| rn-e-mobilebrowser/src/screens/PinScreen.tsx | PIN back finishes screen | MAP-004, BEH-027 |
| rn-e-mobilebrowser/src/screens/QRCodeScannerScreen.tsx | Disabled hardware back | MAP-003, UI-006 |
| rn-e-mobilebrowser/src/navigation/types.ts | BarcodeScanner + License params | MAP-013 |
| rn-e-mobilebrowser/src/navigation/AppNavigator.tsx | Full route stack | MAP-016 |

## Created Symbols

| Symbol | File | Role |
|---|---|---|
| classifyWebViewUrl | webViewNavigationService.ts | Route outcome from loaded URL |
| deriveScannerReturnUrl | webViewNavigationService.ts | barcodescanner:// to https return URL |
| buildScanResultUrl | scannerNavigationService.ts | Append ScanResult query param |
| logoutAndReset | navigationAuthGuard.ts | Clear login and session |
| useNavigationAuthGuard | useNavigationAuthGuard.ts | Invalid-login route reset |
| useLoginBackHandler | useNavigationAuthGuard.ts | Android login backgrounds app |

## Commands

| Command | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | PASS | No TypeScript errors |
| `npm test -- --passWithNoTests` | PASS | RN tests deferred to Phase 4 |
| `npm run lint` | N/A | No lint script in package.json |
| `npx expo export` | NOT_RUN | Not required for Phase 3 validation |

## Issues

| Error ID | Description | Resolution | Status |
|---|---|---|---|
| — | MAP-026 suggests new scanner package | Reused expo-camera from storage-config Phase 3 | RESOLVED |
| — | License HTML content out of scope | LicenseScreen placeholder documents MAP-023 | OPEN (content feature) |
