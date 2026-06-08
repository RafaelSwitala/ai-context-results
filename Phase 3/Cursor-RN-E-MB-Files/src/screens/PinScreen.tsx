import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';

import PinEntry from '../components/PinEntry';
import { useAndroidBackHandler } from '../hooks/useNavigationAuthGuard';
import { getStoredPin } from '../services/authStorageService';
import { verifyPinMatch } from '../utils/pinVerification';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Pin'>;

/** MAP-003 — EP-003, BEH-006, BEH-012, NAV-005, ERRPATH-007, ERRPATH-011, ERRPATH-012 */

export default function PinScreen({ navigation }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useAndroidBackHandler(() => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    let active = true;
    void getStoredPin().then((pin) => {
      if (!active) {
        return;
      }
      if (pin.length === 0) {
        navigation.goBack();
      }
    });
    return () => {
      active = false;
    };
  }, [navigation]);

  const verifyPin = useCallback(
    async (entered: string) => {
      const stored = await getStoredPin();
      if (verifyPinMatch(entered, stored)) {
        navigation.navigate('Settings');
        return;
      }
      setErrorMessage('Ungültige PIN.');
    },
    [navigation],
  );

  return (
    <PinEntry
      errorMessage={errorMessage}
      onComplete={(pin) => void verifyPin(pin)}
      onCancel={() => navigation.goBack()}
    />
  );
}
