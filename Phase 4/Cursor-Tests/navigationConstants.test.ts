import {
  ABOUT_BLANK,
  BARCODE_SCANNER_SCHEME,
  ERROR_QUERY_TOKEN,
  LOGIN_PAGE_TOKEN,
  ROUTE_PARAM_URL,
  SCAN_RESULT_QUERY,
} from '../navigation/navigation.constants';

describe('navigation.constants', () => {
  describe('NavigationRouteLogicTest / NavigationRouteConstantsTests', () => {
    it('routeConstants_matchProductionValues', () => {
      expect(ROUTE_PARAM_URL).toBe('URL');
      expect(BARCODE_SCANNER_SCHEME).toBe('barcodescanner');
      expect(SCAN_RESULT_QUERY).toBe('&ScanResult=');
      expect(LOGIN_PAGE_TOKEN).toBe('login.aspx');
      expect(ABOUT_BLANK).toBe('about:blank');
      expect(ERROR_QUERY_TOKEN).toBe('error=-');
    });
  });
});
