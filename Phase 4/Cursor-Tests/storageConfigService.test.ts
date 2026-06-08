import { checkAccess } from '../services/storageConfigService';
import { HttpProtocol } from '../types/storageConfig';

jest.mock('../utils/webDevPolicy', () => ({
  shouldSkipRemotePreflightOnWeb: () => false,
}));

describe('storageConfigService', () => {
  describe('SettingsValidationTest / PreferencesUtilsStorageConfigTest', () => {
    it('checkAccess succeeds on HTTP 200', async () => {
      const result = await checkAccess('os10.prestige.de', '108', HttpProtocol.Https, {
        fetchFn: async () => ({ status: 200 }),
      });
      expect(result.ok).toBe(true);
    });

    it('checkAccess fails on HTTP 500', async () => {
      const result = await checkAccess('os10.prestige.de', '108', HttpProtocol.Https, {
        fetchFn: async () => ({ status: 500 }),
      });
      expect(result.ok).toBe(false);
    });

    it('checkAccess fails on network error', async () => {
      const result = await checkAccess('os10.prestige.de', '108', HttpProtocol.Https, {
        fetchFn: async () => ({ status: 0 }),
      });
      expect(result.ok).toBe(false);
    });
  });
});
