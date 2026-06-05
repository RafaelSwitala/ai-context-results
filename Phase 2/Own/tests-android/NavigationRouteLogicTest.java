package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

/**
 * navigation Phase 2 — LT-022, LT-017, LT-018, LT-019, LT-020, LT-023, LT-024, LT-025, LT-026
 *
 * Pure route logic extracted from WebviewActivity, BarcodeScannerActivity and App constants.
 */
public class NavigationRouteLogicTest {

    /** LT-022 / STOR-003: route payload keys match production constants. */
    @Test
    public void routeConstants_matchProductionValues() {
        assertEquals("URL", App.URL);
        assertEquals("barcodescanner", App.BARCODESCANNER);
        assertEquals("&ScanResult=", App.SCAN_RESULT);
        assertEquals("login.aspx", App.LOGIN);
    }

    /** LT-018 / BEH-021: barcode URL converts to HTTP(S) return URL for scanner handoff. */
    @Test
    public void convertBarcodeToReturnUrl_httpsProtocol() {
        String result = convertBarcodeToReturnUrl("barcodescanner://host/path/page", true);

        assertEquals("https://host/path/page", result);
    }

    /** LT-018 / BEH-021: HTTP protocol when settings use HTTP. */
    @Test
    public void convertBarcodeToReturnUrl_httpProtocol() {
        String result = convertBarcodeToReturnUrl("barcodescanner://host/path", false);

        assertEquals("http://host/path", result);
    }

    /** LT-023 / BEH-008: barcode URL without scheme separator is not converted. */
    @Test
    public void convertBarcodeToReturnUrl_requiresSchemeSeparator() {
        assertNull(convertBarcodeToReturnUrl("barcodescannerhost/path", true));
        assertFalse(shouldStartBarcodeScanner("barcodescannerhost/path"));
    }

    /** LT-019 / BEH-022: login URL triggers auth-return route. */
    @Test
    public void isLoginUrl_detectsLoginAspx() {
        assertTrue(isLoginUrl("https://server/Login.aspx?user=x"));
        assertFalse(isLoginUrl("https://server/Default.aspx"));
    }

    /** LT-019 / BEH-022: server error URL is classified. */
    @Test
    public void isServerErrorUrl_detectsErrorQuery() {
        assertTrue(isServerErrorUrl("https://server/Login.aspx?Error=-6"));
        assertFalse(isServerErrorUrl("https://server/Default.aspx"));
    }

    /** LT-019 / BEH-026: WebView hides for barcode, login and about:blank URLs. */
    @Test
    public void shouldHideWebView_forSpecialRoutes() {
        assertTrue(shouldHideWebView("barcodescanner://host/path"));
        assertTrue(shouldHideWebView("https://server/login.aspx"));
        assertTrue(shouldHideWebView("about:blank"));
        assertFalse(shouldHideWebView("https://server/Default.aspx"));
    }

    /** LT-017 / ERRPATH-004: empty URL routes to Login instead of WebView load. */
    @Test
    public void resolveWebViewUrl_emptyRoutesToLogin() {
        assertTrue(shouldRouteToLoginOnEmptyUrl(resolveWebViewUrl(null, "")));
        assertTrue(shouldRouteToLoginOnEmptyUrl(resolveWebViewUrl("", "")));
    }

    /** LT-017 / BEH-020: intent URL takes precedence over stored URL. */
    @Test
    public void resolveWebViewUrl_prefersIntentExtra() {
        assertEquals("https://intent-url", resolveWebViewUrl("https://intent-url", "https://stored"));
    }

    /** LT-017 / BEH-020: falls back to stored URL when intent extra absent. */
    @Test
    public void resolveWebViewUrl_fallsBackToStoredUrl() {
        assertEquals("https://stored", resolveWebViewUrl(null, "https://stored"));
    }

    /** LT-020 / BEH-025: scan result appends ScanResult query param. */
    @Test
    public void buildScanResultUrl_appendsCode() {
        String url = buildScanResultUrl("https://host/page", "1234567890");

        assertEquals("https://host/page&ScanResult=1234567890", url);
    }

    /** LT-020 / BEH-025: cancel returns original URL without ScanResult. */
    @Test
    public void buildScanResultUrl_cancelUsesOriginalUrl() {
        String returnUrl = "https://host/page";
        assertEquals(returnUrl, buildScanResultUrl(returnUrl, null));
    }

    /** LT-024 / EP-010: duplicate scan code is ignored. */
    @Test
    public void shouldIgnoreDuplicateScan_sameCodeTwice() {
        assertTrue(shouldIgnoreDuplicateScan("CODE1", "CODE1"));
        assertFalse(shouldIgnoreDuplicateScan("CODE1", "CODE2"));
    }

    /** LT-026 / SEC-001: invalid login on scanner resume requires Login route. */
    @Test
    public void requiresAuthGuard_whenValidLoginFalse() {
        assertTrue(requiresAuthGuard(false));
        assertFalse(requiresAuthGuard(true));
    }

    /** LT-025 / BEH-024: authenticated WebView back is no-op (no route change). */
    @Test
    public void webViewBackPress_noNavigationWhenAuthenticated() {
        assertFalse(shouldNavigateOnWebViewBack(true));
    }

    // --- Extracted from WebviewActivity.onPageFinished / onCreate ---

    static String convertBarcodeToReturnUrl(String url, boolean isHttps) {
        if (!shouldStartBarcodeScanner(url)) {
            return null;
        }
        String protocol = isHttps ? "https://" : "http://";
        return protocol + url.split("://")[1];
    }

    static boolean shouldStartBarcodeScanner(String url) {
        String lower = url.toLowerCase();
        return lower.startsWith(App.BARCODESCANNER) && lower.contains("://");
    }

    static boolean isLoginUrl(String url) {
        return url.toLowerCase().contains(App.LOGIN);
    }

    static boolean isServerErrorUrl(String url) {
        return url.toLowerCase().contains(App.ERROR);
    }

    static boolean shouldHideWebView(String url) {
        String lower = url.toLowerCase();
        return lower.startsWith(App.BARCODESCANNER)
                || lower.contains(App.LOGIN)
                || lower.contains(App.ABOUT_BLANK);
    }

    static String resolveWebViewUrl(String intentUrl, String storedUrl) {
        String current = intentUrl;
        if (current == null) {
            current = storedUrl;
        }
        return current != null ? current : "";
    }

    static boolean shouldRouteToLoginOnEmptyUrl(String url) {
        return url.isEmpty();
    }

    static String buildScanResultUrl(String returnUrl, String code) {
        if (code == null) {
            return returnUrl;
        }
        return String.format("%s%s%s", returnUrl, App.SCAN_RESULT, code);
    }

    static boolean shouldIgnoreDuplicateScan(String previous, String current) {
        return previous.equals(current);
    }

    static boolean requiresAuthGuard(boolean hasValidLogin) {
        return !hasValidLogin;
    }

    static boolean shouldNavigateOnWebViewBack(boolean hasValidLogin) {
        return !hasValidLogin;
    }
}
