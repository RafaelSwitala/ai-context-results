import { redactUrlForLog, urlContainsPlaintextPassword } from '../utils/urlRedaction';

describe('urlRedaction', () => {
  describe('WebviewSessionGuardTests.testSensitiveUrlNotLogged', () => {
    it('redactUrlForLog masks password query param', () => {
      const url = 'https://server/Default.aspx?user=u&password=secret&App=MobileBrowser';
      const redacted = redactUrlForLog(url);
      expect(redacted).toContain('password=***');
      expect(redacted).not.toContain('password=secret');
    });

    it('urlContainsPlaintextPassword detects leak', () => {
      const url = 'https://server?password=secret';
      expect(urlContainsPlaintextPassword(url, 'secret')).toBe(true);
      expect(urlContainsPlaintextPassword(redactUrlForLog(url), 'secret')).toBe(false);
    });
  });
});
