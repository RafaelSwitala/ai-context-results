# Test Definition

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 16:20 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit + Integration | iOS | High | Save nur nach erfolgreichem HTTP-Check |
| BEH-002 | Unit + Integration | Android | High | Save nur bei OK-Status |
| BEH-003 | Unit/UI | iOS | High | Login-Screen erzwingt Settings bei invalid config |
| BEH-004 | Unit/UI | Android | High | Login startet Settings/PIN abhängig vom gespeicherten Zustand |
| BEH-005 | Unit | Android | Medium | Config-Migration bei Versionswechsel |
| BEH-006 | Unit | iOS, Android | Medium | QR Parsing inkl. defaults und invalid input |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Save settings persists values on HTTP 200 | valide server/client/pin und HTTP 200 Stub | `saveTouched` wird ausgeführt | `server/client/token/pin/protocol` + `hasValidSettings=true` gespeichert | EP-001, BEH-001, STOR-001, STOR-006, API-001 |
| LT-002 | Android | Save settings persists on successful status | valide Inputs und `HttpStatusUtil` liefert OK | Save-Click in `SettingsActivity` | `saveValidSettingsPreference(true)` und `saveSettingsPreferences` werden aufgerufen | EP-002, BEH-002, STOR-007, STOR-011, API-002 |
| LT-003 | iOS | Login opens settings when config invalid | `hasValidSettings=false`, `pin=nil` | `viewDidLoad` / Settings-Button | Navigation zur Settings-Szene | EP-003, BEH-003, NAV-001 |
| LT-004 | Android | Login routes to Pin or Settings | `hasValidSettings=false`, variierender `pin` | `LoginActivity.onCreate` | Startet `PinActivity` falls PIN gesetzt, sonst `SettingsActivity` | EP-004, BEH-004, NAV-003, NAV-005 |
| LT-005 | Android | Config migration updates preferences on new version | `currentConfigVersion != config.version` und gültige config | `updateSettingsOnVersionChanged` | Settings + valid flag + current version werden gespeichert | EP-005, BEH-005, STOR-013 |
| LT-006 | Cross | QR parser maps settings fields | gültiger QR-Link mit p,v,server,mandant,https,token,pin | Parser wird aufgerufen | DTO enthält erwartete Felder/Protokolldefault | BEH-006, STOR-005, STOR-010 |
| LT-007 | Android | Locale from QR and spinner is persisted | QR enthält culture bzw. Spinner-Auswahl | `fillControlsFromQRCode` bzw. item selected | `saveLocale` erhält korrekten Wert | BEH-006, STOR-012, UI-004 |
| LT-008 | Cross | Save blocked on invalid PIN length | pin Länge != 4 und nicht leer | Save-Aktion | Fehlerdialog, keine Persistenz | ERRPATH-003, ERRPATH-004 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-009 | Android | Ungültiges `https` Feld in QR/config | Fallback auf `PROTOCOL_HTTPS` | BEH-006, STOR-010 |
| LT-010 | iOS | URL-Encoding für Server/User mit Sonderzeichen | `buildCheckAccessUrl`/`buildLoginUrl` liefert valide URL oder nil | API-001, API-003 |
| LT-011 | Android | Fehlende/invalid `config.json` | Kein Crash, keine Settings-Migration | ERRPATH-005, BEH-005 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Settings save flow | EP-001, EP-002, BEH-001, BEH-002, API-001, API-002 | 100% Branches um success/error/pin-validity | Höchstes Risiko für First-run und Produktionseinrichtung |
| Storage keys + flags | STOR-001..STOR-013, STATE-001..STATE-005 | 100% Key-Abdeckung | Migration darf keine Persistenz-Regression erzeugen |
| Navigation gates | NAV-001..NAV-005, BEH-003, BEH-004 | alle Gate-Varianten | Falsche Navigation blockiert Login/Settings |
| Security-sensitive paths | SEC-001..SEC-003 | dokumentierte Tests + policy assertions | spätere RN-Entscheidung benötigt belastbare Ausgangsbasis |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| API-004 | Echter Netzaufruf erfolgt in WebView-Runtime, nicht isoliert unit-testbar | URL-Builder Unit-Tests + Intent-Payload-Assertions in Activity-Test |
