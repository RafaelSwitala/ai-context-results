package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * login Phase 2 — BEH-013, BEH-018, EC-010
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class StringUtilsLoginTest {

    /** BEH-013 / BEH-018: password is Base64-encoded before persistence. */
    @Test
    public void encodeBase64_roundTripsPlainPassword() {
        String plain = "secret123";
        String encoded = StringUtils.encodeBase64(plain);

        assertFalse(encoded.equals(plain));
        assertEquals(plain, StringUtils.decodeBase64(encoded));
    }

    /** EC-010: special characters including newline and tab survive encode/decode. */
    @Test
    public void encodeBase64_handlesSpecialCharacters() {
        String plain = "p@ss!\n\t#";
        String encoded = StringUtils.encodeBase64(plain);

        assertEquals(plain, StringUtils.decodeBase64(encoded));
    }

    /** BEH-005 / EC-002: encoded password can be embedded in login URL. */
    @Test
    public void encodeBase64_producesUrlSafeTokenForLoginUrl() {
        String encoded = StringUtils.encodeBase64("!@#$%");

        assertFalse(StringUtils.IsNullOrEmpty(encoded));
        assertFalse(encoded.contains("\n"));
    }
}
