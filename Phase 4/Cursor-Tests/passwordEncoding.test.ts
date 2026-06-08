import { encodePasswordForLoginUrl } from '../utils/passwordEncoding';

describe('passwordEncoding', () => {
  describe('StringUtilsLoginTest / LoginUrlUtilsTests', () => {
    it('encodeBase64_roundTripsPlainPassword', () => {
      const plain = 'MySecret';
      const encoded = encodePasswordForLoginUrl(plain);
      expect(encoded).not.toBe(plain);
      expect(atob(encoded)).toBe(plain);
    });

    it('encodeBase64_handlesSpecialCharacters', () => {
      const plain = 'päss\nword\t!';
      const encoded = encodePasswordForLoginUrl(plain);
      expect(encoded.length).toBeGreaterThan(0);
      expect(encoded).not.toContain('\n');
    });

    it('encodeBase64_producesUrlSafeTokenForLoginUrl', () => {
      const encoded = encodePasswordForLoginUrl('token');
      expect(encoded.length).toBeGreaterThan(0);
      expect(encoded).not.toMatch(/[\n\r\t]/);
    });

    it('encodeBase64_emptyPasswordReturnsEmpty', () => {
      expect(encodePasswordForLoginUrl('')).toBe('');
    });
  });
});
