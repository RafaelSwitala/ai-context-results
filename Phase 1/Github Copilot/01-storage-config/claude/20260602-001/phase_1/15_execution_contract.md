# Execution Contract

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A15 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_1/15_execution_contract.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T15:45:00Z |

## Phase 2 Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Legacy iOS Tests | Create 20 unit tests (LT-001 to LT-020) for PreferencesUtils; verify read/write for all 12 keys (STOR-002 to STOR-012) | LT-001, LT-002, LT-003, ... LT-020, P1-A13 |
| Legacy Android Tests | Create 20 unit tests (LT-010 to LT-020 + Android-specific) for PreferencesUtils.java and App.onCreate(); verify all 13 keys (STOR-014 to STOR-024) + protocol constants (PROTOCOL_HTTP, _HTTPS, _HTTPS_NO_VALIDATION) | LT-010 to LT-020, P1-A13 |
| Edge case coverage | Test null SharedPreferences, empty strings, invalid protocol values, out-of-range integers | EC-001 to EC-010, P1-A13 |
| Platform divergence verification | Test iOS enum vs Android int protocol handling; verify key naming differences (mb_* vs preference_*) do NOT affect RN migration logic | DIV-001, DIV-002 in P1-A14 |
| Atomicity verification | Verify batch saves (saveLoginPreferences, saveSettingsPreferences) are atomic; no partial writes on error | BEH-007, BEH-009 |
| Persistence verification | App restart or recreation of SharedPreferences/UserDefaults does not lose data | STOR-* |
| Douglas server migration test (Android) | Verify replaceDouglasServerName() correctly replaces old hostname with new one; test runs only once | BEH-012 |

## Phase 3 Implementation Contract

| Item | Requirement | Source IDs |
|---|---|---|
| StorageService implementation | Implement src/services/storageService.ts with methods: getCredentials(), setCredentials(), getProtocol(), setProtocol(), buildLoginUrl(), runMigrations(), getLocale(), setLocale(), getConfigVersion(), setConfigVersion() | MAP-001, MAP-100 to MAP-105 |
| Encrypted storage integration | Integrate react-native-encrypted-storage or @react-native-keychain/keychain for username, password, token (MAP-201); verify encryption is actually active | SEC-001, SEC-004, MAP-DEP-002 |
| AsyncStorage integration | Integrate @react-native-async-storage/async-storage for non-sensitive config (MAP-202, MAP-203, MAP-204) | MAP-DEP-001 |
| Key normalization | Normalize all iOS (mb_*) and Android (preference_*) keys to RN namespace (@storage/*) as per DIV-002 | DIV-002 |
| Protocol handling | Implement protocol as string enum ('http', 'https', 'https-no-validation') in RN; convert from iOS enum / Android int during data loading | DIV-001 |
| Migration logic | Implement runMigrations() that handles Douglas hostname migration and config versioning as per DIV-005, DIV-007 | BEH-012, DIV-005 |
| Async API design | All StorageService methods must be async (Promise-based) to avoid UI blocking; batch operations via multiSet/multiGet | DIV-008 |
| No code in ai-context | All RN runtime code goes to rn-e-mobilebrowser/src/services/ and rn-e-mobilebrowser/src/screens/; nothing in ai-context/artifacts/ | GR-002 |

## Phase 4 RN Test Contract

| Item | Requirement | Source IDs |
|---|---|---|
| Test file mapping | Create RN unit tests mirroring LT-001 to LT-020 from Phase 2 (legacy); use Jest and React Native Testing Library | LT-001 to LT-020 |
| StorageService test suite | Test getCredentials(), setCredentials(), getProtocol(), setProtocol(), buildLoginUrl(), runMigrations(), getLocale(), getConfigVersion() with mocked AsyncStorage and encrypted-storage | MAP-100 to MAP-105, MAP-DEP-001, MAP-DEP-002 |
| Encrypted storage verification | Verify credentials are NOT readable from plain AsyncStorage; only readable via react-native-encrypted-storage | SEC-001, SEC-004, SEC-005 |
| Platform divergence tests | Verify RN behavior matches iOS+Android expected behavior; normalize protocol values correctly | DIV-001 to DIV-008 |
| Edge cases | Test empty strings, null values, missing keys, API errors | EC-001 to EC-010 |
| Atomicity tests | Verify batch operations (multiSet) behave atomically | BEH-007, BEH-009 |
| Migration tests | Test Douglas hostname replacement, config version checking | BEH-012 |
| SettingsScreen integration | Create RN SettingsScreen component (MAP-003) that reads/writes via StorageService; test data binding | UI-004, UI-005, UI-006 |

## Phase 5 Validation Contract

| Metric | Required Evidence | Source IDs |
|---|---|---|
| Functional parity | RN behavior matches iOS and Android behavior for all 14 testable behaviors (BEH-001 to BEH-014) | BEH-* in P1-A12 |
| Data persistence | App restart does not lose credentials, protocol, locale, config version; encrypted storage remains encrypted | STOR-* |
| Error handling | Null SharedPreferences, missing keys, invalid protocol values are handled gracefully in RN as in legacy | ERRPATH-* |
| Performance | StorageService access time < 100ms (AsyncStorage typical performance); no blocking on main thread | DIV-008 |
| Security compliance | Credentials stored only in encrypted storage, NOT in AsyncStorage; verify via code inspection and runtime check | SEC-001, SEC-004 |
| Test coverage | RN tests achieve >= 90% code coverage in StorageService; all entry points (EP-*) exercised | EP-* |
| Behavioral parity report | Compare iOS test results, Android test results, RN test results; document any differences as known divergences | P2-A23, P4-A44 |
| Migration success | Douglas hostname replacement and config version handling verify app upgrade path works | BEH-012 |

## Commands Known At Phase 1

| Repo | Command | Purpose | Confidence |
|---|---|---|---|
| rn-e-mobilebrowser | npm test (or yarn test) | Run Jest unit tests for React Native | HIGH |
| rn-e-mobilebrowser | npm run android (or yarn android) | Build and run on Android emulator/device | HIGH |
| rn-e-mobilebrowser | npm run ios (or yarn ios) | Build and run on iOS simulator/device | HIGH |
| rn-e-mobilebrowser | npm install | Install dependencies (AsyncStorage, encrypted-storage, etc.) | HIGH |
| rn-e-mobilebrowser | npm run build or npm run tsc | TypeScript compilation check | MEDIUM |
| ios-mobilebrowser | xcodebuild test (in MobileBrowserV2 project) | Run iOS unit tests | MEDIUM |
| ios-mobilebrowser | xcodebuild -scheme MobileBrowserV2 -configuration Release archive | Build iOS archive | MEDIUM |
| android-mobilebrowser | ./gradlew test | Run Android unit tests | HIGH |
| android-mobilebrowser | ./gradlew connectedAndroidTest | Run Android instrumentation tests | MEDIUM |
| android-mobilebrowser | ./gradlew build | Build Android APK | HIGH |
