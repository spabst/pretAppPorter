import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert, 
  SafeAreaView,
  Image 
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LanguageSelector } from '@/components/LanguageSelectorV2';
import { useLanguage } from '@/contexts/LanguageContextV2';
import { Colors, createGrayHelper } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const gray = createGrayHelper(colors);
  const { t } = useLanguage();

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    phone: '+39 123 456 7890',
    address: 'Via Roma 123, 00100 Roma, Italy',
    avatar: 'https://via.placeholder.com/120x120?text=MR',
    bio: 'Passionate about sharing and helping neighbors'
  });

  // App preferences state
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    shareLocation: true,
    autoAcceptRequests: false,
    publicProfile: true
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    Alert.alert(
      t('action.save'),
      t('success.profile_updated') || 'Profile updated successfully!',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const handleImagePicker = () => {
    Alert.alert(
      t('profile.change_photo') || 'Change Photo',
      t('profile.photo_options') || 'Choose how you want to update your profile photo',
      [
        { text: t('action.cancel'), style: 'cancel' },
        { text: t('profile.camera') || 'Camera', onPress: () => console.log('Camera') },
        { text: t('profile.gallery') || 'Gallery', onPress: () => console.log('Gallery') }
      ]
    );
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <ThemedText style={[styles.sectionTitle, { color: colors.text }]}>
        {title}
      </ThemedText>
      <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
        {children}
      </View>
    </View>
  );

  const renderInputField = (
    label: string, 
    value: string, 
    onChangeText: (text: string) => void,
    placeholder?: string,
    multiline = false
  ) => (
    <View style={styles.inputGroup}>
      <ThemedText style={[styles.inputLabel, { color: colors.text }]}>
        {label}
      </ThemedText>
      <TextInput
        style={[
          styles.textInput,
          multiline && styles.textArea,
          { 
            backgroundColor: isEditing ? colors.background : gray[50],
            borderColor: colors.border,
            color: colors.text 
          }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={gray[400]}
        editable={isEditing}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  const renderToggleOption = (
    label: string,
    description: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <TouchableOpacity style={styles.toggleOption} onPress={onToggle}>
      <View style={styles.toggleInfo}>
        <ThemedText style={[styles.toggleLabel, { color: colors.text }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.toggleDescription, { color: gray[500] }]}>
          {description}
        </ThemedText>
      </View>
      <View style={[
        styles.toggle,
        value && { backgroundColor: colors.primary },
        !value && { backgroundColor: gray[200] }
      ]}>
        <View style={[
          styles.toggleThumb,
          value && styles.toggleThumbActive
        ]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <ThemedText style={[styles.title, { color: colors.text }]}>
          {t('nav.settings') || 'Settings'}
        </ThemedText>
        <TouchableOpacity onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <ThemedText style={[styles.editButton, { color: colors.primary }]}>
            {isEditing ? t('action.save') : (t('action.edit') || 'Edit')}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        {renderSection(t('profile.title') || 'Profile', (
          <>
            {/* Avatar */}
            <TouchableOpacity 
              style={styles.avatarContainer} 
              onPress={isEditing ? handleImagePicker : undefined}
            >
              <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
              {isEditing && (
                <View style={[styles.avatarOverlay, { backgroundColor: colors.primary }]}>
                  <IconSymbol name="camera.fill" size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>

            {/* Profile Fields */}
            {renderInputField(
              t('profile.name') || 'Name',
              userProfile.name,
              (text) => setUserProfile(prev => ({ ...prev, name: text })),
              t('profile.name_placeholder') || 'Enter your name'
            )}

            {renderInputField(
              t('profile.email') || 'Email',
              userProfile.email,
              (text) => setUserProfile(prev => ({ ...prev, email: text })),
              t('profile.email_placeholder') || 'Enter your email'
            )}

            {renderInputField(
              t('profile.phone') || 'Phone',
              userProfile.phone,
              (text) => setUserProfile(prev => ({ ...prev, phone: text })),
              t('profile.phone_placeholder') || 'Enter your phone number'
            )}

            {renderInputField(
              t('profile.address') || 'Address',
              userProfile.address,
              (text) => setUserProfile(prev => ({ ...prev, address: text })),
              t('profile.address_placeholder') || 'Enter your address'
            )}

            {renderInputField(
              t('profile.bio') || 'Bio',
              userProfile.bio,
              (text) => setUserProfile(prev => ({ ...prev, bio: text })),
              t('profile.bio_placeholder') || 'Tell us about yourself',
              true
            )}
          </>
        ))}

        {/* Language Section */}
        {renderSection(t('settings.language') || 'Language', (
          <LanguageSelector />
        ))}

        {/* Notifications Section */}
        {renderSection(t('settings.notifications') || 'Notifications', (
          <>
            {renderToggleOption(
              t('settings.push_notifications') || 'Push Notifications',
              t('settings.push_description') || 'Receive notifications about borrow requests',
              preferences.notifications,
              () => togglePreference('notifications')
            )}
            
            {renderToggleOption(
              t('settings.email_updates') || 'Email Updates',
              t('settings.email_description') || 'Get weekly updates via email',
              preferences.emailUpdates,
              () => togglePreference('emailUpdates')
            )}
          </>
        ))}

        {/* Privacy Section */}
        {renderSection(t('settings.privacy') || 'Privacy', (
          <>
            {renderToggleOption(
              t('settings.share_location') || 'Share Location',
              t('settings.location_description') || 'Allow neighbors to see your approximate location',
              preferences.shareLocation,
              () => togglePreference('shareLocation')
            )}

            {renderToggleOption(
              t('settings.public_profile') || 'Public Profile',
              t('settings.profile_description') || 'Make your profile visible to other users',
              preferences.publicProfile,
              () => togglePreference('publicProfile')
            )}

            {renderToggleOption(
              t('settings.auto_accept') || 'Auto-accept Requests',
              t('settings.auto_description') || 'Automatically approve borrow requests',
              preferences.autoAcceptRequests,
              () => togglePreference('autoAcceptRequests')
            )}
          </>
        ))}

        {/* Account Section */}
        {renderSection(t('settings.account') || 'Account', (
          <>
            <TouchableOpacity style={styles.menuItem}>
              <ThemedText style={[styles.menuText, { color: colors.text }]}>
                {t('settings.change_password') || 'Change Password'}
              </ThemedText>
              <IconSymbol name="chevron.right" size={16} color={gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <ThemedText style={[styles.menuText, { color: colors.text }]}>
                {t('settings.delete_account') || 'Delete Account'}
              </ThemedText>
              <IconSymbol name="chevron.right" size={16} color={gray[400]} />
            </TouchableOpacity>
          </>
        ))}

        {/* About Section */}
        {renderSection(t('settings.about') || 'About', (
          <>
            <TouchableOpacity style={styles.menuItem}>
              <ThemedText style={[styles.menuText, { color: colors.text }]}>
                {t('settings.help') || 'Help & Support'}
              </ThemedText>
              <IconSymbol name="chevron.right" size={16} color={gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <ThemedText style={[styles.menuText, { color: colors.text }]}>
                {t('settings.privacy_policy') || 'Privacy Policy'}
              </ThemedText>
              <IconSymbol name="chevron.right" size={16} color={gray[400]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <ThemedText style={[styles.menuText, { color: colors.text }]}>
                {t('settings.terms') || 'Terms of Service'}
              </ThemedText>
              <IconSymbol name="chevron.right" size={16} color={gray[400]} />
            </TouchableOpacity>

            <View style={styles.versionInfo}>
              <ThemedText style={[styles.versionText, { color: gray[500] }]}>
                Pumpipumpe v1.0.0
              </ThemedText>
            </View>
          </>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  editButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionContent: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F5F9',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  toggleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  versionInfo: {
    alignItems: 'center',
    paddingTop: 16,
  },
  versionText: {
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
});