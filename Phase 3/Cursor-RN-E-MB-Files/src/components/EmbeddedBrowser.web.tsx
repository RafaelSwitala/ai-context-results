import { useEffect } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { EmbeddedBrowserProps } from './EmbeddedBrowser.types';

/** Web preview: react-native-webview is native-only; embed PRESTIGE via iframe. */
export default function EmbeddedBrowser({
  uri,
  reloadKey,
  onLoadStart,
  onLoadEnd,
  style,
}: EmbeddedBrowserProps) {
  useEffect(() => {
    onLoadStart?.();
  }, [uri, reloadKey, onLoadStart]);

  const openInNewTab = () => {
    void Linking.openURL(uri);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.openTabButton} onPress={openInNewTab}>
        <Text style={styles.openTabText}>In neuem Browser-Tab öffnen</Text>
      </Pressable>
      <Text style={styles.hint}>
        Falls die Seite leer bleibt, blockiert der Server möglicherweise die Einbettung (X-Frame-Options).
        Nutzen Sie dann den Button oben.
      </Text>
      <View style={styles.frameHost}>
        {/* iframe is valid DOM on Expo web; not part of RN core typings */}
        <iframe
          key={`${reloadKey}:${uri}`}
          src={uri}
          title="PRESTIGE Web App"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          style={iframeStyle}
          onLoad={() => onLoadEnd?.()}
        />
      </View>
    </View>
  );
}

const iframeStyle: React.CSSProperties = {
  border: 'none',
  width: '100%',
  height: '100%',
  display: 'block',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  openTabButton: {
    backgroundColor: '#0066cc',
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  openTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  hint: {
    color: '#666',
    fontSize: 12,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  frameHost: {
    flex: 1,
    minHeight: 0,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
});
