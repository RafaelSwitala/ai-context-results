# Traceability Matrix

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | codex |
| Last updated | 2026-06-02 17:05 (UTC+2) |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry Point | iOS login -> WEBVIEW | LoginViewController.performSegue | LT-001 | MAP-001, MAP-002 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| EP-002 | Entry Point | iOS login -> SETTINGS/PIN | openSettingsButtonTapped | LT-002 | MAP-001, MAP-003, MAP-004 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| EP-003 | Entry Point | Android launcher Login | AndroidManifest MAIN/LAUNCHER | LT-003 | MAP-001 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| EP-004 | Entry Point | Android login -> Webview | LoginActivity onClick | LT-003 | MAP-001, MAP-002 | src/screens/webview/WebViewScreen.tsx | READY_FOR_REVIEW |
| EP-005 | Entry Point | Android login gate Settings/Pin | LoginActivity onCreate | LT-004 | MAP-003, MAP-004 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| EP-006 | Entry Point | iOS webview barcode route | decidePolicyFor barcodescanner | LT-005 | MAP-006, MAP-008 | src/screens/scanner/ArticleScannerScreen.tsx | READY_FOR_REVIEW |
| EP-007 | Entry Point | Android webview barcode route | WebviewActivity onPageFinished | LT-006 | MAP-006, MAP-008 | src/screens/scanner/ArticleScannerScreen.tsx | READY_FOR_REVIEW |
| BEH-001 | Behavior | iOS segue navigation | Main.storyboard segues | LT-001, LT-002 | MAP-001, MAP-015 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| BEH-002 | Behavior | Android intent navigation | LoginActivity startActivity | LT-003, LT-004 | MAP-001, MAP-015 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| BEH-003 | Behavior | iOS child webview embed | WebsiteWrapperViewController.showWebview | LT-014 | MAP-002, MAP-016 | src/screens/webview/WebViewScreen.tsx | READY_FOR_REVIEW |
| BEH-004 | Behavior | session guard to login | hasValidLogin checks | LT-008 | MAP-007, MAP-013 | src/navigation/authGuard.ts | READY_FOR_REVIEW |
| BEH-005 | Behavior | barcode roundtrip navigation | scanner -> webview URL | LT-005, LT-006, LT-007 | MAP-006, MAP-008, MAP-014 | src/navigation/webviewNavigationBridge.ts | READY_FOR_REVIEW |
| BEH-006 | Behavior | iOS webview logout route | barButtonTouched Abmelden | LT-009 | MAP-009 | src/navigation/sessionNavigation.ts | READY_FOR_REVIEW |
| BEH-007 | Behavior | Android webview logout route | toolbar action_logged_out | LT-010 | MAP-009 | src/navigation/sessionNavigation.ts | READY_FOR_REVIEW |
| BEH-008 | Behavior | Android back disabled | onBackPressed no-op | LT-011 | MAP-017, MAP-021 | src/screens/webview/WebViewScreen.tsx | READY_FOR_REVIEW |
| STATE-001 | State | logout/login URL -> login route | webview didFinish/login URL | LT-009, LT-010 | MAP-009, MAP-013 | src/navigation/sessionNavigation.ts | READY_FOR_REVIEW |
| STATE-002 | State | invalid login guard | resume/foreground guards | LT-008 | MAP-007, MAP-013 | src/navigation/authGuard.ts | READY_FOR_REVIEW |
| STATE-003 | State | empty webview URL -> login | WebviewActivity onCreate | LT-012 | MAP-013 | src/navigation/AppNavigator.tsx | READY_FOR_REVIEW |
| STOR-001 | Storage | nav URL param | segue url / Intent App.URL | LT-001, LT-003, LT-007 | MAP-010 | route params | READY_FOR_REVIEW |
| STOR-002 | Storage | hasValidLogin guard flag | PreferencesUtils | LT-008 | MAP-011, MAP-007 | auth state hook | READY_FOR_REVIEW |
| STOR-003 | Storage | N/A navigation store | documented N/A | N/A | N/A | N/A | READY_FOR_REVIEW |
| API-001 | API | N/A dedicated nav API | documented N/A | N/A | MAP-012 | N/A | READY_FOR_REVIEW |
| NAV-001 | Navigation | Login->WebView iOS | WEBVIEW segue | LT-001 | MAP-001, MAP-002 | AppNavigator | READY_FOR_REVIEW |
| NAV-002 | Navigation | Login->Settings iOS | SETTINGS segue | LT-002 | MAP-003 | SettingsScreen | READY_FOR_REVIEW |
| NAV-003 | Navigation | Login->PIN iOS | PINCODE segue | LT-002 | MAP-004 | PinGateScreen | READY_FOR_REVIEW |
| NAV-004 | Navigation | PIN->Login/Settings iOS | BACK_TO_LOGIN + SETTINGS | LT-002 | MAP-004 | PinGateScreen | READY_FOR_REVIEW |
| NAV-005 | Navigation | Settings->QR iOS | QRCODE_SCANNER | LT-002 | MAP-005 | QrScannerScreen | READY_FOR_REVIEW |
| NAV-006 | Navigation | QR->Settings iOS | BACK_TO_SETTINGS unwind | LT-002 | MAP-005, MAP-018 | QrScannerScreen | READY_FOR_REVIEW |
| NAV-007 | Navigation | WebView->ArticleScanner iOS | ARTICLE_SCANNER | LT-005 | MAP-006 | ArticleScannerScreen | READY_FOR_REVIEW |
| NAV-008 | Navigation | WebView/Scanner->Login iOS | BACK_TO_LOGIN | LT-008, LT-009 | MAP-009 | Login route | READY_FOR_REVIEW |
| NAV-009 | Navigation | ArticleScanner->WebView iOS | BACK_TO_WEBVIEW | LT-007, LT-014 | MAP-002, MAP-014 | WebViewScreen | READY_FOR_REVIEW |
| NAV-010 | Navigation | Login->WebView Android | startActivity Webview | LT-003 | MAP-002 | WebViewScreen | READY_FOR_REVIEW |
| NAV-011 | Navigation | Login->Settings/Pin Android | startActivity Settings/Pin | LT-004 | MAP-003, MAP-004 | AppNavigator | READY_FOR_REVIEW |
| NAV-012 | Navigation | Settings->Login Android | save success | LT-004 | MAP-003 | SettingsScreen | READY_FOR_REVIEW |
| NAV-013 | Navigation | Settings->QR Android | startActivityForResult | LT-002 | MAP-005, MAP-018 | QrScannerScreen | READY_FOR_REVIEW |
| NAV-014 | Navigation | Pin->Settings Android | openSettings | LT-004 | MAP-004 | PinGateScreen | READY_FOR_REVIEW |
| NAV-015 | Navigation | WebView->BarcodeScanner Android | startActivity scanner | LT-006 | MAP-006 | ArticleScannerScreen | READY_FOR_REVIEW |
| NAV-016 | Navigation | Scanner->WebView Android | handleCode/cancel | LT-007 | MAP-006, MAP-014 | WebViewScreen | READY_FOR_REVIEW |
| NAV-017 | Navigation | WebView/Error->Login Android | login URL/error OK | LT-010, LT-012 | MAP-009 | Login route | READY_FOR_REVIEW |
| NAV-018 | Navigation | Crash handler->Login Android | MyExceptionHandler | LT-015 | MAP-001 | AppNavigator | READY_FOR_REVIEW |
| ERRPATH-001 | Error Path | empty URL starts login | WebviewActivity onCreate | LT-012 | MAP-013 | AppNavigator | READY_FOR_REVIEW |
| ERRPATH-002 | Error Path | webview error dialog to login | showErrorDialog | LT-010 | MAP-009 | sessionNavigation | READY_FOR_REVIEW |
| ERRPATH-003 | Error Path | camera permission denied | onPageFinished branch | LT-013 | MAP-008 | webviewNavigationBridge | READY_FOR_REVIEW |
| ERRPATH-004 | Error Path | iOS scanner without login | ArticleScanner viewDidLoad | LT-008 | MAP-007 | authGuard | READY_FOR_REVIEW |
| DEP-001 | Dependency | iOS storyboard segues | Main.storyboard | LT-001, LT-002 | MAP-015, MAP-019 | React Navigation | READY_FOR_REVIEW |
| DEP-002 | Dependency | WKNavigationDelegate routing | WebsiteViewController | LT-005, LT-009 | MAP-008, MAP-020 | webviewNavigationBridge | READY_FOR_REVIEW |
| DEP-003 | Dependency | Android Intent stack | LoginActivity intents | LT-003, LT-004 | MAP-015, MAP-019 | React Navigation | READY_FOR_REVIEW |
| DEP-004 | Dependency | parentActivityName metadata | AndroidManifest | LT-004 | MAP-017 | header back config | READY_FOR_REVIEW |
| DEP-005 | Dependency | hasValidLogin guard | PreferencesUtils | LT-008 | MAP-007, MAP-011 | authGuard | READY_FOR_REVIEW |
| UI-001 | UI | iOS settings dismiss | cancelTouched dismiss | LT-002 | MAP-003 | SettingsScreen | READY_FOR_REVIEW |
| UI-002 | UI | Android login back | moveTaskToBack | LT-011 | MAP-017, MAP-021 | LoginScreen | READY_FOR_REVIEW |
| UI-003 | UI | Android webview toolbar close/logout | menu_toolbar actions | LT-010, LT-011 | MAP-009 | WebViewScreen | READY_FOR_REVIEW |
| UI-004 | UI | iOS webview logout actionsheet | barButtonTouched | LT-009 | MAP-009 | WebViewScreen | READY_FOR_REVIEW |
| SEC-001 | Security | sensitive URL in nav params | prepare/putExtra URL | LT-001, LT-003 | MAP-010 | route param policy | READY_FOR_REVIEW |
| SEC-002 | Security | auth guard on protected routes | hasValidLogin checks | LT-008 | MAP-007, MAP-011 | authGuard | READY_FOR_REVIEW |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| N/A | Keine offenen Traceability-Lücken in P1-A12 | N/A | N/A |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
