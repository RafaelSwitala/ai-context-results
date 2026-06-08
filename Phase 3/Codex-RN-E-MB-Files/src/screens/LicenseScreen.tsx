import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onClose: () => void;
};

export default function LicenseScreen({ onClose }: Props) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Licenses</Text>
      <Text style={styles.text}>License content is provided by the native Android license route in the legacy app.</Text>
      <Pressable style={styles.primaryButton} onPress={onClose}>
        <Text style={styles.primaryButtonText}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0f6bff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    color: '#425466',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
