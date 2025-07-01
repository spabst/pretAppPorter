import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthDemoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ThemedText style={[styles.title, { color: colors.text }]}>
          Authentication Demo
        </ThemedText>
        
        <ThemedText style={[styles.description, { color: gray[500] }]}>
          Try out the registration and login flows
        </ThemedText>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/auth/register')}
        >
          <ThemedText style={styles.buttonText}>
            {t('auth.create_account') || 'Create Account'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => router.push('/auth/login')}
        >
          <ThemedText style={[styles.buttonTextSecondary, { color: colors.text }]}>
            {t('auth.sign_in') || 'Sign In'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.back()}
        >
          <ThemedText style={[styles.linkText, { color: colors.primary }]}>
            Back to App
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 24,
    padding: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});