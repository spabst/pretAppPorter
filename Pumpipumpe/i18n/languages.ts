export const SUPPORTED_LANGUAGES = {
  it: {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    rtl: false
  },
  fr: {
    code: 'fr', 
    name: 'Français',
    flag: '🇫🇷',
    rtl: false
  },
  en: {
    code: 'en',
    name: 'English', 
    flag: '🇺🇸',
    rtl: false
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪', 
    rtl: false
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    rtl: false
  }
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
export type LanguageInfo = typeof SUPPORTED_LANGUAGES[SupportedLanguage];