import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { UserPreferences } from '../types';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  // Authentication state
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  userPreferences: UserPreferences | null;
  loading: boolean;
  
  // Authentication methods
  signUp: (email: string, password: string, userData: {
    name: string;
    phone?: string;
    address: string;
    location: { lat: number; lng: number };
  }) => Promise<{ error?: string }>;
  
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  
  signInWithOtp: (phone: string) => Promise<{ error?: string }>;
  
  verifyOtp: (phone: string, token: string) => Promise<{ error?: string }>;
  
  signInWithOAuth: (provider: 'google' | 'facebook' | 'apple') => Promise<{ error?: string }>;
  
  signOut: () => Promise<void>;
  
  resetPassword: (email: string) => Promise<{ error?: string }>;
  
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: string }>;
  
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<{ error?: string }>;
  
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
        loadUserPreferences(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
          await loadUserPreferences(session.user.id);
        } else {
          setUserProfile(null);
          setUserPreferences(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const loadUserPreferences = async (userId: string) => {
    try {
      // First get the user profile to get the user_id
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('auth_id', userId)
        .single();

      if (userError || !userData) {
        console.error('Error loading user for preferences:', userError);
        return;
      }

      // Check if user_preferences table exists first
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userData.id)
        .single();

      if (error) {
        // If table doesn't exist or no preferences exist, set defaults
        if (error.code === 'PGRST116' || error.code === '42P01') {
          console.log('User preferences table not found or no preferences exist, using defaults');
          // Set default preferences without saving to DB
          const defaultPreferences: UserPreferences = {
            id: 'temp-id',
            userId: userData.id,
            notifications: true,
            emailUpdates: false,
            shareLocation: true,
            publicProfile: true,
            autoAcceptRequests: false,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setUserPreferences(defaultPreferences);
        } else {
          console.error('Error loading user preferences:', error);
        }
        return;
      }

      // Transform database format to app format
      const preferences: UserPreferences = {
        id: data.id,
        userId: data.user_id,
        notifications: data.notifications,
        emailUpdates: data.email_updates,
        shareLocation: data.share_location,
        publicProfile: data.public_profile,
        autoAcceptRequests: data.auto_accept_requests,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setUserPreferences(preferences);
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  const createDefaultPreferences = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert({
          user_id: userId,
          notifications: true,
          email_updates: false,
          share_location: true,
          public_profile: true,
          auto_accept_requests: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating default preferences:', error);
        return;
      }

      // Transform and set the new preferences
      const preferences: UserPreferences = {
        id: data.id,
        userId: data.user_id,
        notifications: data.notifications,
        emailUpdates: data.email_updates,
        shareLocation: data.share_location,
        publicProfile: data.public_profile,
        autoAcceptRequests: data.auto_accept_requests,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setUserPreferences(preferences);
    } catch (error) {
      console.error('Error creating default preferences:', error);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData: {
      name: string;
      phone?: string;
      address: string;
      location: { lat: number; lng: number };
    }
  ) => {
    try {
      setLoading(true);

      // Sign up with Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
          }
        }
      });

      if (authError) {
        return { error: authError.message };
      }

      if (!data.user) {
        return { error: 'Registration failed. Please try again.' };
      }

      // Create user profile in database
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          auth_id: data.user.id,
          email: email,
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          location: `POINT(${userData.location.lng} ${userData.location.lat})`,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Note: User is created in auth but profile creation failed
        // You might want to retry or handle this case
        return { error: 'Account created but profile setup failed. Please contact support.' };
      }

      return {};
    } catch (error) {
      console.error('Registration error:', error);
      return { error: 'An unexpected error occurred during registration.' };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'An unexpected error occurred during sign in.' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOtp = async (phone: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('OTP sign in error:', error);
      return { error: 'Failed to send verification code.' };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (phone: string, token: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('OTP verification error:', error);
      return { error: 'Invalid verification code.' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'facebook' | 'apple') => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'pumpipumpe://auth/callback', // Deep link for mobile
        }
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('OAuth sign in error:', error);
      return { error: `Failed to sign in with ${provider}.` };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUserProfile(null);
      setUserPreferences(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'pumpipumpe://auth/reset-password',
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Password reset error:', error);
      return { error: 'Failed to send password reset email.' };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user || !userProfile) {
        return { error: 'No user logged in' };
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('auth_id', user.id);

      if (error) {
        return { error: error.message };
      }

      // Refresh profile
      await loadUserProfile(user.id);
      return {};
    } catch (error) {
      console.error('Profile update error:', error);
      return { error: 'Failed to update profile.' };
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      if (!user || !userProfile || !userPreferences) {
        return { error: 'No user logged in or preferences not loaded' };
      }

      // If we're using temporary preferences (table doesn't exist), just update local state
      if (userPreferences.id === 'temp-id') {
        console.log('User preferences table not available, updating local state only');
        const updatedPreferences = { ...userPreferences, ...updates };
        setUserPreferences(updatedPreferences);
        return {};
      }

      // Transform app format to database format
      const dbUpdates: any = {};
      if (updates.notifications !== undefined) dbUpdates.notifications = updates.notifications;
      if (updates.emailUpdates !== undefined) dbUpdates.email_updates = updates.emailUpdates;
      if (updates.shareLocation !== undefined) dbUpdates.share_location = updates.shareLocation;
      if (updates.publicProfile !== undefined) dbUpdates.public_profile = updates.publicProfile;
      if (updates.autoAcceptRequests !== undefined) dbUpdates.auto_accept_requests = updates.autoAcceptRequests;

      const { error } = await supabase
        .from('user_preferences')
        .update(dbUpdates)
        .eq('user_id', userProfile.id);

      if (error) {
        return { error: error.message };
      }

      // Refresh preferences
      await loadUserPreferences(user.id);
      return {};
    } catch (error) {
      console.error('Preferences update error:', error);
      return { error: 'Failed to update preferences.' };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
      await loadUserPreferences(user.id);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    userProfile,
    userPreferences,
    loading,
    signUp,
    signIn,
    signInWithOtp,
    verifyOtp,
    signInWithOAuth,
    signOut,
    resetPassword,
    updateProfile,
    updatePreferences,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}