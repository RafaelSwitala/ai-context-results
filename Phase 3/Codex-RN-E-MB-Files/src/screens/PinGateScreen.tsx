import { useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';

import { readAuthSnapshot } from '../services/authStorageService';

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
};

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const PIN_LENGTH = 4;

export default function PinGateScreen({ onCancel, onSuccess }: Props) {
  const [storedPin, setStoredPin] = useState('');
  const [entered, setEntered] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onCancel();
      return true;
    });

    return () => subscription.remove();
  }, [onCancel]);

  useEffect(() => {
    let isMounted = true;
    void readAuthSnapshot().then((snapshot) => {
      if (!isMounted) {
        return;
      }

      if (!snapshot.pin) {
        onSuccess();
        return;
      }

      setStoredPin(snapshot.pin);
    });

    return () => {
      isMounted = false;
    };
  }, [onSuccess]);

  const pressDigit = (digit: string) => {
    setError(false);
    const next = entered.length >= PIN_LENGTH ? digit : `${entered}${digit}`;
    setEntered(next);

    if (next.length === PIN_LENGTH) {
      if (next === storedPin) {
        onSuccess();
      } else {
        setError(true);
        setEntered('');
      }
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>PIN</Text>
      <View style={styles.boxRow}>
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
          <View key={index} style={styles.pinBox}>
            <Text style={styles.pinBoxText}>{entered[index] ? '8' : ''}</Text>
          </View>
        ))}
      </View>
      {error ? <Text style={styles.error}>Invalid PIN</Text> : <Text style={styles.hint}> </Text>}
      <View style={styles.keypad}>
        {DIGITS.map((digit) => (
          <Pressable key={digit} style={styles.key} onPress={() => pressDigit(digit)}>
            <Text style={styles.keyText}>{digit}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onCancel}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            setEntered((current) => current.slice(0, -1));
            setError(false);
          }}
        >
          <Text style={styles.secondaryButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  boxRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  error: {
    color: '#a11d33',
    fontWeight: '700',
    textAlign: 'center',
  },
  hint: {
    minHeight: 20,
  },
  key: {
    alignItems: 'center',
    borderColor: '#ccd6e0',
    borderRadius: 8,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: '30%',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '700',
  },
  pinBox: {
    alignItems: 'center',
    borderBottomColor: '#102a43',
    borderBottomWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  pinBoxText: {
    fontSize: 24,
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    padding: 24,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#0f6bff',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#0f6bff',
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
