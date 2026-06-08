import { DEFAULT_PAGE, URL_PATH } from '../types/appConstants';
import { HttpProtocol } from '../types/storageConfig';
import { buildCheckAccessUrl, buildLoginUrl } from '../utils/urlBuilder';
import { encodePasswordForLoginUrl } from '../utils/passwordEncoding';

describe('urlBuilder', () => {
  describe('PreferencesUtilsStorageConfigTest / StorageConfigUrlUtilsTests / LoginUrlUtilsTests', () => {
    it('buildLoginUrl_includesCulture', () => {
      const url = buildLoginUrl('os10.prestige.de', '108', 'user1', 'pwd', HttpProtocol.Https, 'de-DE');
      expect(url).toContain('App=MobileBrowser');
      expect(url).toContain('Culture=de-DE');
      expect(url).toContain('user=user1');
    });

    it('buildLoginUrl_doesNotDoubleScheme', () => {
      const url = buildLoginUrl('https://os10.prestige.de', '108', 'u', 'p', HttpProtocol.Https, null);
      expect(url).not.toMatch(/https:\/\/https:\/\//);
      expect(url?.startsWith('https://os10.prestige.de')).toBe(true);
    });

    it('buildLoginUrl_allowsEmptyClient', () => {
      const url = buildCheckAccessUrl('os10.prestige.de', '', HttpProtocol.Https);
      expect(url).toContain(URL_PATH);
      expect(url).toContain(`/${DEFAULT_PAGE}`);
    });

    it('buildCheckAccessUrlReturnsNilWhenEncodingFails', () => {
      const url = buildCheckAccessUrl('bad\u0000host', '108', HttpProtocol.Https);
      expect(url).toBeNull();
    });

    it('buildLoginUrlIncludesUserPasswordAndAppMarker', () => {
      const encoded = encodePasswordForLoginUrl('secret');
      const url = buildLoginUrl('server', '108', 'user name', encoded, HttpProtocol.Https, null);
      expect(url).toContain('user=user%20name');
      expect(url).toContain(`password=${encoded}`);
      expect(url).toContain('App=MobileBrowser');
    });

    it('buildLoginUrlWithoutPasswordOmitsPasswordParam', () => {
      const url = buildLoginUrl('server', '108', 'user', '', HttpProtocol.Https, null);
      expect(url).not.toContain('&password=');
    });

    it('buildLoginUrlReturnsNilForEmptyServer', () => {
      expect(buildLoginUrl('', '108', 'u', 'p', HttpProtocol.Https, null)).toBeNull();
    });
  });
});
