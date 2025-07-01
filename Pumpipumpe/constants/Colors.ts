/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#5A9B9C';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#2D3748',
    background: '#F7FAFC',
    tint: tintColorLight,
    icon: '#718096',
    tabIconDefault: '#A0AEC0',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E2E8F0',
    primary: '#5A9B9C',
    secondary: '#EDF2F7',
    accent: '#38B2AC',
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    }
  },
  dark: {
    text: '#F7FAFC',
    background: '#1A202C',
    tint: tintColorDark,
    icon: '#A0AEC0',
    tabIconDefault: '#718096',
    tabIconSelected: tintColorDark,
    card: '#2D3748',
    border: '#4A5568',
    primary: '#5A9B9C',
    secondary: '#2D3748',
    accent: '#38B2AC',
    gray: {
      50: '#171923',
      100: '#1A202C',
      200: '#2D3748',
      300: '#4A5568',
      400: '#718096',
      500: '#A0AEC0',
      600: '#CBD5E0',
      700: '#E2E8F0',
      800: '#EDF2F7',
      900: '#F7FAFC',
    }
  },
};
