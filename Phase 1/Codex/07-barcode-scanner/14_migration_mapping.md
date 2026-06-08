# Migration Mapping

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-004, BEH-001, BEH-007, NAV-001, NAV-004 | src/features/webview/barcodeScannerUrl.ts | `isBarcodeScannerUrl`, `toBarcodeReturnUrl` | Add | Shared WebView URL interception/transform utility. |
| MAP-002 | EP-002, EP-005, BEH-002, BEH-009, BEH-012, BEH-013, NAV-002, NAV-005, NAV-006 | src/features/barcode-scanner/BarcodeScannerScreen.tsx | `BarcodeScannerScreen` | Add | Full-screen scanner route with title, preview, cancel and login/session guard. |
| MAP-003 | UI-001, UI-002, UI-004, UI-005, UI-006 | src/features/barcode-scanner/BarcodeScannerScreen.tsx | `BarcodeScannerScreen` | Add | Preserve title `Barcode scannen`, full-screen preview and cancel affordance. |
| MAP-004 | UI-003, ERRPATH-003, ERRPATH-004, ERRPATH-005, ERRPATH-006, ERRPATH-007, ERRPATH-008 | src/features/barcode-scanner/BarcodeScannerErrorState.tsx | `BarcodeScannerErrorState` | Add | RN should use explicit error states/dialogs for scan, permission and processor errors. |
| MAP-005 | RN-FILE-002 | App.tsx | `App` | Adapt | Replace placeholder-only app with navigation capable of WebView and scanner routing. |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-006 | EP-003, BEH-003, BEH-004, BEH-005, BEH-010, BEH-011, BEH-014, STATE-001, STATE-002, STATE-003, STATE-004, STATE-005, STATE-006 | src/features/barcode-scanner/barcodeScannerService.ts | Start/stop/restart scanner and emit scan values | Add | Hide native scanner package behind a testable adapter. |
| MAP-007 | API-001, SEC-003, SEC-004 | src/features/barcode-scanner/barcodeResultUrl.ts | `appendScanResult`, `buildReturnUrl` | Add | Must encode scan result and preserve configured protocol behavior. |
| MAP-008 | ERRPATH-001, ERRPATH-002, ERRPATH-007, ERRPATH-008, ERRPATH-009 | src/features/barcode-scanner/barcodeScannerService.ts | Error mapping | Add | Convert native scanner/camera failures into RN UI states or logs. |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-009 | STOR-001, STOR-002 | Existing login/session storage service from login migration | Existing login-valid/session state | Yes | Scanner reads login validity before starting or resuming. |
| MAP-010 | STOR-003 | Existing login/session storage service | Existing login-valid/session state | Yes | Android legacy writes login-valid true when permission already granted; RN should not replicate unless session lifecycle requires it. |
| MAP-011 | STOR-004, SEC-003 | None | N/A | Yes | Scanned value remains transient and is only used to build return URL. |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-012 | API-001, BEH-004, BEH-010, SEC-003, SEC-004 | src/features/webview/WebViewScreen.tsx plus barcode URL utilities | WebView navigation/load URL | No direct native HTTP client; scanner returns to WebView with a URL. |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-013 | STATE-001, STATE-002, STATE-003, STATE-005, BEH-005 | src/features/barcode-scanner/useBarcodeScanner.ts | `idle` | `idle -> scanning -> stopped`, `error -> scanning` after retry/OK |
| MAP-014 | STATE-004, ERRPATH-005, ERRPATH-006, SEC-001, SEC-002 | src/features/barcode-scanner/useCameraPermission.ts | `unknown` | `unknown -> granted -> scanning`, `unknown -> denied -> blocked` |
| MAP-015 | STATE-006, BEH-010 | src/features/barcode-scanner/useBarcodeScanner.ts | `lastScannedCode = null` | `null/old -> new code -> navigating`; duplicate code ignored |
| MAP-016 | STATE-007, BEH-007 | src/features/webview/WebViewScreen.tsx | `webviewVisible = true` | scanner/login/about URL hides WebView or navigates away |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-017 | BEH-003, BEH-014 | Accepts EAN-8, EAN-13, Code128. | Active options are unconstrained and can return all ML Kit barcode formats. | Default RN to EAN-8, EAN-13, Code128 for product barcode parity; document optional wider Android behavior. | iOS scope is explicit and product barcode scanner should not accidentally accept QR/settings codes. |
| MAP-018 | ERRPATH-001, ERRPATH-002, ERRPATH-005, ERRPATH-006 | Runtime permission/no-camera handling is limited in code. | WebView and scanner base show explicit permission dialogs. | RN implements explicit permission/error UI on both platforms. | A cross-platform app needs deterministic no-camera and no-permission states. |
| MAP-019 | STOR-003, BEH-013 | No scanner-time login-valid write. | Scanner base writes valid-login true when permission is already granted for barcode scanner. | RN should exclude this write by default and rely on existing session state. | Android comment ties this to legacy `App.logout()` behavior; RN lifecycle should be modeled explicitly. |
| MAP-020 | BEH-012, BEH-006, BEH-009 | iOS cancel exits; hardware back is not applicable. | Android hardware back is consumed; cancel exits. | RN Android should consume hardware back while scanner is active; cancel returns without result. | Matches active Android scanner behavior and avoids accidental duplicate WebView navigation. |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-021 | Expo-compatible camera/barcode scanner package | Add | RN dependency list has no camera/scanner capability. | DEP-006, RN-FILE-001 |
| MAP-022 | `react-native-webview` | Reuse | Existing RN dependency can host WebView and scanner URL interception. | RN-FILE-001, MAP-001 |
| MAP-023 | Jest/Jest Expo | Reuse | Existing test setup supports utility and component tests. | RN-FILE-003 |
| MAP-024 | Existing login/session storage services from login migration | Reuse | Scanner needs login validity but must not define a separate auth store. | STOR-001, STOR-002 |
