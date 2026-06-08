import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  onComplete: (pin: string) => void;
  onCancel: () => void;
  errorMessage?: string | null;
};

/** MAP-003, MAP-018 — UI-003, UI-004, BEH-012, BEH-023, BEH-024 */

export default function PinEntry({ onComplete, onCancel, errorMessage }: Props) {
  const [pinInput, setPinInput] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setPinInput('');
    }
  }, [errorMessage]);

  useEffect(() => {
    if (pinInput.length === 4) {
      onComplete(pinInput);
    }
  }, [pinInput, onComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PIN eingeben</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        value={pinInput}
        onChangeText={(value) => setPinInput(value.replace(/\D/g, '').slice(0, 4))}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
        autoFocus
      />
      <Pressable style={styles.secondaryButton} onPress={onCancel}>
        <Text style={styles.secondaryButtonText}>Abbrechen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  error: {
    color: '#c00',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    letterSpacing: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0066cc',
    fontWeight: '600',
  },
});
