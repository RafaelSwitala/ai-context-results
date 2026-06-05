import XCTest
@testable import MobileBrowserV2

final class WebviewFeatureTests: XCTestCase {
    override func setUp() {
        super.setUp()
        PreferencesUtils.saveSettingsPreferences(
            server: "os10.prestige.de",
            client: "108",
            token: nil,
            pin: nil,
            httpProtocol: HttpProtocolEnum.https.rawValue
        )
        PreferencesUtils.saveLoginPreferences(user: "demo", password: "secret")
        PreferencesUtils.saveValidLoginPreference(true)
    }

    func testWebviewSeguePassesBuiltUrlToWrapper() {
        let login = LoginViewController()
        let wrapper = WebsiteWrapperViewController()
        let segue = UIStoryboardSegue(identifier: "WEBVIEW", source: login, destination: wrapper)

        login.prepare(for: segue, sender: nil)

        XCTAssertEqual(
            wrapper.url,
            "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx?user=demo&password=c2VjcmV0&App=MobileBrowser"
        )
    }

    func testArticleScannerReturnUrlIncludesScanResultOnlyWhenPresent() {
        let scanner = ArticleScannerViewController()
        scanner.redirectUrl = "https://os10.prestige.de/return"
        scanner.codeValue = "4711"
        let wrapper = WebsiteWrapperViewController()
        let segue = UIStoryboardSegue(identifier: "BACK_TO_WEBVIEW", source: scanner, destination: wrapper)

        scanner.prepare(for: segue, sender: nil)

        XCTAssertEqual(wrapper.url, "https://os10.prestige.de/return&ScanResult=4711")

        let cancelScanner = ArticleScannerViewController()
        cancelScanner.redirectUrl = "https://os10.prestige.de/return"
        let cancelWrapper = WebsiteWrapperViewController()
        let cancelSegue = UIStoryboardSegue(identifier: "BACK_TO_WEBVIEW", source: cancelScanner, destination: cancelWrapper)

        cancelScanner.prepare(for: cancelSegue, sender: nil)

        XCTAssertEqual(cancelWrapper.url, "https://os10.prestige.de/return")
    }

    func testRouteConstantsMatchLegacyWebviewTokens() {
        XCTAssertEqual(AppSettings.URL, "URL")
        XCTAssertEqual(AppSettings.BARCODESCANNER, "barcodescanner")
        XCTAssertEqual(AppSettings.LOGIN, "login.aspx")
        XCTAssertEqual(AppSettings.ERROR, "error=-")
        XCTAssertEqual(AppSettings.ABOUT_BLANK, "about:blank")
        XCTAssertEqual(AppSettings.SCAN_RESULT, "&ScanResult=")
    }
}
