package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

/**
 * webview Phase 2 — LT-025, LT-016, LT-019, LT-020, LT-021, LT-026, LT-029
 *
 * Pure URL classification extracted from WebviewActivity WebViewClient callbacks.
 */
public class WebviewUrlClassifierTest {

    /** LT-025: barcode URL classified as scanner route. */
    @Test
    public void classifyUrl_barcodeStartsScannerRoute() {
        assertEquals(WebViewRouteOutcome.SCANNER, classifyUrl("barcodescanner://host/path"));
    }

    /** LT-025: login URL classified as login route. */
    @Test
    public void classifyUrl_loginAspxIsLoginRoute() {
        assertEquals(WebViewRouteOutcome.LOGIN_ROUTE, classifyUrl("https://server/Login.aspx"));
    }

    /** LT-025 / LT-020: server error query classified. */
    @Test
    public void classifyUrl_errorQueryIsErrorRoute() {
        assertEquals(WebViewRouteOutcome.ERROR, classifyUrl("https://server/Login.aspx?Error=-6"));
    }

    /** LT-025 / LT-029: about:blank hides WebView. */
    @Test
    public void classifyUrl_aboutBlankIsHidden() {
        assertEquals(WebViewRouteOutcome.HIDDEN, classifyUrl("about:blank"));
    }

    /** LT-025: normal page URL. */
    @Test
    public void classifyUrl_normalPageIsVisible() {
        assertEquals(WebViewRouteOutcome.NORMAL, classifyUrl("https://server/Default.aspx"));
    }

    /** LT-016 / BEH-020: shouldOverrideUrlLoading suppresses barcode and login URLs. */
    @Test
    public void shouldOverrideUrlLoading_suppressesBarcodeAndLogin() {
        assertTrue(shouldOverrideUrlLoading("barcodescanner://host"));
        assertTrue(shouldOverrideUrlLoading("https://server/login.aspx"));
        assertFalse(shouldOverrideUrlLoading("https://server/Default.aspx"));
    }

    /** LT-019 / BEH-023: barcode URL converts to return URL with protocol from settings. */
    @Test
    public void convertBarcodeToReturnUrl_usesHttpsWhenConfigured() {
        assertEquals("https://host/path", convertBarcodeToReturnUrl("barcodescanner://host/path", true));
    }

    /** LT-026 / ERRPATH-002: barcode without :// is not converted. */
    @Test
    public void convertBarcodeToReturnUrl_requiresSchemeSeparator() {
        assertNull(convertBarcodeToReturnUrl("barcodescannerhost", true));
    }

    /** LT-020 / BEH-025: error code extracted from URL suffix. */
    @Test
    public void extractErrorCodeFromUrl_returnsSuffixAfterLastDash() {
        assertEquals("-6", extractErrorCodeFromUrl("https://server/Login.aspx?Error=-6"));
    }

    /** LT-021 / BEH-027: visibility rules for special URLs. */
    @Test
    public void shouldHideWebView_forBarcodeLoginAndAboutBlank() {
        assertTrue(shouldHideWebView("barcodescanner://host"));
        assertTrue(shouldHideWebView("https://server/login.aspx"));
        assertTrue(shouldHideWebView("about:blank"));
        assertFalse(shouldHideWebView("https://server/Default.aspx"));
    }

    /** BEH-022: login form action detection. */
    @Test
    public void isLoginFormAction_detectsLoginAspx() {
        assertTrue(isLoginFormAction("https://server/login.aspx"));
        assertFalse(isLoginFormAction("https://server/home.aspx"));
    }

    /** Tests A: legacy route constants include about:blank token. */
    @Test
    public void routeConstants_includeAboutBlank() {
        assertEquals("about:blank", App.ABOUT_BLANK);
        assertEquals("error=-", App.ERROR);
    }

    enum WebViewRouteOutcome { SCANNER, LOGIN_ROUTE, ERROR, HIDDEN, NORMAL }

    static WebViewRouteOutcome classifyUrl(String url) {
        String lower = url.toLowerCase();
        if (lower.startsWith(App.BARCODESCANNER) && lower.contains("://")) {
            return WebViewRouteOutcome.SCANNER;
        }
        if (lower.contains(App.ERROR)) {
            return WebViewRouteOutcome.ERROR;
        }
        if (lower.contains(App.LOGIN)) {
            return WebViewRouteOutcome.LOGIN_ROUTE;
        }
        if (lower.contains(App.ABOUT_BLANK)) {
            return WebViewRouteOutcome.HIDDEN;
        }
        return WebViewRouteOutcome.NORMAL;
    }

    static boolean shouldOverrideUrlLoading(String url) {
        String lower = url.toLowerCase();
        return lower.startsWith(App.BARCODESCANNER) || lower.contains(App.LOGIN);
    }

    static String convertBarcodeToReturnUrl(String url, boolean isHttps) {
        String lower = url.toLowerCase();
        if (!lower.startsWith(App.BARCODESCANNER) || !lower.contains("://")) {
            return null;
        }
        String protocol = isHttps ? "https://" : "http://";
        return protocol + url.split("://")[1];
    }

    static String extractErrorCodeFromUrl(String url) {
        int pos = url.lastIndexOf("-");
        if (pos > 0) {
            return url.substring(pos);
        }
        return "";
    }

    static boolean shouldHideWebView(String url) {
        String lower = url.toLowerCase();
        return lower.startsWith(App.BARCODESCANNER)
                || lower.contains(App.LOGIN)
                || lower.contains(App.ABOUT_BLANK);
    }

    static boolean isLoginFormAction(String action) {
        return action.toLowerCase().contains(App.LOGIN);
    }
}
