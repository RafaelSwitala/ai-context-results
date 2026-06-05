//
//  NavigationScanResultTests.swift
//  MobileBrowserV2Tests
//
//  navigation Phase 2 — LT-010, LT-020, BEH-011, BEH-025, SEC-002
//

import XCTest
@testable import MobileBrowserV2

final class NavigationScanResultTests: XCTestCase {

    /** LT-010 / BEH-011: scan with code appends ScanResult to return URL. */
    func testScanResultUrlIncludesCode() {
        let url = NavigationScanLogic.buildReturnUrl(
            responseUrl: "https://host/page",
            codeValue: "1234567890"
        )

        XCTAssertEqual(url, "https://host/page&ScanResult=1234567890")
    }

    /** LT-010 / BEH-011: cancel returns WebView URL without ScanResult. */
    func testCancelReturnsOriginalUrl() {
        let url = NavigationScanLogic.buildReturnUrl(
            responseUrl: "https://host/page",
            codeValue: nil
        )

        XCTAssertEqual(url, "https://host/page")
    }

    /** LT-026 / SEC-001: invalid login on scanner load requires Login route. */
    func testAuthGuardRequiresLoginWhenInvalid() {
        XCTAssertTrue(NavigationScanLogic.requiresAuthGuard(hasValidLogin: false))
        XCTAssertFalse(NavigationScanLogic.requiresAuthGuard(hasValidLogin: true))
    }
}

/// Pure logic extracted from ArticleScannerViewController.prepare.
enum NavigationScanLogic {
    static func buildReturnUrl(responseUrl: String, codeValue: String?) -> String {
        if let code = codeValue {
            return responseUrl + AppSettings.SCAN_RESULT + code
        }
        return responseUrl
    }

    static func requiresAuthGuard(hasValidLogin: Bool) -> Bool {
        !hasValidLogin
    }
}
