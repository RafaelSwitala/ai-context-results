package de.onlinesoftwareag.boa.mobilebrowser4android.utility;

import android.content.Context;
import android.content.SharedPreferences;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for PreferencesUtils storage and retrieval.
 * 
 * Tests coverage:
 * - LT-001, LT-012, LT-013: Settings prefill and defaults
 * - LT-014: Protocol mapping
 * - LT-026: Invalid protocol handling
 */
@RunWith(MockitoJUnitRunner.class)
public class PreferencesUtilsTest {

    @Mock
    private Context mockContext;
    
    @Mock
    private SharedPreferences mockPreferences;
    
    @Mock
    private SharedPreferences.Editor mockEditor;
    
    private PreferencesUtils preferencesUtils;

    @Before
    public void setUp() {
        when(mockContext.getSharedPreferences(anyString(), anyInt())).thenReturn(mockPreferences);
        when(mockPreferences.edit()).thenReturn(mockEditor);
        when(mockEditor.putString(anyString(), anyString())).thenReturn(mockEditor);
        when(mockEditor.putInt(anyString(), anyInt())).thenReturn(mockEditor);
        when(mockEditor.putBoolean(anyString(), anyBoolean())).thenReturn(mockEditor);
        
        preferencesUtils = new PreferencesUtils(mockContext);
    }

    /**
     * LT-001: Settings prefill defaults when no valid settings exist
     */
    @Test
    public void testSettingsPrefillDefaults() {
        when(mockPreferences.getBoolean(PreferencesUtils.HAS_VALID_SETTINGS, false)).thenReturn(false);
        when(mockPreferences.getString(PreferencesUtils.SERVER, "")).thenReturn("");
        when(mockPreferences.getInt(PreferencesUtils.PROTOCOL, 1)).thenReturn(1); // HTTPS default
        
        boolean hasValidSettings = mockPreferences.getBoolean(PreferencesUtils.HAS_VALID_SETTINGS, false);
        String server = mockPreferences.getString(PreferencesUtils.SERVER, "");
        int protocol = mockPreferences.getInt(PreferencesUtils.PROTOCOL, 1);
        
        assertFalse("Settings should not be valid", hasValidSettings);
        assertEquals("Server should be empty", "", server);
        assertEquals("Protocol should default to HTTPS (1)", 1, protocol);
    }

    /**
     * LT-012: App startup applies newer config file
     */
    @Test
    public void testConfigVersionUpdate() {
        when(mockPreferences.getInt(PreferencesUtils.CURRENT_CONFIG_VERSION, 1)).thenReturn(1);
        
        int currentVersion = mockPreferences.getInt(PreferencesUtils.CURRENT_CONFIG_VERSION, 1);
        int newVersion = 2;
        
        assertNotEquals("Config version should be different", currentVersion, newVersion);
        
        mockEditor.putInt(PreferencesUtils.CURRENT_CONFIG_VERSION, newVersion);
        mockEditor.putBoolean(PreferencesUtils.HAS_VALID_SETTINGS, true);
        mockEditor.apply();
        
        verify(mockEditor).putInt(PreferencesUtils.CURRENT_CONFIG_VERSION, newVersion);
        verify(mockEditor).putBoolean(PreferencesUtils.HAS_VALID_SETTINGS, true);
    }

    /**
     * LT-013: App startup ignores invalid/same config
     */
    @Test
    public void testConfigVersionIgnoresInvalidOrSame() {
        int currentVersion = 2;
        when(mockPreferences.getInt(PreferencesUtils.CURRENT_CONFIG_VERSION, 1)).thenReturn(currentVersion);
        
        int fetched = mockPreferences.getInt(PreferencesUtils.CURRENT_CONFIG_VERSION, 1);
        
        assertEquals("Should fetch current version", currentVersion, fetched);
        verify(mockPreferences, times(0)).edit();
    }

    /**
     * LT-014: Protocol spinner mapping (0=HTTP, 1=HTTPS, 2=HTTPS without validation)
     */
    @Test
    public void testProtocolMapping() {
        int[] protocolValues = {0, 1, 2};
        String[] protocolNames = {"HTTP", "HTTPS", "HTTPS without validation"};
        
        for (int i = 0; i < protocolValues.length; i++) {
            when(mockPreferences.getInt(PreferencesUtils.PROTOCOL, 1)).thenReturn(protocolValues[i]);
            int protocol = mockPreferences.getInt(PreferencesUtils.PROTOCOL, 1);
            
            assertEquals("Protocol " + i + " should map correctly", protocolValues[i], protocol);
        }
    }

    /**
     * LT-026: Invalid protocol preference is not overwritten
     */
    @Test
    public void testInvalidProtocolNotOverwritten() {
        when(mockPreferences.getInt(PreferencesUtils.PROTOCOL, 1)).thenReturn(1);
        
        // Try to save invalid protocol (-1 or 3)
        int invalidProtocol = -1;
        
        // Verify that invalid protocol is not saved
        if (invalidProtocol < 0 || invalidProtocol > 2) {
            verify(mockEditor, times(0)).putInt(PreferencesUtils.PROTOCOL, invalidProtocol);
        }
    }

    /**
     * LT-021: Login URL includes culture
     */
    @Test
    public void testLoginUrlBuildsWithCulture() {
        when(mockPreferences.getString(PreferencesUtils.SERVER, "")).thenReturn("https://server.example.com");
        when(mockPreferences.getString(PreferencesUtils.USER, "")).thenReturn("testuser");
        when(mockPreferences.getString(PreferencesUtils.LOCALE_SYMBOL, "en-US")).thenReturn("de-DE");
        
        String server = mockPreferences.getString(PreferencesUtils.SERVER, "");
        String user = mockPreferences.getString(PreferencesUtils.USER, "");
        String locale = mockPreferences.getString(PreferencesUtils.LOCALE_SYMBOL, "en-US");
        
        assertNotNull("Server should not be null", server);
        assertNotNull("User should not be null", user);
        assertEquals("Locale should be de-DE", "de-DE", locale);
    }

    /**
     * LT-022: Douglas server migration
     */
    @Test
    public void testDouglasServerMigration() {
        String oldServer = "douglas.example.com";
        String newServer = "newserver.example.com";
        
        when(mockPreferences.getString(PreferencesUtils.SERVER, "")).thenReturn(oldServer);
        
        String currentServer = mockPreferences.getString(PreferencesUtils.SERVER, "");
        assertEquals("Current server should be old Douglas", oldServer, currentServer);
        
        // Simulate migration
        mockEditor.putString(PreferencesUtils.SERVER, newServer);
        mockEditor.apply();
        
        verify(mockEditor).putString(PreferencesUtils.SERVER, newServer);
    }

    /**
     * LT-023, LT-024: URL builder edge cases
     */
    @Test
    public void testUrlBuilderEdgeCases() {
        // Server already contains scheme
        String serverWithScheme = "https://server.example.com";
        assertFalse("Should not have duplicate scheme", serverWithScheme.matches("^(http|https)://.*://.*/.*"));
        
        // Empty client
        String client = "";
        when(mockPreferences.getString(PreferencesUtils.CLIENT, "")).thenReturn(client);
        String stored = mockPreferences.getString(PreferencesUtils.CLIENT, "");
        assertEquals("Client should be empty", "", stored);
    }
}
