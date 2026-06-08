# RN Test Readiness (cross-feature)

| Field | Value |
|---|---|
| Feature | all |
| Phase | P4 |
| Artifact ID | P4-A44 |
| Status | READY_FOR_REVIEW |
| Last updated | 2026-06-08T19:00:00+02:00 |

## Verdict

All migratable pure-logic tests from Android `mobilebrowser4android` and iOS `MobileBrowserV2Tests` are implemented as **113 Jest tests** in `rn-e-mobilebrowser/src/__tests__/`.

## Configuration

| Item | Value |
|---|---|
| Runner | Jest 30, testEnvironment `node` |
| Transform | babel-jest + babel-preset-expo |
| Setup | jest.setup.js (AsyncStorage, SecureStore fallback, __DEV__) |
| Types | @types/jest in tsconfig |

## Phase 5 gaps

| Gap | Legacy source | Action |
|---|---|---|
| Activity/Intent navigation | LoginValidationTest SKIP, NavigationRouteLogic SKIP | RNTL + mocked navigation |
| Toolbar logout/close | WebviewActivityLogicTest BEH-028 | RNTL press events |
| Camera permission branch | WebviewActivity LT-019 | Mock expo-camera |
| WKWebView viewWillDisappear | WebviewLoadLogicTests | Native/device only |
| Foreground reload integration | WebviewSessionGuardTests | AppState integration test |
| Timeout dialog | WebviewActivityLogicTest LT-028 | EXCLUDED (legacy inactive) |

## Documentation

- `rn-e-mobilebrowser/docs/legacy-test-mapping.md` — complete Android/iOS → RN file map
- `rn-e-mobilebrowser/docs/web-platform.md` — web dev fixes (unchanged by Phase 4)
