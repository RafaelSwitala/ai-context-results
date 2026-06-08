# Traceability Matrix

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/navigation/codex/20260602-1757-codex-navigation/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T17:57:20+02:00 |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry | iOS Login settings/PIN entry. | IOS-FILE-002 | LT-001 | MAP-001, MAP-016 | LoginScreen/AppNavigator | READY |
| EP-002 | Entry | iOS login success/PIN unwind. | IOS-FILE-002 | LT-002, LT-003 | MAP-001, MAP-005, MAP-017 | LoginScreen/WebViewScreen | READY |
| EP-003 | Entry | iOS Settings QR/cancel/save/unwind. | IOS-FILE-003 | LT-009 | MAP-002 | SettingsScreen | READY |
| EP-004 | Entry | iOS QR scanner result/cancel. | IOS-FILE-004 | LT-009 | MAP-003 | QRCodeScannerScreen | READY |
| EP-005 | Entry | iOS WebView wrapper load/unwind. | IOS-FILE-006 | LT-004 | MAP-005 | WebViewScreen | READY |
| EP-006 | Entry | iOS WebView menu/delegate/foreground. | IOS-FILE-007 | LT-005, LT-006, LT-007, LT-008 | MAP-005, MAP-009, MAP-010 | WebViewScreen/services | READY |
| EP-007 | Entry | iOS ArticleScanner result/cancel. | IOS-FILE-008 | LT-010 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| EP-008 | Entry | Android Login navigation entry. | AND-FILE-003 | LT-011, LT-012, LT-013, LT-014 | MAP-001 | LoginScreen | READY |
| EP-009 | Entry | Android Settings route/result entry. | AND-FILE-004 | LT-015 | MAP-002 | SettingsScreen | READY |
| EP-010 | Entry | Android QR scanner entry. | AND-FILE-005 | LT-015, LT-016 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| EP-011 | Entry | Android WebView route entry. | AND-FILE-007 | LT-017, LT-018, LT-019 | MAP-005, MAP-009, MAP-010, MAP-014 | WebViewScreen/services | READY |
| EP-012 | Entry | Android Barcode scanner entry. | AND-FILE-008 | LT-020 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| EP-013 | Entry | Android PIN entry. | AND-FILE-006 | LT-021 | MAP-004, MAP-016 | PinScreen/AppNavigator | READY |
| EP-014 | Entry | Android manifest graph. | AND-FILE-001 | LT-011, LT-017 | MAP-001, MAP-005 | AppNavigator | READY |
| BEH-001 | Behavior | iOS Login PIN/Settings guard. | IOS-FILE-002 | LT-001 | MAP-001, MAP-016 | LoginScreen/AppNavigator | READY |
| BEH-002 | Behavior | iOS PIN success to Settings. | IOS-FILE-005, IOS-FILE-002 | LT-002 | MAP-001, MAP-004, MAP-016 | PinScreen/AppNavigator | READY |
| BEH-003 | Behavior | iOS Login to WebView with URL. | IOS-FILE-002 | LT-003 | MAP-005, MAP-017, MAP-020 | WebViewScreen | READY |
| BEH-004 | Behavior | iOS wrapper embeds WebView. | IOS-FILE-006 | LT-004 | MAP-005, MAP-020 | WebViewScreen | READY |
| BEH-005 | Behavior | iOS WebView load. | IOS-FILE-007 | LT-005 | MAP-005, MAP-014 | WebViewScreen | READY |
| BEH-006 | Behavior | iOS logout back to Login. | IOS-FILE-007 | LT-006 | MAP-005, MAP-010 | navigationAuthGuard | READY |
| BEH-007 | Behavior | iOS foreground auth guard. | IOS-FILE-007 | LT-005 | MAP-005, MAP-010, MAP-018 | navigationAuthGuard | READY |
| BEH-008 | Behavior | iOS barcode URL opens scanner. | IOS-FILE-007 | LT-007, LT-023 | MAP-005, MAP-009, MAP-019, MAP-021 | webViewNavigationService | READY |
| BEH-009 | Behavior | iOS login URL/form return. | IOS-FILE-007 | LT-008 | MAP-005, MAP-009, MAP-010 | WebViewScreen/services | READY |
| BEH-010 | Behavior | iOS QR result to Settings. | IOS-FILE-004, IOS-FILE-003 | LT-009 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| BEH-011 | Behavior | iOS ArticleScanner result to WebView/Login. | IOS-FILE-008 | LT-010, LT-026 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| BEH-012 | Behavior | Android Login invalid settings guard. | AND-FILE-003 | LT-011 | MAP-001, MAP-016 | LoginScreen/AppNavigator | READY |
| BEH-013 | Behavior | Android settings icon guard. | AND-FILE-003 | LT-011 | MAP-001, MAP-016 | LoginScreen | READY |
| BEH-014 | Behavior | Android login to WebView. | AND-FILE-003 | LT-012 | MAP-001, MAP-017, MAP-020 | WebViewScreen | READY |
| BEH-015 | Behavior | Android license route. | AND-FILE-003, AND-FILE-011 | LT-013 | MAP-001, MAP-007, MAP-023 | LicenseScreen | READY |
| BEH-016 | Behavior | Android Login back backgrounds task. | AND-FILE-003 | LT-014 | MAP-001, MAP-022 | LoginScreen BackHandler | READY |
| BEH-017 | Behavior | Android Settings save/cancel. | AND-FILE-004 | LT-015 | MAP-002 | SettingsScreen | READY |
| BEH-018 | Behavior | Android Settings QR route/result. | AND-FILE-004 | LT-015 | MAP-002, MAP-003 | SettingsScreen/QRCodeScannerScreen | READY |
| BEH-019 | Behavior | Android QR cancel/result/back. | AND-FILE-005 | LT-016 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| BEH-020 | Behavior | Android WebView empty/load. | AND-FILE-007 | LT-017 | MAP-005, MAP-009, MAP-014, MAP-020 | WebViewScreen | READY |
| BEH-021 | Behavior | Android barcode permission branch. | AND-FILE-007 | LT-018, LT-027 | MAP-005, MAP-009, MAP-019, MAP-021 | WebViewScreen/permission service | READY |
| BEH-022 | Behavior | Android WebView login/error return. | AND-FILE-007 | LT-019 | MAP-005, MAP-009, MAP-010 | WebViewScreen/services | READY |
| BEH-023 | Behavior | Android WebView logout/close toolbar. | AND-FILE-007, AND-FILE-010 | LT-019 | MAP-005, MAP-010 | WebViewScreen | READY |
| BEH-024 | Behavior | Android WebView back/resume guard. | AND-FILE-007 | LT-019, LT-025 | MAP-005, MAP-010, MAP-022 | WebViewScreen BackHandler | READY |
| BEH-025 | Behavior | Android Barcode scan/cancel to WebView. | AND-FILE-008 | LT-020 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| BEH-026 | Behavior | Android Barcode invalid auth to Login. | AND-FILE-008 | LT-020, LT-026 | MAP-006, MAP-010 | BarcodeScannerScreen/auth guard | READY |
| BEH-027 | Behavior | Android PIN success/exit/back. | AND-FILE-006 | LT-021 | MAP-004, MAP-016, MAP-022 | PinScreen | READY |
| STATE-001 | State | iOS Login to PIN. | IOS-FILE-002 | LT-001 | MAP-016 | AppNavigator | READY |
| STATE-002 | State | iOS PIN to Settings. | IOS-FILE-005, IOS-FILE-002 | LT-002 | MAP-016 | AppNavigator | READY |
| STATE-003 | State | iOS Login to WebView. | IOS-FILE-002 | LT-003 | MAP-017 | AppNavigator/WebViewScreen | READY |
| STATE-004 | State | iOS WebView to Login. | IOS-FILE-007 | LT-005, LT-006, LT-008 | MAP-018 | navigationAuthGuard | READY |
| STATE-005 | State | iOS WebView scanner loop. | IOS-FILE-007, IOS-FILE-008 | LT-007, LT-010 | MAP-019 | WebViewScreen/BarcodeScannerScreen | READY |
| STATE-006 | State | Android Login to PIN. | AND-FILE-003 | LT-011 | MAP-016 | AppNavigator | READY |
| STATE-007 | State | Android PIN to Settings. | AND-FILE-006 | LT-021 | MAP-016 | AppNavigator | READY |
| STATE-008 | State | Android Login to WebView. | AND-FILE-003 | LT-012 | MAP-017 | WebViewScreen | READY |
| STATE-009 | State | Android WebView barcode branch. | AND-FILE-007 | LT-018 | MAP-019, MAP-021 | WebViewScreen/permission | READY |
| STATE-010 | State | Android WebView/scanner to Login. | AND-FILE-007, AND-FILE-008 | LT-019, LT-020 | MAP-018 | navigationAuthGuard | READY |
| STOR-001 | Storage | iOS navigation guard state. | IOS-FILE-002, IOS-FILE-007 | LT-001, LT-006, LT-008 | MAP-012 | storage/auth guard | READY |
| STOR-002 | Storage | Android navigation guard state. | AND-FILE-003, AND-FILE-007, AND-FILE-002 | LT-011, LT-019 | MAP-012 | storage/auth guard | READY |
| STOR-003 | Storage | Route URL payload. | IOS-FILE-002, AND-FILE-003, AND-FILE-002 | LT-003, LT-012, LT-022 | MAP-008, MAP-013 | route params | READY |
| API-001 | API | iOS WebView load. | IOS-FILE-007 | LT-005 | MAP-014 | WebViewScreen | READY |
| API-002 | API | Android WebView load. | AND-FILE-007 | LT-017 | MAP-014 | WebViewScreen | READY |
| API-003 | API | No standalone navigation API. | IOS-FILE-002, AND-FILE-004 | LT-003, LT-015 | MAP-015 | N/A dependency | READY |
| NAV-001 | Navigation | iOS Login to Settings. | IOS-FILE-002 | LT-001, LT-002 | MAP-001, MAP-016 | AppNavigator | READY |
| NAV-002 | Navigation | iOS Login to PIN. | IOS-FILE-002 | LT-001, LT-002 | MAP-001, MAP-016 | AppNavigator | READY |
| NAV-003 | Navigation | iOS Login to WebView. | IOS-FILE-002, IOS-FILE-001 | LT-003, LT-004 | MAP-005, MAP-017 | WebViewScreen | READY |
| NAV-004 | Navigation | iOS Settings to QR. | IOS-FILE-003, IOS-FILE-001 | LT-009 | MAP-002, MAP-003 | SettingsScreen/QRCodeScannerScreen | READY |
| NAV-005 | Navigation | iOS QR to Settings. | IOS-FILE-004 | LT-009 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| NAV-006 | Navigation | iOS WebView to Login. | IOS-FILE-007 | LT-005, LT-006, LT-008 | MAP-005, MAP-010 | WebViewScreen | READY |
| NAV-007 | Navigation | iOS WebView to ArticleScanner. | IOS-FILE-007, IOS-FILE-001 | LT-007 | MAP-005, MAP-009, MAP-019 | WebViewScreen/BarcodeScannerScreen | READY |
| NAV-008 | Navigation | iOS ArticleScanner to WebView/Login. | IOS-FILE-008 | LT-010 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| NAV-009 | Navigation | Android Login to PIN/Settings. | AND-FILE-003 | LT-011 | MAP-001, MAP-016 | AppNavigator | READY |
| NAV-010 | Navigation | Android PIN to Settings. | AND-FILE-006 | LT-021 | MAP-004, MAP-016 | PinScreen | READY |
| NAV-011 | Navigation | Android Settings to Login. | AND-FILE-004 | LT-015 | MAP-002 | SettingsScreen | READY |
| NAV-012 | Navigation | Android Settings QR route/result. | AND-FILE-004 | LT-015, LT-016 | MAP-002, MAP-003 | SettingsScreen/QRCodeScannerScreen | READY |
| NAV-013 | Navigation | Android Login to WebView. | AND-FILE-003 | LT-012 | MAP-001, MAP-005, MAP-017 | WebViewScreen | READY |
| NAV-014 | Navigation | Android Login to License. | AND-FILE-003 | LT-013 | MAP-001, MAP-007, MAP-023 | LicenseScreen | READY |
| NAV-015 | Navigation | Android WebView to Login. | AND-FILE-007 | LT-017, LT-019 | MAP-005, MAP-010 | WebViewScreen/auth guard | READY |
| NAV-016 | Navigation | Android WebView to BarcodeScanner. | AND-FILE-007 | LT-018 | MAP-005, MAP-006, MAP-019, MAP-021 | BarcodeScannerScreen | READY |
| NAV-017 | Navigation | Android BarcodeScanner to WebView/Login. | AND-FILE-008 | LT-020 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| NAV-018 | Navigation | Android WebView close/logout. | AND-FILE-007 | LT-019 | MAP-005, MAP-010 | WebViewScreen | READY |
| ERRPATH-001 | Error | iOS invalid QR. | IOS-FILE-004 | LT-009 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| ERRPATH-002 | Error | iOS invalid article scan. | IOS-FILE-008 | LT-010 | MAP-006, MAP-011 | BarcodeScannerScreen | READY |
| ERRPATH-003 | Error | iOS login form/session expiry. | IOS-FILE-007 | LT-008 | MAP-005, MAP-010 | WebViewScreen/auth guard | READY |
| ERRPATH-004 | Error | Android empty WebView URL. | AND-FILE-007 | LT-017 | MAP-009 | webViewNavigationService | READY |
| ERRPATH-005 | Error | Android WebView error. | AND-FILE-007 | LT-019 | MAP-009, MAP-010 | WebViewScreen/services | READY |
| ERRPATH-006 | Error | Android camera permission denied. | AND-FILE-007 | LT-018, LT-027 | MAP-009, MAP-021 | permission service | READY |
| ERRPATH-007 | Error | Android invalid QR. | AND-FILE-005 | LT-016 | MAP-003, MAP-011 | QRCodeScannerScreen | READY |
| DEP-001 | Dependency | iOS storyboard segues. | IOS-FILE-001 | LT-001, LT-004 | MAP-024 | React Navigation | READY |
| DEP-002 | Dependency | iOS WKWebView. | IOS-FILE-007 | LT-005 | MAP-014, MAP-025 | react-native-webview | READY |
| DEP-003 | Dependency | iOS AVFoundation scanner. | IOS-FILE-004 | LT-009, LT-010 | MAP-026 | scanner dependency | READY |
| DEP-004 | Dependency | Android Activity/Intent. | AND-FILE-001, AND-FILE-003 | LT-011, LT-012 | MAP-024 | React Navigation | READY |
| DEP-005 | Dependency | Android WebView. | AND-FILE-007 | LT-017, LT-018 | MAP-014, MAP-025 | react-native-webview | READY |
| DEP-006 | Dependency | Android MLKit scanner. | AND-FILE-005 | LT-016, LT-020 | MAP-026 | scanner dependency | READY |
| DEP-007 | Dependency | RN navigation dependency. | RN-FILE-001, RN-FILE-002 | LT-022 | MAP-024, MAP-027 | AppNavigator/tests | READY |
| UI-001 | UI | iOS Login settings icon. | IOS-FILE-001, IOS-FILE-002 | LT-001 | MAP-001 | LoginScreen | READY |
| UI-002 | UI | iOS WebView menu. | IOS-FILE-001, IOS-FILE-007 | LT-006 | MAP-005 | WebViewScreen | READY |
| UI-003 | UI | iOS scanner cancel. | IOS-FILE-004, IOS-FILE-008 | LT-009, LT-010 | MAP-003, MAP-006 | scanner screens | READY |
| UI-004 | UI | Android Login icons. | AND-FILE-003 | LT-013, LT-014 | MAP-001 | LoginScreen | READY |
| UI-005 | UI | Android WebView toolbar. | AND-FILE-007, AND-FILE-010 | LT-019 | MAP-005 | WebViewScreen | READY |
| UI-006 | UI | Android scanner cancel/back. | AND-FILE-005, AND-FILE-008 | LT-016, LT-020 | MAP-003, MAP-006, MAP-022 | scanner BackHandler | READY |
| SEC-001 | Security | Invalid-auth route reset. | IOS-FILE-007, AND-FILE-007 | LT-005, LT-006, LT-008, LT-019, LT-020, LT-026 | MAP-010, MAP-012, MAP-018 | navigationAuthGuard | READY |
| SEC-002 | Security | Sensitive URL route params. | IOS-FILE-002, AND-FILE-003 | LT-003, LT-012, LT-022 | MAP-008, MAP-013 | route params | READY |
| SEC-003 | Security | Camera permission route. | AND-FILE-007 | LT-018, LT-027 | MAP-021 | permission service | READY |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| DEP-001 | Storyboard presentation requires UIKit runtime. | No | Unit-test segue decisions and use simulator UI tests if available. |
| DEP-002, DEP-005 | Real WebView rendering requires integration environment. | No | Unit-test URL classification and smoke-test RN WebView later. |
| DEP-003, DEP-006 | Camera scanner runtime requires device/hardware or mocked MLKit/AVFoundation callbacks. | No | Unit-test scan-result handlers with synthetic values. |
| MAP-026 | RN scanner dependency is not present in package.json. | No | Phase 3 must add a scanner package or document a blocked scanner implementation. |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
