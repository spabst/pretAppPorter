import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { useAuth } from '@/contexts/AuthContext';
import { environment } from '@/lib/supabase';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthDemoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();
  const { signIn, signOut, user, userProfile } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const quickDevLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Use John Doe's credentials for quick dev access
      const result = await signIn('john@example.com', 'password123');
      
      if (result.error) {
        Alert.alert('Login Failed', result.error);
      } else {
        Alert.alert('Success!', 'Logged in as John Doe (dev user)', [
          { text: 'Go to Settings', onPress: () => router.push('/(tabs)/settings') }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Make sure the seed user exists and has a password set.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const showTestingGuide = () => {
    Alert.alert(
      '🧪 Testing Guide',
      'Complete Testing Instructions:\n\n' +
      '📱 REGISTRATION:\n' +
      '1. Phone: Try invalid (123) vs valid (1234567890)\n' +
      '2. Code: Enter any 6-digit number (123456)\n' +
      '3. Profile: Test email validation\n' +
      '4. Permissions: Allow or skip contacts\n\n' +
      '🔐 LOGIN:\n' +
      '• Email: john@example.com\n' +
      '• Password: password123\n\n' +
      '🌍 LANGUAGES:\n' +
      '• Test in different languages via Settings\n\n' +
      '📋 Check console for validation logs!',
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <IconSymbol name="flask" size={64} color={colors.primary} />
        
        <ThemedText style={[styles.title, { color: colors.text }]}>
          Authentication Testing
        </ThemedText>
        
        <ThemedText style={[styles.description, { color: gray[500] }]}>
          Test the complete registration and login workflows with validation
        </ThemedText>

        {/* Environment Info */}
        <View style={[styles.environmentCard, { 
          backgroundColor: environment.isDevelopment ? '#FEF3C7' : '#DCFCE7',
          borderColor: environment.isDevelopment ? '#F59E0B' : '#22C55E'
        }]}>
          <IconSymbol 
            name={environment.isDevelopment ? "wrench.and.screwdriver" : "globe"} 
            size={16} 
            color={environment.isDevelopment ? '#F59E0B' : '#22C55E'} 
          />
          <ThemedText style={[styles.environmentText, { 
            color: environment.isDevelopment ? '#92400E' : '#15803D'
          }]}>
            {environment.isDevelopment ? '🛠️ Development Mode' : '🌍 Production Mode'} 
            {environment.isLocalhost && ' (Local Supabase)'}
          </ThemedText>
        </View>

        {/* Current Auth Status */}
        {user && userProfile ? (
          <View style={[styles.statusCard, { backgroundColor: '#DCFCE7', borderColor: '#22C55E' }]}>
            <IconSymbol name="checkmark.circle" size={20} color="#22C55E" />
            <ThemedText style={[styles.statusText, { color: '#15803D' }]}>
              ✅ Logged in as: {userProfile.name}
            </ThemedText>
          </View>
        ) : (
          <View style={[styles.statusCard, { backgroundColor: '#FEE2E2', borderColor: '#EF4444' }]}>
            <IconSymbol name="xmark.circle" size={20} color="#EF4444" />
            <ThemedText style={[styles.statusText, { color: '#DC2626' }]}>
              ❌ Not authenticated
            </ThemedText>
          </View>
        )}

        <TouchableOpacity
          style={[styles.infoButton, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }]}
          onPress={showTestingGuide}
        >
          <IconSymbol name="info.circle" size={20} color="#F59E0B" />
          <ThemedText style={[styles.infoText, { color: '#92400E' }]}>
            📋 View Testing Guide
          </ThemedText>
        </TouchableOpacity>

        {/* Quick Dev Login Button - Only show in development */}
        {!user && environment.isDevelopment && environment.isLocalhost && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#8B5CF6' }]}
            onPress={quickDevLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <IconSymbol name="bolt.fill" size={20} color="white" />
            )}
            <ThemedText style={styles.buttonText}>
              {isLoggingIn ? 'Logging in...' : '⚡ Quick Dev Login'}
            </ThemedText>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        {user && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#EF4444' }]}
            onPress={async () => {
              await signOut();
              Alert.alert('Logged Out', 'You have been logged out successfully');
            }}
          >
            <IconSymbol name="arrow.right.square" size={20} color="white" />
            <ThemedText style={styles.buttonText}>
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            console.log('🧪 Starting Registration Test');
            router.push('/auth/register');
          }}
        >
          <IconSymbol name="person.badge.plus" size={20} color="white" />
          <ThemedText style={styles.buttonText}>
            {t('auth.create_account') || 'Create Account'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => {
            console.log('🧪 Starting Login Test');
            router.push('/auth/login');
          }}
        >
          <IconSymbol name="person.fill" size={20} color={colors.text} />
          <ThemedText style={[styles.buttonTextSecondary, { color: colors.text }]}>
            {t('auth.sign_in') || 'Sign In'}
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.testCases}>
          <ThemedText style={[styles.testTitle, { color: colors.text }]}>
            Quick Test Cases:
          </ThemedText>
          
          <View style={styles.testCase}>
            <IconSymbol name="checkmark.circle" size={16} color="#22C55E" />
            <ThemedText style={[styles.testText, { color: gray[600] }]}>
              Phone: 1234567890 (valid) vs 123 (invalid)
            </ThemedText>
          </View>
          
          <View style={styles.testCase}>
            <IconSymbol name="checkmark.circle" size={16} color="#22C55E" />
            <ThemedText style={[styles.testText, { color: gray[600] }]}>
              Email: test@example.com (valid) vs invalid (error)
            </ThemedText>
          </View>
          
          <View style={styles.testCase}>
            <IconSymbol name="checkmark.circle" size={16} color="#22C55E" />
            <ThemedText style={[styles.testText, { color: gray[600] }]}>
              Code: Any 6-digit number works (123456)
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="arrow.left" size={16} color={colors.primary} />
          <ThemedText style={[styles.linkText, { color: colors.primary }]}>
            Back to Settings
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
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
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
  testCases: {
    width: '100%',
    marginTop: 24,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  testCase: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  testText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
    width: '100%',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  environmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
    width: '100%',
  },
  environmentText: {
    fontSize: 12,
    fontWeight: '500',
  },
});