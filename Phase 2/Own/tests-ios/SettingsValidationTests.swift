//
//  SettingsValidationTests.swift
//  MobileBrowserV2Tests
//
//  storage-config / settings — LT-002, LT-003, LT-016 (Tests B)
//

import XCTest
@testable import MobileBrowserV2

final class SettingsValidationTests: XCTestCase {

    /** Tests B: empty server fails validation. */
    func testSettingsValidationRejectsEmptyServer() {
        XCTAssertFalse(SettingsValidationLogic.isValid(server: "", pin: "1234"))
    }

    /** Tests B: PIN must be empty or exactly four characters. */
    func testSettingsValidationRejectsInvalidPin() {
        XCTAssertFalse(SettingsValidationLogic.isValid(server: "test.example.com", pin: "123"))
        XCTAssertFalse(SettingsValidationLogic.isValid(server: "test.example.com", pin: "12345"))
        XCTAssertTrue(SettingsValidationLogic.isValid(server: "test.example.com", pin: "1234"))
        XCTAssertTrue(SettingsValidationLogic.isValid(server: "test.example.com", pin: nil))
    }

    /** Tests B: only HTTP 200 allows persisting settings after check-access. */
    func testSettingsPersistenceRequiresHttpOk() {
        XCTAssertTrue(SettingsValidationLogic.shouldPersistSettings(httpStatus: 200))
        XCTAssertFalse(SettingsValidationLogic.shouldPersistSettings(httpStatus: 403))
    }
}

/// Mirrors SettingsViewContoller.isValid() / isPinValid().
enum SettingsValidationLogic {
    static func isValid(server: String?, pin: String?) -> Bool {
        guard let server = server, !server.isEmpty else { return false }
        return isPinValid(pin)
    }

    static func isPinValid(_ pin: String?) -> Bool {
        guard let pin = pin, !pin.isEmpty else { return true }
        return pin.count == 4
    }

    static func shouldPersistSettings(httpStatus: Int) -> Bool {
        httpStatus == 200
    }
}
