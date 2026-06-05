# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/storage-config/codex/20260602-1620-codex-storage-config/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Codex / Composer |
| Last updated | 2026-06-04T16:45:00+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | UserDefaults ohne gültige Settings | SettingsViewController lädt | Felder leer/default, HTTPS an | EP-001, BEH-001, STOR-001, UI-001 | P1 |
| LT-002 | iOS | Server leer, PIN leer | Save | Fehlerdialog, keine Persistenz | EP-002, BEH-002, ERRPATH-001, STOR-002 | P0 |
| LT-003 | iOS | PIN Länge ≠ 4 | Save | PIN-Fehlerdialog | BEH-002, ERRPATH-001, UI-002 | P0 |
| LT-004 | iOS | Valide Felder, HTTP-Mock 200 | Save | Settings + hasValidSettings, Dismiss | BEH-003, STATE-002, STOR-002, STOR-003, API-001 | P0 |
| LT-005 | iOS | HTTP-Mock ≠ 200 | Save | Fehlerdialog, keine Persistenz | BEH-003, ERRPATH-003, API-001 | P0 |
| LT-006 | iOS | QR mit p=MB,v=1,server,mandant,https,token,pin | QRCodeParser.parse | Gemappte Settings, isValid | BEH-004, BEH-005, STOR-002 | P0 |
| LT-007 | iOS | https fehlt/ungültig | QRCodeParser.parse | SecurityProtocol HTTPS | BEH-004, STOR-003 | P0 |
| LT-008 | iOS | Query-only Scan-String | Scanner normalisiert | localhost? Prefix, gültiger Parse | EP-005, BEH-006, NAV-004 | P1 |
| LT-009 | iOS | QR ohne p=MB oder v=1 | Scanner | Fehler + Rescan | BEH-006, ERRPATH-004 | P1 |
| LT-010 | iOS | hasValidSettings=false, mit/ohne PIN | Login lädt / Settings-Tap | Route Settings bzw. PIN | EP-004, BEH-007, NAV-001, NAV-002, STATE-001 | P1 |
| LT-011 | iOS | Gespeicherte Server/User | buildLoginUrlFromPreferences | URL aus Prefs + Protokoll | BEH-008, API-002, STOR-004 | P1 |
| LT-012 | Android | Config-Version ≠ Asset-Version | App.updateSettingsOnVersionChanged | Settings + valid + Version geschrieben | EP-006, BEH-009, STATE-004, STOR-009, STOR-010 | P0 |
| LT-013 | Android | Config ungültig/gleiche Version | App.updateSettingsOnVersionChanged | Prefs unverändert | ERRPATH-008, STOR-010 | P0 |
| LT-014 | Android | Protocol 0/1/2 in Prefs | SettingsActivity lädt | Spinner korrekt | EP-007, BEH-010, UI-004, UI-005 | P1 |
| LT-015 | Android | Server leer oder PIN ≠ 4 | Save | Fehlerdialog | BEH-011, ERRPATH-005, UI-004 | P0 |
| LT-016 | Android | Valide Felder, HTTP OK | Save | Persistenz + LoginActivity | BEH-012, STATE-005, STOR-006, STOR-007, API-003 | P0 |
| LT-017 | Android | HTTP non-OK | Save | Fehlerdialog | BEH-012, ERRPATH-006, API-003 | P0 |
| LT-018 | Android | Valide QR mit Culture | QRCodeParser.parse | Felder + Culture, HTTPS-Fallback | BEH-013, BEH-014, STOR-006, STOR-009 | P0 |
| LT-019 | Android | Query-only / invalid QR | handleCode | RESULT_OK bzw. Fehlerdialog | EP-010, BEH-015, ERRPATH-007, NAV-008 | P1 |
| LT-020 | Android | hasValidSettings=false | Login / Settings-Tap | SettingsActivity bzw. PinActivity | EP-009, BEH-016, NAV-005, NAV-006 | P1 |
| LT-021 | Android | Server/User/Locale gespeichert | buildLoginUrl | App=MobileBrowser & Culture | BEH-017, API-004, STOR-008, STOR-009 | P1 |
| LT-022 | Android | Alter Douglas-DNS | replaceDouglasServerName | Neuer DNS in Prefs | BEH-018, STOR-005 | P2 |
| LT-023 | Cross | Server enthält http(s):// | URL-Builder | Kein doppeltes Schema | API-002, API-004 | P2 |
| LT-024 | Cross | Client leer | URL-Builder | Pfad + Default.aspx | API-002, API-004 | P2 |
| LT-025 | iOS | Encoding schlägt fehl | buildCheckAccessUrl | nil → Save-Fehler | API-002, ERRPATH-002 | P2 |
| LT-026 | Android | protocol -1 oder 3 | saveProtocolPreference | Kein Überschreiben | STOR-007 | P2 |
| LT-027 | Android | Culture nicht in AvailableLanguages | QRCodeParser.parse | Default-Locale | BEH-013, STOR-009 | P2 |
| LT-028 | Android | Gleicher QR zweimal | handleCode | Zweiter Scan ignoriert | BEH-015 | P2 |
| LT-029 | Cross | Token fehlt | License-API | Leer/No-Op, Rest valid | API-005, SEC-001, SEC-002 | P2 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14 + Mockito | `Application` (nicht `App`) als Robolectric-Host; echte `SharedPreferences` via Reflection in `PreferencesUtils` | ERR-P2-01: Robolectric ergänzt, da JVM-Unit-Tests `Uri`/`TextUtils` benötigen |
| iOS | XCTest (geplant) | Keine Netzwerk-Mocks für Parser/URL-Tests | ERR-P2-01: Testquellen unter `MobileBrowserV2Tests/`; kein Test-Target im `.xcodeproj`; Ausführung auf macOS/Xcode |
