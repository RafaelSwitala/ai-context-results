import { getLoginPreferences } from '../services/storageConfigStorage';
import { submitLogin } from '../services/loginService';

jest.mock('../services/storageConfigStorage');
jest.mock('../utils/webDevPolicy', () => ({
  shouldSkipRemotePreflightOnWeb: () => false,
}));

const mockedGetLoginPreferences = getLoginPreferences as jest.MockedFunction<typeof getLoginPreferences>;

const basePrefs = {
  server: 'os10.prestige.de',
  client: '108',
  protocol: 1,
  token: '',
  pin: '',
  locale: 'de-DE',
  userName: '',
  password: '',
  hasValidSettings: true,
  hasValidLogin: false,
  currentConfigVersion: null,
};

describe('loginService', () => {
  beforeEach(() => {
    mockedGetLoginPreferences.mockResolvedValue(basePrefs);
  });

  describe('LoginValidationTest / LoginValidationTests', () => {
    it('loginValidation_rejectsEmptyUsername', async () => {
      const result = await submitLogin('', 'pwd', true, 'de-DE');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('username_empty');
      }
    });

    it('loginValidation_rejectsEmptyPassword', async () => {
      const result = await submitLogin('user', '', true, 'de-DE');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('password_empty');
      }
    });

    it('loginValidation_rejectsInvalidSettings', async () => {
      const result = await submitLogin('user', 'pwd', false, 'de-DE');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('invalid_settings');
      }
    });

    it('loginValidation_acceptsValidSettingsAndUsername', async () => {
      const result = await submitLogin('u', 'pwd', true, 'de-DE', {
        enabled: true,
        fetchFn: async () => ({ status: 200, url: 'https://server/Default.aspx' }),
      });
      expect(result.ok).toBe(true);
    });

    it('loginValidation_acceptsUsernameWithSpaces', async () => {
      const result = await submitLogin('user name', 'pwd', true, 'de-DE', {
        enabled: true,
        fetchFn: async () => ({ status: 200, url: 'https://server/Default.aspx' }),
      });
      expect(result.ok).toBe(true);
    });
  });

  describe('LoginHttpLogicTest / LoginHttpLogicTests', () => {
    it('loginHttp_successOn200WithoutErrorCode', async () => {
      const result = await submitLogin('user', 'pwd', true, 'de-DE', {
        fetchFn: async () => ({ status: 200, url: 'https://server/Default.aspx' }),
      });
      expect(result.ok).toBe(true);
    });

    it('loginHttp_failsOn200WithErrorCode', async () => {
      const result = await submitLogin('user', 'pwd', true, 'de-DE', {
        fetchFn: async () => ({ status: 200, url: 'https://server/Login.aspx?Error=-6' }),
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('server_error');
      }
    });

    it('loginHttp_failsOnHttp500', async () => {
      const result = await submitLogin('user', 'pwd', true, 'de-DE', {
        fetchFn: async () => ({ status: 500, url: 'https://server' }),
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('http_failed');
      }
    });

    it('loginHttp_failsOnNetworkTimeout', async () => {
      const result = await submitLogin('user', 'pwd', true, 'de-DE', {
        fetchFn: async () => ({ status: 0, url: 'https://server' }),
      });
      expect(result.ok).toBe(false);
    });

    it('loginHttp_failsWhenServerEmpty', async () => {
      mockedGetLoginPreferences.mockResolvedValue({ ...basePrefs, server: '' });
      const result = await submitLogin('user', 'pwd', true, 'de-DE');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBe('url_build_failed');
      }
    });
  });
});
