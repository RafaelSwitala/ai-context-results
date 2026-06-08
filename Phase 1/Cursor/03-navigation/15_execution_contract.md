# Execution Contract

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/15_execution_contract.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Route matrix tests | Jede `NAV-*` Route wird mit Auslöser und Ziel-Screen getestet | NAV-001..NAV-018 |
| Guard tests | Navigation bei `hasValidLogin=false` muss Login erzwingen | BEH-004, STATE-002, STOR-002 |
| WebView navigation tests | barcodescanner/login URLs lösen korrekte Zielrouten aus | BEH-005, EP-006, EP-007 |
| Back/logout tests | Logout und Back-Policies je Plattform abgedeckt | BEH-006, BEH-007, BEH-008, UI-001..UI-004 |
| Evidence format | Jeder Test referenziert mindestens eine Source-ID aus P1-A12 | EP-001..SEC-002 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Central navigator | Alle Legacy-Routen in `AppNavigator` abbilden, keine verstreute `navigation.navigate` Logik in UI | MAP-001, MAP-015 |
| Auth guards | `authGuard` vor geschützten Routen (WebView, Scanner) | MAP-007, SEC-002 |
| WebView bridge | URL-Parsing für barcodescanner/login zentral in `webviewNavigationBridge` | MAP-008, BEH-005 |
| Divergence closure | iOS child embedding und Android activity stack zu einem WebViewScreen konsolidieren | MAP-016 |
| Parameter hygiene | Login URLs mit Credentials nicht in persistenten Nav-States speichern | SEC-001, MAP-010 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| RN route tests | Für jede `LT-*` ein `RT-*` oder begründeter Skip | LT-001..LT-015 |
| Navigation mocking | React Navigation Test Utils + WebView URL mocks | MAP-019, MAP-020 |
| BackHandler tests | Android Back-Verhalten pro Screen validieren | MAP-021, BEH-008 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Route parity | Alle NAV-IDs haben RN-Route und Testabdeckung | NAV-001..NAV-018 |
| Guard parity | Ungültige Session führt immer zu Login | BEH-004, STATE-002 |
| Scanner return parity | ScanResult wird korrekt an WebView URL angehängt | BEH-005, NAV-009, NAV-016 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| ios-mobilebrowser | UNKNOWN | Test-/Build-Command in diesem Lauf nicht ausgeführt | Low |
| android-mobilebrowser | UNKNOWN | Test-/Build-Command in diesem Lauf nicht ausgeführt | Low |
| rn-e-mobilebrowser | UNKNOWN | RN Navigation-Setup wird in späteren Phasen präzisiert | Low |
