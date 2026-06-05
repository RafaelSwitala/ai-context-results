# Legacy Test Results

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_2/23_legacy_test_results.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:00:00+02:00 |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat testMobilebrowser_defaultDebugUnitTest --tests "...NavigationRouteLogicTest" --tests "...NavigationLoginGuardTest" --tests "...NavigationQrScannerRouteTest"` | SUCCESS (24/24) | ~5s | Run-ID 20260602-1705, Windows, JDK 17 |
| iOS | `xcodebuild test -project MobileBrowserV2/MobileBrowserV2.xcodeproj -scheme MobileBrowserV2` | NOT_RUN | — | Kein XCTest-Target; Windows-Host ohne Xcode (ERR-P2-01) |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| LT-001 | iOS | NavigationLoginGuardTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-001 | iOS | — | SKIP | — | Segue-Präsentation UI | DEP-001 |
| LT-002 | iOS | NavigationLoginGuardTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-002 | iOS | — | SKIP | — | PIN-UI + unwind | DEP-001 |
| LT-003 | iOS | — | SKIP | — | WEBVIEW-Segue + HTTP | BEH-003 |
| LT-004 | iOS | — | SKIP | — | Wrapper child embedding UI | BEH-004 |
| LT-005 | iOS | — | SKIP | — | Foreground + WKWebView reload | BEH-007 |
| LT-006 | iOS | — | SKIP | — | Logout Action-Sheet UI | BEH-006 |
| LT-007 | iOS | NavigationUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-008 | iOS | NavigationUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-009 | iOS | — | SKIP | — | QR Scanner UI | DEP-003 |
| LT-009 | Android | NavigationQrScannerRouteTest.java | PASS | <1s | `isUrlValid_acceptsMobileBrowserQr`, `rejectsMissingMobileBrowserMarker` | partial |
| LT-010 | iOS | NavigationScanResultTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-011 | Android | NavigationLoginGuardTest.java | PASS | <1s | `loginGuard_routesToPinWhenPinStored`, `routesToSettingsWhenNoPin` | partial |
| LT-012 | Android | — | SKIP | — | WebviewActivity Intent-Start | NAV-013 |
| LT-013 | Android | — | SKIP | — | License popup UI | BEH-015 |
| LT-014 | Android | — | SKIP | — | moveTaskToBack Activity | BEH-016 |
| LT-015 | Android | — | SKIP | — | SettingsActivity handlers | BEH-017 |
| LT-016 | Android | NavigationQrScannerRouteTest.java | PASS | <1s | QR normalize + valid/invalid | partial |
| LT-016 | Android | — | SKIP | — | RESULT_CANCELED Activity | BEH-019 |
| LT-017 | Android | NavigationRouteLogicTest.java | PASS | <1s | `resolveWebViewUrl_*`, `emptyRoutesToLogin` | partial |
| LT-018 | Android | NavigationRouteLogicTest.java | PASS | <1s | `convertBarcodeToReturnUrl_*` | partial (ohne Permission) |
| LT-018 | Android | — | SKIP | — | Camera permission dialog | ERRPATH-006 |
| LT-019 | Android | NavigationRouteLogicTest.java | PASS | <1s | `isLoginUrl`, `isServerErrorUrl`, `shouldHideWebView` | partial |
| LT-019 | Android | — | SKIP | — | Activity finish/start | NAV-015 |
| LT-020 | Android | NavigationRouteLogicTest.java | PASS | <1s | `buildScanResultUrl`, `requiresAuthGuard` | partial |
| LT-020 | Android | — | SKIP | — | BarcodeScannerActivity Intent | NAV-017 |
| LT-021 | Android | NavigationLoginGuardTest.java | PASS | <1s | `pinSuccess_matchesStoredPin`, `pinExit_doesNotOpenSettings` | partial |
| LT-022 | Android | NavigationRouteLogicTest.java | PASS | <1s | `routeConstants_matchProductionValues` | |
| LT-022 | iOS | NavigationRouteConstantsTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-023 | iOS | NavigationUrlClassifierTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-023 | Android | NavigationRouteLogicTest.java | PASS | <1s | `convertBarcodeToReturnUrl_requiresSchemeSeparator` | |
| LT-024 | Android | NavigationRouteLogicTest.java | PASS | <1s | `shouldIgnoreDuplicateScan_sameCodeTwice` | |
| LT-025 | Android | NavigationRouteLogicTest.java | PASS | <1s | `webViewBackPress_noNavigationWhenAuthenticated` | |
| LT-026 | iOS | NavigationScanResultTests.swift | NOT_RUN | — | XCTest-Target fehlt | implementiert |
| LT-026 | Android | NavigationRouteLogicTest.java | PASS | <1s | `requiresAuthGuard_whenValidLoginFalse` | |
| LT-027 | Android | — | SKIP | — | Permission dialog + loadUrl | ERRPATH-006 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path |
|---|---|---|---|---|---|---|
| Android | N/A | N/A | N/A | N/A | JaCoCo nicht konfiguriert | — |
| iOS | N/A | N/A | N/A | N/A | Tests nicht ausgeführt | — |

**Manuell abgedeckte Produktionslogik (Android):** Route-Konstanten (`App`), Barcode-URL-Konvertierung, WebView-URL-Klassifikation (login/error/hide), WebView-Start-URL-Auflösung, ScanResult-URL-Aufbau, Duplikat-Scan-Guard, Auth-Guard, Login/PIN/Settings-Guard, QR-Validierung.

**Schätzung:** Route-Entscheidungslogik und Payload-Handling ~65 % der testbaren Pure-Logic; Activity/Segue/WebView-UI <35 %.
