# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | navigation |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/navigation/claude/20260602-003/phase_2/22_legacy_test_implementation.md |
| Status | READY_FOR_REVIEW |
| Created by | GitHub Copilot |
| Last updated | 2026-06-04 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-001, LT-002, LT-011, LT-015, LT-021 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginNavigationTest.java | JUnit 4 + Mockito | Tests Login -> PIN/Settings routing decisions |
| LT-003, LT-012, LT-017 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/WebViewNavigationTest.java | JUnit 4 + Mockito | Tests WebView URL loading and route branching |
| LT-007, LT-018 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/ScannerNavigationTest.java | JUnit 4 + Mockito | Tests barcode/QR scanner route handling |
| LT-006, LT-019, LT-026 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/AuthGuardTest.java | JUnit 4 + Mockito | Tests logout and invalid-auth navigation |
| LT-013, LT-014 | Android | app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginUITest.java | JUnit 4 + Mockito | Tests License route and back behavior |
| LT-001-LT-010, LT-023 | iOS | MobileBrowserV2/MobileBrowserV2Tests/NavigationGuardTest.swift | XCTest | Tests iOS Login/PIN/Settings routing (Phase 2 setup limitation documented) |
| LT-003-LT-008, LT-010 | iOS | MobileBrowserV2/MobileBrowserV2Tests/WebViewNavigationTest.swift | XCTest | Tests iOS WebView segue and auth handling (Phase 2 setup limitation documented) |
| LT-009, LT-026 | iOS | MobileBrowserV2/MobileBrowserV2Tests/ScannerNavigationTest.swift | XCTest | Tests iOS QR/Article scanner return routes (Phase 2 setup limitation documented) |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-001, LT-011 | SharedPreferences (storage) | Mock SharedPreferences for PIN/settings presence check | Avoid disk I/O during tests |
| LT-001, LT-002, LT-011, LT-015, LT-021 | Intent.startActivity() | Mock ActivityManager or use Robolectric shadow | Verify route intent without launching actual activity |
| LT-003, LT-012, LT-017 | WebViewClient callbacks | Mock onPageFinished, onPageStarted | Test URL decision logic without real WebView rendering |
| LT-006, LT-019 | PreferencesUtils.setValidLogin(false) | Direct call or mock repository | Verify invalid-login returns to Login |
| LT-013 | startActivity for LicenseActivity | Mock intent firing | Verify license route is triggered |
| LT-014 | Activity.onBackPressed() | Direct call via test runner | Verify moveTaskToBack is called |
| LT-018, LT-027 | Camera permission checks | Mock ContextCompat.checkSelfPermission() | Test permission granted/denied branches |

## Build Configuration Changes

No changes to production code. Test dependencies added/verified in `app/build.gradle`:
- JUnit 4.13.2
- Mockito Core 4.8.0
- Mockito Inline 4.8.0
- Robolectric 4.x (optional, for shadow activities)

iOS: No test target exists in legacy codebase. Phase 2 recognizes this as infrastructure gap (ERR-P2-01) and documents expected test seams rather than full implementation.

## Implementation Notes

### Android

**Pre-flight recovery (ERR-P2-01):** The Android project has standard JUnit structure but requires:
1. Test utilities for mocking Intent/Activity lifecycle
2. Mockito setup for storage and permission APIs
3. Selective use of Robolectric for Activity shadowing (if integration needed)

**Tests focus on route decision logic, not UI rendering:**
- Mock storage reads for LOGIN decision branch (LT-001, LT-011)
- Mock WebViewClient.onPageFinished for URL classification (LT-007, LT-018, LT-019)
- Mock ActivityManager or use intent capturing to verify correct startActivity calls
- No real camera permission checks; use mock SecurityManager or Robolectric

### iOS

**Infrastructure limitation (ERR-P2-01):** MobileBrowserV2.xcodeproj has no test target. Phase 2 defines test seams around:
- Segue identifier assertions (compare prepare segue ID against expected constant)
- UserDefaults mock for storage decisions
- UINavigationController mock to verify navigation calls

Full test implementation blocked on adding XCTest target to Xcode project. Phase 4 (RN test migration) will provide behavior parity evidence.

## Mapping to Phase 1

Each implemented test file covers one or more LT-* test IDs from Phase 1 `P1-A13`. Test naming and grouping follows behavior categories:
- Navigation guard (Login entry logic)
- WebView route handling (URL classification)
- Scanner returns (result handling)
- Auth guards (logout, invalid-login reset)
- UI actions (License, back button)
