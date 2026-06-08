/**
 * Storage Config QR Code Parser and Validators
 * Pure utility functions for QR code parsing and validation
 * Corresponds to Phase 1 mappings: MAP-005, MAP-023
 * Source IDs: BEH-004, BEH-005, BEH-006, BEH-013, BEH-014, BEH-015, ERRPATH-004, ERRPATH-007, STOR-009
 */

import { QRCodeSettings, Protocol } from '../types';

/**
 * Parse QR code query string into QRCodeSettings
 * Source: BEH-004, BEH-013
 * iOS: parses p, v, server, mandant, https, token, pin
 * Android: adds culture field
 * 
 * Query format expected:
 *   ?p=MB&v=1&server=example.com&mandant=customer&https=1&token=xxx&pin=1234
 *   
 * @param qrText - Raw scanned QR code text
 * @returns Parsed QRCodeSettings or null if parsing fails
 */
export function parseStorageConfigQr(qrText: string): QRCodeSettings | null {
  try {
    // Normalize: prepend http://localhost? if no query string
    const normalized = normalizeScannedQr(qrText);
    if (!normalized) {
      return null;
    }

    // Extract query parameters
    const url = new URL(normalized);
    const params = new URLSearchParams(url.search);

    const settings: QRCodeSettings = {
      server: params.get('server') || '',
      client: params.get('mandant') || undefined,
      token: params.get('token') || undefined,
      pin: params.get('pin') || undefined,
      // https parameter: 1=true, 0/other=default to true (HTTPS)
      https: params.get('https') !== '0', // Any value != 0 defaults to true
      // Android divergence: optional culture field
      culture: params.get('culture') || undefined,
      // Internal validation fields
      p: params.get('p') || undefined,
      v: params.get('v') || undefined,
    };

    return settings;
  } catch {
    return null;
  }
}

/**
 * Normalize scanned QR text before parsing
 * Source: BEH-006, BEH-015
 * 
 * iOS behavior: prepend http://localhost? when no question mark
 * Android behavior: prepend http://localhost? when no question mark
 *
 * @param qrText - Raw scanned text
 * @returns Normalized URL string or null if invalid
 */
export function normalizeScannedQr(qrText: string): string | null {
  if (!qrText || typeof qrText !== 'string') {
    return null;
  }

  const trimmed = qrText.trim();

  // If already a full URL, validate it
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return null;
    }
  }

  // If has query string (? present), prepend http://localhost
  if (trimmed.includes('?')) {
    const url = `http://localhost${trimmed}`;
    try {
      new URL(url);
      return url;
    } catch {
      return null;
    }
  }

  // No query string: prepend http://localhost?
  const url = `http://localhost?${trimmed}`;
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

/**
 * Validate QR Code Settings
 * Source: BEH-005, BEH-014, ERRPATH-004, ERRPATH-007
 * 
 * Rules:
 * - server must be non-empty
 * - p must be 'MB'
 * - v must be '1'
 *
 * @param settings - Parsed QRCodeSettings
 * @returns true if valid
 */
export function isValidQrSettings(settings: QRCodeSettings | null): boolean {
  if (!settings) {
    return false;
  }

  // Server is required
  if (!settings.server || typeof settings.server !== 'string' || settings.server.trim() === '') {
    return false;
  }

  // p must be 'MB'
  if (settings.p !== 'MB') {
    return false;
  }

  // v must be '1'
  if (settings.v !== '1') {
    return false;
  }

  return true;
}

/**
 * Validate PIN format
 * Source: BEH-002, BEH-011, ERRPATH-001, ERRPATH-005
 * 
 * Rules:
 * - PIN is optional (can be empty)
 * - If present, must be exactly 4 digits
 *
 * @param pin - PIN string to validate
 * @returns true if valid
 */
export function isValidPin(pin: string | undefined | null): boolean {
  if (!pin || pin === '') {
    return true; // PIN is optional
  }

  // Must be exactly 4 characters
  if (pin.length !== 4) {
    return false;
  }

  // All must be digits
  return /^\d{4}$/.test(pin);
}

/**
 * Validate server field
 * Source: BEH-002, BEH-011
 * 
 * Rules:
 * - Server is required (non-empty)
 *
 * @param server - Server string to validate
 * @returns true if valid
 */
export function isValidServer(server: string | undefined | null): boolean {
  return !!(server && typeof server === 'string' && server.trim() !== '');
}

/**
 * Merge QR settings into existing settings
 * Used when user scans QR in Settings screen
 * Source: STATE-003, STATE-006
 * 
 * @param existing - Current settings
 * @param qrSettings - Parsed QR settings
 * @returns Merged settings (QR values override but don't auto-save)
 */
export function mergeQrSettingsIntoSettings(
  existing: { server?: string; client?: string; protocol?: Protocol; token?: string; pin?: string },
  qrSettings: QRCodeSettings
): typeof existing {
  return {
    server: qrSettings.server || existing.server,
    client: qrSettings.client || existing.client,
    token: qrSettings.token || existing.token,
    pin: qrSettings.pin || existing.pin,
    // https parameter: convert to Protocol enum
    protocol: qrSettings.https === false ? Protocol.HTTP : Protocol.HTTPS,
  };
}

/**
 * Export protocol enum value from QR settings
 * Source: MAP-021, STOR-003
 * 
 * @param qrSettings - Parsed QR settings
 * @returns Protocol enum value
 */
export function qrSettingsToProtocol(qrSettings: QRCodeSettings): Protocol {
  // QR stores boolean https: true = HTTPS, false = HTTP
  // Android can have culture but protocol stays binary in QR
  return qrSettings.https === false ? Protocol.HTTP : Protocol.HTTPS;
}
