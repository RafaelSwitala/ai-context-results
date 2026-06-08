import { isValidConfigFileSettings, mapConfigFileToSettings } from '../services/configFileService';
import { HttpProtocol } from '../types/storageConfig';

describe('configFileService', () => {
  describe('ConfigFileSettingsTest', () => {
    it('isValid_acceptsFileProtocolSettings', () => {
      const settings = mapConfigFileToSettings({
        protocol: 'FILE',
        protocolVersion: '1',
        version: '1',
        server: 'os10.prestige.de',
        mandant: '108',
        https: '1',
        token: 't',
        culture: 'de-DE',
        pin: '',
      });
      expect(isValidConfigFileSettings(settings)).toBe(true);
      expect(settings.securityProtocol).toBe(HttpProtocol.Https);
    });

    it('isValid_rejectsMissingServer', () => {
      const settings = mapConfigFileToSettings({
        protocol: 'FILE',
        protocolVersion: '1',
        version: '1',
        server: '',
        mandant: '108',
        https: '1',
        token: 't',
        culture: 'de-DE',
        pin: '',
      });
      expect(isValidConfigFileSettings(settings)).toBe(false);
    });
  });
});
