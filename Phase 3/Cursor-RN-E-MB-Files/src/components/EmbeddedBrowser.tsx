import { View } from 'react-native';

import { EmbeddedBrowserProps } from './EmbeddedBrowser.types';

/** Native builds use react-native-webview directly in WebViewScreen. */
export default function EmbeddedBrowser(_props: EmbeddedBrowserProps) {
  return <View style={{ flex: 1 }} />;
}

export type { EmbeddedBrowserProps };
