# Test Definition

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-003 | Unit | Cross | P0 | URL-Normalisierung |
| BEH-004 | Unit | iOS | P0 | Volle `isValid`-Regeln |
| BEH-005 | Unit | Android | P0 | Scanner `isUrlValid` vs Settings `isValid` |
| BEH-006, BEH-007 | Unit + UI mock | Cross | P0 | Invalid QR → Retry |
| BEH-009 | Unit | Android | P1 | Dedup |
| BEH-010, BEH-011 | Unit | Cross | P0 | Settings-Ergebnisverarbeitung |
| BEH-012, BEH-013 | Unit/UI | Cross | P1 | Cancel/Back |
| ERRPATH-001..004 | Unit | Cross | P0 | Fehlerpfade |
| SEC-003 | Unit | Cross | P1 | Sensitive fields in parser output |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | Cross | parse valid prestige QR URL | URL `https://host?p=MB&v=1&server=s&mandant=1&https=1&token=t` | `QRCodeParser.parse` | `isValid()==true`, Server/Client/Token gesetzt | BEH-004, DEP-005, IOS-FILE-003, AND-FILE-003 |
| LT-002 | Cross | parse rejects missing server | URL ohne `server` | `parse` + `isValid` | `isValid()==false` | BEH-004, IOS-FILE-004, AND-FILE-004 |
| LT-003 | Cross | parse rejects wrong protocol | `p=XX` | `parse` + `isValid` | `isValid()==false` | BEH-004, IOS-FILE-004 |
| LT-004 | Cross | normalize payload without question mark | `p=MB&v=1&server=s&mandant=1` | Normalisierung wie Scanner | String enthält `?` und Parser ok | BEH-003 |
| LT-005 | iOS | scanner accepts only valid full QR | normalisierter gültiger String | `QRCodeSettings.isValid` nach parse | true | BEH-004, ERRPATH-002 |
| LT-006 | Android | scanner isUrlValid only checks p | URL mit `p=MB` ohne server | `isUrlValid` logic (extract/test package-private or mirror) | true; `QRCodeSettings.isValid` false | BEH-005, BEH-011 |
| LT-007 | Android | settings prefill gated by isValid | RESULT extra mit schwachem QR (`p=MB` only) | `fillControlsFromQRCode` | Felder unverändert | BEH-011, NAV-004 |
| LT-008 | iOS | settings initViews without isValid gate | parse ergibt invalid settings aber non-empty code | `initViews` | Felder trotzdem gesetzt (Legacy-Verhalten) | BEH-010 |
| LT-009 | Android | duplicate scan ignored | zweimal gleicher code | `handleCode` | zweiter Aufruf no-op | BEH-009, STATE-002 |
| LT-010 | Cross | invalid QR shows error message key | ungültiger Scan | Fehlerhandler | Message entspricht `qrcode_scanner_invalid_code` / `Messages.qrcodeScannerInvalidCode` | BEH-006, BEH-007, ERRPATH-002, ERRPATH-004 |
| LT-011 | Android | cancel returns canceled | Scanner offen | Cancel click | `RESULT_CANCELED` | BEH-012, NAV-005 |
| LT-012 | iOS | cancel dismisses without codeValue | Scanner offen | `backButtonTouched` | dismiss, codeValue unset | BEH-012 |
| LT-013 | Android | culture parsed when present | URL mit `culture=de-DE` in AvailableLanguages | `QRCodeParser.parse` | `settings.Culture` gesetzt | DEP-005, AND-FILE-003 |
| LT-014 | iOS | culture not in iOS parser | URL mit culture param | iOS `parse` | Culture nicht im DTO | Cross-Platform Divergenz |
| LT-015 | Android | no camera permission finishes activity | Permission denied mock | `requestCameraPermission` path | `finish` ohne Result | ERRPATH-005 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-016 | Cross | empty string scan | Fehler/kein Result | ERRPATH-001, BEH-006 |
| LT-017 | Cross | https query `https=0` / invalid int | Default https (iOS enum) / Android PROTOCOL_HTTPS fallback | IOS-FILE-003, AND-FILE-003 |
| LT-018 | iOS | non-QR metadata type | Error haptic + invalid message path | ERRPATH-003 |
| LT-019 | Cross | QR mit leerem token | Parse ok, token empty string | BEH-004, SEC-003 |
| LT-020 | Cross | pin length not validated in scanner | pin=12345 im QR | Scanner akzeptiert wenn sonst valid; PIN-Länge erst Settings | BEH-010, BEH-011 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Parser + validation | BEH-004, BEH-005, DEP-005, ERRPATH-002 | 100% branches in parse/isValid | Kern-Geschäftslogik unit-testbar |
| Normalization | BEH-003 | Both platforms | Gleiche RN-Hilfsfunktion |
| Navigation contract | NAV-001..005, BEH-012 | Result/extra shape tests | Phase 3 Screen-Integration |
| Settings handoff | BEH-010, BEH-011 | Divergence documented tests | Paritätsentscheidung RN |
| Camera/ML | DEP-001..004, ERRPATH-005, ERRPATH-006 | Manual/E2E only | Siehe Not Testable |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| DEP-001, DEP-002, DEP-003, DEP-004 | Echte Kamera/ML Kit/CameraX | Manuelle Gerätetests; RN native module integration tests in Phase 4 |
| BEH-008 | UINotificationFeedbackGenerator | UI/E2E oder RN haptics mock |
| BEH-002 (live scan) | AVFoundation/ML Kit Frame-Pipeline | Snapshot/E2E mit gemocktem Barcode-Provider in RN |
| ERRPATH-007 | Hardware ohne Kamera | Gerät/simulator ohne camera — dokumentiert als N/A auf CI |
| UI-001..UI-006 | Layout/Storyboard | Visual regression optional Phase 5 |
