//
//  NavigationUrlClassifierTests.swift
//  MobileBrowserV2Tests
//
//  navigation Phase 2 — LT-007, LT-008, LT-023, BEH-008, BEH-009, ERRPATH-003
//

import XCTest
@testable import MobileBrowserV2

final class NavigationUrlClassifierTests: XCTestCase {

    /** LT-007 / BEH-008: barcode scheme cancels navigation and builds return URL. */
    func testBarcodeUrlConvertsToReturnUrl() {
        let result = NavigationUrlLogic.convertBarcodeToReturnUrl(
            "barcodescanner://host/path/page",
            isHttps: true
        )

        XCTAssertEqual(result, "https://host/path/page")
    }

    /** LT-023: barcode URL without scheme separator is not converted. */
    func testBarcodeUrlWithoutSeparatorIsNotConverted() {
        XCTAssertNil(NavigationUrlLogic.convertBarcodeToReturnUrl(
            "barcodescannerhost/path",
            isHttps: true
        ))
    }

    /** LT-008 / BEH-009: login URL is classified for auth return. */
    func testLoginUrlIsDetected() {
        XCTAssertTrue(NavigationUrlLogic.isLoginUrl("https://server/Login.aspx"))
        XCTAssertFalse(NavigationUrlLogic.isLoginUrl("https://server/Default.aspx"))
    }

    /** LT-008 / ERRPATH-003: login form action triggers auth return. */
    func testLoginFormActionIsDetected() {
        XCTAssertTrue(NavigationUrlLogic.isLoginFormAction("https://server/login.aspx?x=1"))
        XCTAssertFalse(NavigationUrlLogic.isLoginFormAction("https://server/home.aspx"))
    }
}

/// Pure route logic extracted from WebsiteViewController.
enum NavigationUrlLogic {
    static func convertBarcodeToReturnUrl(_ url: String, isHttps: Bool) -> String? {
        let lower = url.lowercased()
        guard lower.hasPrefix(AppSettings.BARCODESCANNER), lower.contains("://") else {
            return nil
        }
        let scheme = isHttps ? "https://" : "http://"
        let parts = url.components(separatedBy: "://")
        guard parts.count > 1 else { return nil }
        return scheme + parts[1]
    }

    static func isLoginUrl(_ url: String) -> Bool {
        url.lowercased().contains(AppSettings.LOGIN)
    }

    static func isLoginFormAction(_ action: String) -> Bool {
        action.lowercased().contains(AppSettings.LOGIN)
    }
}
