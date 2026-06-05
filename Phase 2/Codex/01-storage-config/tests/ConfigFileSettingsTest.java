package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 35)
public class ConfigFileSettingsTest {

    @Test
    public void isValidAcceptsFileProtocolVersionOneWithServer() {
        ConfigFileSettings settings = new ConfigFileSettings();
        settings.Protocol = Settings.CONFIG_FILE_PROTOCOL;
        settings.ProtocolVersion = "1";
        settings.Server = "os10.prestige.de";

        assertTrue(settings.isValid());
    }

    @Test
    public void isValidRejectsMissingServerOrWrongProtocolVersion() {
        ConfigFileSettings missingServer = new ConfigFileSettings();
        missingServer.Protocol = Settings.CONFIG_FILE_PROTOCOL;
        missingServer.ProtocolVersion = "1";
        assertFalse(missingServer.isValid());

        ConfigFileSettings wrongVersion = new ConfigFileSettings();
        wrongVersion.Protocol = Settings.CONFIG_FILE_PROTOCOL;
        wrongVersion.ProtocolVersion = "2";
        wrongVersion.Server = "os10.prestige.de";
        assertFalse(wrongVersion.isValid());
    }
}
