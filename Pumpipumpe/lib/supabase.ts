import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Environment detection
const isDevelopment = __DEV__;
const isLocalhost = process.env.EXPO_PUBLIC_SUPABASE_URL?.includes('127.0.0.1') || 
                   process.env.EXPO_PUBLIC_SUPABASE_URL?.includes('localhost');

// Environment-specific configuration
const getSupabaseConfig = () => {
  if (isDevelopment && isLocalhost) {
    // Local development
    return {
      url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      environment: 'development' as const
    };
  } else {
    // Production or staging
    return {
      url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
      anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      environment: 'production' as const
    };
  }
};

const config = getSupabaseConfig();

// Validate required environment variables
if (!config.url || !config.anonKey) {
  throw new Error(
    `Missing Supabase configuration for ${config.environment} environment. ` +
    'Please check your .env file and ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set.'
  );
}

console.log(`🔧 Supabase initialized in ${config.environment} mode:`, {
  url: config.url,
  anonKey: config.anonKey.substring(0, 20) + '...'
});

export const supabase = createClient(config.url, config.anonKey, {
  auth: {
    storage: Platform.OS !== 'web' ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});

// Export environment info for use in other parts of the app
export const environment = {
  isDevelopment,
  isLocalhost,
  mode: config.environment,
  supabaseUrl: config.url
};

// Database Types (based on your existing TypeScript interfaces)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar: string | null;
          bio: string | null;
          location: unknown; // PostGIS geography point
          address: string;
          phone: string | null;
          auth_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar?: string | null;
          bio?: string | null;
          location: unknown;
          address: string;
          phone?: string | null;
          auth_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar?: string | null;
          bio?: string | null;
          location?: unknown;
          address?: string;
          phone?: string | null;
          auth_id?: string | null;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          notifications: boolean;
          email_updates: boolean;
          share_location: boolean;
          public_profile: boolean;
          auto_accept_requests: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          notifications?: boolean;
          email_updates?: boolean;
          share_location?: boolean;
          public_profile?: boolean;
          auto_accept_requests?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          notifications?: boolean;
          email_updates?: boolean;
          share_location?: boolean;
          public_profile?: boolean;
          auto_accept_requests?: boolean;
          updated_at?: string;
        };
      };
      items: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: string;
          images: string[];
          owner_id: string;
          is_available: boolean;
          condition: string;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: string;
          images?: string[];
          owner_id: string;
          is_available?: boolean;
          condition: string;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          category?: string;
          images?: string[];
          owner_id?: string;
          is_available?: boolean;
          condition?: string;
          tags?: string[];
          updated_at?: string;
        };
      };
      borrow_requests: {
        Row: {
          id: string;
          item_id: string;
          borrower_id: string;
          owner_id: string;
          status: string;
          message: string;
          requested_date: string;
          start_date: string | null;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          item_id: string;
          borrower_id: string;
          owner_id: string;
          status?: string;
          message: string;
          requested_date: string;
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          item_id?: string;
          borrower_id?: string;
          owner_id?: string;
          status?: string;
          message?: string;
          requested_date?: string;
          start_date?: string | null;
          end_date?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      nearby_items: {
        Args: {
          lat: number;
          lng: number;
          max_distance: number;
        };
        Returns: {
          id: string;
          title: string;
          description: string;
          category: string;
          images: string[];
          owner_id: string;
          is_available: boolean;
          condition: string;
          tags: string[];
          created_at: string;
          updated_at: string;
          distance: number;
        }[];
      };
    };
    Enums: {
      item_category: 'tools' | 'electronics' | 'books' | 'kitchen' | 'garden' | 'sports' | 'household' | 'automotive' | 'other';
      item_condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
      request_status: 'pending' | 'approved' | 'declined' | 'active' | 'completed' | 'cancelled';
    };
  };
}