# Traceability Matrix

| Field | Value |
|---|---|
| Feature | barcode-scanner |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/barcode-scanner/cursor/20260602-2020-cursor-barcode-scanner/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | cursor |
| Last updated | 2026-06-02 20:20 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | EP | iOS WebView intercept | [ios: WebsiteViewController.swift:225] | LT-001 | MAP-001, MAP-015 | useBarcodeScannerTrigger | Mapped |
| EP-002 | EP | Android onPageFinished trigger | [android: WebviewActivity.java:231] | LT-001, LT-009 | MAP-001, MAP-015 | useBarcodeScannerTrigger | Mapped |
| EP-003 | EP | iOS scanner load | [ios: ArticleScannerViewController.swift:26] | LT-003 | MAP-002 | BarcodeScannerScreen | Mapped |
| EP-004 | EP | Android scanner load | [android: BarcodeScannerActivity.java:22] | LT-003 | MAP-002 | BarcodeScannerScreen | Mapped |
| EP-005 | EP | iOS metadataOutput | [ios: ArticleScannerViewController.swift:60] | LT-004, LT-005, LT-012 | MAP-008 | useBarcodeScanner | Mapped |
| EP-006 | EP | Android sendScannedCode | [android: BarcodeScannerActivity.java:52] | LT-006, LT-008 | MAP-008 | useBarcodeScanner | Mapped |
| BEH-001 | BEH | Custom scheme trigger | Cross | LT-001, LT-013 | MAP-001 | trigger hook | Mapped |
| BEH-002 | BEH | Scheme rewrite | Cross | LT-001 | MAP-005 | rewriteBarcodeSchemeUrl | Mapped |
| BEH-003 | BEH | Login gate | Cross | LT-003 | MAP-006, MAP-024 | assertLoggedIn | Mapped |
| BEH-004 | BEH | iOS GTIN formats | [ios: ScannerViewController.swift:32] | LT-004, LT-017 | MAP-007, MAP-016 | SUPPORTED_BARCODE_FORMATS | Mapped |
| BEH-005 | BEH | Android all formats | [android: BarcodeScannerActivity.java:48] | LT-006 | MAP-016 | format filter RN | Divergence resolved |
| BEH-006 | BEH | ScanResult URL | Cross | LT-002, LT-011, LT-014 | MAP-004 | appendScanResult | Mapped |
| BEH-007 | BEH | iOS invalid type error | [ios: ArticleScannerViewController.swift:104] | LT-005 | MAP-017 | error + retry | Mapped |
| BEH-008 | BEH | Android no invalid UI | [android: BarcodeScannerActivity.java:77] | LT-006 | MAP-017 | add validation | Divergence resolved |
| BEH-009 | BEH | Cancel ohne Result | Cross | LT-007 | MAP-003 | onCancel | Mapped |
| BEH-010 | BEH | Dedup scan | [android: BarcodeScannerActivity.java:79] | LT-008 | MAP-014 | useBarcodeScanSession | Mapped |
| BEH-011 | BEH | WebView permission pre-check | [android: WebviewActivity.java:241] | LT-009 | MAP-020 | ensureCameraPermission | Mapped |
| BEH-012 | BEH | Login flag workaround | [android: ScannerBaseActivity.java:149] | LT-010 | MAP-009, MAP-011 | sessionGuard | Divergence resolved |
| BEH-013 | BEH | iOS haptic success | [ios: ArticleScannerViewController.swift:76] | — (E2E) | optional haptics | Mapped |
| BEH-014 | BEH | Title text | Cross | — | MAP-002 | i18n scan_barcode_title | Mapped |
| BEH-015 | BEH | Android back disabled | [android: BarcodeScannerActivity.java:41] | LT-018 | MAP-019 | Back = Cancel | Mapped |
| STATE-001 | STATE | iOS codeValue | [ios: ArticleScannerViewController.swift:95] | LT-011 | MAP-013 | scan session | Mapped |
| STATE-002 | STATE | Android scannedCode | [android: BarcodeScannerActivity.java:83] | LT-008 | MAP-014 | dedup state | Mapped |
| STATE-003 | STATE | iOS capture stop | [ios: ArticleScannerViewController.swift:81] | — | MAP-013 | camera lifecycle | Mapped |
| STATE-004 | STATE | Android processor stop | [android: BarcodeScannerActivity.java:85] | — | MAP-013 | camera lifecycle | Mapped |
| STATE-005 | STATE | iOS redirectUrl | [ios: WebsiteViewController.swift:167] | LT-011 | MAP-013 | responseUrl | Mapped |
| STATE-006 | STATE | Android responseUrl extra | [android: BarcodeScannerActivity.java:25] | LT-007 | MAP-013 | responseUrl | Mapped |
| STOR-001 | STOR | Android login flag write | [android: ScannerBaseActivity.java:149] | LT-010 | MAP-011 | excluded in RN | Excluded (by design) |
| STOR-002 | STOR | Login flag read | Cross | LT-003 | MAP-010 | hasValidLogin read | Mapped |
| API-001 | API | WebView load only | Cross | LT-002 | MAP-012 | WebView reload | Mapped |
| NAV-001 | NAV | iOS → scanner | [ios: WebsiteViewController.swift:233] | LT-001 | MAP-001 | navigation | Mapped |
| NAV-002 | NAV | iOS → webview | [ios: ArticleScannerViewController.swift:51] | LT-007, LT-011 | MAP-003, MAP-004 | return navigation | Mapped |
| NAV-003 | NAV | iOS → login | [ios: ArticleScannerViewController.swift:35] | LT-003 | MAP-006 | login route | Mapped |
| NAV-004 | NAV | Android → scanner | [android: WebviewActivity.java:237] | LT-009 | MAP-001 | navigation | Mapped |
| NAV-005 | NAV | Android → webview | [android: BarcodeScannerActivity.java:87] | LT-007 | MAP-004 | WebView reload | Mapped |
| NAV-006 | NAV | Android → login | [android: BarcodeScannerActivity.java:69] | LT-003 | MAP-006 | login route | Mapped |
| ERRPATH-001 | ERRPATH | iOS empty content | [ios: ArticleScannerViewController.swift:90] | LT-012 | MAP-017 | error UI | Mapped |
| ERRPATH-002 | ERRPATH | iOS invalid type | [ios: ArticleScannerViewController.swift:104] | LT-005 | MAP-017 | error UI | Mapped |
| ERRPATH-003 | ERRPATH | WebView no camera | [android: WebviewActivity.java:241] | LT-009 | MAP-020 | permission | Mapped |
| ERRPATH-004 | ERRPATH | MlKit exception | [android: ScannerBaseActivity.java:299] | — (E2E) | MAP-008 | toast/error | Mapped |
| ERRPATH-005 | ERRPATH | Scanner no permission | [android: ScannerBaseActivity.java:154] | LT-015 | MAP-020 | permission | Mapped |
| ERRPATH-006 | ERRPATH | iOS no camera device | [ios: ScannerViewController.swift:80] | — | MAP-008 | device error | Mapped |
| DEP-001 | DEP | AVFoundation | [ios: ScannerViewController.swift:8] | — (E2E) | MAP-021 | camera module | Mapped |
| DEP-002 | DEP | ML Kit | [android: ScannerBaseActivity.java:257] | — (E2E) | MAP-021 | camera module | Mapped |
| DEP-003 | DEP | BarcodeScannerProcessor | [android: BarcodeScannerProcessor.java:66] | — (E2E) | MAP-008 | processor | Mapped |
| DEP-004 | DEP | WKWebView delegate | [ios: WebsiteViewController.swift:208] | LT-001 | MAP-001, MAP-022 | WebView | Mapped |
| DEP-005 | DEP | Android WebViewClient | [android: WebviewActivity.java:213] | LT-001 | MAP-001, MAP-022 | WebView | Mapped |
| UI-001 | UI | iOS description | [ios: ArticleScannerViewController.swift:31] | — | MAP-002 | UI copy | Mapped |
| UI-002 | UI | iOS cancel | [ios: ArticleScannerViewController.swift:126] | LT-007 | MAP-003 | cancel | Mapped |
| UI-003 | UI | Android explanation | [android: BarcodeScannerActivity.java:27] | — | MAP-002 | UI copy | Mapped |
| UI-004 | UI | Android cancel | [android: BarcodeScannerActivity.java:29] | LT-007 | MAP-003 | cancel | Mapped |
| UI-005 | UI | WebView visibility | [android: WebviewActivity.java:270] | — | MAP-022 | webview feature | Excluded (webview) |
| SEC-001 | SEC | Camera permission | Cross | LT-009 | MAP-020 | permission | Mapped |
| SEC-002 | SEC | ScanResult in URL | Cross | LT-002 | MAP-004 | no logging | Mapped |
| SEC-003 | SEC | Login flag hack | [android: ScannerBaseActivity.java:149] | LT-010 | MAP-009 | sessionGuard | Mapped |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| — | Keine orphaned IDs | — | — |

## Self-Validation (VAL-P1)

| Rule | Result |
|---|---|
| VAL-P1-01 | PASS — iOS + Android durchsucht |
| VAL-P1-02 | PASS — API mit N/A; STOR vollständig |
| VAL-P1-03 | PASS — Execution Contract für Phase 2–5 |
| VAL-P1-04 | PASS — alle P1-A12 IDs in Matrix |
| VAL-GEN-02 | PASS — Legacy-Quellen gesetzt |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has `LT-*` or E2E note in P1-A13.
- [x] `STOR-001` excluded in RN with reason.
- [x] No source ID orphaned.
