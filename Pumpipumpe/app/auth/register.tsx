import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/contexts/AuthContext';
import { PublicRoute } from '@/components/AuthGuard';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';

type RegistrationStep = 'phone' | 'verification' | 'profile' | 'permissions';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();
  const { signUp, signInWithOtp, verifyOtp, loading } = useAuth();

  const [currentStep, setCurrentStep] = useState<RegistrationStep>('phone');

  // Form data
  const [formData, setFormData] = useState({
    phone: '',
    countryCode: '+39',
    verificationCode: '',
    email: '',
    password: '',
    name: '',
    address: '',
    location: { lat: 0, lng: 0 } as { lat: number; lng: number },
    profilePicture: null as string | null,
  });

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{8,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!validatePhone(formData.phone)) {
      newErrors.phone = t('auth.phone_invalid') || 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const fullPhone = formData.countryCode + formData.phone;
        const { error } = await signInWithOtp(fullPhone);
        
        if (error) {
          Alert.alert(t('error.generic'), error);
        } else {
          setCurrentStep('verification');
          setErrors({});
        }
      } catch (error) {
        Alert.alert(t('error.generic'), 'Failed to send verification code');
      }
    }
  };

  const handleVerificationSubmit = async () => {
    if (formData.verificationCode.length !== 6) {
      setErrors({ verification: t('auth.code_invalid') || 'Please enter the 6-digit code' });
      return;
    }

    try {
      const fullPhone = formData.countryCode + formData.phone;
      const { error } = await verifyOtp(fullPhone, formData.verificationCode);
      
      if (error) {
        setErrors({ verification: error });
      } else {
        setCurrentStep('profile');
        setErrors({});
      }
    } catch (error) {
      setErrors({ verification: t('auth.code_incorrect') || 'Incorrect verification code' });
    }
  };

  const handleProfileSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('auth.name_required') || 'Name is required';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = t('auth.email_invalid') || 'Please enter a valid email';
    }
    
    if (formData.password.length < 6) {
      newErrors.password = t('auth.password_short') || 'Password must be at least 6 characters';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = t('auth.address_required') || 'Address is required';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Get location from address
      await getLocationFromAddress();
      setCurrentStep('permissions');
    }
  };

  const getLocationFromAddress = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        // Try to geocode the address
        const geocoded = await Location.geocodeAsync(formData.address);
        
        if (geocoded.length > 0) {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: geocoded[0].latitude,
              lng: geocoded[0].longitude
            }
          }));
        } else {
          // Fallback: use current location if address geocoding fails
          const location = await Location.getCurrentPositionAsync({});
          setFormData(prev => ({
            ...prev,
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            }
          }));
        }
      } else {
        // Default to Zurich coordinates if no permission
        setFormData(prev => ({
          ...prev,
          location: { lat: 47.3769, lng: 8.5417 }
        }));
      }
    } catch (error) {
      console.error('Location error:', error);
      // Default to Zurich coordinates on error
      setFormData(prev => ({
        ...prev,
        location: { lat: 47.3769, lng: 8.5417 }
      }));
    }
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert(
        t('auth.photo_permission') || 'Photo Permission',
        t('auth.photo_permission_desc') || 'Permission to access photos is required'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  const handleContactsPermission = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status === 'granted') {
        // In production: Upload contacts for friend discovery
        console.log('Contacts permission granted - syncing contacts');
        
        // Complete registration
        await completeRegistration();
      } else {
        // Allow user to skip this step
        Alert.alert(
          t('auth.contacts_optional') || 'Optional Step',
          t('auth.contacts_optional_desc') || 'You can enable this later in settings',
          [
            { text: t('action.cancel'), style: 'cancel' },
            { text: t('action.skip') || 'Skip', onPress: completeRegistration }
          ]
        );
      }
    } catch (error) {
      console.error('Contacts permission error:', error);
      await completeRegistration();
    }
  };

  const completeRegistration = async () => {
    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        {
          name: formData.name,
          phone: formData.countryCode + formData.phone,
          address: formData.address,
          location: formData.location
        }
      );
      
      if (error) {
        Alert.alert(t('error.generic'), error);
      } else {
        Alert.alert(
          t('auth.welcome') || 'Welcome to Pumpipumpe!',
          t('auth.registration_complete') || 'Your account has been created successfully',
          [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
        );
      }
    } catch (error) {
      Alert.alert(t('error.generic'), 'Failed to create account');
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      // For social auth in registration, redirect to main app
      // The user profile will be created automatically by the AuthContext
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(t('error.generic'), `Failed to sign in with ${provider}`);
    }
  };

  const renderPhoneStep = () => (
    <View style={styles.stepContainer}>
      <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
        {t('auth.enter_phone') || 'Enter your phone number'}
      </ThemedText>
      <ThemedText style={[styles.stepDescription, { color: gray[500] }]}>
        {t('auth.phone_desc') || 'We\'ll send you a verification code'}
      </ThemedText>

      <View style={styles.phoneContainer}>
        <TextInput
          style={[styles.countryCode, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.countryCode}
          onChangeText={(text) => setFormData(prev => ({ ...prev, countryCode: text }))}
          placeholder="+39"
          placeholderTextColor={gray[400]}
        />
        <TextInput
          style={[styles.phoneInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.phone}
          onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
          placeholder="123 456 7890"
          placeholderTextColor={gray[400]}
          keyboardType="phone-pad"
          autoFocus
        />
      </View>
      
      {errors.phone && (
        <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.phone}</ThemedText>
      )}

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handlePhoneSubmit}
        disabled={loading}
      >
        <ThemedText style={styles.primaryButtonText}>
          {loading ? (t('loading') || 'Loading...') : (t('auth.send_code') || 'Send Code')}
        </ThemedText>
      </TouchableOpacity>

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
          disabled={loading}
        >
          <IconSymbol name="globe" size={20} color={colors.text} />
          <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Google</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => handleSocialAuth('facebook')}
          disabled={loading}
        >
          <IconSymbol name="person.2.fill" size={20} color={colors.text} />
          <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Facebook</ThemedText>
        </TouchableOpacity>

        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => handleSocialAuth('apple')}
            disabled={loading}
          >
            <IconSymbol name="applelogo" size={20} color={colors.text} />
            <ThemedText style={[styles.socialButtonText, { color: colors.text }]}>Apple</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderVerificationStep = () => (
    <View style={styles.stepContainer}>
      <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
        {t('auth.verify_phone') || 'Verify your phone'}
      </ThemedText>
      <ThemedText style={[styles.stepDescription, { color: gray[500] }]}>
        {t('auth.verification_desc') || `We sent a code to ${formData.countryCode} ${formData.phone}`}
      </ThemedText>

      <TextInput
        style={[styles.codeInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        value={formData.verificationCode}
        onChangeText={(text) => setFormData(prev => ({ ...prev, verificationCode: text }))}
        placeholder="123456"
        placeholderTextColor={gray[400]}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
      />

      {errors.verification && (
        <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.verification}</ThemedText>
      )}

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handleVerificationSubmit}
        disabled={loading}
      >
        <ThemedText style={styles.primaryButtonText}>
          {loading ? (t('loading') || 'Loading...') : (t('auth.verify') || 'Verify')}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => setCurrentStep('phone')}
      >
        <ThemedText style={[styles.linkText, { color: colors.primary }]}>
          {t('auth.change_phone') || 'Change phone number'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderProfileStep = () => (
    <View style={styles.stepContainer}>
      <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
        {t('auth.complete_profile') || 'Complete your profile'}
      </ThemedText>
      <ThemedText style={[styles.stepDescription, { color: gray[500] }]}>
        {t('auth.profile_desc') || 'Help your neighbors know you better'}
      </ThemedText>

      {/* Profile Picture */}
      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleImagePicker}>
        {formData.profilePicture ? (
          <Image source={{ uri: formData.profilePicture }} style={styles.profilePicture} />
        ) : (
          <View style={[styles.profilePicturePlaceholder, { backgroundColor: gray[200] }]}>
            <IconSymbol name="camera.fill" size={32} color={gray[500]} />
          </View>
        )}
        <ThemedText style={[styles.profilePictureText, { color: colors.primary }]}>
          {t('auth.add_photo') || 'Add Photo'}
        </ThemedText>
      </TouchableOpacity>

      {/* Form Fields */}
      <View style={styles.formField}>
        <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
          {t('profile.name')} *
        </ThemedText>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.name}
          onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
          placeholder={t('profile.name_placeholder')}
          placeholderTextColor={gray[400]}
        />
        {errors.name && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.name}</ThemedText>}
      </View>

      <View style={styles.formField}>
        <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
          {t('profile.email')} *
        </ThemedText>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.email}
          onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
          placeholder={t('profile.email_placeholder')}
          placeholderTextColor={gray[400]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.email}</ThemedText>}
      </View>

      <View style={styles.formField}>
        <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
          {t('auth.password') || 'Password'} *
        </ThemedText>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.password}
          onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
          placeholder={t('auth.password_placeholder') || 'Enter password'}
          placeholderTextColor={gray[400]}
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.password}</ThemedText>}
      </View>

      <View style={styles.formField}>
        <ThemedText style={[styles.fieldLabel, { color: colors.text }]}>
          {t('profile.address')} *
        </ThemedText>
        <TextInput
          style={[styles.textInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={formData.address}
          onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
          placeholder={t('profile.address_placeholder')}
          placeholderTextColor={gray[400]}
          multiline
        />
        {errors.address && <ThemedText style={[styles.errorText, { color: '#EF4444' }]}>{errors.address}</ThemedText>}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handleProfileSubmit}
      >
        <ThemedText style={styles.primaryButtonText}>
          {t('action.continue') || 'Continue'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderPermissionsStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.permissionIcon}>
        <IconSymbol name="person.2.fill" size={48} color={colors.primary} />
      </View>
      
      <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
        {t('auth.find_friends') || 'Find your friends'}
      </ThemedText>
      <ThemedText style={[styles.stepDescription, { color: gray[500] }]}>
        {t('auth.friends_desc') || 'Allow access to your contacts to find friends who are already using Pumpipumpe'}
      </ThemedText>

      <View style={styles.permissionsList}>
        <View style={styles.permissionItem}>
          <IconSymbol name="checkmark.circle.fill" size={20} color="#22C55E" />
          <ThemedText style={[styles.permissionText, { color: colors.text }]}>
            {t('auth.contacts_secure') || 'Your contacts are stored securely'}
          </ThemedText>
        </View>
        
        <View style={styles.permissionItem}>
          <IconSymbol name="checkmark.circle.fill" size={20} color="#22C55E" />
          <ThemedText style={[styles.permissionText, { color: colors.text }]}>
            {t('auth.contacts_private') || 'We never share your contacts with others'}
          </ThemedText>
        </View>
        
        <View style={styles.permissionItem}>
          <IconSymbol name="checkmark.circle.fill" size={20} color="#22C55E" />
          <ThemedText style={[styles.permissionText, { color: colors.text }]}>
            {t('auth.contacts_optional') || 'You can disable this anytime in settings'}
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.primary }]}
        onPress={handleContactsPermission}
        disabled={loading}
      >
        <ThemedText style={styles.primaryButtonText}>
          {loading ? (t('loading') || 'Loading...') : (t('auth.allow_contacts') || 'Allow Contacts')}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={completeRegistration}
      >
        <ThemedText style={[styles.linkText, { color: gray[500] }]}>
          {t('auth.skip_for_now') || 'Skip for now'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const getStepContent = () => {
    switch (currentStep) {
      case 'phone': return renderPhoneStep();
      case 'verification': return renderVerificationStep();
      case 'profile': return renderProfileStep();
      case 'permissions': return renderPermissionsStep();
    }
  };

  return (
    <PublicRoute>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          {currentStep !== 'phone' && (
            <TouchableOpacity
              onPress={() => {
                if (currentStep === 'verification') setCurrentStep('phone');
                else if (currentStep === 'profile') setCurrentStep('verification');
                else if (currentStep === 'permissions') setCurrentStep('profile');
              }}
              style={[styles.backButton, { backgroundColor: gray[100] }]}
            >
              <IconSymbol name="chevron.left" size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          
          <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
            {t('auth.create_account') || 'Create Account'}
          </ThemedText>
          
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {['phone', 'verification', 'profile', 'permissions'].map((step, index) => (
            <View
              key={step}
              style={[
                styles.progressDot,
                {
                  backgroundColor: ['phone', 'verification', 'profile', 'permissions'].indexOf(currentStep) >= index
                    ? colors.primary
                    : gray[300]
                }
              ]}
            />
          ))}
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {getStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </PublicRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: '100%',
  },
  countryCode: {
    width: 80,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  phoneInput: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  codeInput: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 16,
  },
  primaryButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    padding: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24,
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
    width: '100%',
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
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  formField: {
    width: '100%',
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
  permissionIcon: {
    marginBottom: 24,
  },
  permissionsList: {
    alignSelf: 'stretch',
    marginBottom: 32,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  permissionText: {
    fontSize: 16,
    flex: 1,
  },
});