# Legacy Test Plan

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A21 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_2/21_legacy_test_plan.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:00:00+02:00 |

## Test Plan

| Test ID | Platform | Given | When | Then | Source IDs | Priority |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Settings invalid; mit/ohne PIN | Login viewDidLoad oder Settings-Icon | PINCODE-Segue bzw. SETTINGS-Segue | EP-001, BEH-001, STATE-001, NAV-001, NAV-002, STOR-001 | P0 |
| LT-002 | iOS | PinCodeViewController erhält passenden Code | didFinishedEnterCode + unwindToLogin | Login führt SETTINGS-Segue aus | EP-002, BEH-002, STATE-002, NAV-001 | P0 |
| LT-003 | iOS | Login erfolgreich; Prefs bauen URL | WEBVIEW-Segue prepare | WebsiteWrapper erhält rebuilt URL | EP-002, BEH-003, STATE-003, STOR-003, NAV-003 | P0 |
| LT-004 | iOS | WebsiteWrapper hat URL | viewDidLoad / unwindToWebview | WebsiteViewController mit URL instanziiert | EP-005, BEH-004, NAV-003 | P0 |
| LT-005 | iOS | WebView hat URL; valid-login false im Foreground | viewDidLoad dann Foreground | URL lädt; BACK_TO_LOGIN bei invalid login | EP-006, BEH-005, BEH-007, STATE-004, NAV-006, SEC-001 | P0 |
| LT-006 | iOS | User wählt Logout | Action-Sheet Logout | valid-login false; BACK_TO_LOGIN nach Delete | EP-006, BEH-006, STATE-004, NAV-006, SEC-001 | P0 |
| LT-007 | iOS | Navigation-URL startet mit barcodescanner | decidePolicyFor | Navigation cancel; ARTICLE_SCANNER mit Return-URL | EP-006, BEH-008, STATE-005, NAV-007, SEC-002 | P0 |
| LT-008 | iOS | Form-Action enthält login.aspx | didFinish JavaScript | valid-login false; BACK_TO_LOGIN | EP-006, BEH-009, ERRPATH-003, NAV-006 | P0 |
| LT-009 | iOS | Scanner erhält valid/invalid QR | metadataOutput | Valid → Settings; Invalid → Error + Rescan | EP-003, EP-004, BEH-010, ERRPATH-001, NAV-004, NAV-005 | P1 |
| LT-010 | iOS | ArticleScanner mit/ohne Code | scan oder cancel | WebView-URL mit/ohne ScanResult | EP-007, BEH-011, ERRPATH-002, NAV-008 | P0 |
| LT-011 | Android | Settings invalid; mit/ohne PIN | LoginActivity onCreate/Settings-Icon | PinActivity bzw. SettingsActivity | EP-008, BEH-012, BEH-013, STATE-006, NAV-009, STOR-002 | P0 |
| LT-012 | Android | Valid login baut URL | Login-Button | WebviewActivity mit App.URL extra | EP-008, BEH-014, STATE-008, NAV-013, SEC-002 | P0 |
| LT-013 | Android | License-Icon + Popup-Item | showMenu | LicenseActivity startet | EP-008, BEH-015, NAV-014, UI-004 | P1 |
| LT-014 | Android | LoginActivity Back-Press | onBackPressed | moveTaskToBack(true) | EP-008, BEH-016, UI-004 | P1 |
| LT-015 | Android | Settings Save/Cancel/QR-Result | Handler | Login startet; Cancel back; QR füllt Felder | EP-009, EP-010, BEH-017, BEH-018, NAV-011, NAV-012 | P1 |
| LT-016 | Android | QR Scanner Cancel/Valid/Back | onClick/handleCode/back | RESULT_CANCELED/OK; Back no-op | EP-010, BEH-019, ERRPATH-007, NAV-012 | P1 |
| LT-017 | Android | Intent-URL leer/nicht-leer | WebviewActivity onCreate | Leer → Login; sonst WebView-Load | EP-011, BEH-020, ERRPATH-004, NAV-015 | P0 |
| LT-018 | Android | Barcode-URL; Kamera erlaubt/verweigert | onPageFinished | Scanner startet bzw. Dialog + Return-URL | EP-011, BEH-021, ERRPATH-006, NAV-016, SEC-003 | P0 |
| LT-019 | Android | Login-Form/URL/Error/Logout | WebView-Handler | valid-login false; LoginActivity/finish | EP-011, BEH-022, BEH-023, BEH-024, NAV-015, SEC-001 | P0 |
| LT-020 | Android | Barcode Cancel/Scan/Auth-Loss | Handler | WebviewActivity mit URL; invalid → Login | EP-012, BEH-025, BEH-026, NAV-017, SEC-001 | P0 |
| LT-021 | Android | Korrekte PIN / Exit / Back | PinActivity-Handler | Settings + finish; Exit/Back finish | EP-013, BEH-027, STATE-007, NAV-010 | P0 |
| LT-022 | Cross | Route-Konstanten | Helper aufgerufen | Gleiche Scheme/Keys auf iOS und Android | IOS-FILE-009, AND-FILE-002, STOR-003, SEC-002 | P0 |
| LT-023 | iOS | Barcode-URL ohne :// | decidePolicyFor-Logik | Keine Return-URL ohne Scheme-Separator | BEH-008, NAV-007 | P1 |
| LT-024 | Android | Duplikat-Scan-Code | handleCode | Zweiter identischer Code ignoriert | EP-010, EP-012 | P1 |
| LT-025 | Android | WebView Back bei Auth | onBackPressed | Keine Navigation | BEH-024 | P1 |
| LT-026 | Cross | valid-login false im Scanner | Resume/Load | Login-Route | BEH-011, BEH-026, SEC-001 | P0 |
| LT-027 | Android | Kamera verweigert bei Barcode | onPageFinished | Dialog OK lädt Return-URL | ERRPATH-006, SEC-003 | P1 |

## Test Environment Assumptions

| Platform | Framework | Required Mocks | Notes |
|---|---|---|---|
| Android | JUnit4 + Robolectric 4.14 | `StorageConfigTestSupport` für Preferences | Bestehendes Test-Setup wiederverwendet |
| iOS | XCTest (Quellen erstellt) | Keine Netzwerk-/WebView-Mocks für Pure-Logic | ERR-P2-01: Kein XCTest-Target; Ausführung auf macOS/Xcode |
