# Legacy Test Quality

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A24 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_2/24_legacy_test_quality.md |
| Status | COMPLETE |
| Created by | Codex / Composer |
| Last updated | 2026-06-04T16:45:00+02:00 |

## Quality Review

| Test ID | Behavior Assertion | Deterministic | Failure Sensitive | Weakness | Action |
|---|---|---|---|---|---|
| LT-006 (Android) | Mapped QR fields + isValid | Ja | Ja | — | — |
| LT-006 (iOS) | Gleiche Assertions in Swift | Ja (Quelle) | Ja (erwartet) | NOT_RUN | Target auf macOS anlegen |
| LT-007 | HTTPS default bei fehlendem https | Ja | Ja | — | — |
| LT-008 (Android) | Normalisierung + Parse | Ja | Mittel | Normalisierung als Test-String, nicht Scanner-Klasse | Akzeptiert (P1-A13: Handoff-String) |
| LT-012/013 | Config validity rules | Ja | Ja | Kein Asset-Load / App.onCreate | Dokumentiert SKIP Integration |
| LT-016/017 | HTTP 200 vs 500 Gate | Ja | Mittel | Nur `isOkHttpStatusCode`, nicht Save-Flow | Phase 4 RN mit HTTP-Mock |
| LT-021 | Culture in Login-URL | Ja | Ja | — | — |
| LT-022 | Douglas DNS rewrite | Ja | Ja | Reflection auf static prefs | Test-Setup dokumentiert |
| LT-026 | Invalid protocol ignored | Ja | Ja | — | — |
| LT-001–005, 010, 014, 015, 020 | UI/Navigation | — | — | SKIP | Robolectric Activity oder RN Phase 4 |
| LT-028 | Duplicate scan | — | — | SKIP | Instrumentation |
| LT-029 | Token/license | — | — | SKIP | Dependency-Feature |

## Coverage Gaps

| Source ID | Gap | Risk | Follow-up |
|---|---|---|---|
| API-001, API-003 | Kein gemockter Save mit Alamofire/HttpStatusUtil in Activity | Save-Fehlerpfad ungetestet im Legacy-UI | Phase 4 RN HTTP-Mock |
| BEH-009, STOR-010 | `updateSettingsOnVersionChanged` + Asset `config.json` | Config-Bootstrap auf Android | Flavor-Test mit Robolectric `@Config` + Asset oder Instrumentation |
| NAV-001, NAV-002, NAV-005, NAV-006 | Login-Guards | Falsche Navigation bei invalid settings | RN Navigation-Tests (Phase 4) |
| DEP-007 | Kamera/Scanner | — | Bereits als Not Testable in P1 ausgeschlossen |
| iOS gesamt | XCTest nicht ausführbar | iOS-Regression ungesichert | `MobileBrowserV2Tests` Target + CI auf macOS |
| PreferencesUtils static init | `sharedpreferences` vor `App.onCreate` null | Produktions-Risiko bei frühem Class-Load | Optional Refactor (nicht Phase-2-Scope) |
