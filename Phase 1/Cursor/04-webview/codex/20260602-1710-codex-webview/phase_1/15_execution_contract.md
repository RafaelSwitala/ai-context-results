# Execution Contract

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:10 (UTC+2) |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Load tests | Initial URL, no-cache policy, loading indicator lifecycle | BEH-001, BEH-002, LT-001, LT-002 |
| Interception tests | barcodescanner und login URL Pfade je Plattform | BEH-003, BEH-004, BEH-006, BEH-007, LT-003..LT-007 |
| Session tests | JS form-action expiry + foreground/resume guard | BEH-005, BEH-011, LT-005, LT-012 |
| Logout tests | Toolbar logout inkl. API cleanup mocks | BEH-008, API-002, API-003, LT-008, LT-009 |
| Error tests | Android error dialog; iOS silent fail dokumentiert | ERRPATH-001, ERRPATH-002, LT-010, LT-015 |
| Evidence | Jeder Test referenziert mindestens eine P1-A12 ID | EP-001..SEC-003 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Single WebView screen | `WebViewScreen` kapselt Load, Toolbar, Interception, Session probe | MAP-001, MAP-002, MAP-003, MAP-004 |
| URL handler | `handleWebViewUrl` ist einziger Ort für barcodescanner/login/error | MAP-002, MAP-016 |
| Config parity | `getWebViewProps` setzt JS, cache, UA, zoom wie Legacy | MAP-008, BEH-012, MAP-019 |
| Security | TLS policy und sensitive URL handling dokumentiert | SEC-001, SEC-002, MAP-007, MAP-020 |
| Logout integration | `logoutFromWebView` nutzt sessionService | MAP-006, BEH-008 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RT mapping | Jede `LT-*` hat `RT-*` oder Skip mit Begründung | LT-001..LT-017 |
| WebView mocks | react-native-webview test harness für URL callbacks | MAP-021 |
| Injection tests | sessionProbe JS Ergebnis mocken | MAP-003, BEH-005 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Behavior parity | Load, intercept, session expiry, logout gegen Legacy | BEH-001..BEH-012 |
| Divergence closure | iOS/Android timing und error UX dokumentiert | MAP-016, MAP-017, MAP-018 |
| Security parity | SSL policy und credential URL handling | SEC-001, SEC-002, MAP-020 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Test-/Build-Command nicht in diesem Lauf ausgeführt | Low |
| android-mobilebrowser | UNKNOWN | Test-/Build-Command nicht in diesem Lauf ausgeführt | Low |
| rn-e-mobilebrowser | UNKNOWN | RN WebView setup in späteren Phasen präzisiert | Low |
