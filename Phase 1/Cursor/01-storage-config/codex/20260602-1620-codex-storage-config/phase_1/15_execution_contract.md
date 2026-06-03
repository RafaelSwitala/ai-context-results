# Execution Contract

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy test focus | Tests müssen Save-Gate (HTTP success/failure), PIN-Regeln und Gating `hasValidSettings` abdecken | BEH-001, BEH-002, BEH-003, BEH-004, ERRPATH-001..ERRPATH-004 |
| Storage verification | Jeder persistierte Key (`STOR-*`) wird explizit geprüft (write + read) | STOR-001..STOR-013 |
| QR/config parsing | Parser-Tests mit gültigen/ungültigen Parametern und Default-Handling | BEH-005, BEH-006, ERRPATH-005 |
| Evidence format | Jede Testdefinition referenziert mindestens eine Source-ID aus P1-A12 | EP-001..SEC-003 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RN architecture | Implementierung über Service + Screen + Hook, keine direkte Storage-Logik in UI-Komponenten | MAP-001..MAP-017 |
| Divergence handling | Android-only Features (config bootstrap, culture, insecure TLS mode) müssen als explizite RN-Entscheidung umgesetzt werden | MAP-018, MAP-019, MAP-020 |
| Security uplift | Sensible Felder (`pin`, `token`, `password`) nicht ungeschützt im Standard-Store persistieren | SEC-001, SEC-002, MAP-009, MAP-021 |
| URL parity | RN URL-Building muss Legacy Query-Parameter (`user`, optional `password`, `App`, optional `Culture`) kompatibel erzeugen | API-003, API-004, MAP-014 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RN test matrix | Für jede `LT-*` Definition wird ein RN-Äquivalent (`RT-*`) oder ein begründeter Skip erstellt | LT-001..LT-011 |
| Mock strategy | Netzwerk-Check (`connectivityService`) und Storage-Service müssen vollständig mockbar sein | MAP-004, MAP-005, MAP-013 |
| Navigation assertions | Tests validieren Routing zu Settings/PIN/Login abhängig vom gespeicherten Zustand | NAV-001..NAV-005, MAP-001, MAP-002 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Trace completeness | Keine Source-ID aus P1-A12 bleibt ohne Test- und Mapping-Bezug in P1-A16 | EP-001..SEC-003 |
| Divergence closure | Jede iOS/Android-Divergenz besitzt RN-Entscheidung | MAP-018..MAP-021 |
| Blocking criteria | Wenn Storage-/Gate-/URL-Verhalten nicht abgedeckt ist, Status `BLOCKED` statt `COMPLETE` setzen | BEH-001..BEH-006, API-001..API-004 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Testcommand in Phase 1 nicht im Scope ausgeführt | Low (fehlende test runner discovery in diesem Schritt) |
| android-mobilebrowser | UNKNOWN | Testcommand in Phase 1 nicht im Scope ausgeführt | Low (fehlende test runner discovery in diesem Schritt) |
| rn-e-mobilebrowser | UNKNOWN | RN test command wird in späteren Phasen präzisiert | Low |
