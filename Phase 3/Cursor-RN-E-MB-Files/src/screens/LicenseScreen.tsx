import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'License'>;

/** MAP-007, MAP-023 — NAV-014; License-Inhalt ist Out-of-Scope */

export default function LicenseScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lizenzen</Text>
      <Text style={styles.subtitle}>
        Die Lizenz-WebView wird in einem separaten Feature implementiert. Diese Route entspricht der Android
        LicenseActivity-Navigation.
      </Text>
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#444',
  },
});
