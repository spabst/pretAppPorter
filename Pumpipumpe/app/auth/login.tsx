import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = t('auth.email_invalid') || 'Please enter a valid email';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = t('auth.password_short') || 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // In production: Authenticate user
        console.log('Logging in with:', formData.email);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert(t('error.generic'), 'Failed to sign in');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    try {
      // In production: Implement social auth
      console.log('Social auth with:', provider);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(t('error.generic'), `Failed to sign in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            {t('auth.welcome_back') || 'Welcome back'}
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: gray[500] }]}>
            {t('auth.sign_in_desc') || 'Sign in to your account'}
          </ThemedText>
        </View>

        <View style={styles.content}>
          {/* Email Field */}
          <View style={styles.formField}>
            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
              {t('profile.email')}
            </ThemedText>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              placeholder={t('profile.email_placeholder')}
              placeholderTextColor={gray[400]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            {errors.email && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.email}</ThemedText>}
          </View>

          {/* Password Field */}
          <View style={styles.formField}>
            <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
              {t('auth.password') || 'Password'}
            </ThemedText>
            <TextInput
              style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              value={formData.password}
              onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
              placeholder={t('auth.password_placeholder') || 'Enter your password'}
              placeholderTextColor={gray[400]}
              secureTextEntry
              autoComplete="password"
            />
            {errors.password && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.password}</ThemedText>}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotButton}>
            <ThemedText style={[styles.linkText, { color: colors.primary }]}>
              {t('auth.forgot_password') || 'Forgot password?'}
            </ThemedText>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={styles.primaryButtonText}>
              {isLoading ? (t('loading') || 'Loading...') : (t('auth.sign_in') || 'Sign In')}
            </ThemedText>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <ThemedText style={[styles.dividerText, { color: gray[500] }]}>
              {t('auth.or') || 'or'}
            </ThemedText>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialAuth('google')}
              disabled={isLoading}
            >
              <IconSymbol name="globe" size={20} color={colors.text} />
              <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Google</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => handleSocialAuth('facebook')}
              disabled={isLoading}
            >
              <IconSymbol name="person.2.fill" size={20} color={colors.text} />
              <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Facebook</ThemedText>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => handleSocialAuth('apple')}
                disabled={isLoading}
              >
                <IconSymbol name="applelogo" size={20} color={colors.text} />
                <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Apple</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: gray[500] }]}>
            {t('auth.no_account') || "Don't have an account? "}
          </ThemedText>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <ThemedText style={[styles.linkText, { color: colors.primary }]}>
              {t('auth.sign_up') || 'Sign up'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  primaryButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 16,
  },
});