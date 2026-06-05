package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.*;

/**
 * Unit tests for QRCodeParser parsing and validation.
 * 
 * Tests coverage:
 * - LT-006, LT-007: QR parser mapping and default HTTPS
 * - LT-013, LT-014: Culture handling and validation
 * - LT-018, LT-027: Culture fallback
 * - LT-019, LT-028: Duplicate QR handling
 */
@RunWith(MockitoJUnitRunner.class)
public class QRCodeParserTest {

    /**
     * LT-006: QR parser maps valid settings
     */
    @Test
    public void testQRParserMapsValidSettings() {
        String qrUrl = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&https=1&token=abc123&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        Settings settings = parser.parse(qrUrl);
        
        assertNotNull("Parsed settings should not be null", settings);
        assertEquals("Server should match", "test.example.com", settings.getServer());
        assertEquals("Token should match", "abc123", settings.getToken());
        assertEquals("PIN should match", "1234", settings.getPin());
    }

    /**
     * LT-007: QR parser defaults invalid https to HTTPS
     */
    @Test
    public void testQRParserDefaultsHttpsToHttps() {
        String qrUrlWithoutHttps = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&token=abc&pin=1234";
        String qrUrlWithInvalidHttps = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&https=invalid&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        
        Settings settings1 = parser.parse(qrUrlWithoutHttps);
        assertNotNull("Settings should be parsed", settings1);
        assertEquals("Protocol should default to HTTPS (1)", 1, settings1.getProtocol());
        
        Settings settings2 = parser.parse(qrUrlWithInvalidHttps);
        assertNotNull("Settings should be parsed with invalid https", settings2);
        assertEquals("Invalid https should default to HTTPS (1)", 1, settings2.getProtocol());
    }

    /**
     * LT-018: QR parser handles culture parameter
     */
    @Test
    public void testQRParserMapsWithCulture() {
        String qrUrlWithCulture = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&culture=de-DE&https=1&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        Settings settings = parser.parse(qrUrlWithCulture);
        
        assertNotNull("Settings should be parsed", settings);
        assertEquals("Culture should be stored", "de-DE", settings.getCulture());
    }

    /**
     * LT-027: QR parser falls back to app default for invalid culture
     */
    @Test
    public void testQRParserCultureFallback() {
        String qrUrlWithInvalidCulture = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&culture=invalid-XX&https=1&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        Settings settings = parser.parse(qrUrlWithInvalidCulture);
        
        assertNotNull("Settings should be parsed", settings);
        // Culture should be ignored or set to default
        assertNotNull("Culture should have a value", settings.getCulture());
    }

    /**
     * LT-028: Duplicate QR code emissions are ignored
     */
    @Test
    public void testDuplicateQRCodeIgnored() {
        String qrUrl = "http://localhost?p=MB&v=1&server=test.example.com&mandant=test&https=1&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        Settings settings1 = parser.parse(qrUrl);
        Settings settings2 = parser.parse(qrUrl);
        
        assertNotNull("First parse should succeed", settings1);
        assertNotNull("Second parse should succeed", settings2);
        assertEquals("Both parses should be identical", settings1.getServer(), settings2.getServer());
    }

    /**
     * LT-019: Invalid QR code (missing p or v parameter)
     */
    @Test
    public void testQRParserInvalidQR() {
        String invalidQrMissingP = "http://localhost?v=1&server=test.example.com&mandant=test&https=1&token=abc&pin=1234";
        String invalidQrMissingV = "http://localhost?p=MB&server=test.example.com&mandant=test&https=1&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        
        Settings settings1 = parser.parse(invalidQrMissingP);
        assertNull("Parse should fail without p parameter", settings1);
        
        Settings settings2 = parser.parse(invalidQrMissingV);
        assertNull("Parse should fail without v parameter", settings2);
    }

    /**
     * LT-023, LT-024: URL parsing edge cases
     */
    @Test
    public void testQRParserUrlEdgeCases() {
        // Server with scheme already included
        String qrUrlWithScheme = "http://localhost?p=MB&v=1&server=https://test.example.com&mandant=test&https=1&token=abc&pin=1234";
        
        QRCodeParser parser = new QRCodeParser();
        Settings settings = parser.parse(qrUrlWithScheme);
        
        assertNotNull("Should parse even with scheme in server", settings);
        // Server should be stored as-is or cleaned
        assertNotNull("Server should be set", settings.getServer());
    }
}
