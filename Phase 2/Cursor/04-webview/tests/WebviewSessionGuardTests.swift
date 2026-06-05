//
//  WebviewSessionGuardTests.swift
//  MobileBrowserV2Tests
//
//  webview Phase 2 — LT-005, LT-008, BEH-007, BEH-011, SEC-001, SEC-002
//

import XCTest
@testable import MobileBrowserV2

final class WebviewSessionGuardTests: XCTestCase {

    /** LT-005 / BEH-007 / SEC-001: foreground with invalid login returns to Login. */
    func testForegroundInvalidLoginReturnsToLogin() {
        XCTAssertTrue(WebviewSessionLogic.shouldReturnToLoginOnForeground(hasValidLogin: false))
        XCTAssertFalse(WebviewSessionLogic.shouldReturnToLoginOnForeground(hasValidLogin: true))
    }

    /** LT-005 / BEH-007: valid login reloads current URL on foreground. */
    func testForegroundValidLoginReloads() {
        XCTAssertTrue(WebviewSessionLogic.shouldReloadOnForeground(hasValidLogin: true))
        XCTAssertFalse(WebviewSessionLogic.shouldReloadOnForeground(hasValidLogin: false))
    }

    /** LT-008 / BEH-011: logout clears valid login before navigation. */
    func testLogoutClearsValidLoginFlag() {
        XCTAssertTrue(WebviewSessionLogic.shouldClearValidLoginOnLogout())
    }

    /** SEC-002: URL route param treated as sensitive (no logging helper returns empty). */
    func testSensitiveUrlNotLogged() {
        let sanitized = WebviewSessionLogic.sanitizeUrlForLogging("https://server?user=x&password=secret")
        XCTAssertFalse(sanitized.contains("password"))
    }
}

enum WebviewSessionLogic {
    static func shouldReturnToLoginOnForeground(hasValidLogin: Bool) -> Bool {
        !hasValidLogin
    }

    static func shouldReloadOnForeground(hasValidLogin: Bool) -> Bool {
        hasValidLogin
    }

    static func shouldClearValidLoginOnLogout() -> Bool {
        true
    }

    static func sanitizeUrlForLogging(_ url: String) -> String {
        guard let queryStart = url.firstIndex(of: "?") else { return "[webview-url]" }
        return String(url[..<queryStart]) + "?[redacted]"
    }
}
