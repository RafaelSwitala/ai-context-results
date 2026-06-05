package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Config file validity rules for app-start settings import (LT-012, LT-013).
 */
@RunWith(RobolectricTestRunner.class)
@Config(manifest = Config.NONE, sdk = 28, application = android.app.Application.class)
public class ConfigFileSettingsTest {

    @Test
    public void isValid_acceptsFileProtocolSettings() {
        ConfigFileSettings settings = new ConfigFileSettings();
        settings.Protocol = Settings.CONFIG_FILE_PROTOCOL;
        settings.ProtocolVersion = "1";
        settings.Server = "os10.prestige.de";
        settings.Version = "2";

        assertTrue(settings.isValid());
    }

    @Test
    public void isValid_rejectsMissingServer() {
        ConfigFileSettings settings = new ConfigFileSettings();
        settings.Protocol = Settings.CONFIG_FILE_PROTOCOL;
        settings.ProtocolVersion = "1";
        settings.Server = "";
        settings.Version = "2";

        assertFalse(settings.isValid());
    }
}
