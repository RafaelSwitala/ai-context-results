import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const LOCALE_OPTIONS = ['de-DE', 'sk-SK', 'es-ES', 'fr-FR'];

type Props = {
  userName: string;
  password: string;
  locale: string;
  onUserNameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLocaleChange: (value: string) => void;
};

/** UI-001, UI-002 — BEH-001, BEH-013 */

export default function LoginForm({
  userName,
  password,
  locale,
  onUserNameChange,
  onPasswordChange,
  onLocaleChange,
}: Props) {
  return (
    <>
      <View style={styles.field}>
        <Text style={styles.label}>Benutzername</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={onUserNameChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Passwort</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Sprache</Text>
        <View style={styles.row}>
          {LOCALE_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, locale === option && styles.chipSelected]}
              onPress={() => onLocaleChange(option)}
            >
              <Text style={[styles.chipText, locale === option && styles.chipTextSelected]}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipSelected: {
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
  },
  chipText: {
    color: '#111',
  },
  chipTextSelected: {
    color: '#fff',
  },
});
