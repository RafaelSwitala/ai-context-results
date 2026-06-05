# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:30:00+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-025, LT-016, LT-019, LT-020, LT-021, LT-026, LT-029 | Android | `android-mobilebrowser/app/src/test/.../WebviewUrlClassifierTest.java` | JUnit4 | URL-Klassifikation, Override, Barcode-Konvertierung, Error-Extraktion |
| LT-012, LT-013, LT-014, LT-015, LT-017, LT-023, LT-027, LT-028 | Android | `android-mobilebrowser/app/src/test/.../WebviewActivityLogicTest.java` | Robolectric + JUnit4 | URL-Quelle, Headers, SSL, Lifecycle, Error-Duplikat |
| LT-010, LT-011, LT-024 | Android | `android-mobilebrowser/app/src/test/.../WebviewScanResultTest.java` | JUnit4 | ScanResult-URL, App.URL Key, Auth-Guard |
| LT-006, LT-007, LT-025, LT-026 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/WebviewUrlClassifierTests.swift` | XCTest | Quellen erstellt, Target fehlt |
| LT-003, LT-004, LT-005, LT-009 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/WebviewLoadLogicTests.swift` | XCTest | Load/Loading-State-Logik |
| LT-010 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/WebviewScanResultTests.swift` | XCTest | ScanResult-URL-Builder |
| LT-005, LT-008, LT-030 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/WebviewSessionGuardTests.swift` | XCTest | Foreground-Guard, Logout, URL-Sanitizer |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-001, LT-002, LT-003 (WKWebView load) | WKWebView / Storyboard | SKIP (Pure-Logic) | DEP-001, DEP-004 |
| LT-005, LT-009 (HUD/UI) | MBProgressHUD / UIKit | Loading-State-Logik isoliert | DEP-002 |
| LT-008, LT-022 (Toolbar) | UIAlertController / Toolbar menu | SKIP UI | BEH-011, BEH-028 |
| LT-011, LT-012 (Intent) | startActivity | URL-Auflösung isoliert | DEP-004 |
| LT-017 (HTTP error dialog) | AlertDialog / MiscUtils | Error-Duplikat-Guard isoliert | Activity-Dialog SKIP |
| LT-019, LT-027 (Permission) | Camera Permission API | Barcode-Konvertierung ohne Permission-Call | DEP-006, ERRPATH-008 |
| LT-018 (JS form) | evaluateJavascript | isLoginFormAction isoliert | WebView JS Runtime SKIP |
| Android Preferences | `StorageConfigTestSupport` | Reflection | Statisches sharedpreferences |
| iOS all | — | Keine Ausführung | ERR-P2-01 |

## Production Changes

Keine fachlichen Produktionsänderungen. Route-/Load-Logik in Tests als extrahierte Hilfsmethoden gespiegelt.
