# Legacy Test Results

| Field | Value |
|---|---|
| Feature | webview |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/webview/codex/20260602-1710-codex-webview/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:30:00+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest --tests "...WebviewUrlClassifierTest" --tests "...WebviewActivityLogicTest" --tests "...WebviewScanResultTest"` | SUCCESS (27/27) | ~8s | Run-ID 20260602-1710, Windows, JDK 17 |
| iOS | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | NOT_RUN | — | Kein XCTest-Target; Windows (ERR-P2-01) |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | — | SKIP | — | WEBVIEW segue + UrlUtils Integration UI | BEH-001 |
| LT-002 | iOS | — | SKIP | — | Storyboard child embedding | BEH-002 |
| LT-003 | iOS | WebviewLoadLogicTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-004 | iOS | WebviewLoadLogicTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-005 | iOS | WebviewLoadLogicTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-005 | iOS | WebviewSessionGuardTests.swift | NOT_RUN | — | Foreground-Guard Logik | implementiert |
| LT-006 | iOS | WebviewUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-007 | iOS | WebviewUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-008 | iOS | WebviewSessionGuardTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-008 | iOS | — | SKIP | — | Logout Action-Sheet UI | BEH-011 |
| LT-009 | iOS | WebviewLoadLogicTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-010 | iOS | WebviewScanResultTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-010 | Android | WebviewScanResultTest.java | PASS | <1s | `buildScanResultUrl_appendsCode` | |
| LT-011 | Android | WebviewScanResultTest.java | PASS | <1s | `urlIntentExtraKey_matchesProductionConstant` | partial |
| LT-011 | Android | — | SKIP | — | LoginActivity Intent-Start | NAV-006 |
| LT-012 | Android | WebviewActivityLogicTest.java | PASS | <1s | `resolveWebViewUrl_*`, `emptyStartsLogin` | partial |
| LT-013 | Android | WebviewActivityLogicTest.java | PASS | <1s | `buildNoCacheHeaders_*`, `webViewUserAgent_*` | partial |
| LT-014 | Android | WebviewActivityLogicTest.java | PASS | <1s | `onPageStarted/Finished_setsLoaded*` | partial |
| LT-015 | Android | WebviewActivityLogicTest.java | PASS | <1s | `shouldProceedOnSslError_*` | |
| LT-016 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `shouldOverrideUrlLoading_suppressesBarcodeAndLogin` | |
| LT-017 | Android | WebviewActivityLogicTest.java | PASS | <1s | `shouldShowErrorDialog_onlyOnce` | partial |
| LT-017 | Android | — | SKIP | — | HTTP error dialog + LoginActivity | BEH-021 |
| LT-018 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `isLoginFormAction_detectsLoginAspx` | partial |
| LT-018 | Android | — | SKIP | — | evaluateJavascript + Activity finish | API-004 |
| LT-019 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `convertBarcodeToReturnUrl_*` | partial |
| LT-019 | Android | — | SKIP | — | Camera permission dialog | ERRPATH-008 |
| LT-020 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `classifyUrl_errorQuery*`, `extractErrorCode*` | partial |
| LT-021 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `shouldHideWebView_*`, `classifyUrl_aboutBlank*` | |
| LT-022 | Android | — | SKIP | — | Toolbar logout/close UI | BEH-028 |
| LT-023 | Android | WebviewActivityLogicTest.java | PASS | <1s | `shouldFinishOnResume*`, `onBackPressed_doesNotNavigate` | partial |
| LT-024 | Android | WebviewScanResultTest.java | PASS | <1s | `buildScanResultUrl_*` | |
| LT-025 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `classifyUrl_*` (alle Outcomes) | |
| LT-025 | iOS | WebviewUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-026 | iOS | WebviewUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-026 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `convertBarcodeToReturnUrl_requiresSchemeSeparator` | |
| LT-027 | Android | WebviewActivityLogicTest.java | PASS | <1s | `shouldShowErrorDialog_onlyOnce` | |
| LT-028 | Android | WebviewActivityLogicTest.java | PASS | <1s | `timeoutDialog_isInactive` | |
| LT-029 | Android | WebviewUrlClassifierTest.java | PASS | <1s | `classifyUrl_aboutBlankIsHidden` | |
| LT-030 | iOS | WebviewSessionGuardTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A | N/A | N/A | N/A | JaCoCo nicht konfiguriert | — |
| iOS | N/A | N/A | N/A | N/A | Tests nicht ausgeführt | — |

**Manuell abgedeckte Produktionslogik (Android):** WebviewActivity URL-Auflösung, no-cache Headers, SSL-Bypass-Gate, URL-Klassifikation (barcode/login/error/hidden/normal), shouldOverrideUrlLoading, Barcode-Return-URL, Error-Code-Extraktion, loaded-State, Error-Duplikat-Guard, Lifecycle-Guards, ScanResult-URL, App.URL Konstante.

**Schätzung:** WebView URL-Callback-Logik ~70 % der testbaren Pure-Logic; WKWebView/WebView-Rendering, Dialoge und Toolbar <30 %.
