# Execution Contract

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/barcode-scanner/codex/20260603-1443-codex-barcode-scanner/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | GPT-5 Codex |
| Last updated | 2026-06-03T14:45:00+02:00 |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy tests to generate | Create focused tests for URL transform, login guard, successful scan result, cancel, permission failure and duplicate scan behavior where platform frameworks can be mocked. | LT-001 through LT-013 |
| Non-unit areas | Camera preview/capture and system permission prompts require instrumentation/manual validation evidence. | DEP-001, DEP-003, DEP-004, SEC-001, SEC-002 |
| Format divergence | Tests must record iOS GTIN-only behavior and Android unconstrained ML Kit options as a migration divergence, not normalize silently. | BEH-003, BEH-014, MAP-017 |
| Encoding risk | Tests must include scan values containing query delimiters and expect RN URL encoding. | SEC-003, LT-017 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| WebView integration | Implement scanner URL detection and return-URL conversion in a shared utility used by the RN WebView screen. | MAP-001, MAP-007, MAP-012 |
| Scanner screen | Add a full-screen barcode scanner screen with title, preview, cancel action, permission state and login/session guard. | MAP-002, MAP-003, MAP-014 |
| Scan result | On first non-empty non-duplicate scan, stop scanning and navigate/load WebView with `appendScanResult(returnUrl, code)`. | BEH-004, BEH-010, STATE-006, MAP-007, MAP-015 |
| Cancel/back | Cancel returns to WebView with original return URL and no `ScanResult`; Android hardware back is consumed while scanner is active. | BEH-006, BEH-009, BEH-012, MAP-020 |
| Dependencies | Add a maintained Expo-compatible scanner/camera dependency or document why another RN scanner package is chosen. | DEP-006, MAP-021 |
| Storage | Reuse existing session/login state; do not persist scanned barcode values. | STOR-001, STOR-002, STOR-004, MAP-009, MAP-011 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Utility tests | Cover `isBarcodeScannerUrl`, `toBarcodeReturnUrl` and `appendScanResult` including protocol, missing `://`, duplicate query delimiters and encoding. | LT-014, LT-016, LT-017 |
| Screen tests | Mock scanner/permission service and cover granted, denied, no-camera, success, duplicate scan, cancel and invalid-login states. | LT-015, LT-010, LT-012 |
| Dependency mocks | Scanner package must be mocked at adapter boundary, not inside UI tests. | MAP-006, DEP-006 |
| Coverage target | Barcode scanner utilities and hook branches should reach 100% branch coverage; component UI states should be covered by assertions or snapshots. | P1-A13 Coverage Targets |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| URL parity | Legacy-derived expected URLs equal RN-generated URLs for scanner trigger, cancel and scan success. | BEH-001, BEH-007, BEH-010, SEC-003 |
| UI parity | RN scanner shows title, preview area, cancel control and permission/error state matching documented legacy behavior. | UI-001 through UI-006 |
| Device behavior | Manual or device-level check verifies camera permission prompt, scanning of EAN-8, EAN-13 and Code128 and Android back behavior. | BEH-003, BEH-012, SEC-001, SEC-002 |
| Divergence acceptance | Any wider Android barcode format support or removed Android login-valid write is documented as RN migration decision. | MAP-017, MAP-019 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | `npm test` | Run Jest tests defined in package.json. | HIGH |
| rn-e-mobilebrowser | `npm run test:coverage` | Run Jest coverage. | HIGH |
| rn-e-mobilebrowser | `npm start` | Start Expo dev server. | HIGH |
| android-mobilebrowser | `.\gradlew.bat test` | Run Android JVM tests if generated. | MEDIUM |
| android-mobilebrowser | `.\gradlew.bat connectedAndroidTest` | Run Android instrumentation tests on connected device/emulator. | MEDIUM |
| ios-mobilebrowser | `xcodebuild test` | Potential iOS test command, but no XCTest target was found in Phase-1 search. | LOW |
