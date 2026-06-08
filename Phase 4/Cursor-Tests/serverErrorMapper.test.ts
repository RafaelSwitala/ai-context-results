import { mapServerError } from '../utils/serverErrorMapper';

describe('serverErrorMapper', () => {
  describe('WebviewErrorHandlingTest / MiscUtils parity', () => {
    it('maps all known server error codes', () => {
      expect(mapServerError('-1')).toContain('Benutzer');
      expect(mapServerError('-2')).toContain('Passwort');
      expect(mapServerError('-3')).toContain('Benutzerlizenzen');
      expect(mapServerError('-4')).toContain('gesperrt');
      expect(mapServerError('-5')).toContain('vorübergehend');
      expect(mapServerError('-6')).toContain('angemeldet');
    });

    it('maps unknown negative code to logged out message', () => {
      expect(mapServerError('-99')).toContain('abgemeldet');
    });

    it('maps non-error code to fallback dialog text', () => {
      expect(mapServerError('500')).toContain('Server');
    });
  });
});
