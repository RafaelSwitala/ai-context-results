# Traceability Matrix

| Field | Value |
|---|---|
| Feature | qr-code-scanner |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/qr-code-scanner/cursor/20260602-2017-cursor-qr-code-scanner/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:17 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | EP | Settings startet QR Scanner iOS | [ios: SettingsViewContoller.swift:128] | LT-012 | MAP-001 | SettingsScreen.openQrScanner | Mapped |
| EP-002 | EP | Settings startet QR Scanner Android | [android: SettingsActivity.java:159] | LT-011 | MAP-001 | SettingsScreen.openQrScanner | Mapped |
| EP-003 | EP | Scanner viewDidLoad iOS | [ios: QrCodeScannerViewController.swift:17] | — | MAP-002 | QrCodeScannerScreen | Mapped |
| EP-004 | EP | Scanner onCreate Android | [android: QRCodeScannerActivity.java:27] | — | MAP-002 | QrCodeScannerScreen | Mapped |
| EP-005 | EP | metadataOutput iOS | [ios: QrCodeScannerViewController.swift:46] | LT-005, LT-018 | MAP-007 | useQrScanner | Mapped |
| EP-006 | EP | handleCode Android | [android: QRCodeScannerActivity.java:89] | LT-006, LT-009 | MAP-007 | useQrScanner | Mapped |
| BEH-001 | BEH | Open scanner from settings | Cross refs | LT-011, LT-012 | MAP-001 | Settings → Scanner route | Mapped |
| BEH-002 | BEH | QR-only formats | Cross refs | — (E2E) | MAP-007, MAP-018 | Barcode type QR | Mapped |
| BEH-003 | BEH | URL normalization | Cross refs | LT-004 | MAP-005 | normalizeQrPayload | Mapped |
| BEH-004 | BEH | iOS full isValid in scanner | [ios: QrCodeScannerViewController.swift:87] | LT-005 | MAP-006, MAP-013 | isValidQrSettings | Mapped |
| BEH-005 | BEH | Android p=MB only in scanner | [android: QRCodeScannerActivity.java:118] | LT-006 | MAP-013 | isValidQrSettings (RN override) | Divergence resolved |
| BEH-006 | BEH | iOS invalid QR alert+restart | [ios: QrCodeScannerViewController.swift:106] | LT-010 | MAP-002 | onScanError + retry | Mapped |
| BEH-007 | BEH | Android invalid QR alert+restart | [android: QRCodeScannerActivity.java:68] | LT-010 | MAP-002 | onScanError + retry | Mapped |
| BEH-008 | BEH | iOS haptic success | [ios: QrCodeScannerViewController.swift:62] | — (E2E) | MAP-022 | optional haptics | Mapped |
| BEH-009 | BEH | Android dedup scan | [android: QRCodeScannerActivity.java:91] | LT-009 | MAP-011 | useQrScanSession | Mapped |
| BEH-010 | BEH | iOS settings initViews no isValid | [ios: SettingsViewContoller.swift:209] | LT-008 | MAP-014 | strict prefill RN | Divergence resolved |
| BEH-011 | BEH | Android prefill if isValid | [android: SettingsActivity.java:211] | LT-007 | MAP-014 | strict prefill RN | Mapped |
| BEH-012 | BEH | Cancel ohne Ergebnis | Cross refs | LT-011, LT-012 | MAP-003 | onCancel | Mapped |
| BEH-013 | BEH | Android back disabled | [android: QRCodeScannerActivity.java:42] | — | MAP-015 | Back = Cancel optional | Mapped |
| BEH-014 | BEH | Explanation text | Cross refs | — | MAP-002 | UI copy i18n keys | Mapped |
| STATE-001 | STATE | codeValue iOS | [ios: QrCodeScannerViewController.swift:92] | LT-005 | MAP-011 | scan session success | Mapped |
| STATE-002 | STATE | scannedCode Android | [android: QRCodeScannerActivity.java:95] | LT-009 | MAP-011 | scan session | Mapped |
| STATE-003 | STATE | iOS capture stop | [ios: QrCodeScannerViewController.swift:67] | — | MAP-012 | camera lifecycle | Mapped |
| STATE-004 | STATE | Android stop processor | [android: QRCodeScannerActivity.java:97] | — | MAP-012 | camera lifecycle | Mapped |
| STATE-005 | STATE | Android restart processor | [android: QRCodeScannerActivity.java:77] | LT-010 | MAP-012 | retry scan | Mapped |
| STOR-001 | STOR | No scanner persistence | N/A doc | — | MAP-009 | in-memory handoff | Excluded (by design) |
| API-001 | API | No network | N/A doc | — | MAP-010 | N/A | Excluded (by design) |
| NAV-001 | NAV | iOS Settings→Scanner | [ios: SettingsViewContoller.swift:132] | LT-012 | MAP-001 | navigation | Mapped |
| NAV-002 | NAV | iOS Scanner→Settings | [ios: QrCodeScannerViewController.swift:37] | LT-005 | MAP-004 | onScanSuccess | Mapped |
| NAV-003 | NAV | Android Settings→Scanner | [android: SettingsActivity.java:161] | LT-011 | MAP-001 | navigation | Mapped |
| NAV-004 | NAV | Android Scanner result | [android: QRCodeScannerActivity.java:109] | LT-007 | MAP-004 | onScanSuccess | Mapped |
| NAV-005 | NAV | Cancel navigation | Cross refs | LT-011, LT-012 | MAP-003 | onCancel | Mapped |
| ERRPATH-001 | ERRPATH | iOS empty content | [ios: QrCodeScannerViewController.swift:74] | LT-016 | MAP-002 | error UI | Mapped |
| ERRPATH-002 | ERRPATH | iOS invalid QR | [ios: QrCodeScannerViewController.swift:87] | LT-010, LT-005 | MAP-013 | validation error | Mapped |
| ERRPATH-003 | ERRPATH | iOS wrong type | [ios: QrCodeScannerViewController.swift:99] | LT-018 | MAP-007 | wrong format | Mapped |
| ERRPATH-004 | ERRPATH | Android invalid QR | [android: QRCodeScannerActivity.java:111] | LT-010, LT-006 | MAP-013 | validation error | Mapped |
| ERRPATH-005 | ERRPATH | Android no camera permission | [android: ScannerBaseActivity.java:154] | LT-015 | MAP-008, MAP-017 | permission gate | Mapped |
| ERRPATH-006 | ERRPATH | MlKit exception toast | [android: ScannerBaseActivity.java:299] | — (E2E) | MAP-007 | error toast | Mapped |
| ERRPATH-007 | ERRPATH | iOS no camera device | [ios: ScannerViewController.swift:80] | — | MAP-008 | permission/device error | Mapped |
| DEP-001 | DEP | AVFoundation | [ios: ScannerViewController.swift:8] | — (E2E) | MAP-018, MAP-019 | camera stack | Mapped |
| DEP-002 | DEP | CameraX | [android: ScannerBaseActivity.java:22] | — (E2E) | MAP-018, MAP-019 | camera stack | Mapped |
| DEP-003 | DEP | ML Kit barcode | [android: app/build.gradle:152] | — (E2E) | MAP-019 | barcode lib | Mapped |
| DEP-004 | DEP | BarcodeScannerProcessor | [android: ScannerBaseActivity.java:257] | — (E2E) | MAP-007 | abstracted in hook | Mapped |
| DEP-005 | DEP | QRCodeParser/Settings | Cross refs | LT-001..LT-004, LT-013, LT-014 | MAP-006, MAP-020 | qrCodeParser.ts | Mapped |
| UI-001 | UI | iOS description label | [ios: QrCodeScannerViewController.swift:23] | — | MAP-002 | copy | Mapped |
| UI-002 | UI | iOS cancel | [ios: QrCodeScannerViewController.swift:123] | LT-012 | MAP-003 | cancel button | Mapped |
| UI-003 | UI | Android explanation | [android: QRCodeScannerActivity.java:30] | — | MAP-002 | copy | Mapped |
| UI-004 | UI | Android cancel | [android: QRCodeScannerActivity.java:32] | LT-011 | MAP-003 | cancel button | Mapped |
| UI-005 | UI | Android settings QR icon | [android: activity_settings.xml:205] | LT-011 | MAP-001 | settings entry | Mapped |
| UI-006 | UI | iOS settings QR toolbar | [ios: Main.storyboard:326] | LT-012 | MAP-001 | settings entry | Mapped |
| SEC-001 | SEC | iOS camera usage string | [ios: Info.plist:33] | — | MAP-008 | Info.plist / app config | Mapped |
| SEC-002 | SEC | Android camera permission | [android: ScannerBaseActivity.java:146] | LT-015 | MAP-008 | ensureCameraPermission | Mapped |
| SEC-003 | SEC | token/pin in QR | Cross parser refs | LT-019 | MAP-006 | secure field handoff | Mapped |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| — | Keine orphaned Source-IDs aus P1-A12 | — | — |

## Self-Validation (VAL-P1)

| Rule | Result |
|---|---|
| VAL-P1-01 iOS + Android durchsucht | PASS — beide Plattformen mit Treffern dokumentiert |
| VAL-P1-02 Code Facts vollständig | PASS — STOR/API mit begründetem N/A |
| VAL-P1-03 Phase 2–5 ohne Rediscovery | PASS — P1-A15 Execution Contract |
| VAL-P1-04 Traceability | PASS — alle P1-A12 IDs in Matrix |
| VAL-GEN-02 Quellen | PASS — REF-002 auf Legacy-Zeilen |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A` (BEH-002, BEH-008 → E2E in P1-A13).
- [x] Every `STOR-*`, `API-*` excluded with reason in matrix.
- [x] No source ID is orphaned.
