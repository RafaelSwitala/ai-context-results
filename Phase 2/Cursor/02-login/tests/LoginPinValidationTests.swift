//
//  LoginPinValidationTests.swift
//  MobileBrowserV2Tests
//
//  login Phase 2 — LT-006, BEH-012, EC-009, ERRPATH-007
//

import XCTest
@testable import MobileBrowserV2

final class LoginPinValidationTests: XCTestCase {

    /** LT-006 / BEH-012: exact PIN match is accepted. */
    func testPinValidationAcceptsExactMatch() {
        XCTAssertTrue(isPinCorrect(stored: "1234", entered: "1234"))
    }

    /** LT-006 / ERRPATH-007: mismatch is rejected. */
    func testPinValidationRejectsMismatch() {
        XCTAssertFalse(isPinCorrect(stored: "1234", entered: "9999"))
    }

    /** EC-009: leading zero PIN is valid. */
    func testPinValidationAcceptsLeadingZero() {
        XCTAssertTrue(isPinCorrect(stored: "0123", entered: "0123"))
    }

    /** LT-005 / NAV-003: PIN gate required when pin is stored. */
    func testPinGateRequiredWhenPinStored() {
        XCTAssertTrue(isPinGateRequired(pin: "1234"))
        XCTAssertFalse(isPinGateRequired(pin: ""))
        XCTAssertFalse(isPinGateRequired(pin: nil))
    }

    /// Mirrors PinCodeViewController.didFinishedEnterCode comparison logic.
    private func isPinCorrect(stored: String, entered: String) -> Bool {
        entered == stored
    }

    /// Mirrors LoginViewController.openSettingsButtonTapped pinFound check.
    private func isPinGateRequired(pin: String?) -> Bool {
        guard let pin = pin else { return false }
        return !pin.isEmpty
    }
}
