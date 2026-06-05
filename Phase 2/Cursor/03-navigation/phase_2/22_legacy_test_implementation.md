# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/navigation/codex/20260602-1705-codex-navigation/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Composer |
| Last updated | 2026-06-04T19:00:00+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-017, LT-018, LT-019, LT-020, LT-022, LT-023, LT-024, LT-025, LT-026 | Android | `android-mobilebrowser/app/src/test/.../NavigationRouteLogicTest.java` | JUnit4 | URL-Klassifikation, Barcode-Konvertierung, ScanResult, Auth-Guard |
| LT-011, LT-021 | Android | `android-mobilebrowser/app/src/test/.../NavigationLoginGuardTest.java` | Robolectric + JUnit4 | Login/PIN/Settings-Guard |
| LT-009, LT-016, LT-024 | Android | `android-mobilebrowser/app/src/test/.../NavigationQrScannerRouteTest.java` | Robolectric + JUnit4 | QR-Validierung, Normalisierung, Duplikat |
| LT-022 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/NavigationRouteConstantsTests.swift` | XCTest | Quellen erstellt, Target fehlt |
| LT-001, LT-002 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/NavigationLoginGuardTests.swift` | XCTest | Segue-Guard-Logik |
| LT-007, LT-008, LT-023 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/NavigationUrlClassifierTests.swift` | XCTest | Barcode/Login-URL-Klassifikation |
| LT-010, LT-026 | iOS | `ios-mobilebrowser/MobileBrowserV2Tests/NavigationScanResultTests.swift` | XCTest | ScanResult-URL + Auth-Guard |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-001..LT-010 (UI/Segue) | UIKit Storyboard/Segue | SKIP (Pure-Logic-Extraktion) | DEP-001: Segue-Präsentation erfordert UIKit-Runtime |
| LT-003, LT-004, LT-005, LT-006 (WebView) | WKWebView / Alamofire | SKIP | DEP-002: WebView-Rendering Integration |
| LT-012..LT-014, LT-015 (Activity) | startActivity / Intent | SKIP | DEP-004: Activity-Navigation außerhalb Pure-Unit |
| LT-013 | LicenseActivity Popup | SKIP | Android-only UI-Menü |
| LT-018, LT-027 | Camera Permission | Logik-Test ohne Permission-API | ERRPATH-006: Permission-Branch dokumentiert |
| LT-009 (iOS QR UI) | AVFoundation Scanner | Pure QR-Validierung auf Android; iOS SKIP UI | DEP-003 |
| Android Preferences | `StorageConfigTestSupport` | Reflection | Statisches sharedpreferences-Feld |
| iOS all | — | Keine Ausführung | ERR-P2-01: XCTest-Target fehlt |

## Production Changes

Keine fachlichen Produktionsänderungen. Route-Logik wird in Tests als extrahierte Hilfsmethoden gespiegelt (kein Refactoring der Legacy-Klassen).
