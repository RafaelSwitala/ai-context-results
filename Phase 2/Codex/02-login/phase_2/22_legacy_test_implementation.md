# Legacy Test Implementation

| Field | Value |
|---|---|
| Feature | login |
| Phase | P2 |
| Artifact ID | P2-A22 |
| Artifact Path | artifacts/login/codex/20260602-1703-codex-login/phase_2/22_legacy_test_implementation.md |
| Status | COMPLETE |
| Created by | Codex / GPT-5 |
| Last updated | 2026-06-04T17:39:04+02:00 |

## Changed Test Files

| Test ID | Platform | Path | Framework | Notes |
|---|---|---|---|---|
| LT-002; LT-004; LT-005; LT-006; LT-007 | Android | android-mobilebrowser/app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/LoginFeatureTest.java | JUnit4 + Robolectric | Adds 6 executable activity/preferences tests for validation, successful login persistence/navigation, settings/PIN routing, PIN match/mismatch and logout flag reset. |
| LT-001; LT-003; LT-005; LT-006; LT-007 | iOS | ios-mobilebrowser/MobileBrowserV2Tests/LoginFeatureTests.swift | XCTest | Adds deterministic tests for required fields, invalid settings, URL/persistence seams, PIN match/mismatch and logout flag reset. Local execution is blocked by missing iOS toolchain/test target. |
| LT-002; LT-004; LT-005; LT-006; LT-007 | Android | android-mobilebrowser/app/build.gradle | Gradle test config | Adds `testOptions.unitTests.includeAndroidResources=true`; required by Robolectric activity tests to load manifest-backed resources and AppCompat themes (`ERR-P2-01`). |

## Test Doubles And Mocks

| Test ID | Mocked Dependency | Strategy | Reason |
|---|---|---|---|
| LT-002; LT-004; LT-005; LT-006; LT-007 | Android `SharedPreferences` | Test-specific preferences file injected into `App.getInstance().SharedPreferences` and `PreferencesUtils.sharedpreferences` via reflection | Isolates storage side effects and makes state assertions deterministic; source IDs STOR-006..STOR-010. |
| LT-002; LT-004; LT-005 | Android activity navigation | Robolectric `shadowOf(activity).getNextStartedActivity()` | Asserts navigation without launching real Android activities; source IDs NAV-002 and NAV-004. |
| LT-002 | Android alert dialog | Robolectric `ShadowAlertDialog` | Asserts generic error dialog without UI instrumentation; source ID ERRPATH-004. |
| LT-006 | Android PIN UI | Robolectric button clicks and status `TextView` assertion | Exercises actual `PinActivity` button handlers in unit scope; source IDs BEH-023, BEH-024, UI-004. |
| LT-001; LT-005 | iOS alert presentation | `RecordingLoginViewController` overrides `present` | Captures error alerts without a running UIKit presentation stack; source IDs ERRPATH-001 and ERRPATH-002. |
| LT-006 | iOS segue | `RecordingPinCodeViewController` overrides `performSegue` | Captures successful PIN navigation without storyboard execution; source ID NAV-005. |

## Implementation Decisions

| Decision ID | Decision | Reason | Source | Alternatives |
|---|---|---|---|---|
| DEC-P2-LOGIN-001 | Android activity tests use Robolectric instead of instrumentation tests | Phase 2 scope is unit tests; Robolectric is already present in the project | TEST-001; TEST-002; P1-A15 | Android instrumentation tests would require device/emulator and exceed unit-test scope. |
| DEC-P2-LOGIN-002 | iOS success flow is split into URL/persistence seams instead of real Alamofire request | `AF.request` is static/external and no iOS test runtime is available locally | TEST-001; P1-A13 LT-003; DEP-001 | Full network flow requires integration testing or dependency injection not present in legacy code. |
| DEC-P2-LOGIN-003 | Minimal Android test config was changed, no production behavior was modified | Activity tests could not load AppCompat resources without `includeAndroidResources` | ERR-P2-01; TEST-002 | Keep only utility tests; rejected because Phase 2 requires login behavior coverage. |
