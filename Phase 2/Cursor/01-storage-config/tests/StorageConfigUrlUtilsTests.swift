//
//  StorageConfigUrlUtilsTests.swift
//  MobileBrowserV2Tests
//
//  storage-config Phase 2 — LT-011, LT-023, LT-024, LT-025
//

import XCTest
@testable import MobileBrowserV2

final class StorageConfigUrlUtilsTests: XCTestCase {

    /** LT-011: login URL built from explicit parameters. */
    func testBuildLoginUrlFromParameters() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "testuser",
            password: "secret",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertTrue(url!.contains("os10.prestige.de"))
        XCTAssertTrue(url!.contains("user=testuser"))
        XCTAssertTrue(url!.contains("App=MobileBrowser"))
    }

    /** LT-023: server with existing scheme is not double-prefixed. */
    func testBuildCheckAccessUrlDoesNotDoubleScheme() {
        let url = UrlUtils.buildCheckAccessUrl(
            server: "https://os10.prestige.de",
            client: "108",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertFalse(url!.contains("https://https://"))
    }

    /** LT-024: empty client still produces default.aspx path. */
    func testBuildCheckAccessUrlAllowsEmptyClient() {
        let url = UrlUtils.buildCheckAccessUrl(
            server: "server.example.com",
            client: "",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertTrue(url!.contains(AppSettings.DEFAULT))
    }

    /** LT-025: URL encoding failure returns nil for check-access URL. */
    func testBuildCheckAccessUrlReturnsNilWhenEncodingFails() {
        let url = UrlUtils.buildCheckAccessUrl(
            server: "\u{0000}",
            client: "108",
            isHttps: true
        )

        XCTAssertNil(url)
    }
}
