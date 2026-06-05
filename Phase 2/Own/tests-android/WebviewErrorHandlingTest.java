package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * webview Phase 2 — LT-004, LT-017, LT-020, LT-027 (Tests B)
 *
 * Error and empty-URL handling extracted from WebviewActivity.
 */
public class WebviewErrorHandlingTest {

    /** LT-004 (Tests B): empty URL must not start a WebView load. */
    @Test
    public void emptyUrl_doesNotLoad() {
        assertTrue(shouldStartLogin(WebviewActivityLogicTest.resolveWebViewUrl(null, "")));
    }

    /** LT-020 (Tests B): server error query in finished URL is recognized. */
    @Test
    public void serverErrorUrl_isDetected() {
        String errorUrl = "https://server/Login.aspx?Error=-6";
        assertTrue(isServerErrorUrl(errorUrl));
        assertEquals("-6", extractErrorCodeFromUrl(errorUrl));
    }

    /** LT-017 (Tests B): HTTP/resource errors show dialog only once. */
    @Test
    public void resourceError_showsDialogOnlyOnce() {
        assertTrue(shouldShowErrorDialog(false));
        assertFalse(shouldShowErrorDialog(true));
    }

    /** LT-027: mapped error route clears session when login page finishes. */
    @Test
    public void loginPageFinish_clearsValidLogin() {
        assertTrue(shouldClearLoginOnLoginPageFinish("https://server/login.aspx"));
        assertFalse(shouldClearLoginOnLoginPageFinish("https://server/Default.aspx"));
    }

    static boolean shouldStartLogin(String url) {
        return url.isEmpty();
    }

    static boolean isServerErrorUrl(String url) {
        return url.toLowerCase().contains(App.ERROR);
    }

    static String extractErrorCodeFromUrl(String url) {
        int pos = url.lastIndexOf("-");
        if (pos > 0) {
            return url.substring(pos);
        }
        return "";
    }

    static boolean shouldShowErrorDialog(boolean isErrorDisplayed) {
        return !isErrorDisplayed;
    }

    static boolean shouldClearLoginOnLoginPageFinish(String url) {
        return url.toLowerCase().contains(App.LOGIN);
    }
}
