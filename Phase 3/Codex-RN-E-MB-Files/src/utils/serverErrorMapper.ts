export function mapServerError(errorCode: string | number | null | undefined): string {
  const code = String(errorCode ?? '').trim();
  if (!code) {
    return 'Login failed.';
  }

  if (code.startsWith('-')) {
    return `Server error ${code}`;
  }

  return code;
}
