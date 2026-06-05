package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class QRCodeParserTest {

    @Before
    public void setUp() {
        App.getInstance().DefaulLocale = "de-DE";
        App.getInstance().AvailableLanguages = new HashMap<>();
        App.getInstance().AvailableLanguages.put("sk-SK", "Slovak");
        App.getInstance().AvailableLanguages.put("de-DE", "Deutsch");
    }

    @Test
    public void parseMapsValidSettingsAndSupportedCulture() {
        QRCodeSettings settings = QRCodeParser.parse(
                "https://s.prestige.de/s/demo?p=MB&v=1&server=os10.prestige.de"
                        + "&mandant=108&https=0&token=abc&pin=1234&culture=sk-SK");

        assertTrue(settings.isValid());
        assertEquals("MB", settings.Protocol);
        assertEquals("1", settings.ProtocolVersion);
        assertEquals("os10.prestige.de", settings.Server);
        assertEquals("108", settings.Client);
        assertEquals(PreferencesUtils.PROTOCOL_HTTP, settings.SecurityProtocol);
        assertEquals("abc", settings.Token);
        assertEquals("1234", settings.Pin);
        assertEquals("sk-SK", settings.Culture);
    }

    @Test
    public void parseDefaultsInvalidHttpsAndUnsupportedCulture() {
        QRCodeSettings settings = QRCodeParser.parse(
                "https://s.prestige.de/s/demo?p=MB&v=1&server=os10.prestige.de"
                        + "&mandant=108&https=x&culture=fr-FR");

        assertTrue(settings.isValid());
        assertEquals(PreferencesUtils.PROTOCOL_HTTPS, settings.SecurityProtocol);
        assertEquals("de-DE", settings.Culture);
    }

    @Test
    public void parseMarksMissingProtocolAsInvalid() {
        QRCodeSettings settings = QRCodeParser.parse(
                "https://s.prestige.de/s/demo?v=1&server=os10.prestige.de&mandant=108");

        assertEquals(false, settings.isValid());
    }
}
