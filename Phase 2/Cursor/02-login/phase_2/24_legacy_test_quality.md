# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T18:30:00+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-002 (Android) | Settings-Gate + leerer Username blockieren Login | Ja | Ja | Spiegelt nur Android `isValid()` (kein Password-Check) | Dokumentiert (ERRPATH-008 Divergenz) |
| LT-004 (Android) | Encoded Password + hasValidLogin persistieren | Ja | Ja | Kein WebView-Intent | Akzeptiert; RN Phase 4 Navigation-Mock |
| LT-005 (partial) | PIN vorhanden vs. leer als Routing-Input | Ja | Ja | Keine Activity-Navigation | Akzeptiert |
| LT-006 (partial) | PIN Match/Mismatch/Leading-Zero | Ja | Ja | Kein UI-Reset bei Mismatch | Phase 4 RN PIN-UI-Test |
| LT-007 (partial) | hasValidLogin=false nach Logout | Ja | Ja | Kein Session-Cleanup (API-003) | Akzeptiert |
| StringUtils | Base64 Roundtrip + Sonderzeichen | Ja | Ja | — | — |
| buildLoginUrl | User, Password, App-Marker in URL | Ja | Ja | — | — |
| LT-001 (iOS) | Empty field validation | — | — | SKIP UI | RN Phase 4 |
| LT-003 (iOS) | HTTP + Segue success path | — | — | SKIP Integration | Alamofire-Mock in Phase 4 |
| iOS Quellen | Gleiche Assertions wie Android-Logic | Ja (Quelle) | Ja (erwartet) | NOT_RUN | XCTest-Target auf macOS anlegen |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| BEH-006, API-001 | Kein gemockter HTTP-Login auf iOS (Alamofire) | Erfolgs-/Fehler-Response ungetestet | Phase 4 RN mit fetch-Mock |
| BEH-007, BEH-008 | Status-Code- und Error-Code-Parsing | Generic vs. PE-Error Dialog | Unit-Test mit Response-URL-Mock |
| NAV-001, NAV-002 | WebView-Navigation nach Login | Falsche Route bei Erfolg | RN Navigation-Tests (Phase 4) |
| NAV-003, NAV-004, NAV-005 | Settings/PIN Activity-Flow | User landet auf falscher Screen | Robolectric Activity oder RN |
| API-003 | Session-Delete bei Logout | Server-Session bleibt offen | Contract-Test mit Mock |
| ERRPATH-008 | Android prüft kein leeres Password | Leeres Password kann submitted werden | RN-Policy dokumentieren |
| SEC-001..SEC-003 | Keine Security-Assertions in Legacy-Tests | Base64 ≠ Encryption | Phase 3/5 Security-Baseline |
| iOS gesamt | XCTest nicht ausführbar | iOS-Regression ungesichert | `MobileBrowserV2Tests` Target + CI auf macOS |
