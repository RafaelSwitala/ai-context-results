# Migration Mapping

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A14 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/14_migration_mapping.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Component And Screen Mapping

| Mapping ID | Source IDs | RN Target File | RN Symbol | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-001 | EP-001, EP-002, BEH-001, DEP-004, DEP-005 | src/features/webview/useBarcodeScannerTrigger.ts | `useBarcodeScannerTrigger` | Add | Einheitlicher URL-Intercept für `barcodescanner` |
| MAP-002 | EP-003, EP-004, BEH-014, UI-001, UI-003 | src/screens/barcode/BarcodeScannerScreen.tsx | `BarcodeScannerScreen` | Add | Modal/Fullscreen Scanner |
| MAP-003 | BEH-009, NAV-002, NAV-005, UI-002, UI-004 | src/screens/barcode/BarcodeScannerScreen.tsx | `onCancel` | Adapt | Cancel → WebView base URL |
| MAP-004 | BEH-006, NAV-002, NAV-005, LT-011 | src/features/barcode/buildScanResultUrl.ts | `appendScanResult` | Add | `&ScanResult=` Suffix |

## Service Mapping

| Mapping ID | Source IDs | RN Service | Operation | Strategy | Notes |
|---|---|---|---|---|---|
| MAP-005 | BEH-002, LT-001 | src/features/barcode/barcodeUrlUtils.ts | `rewriteBarcodeSchemeUrl` | Add | `barcodescanner://` → http(s) |
| MAP-006 | BEH-003, NAV-003, NAV-006 | src/features/auth/requireLogin.ts | `assertLoggedIn` | Reuse | Shared login gate |
| MAP-007 | BEH-004, BEH-005, BEH-007, BEH-008 | src/features/barcode/barcodeFormats.ts | `SUPPORTED_BARCODE_FORMATS` | Add | Default: iOS GTIN set |
| MAP-008 | BEH-004, BEH-005, DEP-002 | src/features/barcode/useBarcodeScanner.ts | `scanOnce` | Add | Camera + decode wrapper |
| MAP-009 | BEH-012, STOR-001, SEC-003 | src/features/session/sessionGuard.ts | `keepSessionDuringCamera` | Add | Ersetzt Android login-flag hack |

## Storage Mapping

| Mapping ID | Source IDs | RN Storage | Key | Sensitive | Notes |
|---|---|---|---|---|---|
| MAP-010 | STOR-002 | authStorage / login feature | hasValidLogin | No | Read-only gate |
| MAP-011 | STOR-001 | N/A — do not replicate | — | — | RN vermeidet saveValidLogin(true)-Hack |

## API Mapping

| Mapping ID | Source IDs | RN Client/Service | Endpoint/Method | Notes |
|---|---|---|---|---|
| MAP-012 | API-001 | WebView loadUrl | GET result URL in WebView | Kein separater REST-Call |

## State Mapping

| Mapping ID | Source IDs | RN Hook/State | Initial | Transitions |
|---|---|---|---|---|
| MAP-013 | STATE-005, STATE-006 | `useBarcodeScanContext` | responseUrl from trigger | idle → scanning → done/cancel |
| MAP-014 | STATE-001, STATE-002, BEH-010 | `useBarcodeScanSession` | scannedCode null | dedup same code |

## Platform Divergences

| Mapping ID | Source IDs | iOS Behavior | Android Behavior | RN Decision | Reason |
|---|---|---|---|---|---|
| MAP-015 | EP-001, EP-002, DEP-004, DEP-005 | decidePolicyFor | onPageFinished | Adapt: single hook in WebView wrapper | Zuverlässiger Trigger |
| MAP-016 | BEH-004, BEH-005, BEH-007, BEH-008 | GTIN types only | All ML Kit formats | Adapt: iOS format list | Parität mit iOS-Produktlogik |
| MAP-017 | BEH-007 | Invalid type alert | No invalid alert | Adapt: show error + retry (iOS) | Bessere UX |
| MAP-018 | BEH-012, STOR-001 | No login flag hack | saveValidLogin(true) | Adapt: session guard, no flag write | Sauberes Session-Modell |
| MAP-019 | BEH-015 | Back not blocked | Back disabled | Adapt: Cancel primary; Back = Cancel | Konsistenz |
| MAP-020 | BEH-011, ERRPATH-003 | — | Permission dialog in Webview before scanner | Adapt: `ensureCameraPermission` shared | Gleicher Flow wie qr-code-scanner |

## Dependencies To Add Or Reuse

| Mapping ID | Dependency | Add/Reuse | Reason | Source IDs |
|---|---|---|---|---|
| MAP-021 | expo-camera / vision-camera + barcode | Add/Reuse | Ersetzt AVFoundation + ML Kit | DEP-001, DEP-002 |
| MAP-022 | WebView screen (webview feature) | Reuse | Trigger + reload result URL | DEP-004, DEP-005 |
| MAP-023 | `useBarcodeScannerTrigger` shared constants | Reuse with qr scanner base | `BARCODESCANNER`, `SCAN_RESULT` constants module | IOS-FILE-005, AND-FILE-004 |
| MAP-024 | auth/login feature | Reuse | Login gate | BEH-003 |

## Excluded From Migration (With Reason)

| Source IDs | Exclusion Reason |
|---|---|
| BarcodeCaptureActivity, BarcodeCaptureDelegate | Legacy tot / kommentiert |
| WebsiteViewController.fromBarcodescanner | Dead code — nicht portieren |
| FB-005 general WebView | Bleibt in `webview` Feature |
