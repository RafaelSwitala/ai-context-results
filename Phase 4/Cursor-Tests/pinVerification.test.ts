import { isPinGateRequired, verifyPinMatch } from '../utils/pinVerification';
import { isPinValid } from '../utils/storageConfigValidation';

describe('pinVerification', () => {
  describe('LoginPinGateTest / NavigationLoginGuardTest / LoginPinValidationTests', () => {
    it('pinValidation_acceptsExactMatch', () => {
      expect(verifyPinMatch('1234', '1234')).toBe(true);
    });

    it('pinValidation_rejectsMismatch', () => {
      expect(verifyPinMatch('1234', '5678')).toBe(false);
    });

    it('pinValidation_acceptsLeadingZero', () => {
      expect(verifyPinMatch('0123', '0123')).toBe(true);
    });

    it('pinValidation_emptyStoredPinIsNotProtected', () => {
      expect(isPinGateRequired('')).toBe(false);
    });

    it('pinValidation_nonEmptyStoredPinRequiresGate', () => {
      expect(isPinGateRequired('1234')).toBe(true);
    });

    it('pinValidation_rejectsInvalidPinFormat', () => {
      expect(isPinValid('123')).toBe(false);
      expect(isPinValid('')).toBe(true);
      expect(isPinValid('1234')).toBe(true);
    });
  });
});
