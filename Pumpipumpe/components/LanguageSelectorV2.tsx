import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { SupportedLanguage } from '@/i18n/languages';
import { useThemeColor } from '@/hooks/useThemeColor';

interface LanguageSelectorProps {
  style?: any;
  compact?: boolean; // For smaller layouts
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  style, 
  compact = false 
}) => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
  };

  const renderLanguageButton = (langCode: SupportedLanguage) => {
    const langInfo = availableLanguages[langCode];
    const isSelected = language === langCode;
    
    return (
      <TouchableOpacity
        key={langCode}
        style={[
          compact ? styles.compactButton : styles.languageButton,
          isSelected && { backgroundColor: tintColor },
          { borderColor: tintColor }
        ]}
        onPress={() => handleLanguageChange(langCode)}
      >
        <Text
          style={[
            compact ? styles.compactButtonText : styles.buttonText,
            { color: isSelected ? 'white' : textColor }
          ]}
        >
          {compact ? langInfo.flag : `${langInfo.flag} ${langInfo.name}`}
        </Text>
      </TouchableOpacity>
    );
  };

  if (compact) {
    return (
      <View style={[styles.compactContainer, style]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.compactScrollContent}
        >
          {Object.keys(availableLanguages).map(langCode => 
            renderLanguageButton(langCode as SupportedLanguage)
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.label, { color: textColor }]}>
        {t('settings.language')}
      </Text>
      <View style={styles.buttonContainer}>
        {Object.keys(availableLanguages).map(langCode => 
          renderLanguageButton(langCode as SupportedLanguage)
        )}
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
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 80,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  compactContainer: {
    height: 40,
  },
  compactScrollContent: {
    gap: 6,
    paddingHorizontal: 4,
  },
  compactButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    height: 32,
  },
  compactButtonText: {
    fontSize: 16,
  },
});