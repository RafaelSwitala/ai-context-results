import { shouldIgnoreDuplicateScan } from '../services/scannerNavigationService';

describe('scannerNavigationService', () => {
  describe('NavigationQrScannerRouteTest / NavigationRouteLogicTest', () => {
    it('shouldIgnoreDuplicateScan_sameCodeTwice', () => {
      expect(shouldIgnoreDuplicateScan('123', '123')).toBe(true);
      expect(shouldIgnoreDuplicateScan('123', '456')).toBe(false);
    });
  });
});
