import { getStoredPin, getValidSettingsFlag } from '../services/authStorageService';
import { resolveSettingsButtonGate, resolveSettingsGate } from '../navigation/authGate';

jest.mock('../services/authStorageService');

const mockedGetValidSettingsFlag = getValidSettingsFlag as jest.MockedFunction<typeof getValidSettingsFlag>;
const mockedGetStoredPin = getStoredPin as jest.MockedFunction<typeof getStoredPin>;

describe('authGate', () => {
  describe('LoginValidationTest / NavigationLoginGuardTest / NavigationLoginGuardTests', () => {
    it('loginGuard_staysOnLoginWhenSettingsValid', async () => {
      mockedGetValidSettingsFlag.mockResolvedValue(true);
      await expect(resolveSettingsGate()).resolves.toBeNull();
    });

    it('loginGuard_routesToSettingsWhenNoPin', async () => {
      mockedGetValidSettingsFlag.mockResolvedValue(false);
      mockedGetStoredPin.mockResolvedValue('');
      await expect(resolveSettingsGate()).resolves.toBe('Settings');
    });

    it('loginGuard_routesToPinWhenPinStored', async () => {
      mockedGetValidSettingsFlag.mockResolvedValue(false);
      mockedGetStoredPin.mockResolvedValue('1234');
      await expect(resolveSettingsGate()).resolves.toBe('Pin');
    });

    it('loginValidation_routesToSettingsWhenInvalidSettingsNoPin', async () => {
      mockedGetStoredPin.mockResolvedValue('');
      await expect(resolveSettingsButtonGate()).resolves.toBe('Settings');
    });

    it('loginValidation_routesToPinWhenInvalidSettingsWithPin', async () => {
      mockedGetStoredPin.mockResolvedValue('1234');
      await expect(resolveSettingsButtonGate()).resolves.toBe('Pin');
    });
  });
});
