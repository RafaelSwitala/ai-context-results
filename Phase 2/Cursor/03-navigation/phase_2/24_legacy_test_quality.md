# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:00:00+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-022 | Route-Konstanten iOS/Android | Ja | Ja | — | — |
| LT-017 (partial) | Empty-URL → Login; Intent > Stored | Ja | Ja | Kein echtes onCreate | Akzeptiert |
| LT-018 (partial) | Barcode → HTTP(S) Return-URL | Ja | Ja | Permission-Branch nicht gemockt | Phase 4 RN Permission-Mock |
| LT-019 (partial) | login/error/hide URL-Klassifikation | Ja | Ja | Kein Activity-finish | Akzeptiert |
| LT-020 (partial) | ScanResult-URL + Auth-Guard | Ja | Ja | Kein Intent-Start | Phase 4 RN |
| LT-011 (partial) | PIN vs Settings Guard | Ja | Ja | Kein startActivity | Akzeptiert |
| LT-021 (partial) | PIN Match/Exit | Ja | Ja | Kein Settings-Intent | Akzeptiert |
| LT-009/016 (partial) | QR p=MB Validierung | Ja | Ja | Kein RESULT_OK Activity | Akzeptiert |
| LT-024 | Duplikat-Scan ignoriert | Ja | Ja | — | — |
| LT-025 | WebView Back no-op bei Auth | Ja | Mittel | Nur Logik, nicht onBackPressed | Phase 4 BackHandler-Mock |
| LT-001..LT-010 (iOS UI) | Segue/WebView/Scanner | — | — | SKIP | RN Phase 4 Navigation-Tests |
| LT-012..LT-015, LT-013, LT-014 | Activity-Navigation | — | — | SKIP | Robolectric Activity oder RN |
| LT-027 | Camera denied fallback | — | — | SKIP | Phase 4 Permission-Mock |
| iOS Quellen | Gleiche Pure-Logic wie Android | Ja (Quelle) | Ja (erwartet) | NOT_RUN | XCTest-Target auf macOS |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| DEP-001, DEP-004 | Segue/Activity-Navigation ungetestet | Falsche Route bei Guard | RN Navigator-Tests (Phase 4) |
| DEP-002, DEP-005 | WKWebView/WebView-Rendering | Load/Delegate-Verhalten | RN WebView smoke + Phase 4 |
| BEH-005, BEH-006 | Foreground reload / Logout UI | Stale WebView nach Session-Ende | RN Auth-Guard-Tests |
| BEH-015, BEH-016 | License route / Login back | Android-spezifisches Verhalten | MAP-022/023 in Phase 3 dokumentieren |
| ERRPATH-006, SEC-003 | Camera permission denied path | Scanner ohne Fallback | Phase 4 Permission-Mock |
| API-003 | Kein isolierter Navigation-API-Test | Abhängig von Login/Settings | Bereits als N/A in P1 |
| iOS gesamt | XCTest nicht ausführbar | iOS-Navigation-Regression | MobileBrowserV2Tests Target + CI macOS |
