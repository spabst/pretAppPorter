import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, LanguageInfo } from '@/i18n/languages';
import { translations, TranslationKey } from '@/i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  languageInfo: LanguageInfo;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguage;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'it' 
}) => {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.it[key] || key;
  };

  const languageInfo = SUPPORTED_LANGUAGES[language];

  return (
    <LanguageContext.Provider value={{ 
      language, 
      languageInfo,
      setLanguage, 
      t,
      availableLanguages: SUPPORTED_LANGUAGES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};