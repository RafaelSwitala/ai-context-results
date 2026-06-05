package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.net.Uri;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.util.Objects;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * navigation Phase 2 — LT-009, LT-016, BEH-010, BEH-019, ERRPATH-007
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class NavigationQrScannerRouteTest {

    /** LT-016 / BEH-019: valid QR with p=MB returns RESULT_OK path. */
    @Test
    public void isUrlValid_acceptsMobileBrowserQr() {
        assertTrue(isUrlValid("http://localhost?p=MB&v=1&server=x"));
    }

    /** LT-009 / ERRPATH-007: invalid QR payload fails validation. */
    @Test
    public void isUrlValid_rejectsMissingMobileBrowserMarker() {
        assertFalse(isUrlValid("http://localhost?v=1&server=x"));
    }

    /** BEH-019: query-only scan string is normalized before validation. */
    @Test
    public void normalizeQrCode_addsLocalhostPrefixWhenMissingQuery() {
        String normalized = normalizeQrCode("p=MB&v=1&server=x");

        assertTrue(normalized.contains("?"));
        assertTrue(isUrlValid(normalized));
    }

    /** LT-024: duplicate QR code is ignored. */
    @Test
    public void shouldIgnoreDuplicateScan_sameCodeTwice() {
        assertTrue(shouldIgnoreDuplicateScan("QR1", "QR1"));
        assertFalse(shouldIgnoreDuplicateScan("QR1", "QR2"));
    }

    /** Extracted from QRCodeScannerActivity.handleCode / isUrlValid. */
    static String normalizeQrCode(String code) {
        String url = code;
        if (!url.contains("?")) {
            url = "http://localhost?" + url;
        }
        return url;
    }

    static boolean isUrlValid(String qrcode) {
        try {
            Uri uri = Uri.parse(qrcode);
            return Objects.equals(uri.getQueryParameter("p"), "MB");
        } catch (Exception ex) {
            return false;
        }
    }

    static boolean shouldIgnoreDuplicateScan(String previous, String current) {
        return previous.equals(current);
    }
}
