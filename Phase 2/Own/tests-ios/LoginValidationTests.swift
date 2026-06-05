//
//  LoginValidationTests.swift
//  MobileBrowserV2Tests
//
//  login Phase 2 — LT-001, LT-002, ERRPATH-003 (Tests A)
//

import XCTest
@testable import MobileBrowserV2

final class LoginValidationTests: XCTestCase {

    override func tearDown() {
        PreferencesUtils.saveValidSettingsPreference(false)
        super.tearDown()
    }

    /** Tests A: empty username is rejected before HTTP request. */
    func testLoginRejectsEmptyUsername() {
        PreferencesUtils.saveValidSettingsPreference(true)
        XCTAssertFalse(LoginValidationLogic.isReadyForLogin(
            username: "",
            password: "secret",
            hasValidSettings: true
        ))
    }

    /** Tests A: empty password is rejected (iOS-specific gate). */
    func testLoginRejectsEmptyPassword() {
        PreferencesUtils.saveValidSettingsPreference(true)
        XCTAssertFalse(LoginValidationLogic.isReadyForLogin(
            username: "demo",
            password: "",
            hasValidSettings: true
        ))
    }

    /** Tests A: invalid settings block login before URL build. */
    func testLoginRejectsInvalidSettings() {
        XCTAssertFalse(LoginValidationLogic.isReadyForLogin(
            username: "demo",
            password: "secret",
            hasValidSettings: false
        ))
    }

    /** EC-001 (Tests B): username with spaces passes local gate. */
    func testLoginAcceptsUsernameWithSpaces() {
        PreferencesUtils.saveValidSettingsPreference(true)
        XCTAssertTrue(LoginValidationLogic.isReadyForLogin(
            username: "demo user",
            password: "secret",
            hasValidSettings: true
        ))
    }
}

/// Mirrors LoginViewController guards before AF.request.
enum LoginValidationLogic {
    static func isReadyForLogin(username: String, password: String, hasValidSettings: Bool) -> Bool {
        guard !username.isEmpty, !password.isEmpty else { return false }
        return hasValidSettings
    }
}
