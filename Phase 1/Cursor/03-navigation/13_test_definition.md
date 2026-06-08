# Test Definition

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/13_test_definition.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001 | UI/Integration | iOS | High | Segue-Routing Login -> WebView/Settings/PIN |
| BEH-002 | UI/Integration | Android | High | Intent-Routing Login -> WebView/Settings/PIN |
| BEH-003 | UI | iOS | Medium | Child-VC Embedding im WebView-Wrapper |
| BEH-004 | UI/Integration | iOS, Android | High | Session-Guard erzwingt Login-Route |
| BEH-005 | UI/Integration | iOS, Android | High | Barcode-URL -> Scanner -> WebView mit ScanResult |
| BEH-006 | UI | iOS | High | Logout aus WebView navigiert zu Login |
| BEH-007 | UI | Android | High | Toolbar logout/finish Verhalten |
| BEH-008 | UI | Android | Medium | Back disabled in WebView/Scanner |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Login success navigates to WEBVIEW segue | valider Login-Flow | `performSegue(WEBVIEW)` ausgelöst | WebsiteWrapper wird präsentiert, URL in prepare gesetzt | EP-001, BEH-001, NAV-001, STOR-001 |
| LT-002 | iOS | Settings gate routes to PIN or SETTINGS | PIN gesetzt vs. nicht gesetzt | openSettings/geteilter Einstieg | korrekter segue identifier | EP-002, NAV-002, NAV-003 |
| LT-003 | Android | Launcher opens Login and routes to WebView on login | App-Start + valider Login | Login onClick | WebviewActivity gestartet mit URL extra | EP-003, EP-004, NAV-010, STOR-001 |
| LT-004 | Android | Invalid settings routes to Settings or Pin | hasValidSettings=false | Login onCreate | SettingsActivity oder PinActivity gestartet | EP-005, NAV-011 |
| LT-005 | iOS | WebView barcode URL opens article scanner | URL prefix barcodescanner | decidePolicyFor | segue ARTICLE_SCANNER mit redirectUrl | EP-006, BEH-005, NAV-007 |
| LT-006 | Android | WebView barcode URL opens scanner activity | barcodescanner URL in onPageFinished | startActivity BarcodeScanner | Intent enthält return URL | EP-007, BEH-005, NAV-015 |
| LT-007 | Cross | Scanner returns to webview with scan result | gültiger Scan-Code | scanner completion | Ziel-WebView URL enthält ScanResult Parameter | BEH-005, NAV-009, NAV-016 |
| LT-008 | Cross | Invalid login flag forces login route | hasValidLogin=false | resume/foreground | Navigation zu Login, kein Scanner/WebView Fortsetzen | BEH-004, STATE-002, ERRPATH-004 |
| LT-009 | iOS | WebView logout menu returns to login | authenticated web session | Abmelden action | BACK_TO_LOGIN segue nach flag reset | BEH-006, NAV-008, UI-004 |
| LT-010 | Android | WebView logout menu finishes to login | Webview toolbar logout | menu click | App.logout + finish | BEH-007, NAV-017, UI-003 |
| LT-011 | Android | Webview onBackPressed is no-op | WebviewActivity aktiv | hardware back | keine Navigation | BEH-008 |
| LT-012 | Android | Empty URL at webview start routes to login | Intent URL empty | Webview onCreate | LoginActivity gestartet | STATE-003, ERRPATH-001 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| LT-013 | Android | Camera permission denied on barcode navigation | Dialog + reload returnUrl, kein Scanner | ERRPATH-003 |
| LT-014 | iOS | WebsiteWrapper reinstantiates webview after article unwind | unwind from ArticleScanner | showWebview erneut aufgerufen | BEH-003, NAV-009 |
| LT-015 | Android | Uncaught exception handler routes to login | crash in foreground activity | LoginActivity gestartet | NAV-018 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Primary routes | NAV-001..NAV-018 | 100% route matrix | Kern des Features navigation |
| Guards | BEH-004, STATE-002, STOR-002, SEC-002 | alle Guard-Pfade | Verhindert unautorisierte Screen-Zugriffe |
| WebView-triggered routes | BEH-005, EP-006, EP-007 | success + blocked permission/error | Häufigster Laufzeit-Navigationspfad |
| Back/logout UX | BEH-006, BEH-007, BEH-008, UI-001..UI-004 | alle Toolbar/Back Varianten | Nutzererwartung bei Session-Ende |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| API-001 | Keine dedizierte Nav-API; Routing ist UI-seitig | UI/Integration-Tests auf Segue/Intent-Auslösung |
| STOR-003 | Kategorie bewusst N/A | Dokumentiert in Code Facts; kein separater Store |
