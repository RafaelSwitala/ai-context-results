# Test Definition

| Field | Value |
|---|---|
| Feature | settings |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/settings/codex/20260602-1720-codex-settings/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:20 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | Unit/UI | iOS, Android | High | Prefill aus Preferences |
| BEH-002 | Unit | iOS, Android | High | Validation server + pin |
| BEH-003 | Integration | iOS, Android | High | Save gated by HTTP 200 |
| BEH-004 | Unit/UI | iOS | High | HTTPS switch mapping |
| BEH-005 | Unit/UI | Android | High | 3 protocol spinner values |
| BEH-006 | Unit | iOS, Android | Medium | QR prefill |
| BEH-007 | UI | iOS | Medium | Cancel visibility |
| BEH-008 | UI | Android | Medium | Cancel visibility |
| BEH-009 | Unit | Android | Medium | Locale immediate save |
| BEH-010 | Unit | Android | Medium | config.json bootstrap |
| BEH-011 | Unit | Android | Low | Douglas server migration |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | Cross | Settings screen prefills stored values | gespeicherte Preferences | screen load | server/client/token/pin/protocol in UI | BEH-001, EP-001, EP-003, STOR-001..STOR-010 |
| LT-002 | Cross | Validation rejects empty server | server="" | save tap | error dialog, kein HTTP call | BEH-002, ERRPATH-001 |
| LT-003 | Cross | Validation rejects invalid pin length | pin length 1..3 or >4 | save tap | wrong pin error | BEH-002, ERRPATH-001 |
| LT-004 | iOS | Save persists on HTTP 200 | valide inputs + mocked 200 | saveTouched | saveSettingsPreferences + hasValidSettings=true + dismiss | BEH-003, STATE-001, API-001, NAV-001 |
| LT-005 | Android | Save persists on OK status | valide inputs + mocked OK | save click | saveSettingsPreferences + hasValidSettings=true + Login navigation | BEH-003, STATE-001, API-002, NAV-003 |
| LT-006 | Cross | Save blocked on failed reachability | mocked non-200/0 status | save | showSettingsErrorDialog, no persist | BEH-003, ERRPATH-002 |
| LT-007 | iOS | Protocol switch saves http/https | switch off/on | save path | saveProtocolPreference 0/1 | BEH-004, STOR-004 |
| LT-008 | Android | Protocol spinner maps 3 modes | each spinner item | save prep | protocol int 0/1/2 persisted | BEH-005, STOR-009, SEC-002 |
| LT-009 | Cross | QR scan fills settings fields | valid QR URL | unwind/onActivityResult | fields updated from parser | BEH-006, NAV-002, NAV-004 |
| LT-010 | iOS | Cancel hidden without valid settings | hasValidSettings=false | viewDidLoad | cancelButton.isHidden=true | BEH-007, UI-004 |
| LT-011 | Android | Cancel hidden without saved prefs | empty prefs | onCreate | cancel GONE | BEH-008 |
| LT-012 | Android | Language selection saves locale immediately | spinner change | onItemSelected | saveLocale called | BEH-009, STOR-011 |
| LT-013 | Android | Config version bump bootstraps settings | new config version | App.onCreate bootstrap | settings overwritten + version saved | BEH-010, EP-005, STATE-002, STOR-012 |
| LT-014 | iOS | buildCheckAccessUrl nil shows error | unencodable server | saveTouched | settings error, no AF.request | ERRPATH-003 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-015 | Android | Invalid QR settings ignored | QR parse isValid false | UI unchanged | ERRPATH-004 |
| LT-016 | Android | config.json missing | load returns null | no bootstrap side effects | ERRPATH-005 |
| LT-017 | Android | Douglas server hostname replaced | old hostname in prefs | replaceDouglasServerName updates SERVER | BEH-011 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Save gate | BEH-003, API-001, API-002, ERRPATH-002 | 100% success/failure branches | Kern des Features |
| Validation | BEH-002, ERRPATH-001 | alle PIN/server Varianten | Verhindert kaputte Config |
| Storage keys | STOR-001..STOR-012 | vollständige Key-Abdeckung | Migration storage-config |
| Platform divergences | BEH-004, BEH-005, BEH-009, BEH-010 | dokumentierte Tests je Plattform | RN Design-Entscheidungen |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| UI-001 | Keyboard inset behavior needs UI/integration | Detox/screenshot or manual test checklist |
| NAV-001, NAV-003 | Post-save navigation belongs to navigation feature tests | Cross-reference navigation phase-1 LT tests |
