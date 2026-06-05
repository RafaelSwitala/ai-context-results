//
//  NavigationRouteConstantsTests.swift
//  MobileBrowserV2Tests
//
//  navigation Phase 2 — LT-022, STOR-003, SEC-002
//

import XCTest
@testable import MobileBrowserV2

final class NavigationRouteConstantsTests: XCTestCase {

    /** LT-022: iOS route constants align with Android App class. */
    func testRouteConstantsMatchCrossPlatformContract() {
        XCTAssertEqual(AppSettings.URL, "URL")
        XCTAssertEqual(AppSettings.BARCODESCANNER, "barcodescanner")
        XCTAssertEqual(AppSettings.SCAN_RESULT, "&ScanResult=")
        XCTAssertEqual(AppSettings.LOGIN, "login.aspx")
        XCTAssertEqual(AppSettings.ABOUT_BLANK, "about:blank")
    }
}
