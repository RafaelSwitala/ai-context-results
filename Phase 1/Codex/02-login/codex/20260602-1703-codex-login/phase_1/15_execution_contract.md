# Execution Contract

| Field | Value |
|---|---|
| Feature | login |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:03 (UTC+2) |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Input validation tests | Legacy Tests müssen leere user/password und invalid settings explizit prüfen | BEH-001, BEH-002, ERRPATH-001..ERRPATH-004 |
| Login success tests | Erfolgsfall muss Persistenz + Navigation + Login-Flag prüfen | BEH-003, BEH-004, STATE-001, STATE-002, NAV-001, NAV-002 |
| PIN tests | Match/Mismatch/Empty PIN-Verhalten mit UI-Result prüfen | BEH-006, ERRPATH-005, NAV-005 |
| Logout tests | App background Ereignis muss Login-Flag resetten | BEH-007, STATE-003, STATE-004 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Auth architecture | Login UI, PIN Gate, Storage und URL-Building strikt entkoppeln (Screen + Service + Hook) | MAP-001..MAP-006, MAP-014 |
| Security baseline | Passwort/PIN nicht in plain/base64-only Persistenz übernehmen | SEC-001..SEC-003, MAP-008, MAP-011, MAP-017 |
| Divergence decision | Preflight-HTTP-Check als bewusste RN-Policy dokumentieren | MAP-016, API-001, API-002 |
| AppState handling | Lifecycle-getriggerter logout/reset muss in RN reproduziert werden | MAP-006, MAP-021 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Mapping completeness | Jede `LT-*` Definition erhält `RT-*` oder begründeten Skip | LT-001..LT-010 |
| Mocking | Storage, URL-Builder, AppState und Session-Cleanup müssen mockbar sein | MAP-004, MAP-005, MAP-006 |
| Navigation assertions | Tests müssen Route Login->WebView sowie Login->Settings/PIN und PIN->Settings prüfen | NAV-001..NAV-005 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Fact coverage | Jede Source-ID aus P1-A12 in P1-A16 mit Test+Mapping belegt | EP-001..SEC-003 |
| Security decision closure | RN-Entscheidung für Password/PIN Speicherung dokumentiert | SEC-001..SEC-003, MAP-017 |
| Behavior parity | iOS/Android Divergenzen (preflight request, PIN UX) mit RN-Entscheid belegt | MAP-016, MAP-018 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Test-/Build-Command nicht Teil dieses P1-Discovery-Laufs | Low |
| android-mobilebrowser | UNKNOWN | Test-/Build-Command nicht Teil dieses P1-Discovery-Laufs | Low |
| rn-e-mobilebrowser | UNKNOWN | RN Commands werden in späteren Phasen präzisiert | Low |
