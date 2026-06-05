//
//  LoginPreferencesUtilsTests.swift
//  MobileBrowserV2Tests
//
//  login Phase 2 — LT-003 (partial), LT-007, BEH-009, BEH-010, STATE-001, STATE-003, STOR-001..STOR-003
//

import XCTest
@testable import MobileBrowserV2

final class LoginPreferencesUtilsTests: XCTestCase {

    override func tearDown() {
        PreferencesUtils.saveValidLoginPreference(false)
        PreferencesUtils.saveLoginPreferences(user: "", password: "")
        PreferencesUtils.saveValidSettingsPreference(false)
        super.tearDown()
    }

    /** BEH-009 / STOR-001..STOR-002: credentials persist to preferences. */
    func testSaveLoginPreferencesPersistsCredentials() {
        PreferencesUtils.saveLoginPreferences(user: "testuser", password: "secret")

        XCTAssertEqual(PreferencesUtils.userName, "testuser")
        XCTAssertEqual(PreferencesUtils.password, "secret")
    }

    /** BEH-010 / STATE-001 / STOR-003: successful login sets valid login flag. */
    func testSaveValidLoginPreferenceTrue() {
        PreferencesUtils.saveValidLoginPreference(true)

        XCTAssertTrue(PreferencesUtils.hasValidLoginPreference())
    }

    /** LT-007 / STATE-003 / BEH-007: background logout clears valid login flag. */
    func testSaveValidLoginPreferenceFalseOnLogout() {
        PreferencesUtils.saveValidLoginPreference(true)
        PreferencesUtils.saveValidLoginPreference(false)

        XCTAssertFalse(PreferencesUtils.hasValidLoginPreference())
    }

    /** BEH-004 / ERRPATH-003: settings gate reflects stored preference. */
    func testHasValidSettingsPreference() {
        PreferencesUtils.saveValidSettingsPreference(true)
        XCTAssertTrue(PreferencesUtils.hasValidSettingsPreference())

        PreferencesUtils.saveValidSettingsPreference(false)
        XCTAssertFalse(PreferencesUtils.hasValidSettingsPreference())
    }
}
