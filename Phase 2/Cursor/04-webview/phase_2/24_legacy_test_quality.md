# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:30:00+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-025 | URL-Klassifikation barcode/login/error/hidden/normal | Ja | Ja | — | — |
| LT-012 (partial) | URL-Quelle Intent > Stored > Login | Ja | Ja | Kein echtes onCreate | Akzeptiert |
| LT-013 (partial) | no-cache Headers + iOS UA | Ja | Ja | Kein WebSettings-Objekt | Akzeptiert |
| LT-015 | SSL proceed nur protocol 2 | Ja | Ja | Kein SslErrorHandler | Akzeptiert |
| LT-016 | Override suppresses barcode/login | Ja | Ja | — | — |
| LT-020 (partial) | Error-Code aus URL-Suffix | Ja | Ja | Kein MiscUtils-Dialog | Phase 4 |
| LT-021 | WebView visibility rules | Ja | Ja | — | — |
| LT-024/010 | ScanResult URL builder | Ja | Ja | — | — |
| LT-023 (partial) | Resume invalid finish; back no-op | Ja | Ja | Kein echtes onResume | Akzeptiert |
| LT-027 | Error dialog nur einmal | Ja | Ja | — | — |
| LT-028 | Timeout inaktiv dokumentiert | Ja | Mittel | Verhalten bewusst legacy | MAP-019 Divergenz |
| LT-004/005 (iOS) | Empty URL / loading toggle | Ja (Quelle) | Ja (erwartet) | NOT_RUN | XCTest-Target macOS |
| LT-001, LT-002, LT-008, LT-022 | UI/Segue/Toolbar | — | — | SKIP | RN Phase 4 |
| LT-017, LT-019 | Error/Permission Dialoge | — | — | SKIP | Phase 4 Mock |
| LT-030 | URL-Sanitizer | Ja (Quelle) | Ja | Kein Prod-Logging-Code getestet | RN SEC-001 Test |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| BEH-007 | iOS failure ohne Error-Dialog | Stille Fehler auf iOS | MAP-019 explizit in Phase 3 |
| BEH-021 | Android HTTP/resource Error-Dialog-Flow | Login-Rückkehr bei Netzwerkfehler | RN WebView onError Mock |
| BEH-024 | Camera-permission denied Fallback | Scanner ohne Permission-Fallback | Phase 4 Permission-Mock |
| DEP-001, DEP-004 | WKWebView/WebView Rendering | Load-Verhalten ungesichert | Device smoke + RN WebView |
| DEP-002 | MBProgressHUD visuell | Loading-UI Regression | RN ActivityIndicator Test |
| API-002, API-004 | JavaScript form-action evaluation | Session-Expiry ungetestet im JS-Runtime | RN injectedJavaScript Mock |
| iOS gesamt | XCTest nicht ausführbar | iOS WebView-Regression | MobileBrowserV2Tests Target + CI macOS |
| SEC-003 | SSL bypass nur Gate, nicht Zertifikat | Unsichere Verbindung möglich | Phase 3 Policy-Entscheid |
