import { ViewStyle } from 'react-native';

export type EmbeddedBrowserProps = {
  uri: string;
  reloadKey: number;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  style?: ViewStyle;
};
