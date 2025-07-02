import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  // Authentication state
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
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
  
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
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
        } else {
          setUserProfile(null);
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

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithOtp,
    verifyOtp,
    signInWithOAuth,
    signOut,
    resetPassword,
    updateProfile,
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