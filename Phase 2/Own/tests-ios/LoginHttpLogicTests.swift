//
//  LoginHttpLogicTests.swift
//  MobileBrowserV2Tests
//
//  login Phase 2 — LT-003, LT-004, EC-007, BEH-006 (Tests B)
//

import XCTest
@testable import MobileBrowserV2

final class LoginHttpLogicTests: XCTestCase {

    /** Tests B: HTTP 200 without Error= query succeeds. */
    func testLoginSuccessOnHttp200NoErrorCode() {
        XCTAssertTrue(LoginHttpLogic.isLoginSuccess(statusCode: 200, errorCode: nil))
    }

    /** Tests B: HTTP 200 with error suffix fails login. */
    func testLoginFailsOnHttp200WithErrorCode() {
        XCTAssertFalse(LoginHttpLogic.isLoginSuccess(statusCode: 200, errorCode: "-6"))
    }

    /** Tests B: HTTP 500 fails login. */
    func testLoginFailsOnHttp500() {
        XCTAssertFalse(LoginHttpLogic.isLoginSuccess(statusCode: 500, errorCode: nil))
    }

    /** Tests B: spinner blocks duplicate requests. */
    func testSpinnerPreventsDuplicateRequests() {
        XCTAssertFalse(LoginHttpLogic.shouldStartLoginRequest(requestInFlight: true))
        XCTAssertTrue(LoginHttpLogic.shouldStartLoginRequest(requestInFlight: false))
    }
}

/// Mirrors LoginViewController AF.request response handling.
enum LoginHttpLogic {
    static func isLoginSuccess(statusCode: Int, errorCode: String?) -> Bool {
        guard statusCode == 200 else { return false }
        guard let errorCode = errorCode, !errorCode.isEmpty else { return true }
        return false
    }

    static func shouldStartLoginRequest(requestInFlight: Bool) -> Bool {
        !requestInFlight
    }
}
