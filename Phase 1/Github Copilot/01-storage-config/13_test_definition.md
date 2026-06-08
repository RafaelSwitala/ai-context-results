# Test Definition

| Field | Value |
|---|---|
| Feature | storage-config |
| Phase | P1 |
| Artifact ID | P1-A13 |
| Artifact Path | artifacts/storage-config/claude/20260602-001/phase_1/13_test_definition.md |
| Status | COMPLETE |
| Created by | Claude Haiku 4.5 |
| Last updated | 2026-06-02T15:45:00Z |

## Testable Behaviors

| Behavior ID | Required Test Type | Platforms | Priority | Notes |
|---|---|---|---|---|
| BEH-001, BEH-002 | Unit | iOS, Android | HIGH | Read/Write user credentials (foundation of feature) |
| BEH-003, BEH-004 | Unit | iOS, Android | HIGH | Protocol configuration (critical for network behavior) |
| BEH-005, BEH-006 | Unit | iOS, Android | MEDIUM | Login validity state (validation flag) |
| BEH-007, BEH-008, BEH-009 | Unit | iOS, Android | HIGH | Batch save operations (atomic writes) |
| BEH-011 | Unit | Android | MEDIUM | Login URL building from preferences |
| BEH-012 | Unit | Android | LOW | Douglas server name migration (legacy, Android 12 compat) |
| BEH-013, BEH-014 | Unit | Android | MEDIUM | Locale and config version tracking |
| ERRPATH-002, ERRPATH-004 | Unit | iOS, Android | MEDIUM | Protocol validation and fallback behavior |
| ERRPATH-003, ERRPATH-005 | Unit | Android | MEDIUM | Null checks and empty string handling |
| STOR-* | Integration | iOS, Android | HIGH | Persistence verification (data survives app restart) |

## Legacy Test Cases To Create

| Test ID | Platform | Name | Given | When | Then | Source IDs |
|---|---|---|---|---|---|---|
| LT-001 | iOS | Save and retrieve username | No username stored | saveLoginPreferences("testuser", "pass") called | username property returns "testuser" | EP-003, BEH-001, BEH-002 |
| LT-002 | iOS | Save and retrieve password | No password stored | saveLoginPreferences("user", "testpass") called | password property returns "testpass" | EP-003, BEH-001, BEH-002 |
| LT-003 | iOS | Save and retrieve server URL | No server stored | server = "example.com" | server property returns "example.com" | BEH-001, BEH-002 |
| LT-004 | iOS | Save and retrieve client | No client stored | client = "myclient" | client property returns "myclient" | BEH-001, BEH-002 |
| LT-005 | iOS | Protocol defaults to HTTPS | No protocol set | httpProtocol getter called | httpProtocol == HttpProtocolEnum.https | BEH-003, ERRPATH-002 |
| LT-006 | iOS | Set and retrieve protocol | Protocol = https | httpProtocol = HttpProtocolEnum.http | httpProtocol == HttpProtocolEnum.http | BEH-003, BEH-004 |
| LT-007 | iOS | Login validity flag | hasValidLogin = false | saveValidLoginPreference(true) | hasValidLogin == true | BEH-005, BEH-006 |
| LT-008 | iOS | Settings validity flag | hasValidSettings = false | saveSettingsPreference sets value | hasValidSettings reflects stored value | BEH-005, BEH-006 |
| LT-009 | iOS | Batch save credentials | Empty preferences | saveLoginPreferences("user1", "pass1") | Both userName and password are saved atomically | EP-003, BEH-007 |
| LT-010 | Android | Save and get login preferences | No data stored | saveLoginPreferences("testuser", "encoded_pass") | getLoginPreferences().user == "testuser" | EP-006, EP-007, BEH-008 |
| LT-011 | Android | Save settings with protocol | Empty preferences | saveSettingsPreferences("srv", "cli", "tok", "pin", PROTOCOL_HTTPS) | Editor commit() succeeds; data persisted | EP-009, BEH-009 |
| LT-012 | Android | Protocol constant validation | saveProtocolPreference(0) called | saveProtocolPreference called with value 0, 1, 2 | Protocol value stored correctly | BEH-010, ERRPATH-004 |
| LT-013 | Android | Protocol validation rejects invalid | saveProtocolPreference(-1) called | saveProtocolPreference(-1) called | No write occurs (early return) | ERRPATH-004 |
| LT-014 | Android | Build login URL from preferences | Prefs: server="srv", user="u", client="", password="p" | buildLoginUrlFromPreferences() called | Returns formatted URL with all fields | BEH-011, API-006 |
| LT-015 | Android | Build login URL handles empty server | server = "" | buildLoginUrlFromPreferences() called | Returns empty string | ERRPATH-003 |
| LT-016 | Android | Douglas server migration | Old hostname stored | replaceDouglasServerName() called | New hostname stored; old replaced | BEH-012 |
| LT-017 | Android | Locale save and load | No locale set | saveLocale("en-US") then getLocale() | getLocale() returns "en-US" | BEH-013 |
| LT-018 | Android | Config version tracking | No version set | saveCurrentConfigVersion("1.2.3") then getCurrentConfigVersion() | getCurrentConfigVersion() returns "1.2.3" | BEH-014 |
| LT-019 | iOS/Android | Credentials encrypt/encode | Username: "user", password: "pass" | saveLoginPreferences() stores password | Password should be encoded (verify via code inspection, not plain read) | SEC-001, SEC-004 |
| LT-020 | iOS/Android | Multiple saves don't corrupt data | Initial: server="A" | Save server="B", then save client="C" | Both values correct; no data loss | STOR-*, BEH-002, BEH-009 |

