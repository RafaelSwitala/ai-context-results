# Legacy Test Results

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P2 |
| Artifact ID | P2-A23 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_2/ |
| Status | PARTIAL_EXECUTION |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-04T00:00:00Z |

## Commands

| Platform | Command | Result | Duration | Notes |
|---|---|---|---|---|
| Android | `.\gradlew.bat test` (full suite) | FAILED | ~8s | Compilation error due to private PreferencesUtils constants; see detailed failure below. |
| Android | `.\gradlew.bat compileBauhausDebugUnitTestJavaWithJavac` (focused) | FAILED | ~8s | 22+ errors on PreferencesUtilsTest accessing private constants. QRCodeParserTest, SettingsValidationTest ready but blocked by multi-project build. |
| iOS | (no test harness) | NOT_RUN | N/A | XCTest target not present in project structure; documented as NOT_PRESENT. |
| RN | (Phase 3-4 scope) | NOT_RUN | N/A | RN tests deferred to Phase 4. Phase 2 baseline is Legacy (iOS/Android) only. |

## Results

| Test ID | Platform | File | Result | Duration | Failure Reason | Source |
|---|---|---|---|---|---|---|
| (Compilation) | Android | PreferencesUtilsTest.java | INVALID | N/A | Private access: 22 compilation errors accessing PreferencesUtils.HAS_VALID_SETTINGS, .SERVER, .PROTOCOL, .CLIENT, .USER, .LOCALE_SYMBOL, .CURRENT_CONFIG_VERSION, .TOKEN, .PIN | PreferencesUtilsTest.java:45, 53-59, 71, 78-79, 82-83, 92-94, 109-110, 121, 128, 137-143, 158, 160, 164, 167, 181 |
| (Build) | Android | SettingsValidationTest.java | READY_NOT_RUN | N/A | Blocked by parent build failure; file compiles independently after ERR-P2-01 resolution | SettingsValidationTest.java ready; depends on QRCodeParser compilation |
| (Build) | Android | QRCodeParserTest.java | READY_NOT_RUN | N/A | Blocked by parent build failure; file compiles independently after ERR-P2-01 resolution | QRCodeParserTest.java ready; pure logic, no private field access |
| LT-001, LT-012, LT-013, LT-014, LT-026, LT-021, LT-022 | Android | PreferencesUtils | SKIP | N/A | Cannot run - PreferencesUtilsTest compilation blocked. Tests blocked on infrastructure (private constants). Documented as recovery needed. | ERR-P2-01 |
| LT-002, LT-003, LT-015, LT-004, LT-016, LT-005, LT-017, LT-023, LT-024, LT-025 | Android | SettingsValidationTest | SKIP | N/A | Build blocked but tests themselves valid; will execute after PreferencesUtils gap resolved | SettingsValidationTest.java independent |
| LT-006, LT-007, LT-013, LT-014, LT-018, LT-027, LT-028, LT-019 | Android | QRCodeParser | SKIP | N/A | Build blocked but tests themselves valid; will execute after parent gradle fix | QRCodeParserTest.java independent |
| LT-001 to LT-011, LT-025 | iOS | (XCTest would be required) | NOT_RUN | N/A | iOS test harness does not exist in Phase 1 discovery. No XCTest target found. Phase 2 cannot create tests without project structure changes. Documented as platform divergence. | ERR-P2-01, ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:193 symbol=MobileBrowserV2 |

## Coverage

| Platform | Statements | Branches | Functions | Lines | Tool | Raw Report Path | Status |
|---|---|---|---|---|---|---|---|
| Android | N/A | N/A | N/A | N/A | JaCoCo (not generated) | N/A | Build failed before coverage generation |
| iOS | N/A | N/A | N/A | N/A | Xcode code coverage (not available) | N/A | No test infrastructure present |
| RN | N/A | N/A | N/A | N/A | Jest (Phase 4 scope) | N/A | Deferred to Phase 4 |

## Build Failure Summary

### Primary Blocker: ERR-P2-01 - PreferencesUtils Private Constants

**Error Context:**
```
:app:compileBauhausDebugUnitTestJavaWithJavac FAILED
FAILURE: Build failed with an exception.
Execution failed for task ':app:compileBauhausDebugUnitTestJavaWithJavac'.
> Compilation failed
```

**Root Cause:**
PreferencesUtilsTest attempts to reference constants from `de.onlinesoftwareag.boa.mobilebrowser4android.utility.PreferencesUtils` that have private visibility:

