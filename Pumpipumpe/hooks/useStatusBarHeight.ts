import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useStatusBarHeight() {
  const insets = useSafeAreaInsets();
  
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 0;
  }
  
  return insets.top;
}