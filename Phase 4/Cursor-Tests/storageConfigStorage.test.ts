import AsyncStorage from '@react-native-async-storage/async-storage';

import { DOUGLAS_NEW_SERVER, DOUGLAS_OLD_SERVER } from '../types/appConstants';
import { HttpProtocol } from '../types/storageConfig';
import {
  getStoredServer,
  replaceDouglasServerName,
  saveProtocolPreference,
} from '../services/storageConfigStorage';

describe('storageConfigStorage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe('PreferencesUtilsStorageConfigTest / PreferencesUtilsLoginTest', () => {
    it('replaceDouglasServerName_migratesOldDns', async () => {
      await AsyncStorage.setItem('storage_config.server', DOUGLAS_OLD_SERVER);
      await replaceDouglasServerName();
      const server = await AsyncStorage.getItem('storage_config.server');
      expect(server).toBe(DOUGLAS_NEW_SERVER);
    });

    it('getStoredServer_migratesDouglasOnRead', async () => {
      await AsyncStorage.setItem('storage_config.server', DOUGLAS_OLD_SERVER);
      const server = await getStoredServer();
      expect(server).toBe(DOUGLAS_NEW_SERVER);
    });

    it('saveProtocolPreference_ignoresOutOfRange', async () => {
      await saveProtocolPreference(99);
      const stored = await AsyncStorage.getItem('storage_config.protocol');
      expect(stored).toBeNull();
      await saveProtocolPreference(HttpProtocol.Http);
      expect(await AsyncStorage.getItem('storage_config.protocol')).toBe(String(HttpProtocol.Http));
    });
  });
});
