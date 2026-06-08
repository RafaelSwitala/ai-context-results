import { extractLoginErrorCode, formatPeErrorMessage } from '../utils/loginErrorParser';

describe('loginErrorParser', () => {
  it('extractLoginErrorCode reads Error query param', () => {
    expect(extractLoginErrorCode('https://server/Login.aspx?Error=-6')).toBe('-6');
    expect(extractLoginErrorCode('https://server/Login.aspx?error=-1')).toBe('-1');
  });

  it('extractLoginErrorCode returns null when absent', () => {
    expect(extractLoginErrorCode('https://server/Default.aspx')).toBeNull();
    expect(extractLoginErrorCode(undefined)).toBeNull();
  });

  it('formatPeErrorMessage includes code', () => {
    expect(formatPeErrorMessage('-6')).toContain('-6');
  });
});
