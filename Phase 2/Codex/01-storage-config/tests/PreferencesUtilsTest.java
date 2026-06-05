package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.test.core.app.ApplicationProvider;

import java.lang.reflect.Field;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import de.onlinesoftwareag.boa.mobilebrowser4android.App;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class PreferencesUtilsTest {
    private SharedPreferences sharedPreferences;

    @Before
    public void setUp() throws Exception {
        Context context = ApplicationProvider.getApplicationContext();
        sharedPreferences = context.getSharedPreferences("storage-config-test", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().commit();
        App.getInstance().SharedPreferences = sharedPreferences;

        Field field = PreferencesUtils.class.getDeclaredField("sharedpreferences");
        field.setAccessible(true);
        field.set(null, sharedPreferences);
    }

    @Test
    public void saveSettingsAndValidFlagPersistStorageValues() {
        PreferencesUtils.saveSettingsPreferences(
                "os10.prestige.de",
                "108",
                "token",
                "1234",
                PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION);
        PreferencesUtils.saveValidSettingsPreference(true);

        LoginPreferences prefs = PreferencesUtils.getLoginPreferences();
        assertEquals("os10.prestige.de", prefs.server);
        assertEquals("108", prefs.client);
        assertEquals("token", prefs.token);
        assertEquals("1234", prefs.pin);
        assertEquals(PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION, prefs.protocol);
        assertTrue(prefs.hasValidSettings);
        assertTrue(prefs.isHttps());
        assertTrue(prefs.isHttpsWithoutValidation());
    }

    @Test
    public void saveProtocolPreferenceIgnoresValuesOutsideSupportedRange() {
        PreferencesUtils.saveProtocolPreference(PreferencesUtils.PROTOCOL_HTTP);
        PreferencesUtils.saveProtocolPreference(-1);
        assertEquals(PreferencesUtils.PROTOCOL_HTTP, PreferencesUtils.getLoginPreferences().protocol);

        PreferencesUtils.saveProtocolPreference(PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION);
        PreferencesUtils.saveProtocolPreference(3);
        assertEquals(
                PreferencesUtils.PROTOCOL_HTTPS_WITHOUT_VALIDATION,
                PreferencesUtils.getLoginPreferences().protocol);
    }

    @Test
    public void buildCheckAccessUrlPreservesExistingSchemeAndEmptyClient() {
        String url = PreferencesUtils.buildCheckAccessUrl(
                "http://os10.prestige.de",
                "",
                true);

        assertEquals(
                "http://os10.prestige.de/PrestigeEnterprise.MobileBrowser/Default.aspx",
                url);
    }

    @Test
    public void buildLoginUrlIncludesCultureFromPreferences() {
        PreferencesUtils.saveLocale("sk-SK");

        String url = PreferencesUtils.buildLoginUrl(
                "os10.prestige.de",
                "108",
                "demo",
                "cGFzcw==",
                true);

        assertEquals(
                "https://os10.prestige.de/PrestigeEnterprise.MobileBrowser108/Default.aspx"
                        + "?user=demo&password=cGFzcw==&App=MobileBrowser&Culture=sk-SK",
                url);
    }

    @Test
    public void buildLoginUrlFromPreferencesReturnsEmptyWhenServerOrUserMissing() {
        PreferencesUtils.saveSettingsPreferences("os10.prestige.de", "108", "", "", PreferencesUtils.PROTOCOL_HTTPS);
        assertEquals("", PreferencesUtils.buildLoginUrlFromPreferences());

        PreferencesUtils.saveLoginPreferences("demo", "cGFzcw==");
        PreferencesUtils.saveLocale("de-DE");
        assertFalse(PreferencesUtils.buildLoginUrlFromPreferences().isEmpty());
    }

    @Test
    public void replaceDouglasServerNameMigratesExactLegacyDnsValue() {
        PreferencesUtils.saveSettingsPreferences(
                "prestigeweb01.dhag.rd.local",
                "",
                "",
                "",
                PreferencesUtils.PROTOCOL_HTTPS);

        PreferencesUtils.replaceDouglasServerName();

        assertEquals(
                "prestigeweb01.douglas-informatik.de",
                PreferencesUtils.getLoginPreferences().server);
    }
}
