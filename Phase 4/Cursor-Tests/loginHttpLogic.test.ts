import { isLoginHttpSuccess, shouldStartLoginRequest } from '../utils/loginHttpLogic';

describe('loginHttpLogic', () => {
  describe('LoginHttpLogicTest / LoginHttpLogicTests', () => {
    it('loginHttp_successOn200WithoutErrorCode', () => {
      expect(isLoginHttpSuccess(200, '')).toBe(true);
    });

    it('loginHttp_failsOn200WithErrorCode', () => {
      expect(isLoginHttpSuccess(200, '-6')).toBe(false);
    });

    it('loginHttp_failsOnHttp500', () => {
      expect(isLoginHttpSuccess(500, '')).toBe(false);
    });

    it('loginHttp_failsOnNetworkTimeout', () => {
      expect(isLoginHttpSuccess(-1, '')).toBe(false);
    });

    it('loginHttp_blocksDuplicateRequestWhileInFlight', () => {
      expect(shouldStartLoginRequest(true)).toBe(false);
      expect(shouldStartLoginRequest(false)).toBe(true);
    });
  });
});
