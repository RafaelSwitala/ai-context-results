import { HttpProtocol } from '../types/storageConfig';
import {
  isValidQrSettings,
  isValidScannedQrPayload,
  normalizeScannedQr,
  parseStorageConfigQr,
} from '../utils/storageConfigQr';

const VALID_QR =
  'http://localhost?p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=tok&pin=1234&culture=de-DE';

describe('storageConfigQr', () => {
  describe('QRCodeParserTest / StorageConfigQRCodeParserTests', () => {
    it('parse_mapsValidSettings', () => {
      const settings = parseStorageConfigQr(VALID_QR);
      expect(settings.server).toBe('os10.prestige.de');
      expect(settings.client).toBe('108');
      expect(settings.securityProtocol).toBe(HttpProtocol.Https);
      expect(settings.token).toBe('tok');
      expect(settings.pin).toBe('1234');
      expect(isValidQrSettings(settings)).toBe(true);
    });

    it('parse_defaultsInvalidHttpsToHttps', () => {
      const settings = parseStorageConfigQr(
        'http://localhost?p=MB&v=1&server=s&mandant=c&https=99&token=t&pin=',
      );
      expect(settings.securityProtocol).toBe(HttpProtocol.Https);
    });

    it('parse_mapsListedCulture', () => {
      const settings = parseStorageConfigQr(VALID_QR.replace('culture=de-DE', 'culture=sk-SK'), {
        availableLocales: ['de-DE', 'sk-SK'],
      });
      expect(settings.culture).toBe('sk-SK');
    });

    it('parse_fallsBackCultureWhenNotListed', () => {
      const settings = parseStorageConfigQr(VALID_QR.replace('culture=de-DE', 'culture=xx-XX'), {
        availableLocales: ['de-DE'],
      });
      expect(settings.culture).toBe('de-DE');
    });

    it('parse_invalidWithoutMbProtocol', () => {
      const settings = parseStorageConfigQr('http://localhost?p=XX&v=1&server=s&mandant=c');
      expect(isValidQrSettings(settings)).toBe(false);
    });

    it('parse_normalizesQueryOnlyPayload', () => {
      const queryOnly = 'p=MB&v=1&server=os10.prestige.de&mandant=108&https=1&token=t&pin=';
      const normalized = normalizeScannedQr(queryOnly);
      expect(normalized).toContain('?');
      expect(isValidScannedQrPayload(normalized)).toBe(true);
    });
  });

  describe('NavigationQrScannerRouteTest', () => {
    it('isUrlValid_acceptsMobileBrowserQr', () => {
      expect(isValidScannedQrPayload(VALID_QR)).toBe(true);
    });

    it('isUrlValid_rejectsMissingMobileBrowserMarker', () => {
      expect(isValidScannedQrPayload('http://localhost?p=XX&v=1&server=s')).toBe(false);
    });

    it('normalizeQrCode_addsLocalhostPrefixWhenMissingQuery', () => {
      const raw = 'p=MB&v=1&server=s&mandant=c&https=1';
      const normalized = normalizeScannedQr(raw);
      expect(normalized.startsWith('http://localhost?')).toBe(true);
    });
  });
});
