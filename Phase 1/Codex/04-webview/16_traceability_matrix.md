# Traceability Matrix

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P1 |
| Artifact ID | P1-A16 |
| Artifact Path | artifacts/webview/codex/20260602-1824-codex-webview/phase_1/16_traceability_matrix.md |
| Status | READY_FOR_REVIEW |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-02T18:24:31+02:00 |

## Fact To Migration/Test Trace

| Source ID | Type | Description | Legacy Source | Test IDs | Mapping IDs | RN Target | Status |
|---|---|---|---|---|---|---|---|
| EP-001 | Entry | iOS WEBVIEW segue URL handoff. | IOS-FILE-003 | LT-001 | MAP-002 | AppNavigator/WebView route | READY |
| EP-002 | Entry | iOS WebView wrapper load/unwind. | IOS-FILE-002 | LT-002 | MAP-001 | WebViewScreen | READY |
| EP-003 | Entry | iOS WebView lifecycle. | IOS-FILE-001 | LT-003, LT-004, LT-009 | MAP-001 | WebViewScreen | READY |
| EP-004 | Entry | iOS WKNavigationDelegate callbacks. | IOS-FILE-001 | LT-005, LT-006, LT-007 | MAP-001, MAP-004, MAP-012 | WebViewScreen/services | READY |
| EP-005 | Entry | iOS toolbar/scanner prepare. | IOS-FILE-001 | LT-006, LT-008 | MAP-001 | WebViewScreen | READY |
| EP-006 | Entry | iOS ArticleScanner return. | IOS-FILE-004 | LT-010 | MAP-003, MAP-005 | BarcodeScannerScreen/return service | READY |
| EP-007 | Entry | Android login to WebView. | AND-FILE-003 | LT-011 | MAP-002 | AppNavigator/WebView route | READY |
| EP-008 | Entry | Android WebView create/init. | AND-FILE-001 | LT-012, LT-013 | MAP-001, MAP-011, MAP-014 | WebViewScreen | READY |
| EP-009 | Entry | Android WebViewClient callbacks. | AND-FILE-001 | LT-014, LT-015, LT-016, LT-017, LT-018, LT-019, LT-020, LT-021 | MAP-001, MAP-004, MAP-011, MAP-012 | WebViewScreen/services | READY |
| EP-010 | Entry | Android toolbar/lifecycle/back/destroy. | AND-FILE-001 | LT-022, LT-023 | MAP-001, MAP-006, MAP-016 | WebViewScreen | READY |
| EP-011 | Entry | Android BarcodeScanner WebView return. | AND-FILE-004 | LT-024 | MAP-003, MAP-005 | BarcodeScannerScreen | READY |
| BEH-001 | Behavior | iOS URL handoff to wrapper. | IOS-FILE-003, IOS-FILE-007 | LT-001 | MAP-002, MAP-014 | route params | READY |
| BEH-002 | Behavior | iOS wrapper embeds WebView. | IOS-FILE-002, IOS-FILE-005 | LT-002 | MAP-001, MAP-017 | WebViewScreen | READY |
| BEH-003 | Behavior | iOS navigationDelegate assignment. | IOS-FILE-001 | LT-003 | MAP-001 | WebViewScreen | READY |
| BEH-004 | Behavior | iOS WebView load/reload. | IOS-FILE-001 | LT-003, LT-004 | MAP-001, MAP-011 | WebViewScreen | READY |
| BEH-005 | Behavior | iOS loading start. | IOS-FILE-001 | LT-005 | MAP-001, MAP-015 | loading state | READY |
| BEH-006 | Behavior | iOS loading finish. | IOS-FILE-001 | LT-005 | MAP-001, MAP-015 | loading state | READY |
| BEH-007 | Behavior | iOS fail hides loader only. | IOS-FILE-001 | LT-005 | MAP-001, MAP-015, MAP-019 | WebViewScreen decision | READY |
| BEH-008 | Behavior | iOS barcode URL to scanner. | IOS-FILE-001 | LT-006, LT-026 | MAP-004, MAP-005, MAP-020 | route classifier/return URL | READY |
| BEH-009 | Behavior | iOS login URL dismissal. | IOS-FILE-001, IOS-FILE-006 | LT-007 | MAP-004, MAP-006 | WebViewScreen/session | READY |
| BEH-010 | Behavior | iOS login-form session expiry. | IOS-FILE-001 | LT-007 | MAP-006, MAP-012, MAP-016 | session service | READY |
| BEH-011 | Behavior | iOS toolbar logout. | IOS-FILE-001 | LT-008 | MAP-001, MAP-006 | WebViewScreen/session | READY |
| BEH-012 | Behavior | iOS disappear cleanup. | IOS-FILE-001 | LT-009 | MAP-001 | WebViewScreen cleanup | READY |
| BEH-013 | Behavior | iOS scan-result return URL. | IOS-FILE-004, IOS-FILE-006 | LT-010 | MAP-003, MAP-005 | return URL service | READY |
| BEH-014 | Behavior | Android login URL extra. | AND-FILE-003, AND-FILE-005 | LT-011 | MAP-002, MAP-014 | route params | READY |
| BEH-015 | Behavior | Android URL source/fallback. | AND-FILE-001, AND-FILE-006 | LT-012 | MAP-001, MAP-014, MAP-017 | WebViewScreen | READY |
| BEH-016 | Behavior | Android WebView settings. | AND-FILE-001, AND-FILE-005 | LT-013 | MAP-001, MAP-018 | WebView props | READY |
| BEH-017 | Behavior | Android no-cache load/client setup. | AND-FILE-001 | LT-013 | MAP-001, MAP-011 | WebViewScreen | READY |
| BEH-018 | Behavior | Android page start timeout state. | AND-FILE-001 | LT-014, LT-028 | MAP-001, MAP-015 | loading state | READY |
| BEH-019 | Behavior | Android SSL proceed branch. | AND-FILE-001 | LT-015 | MAP-001, MAP-021 | WebView SSL decision | READY |
| BEH-020 | Behavior | Android shouldOverride URL suppression. | AND-FILE-001 | LT-016, LT-025 | MAP-004, MAP-020 | route classifier | READY |
| BEH-021 | Behavior | Android HTTP/resource errors. | AND-FILE-001, AND-FILE-007 | LT-017, LT-027 | MAP-007, MAP-019 | error mapper/WebViewScreen | READY |
| BEH-022 | Behavior | Android login form session expiry. | AND-FILE-001 | LT-018 | MAP-006, MAP-012, MAP-016 | session service | READY |
| BEH-023 | Behavior | Android barcode route permission granted. | AND-FILE-001 | LT-019 | MAP-004, MAP-005, MAP-020 | route classifier/permission | READY |
| BEH-024 | Behavior | Android barcode route permission denied. | AND-FILE-001 | LT-019, LT-027 | MAP-005, MAP-020 | permission fallback | READY |
| BEH-025 | Behavior | Android server error URL. | AND-FILE-001, AND-FILE-007 | LT-020, LT-025 | MAP-004, MAP-007 | error mapper | READY |
| BEH-026 | Behavior | Android login URL return. | AND-FILE-001 | LT-018, LT-021, LT-025 | MAP-004, MAP-006 | route classifier/session | READY |
| BEH-027 | Behavior | Android visibility/progress finish. | AND-FILE-001 | LT-014, LT-021, LT-029 | MAP-001, MAP-015 | WebViewScreen state | READY |
| BEH-028 | Behavior | Android toolbar logout/close. | AND-FILE-001, AND-FILE-008 | LT-022 | MAP-001, MAP-006 | WebViewScreen toolbar | READY |
| BEH-029 | Behavior | Android pause/resume guard. | AND-FILE-001 | LT-023 | MAP-001, MAP-006, MAP-016 | session guard | READY |
| BEH-030 | Behavior | Android back no-op/destroy cleanup. | AND-FILE-001 | LT-023 | MAP-001, MAP-022 | WebViewScreen BackHandler | READY |
| BEH-031 | Behavior | Android scanner return URL. | AND-FILE-004 | LT-024 | MAP-003, MAP-005 | BarcodeScannerScreen | READY |
| STATE-001 | State | iOS Login success to wrapper URL. | IOS-FILE-003 | LT-001 | MAP-014 | route params | READY |
| STATE-002 | State | iOS wrapper to embedded WebView. | IOS-FILE-002 | LT-002 | MAP-014 | WebViewScreen | READY |
| STATE-003 | State | iOS loading true. | IOS-FILE-001 | LT-005 | MAP-015 | loading state | READY |
| STATE-004 | State | iOS loading false. | IOS-FILE-001 | LT-005 | MAP-015 | loading state | READY |
| STATE-005 | State | iOS WebView exits on auth loss. | IOS-FILE-001 | LT-007, LT-008 | MAP-016 | session guard | READY |
| STATE-006 | State | Android empty URL to Login. | AND-FILE-001 | LT-012 | MAP-014 | route fallback | READY |
| STATE-007 | State | Android initialized load. | AND-FILE-001 | LT-013 | MAP-014, MAP-015 | WebViewScreen | READY |
| STATE-008 | State | Android page start loaded false. | AND-FILE-001 | LT-014 | MAP-015 | loading state | READY |
| STATE-009 | State | Android finish loaded true/visibility. | AND-FILE-001 | LT-014, LT-021 | MAP-015 | loading/visibility | READY |
| STATE-010 | State | Android WebView exits on auth/error/logout. | AND-FILE-001 | LT-018, LT-020, LT-022, LT-023 | MAP-016 | session guard | READY |
| STOR-001 | Storage | iOS valid-login flag. | IOS-FILE-001, IOS-FILE-006 | LT-007, LT-008 | MAP-008 | auth storage | READY |
| STOR-002 | Storage | iOS URL builder preferences. | IOS-FILE-007 | LT-001 | MAP-009 | login URL provider | READY |
| STOR-003 | Storage | Android valid-login flag. | AND-FILE-001, AND-FILE-006 | LT-018, LT-022, LT-023 | MAP-008 | auth storage | READY |
| STOR-004 | Storage | Android URL/protocol preferences. | AND-FILE-001, AND-FILE-006 | LT-012, LT-015, LT-019 | MAP-009 | login/settings storage | READY |
| STOR-005 | Storage | WebView URL route payload. | IOS-FILE-002, AND-FILE-005 | LT-001, LT-011, LT-030 | MAP-010 | route params | READY |
| API-001 | API | iOS WKWebView load. | IOS-FILE-001 | LT-003 | MAP-011 | WebView source | READY |
| API-002 | API | iOS form-action JS. | IOS-FILE-001 | LT-007 | MAP-012 | session-expiry handler | READY |
| API-003 | API | Android WebView load. | AND-FILE-001 | LT-013 | MAP-011 | WebView source | READY |
| API-004 | API | Android form-action JS. | AND-FILE-001 | LT-018 | MAP-012 | session-expiry handler | READY |
| API-005 | API | No WebView-owned REST client. | IOS-FILE-003, AND-FILE-003 | LT-001, LT-011 | MAP-013 | dependency boundary | READY |
| NAV-001 | Navigation | iOS Login to wrapper. | IOS-FILE-003 | LT-001 | MAP-002 | AppNavigator | READY |
| NAV-002 | Navigation | iOS wrapper to WebView. | IOS-FILE-002 | LT-002 | MAP-001 | WebViewScreen | READY |
| NAV-003 | Navigation | iOS WebView to scanner. | IOS-FILE-001, IOS-FILE-005 | LT-006 | MAP-004, MAP-005 | BarcodeScannerScreen | READY |
| NAV-004 | Navigation | iOS WebView to Login/dismiss. | IOS-FILE-001 | LT-007, LT-008 | MAP-006 | session guard | READY |
| NAV-005 | Navigation | iOS scanner to wrapper. | IOS-FILE-004 | LT-010 | MAP-003, MAP-005 | BarcodeScannerScreen | READY |
| NAV-006 | Navigation | Android Login to WebView. | AND-FILE-003 | LT-011 | MAP-002 | AppNavigator | READY |
| NAV-007 | Navigation | Android WebView to Login. | AND-FILE-001 | LT-012, LT-017, LT-018, LT-020 | MAP-006 | session/error handler | READY |
| NAV-008 | Navigation | Android WebView to scanner. | AND-FILE-001 | LT-019 | MAP-004, MAP-005 | BarcodeScannerScreen | READY |
| NAV-009 | Navigation | Android scanner to WebView/Login. | AND-FILE-004 | LT-024 | MAP-003, MAP-005 | BarcodeScannerScreen | READY |
| NAV-010 | Navigation | Android toolbar close/logout. | AND-FILE-001 | LT-022 | MAP-001, MAP-006 | WebViewScreen | READY |
| ERRPATH-001 | Error | iOS empty URL. | IOS-FILE-001 | LT-004 | MAP-017 | WebViewScreen fallback decision | READY |
| ERRPATH-002 | Error | iOS failure no dialog. | IOS-FILE-001 | LT-005, LT-026 | MAP-019 | error decision | READY |
| ERRPATH-003 | Error | iOS login form. | IOS-FILE-001 | LT-007 | MAP-006, MAP-012 | session guard | READY |
| ERRPATH-004 | Error | Android empty URL. | AND-FILE-001 | LT-012 | MAP-017 | route fallback | READY |
| ERRPATH-005 | Error | Android HTTP error. | AND-FILE-001 | LT-017 | MAP-007, MAP-019 | error mapper | READY |
| ERRPATH-006 | Error | Android resource error. | AND-FILE-001, AND-FILE-007 | LT-017, LT-027 | MAP-007, MAP-019 | error mapper | READY |
| ERRPATH-007 | Error | Android error URL. | AND-FILE-001 | LT-020 | MAP-004, MAP-007 | route classifier/error mapper | READY |
| ERRPATH-008 | Error | Android camera permission denied. | AND-FILE-001 | LT-019, LT-027 | MAP-005, MAP-020 | permission fallback | READY |
| ERRPATH-009 | Error | Android SSL normal handling. | AND-FILE-001 | LT-015 | MAP-021 | SSL decision | READY |
| DEP-001 | Dependency | iOS WebKit. | IOS-FILE-001 | LT-003, LT-005 | MAP-023 | react-native-webview | READY |
| DEP-002 | Dependency | iOS MBProgressHUD. | IOS-FILE-001 | LT-005 | MAP-001 | loading UI | READY |
| DEP-003 | Dependency | iOS storyboard/segues. | IOS-FILE-002, IOS-FILE-005 | LT-001, LT-002, LT-006 | MAP-024 | React Navigation | READY |
| DEP-004 | Dependency | Android WebView APIs. | AND-FILE-001 | LT-013, LT-017 | MAP-023 | react-native-webview | READY |
| DEP-005 | Dependency | Android Toolbar/Menu. | AND-FILE-001, AND-FILE-008 | LT-022 | MAP-001 | WebView toolbar | READY |
| DEP-006 | Dependency | Android camera/scanner. | AND-FILE-001 | LT-019 | MAP-026 | permission/scanner dependency | READY |
| DEP-007 | Dependency | RN WebView dependency. | RN-FILE-001 | LT-025 | MAP-023 | WebViewScreen | READY |
| DEP-008 | Dependency | RN navigation/Jest. | RN-FILE-001 | LT-025 | MAP-024, MAP-025 | navigation/tests | READY |
| UI-001 | UI | iOS WebView layout. | IOS-FILE-005 | LT-003 | MAP-001 | WebViewScreen layout | READY |
| UI-002 | UI | iOS loading UI. | IOS-FILE-001 | LT-005 | MAP-015 | loading UI | READY |
| UI-003 | UI | iOS toolbar menu. | IOS-FILE-001 | LT-008 | MAP-001 | toolbar/menu | READY |
| UI-004 | UI | Android WebView layout. | AND-FILE-002 | LT-013 | MAP-001 | WebViewScreen layout | READY |
| UI-005 | UI | Android progress/visibility. | AND-FILE-001 | LT-014, LT-021 | MAP-015 | loading/visibility | READY |
| UI-006 | UI | Android dialogs/toolbar. | AND-FILE-001, AND-FILE-008, AND-FILE-010 | LT-017, LT-022 | MAP-001, MAP-007 | dialogs/toolbar | READY |
| SEC-001 | Security | Sensitive WebView URLs. | IOS-FILE-003, AND-FILE-003 | LT-030 | MAP-010 | route params | READY |
| SEC-002 | Security | Valid-login WebView access. | IOS-FILE-001, AND-FILE-001 | LT-007, LT-018, LT-023 | MAP-006, MAP-008, MAP-016 | session guard | READY |
| SEC-003 | Security | Android SSL bypass. | AND-FILE-001 | LT-015 | MAP-021 | SSL decision | READY |
| SEC-004 | Security | Android camera permission. | AND-FILE-001 | LT-019, LT-027 | MAP-020, MAP-026 | permission guard | READY |
| SEC-005 | Security | Android WebView settings. | AND-FILE-001 | LT-013 | MAP-018 | WebView props | READY |

## Coverage Gaps

| Source ID | Gap | Blocks Phase | Required Action |
|---|---|---|---|
| DEP-001, DEP-004 | Native WebView rendering needs simulator/device runtime. | No | Unit-test WebView props/callbacks and run smoke tests later. |
| DEP-006 | Camera/scanner runtime requires permission API and scanner dependency. | No | Mock permission and scanner return until scanner feature is implemented. |
| MAP-021 | RN support for HTTPS-without-validation is not established in Phase 1. | No | Phase 3 must decide support or block protocol mode explicitly. |
| API-005 | WebView feature has no direct REST client. | No | Keep login/settings/session remote calls in adjacent feature contracts. |

## Review Checklist

- [x] Every `EP-*` has at least one `MAP-*`.
- [x] Every `BEH-*` has at least one `LT-*` or justified `N/A`.
- [x] Every `STOR-*`, `API-*`, `STATE-*`, `ERRPATH-*` is mapped or excluded with reason.
- [x] No source ID is orphaned.
