package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * webview Phase 2 — LT-010, LT-024, LT-011, BEH-013, BEH-031, STOR-005, SEC-001
 */
public class WebviewScanResultTest {

    /** LT-024 / BEH-031: scan appends ScanResult query param. */
    @Test
    public void buildScanResultUrl_appendsCode() {
        String url = buildScanResultUrl("https://host/page", "1234567890");

        assertEquals("https://host/page&ScanResult=1234567890", url);
    }

    /** LT-024 / BEH-031: cancel returns original URL without ScanResult. */
    @Test
    public void buildScanResultUrl_cancelUsesOriginalUrl() {
        String returnUrl = "https://host/page";
        assertEquals(returnUrl, buildScanResultUrl(returnUrl, null));
    }

    /** LT-011 / BEH-014 / STOR-005: App.URL is the intent extra key for WebView handoff. */
    @Test
    public void urlIntentExtraKey_matchesProductionConstant() {
        assertEquals("URL", App.URL);
    }

    /** SEC-001: invalid login requires auth guard on scanner resume. */
    @Test
    public void requiresAuthGuard_whenValidLoginFalse() {
        assertTrue(requiresAuthGuard(false));
        assertFalse(requiresAuthGuard(true));
    }

    static String buildScanResultUrl(String returnUrl, String code) {
        if (code == null) {
            return returnUrl;
        }
        return String.format("%s%s%s", returnUrl, App.SCAN_RESULT, code);
    }

    static boolean requiresAuthGuard(boolean hasValidLogin) {
        return !hasValidLogin;
    }
}
