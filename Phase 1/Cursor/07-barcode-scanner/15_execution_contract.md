# Execution Contract

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Inputs For Later Phases (No Rediscovery)

| Artifact | Must Use |
|---|---|
| P1-A11 | Scope, Dateiliste, Divergenzen (Trigger-Timing, Formate, Login-Hack) |
| P1-A12 | Alle `EP-*`, `BEH-*`, `NAV-*`, `ERRPATH-*`, Konstanten `BARCODESCANNER` / `SCAN_RESULT` |
| P1-A13 | `LT-001`..`LT-018` |
| P1-A14 | `MAP-*` inkl. Divergenz-Entscheidungen MAP-015..MAP-020 |
| P1-A16 | Traceability ohne orphans |

Legacy-Pfade (Workspace `Cursor/`):

- iOS: `ios-mobilebrowser/`
- Android: `android-mobilebrowser/`
- RN: `rn-e-mobilebrowser/`

Verwandte Phase-1-Runs: `qr-code-scanner` (getrennter Settings-QR-Flow), künftig `webview` (Container).

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| URL utilities | `LT-001`, `LT-002`, `LT-013`, `LT-014` | BEH-001, BEH-002, BEH-006 |
| Login gate | `LT-003` | BEH-003 |
| Format policy | `LT-004`, `LT-005`, `LT-006`, `LT-017` | BEH-004, BEH-005, BEH-007, MAP-016 |
| Navigation contract | `LT-007`, `LT-011` | BEH-009, BEH-006 |
| Android specifics | `LT-008`, `LT-009`, `LT-010`, `LT-015`, `LT-018` | BEH-010, BEH-012, STOR-001 |
| Evidence | Jeder Test referenziert P1-A12-IDs | REF-002 |
| Frameworks | XCTest (iOS), JUnit4 (Android) | TEST-002, TEST-003 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| WebView hook | `useBarcodeScannerTrigger` in WebView screen | MAP-001, MAP-015 |
| Scanner screen | `BarcodeScannerScreen` + `useBarcodeScanner` | MAP-002, MAP-008 |
| Result URL | `appendScanResult` + reload WebView | MAP-004, MAP-012 |
| Formats | `SUPPORTED_BARCODE_FORMATS` = EAN8, EAN13, Code128 | MAP-007, MAP-016 |
| Session | `sessionGuard` statt `saveValidLogin(true)` | MAP-009, MAP-011, MAP-018 |
| Errors | Invalid type → alert + retry (iOS parity) | MAP-017, ERRPATH-002 |
| Out of scope | Kein QR Settings scanner, kein BarcodeCaptureActivity | FB-006, P1-A11 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RT mapping | Jede unit-testbare `LT-*` → `RT-*` | LT-001..LT-018 |
| Mocks | WebView navigation, camera barcode provider | MAP-008, TEST-004 |
| Divergence | RN nutzt iOS format list; kein STOR-001 hack | MAP-016, MAP-018 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| End-to-end scan | WebView trigger → scan → WebView mit ScanResult | BEH-001, BEH-006 |
| Cancel | Zurück ohne ScanResult | BEH-009 |
| Login | Scanner ohne Login nicht nutzbar | BEH-003 |
| Format | QR-Code im WebView-Kontext wird abgelehnt (RN iOS policy) | BEH-007, MAP-016 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Build/test nicht ausgeführt | Low |
| android-mobilebrowser | UNKNOWN | `./gradlew test` nicht verifiziert | Low |
| rn-e-mobilebrowser | UNKNOWN | Jest/npm nicht geprüft | Low |

## Known Build/Test Notes

| Note | Source |
|---|---|
| Android Scanner nutzt gemeinsames `activity_scanner_base.xml` mit QR-Scanner | [android: app/src/main/res/layout/activity_scanner_base.xml:1] |
| WebView-Trigger auf Android in `onPageFinished` wegen fehlendem `shouldOverrideUrlLoading` | [android: WebviewActivity.java:229 symbol=onPageFinished] |
| Konstanten: `BARCODESCANNER = "barcodescanner"`, `SCAN_RESULT = "&ScanResult="` | [ios: AppSettings.swift:23] [android: App.java:32] |
