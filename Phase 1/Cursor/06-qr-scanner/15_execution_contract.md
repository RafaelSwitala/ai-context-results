# Execution Contract

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Inputs For Later Phases (No Rediscovery)

| Artifact | Must Use |
|---|---|
| P1-A11 | Scope, Dateiliste `IOS-FILE-*` / `AND-FILE-*`, Divergenzen |
| P1-A12 | `EP-*`, `BEH-*`, `ERRPATH-*`, `NAV-*`, `DEP-*`, `SEC-*` |
| P1-A13 | `LT-001`..`LT-020` als Legacy-Test-Spezifikation |
| P1-A14 | `MAP-*` RN-Ziele und Divergenz-Entscheidungen (`MAP-013`..`MAP-018`) |
| P1-A16 | Vollständige ID-Verknüpfung |

Legacy-Pfade (relativ zu Workspace `Cursor/`):

- iOS: `ios-mobilebrowser/`
- Android: `android-mobilebrowser/`
- RN: `rn-e-mobilebrowser/` (minimal vorhanden; Scanner noch nicht implementiert)

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Parser unit tests | `LT-001`..`LT-004`, `LT-013`, `LT-014`, `LT-017`, `LT-019` | BEH-003, BEH-004, DEP-005 |
| Android validation divergence | `LT-006`, `LT-007` dokumentieren Legacy vs gewünschte RN | BEH-005, BEH-011, MAP-013 |
| iOS settings handoff | `LT-008` Legacy-Verhalten | BEH-010, MAP-014 |
| Error/retry | `LT-010`, `LT-016`, `LT-018` | ERRPATH-001..004 |
| Navigation/cancel | `LT-011`, `LT-012` | BEH-012, NAV-005 |
| Evidence | Jeder Test referenziert P1-A12-IDs in Kommentar oder Name | REF-002 |
| iOS framework | XCTest, Pfad: vorhandenes iOS-Test-Target oder neu anlegen | TEST-003 |
| Android framework | JUnit4 + Mockito, `app/src/test/java/...` | TEST-002 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Screen | `QrCodeScannerScreen` + `useQrScanner` | MAP-002, MAP-007, MAP-011 |
| Parser | `normalizeQrPayload` + `parseQrCode` + `isValidQrSettings` | MAP-005, MAP-006, MAP-013 |
| Settings integration | `SettingsScreen.openQrScanner` → onSuccess callback mit DTO | MAP-001, MAP-004, MAP-014 |
| Permissions | `ensureCameraPermission` vor Kamera-Start | MAP-008, MAP-017, SEC-002 |
| Security | Kein Logging von token/pin aus QR | SEC-003 |
| Out of scope | Kein WebView-Barcode, kein QRCodeCaptureActivity port | FB-005, FB-006 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RT mapping | Jede `LT-*` (unit-testbar) → `RT-*` oder dokumentierter Skip | LT-001..LT-020 |
| Mocks | Camera/Barcode API gemockt; Parser echte Logik | MAP-007, TEST-004 |
| Divergence tests | RN Scanner verwendet `isValidQrSettings` (nicht Android-only `p=MB`) | MAP-013, LT-006 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Scan parity | Gültiger/ungültiger PRESTIGE-QR auf Gerät | BEH-004..BEH-007 |
| Settings handoff | Felder nur bei validem QR (RN-Entscheidung) | MAP-014, BEH-011 |
| Permission | Scanner startet nicht ohne Kamera | MAP-017, ERRPATH-005 |
| Security | Token/PIN nicht in Logs | SEC-003 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Xcode test target / `xcodebuild test` nicht verifiziert | Low — Grund: nicht in Phase 1 ausgeführt |
| android-mobilebrowser | UNKNOWN | `./gradlew test` nicht verifiziert | Low |
| rn-e-mobilebrowser | UNKNOWN | `npm test` / `npx jest` — package.json in Phase 1 nicht geprüft | Low |

## Known Build/Test Notes

| Note | Source |
|---|---|
| Android ML Kit dependency: `com.google.mlkit:barcode-scanning:17.3.0` | [android: app/build.gradle:152 symbol=barcode-scanning] |
| iOS Kamera-Warnung: `startRunning`/`stopRunning` auf Background-Queue | [ios: MobileBrowserV2/Source/ScannerViewController.swift:52 symbol=viewWillAppear] |
| QR-Scanner-Activity Manifest: portrait, parent Settings | [android: app/src/main/AndroidManifest.xml:95 symbol=QRCodeScannerActivity] |
