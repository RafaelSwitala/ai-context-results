/**
 * Scanner Navigation Service
 * 
 * Pure functions for QR/barcode payload normalization and result URL construction.
 * 
 * Corresponds to Phase 1 mapping: MAP-011
 * Source IDs: BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-002, ERRPATH-007
 * 
 * @file services/scannerNavigationService.ts
 */

import { ROUTE_PARAMS } from '../navigation/navigation.constants';

/**
 * QR Code Payload Structure
 * 
 * Represents parsed QR code settings configuration.
 * Corresponds to iOS QRCodeSettings and Android QRCodeObject.
 * 
 * Source: [ios: MobileBrowserV2/Source/QrCodeScannerViewController.swift:87 symbol=metadataOutput]
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/QRCodeScannerActivity.java:89 symbol=handleCode]
 */
export interface QRCodePayload {
  serverUrl?: string;
  protocol?: string;
  port?: number | string;
  certificatePin?: string;
  [key: string]: any;
}

/**
 * QR Normalization Result
 */
export type QRNormalizationResult =
  | { valid: true; payload: QRCodePayload }
  | { valid: false; error: string };

/**
 * Normalizes QR code data to QRCodePayload structure
 * 
 * Handles multiple QR formats:
 * 1. JSON format: Directly parse as settings
 * 2. Query string format: Parse key=value pairs
 * 3. Base64 format: Decode and parse
 * 
 * Corresponds to:
 * - iOS: BEH-010 (Settings receives valid QR payload)
 * - Android: BEH-018 (Settings applies result to controls)
 * - Error path: ERRPATH-001, ERRPATH-007 (Invalid QR shows dialog and restarts)
 * 
 * @param rawQrData - Raw QR code string value
 * @returns Normalization result with valid flag and payload or error
 * 
 * Source IDs: BEH-010, BEH-018, BEH-019, ERRPATH-001, ERRPATH-007
 */
export function normalizeQrPayload(rawQrData: string): QRNormalizationResult {
  if (!rawQrData || typeof rawQrData !== 'string') {
    return {
      valid: false,
      error: 'QR data is empty or not a string',
    };
  }

  const trimmedData = rawQrData.trim();

  // Try JSON format first
  try {
    const parsed = JSON.parse(trimmedData);
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        valid: true,
        payload: parsed as QRCodePayload,
      };
    }
  } catch {
    // Not JSON, try other formats
  }

  // Try Base64 format
  try {
    const decoded = Buffer.from(trimmedData, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        valid: true,
        payload: parsed as QRCodePayload,
      };
    }
  } catch {
    // Not Base64, try query string format
  }

  // Try query string format (key=value&key=value)
  try {
    const params = new URLSearchParams(trimmedData);
    const payload: QRCodePayload = {};

    params.forEach((value, key) => {
      // Try to parse numeric values
      if (!isNaN(Number(value))) {
        payload[key] = Number(value);
      } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        payload[key] = value.toLowerCase() === 'true';
      } else {
        payload[key] = value;
      }
    });

    if (Object.keys(payload).length > 0) {
      return {
        valid: true,
        payload,
      };
    }
  } catch {
    // Not query string format either
  }

  // No valid format found
  return {
    valid: false,
    error: `QR code data format not recognized: ${trimmedData.substring(0, 50)}...`,
  };
}

/**
 * Builds a scan result URL with barcode/QR result parameter
 * 
 * When scanner returns successfully, appends the scan result to the return URL
 * as a query parameter. Used by BarcodeScannerScreen and QRCodeScannerScreen.
 * 
 * Corresponds to:
 * - iOS: BEH-011 (ArticleScanner adds ScanResult to return URL)
 * - Android: BEH-025 (BarcodeScannerActivity sets App.URL with ScanResult)
 * 
 * @param returnUrl - Base WebView return URL
 * @param scanCode - Scanned barcode/QR code value
 * @returns URL with ScanResult parameter appended
 * 
 * Source IDs: BEH-011, BEH-025, ERRPATH-002
 */
export function buildScanResultUrl(returnUrl: string, scanCode: string): string {
  if (!returnUrl) {
    return '';
  }

  if (!scanCode) {
    return returnUrl;
  }

  try {
    const url = new URL(returnUrl);
    url.searchParams.set(ROUTE_PARAMS.SCAN_RESULT, scanCode);
    return url.toString();
  } catch (error) {
    // If URL parsing fails, append as query string manually
    const separator = returnUrl.includes('?') ? '&' : '?';
    return `${returnUrl}${separator}${ROUTE_PARAMS.SCAN_RESULT}=${encodeURIComponent(scanCode)}`;
  }
}

/**
 * Validates QR payload structure for settings
 * 
 * Checks that required fields are present in QR payload.
 * The specific required fields depend on settings feature validation.
 * 
 * @param payload - QR payload to validate
 * @returns true if payload has valid structure
 * 
 * Source IDs: BEH-010, ERRPATH-001
 */
export function isValidQRPayload(payload: QRCodePayload): boolean {
  // At minimum, should have some configuration field
  // Specific validation rules belong to settings-config feature
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  // Check for at least one expected field
  const expectedFields = ['serverUrl', 'protocol', 'port', 'certificatePin'];
  const hasExpectedField = Object.keys(payload).some((key) =>
    expectedFields.includes(key),
  );

  return hasExpectedField || Object.keys(payload).length > 0;
}

/**
 * Converts QR payload to query string for return URL
 * 
 * Alternative to buildScanResultUrl when full URL is not available.
 * Used to construct URL parameters from QR settings.
 * 
 * @param payload - QR code payload
 * @returns Query string representation of payload
 * 
 * Source IDs: BEH-010, BEH-011
 */
export function qrPayloadToQueryString(payload: QRCodePayload): string {
  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

/**
 * Extracts barcode/QR code value from scanner result
 * 
 * Normalizes different scanner library return formats:
 * - Direct string value
 * - Object with code/value property
 * - Array of results
 * 
 * @param scannerResult - Raw result from scanner library
 * @returns Extracted code string or null
 */
export function extractScanCode(scannerResult: any): string | null {
  if (!scannerResult) {
    return null;
  }

  // Direct string
  if (typeof scannerResult === 'string') {
    return scannerResult;
  }

  // Object with code or value property
  if (typeof scannerResult === 'object') {
    if (scannerResult.code) {
      return scannerResult.code;
    }
    if (scannerResult.value) {
      return scannerResult.value;
    }
    if (scannerResult.data) {
      return scannerResult.data;
    }
  }

  // Array of results (return first)
  if (Array.isArray(scannerResult) && scannerResult.length > 0) {
    return extractScanCode(scannerResult[0]);
  }

  return null;
}
