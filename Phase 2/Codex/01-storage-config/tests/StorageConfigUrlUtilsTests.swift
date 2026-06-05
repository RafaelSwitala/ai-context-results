import XCTest
@testable import MobileBrowserV2

final class StorageConfigUrlUtilsTests: XCTestCase {
    func testBuildCheckAccessUrlDoesNotDuplicateSchemeAndAllowsEmptyClient() {
        let url = UrlUtils.buildCheckAccessUrl(
            server: "https://os10.prestige.de",
            client: "",
            isHttps: false
        )

        XCTAssertEqual(
            url,
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser/Default.aspx"
        )
    }

    func testBuildLoginUrlUsesStoredPartsAndBase64Password() {
        let url = UrlUtils.buildLoginUrl(
            server: "os10.prestige.de",
            client: "108",
            user: "demo",
            password: "pass",
            isHttps: true
        )

        XCTAssertEqual(
            url,
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx?user=demo&password=cGFzcw==&App=MobileBrowser"
        )
    }

    func testBuildLoginUrlFromPreferencesReturnsEmptyWithoutServerOrUser() {
        PreferencesUtils.saveSettingsPreferences(
            server: "",
            client: "108",
            token: nil,
            pin: nil,
            httpProtocol: HttpProtocolEnum.https.rawValue
        )
        PreferencesUtils.saveLoginPreferences(user: "", password: "")

        XCTAssertEqual(UrlUtils.buildLoginUrlFromPreferences(), "")
    }
}
