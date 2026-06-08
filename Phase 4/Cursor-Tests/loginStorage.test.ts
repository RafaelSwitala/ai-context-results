import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getLoginPreferences,
  saveLoginPreferences,
  saveValidLoginPreference,
} from '../services/storageConfigStorage';
import { buildLoginUrlFromPreferences } from '../services/loginUrlService';
import { encodePasswordForLoginUrl } from '../utils/passwordEncoding';
import { buildLoginUrl } from '../utils/urlBuilder';

describe('loginUrlAndStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe('PreferencesUtilsLoginTest / LoginPreferencesUtilsTests', () => {
    it('saveLoginPreferences_persistsUserAndValidLoginFlag', async () => {
      await saveLoginPreferences('user1', 'secret');
      await saveValidLoginPreference(true);
      const prefs = await getLoginPreferences();
      expect(prefs.userName).toBe('user1');
      expect(prefs.password).toBe('secret');
      expect(prefs.hasValidLogin).toBe(true);
    });

    it('saveValidLoginPreference_falseOnLogout', async () => {
      await saveValidLoginPreference(true);
      await saveValidLoginPreference(false);
      const prefs = await getLoginPreferences();
      expect(prefs.hasValidLogin).toBe(false);
    });

    it('buildLoginUrl_includesEncodedPassword', () => {
      const encoded = encodePasswordForLoginUrl('secret!');
      const url = buildLoginUrl('os10.prestige.de', '108', 'user1', encoded, 1, 'de-DE');
      expect(url).toContain(`password=${encoded}`);
      expect(url).toContain('App=MobileBrowser');
    });

    it('buildLoginUrlFromPreferences_usesStoredCredentials', async () => {
      await AsyncStorage.multiSet([
        ['storage_config.server', 'os10.prestige.de'],
        ['storage_config.client', '108'],
        ['storage_config.protocol', '1'],
        ['storage_config.user_name', 'storedUser'],
      ]);
      await saveLoginPreferences('storedUser', 'storedPass');
      const url = await buildLoginUrlFromPreferences();
      expect(url).toContain('user=storedUser');
      expect(url).toContain('App=MobileBrowser');
    });
  });
});
