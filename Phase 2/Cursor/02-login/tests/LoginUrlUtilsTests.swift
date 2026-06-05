//
//  LoginUrlUtilsTests.swift
//  MobileBrowserV2Tests
//
//  login Phase 2 — LT-001 (partial), BEH-005, EC-001, EC-002, EC-004, ERRPATH-004
//

import XCTest
@testable import MobileBrowserV2

final class LoginUrlUtilsTests: XCTestCase {

    /** BEH-005: login URL built with all parameters. */
    func testBuildLoginUrlIncludesUserPasswordAndAppMarker() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "testuser",
            password: "secret",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertTrue(url!.contains("user=testuser"))
        XCTAssertTrue(url!.contains("App=MobileBrowser"))
        XCTAssertTrue(url!.contains("password="))
    }

    /** EC-001: username with spaces is URL-encoded. */
    func testBuildLoginUrlEncodesUsernameWithSpaces() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "user name",
            password: "secret",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertTrue(url!.contains("user="))
        XCTAssertFalse(url!.contains("user=user name"))
    }

    /** EC-002: password with special characters is Base64-encoded in URL. */
    func testBuildLoginUrlEncodesSpecialCharacterPassword() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "user1",
            password: "!@#$",
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertTrue(url!.contains("&password="))
    }

    /** ERRPATH-004 / EC-013: empty server yields nil login URL. */
    func testBuildLoginUrlReturnsNilForEmptyServer() {
        let url = UrlUtils.buildLoginUrl(
            server: "",
            client: "108",
            user: "user1",
            password: "secret",
            isHttps: true
        )

        XCTAssertNil(url)
    }

    /** BEH-008 / EC-008: blank error query is not part of URL builder (success path input). */
    func testBuildLoginUrlWithoutPasswordOmitsPasswordParam() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "user1",
            password: nil,
            isHttps: true
        )

        XCTAssertNotNil(url)
        XCTAssertFalse(url!.contains("&password="))
    }
}
