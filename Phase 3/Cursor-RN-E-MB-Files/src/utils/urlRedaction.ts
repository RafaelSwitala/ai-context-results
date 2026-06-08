/** SEC-001 — WebviewSessionGuardTests.testSensitiveUrlNotLogged */

export function redactUrlForLog(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.has('password')) {
      parsed.searchParams.set('password', '***');
    }
    return parsed.toString();
  } catch {
    return '[invalid-url]';
  }
}

export function urlContainsPlaintextPassword(url: string, password: string): boolean {
  if (password.length === 0) {
    return false;
  }
  return url.includes(password);
}
