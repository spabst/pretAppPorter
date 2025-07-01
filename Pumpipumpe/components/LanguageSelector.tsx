import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LanguageSelectorProps {
  style?: any;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { language, setLanguage, t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.label, { color: textColor }]}>
        {t('settings.language')}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'it' && { backgroundColor: tintColor },
            { borderColor: tintColor }
          ]}
          onPress={() => handleLanguageChange('it')}
        >
          <Text
            style={[
              styles.buttonText,
              { color: language === 'it' ? 'white' : textColor }
            ]}
          >
            🇮🇹 {t('language.italian')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'fr' && { backgroundColor: tintColor },
            { borderColor: tintColor }
          ]}
          onPress={() => handleLanguageChange('fr')}
        >
          <Text
            style={[
              styles.buttonText,
              { color: language === 'fr' ? 'white' : textColor }
            ]}
          >
            🇫🇷 {t('language.french')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});