## Edge Cases

| Test ID | Platform | Edge Case | Expected Result | Source IDs |
|---|---|---|---|---|
| EC-001 | iOS | Empty string credentials | Stored and retrieved as empty string (not nil) | BEH-002 |
| EC-002 | iOS | Very long credential strings | Truncated by UserDefaults limit or stored as-is (test limit) | STOR-* |
| EC-003 | iOS | Special characters in credentials | URL-encoded or stored as-is (verify behavior) | BEH-002 |
| EC-004 | Android | TextUtils.isEmpty("") | Returns true; empty string treated as not present | ERRPATH-005 |
| EC-005 | Android | TextUtils.isEmpty(null) | Returns true; null handled gracefully | ERRPATH-005 |
| EC-006 | iOS | HttpProtocolEnum raw value out of range | Falls back to .https (defensive programming) | ERRPATH-002 |
| EC-007 | Android | SharedPreferences.getInt() with missing key | Returns default value (PROTOCOL_HTTPS assumed) | BEH-010 |
| EC-008 | iOS/Android | Rapid sequential saves | Last write wins; no race condition (synchronous storage) | BEH-007, BEH-009 |
| EC-009 | Android | buildLoginUrlFromPreferences() with protocol=0 (HTTP) | Returns http:// URL (not https://) | BEH-011 |
| EC-010 | Android | Null SharedPreferences in buildLoginUrlFromPreferences() | Returns empty string (null check) | ERRPATH-003 |

## Coverage Targets

| Area | Source IDs | Target | Reason |
|---|---|---|---|
| Entry points | EP-001 to EP-009 | 100% | Every entry point must be exercised to verify accessibility |
| Behaviors | BEH-001 to BEH-014 | 100% | All read/write operations and side effects must be tested |
| Storage keys | STOR-001 to STOR-024 | 100% (representative) | Key subset should verify storage layer correctness |
| State transitions | STATE-001 to STATE-008 | 100% | All documented state changes must be verified |
| Error paths | ERRPATH-001 to ERRPATH-005 | 100% | Error conditions must be handled gracefully |
| Protocol handling | BEH-003, BEH-004, BEH-010, ERRPATH-002 | 100% | Protocol enum/constant handling is critical for network behavior |
| Atomicity | BEH-007, BEH-009, BEH-012 | 100% | Batch writes must be atomic; migrations must not corrupt state |
| Security/Privacy | SEC-001 to SEC-010 | Verify encoding | Credentials must not be stored in plaintext (code inspection + runtime verification) |
| Legacy migration | BEH-012 (Douglas server) | Execute once | Android-specific legacy migration should be tested |
| Config versioning | BEH-014, STATE-008 | Verify persistence | Config version tracking enables app-level migration logic |

## Not Testable In Unit Scope

| Source ID | Reason | Alternative Evidence |
|---|---|---|
| NAV-001, NAV-002, NAV-003 | Navigation between classes/layers requires integration; requires app context | Integration test or app startup verification |
| UI-001 to UI-007 | UI rendering and user interaction (SettingsViewController, SettingsActivity) | UI/integration tests, manual QA |
| DEP-001, DEP-002, DEP-003, DEP-004, DEP-005 | External framework dependencies (Foundation, UIKit, Android SDK, androidx) | Runtime framework usage verified by app execution |
| SEC-001, SEC-004 (encryption verification) | Actual keychain/encryption requires device or emulator | Code inspection + manual verification on device |
