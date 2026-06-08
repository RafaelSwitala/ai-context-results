import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { HttpProtocol } from '../types/storageConfig';

type Props = {
  server: string;
  client: string;
  protocol: HttpProtocol;
  token: string;
  pin: string;
  locale: string;
  onServerChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onProtocolChange: (value: HttpProtocol) => void;
  onTokenChange: (value: string) => void;
  onPinChange: (value: string) => void;
  onLocaleChange: (value: string) => void;
};

const PROTOCOL_OPTIONS: { label: string; value: HttpProtocol }[] = [
  { label: 'HTTPS', value: HttpProtocol.Https },
  { label: 'HTTPS ohne Validierung', value: HttpProtocol.HttpsWithoutValidation },
  { label: 'HTTP', value: HttpProtocol.Http },
];

const LOCALE_OPTIONS = ['de-DE', 'sk-SK', 'es-ES', 'fr-FR'];

export default function SettingsForm(props: Props) {
  return (
    <>
      <LabeledInput label="Server" value={props.server} onChangeText={props.onServerChange} autoCapitalize="none" />
      <LabeledInput label="Mandant" value={props.client} onChangeText={props.onClientChange} autoCapitalize="none" />
      <ProtocolPicker protocol={props.protocol} onChange={props.onProtocolChange} />
      <LocalePicker locale={props.locale} onChange={props.onLocaleChange} />
      <LabeledInput label="Token" value={props.token} onChangeText={props.onTokenChange} autoCapitalize="none" secureTextEntry />
      <LabeledInput
        label="PIN (4 Ziffern oder leer)"
        value={props.pin}
        onChangeText={props.onPinChange}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
      />
    </>
  );
}

function LabeledInput(inputProps: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  autoCapitalize?: 'none' | 'sentences';
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad';
  maxLength?: number;
}) {
  const { label, ...rest } = inputProps;
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
}

function ProtocolPicker({ protocol, onChange }: { protocol: HttpProtocol; onChange: (value: HttpProtocol) => void }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Protokoll</Text>
      <View style={styles.row}>
        {PROTOCOL_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            style={[styles.chip, protocol === option.value && styles.chipSelected]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.chipText, protocol === option.value && styles.chipTextSelected]}>{option.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function LocalePicker({ locale, onChange }: { locale: string; onChange: (value: string) => void }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Sprache</Text>
      <View style={styles.row}>
        {LOCALE_OPTIONS.map((option) => (
          <Pressable
            key={option}
            style={[styles.chip, locale === option && styles.chipSelected]}
            onPress={() => onChange(option)}
          >
            <Text style={[styles.chipText, locale === option && styles.chipTextSelected]}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </View>
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