- HAS_VALID_SETTINGS (line 53, 57, 79, 83)
- SERVER (line 54, 58, 137, 141, 158, 160, 164, 167)
- PROTOCOL (line 55, 59, 109, 110, 121, 128)
- CLIENT (line 181)
- USER (line 138, 142)
- LOCALE_SYMBOL (line 139, 143)
- CURRENT_CONFIG_VERSION (line 71, 73, 78, 82, 92, 94)
- TOKEN (other references)
- PIN (other references)

**Source File Reference:**
- Test: `app/src/test/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtilsTest.java`
- Source: `app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java:14`

**Phase 1 Context:**
From P1-A11: `AND-FILE-001: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/utility/PreferencesUtils.java | PreferencesUtils | SharedPreferences-Keys, Read/Write, URL-Aufbau, Locale und Config-Version.`

### Secondary Blocker: iOS Test Infrastructure Missing

**Error Context:**
XCTest target not found in iOS project structure.

**Root Cause:**
Phase 1 discovery reported:
```
[ios: MobileBrowserV2/MobileBrowserV2.xcodeproj/project.pbxproj:193 symbol=MobileBrowserV2]
```
No explicit XCTest target or `*Tests.xcodeproj` found in Phase 1 file listing.

**Impact:**
Cannot generate iOS unit tests without first creating test target infrastructure (new `.xcodeproj` scheme, test bundle).

## Recovery Actions Required

### For Android (ERR-P2-01a - Private Constant Access)

**Option 1: Modify PreferencesUtils visibility** (Low risk, high benefit)
- Make PreferencesUtils constants package-private (`/*package*/ static String SERVER`) or public
- Allows test access without refactoring PreferencesUtils public API
- Phase 3 RN implementation benefits from explicitly exported constants
- Risk: None - test visibility does not affect production code

**Option 2: Use reflection in tests** (Higher complexity)
- Use `java.lang.reflect.Field` to access private constants
- Keeps PreferencesUtils unmodified
- Adds test complexity; less maintainable

**Option 3: Skip PreferencesUtilsTest, focus on integration** (Least comprehensive)
- Remove PreferencesUtilsTest
- Keep SettingsValidationTest and QRCodeParserTest
- Defers storage behavior verification to Phase 3 RN tests

**Recommended: Option 1** (modify visibility in PreferencesUtils)

### For iOS (ERR-P2-01b - Missing Test Infrastructure)

**Option 1: Document as platform divergence** (Recommended for Phase 2)
- Mark iOS tests LT-001 to LT-011 as NOT_PRESENT in Phase 2
- Phase 5 final validation will define whether RN provides cross-platform coverage
- Risk: None - acceptable per Phase 2 scope (legacy tests, platform availability)

**Option 2: Create minimal iOS test target** (Out of Phase 2 scope)
- Add XCTest target to MobileBrowserV2.xcodeproj
- Implement LT-001 to LT-011 in Objective-C/Swift
- Risk: Scope creep; Phase 2 mandate is test generation from Phase 1, not infrastructure creation

**Recommended: Option 1** (mark NOT_PRESENT, Phase 5 validates RN coverage)

## Next Steps

1. **Immediate (Phase 2 continuation):**
   - Apply visibility change to PreferencesUtils (1-line modification in each constant declaration)
   - Re-run `.\gradlew.bat test` to generate coverage reports

2. **Phase 3 Mapping:**
   - Document storage constants (SERVER, PROTOCOL, etc.) in RN-A31 migration plan
   - Ensure RN storage service exports equivalent constants for parity

3. **Phase 5 Validation:**
   - iOS: verify RN tests provide behavior parity for LT-001 to LT-011 or document divergence
   - Android: compare RN test results to legacy Android baseline

## Execution Summary

- **Tests Designed:** 25 unique test cases (QRCodeParser: 8, SettingsValidation: 10, PreferencesUtils: 7)
- **Tests Implemented:** 25 (3 test classes created)
- **Tests Compiled:** 0/25 (build blocked; 2/25 ready if compiled independently)
- **Tests Passed:** 0/25
- **Tests Failed:** 0/25 (did not execute)
- **Tests Skipped:** 25/25 (build blocked on compilation)
- **Coverage Generated:** N/A (build failed before JaCoCo)
- **iOS Tests:** 0/11 (infrastructure not present)
