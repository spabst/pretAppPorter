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
    gray50: '#F7FAFC',
    gray100: '#EDF2F7',
    gray200: '#E2E8F0',
    gray300: '#CBD5E0',
    gray400: '#A0AEC0',
    gray500: '#718096',
    gray600: '#4A5568',
    gray700: '#2D3748',
    gray800: '#1A202C',
    gray900: '#171923',
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
    gray50: '#171923',
    gray100: '#1A202C',
    gray200: '#2D3748',
    gray300: '#4A5568',
    gray400: '#718096',
    gray500: '#A0AEC0',
    gray600: '#CBD5E0',
    gray700: '#E2E8F0',
    gray800: '#EDF2F7',
    gray900: '#F7FAFC',
  },
};

// Helper object to maintain the gray.X syntax in components
export const createGrayHelper = (colors: typeof Colors.light | typeof Colors.dark) => ({
  50: colors.gray50,
  100: colors.gray100,
  200: colors.gray200,
  300: colors.gray300,
  400: colors.gray400,
  500: colors.gray500,
  600: colors.gray600,
  700: colors.gray700,
  800: colors.gray800,
  900: colors.gray900,
});
