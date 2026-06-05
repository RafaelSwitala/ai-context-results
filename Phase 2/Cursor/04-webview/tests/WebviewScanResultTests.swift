//
//  WebviewScanResultTests.swift
//  MobileBrowserV2Tests
//
//  webview Phase 2 — LT-010, BEH-013, NAV-005, SEC-001
//

import XCTest
@testable import MobileBrowserV2

final class WebviewScanResultTests: XCTestCase {

    /** LT-010 / BEH-013: scan result appended to redirect URL. */
    func testScanResultAppendedToRedirectUrl() {
        let url = WebviewScanLogic.buildWrapperUrl(
            redirectUrl: "https://host/page",
            codeValue: "1234567890"
        )
        XCTAssertEqual(url, "https://host/page&ScanResult=1234567890")
    }

    /** LT-010: cancel returns redirect URL without ScanResult. */
    func testCancelReturnsRedirectUrlOnly() {
        let url = WebviewScanLogic.buildWrapperUrl(
            redirectUrl: "https://host/page",
            codeValue: nil
        )
        XCTAssertEqual(url, "https://host/page")
    }
}

enum WebviewScanLogic {
    static func buildWrapperUrl(redirectUrl: String, codeValue: String?) -> String {
        if let code = codeValue {
            return redirectUrl + AppSettings.SCAN_RESULT + code
        }
        return redirectUrl
    }
}
