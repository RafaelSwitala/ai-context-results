import { requiresAuthGuard } from '../services/navigationAuthGuard';
import { shouldExitWebViewOnInvalidLogin } from '../services/webViewSessionService';
import { resetToLoginIfInvalid } from '../services/navigationAuthGuard';

jest.mock('../services/authStorageService', () => ({
  getValidLoginFlag: jest.fn(),
}));

import { getValidLoginFlag } from '../services/authStorageService';

const mockedGetValidLoginFlag = getValidLoginFlag as jest.MockedFunction<typeof getValidLoginFlag>;

describe('navigationAuthGuard', () => {
  describe('WebviewActivityLogicTest / WebviewSessionGuardTests', () => {
    it('shouldFinishOnResumeWhenLoginInvalid', async () => {
      mockedGetValidLoginFlag.mockResolvedValue(false);
      await expect(resetToLoginIfInvalid()).resolves.toBe(true);
      mockedGetValidLoginFlag.mockResolvedValue(true);
      await expect(resetToLoginIfInvalid()).resolves.toBe(false);
    });

    it('shouldExitWebViewOnInvalidLogin mirrors resetToLoginIfInvalid', async () => {
      mockedGetValidLoginFlag.mockResolvedValue(false);
      await expect(shouldExitWebViewOnInvalidLogin()).resolves.toBe(true);
    });

    it('requiresAuthGuard_whenValidLoginFalse', () => {
      expect(requiresAuthGuard(false)).toBe(true);
      expect(requiresAuthGuard(true)).toBe(false);
    });
  });
});
