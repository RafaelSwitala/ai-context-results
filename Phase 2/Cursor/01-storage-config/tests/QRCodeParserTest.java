package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.SharedPreferences;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * storage-config QR parser tests (LT-006, LT-007, LT-018, LT-027).
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class QRCodeParserTest {

    private SharedPreferences preferences;

    private static final String VALID_QR =
            "https://example.test?p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=abc&pin=1234";

    @Before
    public void setUp() throws Exception {
        preferences = StorageConfigTestSupport.createPreferences();
        StorageConfigTestSupport.initApp(preferences);
    }

    @After
    public void tearDown() throws Exception {
        preferences.edit().clear().commit();
        StorageConfigTestSupport.resetApp();
    }

    /** LT-018 / LT-006: valid QR maps all fields and passes validation. */
    @Test
    public void parse_mapsValidSettings() {
        QRCodeSettings settings = QRCodeParser.parse(VALID_QR);

        assertEquals("MB", settings.Protocol);
        assertEquals("1", settings.ProtocolVersion);
        assertEquals("os10.prestige.de", settings.Server);
        assertEquals("108", settings.Client);
        assertEquals(1, settings.SecurityProtocol);
        assertEquals("abc", settings.Token);
        assertEquals("1234", settings.Pin);
        assertTrue(settings.isValid());
    }

    /** LT-007: missing or invalid https defaults to HTTPS (1). */
    @Test
    public void parse_defaultsInvalidHttpsToHttps() {
        String withoutHttps =
                "https://example.test?p=MB&v=1&server=test.example.com&mandant=1&token=&pin=1234";
        String invalidHttps =
                "https://example.test?p=MB&v=1&server=test.example.com&mandant=1&https=abc&token=&pin=1234";

        assertEquals(PreferencesUtils.PROTOCOL_HTTPS,
                QRCodeParser.parse(withoutHttps).SecurityProtocol);
        assertEquals(PreferencesUtils.PROTOCOL_HTTPS,
                QRCodeParser.parse(invalidHttps).SecurityProtocol);
    }

    /** LT-018: culture from QR is applied when listed in AvailableLanguages. */
    @Test
    public void parse_mapsListedCulture() {
        String qrWithCulture = VALID_QR + "&culture=sk-SK";
        QRCodeSettings settings = QRCodeParser.parse(qrWithCulture);

        assertEquals("sk-SK", settings.Culture);
    }

    /** LT-027: unknown culture falls back to app default locale. */
    @Test
    public void parse_fallsBackCultureWhenNotListed() {
        String qrWithCulture = VALID_QR + "&culture=xx-XX";
        QRCodeSettings settings = QRCodeParser.parse(qrWithCulture);

        assertEquals("de-DE", settings.Culture);
    }

    /** LT-019 (invalid branch): missing MB protocol fails validation. */
    @Test
    public void parse_invalidWithoutMbProtocol() {
        String invalid = "https://example.test?v=1&server=test.example.com&mandant=1&https=1";
        QRCodeSettings settings = QRCodeParser.parse(invalid);

        assertFalse(settings.isValid());
    }
}
