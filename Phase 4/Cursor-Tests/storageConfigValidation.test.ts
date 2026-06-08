import { isPinValid, isOkHttpStatusCode, isSettingsInputValid, protocolUsesHttps, protocolAllowsSslBypass } from '../utils/storageConfigValidation';
import { HttpProtocol } from '../types/storageConfig';

describe('storageConfigValidation', () => {
  describe('SettingsValidationTest / SettingsValidationTests', () => {
    it('rejects empty server', () => {
      expect(isSettingsInputValid('', '')).toBe(false);
      expect(isSettingsInputValid('  ', '')).toBe(false);
    });

    it('rejects invalid pin length', () => {
      expect(isPinValid('')).toBe(true);
      expect(isPinValid('1234')).toBe(true);
      expect(isPinValid('123')).toBe(false);
      expect(isPinValid('12345')).toBe(false);
    });

    it('allows persist only on HTTP OK', () => {
      expect(isOkHttpStatusCode(200)).toBe(true);
      expect(isOkHttpStatusCode(500)).toBe(false);
      expect(isOkHttpStatusCode(199)).toBe(false);
    });
  });

  describe('LoginPinGateTest / LoginPinValidationTests', () => {
    it('validates pin format empty or four chars', () => {
      expect(isPinValid('0123')).toBe(true);
      expect(isPinValid('abc')).toBe(false);
    });
  });

  describe('PreferencesUtilsStorageConfigTest / protocol', () => {
    it('protocolUsesHttps for https and https-without-validation', () => {
      expect(protocolUsesHttps(HttpProtocol.Https)).toBe(true);
      expect(protocolUsesHttps(HttpProtocol.HttpsWithoutValidation)).toBe(true);
      expect(protocolUsesHttps(HttpProtocol.Http)).toBe(false);
    });

    it('protocolAllowsSslBypass only for protocol 2', () => {
      expect(protocolAllowsSslBypass(HttpProtocol.HttpsWithoutValidation)).toBe(true);
      expect(protocolAllowsSslBypass(HttpProtocol.Https)).toBe(false);
    });
  });
});
